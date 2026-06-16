import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const SOFTMAX_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#84cc16'];

interface SoftmaxVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function SoftmaxVis({
    formula = "\\pi_\\theta(a\\mid s) = \\frac{\\exp(\\theta_a)}{\\sum_{a'}\\exp(\\theta_{a'})}",
    label = 'Softmax Policy',
    accent = 'violet'
}: SoftmaxVisProps) {
    const [thetaValues, setThetaValues] = useState([2.0, 1.0, 0.5, 0.1]);
    const [temperature, setTemperature] = useState(1.0);

    const probs = useMemo(() => {
        const scaled = thetaValues.map(t => Math.exp(t / temperature));
        const sum = scaled.reduce((a, b) => a + b, 0);
        return scaled.map((v, i) => ({
            action: `a${i + 1}`,
            theta: thetaValues[i],
            prob: sum > 0 ? v / sum : 1 / thetaValues.length,
            raw: v,
        }));
    }, [thetaValues, temperature]);

    const updateTheta = (index: number, value: number) => {
        const newVals = [...thetaValues];
        newVals[index] = value;
        setThetaValues(newVals);
    };

    const dominantAction = useMemo(() => {
        const maxIdx = probs.reduce((best, p, i, arr) => p.prob > arr[best].prob ? i : best, 0);
        return { index: maxIdx, ...probs[maxIdx] };
    }, [probs]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            defaultOpen={true}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Dominant: <InlineMath math={`a_{${dominantAction.index + 1}}`} /> = {(dominantAction.prob * 100).toFixed(1)}%
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Temperature τ = {temperature.toFixed(1)}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Action Preference Parameters <InlineMath math="\\theta_a" /></p>
                        {thetaValues.map((v, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                                <span className="w-8 text-slate-500"><InlineMath math={`\\theta_{${i + 1}}`} /></span>
                                <input
                                    type="range"
                                    min={-3}
                                    max={3}
                                    step={0.1}
                                    value={v}
                                    onChange={e => updateTheta(i, parseFloat(e.target.value))}
                                    className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-violet-500"
                                />
                                <span className="w-10 text-right text-slate-500">{v.toFixed(1)}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-xs pt-1 border-t border-slate-200 dark:border-slate-600">
                            <span className="w-8 text-slate-500"><InlineMath math="\\tau" /></span>
                            <input
                                type="range"
                                min={0.1}
                                max={5}
                                step={0.1}
                                value={temperature}
                                onChange={e => setTemperature(parseFloat(e.target.value))}
                                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-violet-500"
                            />
                            <span className="w-10 text-right text-slate-500">{temperature.toFixed(1)}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Action Probabilities</p>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={probs} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="action" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                                <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
                                    {probs.map((_, i) => <Cell key={i} fill={SOFTMAX_COLORS[i % SOFTMAX_COLORS.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Higher <InlineMath math="\\theta_a" /> = stronger preference for action a. Low temperature (τ→0) makes policy nearly deterministic.
                    High temperature (τ→∞) makes all actions equally probable.
                </p>
            </div>
        </EquationGraph>
    );
}
