import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const ENV_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

interface UniversalIntelligenceVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const ENVIRONMENTS = [
    { key: 'chess', name: 'Chess', weight: 0.5 },
    { key: 'go', name: 'Go', weight: 0.25 },
    { key: 'atari', name: 'Atari', weight: 0.125 },
    { key: 'robotNav', name: 'Robot Navigation', weight: 0.125 },
];

export default function UniversalIntelligenceVis({
    formula = "\\Upsilon(\\pi) = \\sum_{\\mu \\in E} 2^{-K(\\mu)} V_\\mu^\\pi",
    label = 'Universal Intelligence Measure',
    accent = 'violet'
}: UniversalIntelligenceVisProps) {
    const [perf, setPerf] = useState({ chess: 50, go: 50, atari: 50, robotNav: 50 });

    const chartData = useMemo(() => {
        return ENVIRONMENTS.map((env, i) => {
            const performance = perf[env.key as keyof typeof perf] / 100;
            const contribution = env.weight * performance;
            return {
                name: env.name,
                weight: env.weight,
                contribution: parseFloat(contribution.toFixed(4)),
                remaining: parseFloat((env.weight - contribution).toFixed(4)),
            };
        });
    }, [perf]);

    const totalUpsilon = chartData.reduce((s, d) => s + d.contribution, 0);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={ENVIRONMENTS.map(env => ({
                name: env.key,
                label: env.name,
                min: 0,
                max: 100,
                step: 1,
                default: 50,
            }))}
            values={perf}
            onSliderChange={(name, v) => setPerf(prev => ({ ...prev, [name]: v }))}
        >
            <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        <InlineMath math="\\Upsilon" /> = {totalUpsilon.toFixed(4)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                        Max: 1.0000
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis domain={[0, 0.6]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Bar dataKey="contribution" stackId="a" name="Contribution">
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={ENV_COLORS[i]} />
                            ))}
                        </Bar>
                        <Bar dataKey="remaining" stackId="a" fill="#e2e8f0" name="Remaining Capacity" />
                    </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2">
                    {ENVIRONMENTS.map((env, i) => (
                        <div key={env.key} className="flex items-center gap-2 p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ENV_COLORS[i] }} />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-600 dark:text-slate-400 truncate">{env.name}</span>
                                    <span className="text-slate-500">
                                        {perf[env.key as keyof typeof perf]}%
                                    </span>
                                </div>
                                <div className="text-[9px] text-slate-400">
                                    <InlineMath math={`2^{-K} = ${env.weight}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    <InlineMath math="\\Upsilon(\\pi)" /> weights an agent's performance <InlineMath math="V_\\mu^\\pi" /> in each
                    environment <InlineMath math="\\mu" /> by its complexity <InlineMath math="2^{-K(\\mu)}" />, giving higher
                    weight to simpler environments. This balances generality with simplicity.
                </p>
            </div>
        </EquationGraph>
    );
}
