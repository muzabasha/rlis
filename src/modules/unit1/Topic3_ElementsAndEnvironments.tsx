import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb } from 'lucide-react';

const elements = [
    { name: 'Agent', symbol: '🤖', def: 'The learner and decision-maker. Interacts with the environment by taking actions.', example: 'A robot, a game-playing program, a trading algorithm' },
    { name: 'Environment', symbol: '🌍', def: 'Everything outside the agent. Responds to actions by producing new states and rewards.', example: 'A maze, a stock market, a physical world' },
    { name: 'State (S)', symbol: '📍', def: 'A representation of the current situation. Must contain all relevant information for decision-making.', example: 'Robot position, game board configuration, portfolio value' },
    { name: 'Action (A)', symbol: '⚡', def: 'A choice made by the agent in a given state. Can be discrete (left/right) or continuous (force/torque).', example: 'Move left, buy stock, apply 5N force' },
    { name: 'Reward (R)', symbol: '🏆', def: 'A scalar feedback signal indicating how good the last action was. Can be positive, negative, or zero.', example: '+10 for goal, -1 for obstacle, -0.1 per step' },
    { name: 'Policy (π)', symbol: '🗺️', def: 'The agent\'s strategy: a mapping from states to actions. Can be deterministic or stochastic.', example: 'π(s) = "go right if goal is to the right"' },
    { name: 'Value Function (V)', symbol: '💎', def: 'Expected cumulative reward from a state following policy π. Measures long-term desirability.', example: 'V(near_goal) = 9.5, V(start) = 3.2' },
    { name: 'Model', symbol: '🔮', def: 'Agent\'s internal representation of the environment. Predicts next state and reward. Optional.', example: 'Chess engine\'s board evaluation function' },
];

const envTypes = [
    { type: 'Fully Observable', desc: 'Agent sees complete state', example: 'Chess — full board visible', icon: '👁️' },
    { type: 'Partially Observable', desc: 'Agent sees only partial state', example: 'Poker — hidden cards', icon: '🙈' },
    { type: 'Deterministic', desc: 'Same action → same result', example: 'Tic-tac-toe', icon: '🎯' },
    { type: 'Stochastic', desc: 'Actions have random outcomes', example: 'Dice game, weather', icon: '🎲' },
    { type: 'Episodic', desc: 'Independent episodes', example: 'Image classification', icon: '📦' },
    { type: 'Continuing', desc: 'No natural end point', example: 'Stock trading, robot control', icon: '♾️' },
    { type: 'Discrete', desc: 'Finite states and actions', example: 'Grid world, board games', icon: '🔢' },
    { type: 'Continuous', desc: 'Infinite states/actions', example: 'Robot arm, autonomous car', icon: '〰️' },
];

export default function Topic3_ElementsAndEnvironments() {
    const [selected, setSelected] = useState<number | null>(null);
    const [openQ, setOpenQ] = useState<Record<number, boolean>>({});

    return (
        <div className="space-y-6">
            {/* Section 1 — Story */}
            <SectionWrapper id="story" title="Section 1 — The Orchestra Analogy" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">🎻 Think of an RL System as an Orchestra</h3>
                    <p className="text-slate-700 dark:text-slate-300">An orchestra has many instruments (elements), each playing a specific role. Remove one instrument and the music falls apart. Similarly, RL has 8 core elements — remove any one and the learning breaks down.</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {[
                            { instrument: '🎹 Conductor', element: 'Policy (π)', role: 'Decides what each instrument plays — maps state to action' },
                            { instrument: '🎻 Violins', element: 'Value Function', role: 'The melody — measures long-term importance of each note (state)' },
                            { instrument: '🥁 Drums', element: 'Reward Signal', role: 'The beat — immediate feedback that keeps everyone on track' },
                            { instrument: '🎼 Sheet Music', element: 'Model', role: 'Predicts what comes next — optional but helpful' },
                        ].map(item => (
                            <div key={item.instrument} className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 border border-amber-200 dark:border-amber-700">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xl">{item.instrument}</span>
                                    <span className="font-bold text-amber-800 dark:text-amber-200 text-sm">{item.element}</span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{item.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Section 2 — Elements Deep Dive */}
            <SectionWrapper id="elements" title="Section 2 — The 8 Elements of RL" icon={<Calculator size={20} className="text-red-600" />} badge="Core Concepts" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Click any element to explore it in depth.</p>
                    <div className="grid sm:grid-cols-4 gap-3">
                        {elements.map((el, i) => (
                            <motion.button key={el.name} whileHover={{ scale: 1.03 }} onClick={() => setSelected(selected === i ? null : i)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${selected === i ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300'}`}>
                                <div className="text-2xl mb-2">{el.symbol}</div>
                                <div className="font-bold text-sm text-slate-800 dark:text-slate-200">{el.name}</div>
                            </motion.button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selected !== null && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="card p-5 border-l-4 border-primary-500">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{elements[selected].symbol}</span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{elements[selected].name}</h3>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-3">{elements[selected].def}</p>
                                <InfoCard type="example" title="Real-World Example">
                                    {elements[selected].example}
                                </InfoCard>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Mathematical Notation</h4>
                        <MathBlock formula="\text{RL Tuple} = \langle \mathcal{S}, \mathcal{A}, \mathcal{R}, \mathcal{P}, \gamma, \pi \rangle" label="RL System Definition" explanation="A complete RL system is defined by this 6-tuple" />
                        <SymbolTable symbols={[
                            { symbol: '\\mathcal{S}', meaning: 'State space — set of all possible states', unit: 'Set' },
                            { symbol: '\\mathcal{A}', meaning: 'Action space — set of all possible actions', unit: 'Set' },
                            { symbol: '\\mathcal{R}', meaning: 'Reward function R(s,a,s\')', unit: 'ℝ' },
                            { symbol: '\\mathcal{P}', meaning: 'Transition probability P(s\'|s,a)', unit: '[0,1]' },
                            { symbol: '\\gamma', meaning: 'Discount factor', unit: '[0,1)' },
                            { symbol: '\\pi', meaning: 'Policy π(a|s)', unit: 'Probability' },
                        ]} />
                    </div>
                </div>
            </SectionWrapper>

            {/* Section 3 — Environment Types */}
            <SectionWrapper id="envtypes" title="Section 3 — Types of Environments" icon={<Users size={20} className="text-emerald-600" />} badge="Environment Classification" badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" accentColor="border-emerald-500">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {envTypes.map(env => (
                        <div key={env.type} className="card p-4">
                            <div className="text-2xl mb-2">{env.icon}</div>
                            <div className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">{env.type}</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{env.desc}</p>
                            <div className="text-xs bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 text-slate-500 dark:text-slate-400 italic">{env.example}</div>
                        </div>
                    ))}
                </div>
                <InfoCard type="tip" title="Real-World Environments Are Complex">
                    Most real-world RL problems are: Partially Observable + Stochastic + Continuing + Continuous. This is why RL is hard! Each property adds complexity. Start with Fully Observable + Deterministic + Episodic + Discrete (like Grid World) to learn the basics.
                </InfoCard>
            </SectionWrapper>

            {/* Section 5 — Questions */}
            <SectionWrapper id="questions" title="Section 5 — Model 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Question Bank" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500" defaultOpen={false}>
                <div className="space-y-3">
                    {[
                        { q: 'What are the 6 core elements of an RL system? Define each briefly.', a: '(1) State S: current situation; (2) Action A: agent\'s choice; (3) Reward R: scalar feedback; (4) Policy π: state→action mapping; (5) Value Function V: expected future reward; (6) Model: environment prediction. Together they form the tuple ⟨S, A, R, P, γ, π⟩.' },
                        { q: 'Differentiate between a deterministic and stochastic environment with examples.', a: 'Deterministic: same action in same state always produces same result. Example: Chess — moving a piece always has the same outcome. Stochastic: actions have probabilistic outcomes. Example: Backgammon — dice introduce randomness. RL must handle stochasticity through expected value calculations.' },
                        { q: 'What is the difference between a fully observable and partially observable environment?', a: 'Fully Observable (MDP): agent\'s observation = true state. Example: Chess — full board visible. Partially Observable (POMDP): agent sees only partial state. Example: Poker — opponent\'s cards hidden. POMDPs require the agent to maintain a belief state (probability distribution over possible true states).' },
                        { q: 'Why is the reward function considered the most critical design choice in RL?', a: 'The reward function defines what the agent optimizes for. A poorly designed reward leads to reward hacking — the agent finds unintended ways to maximize reward. Example: A cleaning robot rewarded for "no visible dirt" might cover dirt with a cloth instead of cleaning it. The reward must precisely capture the designer\'s intent.' },
                        { q: 'What is the difference between episodic and continuing tasks? Give examples.', a: 'Episodic: natural end point (terminal state). Each episode is independent. Example: Chess game, maze navigation. Continuing: no terminal state, runs indefinitely. Example: Stock trading, robot maintenance. For continuing tasks, discounting (γ < 1) is essential to ensure finite returns.' },
                    ].map((item, i) => (
                        <div key={i} className="card overflow-hidden">
                            <button onClick={() => setOpenQ(p => ({ ...p, [i]: !p[i] }))} className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">Q{i + 1}</span>
                                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm flex-1">{item.q}</span>
                            </button>
                            <AnimatePresence>
                                {openQ[i] && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                        <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700 pt-3">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}