import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Globe, Activity } from 'lucide-react';

export default function Topic7_EnvironmentTypes() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const envs = [
        { name: 'Static vs Dynamic', desc: 'Does the world change while the agent is thinking?' },
        { name: 'Discrete vs Continuous', desc: 'Is the state/action space countable or infinite?' },
        { name: 'Single vs Multi-agent', desc: 'Is the agent alone or competing/cooperating?' },
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
                        <SectionWrapper id="story" title="Section 1 — Dimensions of the Task Environment" icon={<Globe size={20} className="text-emerald-600" />} badge="Environments" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">Beyond observability and stochasticity, we must consider several other dimensions that define the difficulty of an agent's task.</p>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {envs.map(env => (
                                        <div key={env.name} className="card p-4 border-l-4 border-emerald-500">
                                            <div className="font-bold text-xs mb-1 text-emerald-700">{env.name}</div>
                                            <p className="text-[10px] text-slate-500">{env.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <InfoCard type="info" title="The Hardest Case">
                                    A <strong>partially observable, stochastic, sequential, dynamic, continuous, and multi-agent</strong> environment is the most challenging for any AI system.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
