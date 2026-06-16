import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface RLInteractionCycleVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const STATES = [
    { state: 'S₀ = Start', action: 'A₀ = Move Right', reward: 'R₁ = -0.1', nextState: 'S₁ = (0,1)' },
    { state: 'S₁ = (0,1)', action: 'A₁ = Move Down', reward: 'R₂ = -0.1', nextState: 'S₂ = (1,1)' },
    { state: 'S₂ = (1,1)', action: 'A₂ = Move Right', reward: 'R₃ = +10', nextState: 'S₃ = Goal!' },
];

export default function RLInteractionCycleVis({
    formula = "S_t,\\, A_t \\xrightarrow{\\text{env}} R_{t+1},\\, S_{t+1}",
    label = 'The RL Interaction Cycle',
    accent = 'blue'
}: RLInteractionCycleVisProps) {
    const [step, setStep] = useState(0);

    const current = STATES[step];
    const isLast = step >= STATES.length - 1;

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => setStep(prev => Math.min(prev + 1, STATES.length - 1))}
                        disabled={isLast}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <Play className="w-3 h-3" /> Step
                    </button>
                    <button
                        onClick={() => setStep(0)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                            <div>
                                <div className="text-blue-500 font-bold mb-1">State <InlineMath math="S_t" /></div>
                                <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/30 text-slate-700 dark:text-slate-300 font-medium">{current.state}</div>
                            </div>
                            <div>
                                <div className="text-amber-500 font-bold mb-1">Action <InlineMath math="A_t" /></div>
                                <div className="p-2 rounded bg-amber-50 dark:bg-amber-900/30 text-slate-700 dark:text-slate-300 font-medium">{current.action}</div>
                            </div>
                            <div>
                                <div className="text-emerald-500 font-bold mb-1">Reward <InlineMath math="R_{t+1}" /></div>
                                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-900/30 text-slate-700 dark:text-slate-300 font-medium">{current.reward}</div>
                            </div>
                            <div>
                                <div className="text-violet-500 font-bold mb-1">Next <InlineMath math="S_{t+1}" /></div>
                                <div className="p-2 rounded bg-violet-50 dark:bg-violet-900/30 text-slate-700 dark:text-slate-300 font-medium">{current.nextState}</div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-2">
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                <span>t={step}</span>
                                {Array.from({ length: STATES.length }).map((_, i) => (
                                    <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= step ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                                ))}
                                <span className="text-[10px] text-slate-400">step {step + 1}/{STATES.length}</span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Each cycle: the agent sees state <InlineMath math="S_t" />, picks action <InlineMath math="A_t" />, environment returns reward <InlineMath math="R_{t+1}" /> and next state <InlineMath math="S_{t+1}" />.
                    Press "Step" to walk through a gridworld example.
                </p>
            </div>
        </EquationGraph>
    );
}
