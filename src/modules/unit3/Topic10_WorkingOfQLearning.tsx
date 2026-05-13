import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, RefreshCw, Play } from 'lucide-react';

export default function Topic10_WorkingOfQLearning() {
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
                        <SectionWrapper id="story" title="Section 1 — The Step-by-Step Cycle" icon={<RefreshCw size={20} className="text-emerald-600" />} badge="Mechanism" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="story-block space-y-4">
                                <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-400 list-decimal pl-4">
                                    <li><strong>Initialize</strong> Q-table with zeros or random values.</li>
                                    <li><strong>Observe</strong> current state $s$.</li>
                                    <li><strong>Choose</strong> action $a$ using $\epsilon$-greedy strategy.</li>
                                    <li><strong>Execute</strong> action, observe reward $r$ and next state $s'$.</li>
                                    <li><strong>Update</strong> $Q(s, a)$ using the Bellman-based update rule.</li>
                                    <li><strong>Repeat</strong> for many episodes until convergence.</li>
                                </ol>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Temporal Difference" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <MathBlock formula="\text{Target} = R + \gamma \max_{a'} Q(s', a')" label="TD Target" explanation="The reward received plus the maximum possible future value." />
                                <MathBlock formula="\text{Error} = \text{Target} - Q(s, a)" label="TD Error" explanation="The difference between what we expected and what actually happened." />
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
