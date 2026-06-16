import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface DiscountCurveVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
    steps?: number;
}

export default function DiscountCurveVis({
    formula = "G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}",
    label = 'Discounted Return',
    accent = 'violet',
    steps = 20
}: DiscountCurveVisProps) {
    const [gamma, setGamma] = useState(0.9);

    const discountData = useMemo(() => {
        const data: { k: number; weight: number; cumulative: number }[] = [];
        let cum = 0;
        for (let k = 0; k < steps; k++) {
            const w = Math.pow(gamma, k);
            cum += w;
            data.push({ k, weight: w, cumulative: cum });
        }
        return data;
    }, [gamma, steps]);

    const totalReturn = useMemo(() => {
        let sum = 0;
        for (let k = 0; k < steps; k++) sum += Math.pow(gamma, k);
        return sum;
    }, [gamma, steps]);

    const halfLife = useMemo(() => {
        if (gamma <= 0) return 0;
        return Math.log(0.5) / Math.log(gamma);
    }, [gamma]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[{ name: 'gamma', label: 'Discount Factor γ', min: 0, max: 0.99, step: 0.01, default: 0.9 }]}
            values={{ gamma }}
            onSliderChange={(_, v) => setGamma(v)}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        <InlineMath math="\\gamma" /> = {gamma.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Total Discount = {totalReturn.toFixed(3)}
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Half-life ≈ {halfLife.toFixed(1)} steps
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={discountData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="k" tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Step k', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Discount Weight γᵏ', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Bar dataKey="weight" fill="#8b5cf6" radius={[2, 2, 0, 0]} name="Discount Weight γᵏ" />
                    </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Higher γ means future rewards matter more (long-term planning). Lower γ means the agent is myopic.
                    Drag the slider to see how the discount curve changes.
                </p>
            </div>
        </EquationGraph>
    );
}
