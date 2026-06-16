import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface RewardShapingVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function RewardShapingVis({
    formula = "R'(s,a,s') = R(s,a,s') + \\gamma\\Phi(s') - \\Phi(s)",
    label = 'Potential-Based Reward Shaping',
    accent = 'red'
}: RewardShapingVisProps) {
    const [phiWeight, setPhiWeight] = useState(5);
    const [gamma, setGamma] = useState(0.9);

    const data = useMemo(() => {
        const result: { step: number; R: number; phi: number; gammaPhiNext: number; Rshaped: number }[] = [];
        for (let i = 0; i < 10; i++) {
            const R = i === 9 ? 10 : -0.5;
            const phi = phiWeight * (i / 10);
            const phiNext = phiWeight * ((i + 1) / 10);
            const gammaPhiNext = gamma * phiNext;
            const Rshaped = R + gammaPhiNext - phi;
            result.push({ step: i + 1, R, phi, gammaPhiNext, Rshaped: parseFloat(Rshaped.toFixed(2)) });
        }
        return result;
    }, [phiWeight, gamma]);

    const totalOriginal = data.reduce((s, d) => s + d.R, 0);
    const totalShaped = data.reduce((s, d) => s + d.Rshaped, 0);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'phiWeight', label: 'Potential Weight', min: 0, max: 20, step: 0.5, default: 5 },
                { name: 'gamma', label: 'Discount γ', min: 0, max: 0.99, step: 0.01, default: 0.9 },
            ]}
            values={{ phiWeight, gamma }}
            onSliderChange={(name, v) => {
                if (name === 'phiWeight') setPhiWeight(v);
                if (name === 'gamma') setGamma(v);
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Original Sum: <strong>{totalOriginal.toFixed(1)}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Shaped Sum: <strong>{totalShaped.toFixed(1)}</strong>
                        <span className="text-emerald-500 ml-1">
                            {Math.abs(totalOriginal - totalShaped) < 0.1 ? '(preserved)' : '(changed)'}
                        </span>
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="step" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line type="monotone" dataKey="R" stroke="#3b82f6" strokeWidth={2} dot={true} name="Original R" />
                        <Line type="monotone" dataKey="Rshaped" stroke="#ef4444" strokeWidth={2} dot={true} name="Shaped R'" />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Potential-based shaping preserves the optimal policy (policy invariance).
                    <InlineMath math="\\Phi(s)" /> encodes domain knowledge (e.g., distance to goal).
                    Higher potential = more guidance toward desired states.
                </p>
            </div>
        </EquationGraph>
    );
}
