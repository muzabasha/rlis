import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, RotateCcw, FastForward, Info, ChevronRight, 
    Zap, Target, Brain, History, Cpu, ArrowRight, Save
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// ─── Constants ──────────────────────────────────────────────────────────────

const STEPS_TO_FINISH = 5;

// ─── Main Component ─────────────────────────────────────────────────────────

export default function MCSamplingLab() {
    const [agentPos, setAgentPos] = useState(-1); // -1 = start, 5 = end
    const [currentG, setCurrentG] = useState(0);
    const [episodeLog, setEpisodeLog] = useState<{s: number, r: number}[]>([]);
    const [history, setHistory] = useState<{ep: number, G: number, V: number}[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(300);
    const [explanation, setExplanation] = useState("Press Start to begin a Monte Carlo episode.");
    const [vEstimate, setVEstimate] = useState(0);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const step = useCallback(() => {
        if (agentPos >= STEPS_TO_FINISH - 1) {
            // TERMINAL REACHED
            const finalG = currentG + 10; // Bonus at end
            const newHistory = [...history, { ep: history.length + 1, G: finalG, V: 0 }];
            
            // Calculate new V(s) estimate
            const avgV = newHistory.reduce((acc, curr) => acc + curr.G, 0) / newHistory.length;
            newHistory[newHistory.length - 1].V = avgV;
            
            setHistory(newHistory);
            setVEstimate(avgV);
            setExplanation(`Goal reached! Return G = ${finalG}. V(s) updated to ${avgV.toFixed(2)}.`);
            
            // Reset for next episode
            setIsPlaying(false);
            setAgentPos(-1);
            setCurrentG(0);
            setEpisodeLog([]);
            return;
        }

        // MOVE AGENT
        const nextPos = agentPos + 1;
        const reward = Math.floor(Math.random() * 3); // Random noise reward
        setAgentPos(nextPos);
        setCurrentG(prev => prev + reward);
        setEpisodeLog(prev => [...prev, { s: nextPos, r: reward }]);
        setExplanation(`Agent moved to step ${nextPos + 1}. Reward received: ${reward}. Total G so far: ${currentG + reward}.`);
    }, [agentPos, currentG, history]);

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(step, speed);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isPlaying, step, speed]);

    const reset = () => {
        setIsPlaying(false);
        setAgentPos(-1);
        setCurrentG(0);
        setEpisodeLog([]);
        setHistory([]);
        setVEstimate(0);
        setExplanation("Simulation reset.");
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[700px]">
            {/* Header */}
            <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <History size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 dark:text-white">MC Sampling Engine</h3>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Episode Averaging v1.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`p-2 rounded-lg ${isPlaying ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'}`}>
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button onClick={step} disabled={isPlaying} className="p-2 text-slate-500 disabled:opacity-30"><FastForward size={18} /></button>
                    <button onClick={reset} className="p-2 text-slate-500"><RotateCcw size={18} /></button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Stats Panel */}
                <div className="w-64 p-6 border-r border-slate-200 dark:border-slate-800 space-y-6 bg-slate-50/50 dark:bg-slate-900/20 overflow-y-auto">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Estimates</h4>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Estimated V(start)</span>
                            <div className="text-3xl font-black text-blue-600">{vEstimate.toFixed(2)}</div>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Episodes</span>
                            <div className="text-xl font-black text-slate-800 dark:text-white">{history.length}</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Episode Memory</h4>
                        <div className="space-y-1">
                            {episodeLog.map((log, i) => (
                                <div key={i} className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/10 rounded-lg text-[10px] font-mono border border-blue-100/50">
                                    <span className="text-blue-600 font-bold">Step {i+1}</span>
                                    <span className="text-slate-500">R: +{log.r}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Interaction Area */}
                <div className="flex-1 p-8 flex flex-col space-y-6">
                    <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 relative flex items-center justify-center shadow-inner">
                        {/* Simulation Track */}
                        <div className="flex items-center gap-4 w-full max-w-lg px-10">
                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-[10px] font-bold">START</div>
                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
                                <motion.div 
                                    className="absolute inset-y-0 left-0 bg-blue-500/20"
                                    animate={{ width: `${((agentPos + 1) / STEPS_TO_FINISH) * 100}%` }}
                                />
                                {/* Steps */}
                                <div className="absolute inset-0 flex justify-between px-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-1 h-full bg-white/50 dark:bg-black/20" />
                                    ))}
                                </div>
                                {/* Agent */}
                                <motion.div 
                                    className="absolute -top-4 w-10 h-10 bg-blue-600 rounded-xl shadow-lg flex items-center justify-center text-white z-10"
                                    animate={{ left: `calc(${((agentPos + 1) / STEPS_TO_FINISH) * 100}% - 20px)` }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                                >
                                    <Brain size={18} />
                                </motion.div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                <Target size={20} />
                            </div>
                        </div>

                        {/* Floating Labels */}
                        <div className="absolute bottom-10 left-10 text-xs font-mono text-slate-400">
                             CURRENT G: <span className="text-blue-600 font-bold">{currentG}</span>
                        </div>
                    </div>

                    {/* Console & Chart */}
                    <div className="grid grid-cols-2 gap-4 h-48">
                        <div className="bg-slate-900 rounded-2xl p-4 text-white font-mono text-[10px] overflow-y-auto border border-slate-800 relative">
                            <div className="flex items-center gap-2 mb-2 text-primary-400 border-b border-slate-800 pb-2">
                                <ChevronRight size={14} />
                                <span className="font-bold">SYSTEM_LOG</span>
                            </div>
                            <p className="leading-relaxed text-slate-300">{explanation}</p>
                            {agentPos === -1 && history.length > 0 && (
                                <p className="text-emerald-400 mt-2">Ready for Episode {history.length + 1}...</p>
                            )}
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={history}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="ep" hide />
                                    <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="V" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                                </AreaChart>
                             </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
