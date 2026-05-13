import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Layout, Shield, Search } from 'lucide-react';

export default function Topic4_ISApplications() {
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
                        <SectionWrapper id="story" title="Section 1 — IS in Every Corner" icon={<Layout size={20} className="text-emerald-600" />} badge="Applications" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="story-block space-y-4">
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-primary-600 font-bold text-sm">
                                            <Search size={16} /> Search Engines
                                        </div>
                                        <p className="text-[10px] text-slate-500">Understanding intent and context behind queries.</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-sm">
                                            <Shield size={16} /> Cybersecurity
                                        </div>
                                        <p className="text-[10px] text-slate-500">Detecting anomalies and predicting threats in real-time.</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold text-sm">
                                            <Users size={16} /> Virtual Assistants
                                        </div>
                                        <p className="text-[10px] text-slate-500">Natural language processing for Siri, Alexa, etc.</p>
                                    </div>
                                </div>
                                <InfoCard type="success" title="Pervasive Intelligence">
                                    From smart thermostats to recommendation algorithms on Netflix, intelligent systems are woven into the fabric of modern life.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
