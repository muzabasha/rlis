import React, { useState } from 'react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface EnvironmentVectorVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

interface Dimension {
    key: string;
    name: string;
    symbol: string;
    left: string;
    right: string;
}

const DIMENSIONS: Dimension[] = [
    { key: 'obs', name: 'Observability', symbol: 'D_{obs}', left: 'Fully Observable', right: 'Partially Observable' },
    { key: 'sto', name: 'Stochasticity', symbol: 'D_{sto}', left: 'Deterministic', right: 'Stochastic' },
    { key: 'seq', name: 'Sequential', symbol: 'D_{seq}', left: 'Episodic', right: 'Sequential' },
    { key: 'dyn', name: 'Dynamism', symbol: 'D_{dyn}', left: 'Static', right: 'Dynamic' },
    { key: 'con', name: 'Continuity', symbol: 'D_{con}', left: 'Discrete', right: 'Continuous' },
    { key: 'mul', name: 'Multi-agent', symbol: 'D_{mul}', left: 'Single-agent', right: 'Multi-agent' },
];

export default function EnvironmentVectorVis({
    formula = "\\mathcal{E} = \\{D_{obs}, D_{sto}, D_{seq}, D_{dyn}, D_{con}, D_{mul}\\}",
    label = 'Environment Dimensions',
    accent = 'amber'
}: EnvironmentVectorVisProps) {
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        obs: false, sto: false, seq: false, dyn: false, con: false, mul: false,
    });

    const toggle = (key: string) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const profile = DIMENSIONS.map(d => toggles[d.key] ? d.right : d.left).join(', ');

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            defaultOpen={true}
        >
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                    {DIMENSIONS.map(d => {
                        const isRight = toggles[d.key];
                        return (
                            <button
                                key={d.key}
                                onClick={() => toggle(d.key)}
                                className={`p-2 rounded-lg text-center transition-all border ${
                                    isRight
                                        ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700'
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                            >
                                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                    <InlineMath math={d.symbol} />
                                </div>
                                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{d.name}</div>
                                <div className={`text-[10px] mt-1 font-medium ${
                                    isRight
                                        ? 'text-amber-600 dark:text-amber-400'
                                        : 'text-slate-500 dark:text-slate-400'
                                }`}>
                                    {isRight ? d.right : d.left}
                                </div>
                            </button>
                        );
                    })}
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-600 dark:text-slate-300">Profile: </span>
                        {profile}
                    </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Click each dimension to toggle between its two extremes. The resulting combination defines the
                    environment's position in the RL design space.
                </p>
            </div>
        </EquationGraph>
    );
}
