import React, { useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { ChevronDown, ChevronUp, BarChart3, MoveHorizontal } from 'lucide-react';

interface SliderDef {
    name: string;
    label: string;
    min: number;
    max: number;
    step: number;
    default: number;
}

interface EquationGraphProps {
    formula: string;
    label?: string;
    children: React.ReactNode;
    sliders?: SliderDef[];
    values?: Record<string, number>;
    onSliderChange?: (name: string, value: number) => void;
    defaultOpen?: boolean;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const ACCENT_MAP = {
    blue: { border: 'border-blue-400', bg: 'bg-blue-50/60 dark:bg-blue-900/10', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', label: 'text-blue-600 dark:text-blue-400', slider: 'accent-blue-500' },
    violet: { border: 'border-violet-400', bg: 'bg-violet-50/60 dark:bg-violet-900/10', badge: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300', label: 'text-violet-600 dark:text-violet-400', slider: 'accent-violet-500' },
    emerald: { border: 'border-emerald-400', bg: 'bg-emerald-50/60 dark:bg-emerald-900/10', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', label: 'text-emerald-600 dark:text-emerald-400', slider: 'accent-emerald-500' },
    red: { border: 'border-red-400', bg: 'bg-red-50/60 dark:bg-red-900/10', badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300', label: 'text-red-600 dark:text-red-400', slider: 'accent-red-500' },
    amber: { border: 'border-amber-400', bg: 'bg-amber-50/60 dark:bg-amber-900/10', badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300', label: 'text-amber-600 dark:text-amber-400', slider: 'accent-amber-500' },
};

export default function EquationGraph({
    formula, label, children, sliders, values = {},
    onSliderChange, defaultOpen = true, accent = 'blue'
}: EquationGraphProps) {
    const [open, setOpen] = useState(defaultOpen);
    const a = ACCENT_MAP[accent];

    return (
        <div className={`rounded-xl border ${a.border} ${a.bg} overflow-hidden`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-3 hover:opacity-80 transition-opacity"
            >
                <div className="flex items-center gap-2">
                    <BarChart3 className={`w-4 h-4 ${a.label}`} />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {label ? `Interactive: ${label}` : 'Interactive Graph'}
                    </span>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {open && (
                <div className="px-3 pb-3 space-y-3">
                    <div className={`p-2 rounded-lg bg-white/70 dark:bg-slate-800/50 text-center text-sm ${a.label}`}>
                        <InlineMath math={formula} />
                    </div>
                    {sliders && sliders.length > 0 && (
                        <div className="flex flex-wrap gap-3 p-2 rounded-lg bg-white/50 dark:bg-slate-800/30">
                            {sliders.map(s => (
                                <div key={s.name} className="flex-1 min-w-[140px]">
                                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
                                        <MoveHorizontal className="w-3 h-3" />
                                        <span><InlineMath math={`\\text{${s.label}}`} /> = {values[s.name]?.toFixed(s.step < 0.1 ? 3 : s.step < 0.05 ? 4 : s.step < 1 ? 2 : 0) ?? s.default}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={s.min}
                                        max={s.max}
                                        step={s.step}
                                        value={values[s.name] ?? s.default}
                                        onChange={e => onSliderChange?.(s.name, parseFloat(e.target.value))}
                                        className={`w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 ${a.slider}`}
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-400">
                                        <span>{s.min}</span>
                                        <span>{s.max}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="rounded-lg bg-white/80 dark:bg-slate-800/40 p-2">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
