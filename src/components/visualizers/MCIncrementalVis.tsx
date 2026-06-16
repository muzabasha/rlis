import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface MCIncrementalVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

interface EpisodePoint {
    episode: number;
    estimate: number;
    trueValue: number;
}

export default function MCIncrementalVis({
    formula = "V(s) \\leftarrow V(s) + \\frac{1}{N(s)}[G - V(s)]",
    label = "Incremental MC Update",
    accent = 'violet'
}: MCIncrementalVisProps) {
    const [trueValue, setTrueValue] = useState(10);
    const [noiseLevel, setNoiseLevel] = useState(2);
    const [vEstimate, setVEstimate] = useState(0);
    const [n, setN] = useState(0);
    const [history, setHistory] = useState<EpisodePoint[]>([]);

    const handleSliderChange = (name: string, value: number) => {
        if (name === 'trueValue') {
            setTrueValue(value);
        } else if (name === 'noiseLevel') {
            setNoiseLevel(value);
        }
    };

    const sampleReturn = () => {
        const noise = (Math.random() * 2 - 1) * noiseLevel;
        const g = trueValue + noise;
        const newN = n + 1;
        const newV = vEstimate + (1 / newN) * (g - vEstimate);
        setVEstimate(newV);
        setN(newN);
        setHistory(prev => [...prev, {
            episode: newN,
            estimate: newV,
            trueValue: trueValue,
        }]);
    };

    const reset = () => {
        setVEstimate(0);
        setN(0);
        setHistory([]);
    };

    const error = Math.abs(vEstimate - trueValue);
    const converged = error < 0.5;

    const chartData = useMemo(() => history, [history]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'trueValue', label: 'True Value V*', min: 0, max: 20, step: 1, default: 10 },
                { name: 'noiseLevel', label: 'Noise Level σ', min: 0, max: 5, step: 0.5, default: 2 },
            ]}
            values={{ trueValue, noiseLevel }}
            onSliderChange={handleSliderChange}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        N = <strong>{n}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        V(s) = <strong>{vEstimate.toFixed(3)}</strong>
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        V* = <strong>{trueValue}</strong>
                    </span>
                    <span className={`px-2 py-1 rounded ${converged ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                        Error = <strong>{error.toFixed(3)}</strong>
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="episode" tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Episode', position: 'insideBottomRight', offset: -5, style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, Math.max(20, trueValue + 5)]} label={{ value: 'V(s)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        {history.length > 0 && <ReferenceLine y={trueValue} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'True V*', position: 'right', style: { fontSize: 10, fill: '#10b981' } }} />}
                        <Line type="monotone" dataKey="estimate" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6' }} name="V(s) Estimate" />
                    </LineChart>
                </ResponsiveContainer>
                <div className="flex gap-2">
                    <button
                        onClick={sampleReturn}
                        className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-500 hover:bg-violet-600 text-white transition-colors"
                    >
                        Sample New Return
                    </button>
                    <button
                        onClick={reset}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                        Reset
                    </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Each sample generates a return <InlineMath math="G \\sim V^* + \\mathcal{N}(0,\\sigma)" /> and updates
                    the estimate via <InlineMath math="V(s) \\leftarrow V(s) + \\frac{1}{N}[G - V(s)]" />.
                    Over many episodes, V(s) converges to the true value.
                </p>
            </div>
        </EquationGraph>
    );
}
