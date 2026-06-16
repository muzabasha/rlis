import React, { useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Play, Pause, RotateCcw } from 'lucide-react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface SARSAQLearningVisProps {
    sarsaFormula?: string;
    qlearningFormula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function SARSAQLearningVis({
    sarsaFormula = "Q(S,A) \\leftarrow Q(S,A) + \\alpha\\bigl[R + \\gamma Q(S',A') - Q(S,A)\\bigr]",
    qlearningFormula = "Q(S,A) \\leftarrow Q(S,A) + \\alpha\\bigl[R + \\gamma \\max_{a'} Q(S',a') - Q(S,A)\\bigr]",
    label = 'SARSA vs Q-Learning',
    accent = 'blue'
}: SARSAQLearningVisProps) {
    const [alpha, setAlpha] = useState(0.1);
    const [gamma, setGamma] = useState(0.9);
    const [running, setRunning] = useState(false);
    const [episode, setEpisode] = useState(0);

    const [sarsaHistory, setSarsaHistory] = useState<{ ep: number; q: number }[]>([{ ep: 0, q: 0 }]);
    const [qlHistory, setQlHistory] = useState<{ ep: number; q: number }[]>([{ ep: 0, q: 0 }]);

    const step = useCallback(() => {
        const lastSarsa = sarsaHistory[sarsaHistory.length - 1].q;
        const lastQL = qlHistory[qlHistory.length - 1].q;

        const reward = 10 - Math.random() * 5;
        const nextQ = lastQL + Math.random() * 2;

        const newSarsa = lastSarsa + alpha * (reward + gamma * (nextQ * 0.9) - lastSarsa);
        const newQL = lastQL + alpha * (reward + gamma * Math.max(nextQ, lastQL + 1) - lastQL);

        const ep = episode + 1;
        setEpisode(ep);
        setSarsaHistory(prev => [...prev, { ep, q: parseFloat(newSarsa.toFixed(3)) }]);
        setQlHistory(prev => [...prev, { ep, q: parseFloat(newQL.toFixed(3)) }]);
    }, [alpha, gamma, episode, sarsaHistory, qlHistory]);

    React.useEffect(() => {
        if (!running) return;
        const interval = setInterval(step, 200);
        return () => clearInterval(interval);
    }, [running, step]);

    const reset = () => {
        setRunning(false);
        setEpisode(0);
        setSarsaHistory([{ ep: 0, q: 0 }]);
        setQlHistory([{ ep: 0, q: 0 }]);
    };

    const chartData = useMemo(() => {
        const maxLen = Math.max(sarsaHistory.length, qlHistory.length);
        return Array.from({ length: maxLen }, (_, i) => ({
            ep: i,
            SARSA: sarsaHistory[i]?.q ?? null,
            'Q-Learning': qlHistory[i]?.q ?? null,
        }));
    }, [sarsaHistory, qlHistory]);

    return (
        <EquationGraph
            formula={`${sarsaFormula.split(' = ')[0]} = ...`}
            label={label}
            accent={accent}
            sliders={[
                { name: 'alpha', label: 'Learning Rate α', min: 0.01, max: 0.5, step: 0.01, default: 0.1 },
                { name: 'gamma', label: 'Discount γ', min: 0, max: 0.99, step: 0.01, default: 0.9 },
            ]}
            values={{ alpha, gamma }}
            onSliderChange={(name, v) => {
                if (name === 'alpha') setAlpha(v);
                if (name === 'gamma') setGamma(v);
                reset();
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => setRunning(!running)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
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
                    <span className="text-xs text-slate-500 self-center ml-auto">Episode: {episode}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800">
                        <div className="text-[10px] text-blue-500 font-medium">SARSA (On-Policy)</div>
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {sarsaHistory[sarsaHistory.length - 1]?.q.toFixed(2) ?? '0.00'}
                        </div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800">
                        <div className="text-[10px] text-amber-500 font-medium">Q-Learning (Off-Policy)</div>
                        <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                            {qlHistory[qlHistory.length - 1]?.q.toFixed(2) ?? '0.00'}
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="ep" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line type="monotone" dataKey="SARSA" stroke="#3b82f6" strokeWidth={2} dot={false} name="SARSA (on-policy)" />
                        <Line type="monotone" dataKey="Q-Learning" stroke="#f59e0b" strokeWidth={2} dot={false} name="Q-Learning (off-policy)" />
                    </LineChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                        <span className="font-medium text-blue-600 dark:text-blue-400">SARSA:</span> Uses <InlineMath math="Q(S',A')" /> (next action from current policy).
                        More conservative — learns near-optimal policy safely.
                    </div>
                    <div className="p-2 rounded bg-amber-50 dark:bg-amber-900/20">
                        <span className="font-medium text-amber-600 dark:text-amber-400">Q-Learning:</span> Uses <InlineMath math="\\max Q(S',a')" /> (best possible next action).
                        More aggressive — directly learns optimal policy but can overestimate.
                    </div>
                </div>
            </div>
        </EquationGraph>
    );
}
