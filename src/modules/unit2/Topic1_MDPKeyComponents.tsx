import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, GitBranch, Box } from 'lucide-react';

export default function Topic1_MDPKeyComponents() {
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
                        <SectionWrapper id="story" title="Section 1 — The Anatomy of a Decision" icon={<Box size={20} className="text-violet-600" />} badge="MDP" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">The Markov Decision Process (MDP) is the standard mathematical framework for modeling reinforcement learning problems. It has four essential components.</p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { name: 'States (S)', desc: 'The world\'s current situation.' },
                                        { name: 'Actions (A)', desc: 'What the agent can do.' },
                                        { name: 'Rewards (R)', desc: 'The feedback received.' },
                                        { name: 'Transitions (P)', desc: 'How states change.' }
                                    ].map(comp => (
                                        <div key={comp.name} className="card p-4 text-center">
                                            <div className="font-bold text-sm text-primary-600 mb-1">{comp.name}</div>
                                            <p className="text-[10px] text-slate-500">{comp.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <InfoCard type="definition" title="MDP Tuple">
                                    An MDP is typically defined as a tuple ⟨S, A, P, R, γ⟩.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
