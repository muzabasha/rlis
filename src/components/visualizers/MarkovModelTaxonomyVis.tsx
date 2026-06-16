import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface MarkovModelTaxonomyVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const TAXONOMY = [
    { name: 'Markov Chain (MC)', tuple: '⟨𝒮, 𝐏⟩', desc: 'States + transitions. No actions, no rewards.', example: 'Weather: Sunny→Cloudy→Rainy' },
    { name: 'Markov Reward Process (MRP)', tuple: '⟨𝒮, 𝐏, ℛ, γ⟩', desc: 'MC + rewards. No actions — just passive value estimation.', example: 'MRP evaluates how good each state is.' },
    { name: 'Markov Decision Process (MDP)', tuple: '⟨𝒮, 𝒜, 𝐏, ℛ, γ⟩', desc: 'MRP + actions. Full RL problem with decisions.', example: 'Gridworld, CartPole, Robot Control' },
    { name: 'Hidden Markov Model (HMM)', tuple: '⟨𝒮, 𝐏, 𝒴, 𝐎⟩', desc: 'MC + partial observability + observations.', example: 'Speech recognition, NLP tagging' },
    { name: 'POMDP', tuple: '⟨𝒮, 𝒜, 𝐏, ℛ, 𝛀, 𝐎⟩', desc: 'MDP + partial observability + belief states.', example: 'Robot navigation with noisy sensors' },
];

export default function MarkovModelTaxonomyVis({
    formula = "\\text{MC} \\xrightarrow{+R} \\text{MRP} \\xrightarrow{+A} \\text{MDP} \\xrightarrow{+\\text{obs}} \\text{POMDP}",
    label = 'The Markov Model Taxonomy',
    accent = 'violet'
}: MarkovModelTaxonomyVisProps) {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-2">
                <div className="flex flex-col gap-1">
                    {TAXONOMY.map((m, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(selected === i ? null : i)}
                            className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-all ${
                                selected === i
                                    ? 'bg-white dark:bg-slate-800 ring-2 ring-violet-400'
                                    : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700'
                            } border border-slate-200 dark:border-slate-700`}
                        >
                            <div className="w-2 h-6 rounded-full" style={{ backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][i] }} />
                            <div className="flex-1">
                                <p className="font-semibold text-slate-700 dark:text-slate-300">{m.name}</p>
                                <p className="text-[10px] font-mono text-slate-400">{m.tuple}</p>
                            </div>
                            <span className="text-slate-400 text-lg">
                                {i < TAXONOMY.length - 1 ? '+' : ''}
                            </span>
                        </button>
                    ))}
                </div>
                {selected !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                        <p className="text-slate-600 dark:text-slate-400">{TAXONOMY[selected].desc}</p>
                        <p className="text-slate-400 text-[10px] mt-1">e.g., {TAXONOMY[selected].example}</p>
                    </motion.div>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Each model adds complexity: MC→MRP adds rewards, MRP→MDP adds actions, MDP→POMDP adds partial observability.
                    Click each model to learn more.
                </p>
            </div>
        </EquationGraph>
    );
}
