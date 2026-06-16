import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const OPT_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

interface BellmanOptimalityVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function BellmanOptimalityVis({
    formula = "v_*(s) = \\max_a \\sum_{s'} P(s'|s,a)[R + \\gamma v_*(s')]",
    label = 'Bellman Optimality Equation',
    accent = 'violet'
}: BellmanOptimalityVisProps) {
    const [gamma, setGamma] = useState(0.9);

    const states = ['S₁', 'S₂', 'S₃', 'S₄'];
    const NUM_STATES = 4;

    const actionValues = useMemo(() => {
        const values: { state: string; actions: { name: string; q: number }[] }[] = [];
        for (let s = 0; s < NUM_STATES; s++) {
            const actions: { name: string; q: number }[] = [];
            const numActions = 3;
            for (let a = 0; a < numActions; a++) {
                let q = (s + 1) * 2;
                for (let sp = 0; sp < NUM_STATES; sp++) {
                    const p = 1 / NUM_STATES;
                    const reward = sp === NUM_STATES - 1 ? 10 : -1;
                    q += p * gamma * (sp + 1) * 1.5;
                }
                q += (Math.random() - 0.5) * 3;
                actions.push({ name: `a${a + 1}`, q: parseFloat(q.toFixed(1)) });
            }
            actions.sort((a, b) => b.q - a.q);
            values.push({ state: states[s], actions });
        }
        return values;
    }, [gamma]);

    const chartData = useMemo(() => {
        return actionValues.map(sv => ({
            name: sv.state,
            value: sv.actions[0].q,
            maxAction: sv.actions[0].name,
        }));
    }, [actionValues]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[{ name: 'gamma', label: 'Discount γ', min: 0, max: 0.99, step: 0.01, default: 0.9 }]}
            values={{ gamma }}
            onSliderChange={(_, v) => setGamma(v)}
        >
            <div className="space-y-3">
                <div className="grid grid-cols-4 gap-1">
                    {actionValues.map((sv, si) => (
                        <div key={si} className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <p className="text-[10px] font-medium text-slate-500 mb-1"><InlineMath math={`${sv.state}`} /></p>
                            {sv.actions.slice(0, 3).map((a, ai) => (
                                <div key={ai} className={`flex justify-between text-[9px] px-1 py-0.5 rounded ${ai === 0 ? 'bg-violet-50 dark:bg-violet-900/20 font-bold text-violet-600 dark:text-violet-400' : 'text-slate-400'}`}>
                                    <span><InlineMath math={a.name} /></span>
                                    <span>{a.q.toFixed(1)}</span>
                                </div>
                            ))}
                            <p className="text-[9px] text-emerald-500 mt-0.5">
                                <InlineMath math="v_*" /> = {sv.actions[0].q.toFixed(1)}
                            </p>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    <InlineMath math="v_*(s) = \\max_a q_*(s,a)" /> — the optimal value is the maximum over actions.
                    The optimal policy is greedy with respect to <InlineMath math="v_*" /> or <InlineMath math="q_*" />.
                    For each state shown, the highest-Q action (highlighted) determines <InlineMath math="v_*(s)" />.
                </p>
            </div>
        </EquationGraph>
    );
}
