import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EquationGraph from './EquationGraph';

interface UCBVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function UCBVis({
    formula = "A_t = \\arg\\max_a\\bigl[Q_t(a) + c\\sqrt{\\ln t / N_t(a)}\\bigr]",
    label = 'UCB1 — Upper Confidence Bound',
    accent = 'violet'
}: UCBVisProps) {
    const [c, setC] = useState(2);
    const [t, setT] = useState(100);
    const [nA, setNA] = useState(5);

    const bonusData = useMemo(() => {
        const data: { n: number; bonus: number; lnTerm: number }[] = [];
        const lnT = Math.log(t);
        for (let n = 1; n <= Math.max(nA * 3, 30); n++) {
            const bonus = c * Math.sqrt(lnT / n);
            data.push({ n, bonus, lnTerm: Math.sqrt(lnT / n) });
        }
        return data;
    }, [c, t, nA]);

    const currentBonus = useMemo(() => {
        return c * Math.sqrt(Math.log(t) / nA);
    }, [c, t, nA]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'c', label: 'Exploration Constant c', min: 0, max: 5, step: 0.1, default: 2 },
                { name: 't', label: 'Total Steps t', min: 10, max: 10000, step: 10, default: 100 },
                { name: 'nA', label: 'Action Count N_t(a)', min: 1, max: 200, step: 1, default: 5 },
            ]}
            values={{ c, t, nA }}
            onSliderChange={(name, v) => {
                if (name === 'c') setC(v);
                if (name === 't') setT(Math.round(v));
                if (name === 'nA') setNA(Math.round(v));
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Exploration Bonus ≈ <strong>{currentBonus.toFixed(3)}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        UCB = Q<sub>t</sub>(a) + {currentBonus.toFixed(3)}
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={bonusData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="bonusGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="n" tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Action Count N_t(a)', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Bonus', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} domain={[0, 'auto']} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Area type="monotone" dataKey="bonus" stroke="#8b5cf6" fill="url(#bonusGrad)" name="UCB Bonus" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <p>• The vertical line shows your current action count N<sub>t</sub>(a) = {nA} with bonus = <strong>{currentBonus.toFixed(3)}</strong></p>
                    <p>• Bonus is high when N<sub>t</sub>(a) is small (uncertain actions) and shrinks as the action is tried more.</p>
                    <p>• Higher c = more exploration. c = √2 is theoretically optimal for Bernoulli bandits.</p>
                </div>
            </div>
        </EquationGraph>
    );
}
