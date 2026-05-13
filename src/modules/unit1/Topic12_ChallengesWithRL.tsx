import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, AlertTriangle, Zap } from 'lucide-react';

export default function Topic12_ChallengesWithRL() {
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
                        <SectionWrapper id="story" title="Section 1 — Why is RL Hard?" icon={<AlertTriangle size={20} className="text-red-600" />} badge="Obstacles" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">Despite its power, RL has significant challenges that prevent it from being used everywhere.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-red-600 font-bold text-sm">
                                            <Zap size={16} /> Sample Inefficiency
                                        </div>
                                        <p className="text-xs text-slate-500">RL often requires millions of trials to learn a simple task, making it expensive to train in the real world.</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-red-600 font-bold text-sm">
                                            <Zap size={16} /> Reward Design
                                        </div>
                                        <p className="text-xs text-slate-500">If you give a bad reward signal, the agent might find "loopholes" (Reward Hacking).</p>
                                    </div>
                                </div>
                                <InfoCard type="warning" title="Safety Concerns">
                                    In physical systems (like self-driving cars), exploration can be dangerous. This is known as the **Safe RL** problem.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
