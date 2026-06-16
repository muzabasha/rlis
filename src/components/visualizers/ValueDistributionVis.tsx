import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const VAL_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

interface ValueDistributionVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
    type?: 'state-value' | 'action-value';
}

const DEFAULT_STATE_VALUES = [12.5, 8.3, 15.1, 5.2, 20.0, 3.7, 11.4, 9.8];

export default function ValueDistributionVis({
    formula = "v_\\pi(s) = \\mathbb{E}_\\pi[G_t \\mid S_t=s]",
    label = 'State-Value Function',
    accent = 'emerald',
    type = 'state-value'
}: ValueDistributionVisProps) {
    const [values, setValues] = useState(DEFAULT_STATE_VALUES);

    const updateValue = (index: number, newVal: number) => {
        const newVals = [...values];
        newVals[index] = newVal;
        setValues(newVals);
    };

    const chartData = useMemo(() => {
        const labelPrefix = type === 'state-value' ? 'S' : 'Q';
        return values.map((v, i) => ({
            name: type === 'state-value' ? `${labelPrefix}${i + 1}` : `${labelPrefix}(${i + 1})`,
            value: v,
            index: i,
        }));
    }, [values, type]);

    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Max: <strong>{maxVal.toFixed(1)}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Min: <strong>{minVal.toFixed(1)}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Mean: <strong>{(values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)}</strong>
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Value', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.value === maxVal ? '#10b981' : entry.value === minVal ? '#ef4444' : VAL_COLORS[i % VAL_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-4 gap-1">
                    {values.map((v, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs">
                            <span className="text-slate-500 w-8"><InlineMath math={`${type === 'state-value' ? 's' : 'q'}_{${i + 1}}`} /></span>
                            <input
                                type="range"
                                min={0}
                                max={30}
                                step={0.5}
                                value={v}
                                onChange={e => updateValue(i, parseFloat(e.target.value))}
                                className="flex-1 h-1 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-emerald-500"
                            />
                            <span className="w-8 text-right text-slate-500">{v.toFixed(1)}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Drag sliders to change each {type === 'state-value' ? "state's value" : "action's value"}.
                    The agent prefers states/actions with higher values.
                </p>
            </div>
        </EquationGraph>
    );
}
