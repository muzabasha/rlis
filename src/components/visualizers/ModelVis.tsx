import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface ModelVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function ModelVis({
    formula = "\\hat{s}_{t+1}, \\hat{r}_{t+1} = \\mathcal{M}_\\phi(s_t, a_t)",
    label = 'Model-Based Approach — Learned Environment Model',
    accent = 'violet'
}: ModelVisProps) {
    const states = ['S₁', 'S₂', 'S₃'];
    const actions = ['a₁', 'a₂'];
    const [selectedState, setSelectedState] = useState(0);
    const [selectedAction, setSelectedAction] = useState(0);

    const [predictedNext, setPredictedNext] = useState([1, 0, 0]);
    const [predictedReward, setPredictedReward] = useState(0.5);

    const [learning, setLearning] = useState(0);

    const learn = () => {
        setLearning(prev => Math.min(prev + 1, 10));
        const trueNext = [0.1, 0.7, 0.2];
        const trueReward = 2.0;
        const lr = 0.3;
        setPredictedNext(prev => prev.map((v, i) => v + lr * (trueNext[i] - v)).map(v => parseFloat(v.toFixed(3))));
        const sum = predictedNext.reduce((a, b) => a + b, 0);
        if (sum > 0) setPredictedNext(prev => prev.map(v => parseFloat((v / sum).toFixed(3))));
        setPredictedReward(prev => parseFloat((prev + lr * (trueReward - prev)).toFixed(2)));
    };

    const chartData = useMemo(() => {
        return states.map((s, i) => ({ name: s, prob: predictedNext[i] }));
    }, [predictedNext]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-1 flex-wrap">
                    {states.map((s, i) => (
                        <button key={s} onClick={() => setSelectedState(i)}
                            className={`px-2 py-1 text-[10px] rounded-lg ${i === selectedState ? 'bg-violet-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                            <InlineMath math={`s = ${s}`} />
                        </button>
                    ))}
                    <span className="text-slate-300 mx-1 self-center">×</span>
                    {actions.map((a, i) => (
                        <button key={a} onClick={() => setSelectedAction(i)}
                            className={`px-2 py-1 text-[10px] rounded-lg ${i === selectedAction ? 'bg-violet-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                            <InlineMath math={`a = ${a}`} />
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1">Predicted Next State <InlineMath math="P(s'|s,a)" /></p>
                        <ResponsiveContainer width="100%" height={100}>
                            <BarChart data={chartData} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <YAxis domain={[0, 1]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <Bar dataKey="prob" radius={[3, 3, 0, 0]}>
                                    {chartData.map((_, i) => <Cell key={i} fill={['#3b82f6', '#8b5cf6', '#10b981'][i]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center items-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <p className="text-[10px] text-slate-400">Predicted Reward <InlineMath math="\\hat{r}" /></p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{predictedReward.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={learn}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600">
                        Learn from Experience ({learning}/10)
                    </button>
                    <button onClick={() => { setPredictedNext([1, 0, 0]); setPredictedReward(0.5); setLearning(0); }}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
                        Reset Model
                    </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Model-based RL learns <InlineMath math="\\mathcal{M}_\\phi(s_t, a_t) \\to (\\hat{s}_{t+1}, \\hat{r}_{t+1})" />.
                    The model approximates the environment's transition dynamics and reward function, enabling planning without real environment interaction.
                    Press "Learn" to see the model improve with experience.
                </p>
            </div>
        </EquationGraph>
    );
}
