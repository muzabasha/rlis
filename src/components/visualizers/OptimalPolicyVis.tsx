import React, { useState, useMemo } from 'react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface OptimalPolicyVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function OptimalPolicyVis({
    formula = "\\pi^*(s) = \\arg\\max_a q_*(s,a)",
    label = 'Optimal Policy — Greedy with Respect to Q*',
    accent = 'emerald'
}: OptimalPolicyVisProps) {
    const states = ['S₁ (Entry)', 'S₂ (Middle)', 'S₃ (Near Goal)', 'S₄ (Goal)'];
    const defaultQ: Record<string, number[]> = {
        'S₁ (Entry)': [5.2, 8.1, 3.4, 6.7],
        'S₂ (Middle)': [7.8, 4.3, 9.5, 2.1],
        'S₃ (Near Goal)': [6.3, 8.9, 4.2, 12.0],
        'S₄ (Goal)': [15.0, 10.0, 12.0, 14.0],
    };
    const actionNames = ['Up ↑', 'Right →', 'Down ↓', 'Left ←'];

    const [qMatrix, setQMatrix] = useState(defaultQ);
    const [selectedState, setSelectedState] = useState(0);

    const currentState = states[selectedState];
    const currentQs = qMatrix[currentState];

    const optimalAction = useMemo(() => {
        const maxIdx = currentQs.reduce((best, q, i, arr) => q > arr[best] ? i : best, 0);
        return { index: maxIdx, value: currentQs[maxIdx], name: actionNames[maxIdx] };
    }, [currentQs]);

    const updateQ = (idx: number, val: number) => {
        setQMatrix(prev => ({
            ...prev,
            [currentState]: prev[currentState].map((v, i) => i === idx ? val : v),
        }));
    };

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-1 flex-wrap">
                    {states.map((s, i) => (
                        <button
                            key={s}
                            onClick={() => setSelectedState(i)}
                            className={`px-2 py-1 text-[10px] rounded-lg transition-colors ${
                                i === selectedState
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="text-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500">
                        <InlineMath math="\\pi^*(" />{currentState}<InlineMath math=")" /> ={' '}
                        <strong className="text-emerald-600 dark:text-emerald-400 text-sm">
                            {optimalAction.name}
                        </strong>
                        {'  '}
                        (<InlineMath math="q_*" /> = {optimalAction.value.toFixed(1)})
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                    {currentQs.map((q, i) => (
                        <div key={i} className={`p-1.5 rounded-lg border text-center ${
                            i === optimalAction.index
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                        }`}>
                            <div className="text-[10px] text-slate-400"><InlineMath math={`q_*(${currentState.split(' ')[0]},${actionNames[i].split(' ')[0]})`} /></div>
                            <input
                                type="range"
                                min={0}
                                max={20}
                                step={0.5}
                                value={q}
                                onChange={e => updateQ(i, parseFloat(e.target.value))}
                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-emerald-500 my-1"
                            />
                            <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{q.toFixed(1)}</div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    The optimal policy picks the action with the highest <InlineMath math="q_*(s,a)" />.
                    Drag sliders to change Q-values and see how the optimal action changes.
                </p>
            </div>
        </EquationGraph>
    );
}
