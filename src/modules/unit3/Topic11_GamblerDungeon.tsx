import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Gamepad2 } from 'lucide-react';

export default function Topic11_GamblerDungeon() {
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
                        <SectionWrapper id="story" title="Section 1 — Escape from the Dungeon" icon={<Gamepad2 size={20} className="text-blue-600" />} badge="Example" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Imagine a gambler trapped in a dungeon grid. There are gold coins (+10), lava pits (-100), and a final exit (+100). The gambler must learn which path leads to the exit while avoiding the lava.</p>
                                <div className="card p-5 bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                                    <h4 className="font-bold text-sm mb-2">The Q-Table Journey</h4>
                                    <p className="text-xs text-slate-500">At first, the Q-table is all zeros. The gambler moves randomly. When they hit lava, the Q-value for that move becomes negative. When they find gold, it becomes positive. Eventually, the highest Q-values form a "golden path" to the exit.</p>
                                </div>
                                <InfoCard type="info" title="The Learning Curve">
                                    In early episodes, the gambler dies often (Exploration). In later episodes, they sprint to the exit (Exploitation).
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
