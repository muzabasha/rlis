import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface MarkovPropertyVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function MarkovPropertyVis({
    formula = "\\Pr(S_{t+1} \\mid S_t) = \\Pr(S_{t+1} \\mid S_1, S_2, \\dots, S_t)",
    label = 'The Markov Property',
    accent = 'violet'
}: MarkovPropertyVisProps) {
    const [highlighted, setHighlighted] = useState<number | null>(null);

    const states = [
        { id: 'S₁', full: 'S₁ = Sunny', color: '#f59e0b' },
        { id: 'S₂', full: 'S₂ = Cloudy', color: '#3b82f6' },
        { id: 'S₃', full: 'S₃ = Rainy', color: '#8b5cf6' },
        { id: 'Sₜ', full: 'Sₜ = Current', color: '#10b981' },
        { id: 'Sₜ₊₁', full: 'Sₜ₊₁ = Next', color: '#ef4444' },
    ];

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 py-3">
                    {states.map((s, i) => (
                        <React.Fragment key={i}>
                            <motion.div
                                onMouseEnter={() => setHighlighted(i)}
                                onMouseLeave={() => setHighlighted(null)}
                                animate={{
                                    scale: highlighted === i ? 1.2 : 1,
                                    opacity: highlighted === null || highlighted === i ? 1 : 0.4
                                }}
                                className={`px-3 py-2 rounded-lg text-xs font-bold text-white cursor-pointer transition-shadow ${
                                    i === states.length - 1 ? 'ring-2 ring-offset-2 ring-red-400' : ''
                                }`}
                                style={{ backgroundColor: s.color }}
                            >
                                {s.id}
                            </motion.div>
                            {i < states.length - 1 && (
                                <span className="text-slate-300 dark:text-slate-600 text-lg">→</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-600 dark:text-blue-400 mb-1">With Markov Property</p>
                        <p className="text-slate-600 dark:text-slate-400">
                            <InlineMath math="\\Pr(S_{t+1} \\mid S_t)" /> — only the current state matters.
                            Much simpler! Just need to know now, not entire history.
                        </p>
                    </div>
                    <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-600 dark:text-red-400 mb-1">Without (Full History)</p>
                        <p className="text-slate-600 dark:text-slate-400">
                            <InlineMath math="\\Pr(S_{t+1} \\mid S_1, \\dots, S_t)" /> — need all past states.
                            State grows with time → intractable.
                        </p>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    The Markov property states: the future is independent of the past given the present.
                    This makes RL tractable by limiting the state representation to only the current situation.
                </p>
            </div>
        </EquationGraph>
    );
}
