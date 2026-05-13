import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, GitBranch, Box } from 'lucide-react';

export default function Topic1_MDPKeyComponents() {
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

            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Transition Dynamics" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">The transition function $P$ defines the probability of landing in state $s'$ after taking action $a$ in state $s$.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        P(s' | s, a) = Pr {'{'} Sₜ₊₁ = s' | Sₜ = s, Aₜ = a {'}'}
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">This function captures the environment's dynamics.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — MDP Builder" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Identify MDP components for a simple Gridworld:</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="card p-4">
                                        <div className="text-xs font-bold text-violet-600 mb-2">States</div>
                                        <p className="text-[10px] text-slate-500">Each grid cell (e.g., (1,1), (1,2)) is a state.</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="text-xs font-bold text-emerald-600 mb-2">Actions</div>
                                        <p className="text-[10px] text-slate-500">Up, Down, Left, Right.</p>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Assessment" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Questions" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'What does the "Markov" in MDP mean?', a: 'The future depends only on the current state, not the past history.' },
                                    { q: 'What is the role of γ (gamma) in the MDP tuple?', a: 'It is the discount factor that determines the importance of future rewards.' }
                                ].map((item, i) => (
                                    <div key={i} className="card p-4">
                                        <div className="font-bold text-sm mb-2">Q: {item.q}</div>
                                        <div className="text-xs text-slate-500">A: {item.a}</div>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — MDP Visualizer" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <GitBranch size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">State Transition Lab</h4>
                                <p className="text-sm text-slate-500">Manually trigger actions and observe how the agent moves through the state space based on transition probabilities.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Start Lab</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <InfoCard type="tip" title="Everything is an MDP">
                                Almost any reinforcement learning problem can be formulated as an MDP. If you can define the states, actions, and rewards, you can use MDP solvers to find the best policy.
                            </InfoCard>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
