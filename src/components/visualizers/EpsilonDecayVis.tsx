import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface EpsilonDecayVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function EpsilonDecayVis({
    formula = "\\varepsilon_t = \\varepsilon_{\\min} + (\\varepsilon_{\\max} - \\varepsilon_{\\min}) e^{-\\lambda t}",
    label = 'Epsilon Decay Schedule',
    accent = 'amber'
}: EpsilonDecayVisProps) {
    const [epsMax, setEpsMax] = useState(1.0);
    const [epsMin, setEpsMin] = useState(0.01);
    const [lambda, setLambda] = useState(0.005);

    const decayData = useMemo(() => {
        const data: { t: number; eps: number }[] = [];
        const steps = 200;
        for (let i = 0; i <= steps; i++) {
            const t = i * 5;
            const eps = epsMin + (epsMax - epsMin) * Math.exp(-lambda * t);
            data.push({ t, eps });
        }
        return data;
    }, [epsMax, epsMin, lambda]);

    const currentEps = useMemo(() => {
        return epsMin + (epsMax - epsMin) * Math.exp(-lambda * 500);
    }, [epsMax, epsMin, lambda]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'epsMax', label: 'ε_max', min: 0.1, max: 1.0, step: 0.05, default: 1.0 },
                { name: 'epsMin', label: 'ε_min', min: 0, max: 0.5, step: 0.01, default: 0.01 },
                { name: 'lambda', label: 'Decay Rate λ', min: 0.0001, max: 0.05, step: 0.0001, default: 0.005 },
            ]}
            values={{ epsMax, epsMin, lambda }}
            onSliderChange={(name, v) => {
                if (name === 'epsMax') setEpsMax(v);
                if (name === 'epsMin') setEpsMin(v);
                if (name === 'lambda') setLambda(v);
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        <InlineMath math="\varepsilon_{500}" /> ≈ <strong>{currentEps.toFixed(3)}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Half-life ≈ <strong>{(Math.log(2) / lambda).toFixed(0)}</strong> steps
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={decayData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Time Step t', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'ε(t)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line type="monotone" dataKey="eps" stroke="#f59e0b" strokeWidth={2} dot={false} name="ε(t)" />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    ε decays exponentially from <InlineMath math="\varepsilon_{\max}" /> to <InlineMath math="\varepsilon_{\min}" />. Fast decay (high λ) = agent exploits sooner.
                    Slow decay (low λ) = agent explores longer.
                </p>
            </div>
        </EquationGraph>
    );
}
