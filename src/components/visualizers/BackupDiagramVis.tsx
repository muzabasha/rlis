import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface BackupDiagramVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const ACCENT_MAP = {
    blue: { border: 'border-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', arrow: 'bg-blue-400', active: 'bg-blue-500', inactive: 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300' },
    violet: { border: 'border-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-700 dark:text-violet-300', arrow: 'bg-violet-400', active: 'bg-violet-500', inactive: 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300' },
    emerald: { border: 'border-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-300', arrow: 'bg-emerald-400', active: 'bg-emerald-500', inactive: 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300' },
    red: { border: 'border-red-400', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-300', arrow: 'bg-red-400', active: 'bg-red-500', inactive: 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300' },
    amber: { border: 'border-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300', arrow: 'bg-amber-400', active: 'bg-amber-500', inactive: 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300' },
};

export default function BackupDiagramVis({
    formula = "\\text{Value flow: } s' \\xrightarrow{\\text{Backup}} a \\xrightarrow{\\text{Backup}} s",
    label = 'Backup Diagram',
    accent = 'violet'
}: BackupDiagramVisProps) {
    const [mode, setMode] = useState<'expectation' | 'max'>('expectation');
    const a = ACCENT_MAP[accent];

    const nodeVariant = (i: number) => ({
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.4 } }
    });

    const arrowVariant = (i: number, axis: 'x' | 'y') => ({
        hidden: axis === 'y' ? { scaleY: 0, opacity: 0 } : { scaleX: 0, opacity: 0 },
        visible: { scaleX: 1, scaleY: 1, opacity: 1, transition: { delay: 0.3 + i * 0.2, duration: 0.35, ease: 'easeOut' } }
    });

    const expectationEq = "v_\\pi(s) = \\sum_a \\pi(a|s) \\sum_{s'} P(s'|s,a)[R + \\gamma v_\\pi(s')]";
    const maxEq = "v_*(s) = \\max_a \\sum_{s'} P(s'|s,a)[R + \\gamma v_*(s')]";
    const currentEq = mode === 'expectation' ? expectationEq : maxEq;

    const leaves = [
        { id: "s'_1", val: "R + \\gamma v(s'_1)" },
        { id: "s'_2", val: "R + \\gamma v(s'_2)" },
        { id: "s'_3", val: "R + \\gamma v(s'_3)" },
    ];

    return (
        <EquationGraph formula={formula} label={label} accent={accent}>
            <div className="space-y-3">
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => setMode('expectation')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${mode === 'expectation' ? `${a.active} text-white` : a.inactive}`}
                    >
                        Expectation Backup
                    </button>
                    <button
                        onClick={() => setMode('max')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${mode === 'max' ? `${a.active} text-white` : a.inactive}`}
                    >
                        Max Backup
                    </button>
                </div>

                <div className="flex flex-col items-center py-3 overflow-hidden">
                    <motion.div
                        custom={0}
                        variants={nodeVariant(0)}
                        initial="hidden"
                        animate="visible"
                        className={`px-6 py-3 rounded-xl border-2 ${a.border} ${a.bg} ${a.text} font-bold text-sm`}
                    >
                        Current State <InlineMath math="s" />
                    </motion.div>

                    <div className="flex flex-col items-center h-14 justify-center">
                        <motion.div
                            custom={0}
                            variants={arrowVariant(0, 'y')}
                            initial="hidden"
                            animate="visible"
                            className={`w-0.5 h-8 ${a.arrow}`}
                            style={{ transformOrigin: 'bottom' }}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight"
                        >
                            <InlineMath math="\\pi(a|s)" />
                        </motion.div>
                    </div>

                    <motion.div
                        custom={1}
                        variants={nodeVariant(1)}
                        initial="hidden"
                        animate="visible"
                        className={`px-5 py-2.5 rounded-xl border-2 ${a.border} ${a.bg} ${a.text} font-semibold text-sm`}
                    >
                        Action <InlineMath math="a" />
                    </motion.div>

                    <div className="w-full max-w-md mt-1">
                        <div className="flex justify-around items-end h-16">
                            <div className="flex-1 flex justify-center items-center">
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        custom={0}
                                        variants={arrowVariant(0, 'y')}
                                        initial="hidden"
                                        animate="visible"
                                        className={`w-0.5 h-8 ${a.arrow}`}
                                        style={{ transformOrigin: 'bottom' }}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        custom={1}
                                        variants={arrowVariant(1, 'y')}
                                        initial="hidden"
                                        animate="visible"
                                        className={`w-0.5 h-8 ${a.arrow}`}
                                        style={{ transformOrigin: 'bottom' }}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        custom={2}
                                        variants={arrowVariant(2, 'y')}
                                        initial="hidden"
                                        animate="visible"
                                        className={`w-0.5 h-8 ${a.arrow}`}
                                        style={{ transformOrigin: 'bottom' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around">
                            {leaves.map((leaf, i) => (
                                <motion.div
                                    key={leaf.id}
                                    custom={i + 2}
                                    variants={nodeVariant(i + 2)}
                                    initial="hidden"
                                    animate="visible"
                                    className={`px-3 py-2 rounded-xl border ${a.border} ${a.bg} text-xs text-center min-w-[80px]`}
                                >
                                    <div className={`font-medium ${a.text}`}>
                                        Successor <InlineMath math={leaf.id} />
                                    </div>
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                                        <InlineMath math={leaf.val} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400 italic">
                        {mode === 'expectation'
                            ? 'Averaging actions (Expectation)'
                            : 'Maximizing over actions (Optimal)'}
                    </div>
                </div>

                <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-800/50 text-center text-sm text-slate-700 dark:text-slate-300">
                    <InlineMath math={currentEq} />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {mode === 'expectation'
                        ? 'Expectation backup averages over all actions (weighted by policy) and successor states (weighted by dynamics). This is the Bellman expectation operator.'
                        : 'Max backup takes the maximum over actions, giving the optimal value. This is the Bellman optimality operator, the foundation of value iteration and Q-learning.'}
                </p>
            </div>
        </EquationGraph>
    );
}
