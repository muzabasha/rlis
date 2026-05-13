import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Brain } from 'lucide-react';

export default function Topic2_IntelligentBehavior() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const traits = [
        { name: 'Learning', desc: 'Improving performance through experience.' },
        { name: 'Reasoning', desc: 'Applying logic to solve problems.' },
        { name: 'Perception', desc: 'Sensing and interpreting environment data.' },
        { name: 'Adaptability', desc: 'Changing behavior when the world changes.' },
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
                        <SectionWrapper id="story" title="Section 1 — What Makes a System Intelligent?" icon={<Brain size={20} className="text-emerald-600" />} badge="Characteristics" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">Intelligence isn't just one thing. It's a collection of behaviors that allow an agent to navigate the world successfully.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {traits.map(trait => (
                                        <div key={trait.name} className="card p-4">
                                            <div className="font-bold text-sm text-primary-600 mb-1">{trait.name}</div>
                                            <p className="text-[10px] text-slate-500">{trait.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <InfoCard type="info" title="The Turing Test">
                                    Alan Turing famously proposed that a machine is intelligent if its behavior is indistinguishable from a human's during a conversation.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
