import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Target, Zap } from 'lucide-react';

export default function Topic2_NeedForRL() {
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
                        <SectionWrapper id="story" title="Section 1 — Why do we need RL?" subtitle="Solving the Unsolvable" icon={<Zap size={20} className="text-amber-600" />} badge="Motivation" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="story-block space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">🚀 The Autonomous Mars Rover</h3>
                                <p className="text-slate-600 dark:text-slate-400">Imagine a rover on Mars. We can't give it a dataset of every possible rock it might encounter (Supervised Learning). We can't just let it group rocks (Unsupervised Learning). We need it to <strong>discover</strong> how to drive safely and find samples by itself. It needs to learn from its own mistakes and successes. This is why we need RL.</p>
                                <InfoCard type="success" title="The Core Need">
                                    RL is essential when we have a goal but don't have a map to get there. It excels in <strong>dynamic, uncertain environments</strong>.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Optimization Objective" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Mathematically, RL aims to maximize the expected sum of future rewards.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        max E [ Σ γᵗ Rₜ₊₁ ]
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">Where γ is the discount factor and R is the reward.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Goal Discovery" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Scenario: Training a Robot Dog</p>
                                <div className="space-y-2">
                                    {[
                                        { action: 'Sits', reward: '+10' },
                                        { action: 'Barks at nothing', reward: '-5' },
                                        { action: 'Fetches ball', reward: '+20' }
                                    ].map(item => (
                                        <div key={item.action} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                            <span className="text-sm font-semibold">{item.action}</span>
                                            <span className="text-sm font-bold text-emerald-500">{item.reward}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Assessment" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Questions" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <div className="card p-4 border-l-4 border-primary-500">
                                    <strong>Q1: Why is Supervised Learning not enough for a Mars Rover?</strong>
                                    <p className="mt-2 text-xs">A: Because we cannot provide a labeled dataset for every possible scenario on Mars.</p>
                                </div>
                                <div className="card p-4 border-l-4 border-emerald-500">
                                    <strong>Q2: What is the concept of "Delayed Rewards"?</strong>
                                    <p className="mt-2 text-xs">A: It is when an action doesn't yield immediate benefit but leads to a much larger reward in the future.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Simulation Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300">
                                <FlaskConical size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Autonomous Rover Lab</h4>
                                <p className="text-sm text-slate-500">Control a virtual rover and see how it learns to avoid obstacles using trial and error.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Open Simulation</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="card p-4">
                                    <div className="font-bold text-sm mb-2 text-primary-600">Sequential Decisions</div>
                                    <p className="text-xs text-slate-500">Unlike one-shot predictions, RL handles a series of decisions where each action affects the next state.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="font-bold text-sm mb-2 text-emerald-600">Learning Through Interaction</div>
                                    <p className="text-xs text-slate-500">RL is the only paradigm where the machine learns by doing, mirroring biological learning.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
