import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, RotateCcw, FastForward, Info, ChevronRight, 
    Zap, Target, Brain, History, Cpu, ArrowUp, Flag, Share2
} from 'lucide-react';

// ─── Constants ──────────────────────────────────────────────────────────────

const TRAJECTORY = [
    { id: 'S0', type: 'state', r: 0 },
    { id: 'a0', type: 'action', r: 0 },
    { id: 'S1', type: 'state', r: -1 },
    { id: 'a1', type: 'action', r: 0 },
    { id: 'S2', type: 'state', r: -1 },
    { id: 'a2', type: 'action', r: 0 },
    { id: 'Goal', type: 'terminal', r: 10 }
];

// ─── Main Component ─────────────────────────────────────────────────────────

export default function MCBackupLab() {
    const [step, setStep] = useState(0);
    const [isBackpropagating, setIsBackpropagating] = useState(false);
    const [backStep, setBackStep] = useState(TRAJECTORY.length - 1);
    const [returns, setReturns] = useState<Record<string, number>>({});
    const [explanation, setExplanation] = useState("Step forward to collect experience along the trajectory.");

    const forward = () => {
        if (step < TRAJECTORY.length - 1) {
            setStep(s => s + 1);
            setExplanation(`Observed ${TRAJECTORY[step + 1].id}. Reward: ${TRAJECTORY[step + 1].r}`);
        } else {
            setIsBackpropagating(true);
            setExplanation("Terminal state reached. Now calculating Returns (G) in reverse!");
        }
    };

    const backStepForward = () => {
        if (backStep > 0) {
            const currentItem = TRAJECTORY[backStep];
            const prevItem = TRAJECTORY[backStep - 1];
            
            setReturns(prev => {
                const currentG = (prev[currentItem.id] || 0) + currentItem.r;
                return { ...prev, [prevItem.id]: currentG };
            });
            setBackStep(s => s - 1);
            setExplanation(`Back-propagating reward from ${currentItem.id} to ${prevItem.id}.`);
        } else {
            setExplanation("Backup complete! All states in the trajectory now have an estimated Return.");
        }
    };

    const reset = () => {
        setStep(0);
        setIsBackpropagating(false);
        setBackStep(TRAJECTORY.length - 1);
        setReturns({});
        setExplanation("Simulation reset.");
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[700px]">
            {/* Header */}
            <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <Share2 size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 dark:text-white">MC Backup Visualizer</h3>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Trajectory Trace v1.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button 
                        onClick={isBackpropagating ? backStepForward : forward} 
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg"
                    >
                        <FastForward size={14} />
                        {isBackpropagating ? 'BACK-PROPAGATE' : 'STEP FORWARD'}
                    </button>
                    <button onClick={reset} className="p-2 text-slate-500"><RotateCcw size={18} /></button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Information Panel */}
                <div className="w-72 p-8 border-r border-slate-200 dark:border-slate-800 space-y-8 bg-slate-50/50 dark:bg-slate-900/20 overflow-y-auto">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Return Calculator</h4>
                        <div className="space-y-2">
                            {Object.entries(returns).map(([id, val]) => (
                                <div key={id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{id} Target G</span>
                                    <span className="text-sm font-black text-indigo-600">{val}</span>
                                </div>
                            ))}
                            {Object.keys(returns).length === 0 && <p className="text-[10px] text-slate-400 italic text-center py-4">Waiting for backup phase...</p>}
                        </div>
                    </div>

                    <div className="p-6 bg-indigo-600 rounded-3xl text-white space-y-2 shadow-xl shadow-indigo-500/20">
                        <h5 className="text-xs font-bold flex items-center gap-2"><Info size={14}/> Backup Insight</h5>
                        <p className="text-[10px] leading-relaxed opacity-90">
                            Unlike TD learning which updates step-by-step, MC waits for the finish and then propagates the final result back up the entire path.
                        </p>
                    </div>
                </div>

                {/* Main Visualizer Area */}
                <div className="flex-1 p-12 flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-slate-900">
                    
                    {/* The Backup Diagram Tree */}
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        {TRAJECTORY.map((node, i) => {
                            const isActive = i <= step;
                            const isBackActive = isBackpropagating && i >= backStep;
                            const hasReturn = returns[node.id] !== undefined;

                            return (
                                <React.Fragment key={node.id}>
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ 
                                            scale: isActive ? 1 : 0.8, 
                                            opacity: isActive ? 1 : 0.1,
                                            y: isActive ? 0 : 20,
                                            borderColor: isBackActive ? '#6366f1' : '#e2e8f0',
                                            backgroundColor: node.type === 'terminal' ? '#10b981' : node.type === 'action' ? '#1e293b' : '#fff'
                                        }}
                                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center relative shadow-sm
                                            ${node.type === 'terminal' ? 'rounded-xl' : node.type === 'action' ? 'w-4 h-4' : ''}
                                            ${node.type === 'state' ? 'dark:bg-slate-800' : ''}
                                        `}
                                    >
                                        <span className={`text-[10px] font-black ${node.type === 'action' ? 'hidden' : node.type === 'terminal' ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                                            {node.id}
                                        </span>
                                        
                                        {/* Reward Badge */}
                                        {isActive && node.r !== 0 && (
                                            <motion.div 
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 40, opacity: 1 }}
                                                className={`absolute text-[10px] font-bold ${node.r > 0 ? 'text-emerald-500' : 'text-rose-500'}`}
                                            >
                                                R: {node.r > 0 ? `+${node.r}` : node.r}
                                            </motion.div>
                                        )}

                                        {/* Flow Particle */}
                                        {isBackActive && i === backStep && i < TRAJECTORY.length - 1 && (
                                            <motion.div 
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: -40, opacity: 1 }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                                className="absolute w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"
                                            />
                                        )}
                                    </motion.div>
                                    
                                    {i < TRAJECTORY.length - 1 && (
                                        <div className="w-0.5 h-6 bg-slate-100 dark:bg-slate-800 relative">
                                            <motion.div 
                                                className="absolute inset-0 bg-indigo-500/30"
                                                animate={{ height: isActive ? '100%' : '0%' }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Console Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 bg-slate-900 rounded-2xl p-4 text-white font-mono text-[10px] border border-slate-800 flex items-start gap-3">
                         <ChevronRight size={14} className="text-indigo-400 mt-1 shrink-0" />
                         <p className="leading-relaxed text-slate-300">
                            <span className="text-indigo-400 font-bold uppercase tracking-widest mr-2">LOG:</span>
                            {explanation}
                         </p>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                         <div className="grid grid-cols-10 gap-10">
                            {Array.from({ length: 100 }).map((_, i) => (
                                <Share2 key={i} size={40} />
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
