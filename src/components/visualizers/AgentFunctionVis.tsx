import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface AgentFunctionVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

type AgentType = 'reflex' | 'model' | 'goal';

const AGENT_TYPES: { key: AgentType; label: string; icon: string }[] = [
    { key: 'reflex', label: 'Simple Reflex', icon: '⚡' },
    { key: 'model', label: 'Model-Based', icon: '🧠' },
    { key: 'goal', label: 'Goal-Based', icon: '🎯' },
];

const PERCEPT_POOL = ['P₁(t)', 'P₂(t-1)', 'P₃(t-2)', 'P₄(t-3)'];

const ACTIONS: Record<AgentType, string[]> = {
    reflex: ['A = move_away(P₁)', 'A = turn_left(P₁)'],
    model: ['A = navigate(P₁..P₄)', 'A = explore(P₁..P₄)'],
    goal: ['A = seek_goal(P₁..P₄, G)', 'A = plan_path(P₁..P₄, G)'],
};

const ACCENT_BG: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
    violet: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700',
};

const ACCENT_TEXT: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    violet: 'text-violet-600 dark:text-violet-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    red: 'text-red-600 dark:text-red-400',
    amber: 'text-amber-600 dark:text-amber-400',
};

const ACCENT_BADGE: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    violet: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    red: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    amber: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
};

const ACCENT_DOT: Record<string, string> = {
    blue: 'bg-blue-500',
    violet: 'bg-violet-500',
    emerald: 'bg-emerald-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
};

const ACCENT_SEL: Record<string, string> = {
    blue: 'ring-blue-400',
    violet: 'ring-violet-400',
    emerald: 'ring-emerald-400',
    red: 'ring-red-400',
    amber: 'ring-amber-400',
};

export default function AgentFunctionVis({
    formula = "f: \\mathcal{P}^* \\to \\mathcal{A}",
    label = 'Agent Function Mapping',
    accent = 'emerald'
}: AgentFunctionVisProps) {
    const [percepts, setPercepts] = useState<string[]>([PERCEPT_POOL[0]]);
    const [agentType, setAgentType] = useState<AgentType>('reflex');

    const togglePercept = (p: string) => {
        if (percepts.includes(p)) {
            setPercepts(prev => prev.filter(x => x !== p));
        } else {
            setPercepts(prev => [...prev, p]);
        }
    };

    const currentActions = ACTIONS[agentType];
    const actionIdx = Math.min(percepts.length - 1, currentActions.length - 1);

    const stageColors = {
        bg: ACCENT_BG[accent],
        text: ACCENT_TEXT[accent],
        badge: ACCENT_BADGE[accent],
        dot: ACCENT_DOT[accent],
        sel: ACCENT_SEL[accent],
    };

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-1.5 justify-center">
                    {AGENT_TYPES.map(at => (
                        <button
                            key={at.key}
                            onClick={() => setAgentType(at.key)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                                agentType === at.key
                                    ? `${stageColors.badge} border-transparent ring-2 ${stageColors.sel}`
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            {at.icon} {at.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-2">
                    <motion.div
                        layout
                        className={`p-3 rounded-xl border ${stageColors.bg} min-w-[140px]`}
                    >
                        <p className={`text-[10px] font-semibold uppercase tracking-wider ${stageColors.text} mb-2 text-center`}>
                            Percept History <InlineMath math="\mathcal{P}^*" />
                        </p>
                        <div className="flex gap-1.5 flex-wrap justify-center">
                            {PERCEPT_POOL.map(p => {
                                const active = percepts.includes(p);
                                return (
                                    <motion.button
                                        key={p}
                                        layout
                                        onClick={() => togglePercept(p)}
                                        whileTap={{ scale: 0.9 }}
                                        className={`px-2 py-1 text-[10px] font-mono rounded-lg border transition-all ${
                                            active
                                                ? `${stageColors.badge} border-transparent`
                                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-50'
                                        }`}
                                    >
                                        <InlineMath math={p} />
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        className="text-slate-400"
                    >
                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                            <path d="M0 8H20M20 8L14 2M20 8L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>

                    <motion.div
                        layout
                        className={`p-3 rounded-xl border ${stageColors.bg} min-w-[120px]`}
                    >
                        <p className={`text-[10px] font-semibold uppercase tracking-wider ${stageColors.text} mb-2 text-center`}>
                            Agent Function f
                        </p>
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${stageColors.badge}`}>
                                {AGENT_TYPES.find(at => at.key === agentType)?.icon}
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                                {AGENT_TYPES.find(at => at.key === agentType)?.label}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        className="text-slate-400"
                    >
                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                            <path d="M0 8H20M20 8L14 2M20 8L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>

                    <motion.div
                        layout
                        className={`p-3 rounded-xl border ${stageColors.bg} min-w-[120px]`}
                    >
                        <p className={`text-[10px] font-semibold uppercase tracking-wider ${stageColors.text} mb-2 text-center`}>
                            Action <InlineMath math="\mathcal{A}" />
                        </p>
                        <motion.div
                            key={`${agentType}-${percepts.length}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className="text-center"
                        >
                            <span className={`inline-block px-2 py-1 rounded-lg text-[11px] font-mono font-bold ${stageColors.badge}`}>
                                {currentActions[Math.max(0, actionIdx)]}
                            </span>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${stageColors.dot}`} />
                        <span><InlineMath math={`|\\mathcal{P}^*|`} /> = {percepts.length}</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span>click to {'{±}'} percepts</span>
                    </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    The agent function <InlineMath math="f: \mathcal{P}^* \to \mathcal{A}" /> maps percept history to action.
                    {agentType === 'reflex' && ' Simple Reflex agents ignore history beyond the last percept.'}
                    {agentType === 'model' && ' Model-Based agents use the full percept history to decide.'}
                    {agentType === 'goal' && ' Goal-Based agents consider both history and a desired goal state.'}
                </p>
            </div>
        </EquationGraph>
    );
}
