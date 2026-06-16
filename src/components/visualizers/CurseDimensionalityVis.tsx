import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface CurseDimensionalityVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function CurseDimensionalityVis({
    formula = "|\\mathcal{S}| = d^n",
    label = 'Curse of Dimensionality — State Space Explosion',
    accent = 'red'
}: CurseDimensionalityVisProps) {
    const [dimensions, setDimensions] = useState(2);
    const [discretization, setDiscretization] = useState(5);

    const data = useMemo(() => {
        const result: { n: number; states: number }[] = [];
        for (let n = 1; n <= 12; n++) {
            result.push({ n, states: Math.pow(discretization, dimensions * n) });
        }
        return result;
    }, [dimensions, discretization]);

    const currentStates = Math.pow(discretization, dimensions);

    const logData = useMemo(() => {
        return data.map(d => ({ n: d.n, logStates: Math.log10(d.states) }));
    }, [data]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'dimensions', label: 'Dimensions per feature d', min: 1, max: 5, step: 1, default: 2 },
                { name: 'discretization', label: 'Bins per dim n', min: 2, max: 20, step: 1, default: 5 },
            ]}
            values={{ dimensions, discretization }}
            onSliderChange={(name, v) => {
                if (name === 'dimensions') setDimensions(Math.round(v));
                if (name === 'discretization') setDiscretization(Math.round(v));
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold">
                        |𝒮| = {discretization}^{dimensions} = <strong>{currentStates.toLocaleString()}</strong> states!
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="dimGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="n" tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Number of Features (n)', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'State Space Size |𝒮| (log)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} tickFormatter={v => v >= 1e6 ? `${(v / 1e6).toFixed(0)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}K` : `${v}`} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} formatter={(value: number) => [value.toLocaleString(), 'States']} />
                        <Area type="monotone" dataKey="states" stroke="#ef4444" fill="url(#dimGrad)" strokeWidth={2} name="State Space Size" />
                    </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    State space grows exponentially with dimensions. With {discretization} bins per dimension and {dimensions} features, we get <strong>{currentStates.toLocaleString()}</strong> states.
                    This is why RL needs function approximation (neural networks) for high-dimensional problems.
                </p>
            </div>
        </EquationGraph>
    );
}
