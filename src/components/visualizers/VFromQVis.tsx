import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const Q_COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

interface VFromQVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function VFromQVis({
    formula = "v_\\pi(s) = \\sum_a \\pi(a|s) \\, q_\\pi(s, a)",
    label = 'The Connection: V(s) from Q(s,a)',
    accent = 'violet'
}: VFromQVisProps) {
    const actions = ['Up', 'Right', 'Down'];
    const [qValues, setQValues] = useState([8.5, 12.3, 5.7]);
    const [policy, setPolicy] = useState([0.3, 0.5, 0.2]);

    const v = useMemo(() => {
        return qValues.reduce((sum, q, i) => sum + policy[i] * q, 0);
    }, [qValues, policy]);

    const updateQ = (idx: number, val: number) => {
        const newQ = [...qValues];
        newQ[idx] = val;
        setQValues(newQ);
    };

    const updatePolicy = (idx: number, val: number) => {
        const newP = [...policy];
        newP[idx] = Math.max(0, val);
        const sum = newP.reduce((a, b) => a + b, 0);
        if (sum > 0) setPolicy(newP.map(v => parseFloat((v / sum).toFixed(3))));
    };

    const chartData = useMemo(() => {
        return actions.map((a, i) => ({
            name: a,
            q: qValues[i],
            pi: policy[i],
            weighted: parseFloat((policy[i] * qValues[i]).toFixed(2)),
        }));
    }, [actions, qValues, policy]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="text-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500">
                        <InlineMath math="v_\\pi(s)" /> ={' '}
                        {actions.map((a, i) => `${policy[i].toFixed(2)} × ${qValues[i].toFixed(1)}`).join(' + ')}
                        {' = '}
                        <strong className="text-violet-600 dark:text-violet-400 text-sm">{v.toFixed(2)}</strong>
                    </span>
                </div>
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="p-1 text-left text-slate-400">Action</th>
                            <th className="p-1 text-center text-slate-400"><InlineMath math="q_\\pi(s,a)" /></th>
                            <th className="p-1 text-center text-slate-400"><InlineMath math="\\pi(a|s)" /></th>
                            <th className="p-1 text-center text-slate-400"><InlineMath math="\\pi \\cdot q" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartData.map((d, i) => (
                            <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50">
                                <td className="p-1 text-slate-500">{d.name}</td>
                                <td className="p-1">
                                    <input type="range" min={0} max={20} step={0.5} value={d.q}
                                        onChange={e => updateQ(i, parseFloat(e.target.value))}
                                        className="w-full h-1.5 accent-violet-500" />
                                    <span className="text-center block">{d.q.toFixed(1)}</span>
                                </td>
                                <td className="p-1">
                                    <input type="range" min={0} max={1} step={0.05} value={d.pi}
                                        onChange={e => updatePolicy(i, parseFloat(e.target.value))}
                                        className="w-full h-1.5 accent-blue-500" />
                                    <span className="text-center block">{d.pi.toFixed(2)}</span>
                                </td>
                                <td className="p-1 text-center font-bold text-violet-600 dark:text-violet-400">{d.weighted.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    The state value is the weighted average of action values under the policy.
                    Drag sliders to see how <InlineMath math="v_\\pi(s)" /> changes with Q-values or policy.
                </p>
            </div>
        </EquationGraph>
    );
}
