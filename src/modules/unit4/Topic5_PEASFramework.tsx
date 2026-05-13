import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, ClipboardList } from 'lucide-react';

export default function Topic5_PEASFramework() {
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
                        <SectionWrapper id="story" title="Section 1 — Describing an Agent" icon={<ClipboardList size={20} className="text-blue-600" />} badge="PEAS" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">To design an intelligent agent, we must first specify its task environment using the **PEAS framework**.</p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { letter: 'P', name: 'Performance', desc: 'What success looks like.' },
                                        { letter: 'E', name: 'Environment', desc: 'Where the agent lives.' },
                                        { letter: 'A', name: 'Actuators', desc: 'How the agent acts.' },
                                        { letter: 'S', name: 'Sensors', desc: 'How the agent perceives.' }
                                    ].map(item => (
                                        <div key={item.letter} className="card p-4 text-center border-b-4 border-primary-400">
                                            <div className="text-2xl font-black text-primary-600 mb-1">{item.letter}</div>
                                            <div className="font-bold text-xs mb-1">{item.name}</div>
                                            <p className="text-[10px] text-slate-500">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <InfoCard type="info" title="Example: Taxi Driver">
                                    <strong>P:</strong> Safety, speed, comfort. <strong>E:</strong> Roads, traffic, pedestrians. <strong>A:</strong> Steering, brake, horn. <strong>S:</strong> Cameras, GPS, speedometer.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
