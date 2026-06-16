import React, { useState } from 'react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface MDPTupleVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const COMPONENTS = [
    { name: 'State Space', symbol: '\\mathcal{S}', desc: 'All possible situations', example: 'Grid cells, joint angles', color: 'blue' },
    { name: 'Action Space', symbol: '\\mathcal{A}', desc: 'All possible decisions', example: 'Up/Down/Left/Right', color: 'violet' },
    { name: 'Transition', symbol: '\\mathcal{P}', desc: 'Dynamics: P(s\'|s,a)', example: '0.8 move right, 0.2 slip', color: 'emerald' },
    { name: 'Reward', symbol: '\\mathcal{R}', desc: 'Immediate feedback signal', example: '+10 goal, -1 step', color: 'amber' },
    { name: 'Discount', symbol: '\\gamma', desc: 'Time preference factor', example: '0.9 near-sighted, 0.99 far-sighted', color: 'red' },
];

export default function MDPTupleVis({
    formula = "\\text{MDP} = \\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle",
    label = 'MDP — The 5-Tuple Definition',
    accent = 'blue'
}: MDPTupleVisProps) {
    const [highlighted, setHighlighted] = useState<number | null>(null);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-2">
                <div className="grid grid-cols-5 gap-1">
                    {COMPONENTS.map((c, i) => (
                        <button
                            key={i}
                            onMouseEnter={() => setHighlighted(i)}
                            onMouseLeave={() => setHighlighted(null)}
                            className={`p-1.5 rounded-lg text-center transition-all ${
                                highlighted === i
                                    ? 'ring-2 ring-offset-1 scale-105 bg-white dark:bg-slate-700'
                                    : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700'
                            } border border-slate-200 dark:border-slate-700`}
                        >
                            <div className={`text-sm font-bold text-${c.color}-500`}>
                                <InlineMath math={c.symbol} />
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{c.name}</div>
                        </button>
                    ))}
                </div>
                {highlighted !== null && (
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs animate-fadeIn">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">
                            <InlineMath math={COMPONENTS[highlighted].symbol} /> — {COMPONENTS[highlighted].name}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">{COMPONENTS[highlighted].desc}</p>
                        <p className="text-slate-400 dark:text-slate-500 mt-0.5">Example: {COMPONENTS[highlighted].example}</p>
                    </div>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Every RL problem is defined by these 5 components. Hover over each symbol to learn more.
                    Once specified, any RL algorithm can solve the MDP.
                </p>
            </div>
        </EquationGraph>
    );
}
