import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Rocket, Cpu, Briefcase } from 'lucide-react';

export default function Topic11_ApplicationsOfRL() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const apps = [
        { name: 'Gaming', desc: 'AlphaGo, Dota 2 bots, and human-level performance in Atari.', icon: <Rocket className="text-blue-500" /> },
        { name: 'Robotics', desc: 'Learning to walk, pick objects, and navigate obstacles.', icon: <Cpu className="text-emerald-500" /> },
        { name: 'Finance', desc: 'Algorithmic trading, portfolio optimization, and risk management.', icon: <Briefcase className="text-amber-500" /> },
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
                        <SectionWrapper id="story" title="Section 1 — RL in the Real World" icon={<Rocket size={20} className="text-blue-600" />} badge="Use Cases" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">RL is no longer just a research topic. It is powering some of the most advanced systems today.</p>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {apps.map(app => (
                                        <div key={app.name} className="card p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                {app.icon}
                                                <span className="font-bold text-sm">{app.name}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500">{app.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <InfoCard type="info" title="Future Frontier">
                                    Autonomous vehicles and healthcare (personalized treatment plans) are the next big frontiers for Reinforcement Learning.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
