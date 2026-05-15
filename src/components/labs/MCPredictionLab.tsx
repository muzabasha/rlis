import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, RotateCcw, FastForward, Info, ChevronRight, 
    Zap, Target, Brain, History, Cpu, TrendingUp, ShieldCheck, AlertTriangle
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// ─── Main Component ─────────────────────────────────────────────────────────

export default function MCPredictionLab() {
    const [policy, setPolicy] = useState<'Safe' | 'Risky'>('Safe');
    const [vEstimate, setVEstimate] = useState(0);
    const [history, setHistory] = useState<{ep: number, V: number}[]>([]);
    const [lastG, setLastG] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [explanation, setExplanation] = useState("Select a policy and run episodes to see V(s) converge.");

    const runEpisode = useCallback(() => {
        // Safe: Always +1 per step (5 steps) + bonus 5 = 10
        // Risky: 50% chance of 20, 50% chance of 0 = expected 10
        const sample = policy === 'Safe' 
            ? 10 + (Math.random() - 0.5) * 2 
            : Math.random() > 0.5 ? 20 : 0;
        
        setLastG(sample);
        setHistory(prev => {
            const nextCount = prev.length + 1;
            const newV = vEstimate + (1 / nextCount) * (sample - vEstimate);
            setVEstimate(newV);
            return [...prev, { ep: nextCount, V: newV }].slice(-50);
        });
        setExplanation(`Episode return: ${sample.toFixed(1)}. Moving estimate toward G...`);
    }, [policy, vEstimate]);

    useEffect(() => {
        let interval: any;
        if (isRunning) {
            interval = setInterval(runEpisode, 200);
        }
        return () => clearInterval(interval);
    }, [isRunning, runEpisode]);

    const reset = () => {
        setVEstimate(0);
        setHistory([]);
        setLastG(0);
        setIsRunning(false);
        setExplanation("Simulation reset.");
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[700px]">
            {/* Header */}
            <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 dark:text-white">MC Policy Predictor</h3>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Convergence Monitor v1.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mr-4">
                        <button 
                            onClick={() => { setPolicy('Safe'); reset(); }}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${policy === 'Safe' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                        >
                            <ShieldCheck size={12} /> SAFE
                        </button>
                        <button 
                            onClick={() => { setPolicy('Risky'); reset(); }}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${policy === 'Risky' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-400'}`}
                        >
                            <AlertTriangle size={12} /> RISKY
                        </button>
                    </div>
                    <button onClick={() => setIsRunning(!isRunning)} className={`p-2 rounded-lg ${isRunning ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white'}`}>
                        {isRunning ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button onClick={reset} className="p-2 text-slate-500"><RotateCcw size={18} /></button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Meter Panel */}
                <div className="w-72 p-8 border-r border-slate-200 dark:border-slate-800 space-y-8 bg-slate-50/50 dark:bg-slate-900/20 overflow-y-auto">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prediction Meter</h4>
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 text-center relative overflow-hidden">
                             <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Current V(π)</div>
                             <div className="text-4xl font-black text-emerald-600">{vEstimate.toFixed(2)}</div>
                             <div className="mt-2 text-[10px] text-slate-400">Total Samples: {history.length}</div>
                             
                             {/* Progress bar to target 10 */}
                             <div className="mt-4 h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-emerald-500"
                                    animate={{ width: `${Math.min((vEstimate / 15) * 100, 100)}%` }}
                                />
                             </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Result</h4>
                        <div className={`p-4 rounded-2xl border flex items-center justify-between ${lastG > vEstimate ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                             <span className="text-[10px] font-bold uppercase text-slate-500 tracking-tighter">Return G</span>
                             <span className={`text-xl font-black ${lastG > vEstimate ? 'text-emerald-600' : 'text-rose-600'}`}>{lastG.toFixed(1)}</span>
                        </div>
                    </div>

                    <div className="p-6 bg-emerald-600 rounded-3xl text-white shadow-xl shadow-emerald-500/20">
                         <h5 className="text-xs font-bold flex items-center gap-2"><Zap size={14}/> LLN Effect</h5>
                         <p className="text-[10px] leading-relaxed opacity-90">
                            The Law of Large Numbers (LLN) ensures that as episodes increase, the noise cancels out and the estimate converges to the expectation (10.00).
                         </p>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 p-8 flex flex-col space-y-6 bg-white dark:bg-slate-900 relative">
                    <div className="flex-1 bg-slate-50/50 dark:bg-slate-800/20 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-4 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="ep" hide />
                                <YAxis domain={[0, 20]} stroke="#94a3b8" fontSize={10} />
                                <Tooltip />
                                <motion.path layoutId="target-line" />
                                <Area type="monotone" dataKey="V" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorV)" />
                            </AreaChart>
                        </ResponsiveContainer>
                        
                        {/* Target Line Overlay */}
                        <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-slate-300 dark:border-slate-600 z-0">
                            <span className="absolute right-4 -top-5 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Target Convergence (10.0)</span>
                        </div>
                    </div>

                    {/* Console Overlay */}
                    <div className="bg-slate-900 rounded-2xl p-4 text-white font-mono text-[10px] border border-slate-800 flex items-start gap-3">
                         <ChevronRight size={14} className="text-emerald-400 mt-1 shrink-0" />
                         <p className="leading-relaxed text-slate-300">
                            <span className="text-emerald-400 font-bold uppercase tracking-widest mr-2">PREDICT_LOG:</span>
                            {explanation}
                         </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
