import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, RotateCcw, FastForward, Info, ChevronRight, 
    Zap, Target, Brain, History, Cpu, GitBranch, ListFilter, RefreshCw
} from 'lucide-react';

// ─── Constants ──────────────────────────────────────────────────────────────

const CIRCULAR_PATH = ['S0', 'S1', 'S2', 'S1', 'S3', 'Goal'];
const REWARDS = { S0: 0, S1: -1, S2: -1, S3: -1, Goal: 10 };

// ─── Main Component ─────────────────────────────────────────────────────────

export default function MCAlgoComparisonLab() {
    const [method, setMethod] = useState<'First' | 'Every'>('First');
    const [step, setStep] = useState(-1);
    const [isEpisodeDone, setIsEpisodeDone] = useState(false);
    const [visits, setVisits] = useState<Record<string, number>>({});
    const [explanation, setExplanation] = useState("Select an algorithm and step through the circular trajectory.");

    const forward = () => {
        if (step < CIRCULAR_PATH.length - 1) {
            const nextStep = step + 1;
            const state = CIRCULAR_PATH[nextStep];
            
            setStep(nextStep);
            
            // Logic for counting
            setVisits(prev => {
                const isFirstTime = CIRCULAR_PATH.indexOf(state) === nextStep;
                if (method === 'First' && !isFirstTime) return prev;
                
                return { ...prev, [state]: (prev[state] || 0) + 1 };
            });

            setExplanation(`Agent entered ${state}. ${method === 'Every' || CIRCULAR_PATH.indexOf(state) === nextStep ? 'Counted as visit.' : 'Ignored (already visited in this episode).'}`);
            
            if (state === 'Goal') {
                setIsEpisodeDone(true);
                setExplanation("Episode complete. Observe the final visit counts in the 'Accounting' panel.");
            }
        }
    };

    const reset = () => {
        setStep(-1);
        setIsEpisodeDone(false);
        setVisits({});
        setExplanation("Simulation reset.");
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[700px]">
            {/* Header */}
            <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <GitBranch size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 dark:text-white">MC Algorithm Auditor</h3>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Logic Comparison v1.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {['First', 'Every'].map(m => (
                            <button
                                key={m}
                                onClick={() => { setMethod(m as any); reset(); }}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${method === m ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {m.toUpperCase()}-VISIT
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={forward} disabled={isEpisodeDone} className="p-2 bg-blue-600 text-white rounded-lg disabled:opacity-30">
                            <FastForward size={18} />
                        </button>
                        <button onClick={reset} className="p-2 text-slate-500"><RotateCcw size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Accountant Panel */}
                <div className="w-72 p-8 border-r border-slate-200 dark:border-slate-800 space-y-8 bg-slate-50/50 dark:bg-slate-900/20 overflow-y-auto">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accounting (N)</h4>
                        <div className="space-y-2">
                            {['S0', 'S1', 'S2', 'S3', 'Goal'].map(s => (
                                <div key={s} className={`flex justify-between items-center p-3 rounded-xl border transition-all ${visits[s] ? 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-800 shadow-sm' : 'border-dashed border-slate-200 opacity-30'}`}>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">{s} Visits</span>
                                    <span className={`text-sm font-black ${visits[s] ? 'text-blue-600' : 'text-slate-300'}`}>{visits[s] || 0}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
                         <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                            <ListFilter size={14} /> Algorithm Insight
                         </h5>
                         <p className="text-[10px] text-slate-400 leading-relaxed italic">
                            {method === 'First' 
                                ? "We only count the first visit to S1. This makes our samples independent within an episode." 
                                : "We count S1 every single time it appears. This gives us more data points per episode."}
                         </p>
                    </div>
                </div>

                {/* Trajectory Area */}
                <div className="flex-1 p-12 flex flex-col items-center justify-center bg-white dark:bg-slate-900 overflow-hidden relative">
                    
                    {/* Path Visualizer */}
                    <div className="flex flex-wrap justify-center gap-4 w-full max-w-xl">
                        {CIRCULAR_PATH.map((s, i) => {
                            const isCurrent = i === step;
                            const isVisited = i <= step;
                            const isCounted = isVisited && (method === 'Every' || CIRCULAR_PATH.indexOf(s) === i);
                            
                            return (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <motion.div
                                            animate={{ 
                                                scale: isCurrent ? 1.2 : 1,
                                                borderColor: isCurrent ? '#3b82f6' : isVisited ? '#e2e8f0' : '#f1f5f9',
                                                opacity: isVisited ? 1 : 0.2
                                            }}
                                            className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center relative shadow-sm
                                                ${isCounted ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'}
                                            `}
                                        >
                                            {isCurrent && (
                                                <motion.div 
                                                    layoutId="agent-glow"
                                                    className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"
                                                />
                                            )}
                                            <span className={`text-[10px] font-black ${isCounted ? 'text-blue-600' : 'text-slate-400'}`}>
                                                {s}
                                            </span>
                                            
                                            {isVisited && (
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-slate-700 border border-slate-200 rounded-full flex items-center justify-center text-[8px] font-black text-slate-400">
                                                    {i}
                                                </div>
                                            )}
                                        </motion.div>
                                        <div className={`text-[8px] font-black uppercase transition-colors ${isVisited ? (isCounted ? 'text-blue-500' : 'text-slate-400') : 'text-transparent'}`}>
                                            {isCounted ? 'Counted' : 'Ignored'}
                                        </div>
                                    </div>
                                    {i < CIRCULAR_PATH.length - 1 && <ChevronRight size={14} className="text-slate-200" />}
                                </div>
                            );
                        })}
                    </div>

                    {/* Loop Indicator */}
                    <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50 flex items-center gap-4">
                         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            <RefreshCw size={16} />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-blue-900 dark:text-blue-100">Notice the Loop:</p>
                            <p className="text-[10px] text-blue-600 dark:text-blue-400">S1 is visited at step 1, 3, and 5.</p>
                         </div>
                    </div>

                    {/* Console Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 bg-slate-900 rounded-2xl p-4 text-white font-mono text-[10px] border border-slate-800 flex items-start gap-3">
                         <ChevronRight size={14} className="text-blue-400 mt-1 shrink-0" />
                         <p className="leading-relaxed text-slate-300">
                            <span className="text-blue-400 font-bold uppercase tracking-widest mr-2">LOG:</span>
                            {explanation}
                         </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
