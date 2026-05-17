import React, { useEffect, useRef, useState, useId } from 'react';
import { Maximize2, Minimize2, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface InteractiveDiagramProps {
    title: string;
    description: string;
    chart: string;
}

export default function InteractiveDiagram({ title, description, chart }: InteractiveDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [renderKey, setRenderKey] = useState(0);
    const uid = useId().replace(/:/g, '');

    useEffect(() => {
        let cancelled = false;
        const render = async () => {
            try {
                const { default: mermaid } = await import('mermaid');
                mermaid.initialize({
                    startOnLoad: false,
                    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
                    securityLevel: 'loose',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 14,
                    flowchart: { curve: 'basis', padding: 20 },
                    themeVariables: {
                        primaryColor: '#6366f1',
                        primaryTextColor: '#1e293b',
                        primaryBorderColor: '#4f46e5',
                        lineColor: '#94a3b8',
                        secondaryColor: '#e0e7ff',
                        tertiaryColor: '#f1f5f9',
                    }
                });
                if (cancelled || !containerRef.current) return;
                const { svg } = await mermaid.render(`mermaid-${uid}-${renderKey}`, chart);
                if (cancelled || !containerRef.current) return;
                containerRef.current.innerHTML = svg;
                // Make SVG responsive
                const svgEl = containerRef.current.querySelector('svg');
                if (svgEl) {
                    svgEl.style.maxWidth = '100%';
                    svgEl.style.height = 'auto';
                }
            } catch (err) {
                if (!cancelled && containerRef.current) {
                    containerRef.current.innerHTML = `<div class="text-red-500 text-xs p-4 font-mono bg-red-50 dark:bg-red-900/20 rounded-xl">Diagram render error: ${(err as Error).message}</div>`;
                }
            }
        };
        render();
        return () => { cancelled = true; };
    }, [chart, renderKey, uid]);

    const wrapperClass = isFullscreen
        ? 'fixed inset-4 z-[999] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-black/30 flex flex-col p-6 border border-slate-200 dark:border-slate-700'
        : 'relative mt-8 mb-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/30 rounded-3xl p-6 border border-slate-200 dark:border-slate-700';

    return (
        <div className={wrapperClass}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">📊</span>
                        <h4 className="text-base font-black text-slate-800 dark:text-slate-100">{title}</h4>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full">
                            Interactive Diagram
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0 ml-4">
                    <button
                        onClick={() => setZoom(z => Math.max(0.5, z - 0.15))}
                        className="p-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors border border-slate-200 dark:border-slate-600"
                        title="Zoom Out"
                    >
                        <ZoomOut size={14} />
                    </button>
                    <button
                        onClick={() => setZoom(z => Math.min(2.5, z + 0.15))}
                        className="p-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors border border-slate-200 dark:border-slate-600"
                        title="Zoom In"
                    >
                        <ZoomIn size={14} />
                    </button>
                    <button
                        onClick={() => { setZoom(1); setRenderKey(k => k + 1); }}
                        className="p-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors border border-slate-200 dark:border-slate-600"
                        title="Reset & Re-render"
                    >
                        <RefreshCw size={14} />
                    </button>
                    <button
                        onClick={() => setIsFullscreen(f => !f)}
                        className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    >
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>

            {/* Diagram Canvas */}
            <div className={`flex-1 overflow-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 ${isFullscreen ? 'min-h-0' : 'min-h-[280px]'} flex items-center justify-center p-4`}>
                <div
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}
                    ref={containerRef}
                    className="w-full flex justify-center items-center"
                >
                    <div className="text-slate-400 text-sm animate-pulse">Rendering diagram…</div>
                </div>
            </div>

            {/* Zoom indicator */}
            <div className="mt-2 text-right flex-shrink-0">
                <span className="text-[10px] text-slate-400 font-mono">Zoom: {(zoom * 100).toFixed(0)}%</span>
            </div>

            {/* Fullscreen backdrop */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
                    onClick={() => setIsFullscreen(false)}
                />
            )}
        </div>
    );
}
