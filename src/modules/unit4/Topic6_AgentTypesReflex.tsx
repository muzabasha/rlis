import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Share2, Bot } from 'lucide-react';

export default function Topic6_AgentTypesReflex() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const agents = [
        { name: 'Simple Reflex', desc: 'Actions based only on current percept (if-then).', icon: '⚡' },
        { name: 'Model-Based', desc: 'Keeps track of the part of the world it can\'t see.', icon: '🗺️' },
        { name: 'Goal-Based', desc: 'Acts to achieve a specific future state.', icon: '🎯' },
        { name: 'Utility-Based', desc: 'Acts to maximize a "happiness" or utility score.', icon: '📈' },
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
                        <SectionWrapper id="story" title="Section 1 — The Spectrum of Agent Complexity" icon={<Bot size={20} className="text-blue-600" />} badge="Agent Types" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">Agents range from simple reflexes to complex systems that learn from their own successes and failures.</p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {agents.map(agent => (
                                        <div key={agent.name} className="card p-4 text-center">
                                            <div className="text-2xl mb-2">{agent.icon}</div>
                                            <div className="font-bold text-xs mb-1">{agent.name}</div>
                                            <p className="text-[10px] text-slate-500">{agent.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <InfoCard type="info" title="Learning Agents">
                                    A <strong>Learning Agent</strong> can improve its performance over time by observing the results of its actions. It consists of four parts: learning element, performance element, critic, and problem generator.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
