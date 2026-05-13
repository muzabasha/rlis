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

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Prep Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Prep" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'What is a Model-Free approach?', a: 'An approach where the agent doesn\'t learn the transition probabilities of the environment; it learns from experience directly.' },
                                    { q: 'Give an example of a Value-based algorithm.', a: 'Q-Learning and SARSA are classic examples.' }
                                ].map((item, i) => (
                                    <div key={i} className="card p-4">
                                        <div className="font-bold text-sm mb-2">Q: {item.q}</div>
                                        <div className="text-xs text-slate-500">{item.a}</div>
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
