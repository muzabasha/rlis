import React, { useState, useMemo, useCallback } from 'react';
import { Play, RotateCcw, SkipForward } from 'lucide-react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface RecyclingRobotVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function RecyclingRobotVis({
    formula = "\\text{Robot MDP} = \\langle \\{H,L\\}, \\{S,W,R\\}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle",
    label = 'Recycling Robot MDP',
    accent = 'violet'
}: RecyclingRobotVisProps) {
    const [battery, setBattery] = useState<'High' | 'Low'>('High');
    const [cans, setCans] = useState(0);
    const [log, setLog] = useState<string[]>([]);
    const [running, setRunning] = useState(false);

    const step = useCallback(() => {
        const action = battery === 'High' ? (Math.random() > 0.5 ? 'Search' : 'Wait') : (Math.random() > 0.3 ? 'Search' : 'Wait');
        let reward = 0;
        let nextBattery: 'High' | 'Low' = battery;

        if (action === 'Search') {
            if (battery === 'High') {
                reward = 4;
                nextBattery = Math.random() < 0.7 ? 'High' : 'Low';
            } else {
                reward = 3;
                nextBattery = Math.random() < 0.1 ? 'High' : 'Low';
            }
        } else {
            if (battery === 'High') {
                reward = 1;
                nextBattery = 'High';
            } else {
                reward = 2;
                nextBattery = 'Low';
            }
        }

        setBattery(nextBattery);
        setCans(prev => prev + reward);
        setLog(prev => [`B:${battery[0]}→A:${action}→R:${reward}→B:${nextBattery[0]}`, ...prev].slice(0, 8));
    }, [battery]);

    React.useEffect(() => {
        if (!running) return;
        const interval = setInterval(step, 500);
        return () => clearInterval(interval);
    }, [running, step]);

    const reset = () => {
        setRunning(false);
        setBattery('High');
        setCans(0);
        setLog([]);
    };

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => setRunning(!running)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600"
                    >
                        {running ? '⏸ Pause' : '▶ Run'}
                    </button>
                    <button onClick={step} disabled={running}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 disabled:opacity-40"
                    >
                        <SkipForward className="w-3 h-3" /> Step
                    </button>
                    <button onClick={reset}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                </div>
                <div className="flex justify-center gap-4">
                    <div className={`p-3 rounded-xl text-center transition-all ${
                        battery === 'High'
                            ? 'bg-amber-50 dark:bg-amber-900/20 ring-2 ring-amber-400 scale-110'
                            : 'bg-slate-100 dark:bg-slate-700'
                    }`}>
                        <div className="text-lg">{battery === 'High' ? '🔋' : '🪫'}</div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{battery}</div>
                    </div>
                    <div className="flex items-center text-2xl text-slate-300">→</div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                        <div className="text-lg">♻️</div>
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{cans} cans</div>
                    </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <p className="text-[10px] font-medium text-slate-400 mb-1">History</p>
                    {log.map((entry, i) => (
                        <p key={i} className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{entry}</p>
                    ))}
                    {log.length === 0 && <p className="text-[10px] text-slate-400 italic">Press Run or Step to simulate</p>}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    The robot collects cans and manages its battery. States: High/Low. Actions: Search/Wait/Recharge.
                    The reward structure encourages collecting cans while avoiding battery depletion.
                    Based on Sutton & Barto Example 3.3.
                </p>
            </div>
        </EquationGraph>
    );
}
