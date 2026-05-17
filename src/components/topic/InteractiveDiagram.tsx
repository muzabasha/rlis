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
                const isDark = document.documentElement.classList.contains('dark');
                mermaid.initialize({
                    startOnLoad: false,
                    theme: isDark ? 'dark' : 'default',
                    securityLevel: 'loose',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 14,
                    flowchart: { curve: 'basis', padding: 20 },
                    themeVariables: isDark ? {
                        primaryColor: '#1e1b4b',
                        primaryTextColor: '#f8fafc',
                        primaryBorderColor: '#6366f1',
                        lineColor: '#cbd5e1',
                        secondaryColor: '#312e81',
                        tertiaryColor: '#0f172a',
                    } : {
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
        <>
            {isFullscreen && (
                <div
                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[998] transition-all"
                    onClick={() => setIsFullscreen(false)}
                />
            )}
            <div className={wrapperClass}>
                {/* Header Bar */}
                <div className="flex justify-between items-start mb-6 flex-shrink-0 border-b border-slate-200/50 dark:border-slate-800 pb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xl">📊</span>
                            <h4 className="text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">{title}</h4>
                            <span className="px-2.5 py-0.5 text-[8px] font-black bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 rounded-full uppercase tracking-widest">
                                Interactive Diagram
                            </span>
                        </div>
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

                {/* Main Split Grid Area */}
                <div className={`flex-1 grid grid-cols-1 ${isFullscreen ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} gap-6 min-h-0`}>
                    
                    {/* Left: Diagram Canvas */}
                    <div className={`${isFullscreen ? 'lg:col-span-8' : 'lg:col-span-8'} flex flex-col justify-between`}>
                        <div className={`flex-1 overflow-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 ${isFullscreen ? 'min-h-0' : 'min-h-[350px]'} flex items-center justify-center p-4 relative`}>
                            <div
                                style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}
                                ref={containerRef}
                                className="w-full flex justify-center items-center"
                            >
                                <div className="text-slate-400 text-sm animate-pulse">Rendering diagram…</div>
                            </div>
                        </div>
                        {/* Zoom indicator */}
                        <div className="mt-2 text-right">
                            <span className="text-[10px] text-slate-400 font-mono">Scale Factor: {(zoom * 100).toFixed(0)}%</span>
                        </div>
                    </div>

                    {/* Right: Walkthrough Explainer Card */}
                    <div className={`${isFullscreen ? 'lg:col-span-4' : 'lg:col-span-4'} flex flex-col gap-4 overflow-y-auto`}>
                        
                        {/* Concept & Description Block */}
                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/80 space-y-3 shadow-inner">
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <span className="p-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                    <span className="text-xs">💡</span>
                                </span>
                                <h5 className="text-xs font-black uppercase tracking-wider">Diagram Description</h5>
                            </div>
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-350 leading-relaxed text-balance">
                                {description}
                            </p>
                        </div>

                        {/* Interactive Pointers & Walkthrough Box */}
                        <div className="p-5 rounded-2xl bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-200/30 dark:border-indigo-900/20 space-y-3 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-indigo-500">
                                    <span className="p-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                        <span className="text-xs">🧭</span>
                                    </span>
                                    <h5 className="text-xs font-black uppercase tracking-wider">How to Read This Map</h5>
                                </div>
                                <ul className="space-y-2.5">
                                    <li className="text-[11px] text-slate-600 dark:text-slate-400 flex gap-2 font-medium">
                                        <span className="text-indigo-500 font-black">1.</span>
                                        <span>**Analyze Transitions**: Follow the directional arrows connecting nodes to understand sequential dependency pathways in the active RL algorithm or agent structure.</span>
                                    </li>
                                    <li className="text-[11px] text-slate-600 dark:text-slate-400 flex gap-2 font-medium">
                                        <span className="text-indigo-500 font-black">2.</span>
                                        <span>**Review Node States**: High-contrast blue boxes denote main algorithmic stages or states; rounded blocks represent boundary conditions or transitions.</span>
                                    </li>
                                    <li className="text-[11px] text-slate-600 dark:text-slate-400 flex gap-2 font-medium">
                                        <span className="text-indigo-500 font-black">3.</span>
                                        <span>**Interactive Controls**: Scale up using <span className="font-bold text-slate-800 dark:text-slate-200">Zoom In (+)</span> to inspect complex math symbols, or hit <span className="font-bold text-slate-800 dark:text-slate-200">Fullscreen</span> for absolute clarity.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-4 pt-3 border-t border-indigo-500/10 text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Interactive Map Mapped to Bloom's
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
