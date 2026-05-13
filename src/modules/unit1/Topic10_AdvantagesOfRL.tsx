import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Topic10_AdvantagesOfRL() {
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
                        <SectionWrapper id="story" title="Section 1 — The Superpowers of RL" icon={<TrendingUp size={20} className="text-emerald-600" />} badge="Benefits" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">Why choose RL over other methods? Because it can solve problems that are too complex for humans to script or for supervised data to cover.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                            <ShieldCheck size={16} />
                                            <span className="font-bold text-sm">Autonomous Improvement</span>
                                        </div>
                                        <p className="text-xs text-slate-500">The agent improves by itself through experience, without needing human-labeled examples.</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                            <ShieldCheck size={16} />
                                            <span className="font-bold text-sm">Long-term Optimization</span>
                                        </div>
                                        <p className="text-xs text-slate-500">It doesn't just look for immediate gain; it maximizes the total reward over time.</p>
                                    </div>
                                </div>
                                <InfoCard type="success" title="Adaptive Nature">
                                    RL agents can adapt to environments that change over time, making them perfect for dynamic systems like stock markets or industrial robots.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
