import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Zap } from 'lucide-react';

export default function Topic8_QLearningOverview() {
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
                        <SectionWrapper id="story" title="Section 1 — The Essence of Q-Learning" icon={<Zap size={20} className="text-amber-600" />} badge="Overview" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Q-Learning is a model-free, off-policy Temporal Difference (TD) control algorithm. It is one of the most important breakthroughs in RL because it allows an agent to find an optimal action-selection policy for any given finite MDP.</p>
                                <div className="card p-5 bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800">
                                    <h4 className="font-bold text-sm mb-2">Key Features</h4>
                                    <ul className="text-xs space-y-2 list-disc pl-4 text-slate-500">
                                        <li><strong>Model-Free:</strong> No need to know transition probabilities.</li>
                                        <li><strong>Off-Policy:</strong> Can learn from historical data or random exploration.</li>
                                        <li><strong>Guaranteed Convergence:</strong> Under certain conditions, it always finds the optimal Q-values.</li>
                                    </ul>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
