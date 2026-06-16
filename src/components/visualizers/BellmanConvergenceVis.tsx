import React, { useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { Play, Pause, RotateCcw } from 'lucide-react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface BellmanConvergenceVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
    type?: 'value-iteration' | 'policy-evaluation';
}

export default function BellmanConvergenceVis({
    formula = "v_\\pi(s) = \\sum_a \\pi(a|s) \\sum_{s'} P(s'|s,a)[R + \\gamma v_\\pi(s')]",
    label = 'Bellman Expectation / Value Iteration',
    accent = 'violet',
    type = 'value-iteration'
}: BellmanConvergenceVisProps) {
    const [gamma, setGamma] = useState(0.9);
    const [running, setRunning] = useState(false);
    const [iteration, setIteration] = useState(0);

    const NUM_STATES = 5;
    const transitionReward = useMemo(() => {
        const reward: number[] = [];
        for (let i = 0; i < NUM_STATES; i++) reward.push(i === NUM_STATES - 1 ? 10 : -1);
        return reward;
    }, []);

    const transitionMatrix = useMemo(() => {
        const mat: number[][] = [];
        for (let i = 0; i < NUM_STATES; i++) {
            const row: number[] = [];
            for (let j = 0; j < NUM_STATES; j++) {
                if (i === 0 && j === 0) row.push(0.3);
                else if (i === 0 && j === 1) row.push(0.7);
                else if (i === NUM_STATES - 1 && j === NUM_STATES - 1) row.push(1.0);
                else if (j === i + 1) row.push(0.8);
                else if (j === i) row.push(0.2);
                else row.push(0);
            }
            const sum = row.reduce((a, b) => a + b, 0);
            if (Math.abs(sum - 1) > 0.01) row[row.length - 1] += 1 - sum;
            mat.push(row);
        }
        return mat;
    }, []);

    const [history, setHistory] = useState<{ iter: number; values: number[]; maxDiff: number }[]>([
        { iter: 0, values: Array(NUM_STATES).fill(0), maxDiff: Infinity }
    ]);

    const step = useCallback(() => {
        const last = history[history.length - 1];
        const newValues = Array(NUM_STATES).fill(0);
        let maxDiff = 0;
        for (let s = 0; s < NUM_STATES; s++) {
            let total = 0;
            for (let sp = 0; sp < NUM_STATES; sp++) {
                total += transitionMatrix[s][sp] * (transitionReward[s] + gamma * last.values[sp]);
            }
            newValues[s] = parseFloat(total.toFixed(4));
            maxDiff = Math.max(maxDiff, Math.abs(newValues[s] - last.values[s]));
        }
        setHistory(prev => [...prev, { iter: prev.length, values: newValues, maxDiff }]);
        setIteration(prev => prev + 1);
    }, [history, transitionMatrix, transitionReward, gamma]);

    React.useEffect(() => {
        if (!running) return;
        const interval = setInterval(() => {
            setHistory(prev => {
                const last = prev[prev.length - 1];
                const newValues = Array(NUM_STATES).fill(0);
                let maxDiff = 0;
                for (let s = 0; s < NUM_STATES; s++) {
                    let total = 0;
                    for (let sp = 0; sp < NUM_STATES; sp++) {
                        total += transitionMatrix[s][sp] * (transitionReward[s] + gamma * last.values[sp]);
                    }
                    newValues[s] = parseFloat(total.toFixed(4));
                    maxDiff = Math.max(maxDiff, Math.abs(newValues[s] - last.values[s]));
                }
                if (maxDiff < 0.0001) { setRunning(false); return prev; }
                return [...prev, { iter: prev.length, values: newValues, maxDiff }];
            });
            setIteration(prev => prev + 1);
        }, 300);
        return () => clearInterval(interval);
    }, [running, transitionMatrix, transitionReward, gamma]);

    const reset = () => {
        setRunning(false);
        setIteration(0);
        setHistory([{ iter: 0, values: Array(NUM_STATES).fill(0), maxDiff: Infinity }]);
    };

    const convergenceData = useMemo(() => {
        return history.map(h => ({
            iter: h.iter,
            ...Object.fromEntries(h.values.map((v, i) => [`S${i + 1}`, v])),
            maxDiff: h.maxDiff === Infinity ? 1 : h.maxDiff,
        }));
    }, [history]);

    const currentValues = history[history.length - 1].values;

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[{ name: 'gamma', label: 'Discount Factor γ', min: 0, max: 0.99, step: 0.01, default: 0.9 }]}
            values={{ gamma }}
            onSliderChange={(_, v) => { setGamma(v); reset(); }}
        >
            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => { if (!running) { running ? setRunning(false) : setRunning(true); } else { setRunning(false); } }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                    >
                        {running ? <><Pause className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> Run</>}
                    </button>
                    <button onClick={step} disabled={running}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-40 transition-colors"
                    >
                        Step
                    </button>
                    <button onClick={reset}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                    <span className="text-xs text-slate-500 self-center ml-auto">
                        Iteration: {iteration}
                    </span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-center">
                    {currentValues.map((v, i) => (
                        <div key={i} className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="text-[10px] text-slate-400"><InlineMath math={`V(s_{${i + 1}})`} /></div>
                            <div className="text-xs font-bold text-violet-600 dark:text-violet-400">{v.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={convergenceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <defs>
                            {[0, 1, 2, 3, 4].map(i => (
                                <linearGradient key={i} id={`vGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][i]} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][i]} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="iter" tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Iteration', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'V(s)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        {[0, 1, 2, 3, 4].map(i => (
                            <Area key={i} type="monotone" dataKey={`S${i + 1}`} stroke={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][i]} fill={`url(#vGrad${i})`} name={`V(s${i + 1})`} strokeWidth={2} />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Values converge to the true <InlineMath math="V_\\pi(s)" /> as iterations increase.
                    Higher γ = slower convergence but more far-sighted values.
                </p>
            </div>
        </EquationGraph>
    );
}
