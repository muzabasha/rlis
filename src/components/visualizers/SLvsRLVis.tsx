import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface SLvsRLVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const PARADIGMS = [
    { name: 'SL', color: '#3b82f6', data: 'Labeled Data', feedback: 'Direct error', goal: 'Minimize error' },
    { name: 'UL', color: '#10b981', data: 'Unlabeled Data', feedback: 'No feedback', goal: 'Find patterns' },
    { name: 'RL', color: '#f59e0b', data: 'Reward Signal', feedback: 'Delayed reward', goal: 'Maximize return' },
];

export default function SLvsRLVis({
    formula = "",
    label = 'SL vs UL vs RL — Comparison',
    accent = 'blue'
}: SLvsRLVisProps) {
    const [view, setView] = useState(0);
    const views = ['Data Source', 'Feedback Type', 'Optimization Objective'];

    const chartData = PARADIGMS.map(p => ({
        name: p.name,
        value: [p.data.length, p.feedback.length, p.goal.length][view],
        label: [p.data, p.feedback, p.goal][view],
    }));

    const formulas = [
        { sl: '\\min_\\theta \\mathcal{L}(f_\\theta(x), y)', rl: '\\max_\\pi \\mathbb{E}[G_t]' },
    ];

    return (
        <EquationGraph
            formula={formula || "\\text{SL: }\\min\\mathcal{L}(f_\\theta(x),y) \\quad \\text{RL: }\\max\\mathbb{E}[G_t]"}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-1">
                    {PARADIGMS.map((p, i) => (
                        <div key={i} className="text-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="text-lg font-bold" style={{ color: p.color }}>{p.name}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{p.data}</div>
                            <div className="text-[10px] text-slate-400">{p.feedback}</div>
                            <div className="text-[10px] text-slate-400">{p.goal}</div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                    {views.map((v, i) => (
                        <button
                            key={v}
                            onClick={() => setView(i)}
                            className={`px-2 py-1 text-[10px] rounded-lg transition-colors ${
                                view === i
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                            }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
                <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={chartData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((_, i) => <Cell key={i} fill={PARADIGMS[i].color} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    SL learns from labeled pairs (x,y). UL finds hidden structure. RL learns from trial-and-error with delayed rewards.
                    Click the view buttons above to compare different aspects.
                </p>
            </div>
        </EquationGraph>
    );
}
