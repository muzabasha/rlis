import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const INITIAL_COUNTS: Record<string, Record<string, number>> = {
    'the': { cat: 5, dog: 3, mouse: 2, runs: 4 },
    'cat': { runs: 4, sleeps: 3, eats: 2, the: 0 },
    'dog': { runs: 3, sleeps: 2, eats: 4, barks: 3 },
    'runs': { fast: 5, slow: 2, away: 3, the: 1 },
};

const WORDS = Object.keys(INITIAL_COUNTS);

interface BigramMLEVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function BigramMLEVis({
    formula = "P_{ij} = \\frac{\\text{Count}(w_i \\to w_j)}{\\sum_k \\text{Count}(w_i \\to w_k)}",
    label = 'Bigram Language Model — MLE',
    accent = 'emerald'
}: BigramMLEVisProps) {
    const [selectedWord, setSelectedWord] = useState('the');
    const [counts, setCounts] = useState(INITIAL_COUNTS);

    const updateCount = (word: string, target: string, value: number) => {
        setCounts(prev => ({
            ...prev,
            [word]: { ...prev[word], [target]: Math.max(0, value) }
        }));
    };

    const currentCounts = counts[selectedWord];
    const total = Object.values(currentCounts).reduce((a, b) => a + b, 0);

    const probs = useMemo(() => {
        return Object.entries(currentCounts)
            .filter(([_, count]) => count > 0 || total === 0)
            .map(([word, count]) => ({
                name: word,
                count,
                prob: total > 0 ? count / total : 0,
            }))
            .sort((a, b) => b.prob - a.prob);
    }, [currentCounts, total]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-1 flex-wrap">
                    {WORDS.map(w => (
                        <button
                            key={w}
                            onClick={() => setSelectedWord(w)}
                            className={`px-2 py-1 text-[10px] rounded-lg transition-colors ${
                                w === selectedWord
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                            }`}
                        >
                            &ldquo;{w}&rdquo;
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1">Counts <InlineMath math="C(w_i, w_j)" /></p>
                        {Object.entries(currentCounts).map(([word, count]) => (
                            <div key={word} className="flex items-center gap-1 text-xs mb-0.5">
                                <span className="w-10 text-slate-500 text-right">&ldquo;{word}&rdquo;</span>
                                <input
                                    type="number"
                                    min={0}
                                    max={50}
                                    value={count}
                                    onChange={e => updateCount(selectedWord, word, parseInt(e.target.value) || 0)}
                                    className="w-12 text-center p-0.5 text-xs rounded border border-slate-200 dark:border-slate-600 bg-transparent"
                                />
                            </div>
                        ))}
                        <p className="text-[10px] text-slate-400 mt-1">Total: {total}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1">MLE Probabilities</p>
                        <ResponsiveContainer width="100%" height={120}>
                            <BarChart data={probs} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <YAxis domain={[0, 1]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <Bar dataKey="prob" radius={[3, 3, 0, 0]}>
                                    {probs.map((_, i) => <Cell key={i} fill={['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'][i % 4]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    MLE estimates transition probabilities by normalizing counts.
                    Edit the counts to see how probabilities change. <InlineMath math="P(w_j | w_i) = C(w_i, w_j) / C(w_i)" />
                </p>
            </div>
        </EquationGraph>
    );
}
