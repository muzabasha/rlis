import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface CTRVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function CTRVis({
    formula = "\\text{CTR}(t) = \\frac{\\sum \\mathbf{1}[\\text{click}]}{\\sum \\mathbf{1}[\\text{impression}]}",
    label = 'Click-Through Rate — Recommendation Reward',
    accent = 'emerald'
}: CTRVisProps) {
    const [ctr, setCtr] = useState(0.15);
    const [totalImpressions, setTotalImpressions] = useState(1000);

    const simData = useMemo(() => {
        const data: { t: number; clicks: number; impressions: number; ctr: number }[] = [];
        let totalClicks = 0;
        for (let t = 1; t <= 50; t++) {
            const impressions = Math.round(totalImpressions / 50);
            const clicks = Math.round(impressions * ctr * (0.8 + 0.4 * Math.random()));
            totalClicks += clicks;
            data.push({ t, clicks, impressions, ctr: parseFloat((totalClicks / (t * impressions) * 100).toFixed(2)) });
        }
        return data;
    }, [ctr, totalImpressions]);

    const avgCTR = simData.reduce((s, d) => s + d.ctr, 0) / simData.length;

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'ctr', label: 'True CTR', min: 0.01, max: 0.5, step: 0.01, default: 0.15 },
                { name: 'impressions', label: 'Total Impressions', min: 100, max: 10000, step: 100, default: 1000 },
            ]}
            values={{ ctr, impressions: totalImpressions }}
            onSliderChange={(name, v) => {
                if (name === 'ctr') setCtr(v);
                if (name === 'impressions') setTotalImpressions(Math.round(v));
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Estimated CTR ≈ <strong>{avgCTR.toFixed(2)}%</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        True CTR = {ctr * 100}%
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={simData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="ctrGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 'auto']} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="ctr" stroke="#10b981" strokeWidth={2} dot={false} name="CTR (%)" />
                    </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    CTR measures recommendation effectiveness. RL agents maximize CTR by learning which items to show.
                    The MDP: state=user profile, action=item recommendation, reward=CTR.
                </p>
            </div>
        </EquationGraph>
    );
}
