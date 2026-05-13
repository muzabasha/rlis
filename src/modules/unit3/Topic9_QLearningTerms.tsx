import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, FileText } from 'lucide-react';

export default function Topic9_QLearningTerms() {
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
                        <SectionWrapper id="story" title="Section 1 — The Language of Q" icon={<FileText size={20} className="text-blue-600" />} badge="Notations" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { term: 'α (Alpha)', desc: 'Learning Rate — how much new info overrides old info.' },
                                        { term: 'γ (Gamma)', desc: 'Discount Factor — importance of future rewards.' },
                                        { term: 'Q(s, a)', desc: 'Quality value of action a in state s.' },
                                        { term: 'TD Error', desc: 'Difference between estimated and actual reward.' }
                                    ].map(item => (
                                        <div key={item.term} className="card p-4">
                                            <div className="font-bold text-sm text-primary-600 mb-1">{item.term}</div>
                                            <p className="text-[10px] text-slate-500">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Update Rule" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <MathBlock formula="Q(s, a) \leftarrow Q(s, a) + \alpha [R + \gamma \max_{a'} Q(s', a') - Q(s, a)]" label="Q-Learning Update Rule" explanation="Updates the Q-value based on the reward and the best possible future Q-value." />
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
