import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Box, GitMerge } from 'lucide-react';

export default function Topic4_ElementsOfRL() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const elements = [
        { name: 'Policy', def: 'The strategy or mapping from states to actions.', icon: '🗺️' },
        { name: 'Reward Signal', def: 'Immediate feedback (positive or negative) from the environment.', icon: '🍎' },
        { name: 'Value Function', def: 'The long-term total reward expected from a state.', icon: '💎' },
        { name: 'Model', def: 'The agent\'s internal prediction of the environment\'s behavior.', icon: '🔮' },
    ];

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
                    
                    {activeTab === 'story' && (
                        <SectionWrapper id="story" title="Section 1 — The Components of Intelligence" icon={<Box size={20} className="text-emerald-600" />} badge="Core Elements" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">An RL agent is made of four main organs. If one fails, the agent cannot learn efficiently.</p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {elements.map(el => (
                                        <div key={el.name} className="card p-4 text-center">
                                            <div className="text-2xl mb-2">{el.icon}</div>
                                            <div className="font-bold text-sm mb-1">{el.name}</div>
                                            <p className="text-[10px] text-slate-500">{el.def}</p>
                                        </div>
                                    ))}
                                </div>
                                <InfoCard type="tip" title="Value vs Reward">
                                    Reward is <strong>immediate</strong>. Value is <strong>long-term</strong>. An action might give a low reward now but lead to a very high value state later.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Return Objective" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Mathematically, the goal of an RL agent is to maximize the <strong>Expected Return</strong> $G_t$.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        Gₜ = Rₜ₊₁ + γRₜ₊₂ + γ²Rₜ₊₃ + ...
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">Where γ is the discount factor (0 ≤ γ ≤ 1).</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Component Identification" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Scenario: A Robot Cleaning a Room</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { element: 'Policy', example: 'If battery > 20% and trash seen, pick it up.' },
                                        { element: 'Reward', example: '+10 for trash picked, -1 for hitting wall.' },
                                        { element: 'Value', example: 'Estimated 50 points total if room starts clean.' },
                                        { element: 'Model', example: 'Predicting that moving forward moves robot 1 meter.' }
                                    ].map(item => (
                                        <div key={item.element} className="p-3 border-2 border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                                            <div className="text-xs font-bold text-primary-600 mb-1">{item.element}</div>
                                            <p className="text-[10px] text-slate-500">{item.example}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Conceptual Check" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Questions" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">What is the difference between Reward and Value?</div>
                                    <p className="text-xs text-slate-500 italic">Reward is immediate feedback, while Value is the total expected future reward from a state.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Can an agent learn without a Model?</div>
                                    <p className="text-xs text-slate-500 italic">Yes, these are called "Model-Free" RL algorithms (like Q-Learning).</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Virtual Agent Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300">
                                <Box size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Internal Organ Simulator</h4>
                                <p className="text-sm text-slate-500">Disconnect the "Model" or "Value Function" and observe how the agent's performance degrades in real-time.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Launch Lab</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="space-y-4">
                                <InfoCard type="info" title="The Reward Hypothesis">
                                    All goals and purposes can be thought of as the maximization of the expected value of the cumulative sum of a received scalar signal (reward).
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
