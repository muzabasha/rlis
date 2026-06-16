import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface ExpectedRewardVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function ExpectedRewardVis({
    formula = "\\mathcal{R}(s,a) = \\mathbb{E}[R_{t+1} \\mid S_t=s, A_t=a] = \\sum_{s'} P(s'|s,a) \\cdot r(s,a,s')",
    label = 'Expected Reward Function',
    accent = 'emerald'
}: ExpectedRewardVisProps) {
    const stateLabels = ['Search-High', 'Search-Low', 'Wait-High', 'Wait-Low'];
    const [selected, setSelected] = useState(0);

    const rewards = useMemo(() => [
        { label: 'S=High, A=Search', outcomes: [{ s: 'High', p: 0.7, r: 4 }, { s: 'Low', p: 0.3, r: 4 }] },
        { label: 'S=Low, A=Search', outcomes: [{ s: 'High', p: 0.1, r: 3 }, { s: 'Low', p: 0.9, r: 3 }] },
        { label: 'S=High, A=Wait', outcomes: [{ s: 'High', p: 1.0, r: 1 }] },
        { label: 'S=Low, A=Wait', outcomes: [{ s: 'Low', p: 1.0, r: 2 }] },
    ], []);

    const current = rewards[selected];
    const expectedReward = current.outcomes.reduce((s, o) => s + o.p * o.r, 0);

    const outcomeChart = current.outcomes.map(o => ({
        name: o.s,
        prob: o.p,
        reward: o.r,
        weighted: o.p * o.r,
    }));

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-1 flex-wrap">
                    {rewards.map((r, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`px-2 py-1 text-[10px] rounded-lg transition-colors ${
                                i === selected
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1">Outcome Probabilities</p>
                        <ResponsiveContainer width="100%" height={120}>
                            <BarChart data={outcomeChart} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <YAxis domain={[0, 1]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <Bar dataKey="prob" radius={[3, 3, 0, 0]}>
                                    {outcomeChart.map((_, i) => <Cell key={i} fill={['#10b981', '#3b82f6', '#f59e0b'][i]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1">Reward × Probability</p>
                        <ResponsiveContainer width="100%" height={120}>
                            <BarChart data={outcomeChart} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <Bar dataKey="weighted" radius={[3, 3, 0, 0]} fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500">
                        <InlineMath math="\\mathbb{E}[R]" /> = {current.outcomes.map(o => `${o.p}×${o.r}`).join(' + ')} ={' '}
                        <strong className="text-emerald-600 dark:text-emerald-400">{expectedReward.toFixed(2)}</strong>
                    </span>
                </div>
            </div>
        </EquationGraph>
    );
}
