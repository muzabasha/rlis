import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, TrendingUp, ShieldCheck, Shuffle, Target } from 'lucide-react';

export default function Topic5_MCPredictionControl() {
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
                        <SectionWrapper id="story" title="Section 1 — The Loop of Improvement" subtitle="Prediction and Control in Monte Carlo" icon={<TrendingUp size={20} className="text-amber-600" />} badge="Optimization" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="space-y-5">
                                <div className="story-block">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">🔄 Evaluating vs Improving</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        In RL, we have two main tasks. First, we need to know how good our current policy is (<strong>Prediction</strong>). Second, we want to find a better policy (<strong>Control</strong>). 
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                            <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2 mb-2">
                                                <Target size={16} /> MC Prediction
                                            </div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">Estimating the value function $V_\pi$ for a fixed policy $\pi$ by averaging returns from multiple episodes.</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                                            <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2 mb-2">
                                                <TrendingUp size={16} /> MC Control
                                            </div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">Iteratively improving the policy by making it greedy with respect to the estimated value function.</p>
                                        </div>
                                    </div>
                                </div>
                                <InfoCard type="tip" title="The Exploration-Exploitation Dilemma">
                                    If we always follow the "best" action we know, we might never discover a hidden, even better action. This is where <strong>$\epsilon$-Greedy</strong> comes in.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── MATH ── */}
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Epsilon-Greedy Exploration" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">The $\epsilon$-Greedy Policy</h4>
                                    <MathBlock formula="\pi(a|s) = \begin{cases} 1 - \epsilon + \frac{\epsilon}{|\mathcal{A}|} & \text{if } a = \arg\max_{a'} Q(s, a') \\ \frac{\epsilon}{|\mathcal{A}|} & \text{otherwise} \end{cases}" label="Epsilon-Greedy Action Selection" explanation="With probability 1-epsilon, choose the best action; with probability epsilon, choose a random action." />
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Policy Improvement Theorem</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Generalized Policy Iteration (GPI) ensures that if we alternate between evaluation and improvement, we eventually reach the optimal policy.
                                    </p>
                                    <MathBlock formula="\pi_0 \xrightarrow{E} Q_{\pi_0} \xrightarrow{I} \pi_1 \xrightarrow{E} Q_{\pi_1} \xrightarrow{I} \pi_2 ... \to \pi^*" label="GPI Flow" explanation="E = Evaluation (Prediction), I = Improvement (Control)." />
                                    <SymbolTable symbols={[
                                        { symbol: '\epsilon', meaning: 'Exploration rate', unit: '[0, 1]' },
                                        { symbol: '|\mathcal{A}|', meaning: 'Number of possible actions', unit: '-' },
                                        { symbol: 'Q(s, a)', meaning: 'Action-value function estimate', unit: 'ℝ' },
                                    ]} />
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── ACTIVITY ── */}
                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Exploration Strategy" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" accentColor="border-emerald-500">
                            <div className="space-y-5">
                                <InfoCard type="info" title="Scenario: The Multi-Armed Bandit">
                                    You have 4 slot machines. One gives +10 reward, others give 0. You have $\epsilon = 0.2$. What is the probability of exploring a non-greedy machine?
                                </InfoCard>
                                <div className="card p-6 flex flex-col items-center">
                                    <div className="flex gap-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`w-12 h-16 border-2 rounded-lg flex flex-col items-center justify-between p-2 ${i === 1 ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-slate-300 dark:border-slate-700'}`}>
                                                <div className="text-[10px] font-bold">M{i}</div>
                                                <div className="text-sm font-bold text-slate-400">{i === 1 ? '👑' : '?'}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 w-full max-w-xs space-y-3">
                                        <div className="flex justify-between text-xs">
                                            <span>Greedy Action (M1)</span>
                                            <span className="font-bold">85%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[85%]" />
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span>Explore (M2, M3, or M4)</span>
                                            <span className="font-bold">15% total (5% each)</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 w-[15%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── QUESTIONS ── */}
                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Exam Prep" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'What is the goal of Monte Carlo Prediction?', a: 'To estimate the state-value function V(s) or action-value function Q(s, a) for a given policy by averaging the returns obtained after visiting that state/action-pair across many episodes.' },
                                    { q: 'Explain the role of Epsilon in Epsilon-Greedy strategy.', a: 'Epsilon controls the trade-off between exploration and exploitation. A small epsilon (e.g., 0.1) ensures the agent mostly exploits its knowledge (90% of the time) but occasionally explores new actions (10% of the time).' },
                                    { q: 'Why do we use Action-Values (Q) instead of State-Values (V) for MC Control?', a: 'In a model-free setting, we don\'t know the state transition probabilities. Having V(s) is not enough to choose an action because we don\'t know which action leads to which next state. Q(s, a) directly tells us the value of taking a specific action in a specific state.' },
                                    { q: 'What is "Greedy" policy improvement?', a: 'Greedy improvement means updating the policy to always choose the action that has the highest estimated action-value: $\pi(s) = \arg\max_a Q(s, a)$.' },
                                ].map((item, i) => (
                                    <details key={i} className="group card">
                                        <summary className="p-4 cursor-pointer font-medium text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center">
                                            <span>Q{i + 1}: {item.q}</span>
                                            <ShieldCheck size={14} className="text-amber-500 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── LAB ── */}
                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Greedy vs. Epsilon-Greedy" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Interactive" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-4">
                                <InfoCard type="tip" title="Simulation: Finding the Best Path">
                                    A purely greedy agent might get stuck in a "local optimum" (a good but not best path) because it never explores other options.
                                </InfoCard>
                                <div className="card p-6 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <div className="flex justify-around mb-8">
                                        <div className="text-center space-y-2">
                                            <div className="text-xs font-bold text-slate-400">Pure Greedy ($\epsilon=0$)</div>
                                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center border-2 border-red-500 text-red-600 font-bold italic">Safe</div>
                                        </div>
                                        <div className="text-center space-y-2">
                                            <div className="text-xs font-bold text-slate-400">Balanced ($\epsilon=0.1$)</div>
                                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center border-2 border-emerald-500 text-emerald-600 font-bold">Optimal</div>
                                        </div>
                                        <div className="text-center space-y-2">
                                            <div className="text-xs font-bold text-slate-400">Random ($\epsilon=1.0$)</div>
                                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center border-2 border-amber-500 text-amber-600 font-bold">Lost</div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn-primary text-xs flex items-center gap-2 mx-auto">
                                            <Shuffle size={14} /> Run Simulation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── INSIGHTS ── */}
                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Key Takeaways" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Summary" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'GLIE Property', desc: 'Greedy in the Limit with Infinite Exploration: An algorithm that gradually reduces epsilon to zero will eventually find the optimal policy.' },
                                    { title: 'The Q-Value Advantage', desc: 'By learning action-values instead of state-values, we don\'t need to know the physics (model) of the world to act optimally.' },
                                    { title: 'Exploration Cost', desc: 'Exploration is necessary for learning but costly in performance. The goal is to explore only as much as needed.' },
                                    { title: 'GPI Framework', desc: 'Almost all RL algorithms can be seen as a form of Generalized Policy Iteration.' },
                                ].map(item => (
                                    <div key={item.title} className="card p-4">
                                        <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                                            <Shuffle size={16} className="text-amber-500" />
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