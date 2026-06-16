import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const TRANSPARENT = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

interface TransitionProbVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function TransitionProbVis({
    formula = "\\mathcal{P}(s' \\mid s, a) = \\Pr(S_{t+1}=s' \\mid S_t=s, A_t=a)",
    label = 'State Transition Probability',
    accent = 'blue'
}: TransitionProbVisProps) {
    const [selectedAction, setSelectedAction] = useState(0);
    const actions = ['Move Right', 'Move Up', 'Move Left', 'Move Down'];
    const stateLabels = ['State A', 'State B', 'State C', 'State D', 'State E'];

    const defaultProbs = [
        [0.7, 0.1, 0.1, 0.05, 0.05],
        [0.1, 0.6, 0.2, 0.05, 0.05],
        [0.05, 0.15, 0.7, 0.05, 0.05],
        [0.1, 0.1, 0.1, 0.6, 0.1],
    ];

    const [probs, setProbs] = useState(defaultProbs);

    const updateProb = (stateIdx: number, value: number) => {
        const newProbs = probs.map(row => [...row]);
        const others = newProbs[selectedAction].map((p, i) => i === stateIdx ? value : p);
        const sum = others.reduce((a, b) => a + b, 0);
        if (sum > 0) {
            newProbs[selectedAction] = others.map(p => p / sum);
        }
        setProbs(newProbs);
    };

    const chartData = useMemo(() => {
        return stateLabels.map((label, i) => ({
            name: label,
            prob: probs[selectedAction][i],
        }));
    }, [selectedAction, probs]);

    const sum = useMemo(() => chartData.reduce((a, b) => a + b.prob, 0), [chartData]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-1 flex-wrap">
                    {actions.map((a, i) => (
                        <button
                            key={a}
                            onClick={() => setSelectedAction(i)}
                            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                                i === selectedAction
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                        >
                            {a}
                        </button>
                    ))}
                </div>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'P(s\'|s,a)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
                            {chartData.map((_, i) => <Cell key={i} fill={TRANSPARENT[i % TRANSPARENT.length]} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Click action buttons above to see different transition distributions</span>
                    <span>Sum = {sum.toFixed(2)} {Math.abs(sum - 1) < 0.01 && <span className="text-emerald-500">✓</span>}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Each action has a different transition distribution. The probabilities must sum to 1 (shown above).
                    Click action buttons to see how the distribution changes per action.
                </p>
            </div>
        </EquationGraph>
    );
}
