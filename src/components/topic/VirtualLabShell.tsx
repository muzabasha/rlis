import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Pause, RotateCcw, ChevronRight, Gauge, Settings2,
    Info, Download, TrendingUp, Cpu, X
} from 'lucide-react';

export interface LabTelemetry {
    label: string;
    value: string | number;
    unit?: string;
    color?: string;
    highlight?: boolean;
}

interface VirtualLabShellProps {
    title: string;
    description: string;
    objective: string;
    controls?: React.ReactNode;
    telemetry?: LabTelemetry[];
    children: React.ReactNode;
    onReset?: () => void;
    onStep?: () => void;
    onToggleRun?: () => void;
    isRunning?: boolean;
    speed?: number;
    onSpeedChange?: (v: number) => void;
    showStepBtn?: boolean;
    tips?: string[];
    badge?: string;
}

export default function VirtualLabShell({
    title, description, objective, controls, telemetry = [],
    children, onReset, onStep, onToggleRun, isRunning = false,
    speed = 1, onSpeedChange, showStepBtn = true, tips = [], badge
}: VirtualLabShellProps) {
    const [showTips, setShowTips] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="rounded-3xl border-2 border-cyan-200 dark:border-cyan-900/50 bg-gradient-to-br from-cyan-50/80 to-sky-50/80 dark:from-cyan-900/10 dark:to-sky-900/10 overflow-hidden shadow-xl shadow-cyan-500/5">
            
            {/* Lab Header Bar */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-black text-sm">{title}</span>
                            {badge && <span className="px-2 py-0.5 text-[9px] font-bold bg-cyan-500/20 text-cyan-400 rounded-full uppercase tracking-wider border border-cyan-500/30">{badge}</span>}
                        </div>
                        <span className="text-slate-500 text-[10px] font-medium">{description}</span>
                    </div>
                </div>

                {/* Header Controls */}
                <div className="flex items-center gap-2">
                    {tips.length > 0 && (
                        <button
                            onClick={() => setShowTips(t => !t)}
                            className={`p-2 rounded-lg transition-colors ${showTips ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400 hover:text-amber-400'}`}
                            title="Lab Tips"
                        >
                            <Info size={14} />
                        </button>
                    )}
                    {onSpeedChange && (
                        <button
                            onClick={() => setShowSettings(s => !s)}
                            className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400 hover:text-indigo-400'}`}
                            title="Settings"
                        >
                            <Settings2 size={14} />
                        </button>
                    )}
                    {onReset && (
                        <button
                            onClick={onReset}
                            className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition-colors"
                            title="Reset"
                        >
                            <RotateCcw size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Tips Panel */}
            <AnimatePresence>
                {showTips && tips.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 overflow-hidden"
                    >
                        <div className="px-6 py-3 flex items-start gap-3">
                            <Info size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider">Lab Tips</p>
                                <ul className="space-y-1">
                                    {tips.map((tip, i) => (
                                        <li key={i} className="text-xs text-amber-700 dark:text-amber-300 flex gap-2">
                                            <span className="text-amber-500">→</span> {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => setShowTips(false)} className="ml-auto text-amber-400 hover:text-amber-600">
                                <X size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && onSpeedChange && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-indigo-50 dark:bg-indigo-900/20 border-b border-indigo-200 dark:border-indigo-800 overflow-hidden"
                    >
                        <div className="px-6 py-3 flex items-center gap-6 flex-wrap">
                            <div className="flex items-center gap-3">
                                <Gauge size={16} className="text-indigo-600" />
                                <span className="text-xs font-bold text-indigo-800 dark:text-indigo-200">Sim Speed</span>
                                <input
                                    type="range" min={0.5} max={5} step={0.5} value={speed}
                                    onChange={e => onSpeedChange(parseFloat(e.target.value))}
                                    className="w-28 accent-indigo-600"
                                />
                                <span className="text-xs font-black text-indigo-600 w-8">{speed}×</span>
                            </div>
                            {controls}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Objective Banner */}
            <div className="px-6 py-3 bg-cyan-900/5 dark:bg-cyan-900/10 border-b border-cyan-100 dark:border-cyan-900/30">
                <div className="flex items-center gap-2">
                    <TrendingUp size={13} className="text-cyan-600 flex-shrink-0" />
                    <p className="text-xs font-medium text-cyan-900 dark:text-cyan-200">
                        <span className="font-black">Objective: </span>{objective}
                    </p>
                </div>
            </div>

            {/* Main Lab Canvas */}
            <div className="p-6 space-y-6">
                {children}
            </div>

            {/* Telemetry Bar */}
            {telemetry.length > 0 && (
                <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex gap-6 flex-wrap">
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <Cpu size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Telemetry</span>
                    </div>
                    {telemetry.map((t, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-500 font-medium">{t.label}:</span>
                            <span
                                className={`text-[11px] font-black font-mono ${t.highlight ? 'text-emerald-400' : t.color || 'text-slate-200'}`}
                            >
                                {typeof t.value === 'number' ? t.value.toFixed(2) : t.value}
                                {t.unit && <span className="text-slate-500 text-[9px] ml-0.5">{t.unit}</span>}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Action Footer */}
            {(onToggleRun || onStep) && (
                <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
                    {onToggleRun && (
                        <button
                            onClick={onToggleRun}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-md active:scale-95 ${
                                isRunning
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                                    : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/30'
                            }`}
                        >
                            {isRunning ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Run Simulation</>}
                        </button>
                    )}
                    {showStepBtn && onStep && !isRunning && (
                        <button
                            onClick={onStep}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors active:scale-95"
                        >
                            <ChevronRight size={16} /> Step
                        </button>
                    )}
                    {onReset && (
                        <button
                            onClick={onReset}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-800 text-slate-400 hover:text-white transition-colors active:scale-95 ml-auto"
                        >
                            <RotateCcw size={14} /> Reset
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
