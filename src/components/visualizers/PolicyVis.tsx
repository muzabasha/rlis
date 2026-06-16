import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const POLICY_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

interface PolicyVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function PolicyVis({
    formula = "\\pi(a|s) \\in [0,1]",
    label = 'Policy Type Comparison',
    accent = 'blue'
}: PolicyVisProps) {
    const [mode, setMode] = useState<'deterministic' | 'stochastic'>('deterministic');
    const [deterministicAction, setDeterministicAction] = useState(0);
    const [logits, setLogits] = useState([2.0, 1.0, 0.5, 0.1]);

    const barData = useMemo(() => {
        if (mode === 'deterministic') {
            return Array.from({ length: 4 }, (_, i) => ({
                action: `a${i + 1}`,
                prob: i === deterministicAction ? 1 : 0,
            }));
        }
        const exp = logits.map(l => Math.exp(l));
        const sum = exp.reduce((a, b) => a + b, 0);
        return logits.map((_, i) => ({
            action: `a${i + 1}`,
            prob: sum > 0 ? exp[i] / sum : 0.25,
        }));
    }, [mode, deterministicAction, logits]);

    const updateLogit = (index: number, value: number) => {
        const newVals = [...logits];
        newVals[index] = value;
        setLogits(newVals);
    };

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            defaultOpen={true}
        >
            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => setMode('deterministic')}
                        className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${mode === 'deterministic'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                    >
                        Deterministic
                    </button>
                    <button
                        onClick={() => setMode('stochastic')}
                        className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${mode === 'stochastic'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                    >
                        Stochastic
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            {mode === 'deterministic' ? 'Click an action to make it the sole choice' : 'Action Preference Parameters'}
                        </p>
                        {mode === 'deterministic' ? (
                            barData.map((d, i) => (
                                <button
                                    key={i}
                                    onClick={() => setDeterministicAction(i)}
                                    className={`w-full flex items-center gap-2 text-xs p-1.5 rounded-md transition-colors ${i === deterministicAction
                                        ? 'bg-blue-50 dark:bg-blue-900/20'
                                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                                    }`}
                                >
                                    <span className="w-8 text-slate-500"><InlineMath math={`a_{${i + 1}}`} /></span>
                                    <div className="flex-1 h-4 rounded bg-slate-200 dark:bg-slate-600 overflow-hidden">
                                        <div
                                            className="h-full rounded transition-all"
                                            style={{
                                                width: `${d.prob * 100}%`,
                                                backgroundColor: POLICY_COLORS[i % POLICY_COLORS.length],
                                            }}
                                        />
                                    </div>
                                    <span className="w-10 text-right text-slate-500">{(d.prob * 100).toFixed(0)}%</span>
                                </button>
                            ))
                        ) : (
                            logits.map((v, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                    <span className="w-8 text-slate-500"><InlineMath math={`\\theta_{${i + 1}}`} /></span>
                                    <input
                                        type="range"
                                        min={-3}
                                        max={3}
                                        step={0.1}
                                        value={v}
                                        onChange={e => updateLogit(i, parseFloat(e.target.value))}
                                        className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-blue-500"
                                    />
                                    <span className="w-10 text-right text-slate-500">{v.toFixed(1)}</span>
                                </div>
                            ))
                        )}
                        <div className="flex gap-2 flex-wrap text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-600">
                            {mode === 'deterministic' ? (
                                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                                    Policy: <strong>Deterministic</strong> — <InlineMath math={`\\pi(a_{${deterministicAction + 1}}|s)=1`} />
                                </span>
                            ) : (
                                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                                    Policy: <strong>Stochastic</strong> — Probabilities sum to 1 (softmax)
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Action Probabilities</p>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={barData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="action" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                                <Bar
                                    dataKey="prob"
                                    radius={[4, 4, 0, 0]}
                                    cursor={mode === 'deterministic' ? 'pointer' : 'default'}
                                    onClick={mode === 'deterministic' ? (data) => {
                                        if (data?.activeLabel) {
                                            const idx = parseInt(data.activeLabel.replace('a', '')) - 1;
                                            if (idx >= 0) setDeterministicAction(idx);
                                        }
                                    } : undefined}
                                >
                                    {barData.map((_, i) => <Cell key={i} fill={POLICY_COLORS[i % POLICY_COLORS.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {mode === 'deterministic'
                        ? 'Deterministic policies always pick one action. Stochastic policies sample from a probability distribution, enabling exploration.'
                        : <>Stochastic policies use softmax over preference parameters. Higher <InlineMath math="\\theta_a" /> = higher probability for action a.</>
                    }
                </p>
            </div>
        </EquationGraph>
    );
}
