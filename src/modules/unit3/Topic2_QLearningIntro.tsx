import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Zap } from 'lucide-react';

export default function Topic2_QLearningIntro() {
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
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === t.id ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                            <Icon size={14} />{t.label}
                        </button>
                    );
                })}
            </div>

                    {activeTab === 'story' && (
                        <SectionWrapper id="story" title="Section 1 — The Student and the Maze" icon={<Zap size={20} className="text-blue-600" />} badge="Q-Learning" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Imagine a student in a new school trying to find the best cafeteria. They don't have a map. They try different hallways (actions) from different classrooms (states). Some paths lead to delicious snacks (positive reward), others to dead ends (negative reward).</p>
                                <p className="text-slate-600 dark:text-slate-400">By keeping a notebook (Q-Table) of which hallway leads to the best result from each classroom, the student eventually finds the fastest way to the cafeteria. This is the essence of **Q-Learning**.</p>
                                <InfoCard type="info" title="Off-Policy Learning">
                                    Q-learning is an "off-policy" algorithm, meaning it learns the value of the best possible action, even if the agent is currently exploring and taking random actions.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Q-Update Equation" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">The core of Q-Learning is the Temporal Difference (TD) update rule.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xs text-primary-600 mb-2 leading-relaxed">
                                        Q(s,a) ← Q(s,a) + α [ r + γ maxₐ' Q(s',a') - Q(s,a) ]
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">Where α is the learning rate and γ is the discount factor.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Manual Q-Update" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Calculate the new Q-value:</p>
                                <div className="card p-4 bg-slate-50 dark:bg-slate-900">
                                    <ul className="text-xs space-y-1">
                                        <li>Current Q(s,a) = 5.0</li>
                                        <li>Reward (r) = 2.0</li>
                                        <li>Best Future Q (max Q') = 10.0</li>
                                        <li>α = 0.5, γ = 0.9</li>
                                    </ul>
                                    <div className="mt-4 p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-center font-bold rounded">
                                        New Q = 5 + 0.5 [ 2 + (0.9 * 10) - 5 ] = 8.0
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Assessment" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Questions" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: What is the "Q" in Q-Learning?</div>
                                    <p className="text-xs text-slate-500 italic">A: It stands for "Quality"—the quality of an action in a given state.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: Is Q-Learning model-based or model-free?</div>
                                    <p className="text-xs text-slate-500 italic">A: It is model-free because it doesn't need to know the transition dynamics P(s'|s,a).</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Q-Table Explorer" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <Calculator size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Q-Table Lab</h4>
                                <p className="text-sm text-slate-500">Watch how a Q-table fills with values as an agent explores a small maze. Adjust the learning rate α to see its effect.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Explore Q-Table</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <InfoCard type="tip" title="Converging to Perfection">
                                Given enough time and exploration, Q-Learning is mathematically guaranteed to find the optimal action-value function for any finite MDP.
                            </InfoCard>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
