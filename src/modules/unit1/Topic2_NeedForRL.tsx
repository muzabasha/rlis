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

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="card p-4">
                                    <div className="font-bold text-sm mb-2">Sequential Decisions</div>
                                    <p className="text-xs text-slate-500">Unlike one-shot predictions, RL handles a series of decisions where each action affects the next state.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="font-bold text-sm mb-2">Delayed Rewards</div>
                                    <p className="text-xs text-slate-500">RL can wait for a long-term payoff, like sacrificing a piece in chess to win the game later.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
