import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Briefcase } from 'lucide-react';

export default function Topic13_QLearningCaseStudies() {
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
                        <SectionWrapper id="story" title="Section 1 — Deep Dive Case Studies" icon={<Briefcase size={20} className="text-blue-600" />} badge="Case Studies" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <div className="card p-5 border-l-4 border-primary-500">
                                    <h4 className="font-bold text-sm mb-2 text-primary-700">Case Study 1: Inventory Management</h4>
                                    <p className="text-xs text-slate-500">A warehouse uses Q-Learning to decide when to order new stock. States: Current inventory level. Actions: Order amount. Reward: -Cost of storage, -Cost of stockouts, +Profit from sales.</p>
                                </div>
                                <div className="card p-5 border-l-4 border-emerald-500">
                                    <h4 className="font-bold text-sm mb-2 text-emerald-700">Case Study 2: Personalized Web Content</h4>
                                    <p className="text-xs text-slate-500">A news site uses Q-Learning to recommend articles. States: User's reading history. Actions: Article to show. Reward: +1 for a click, -1 for a bounce.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
