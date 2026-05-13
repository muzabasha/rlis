import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, GitBranch, Target, Layers } from 'lucide-react';

export default function Topic7_ApproachesToRL() {
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
                    
                    {activeTab === 'story' && (
                        <SectionWrapper id="story" title="Section 1 — Three Paths to Mastery" icon={<Layers size={20} className="text-violet-600" />} badge="Approaches" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">How do we actually build the agent? There are three main ways to think about the problem.</p>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="card p-4">
                                        <div className="text-xs font-bold text-blue-600 mb-1">Value-Based</div>
                                        <p className="text-[10px] text-slate-500">Find the best "Value" (expected reward) for each state. (e.g., Q-Learning)</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="text-xs font-bold text-emerald-600 mb-1">Policy-Based</div>
                                        <p className="text-[10px] text-slate-500">Learn the mapping from state to action directly. (e.g., Policy Gradient)</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="text-xs font-bold text-amber-600 mb-1">Model-Based</div>
                                        <p className="text-[10px] text-slate-500">Learn how the world works, then plan. (e.g., Dynamic Programming)</p>
                                    </div>
                                </div>
                                <InfoCard type="info" title="Hybrid Approach">
                                    <strong>Actor-Critic</strong> methods combine Value-based (Critic) and Policy-based (Actor) approaches for better stability and performance.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Optimization Target" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Value-based methods aim to find the Optimal Value Function $V^*(s)$.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        V*(s) = maxₚ π(Gₜ | Sₜ = s)
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">The maximum expected return achievable from state $s$ by any policy $\pi$.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Match the Approach" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Which approach fits best?</p>
                                <div className="space-y-2">
                                    {[
                                        { scenario: 'The agent has a perfect map of the building.', approach: 'Model-Based' },
                                        { scenario: 'The agent only knows which rooms are "good" or "bad".', approach: 'Value-Based' },
                                        { scenario: 'The agent directly learns a set of instructions: "Turn left at blue door".', approach: 'Policy-Based' }
                                    ].map(item => (
                                        <div key={item.scenario} className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                            <span className="text-xs">{item.scenario}</span>
                                            <span className="text-[10px] font-bold text-primary-600">{item.approach}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Algorithm Sandbox" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <Target size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Policy vs Value Viewer</h4>
                                <p className="text-sm text-slate-500">Switch between a Value-based and Policy-based agent in the same environment and compare how quickly they reach the goal.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Launch Comparison</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="space-y-4">
                                <InfoCard type="warning" title="Sample Efficiency">
                                    Model-based approaches are often more <strong>sample-efficient</strong> (they need less interaction with the environment) but can fail if the learned model is slightly inaccurate.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
