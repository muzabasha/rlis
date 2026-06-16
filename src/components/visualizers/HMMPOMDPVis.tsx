import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface HMMPOMDPVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
    type?: 'hmm' | 'pomdp';
}

const MODELS = {
    hmm: {
        label: 'Hidden Markov Model',
        formula: "\\langle \\mathcal{S}, \\mathbf{P}, \\mathcal{Y}, \\mathbf{O} \\rangle",
        desc: 'Hidden states + observations. The agent sees only Y, not S.',
        items: [
            { name: 'Hidden States', symbol: '\\mathcal{S}', desc: 'True but unobserved states of the world', example: 'Weather: Sunny, Rainy, Cloudy' },
            { name: 'Transition', symbol: '\\mathbf{P}', desc: 'How hidden states evolve over time', example: 'Sunny→Sunny 0.8, Sunny→Rainy 0.2' },
            { name: 'Observations', symbol: '\\mathcal{Y}', desc: 'What the agent observes', example: 'Umbrella, Sunglasses, Coat' },
            { name: 'Emission', symbol: '\\mathbf{O}', desc: 'P(y|s) — observation probability given hidden state', example: 'Rainy→Umbrella 0.9' },
        ],
    },
    pomdp: {
        label: 'Partially Observable MDP',
        formula: "\\langle \\mathcal{S}, \\mathcal{A}, \\mathbf{P}, \\mathcal{R}, \\boldsymbol{\\Omega}, \\mathbf{O} \\rangle",
        desc: 'POMDP = MDP + partial observability + belief states',
        items: [
            { name: 'States', symbol: '\\mathcal{S}', desc: 'True environment states (unobserved)', example: 'Robot position (unknown exactly)' },
            { name: 'Actions', symbol: '\\mathcal{A}', desc: 'What the agent can do', example: 'MoveLeft, MoveRight, Scan' },
            { name: 'Transitions', symbol: '\\mathbf{P}', desc: 'State transition dynamics', example: 'P(s\'|s,a)' },
            { name: 'Rewards', symbol: '\\mathcal{R}', desc: 'Immediate feedback', example: '+10 for goal, -1 per step' },
            { name: 'Observations', symbol: '\\boldsymbol{\\Omega}', desc: 'What the agent observes', example: 'Noisy sensor readings' },
            { name: 'Emission', symbol: '\\mathbf{O}', desc: 'P(ω|s,a) — observation function', example: 'P(see wall | near wall) = 0.9' },
        ],
    },
};

export default function HMMPOMDPVis({
    formula,
    label,
    accent = 'violet',
    type = 'hmm'
}: HMMPOMDPVisProps) {
    const model = MODELS[type];
    const [highlighted, setHighlighted] = useState<number | null>(null);

    return (
        <EquationGraph
            formula={formula || model.formula}
            label={label || model.label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex justify-center gap-4 py-2">
                    {type === 'hmm' ? (
                        <>
                            <div className="flex flex-col items-center gap-1">
                                <motion.div animate={{ opacity: highlighted === 0 ? 1 : 0.6 }} className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-xs font-bold text-violet-600 dark:text-violet-400">
                                    <InlineMath math="S_t" />
                                </motion.div>
                                <span className="text-[9px] text-slate-400">Hidden</span>
                            </div>
                            <span className="text-lg text-slate-300 self-center"><InlineMath math="\\xrightarrow{P}" /></span>
                            <div className="flex flex-col items-center gap-1">
                                <motion.div animate={{ opacity: highlighted === 1 ? 1 : 0.6 }} className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-xs font-bold text-violet-600 dark:text-violet-400">
                                    <InlineMath math="S_{t+1}" />
                                </motion.div>
                                <span className="text-[9px] text-slate-400">Hidden</span>
                            </div>
                            <span className="text-lg text-slate-300 self-center"><InlineMath math="\\xrightarrow{O}" /></span>
                            <div className="flex flex-col items-center gap-1">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                    <InlineMath math="Y_t" />
                                </div>
                                <span className="text-[9px] text-slate-400">Observed</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col items-center gap-1">
                                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-xs font-bold text-amber-600 dark:text-amber-400">
                                    <InlineMath math="b(s)" />
                                </div>
                                <span className="text-[9px] text-slate-400">Belief</span>
                            </div>
                            <span className="text-lg text-slate-300 self-center">→</span>
                            <div className="flex flex-col items-center gap-1">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-xs font-bold text-blue-600 dark:text-blue-400">
                                    <InlineMath math="A_t" />
                                </div>
                                <span className="text-[9px] text-slate-400">Action</span>
                            </div>
                            <span className="text-lg text-slate-300 self-center">→</span>
                            <div className="flex flex-col items-center gap-1">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                    <InlineMath math="\\omega_t" />
                                </div>
                                <span className="text-[9px] text-slate-400">Obs</span>
                            </div>
                        </>
                    )}
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">{model.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                    {model.items.map((item, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setHighlighted(i)}
                            onMouseLeave={() => setHighlighted(null)}
                            className="p-1.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs cursor-pointer"
                        >
                            <p className="font-semibold text-slate-700 dark:text-slate-300">
                                <InlineMath math={item.symbol} /> — {item.name}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-[10px]">{item.desc}</p>
                            <p className="text-slate-400 text-[9px]">e.g., {item.example}</p>
                        </div>
                    ))}
                </div>
            </div>
        </EquationGraph>
    );
}
