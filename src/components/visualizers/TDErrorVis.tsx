import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface TDErrorVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function TDErrorVis({
    formula = "\\delta_t = r_{t+1} + \\gamma \\max_a Q(s_{t+1}, a) - Q(s_t, a_t)",
    label = "TD Error Computation",
    accent = 'red'
}: TDErrorVisProps) {
    const [r, setR] = useState(3);
    const [gamma, setGamma] = useState(0.9);
    const [maxQNext, setMaxQNext] = useState(8);
    const [qCurrent, setQCurrent] = useState(5);

    const target = r + gamma * maxQNext;
    const delta = target - qCurrent;

    const chartData = useMemo(() => [
        { name: 'Target', value: parseFloat(target.toFixed(2)), fill: '#10b981' },
        { name: 'Current', value: parseFloat(qCurrent.toFixed(2)), fill: '#3b82f6' },
        { name: 'TD Error δ', value: parseFloat(delta.toFixed(2)), fill: delta >= 0 ? '#ef4444' : '#f97316' },
    ], [target, qCurrent, delta]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'r', label: 'Reward r', min: -10, max: 10, step: 1, default: 3 },
                { name: 'gamma', label: 'Discount γ', min: 0, max: 1, step: 0.05, default: 0.9 },
                { name: 'maxQNext', label: 'max Q(s\')', min: 0, max: 20, step: 1, default: 8 },
                { name: 'qCurrent', label: 'Q(s,a)', min: 0, max: 20, step: 1, default: 5 },
            ]}
            values={{ r, gamma, maxQNext, qCurrent }}
            onSliderChange={(name, v) => {
                if (name === 'r') setR(v);
                if (name === 'gamma') setGamma(v);
                if (name === 'maxQNext') setMaxQNext(v);
                if (name === 'qCurrent') setQCurrent(v);
            }}
        >
            <div className="space-y-3">
                <div className="flex items-center justify-center gap-4 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500">
                        <InlineMath math="\\delta =" />{' '}
                        <span className="text-emerald-500">{r}</span>
                        {' + '}
                        <span className="text-violet-500">{gamma.toFixed(2)}</span>
                        {' × '}
                        <span className="text-blue-500">{maxQNext}</span>
                        {' - '}
                        <span className="text-slate-500">{qCurrent}</span>
                        {' = '}
                        <strong className={`text-sm ${delta >= 0 ? 'text-red-500' : 'text-orange-500'}`}>
                            {delta.toFixed(2)}
                        </strong>
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={['auto', 'auto']} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px', background: '#1e293b', color: '#e2e8f0' }} />
                        <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    The TD error measures the difference between the estimated target
                    (<InlineMath math="r + \\gamma \\max_a Q(s', a)" />) and the current estimate
                    (<InlineMath math="Q(s,a)" />). A positive δ means the agent underestimated
                    the value; a negative δ means it overestimated. This error drives Q-learning updates.
                </p>
            </div>
        </EquationGraph>
    );
}
