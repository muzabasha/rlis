import React, { useState, useMemo } from 'react';
import { ResponsiveContainer } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface RecursiveReturnVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function RecursiveReturnVis({
    formula = "G_t = R_{t+1} + \\gamma G_{t+1}",
    label = 'Recursive Return — Bellman Decomposition',
    accent = 'violet'
}: RecursiveReturnVisProps) {
    const [gamma, setGamma] = useState(0.9);
    const [rewards, setRewards] = useState([5, 3, -2, 8, 1]);

    const returns = useMemo(() => {
        const G = Array(rewards.length).fill(0);
        for (let t = rewards.length - 1; t >= 0; t--) {
            G[t] = rewards[t] + (t < rewards.length - 1 ? gamma * G[t + 1] : 0);
        }
        return G.map(v => parseFloat(v.toFixed(2)));
    }, [rewards, gamma]);

    const updateReward = (idx: number, value: number) => {
        const newR = [...rewards];
        newR[idx] = value;
        setRewards(newR);
    };

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
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="p-1 text-left text-slate-400 font-medium">Step</th>
                            {rewards.map((_, i) => (
                                <th key={i} className="p-1 text-center text-slate-400 font-medium">
                                    <InlineMath math={`t{+}${i}`} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-100 dark:border-slate-700/50">
                            <td className="p-1 text-slate-500 font-medium">
                                <InlineMath math="R_{t+k+1}" />
                            </td>
                            {rewards.map((r, i) => (
                                <td key={i} className="p-1">
                                    <input
                                        type="number"
                                        value={r}
                                        onChange={e => updateReward(i, parseFloat(e.target.value) || 0)}
                                        className="w-full text-center p-0.5 text-xs rounded border border-slate-200 dark:border-slate-600 bg-transparent focus:outline-none focus:ring-1 focus:ring-violet-400"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="p-1 text-slate-500 font-medium">
                                <InlineMath math="G_{t+k}" />
                            </td>
                            {returns.map((g, i) => (
                                <td key={i} className="p-1 text-center">
                                    <span className={`font-bold ${i === 0 ? 'text-violet-600 dark:text-violet-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                        {g.toFixed(2)}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        G<sub>0</sub> = {rewards[0]} + {gamma} × {returns[1].toFixed(2)} = <strong className="text-violet-600 dark:text-violet-400">{returns[0].toFixed(2)}</strong>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Each return is computed backwards from the last step. The tree decomposition shows how <InlineMath math="G_t" /> depends on <InlineMath math="R_{t+1}" /> and <InlineMath math="G_{t+1}" />. Edit reward values above to experiment.
                    </p>
                </div>
            </div>
        </EquationGraph>
    );
}
