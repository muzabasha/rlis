import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Globe, Settings } from 'lucide-react';

export default function Topic5_EnvironmentTypes() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const envTypes = [
        { name: 'Deterministic', desc: 'The next state is fixed given the current state and action.', example: 'Chess' },
        { name: 'Stochastic', desc: 'The next state involves randomness.', example: 'Dice Games' },
        { name: 'Fully Observable', desc: 'Agent sees everything it needs to know.', example: 'Tic-Tac-Toe' },
        { name: 'Partially Observable', desc: 'Agent has limited information.', example: 'Poker (hidden cards)' },
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
                        <SectionWrapper id="story" title="Section 1 — The World Around the Agent" icon={<Globe size={20} className="text-cyan-600" />} badge="Classification" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">Not all worlds are created equal. An agent in a warehouse (deterministic) has a different life than an agent in the stock market (stochastic).</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {envTypes.map(env => (
                                        <div key={env.name} className="card p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Settings size={14} className="text-primary-500" />
                                                <span className="font-bold text-sm">{env.name}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-1">{env.desc}</p>
                                            <div className="text-[10px] text-primary-600 font-semibold italic">Example: {env.example}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Review Questions" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Prep" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'What is a Markovian environment?', a: 'An environment where the next state depends only on the current state and action, not the history.' },
                                    { q: 'Define Episodic vs Continuing tasks.', a: 'Episodic tasks have a natural end (e.g., a game); continuing tasks run indefinitely (e.g., a robot maintenance task).' }
                                ].map((item, i) => (
                                    <div key={i} className="card p-4">
                                        <div className="font-bold text-sm mb-2">Q: {item.q}</div>
                                        <div className="text-xs text-slate-500">{item.a}</div>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
