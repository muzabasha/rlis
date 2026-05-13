import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Rocket, Network } from 'lucide-react';

export default function Topic12_QLearningApplications() {
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
                        <SectionWrapper id="story" title="Section 1 — Q-Learning in Industry" icon={<Rocket size={20} className="text-blue-600" />} badge="Applications" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-primary-600 font-bold text-sm">
                                            <Network size={16} /> Traffic Light Control
                                        </div>
                                        <p className="text-xs text-slate-500">Optimizing signal timings to reduce congestion based on vehicle density.</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-primary-600 font-bold text-sm">
                                            <Rocket size={16} /> Robot Pathfinding
                                        </div>
                                        <p className="text-xs text-slate-500">Enabling vacuum robots or warehouse bots to find the most efficient routes.</p>
                                    </div>
                                </div>
                                <InfoCard type="success" title="Beyond Games">
                                    While famously used in games, Q-Learning is vital in resource management, dynamic pricing, and recommendation systems.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
