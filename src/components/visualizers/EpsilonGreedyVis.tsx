import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const COLORS = ['#3b82f6', '#f59e0b'];

interface EpsilonGreedyVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function EpsilonGreedyVis({
    formula = "A_t = \\begin{cases} \\arg\\max_a Q_t(a) & \\text{w.p. } 1-\\varepsilon \\\\ \\text{random} & \\text{w.p. } \\varepsilon \\end{cases}",
    label = 'ε-Greedy Action Selection',
    accent = 'blue'
}: EpsilonGreedyVisProps) {
    const [epsilon, setEpsilon] = useState(0.2);
    const [numActions, setNumActions] = useState(4);

    const pieData = useMemo(() => [
        { name: 'Exploit (greedy)', value: 1 - epsilon },
        { name: `Explore (1/${numActions} each)`, value: epsilon },
    ], [epsilon, numActions]);

    const actionProbs = useMemo(() => {
        const greedyProb = 1 - epsilon;
        const exploreProb = epsilon / numActions;
        return Array.from({ length: numActions }, (_, i) => ({
            action: `A${i + 1}`,
            prob: i === 0 ? greedyProb + exploreProb : exploreProb,
        }));
    }, [epsilon, numActions]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'epsilon', label: 'ε', min: 0, max: 1, step: 0.01, default: 0.2 },
                { name: 'numActions', label: 'Number of Actions', min: 2, max: 10, step: 1, default: 4 },
            ]}
            values={{ epsilon, numActions }}
            onSliderChange={(name, v) => {
                if (name === 'epsilon') setEpsilon(v);
                if (name === 'numActions') setNumActions(Math.round(v));
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Exploit: <strong>{(1 - epsilon) * 100}%</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Explore: <strong>{epsilon * 100}%</strong> (each action: <strong>{(epsilon / numActions * 100).toFixed(1)}%</strong>)
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Action Selection Probabilities</p>
                        {actionProbs.map(ap => (
                            <div key={ap.action} className="flex items-center gap-2 text-xs">
                                <span className="w-8 text-slate-500"><InlineMath math={`a_{${ap.action.replace('A', '')}}`} /></span>
                                <div className="flex-1 h-4 rounded bg-slate-200 dark:bg-slate-600 overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded transition-all" style={{ width: `${ap.prob * 100}%` }} />
                                </div>
                                <span className="w-12 text-right text-slate-500">{(ap.prob * 100).toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Low ε = mostly greedy exploitation (fast but may miss better actions). High ε = lots of random exploration (slow but thorough).
                </p>
            </div>
        </EquationGraph>
    );
}
