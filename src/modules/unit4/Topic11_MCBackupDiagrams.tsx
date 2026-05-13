import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Share2 } from 'lucide-react';

export default function Topic11_MCBackupDiagrams() {
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
                        <SectionWrapper id="story" title="Section 1 — The MC Path" icon={<Share2 size={20} className="text-blue-600" />} badge="Visualization" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Monte Carlo backup diagrams show a single, long trajectory from the starting state all the way to the terminal state. Unlike Dynamic Programming, there is no branching in a single MC sample.</p>
                                <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-400 mb-2" />
                                    <div className="w-0.5 h-6 bg-slate-400 mb-2" />
                                    <div className="w-3 h-3 bg-slate-800 rounded-full mb-2" />
                                    <div className="w-0.5 h-6 bg-slate-400 mb-2" />
                                    <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-400 mb-2" />
                                    <div className="w-0.5 h-6 bg-slate-400 mb-2" />
                                    <div className="w-3 h-3 bg-slate-800 rounded-full mb-2" />
                                    <div className="w-0.5 h-6 bg-slate-400 mb-2" />
                                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-[10px] font-bold text-white">T</div>
                                    <div className="mt-4 text-[10px] text-slate-500 italic">Experience Sample Path</div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
