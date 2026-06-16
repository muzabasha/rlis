import React from 'react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface SetsOfRLVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function SetsOfRLVis({
    formula = "S_t \\in \\mathcal{S},\\; A_t \\in \\mathcal{A}(S_t),\\; R_{t+1} \\in \\mathcal{R} \\subset \\mathbb{R}",
    label = 'The Sets of RL — Formal Domains',
    accent = 'blue'
}: SetsOfRLVisProps) {
    const sets = [
        { name: 'State Space', symbol: '\\mathcal{S}', nature: 'Set of all states', property: 'Finite or continuous (ℝⁿ)', role: 'What the agent observes', color: 'blue' },
        { name: 'Action Space', symbol: '\\mathcal{A}', nature: 'Set of all actions', property: 'May depend on state: 𝒜(s)', role: 'What the agent decides', color: 'violet' },
        { name: 'Reward Space', symbol: '\\mathcal{R}', nature: 'Set of reward values', property: '𝒮 ⊂ ℝ', role: 'What the agent receives', color: 'emerald' },
    ];

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-xs">
                    {sets.map((s, i) => (
                        <div key={i} className={`p-2 rounded-lg bg-${s.color}-50 dark:bg-${s.color}-900/10 border border-${s.color}-200 dark:border-${s.color}-800`}>
                            <p className={`font-bold text-${s.color}-600 dark:text-${s.color}-400`}>
                                <InlineMath math={s.symbol} />
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mt-0.5">{s.nature}</p>
                            <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">{s.property}</p>
                            <p className={`text-${s.color}-500 text-[10px] mt-0.5`}>{s.role}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center gap-2 py-2">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg">𝒮</div>
                        <span className="text-[9px] text-slate-400 mt-1">Observe</span>
                    </div>
                    <span className="text-2xl text-slate-300">→</span>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-lg">𝒜</div>
                        <span className="text-[9px] text-slate-400 mt-1">Act</span>
                    </div>
                    <span className="text-2xl text-slate-300">→</span>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-lg">ℛ</div>
                        <span className="text-[9px] text-slate-400 mt-1">Receive</span>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    The RL triplet: <InlineMath math="\\mathcal{S}" /> (states the agent sees), <InlineMath math="\\mathcal{A}" /> (actions it takes),
                    <InlineMath math="\\mathcal{R}" /> (rewards it gets). Every RL problem specifies these three domains.
                </p>
            </div>
        </EquationGraph>
    );
}
