import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const ADVANTAGES = [
    { label: 'No Labeled Data', formula: 'R_{t+1} \\in \\mathbb{R}', color: '#3b82f6', desc: 'RL learns from raw reward signals, not labeled examples. The agent discovers what works through trial and error.' },
    { label: 'Handles Uncertainty', formula: '\\mathbb{E}_\\pi[G_t]', color: '#8b5cf6', desc: 'RL uses expectations to handle stochastic environments. The agent learns to act optimally even with probabilistic outcomes.' },
    { label: 'Discovers Novel Strategies', formula: '\\arg\\max_\\pi', color: '#10b981', desc: 'RL can discover strategies humans never thought of (e.g., AlphaGo\'s Move 37). The optimization objective drives creative solutions.' },
    { label: 'Adapts Over Time', formula: 'Q_{t+1} \\leftarrow Q_t + \\alpha\\delta_t', color: '#f59e0b', desc: 'RL continuously updates its policy as new data arrives. The agent improves with experience and adapts to changing environments.' },
];

interface AdvantageVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function AdvantageVis({
    formula = "\\pi^* = \\arg\\max_\\pi \\mathbb{E}_\\pi[\\sum \\gamma^t R]",
    label = "RL's Core Advantages",
    accent = 'emerald'
}: AdvantageVisProps) {
    const [selected, setSelected] = useState(0);

    const chartData = ADVANTAGES.map((a, i) => ({
        name: a.label,
        value: a.desc.length / 5,
        fill: a.color,
    }));

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-1">
                    {ADVANTAGES.map((a, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`p-2 rounded-lg text-left text-xs transition-all ${
                                i === selected
                                    ? 'ring-2 ring-offset-1 bg-white dark:bg-slate-800'
                                    : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700'
                            } border border-slate-200 dark:border-slate-700`}
                        >
                            <p className="font-semibold text-slate-700 dark:text-slate-300">{a.label}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                                <InlineMath math={a.formula} />
                            </p>
                        </button>
                    ))}
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{ADVANTAGES[selected].desc}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                        <InlineMath math={ADVANTAGES[selected].formula} />
                    </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    RL's core advantage: it optimizes long-term cumulative reward through trial and error,
                    without requiring labeled data or a supervisor. Click each advantage to learn more.
                </p>
            </div>
        </EquationGraph>
    );
}
