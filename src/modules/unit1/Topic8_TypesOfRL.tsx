import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Share2, GitBranch } from 'lucide-react';

export default function Topic8_TypesOfRL() {
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
                        <SectionWrapper id="story" title="Section 1 — The RL Family Tree" icon={<Share2 size={20} className="text-blue-600" />} badge="Types" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">RL algorithms can be classified in several ways. The most fundamental split is between those that use a model and those that don't.</p>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="card p-5 bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                                        <div className="flex items-center gap-2 mb-3">
                                            <GitBranch className="text-blue-600" size={18} />
                                            <h4 className="font-bold">Model-Free RL</h4>
                                        </div>
                                        <p className="text-xs text-slate-500 mb-3">Learns through trial and error without predicting the environment's physics. Very popular and robust.</p>
                                        <ul className="text-[10px] space-y-1 list-disc pl-4 text-blue-700">
                                            <li>Q-Learning</li>
                                            <li>SARSA</li>
                                            <li>Policy Gradients</li>
                                        </ul>
                                    </div>
                                    <div className="card p-5 bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800">
                                        <div className="flex items-center gap-2 mb-3">
                                            <GitBranch className="text-emerald-600" size={18} />
                                            <h4 className="font-bold">Model-Based RL</h4>
                                        </div>
                                        <p className="text-xs text-slate-500 mb-3">Builds a "Model" of the world first, then uses it to plan ahead. More sample-efficient.</p>
                                        <ul className="text-[10px] space-y-1 list-disc pl-4 text-emerald-700">
                                            <li>Dynamic Programming</li>
                                            <li>Dyna-Q</li>
                                            <li>AlphaZero (partial)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Practical Tips" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Strategy" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <InfoCard type="tip" title="When to use what?">
                                Use <strong>Model-Free</strong> when the environment is complex and hard to simulate (like robotics in the wild). Use <strong>Model-Based</strong> when samples are expensive (like medical trials or complex simulations).
                            </InfoCard>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
