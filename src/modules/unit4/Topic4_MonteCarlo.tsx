import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Play, GitMerge, RefreshCw, Milestone } from 'lucide-react';

export default function Topic4_MonteCarlo() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    return (
        <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
                {tabs.map(t => {
                    const Icon = t.icon;
                    return (
                        <button key={t.id} onClick={() => setActiveTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === t.id ? 'bg-amber-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                            <Icon size={14} />{t.label}
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                    {/* ── STORY ── */}
                    {activeTab === 'story' && (
                        <SectionWrapper id="story" title="Section 1 — Learning from Experience" subtitle="Monte Carlo Methods in RL" icon={<Play size={20} className="text-amber-600" />} badge="Experience" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="space-y-5">
                                <div className="story-block">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">🎲 The Monte Carlo Philosophy</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Imagine you are learning to play blackjack. You don't know the exact probabilities of the deck, but you play many games (episodes). After each game, you look back and see whether you won or lost. This is the essence of <strong>Monte Carlo (MC)</strong> methods: learning from sampled experience without a model of the environment.
                                    </p>
                                    <div className="card p-5 mt-4 bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30">
                                        <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Key Features</h4>
                                        <ul className="text-xs space-y-2 text-amber-800 dark:text-amber-200 list-disc pl-4">
                                            <li><strong>Model-Free:</strong> No need to know $P(s'|s,a)$.</li>
                                            <li><strong>Episode-Based:</strong> Updates only happen at the end of an episode.</li>
                                            <li><strong>Averaging:</strong> Value functions are estimated by averaging returns.</li>
                                        </ul>
                                    </div>
                                </div>
                                <InfoCard type="definition" title="What is a Backup Diagram?">
                                    A <strong>Backup Diagram</strong> visualizes the flow of information during a value update. For MC, the diagram shows a complete path from a state to the terminal state, as it uses the entire episode's return.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── MATH ── */}
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — MC Value Estimation" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">The Return $G_t$</h4>
                                    <MathBlock formula="G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + ... + \gamma^{T-t-1} R_T" label="Cumulative Discounted Return" explanation="The total reward from time t until the end of the episode T." />
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">MC Value Update</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        We update our estimate of the state value $V(s)$ toward the actual return $G_t$ observed in the episode.
                                    </p>
                                    <MathBlock formula="V(s_t) \leftarrow V(s_t) + \alpha [G_t - V(s_t)]" label="Incremental MC Update" explanation="Adjust the value estimate by a fraction alpha of the error (Return - Estimate)." />
                                    <SymbolTable symbols={[
                                        { symbol: '\alpha', meaning: 'Learning rate (step size)', unit: '[0, 1]' },
                                        { symbol: 'G_t', meaning: 'The actual return received in this episode', unit: 'ℝ' },
                                        { symbol: 'V(s_t)', meaning: 'Current estimate of the value of state s', unit: 'ℝ' },
                                    ]} />
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── ACTIVITY ── */}
                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Trace an Episode" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" accentColor="border-emerald-500">
                            <div className="space-y-5">
                                <InfoCard type="info" title="Task: Calculate the Return">
                                    An agent moves through a 3-step episode with $\gamma = 0.9$. Calculate $G_0$.
                                </InfoCard>
                                <div className="card p-6 flex justify-around items-center bg-slate-50 dark:bg-slate-900">
                                    <div className="text-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">S₀</div>
                                        <div className="text-[10px] mt-1">t=0</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Play size={16} className="text-slate-400" />
                                        <div className="text-xs font-bold text-emerald-600">R₁ = +1</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">S₁</div>
                                        <div className="text-[10px] mt-1">t=1</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Play size={16} className="text-slate-400" />
                                        <div className="text-xs font-bold text-emerald-600">R₂ = 0</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-300 text-white flex items-center justify-center font-bold">S₂</div>
                                        <div className="text-[10px] mt-1">t=2</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Play size={16} className="text-slate-400" />
                                        <div className="text-xs font-bold text-emerald-600">R₃ = +10</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">T</div>
                                        <div className="text-[10px] mt-1">Terminal</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="btn-secondary text-sm" onClick={() => alert('G0 = 1 + (0.9 * 0) + (0.9^2 * 10) = 1 + 8.1 = 9.1')}>Reveal Answer</button>
                                    <div className="text-right font-mono text-xl font-bold p-2 text-amber-600">G₀ = ?</div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── QUESTIONS ── */}
                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Exam Prep" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'What is the primary requirement for Monte Carlo methods in RL?', a: 'MC methods require episodic tasks. They learn from complete episodes and cannot be applied to continuing tasks because updates only happen when the episode terminates.' },
                                    { q: 'Why is Monte Carlo called "model-free"?', a: 'Because it does not require a model of the environment (the state transition probabilities and reward function). It learns directly from sampled sequences of states, actions, and rewards.' },
                                    { q: 'Contrast MC backup diagrams with Dynamic Programming backup diagrams.', a: 'DP backup diagrams show a one-step transition to all possible successor states (using the model). MC backup diagrams show a single, complete path from the current state to the terminal state.' },
                                    { q: 'Define "First-visit MC" vs "Every-visit MC".', a: 'First-visit MC averages returns only from the first time a state is visited in an episode. Every-visit MC averages returns from every time a state is visited in an episode.' },
                                ].map((item, i) => (
                                    <details key={i} className="group card">
                                        <summary className="p-4 cursor-pointer font-medium text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center">
                                            <span>Q{i + 1}: {item.q}</span>
                                            <GitMerge size={14} className="text-amber-500 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── LAB ── */}
                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Backup Diagram Visualizer" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Interactive" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-4">
                                <InfoCard type="tip" title="Building a Value Estimate">
                                    Notice how information "flows back" from the terminal state to S₀.
                                </InfoCard>
                                <div className="card p-8 flex flex-col items-center bg-white dark:bg-slate-900 overflow-hidden">
                                    <div className="relative h-64 w-32 border-l-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col justify-between items-start pl-4">
                                        {[0, 1, 2, 3].map(i => (
                                            <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.3 }} className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${i === 3 ? 'bg-slate-800 text-white' : 'bg-white dark:bg-slate-800 border-amber-500'}`}>
                                                    {i === 3 ? 'T' : `S${i}`}
                                                </div>
                                                {i < 3 && <div className="text-[10px] text-slate-400">Step {i+1}</div>}
                                            </motion.div>
                                        ))}
                                        {/* Reward flow animation */}
                                        <motion.div animate={{ y: [220, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="absolute -left-[5px] w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                    </div>
                                    <p className="mt-6 text-xs italic text-slate-500">The return is collected at terminal state T and "backed up" to update all states in the path.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── INSIGHTS ── */}
                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Key Takeaways" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Summary" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'The Model-Free Edge', desc: 'MC is powerful because it works in complex environments where we cannot define a transition function.' },
                                    { title: 'High Variance', desc: 'Because returns $G_t$ depend on many random actions/outcomes, MC estimates can be very "noisy" or variable.' },
                                    { title: 'Convergence', desc: 'According to the law of large numbers, the average of observed returns will eventually converge to the true value function.' },
                                    { title: 'Offline Nature', desc: 'MC is an "offline" method—you must finish the job before you can learn from it.' },
                                ].map(item => (
                                    <div key={item.title} className="card p-4">
                                        <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                                            <Milestone size={16} className="text-amber-500" />
                                            {item.title}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}

                </motion.div>
            </AnimatePresence>
        </div>
    );
}