import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface FixedVsAdaptiveVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const PATTERNS = ['square', 'sine', 'random'] as const;
type Pattern = typeof PATTERNS[number];

const INPUT_MAP: Record<Pattern, number[]> = {
    square: [2, 9, 2, 9, 2],
    sine: [2, 7, 10, 7, 2],
    random: [4, 9, 1, 6, 3],
};

function fixedOutput(x: number): number {
    return Math.round(x * 0.6 + 1);
}

function adaptiveOutput(x: number, theta: number): number {
    return Math.min(10, Math.round(x * theta / 10 + 1));
}

export default function FixedVsAdaptiveVis({
    formula = "y = f(x) \\quad \\text{vs} \\quad \\hat{y} = f(x, \\theta)",
    label = 'Fixed vs Adaptive Logic',
    accent = 'blue'
}: FixedVsAdaptiveVisProps) {
    const [pattern, setPattern] = useState<Pattern>('square');
    const [theta, setTheta] = useState(5);

    const inputs = INPUT_MAP[pattern];
    const xLabels = inputs.map((_, i) => `x${i}`);

    const fixedData = inputs.map((v, i) => ({
        name: xLabels[i],
        value: fixedOutput(v),
    }));

    const adaptiveData = inputs.map((v, i) => ({
        name: xLabels[i],
        value: adaptiveOutput(v, theta),
    }));

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'theta', label: 'θ Bias', min: 0, max: 10, step: 0.5, default: 5 },
            ]}
            values={{ theta }}
            onSliderChange={(name, v) => {
                if (name === 'theta') setTheta(v);
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-1">
                    {PATTERNS.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPattern(p)}
                            className={`px-2 py-1 text-[10px] rounded-lg transition-colors lowercase ${
                                pattern === p
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 text-center">
                            <InlineMath math="\\text{Traditional: } y = f(x)" />
                        </div>
                        <ResponsiveContainer width="100%" height={130}>
                            <BarChart data={fixedData} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <YAxis hide domain={[0, 10]} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '11px', background: '#1e293b', color: '#e2e8f0' }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-[10px] text-slate-400 text-center mt-1">
                            Static rules — no adaptation
                        </p>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 text-center">
                            <InlineMath math="\\text{Intelligent: } \\hat{y} = f(x, \\theta)" />
                        </div>
                        <ResponsiveContainer width="100%" height={130}>
                            <BarChart data={adaptiveData} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <YAxis hide domain={[0, 10]} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '11px', background: '#1e293b', color: '#e2e8f0' }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {adaptiveData.map((entry, i) => (
                                        <Cell key={i} fill={entry.value > fixedData[i].value ? '#10b981' : entry.value < fixedData[i].value ? '#f59e0b' : '#8b5cf6'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-[10px] text-slate-400 text-center mt-1">
                            θ = {theta.toFixed(1)} — adapts to input
                        </p>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Fixed logic uses static rules (<InlineMath math="y = f(x)" />) unaffected by parameters.
                    Adaptive logic (<InlineMath math="\\hat{y} = f(x, \\theta)" />) adjusts outputs based on
                    the learned bias parameter θ. Change the input pattern or slide θ to compare.
                </p>
            </div>
        </EquationGraph>
    );
}
