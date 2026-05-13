import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Box, GitMerge } from 'lucide-react';

export default function Topic4_ElementsOfRL() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const elements = [
        { name: 'Policy', def: 'The strategy or mapping from states to actions.', icon: '🗺️' },
        { name: 'Reward Signal', def: 'Immediate feedback (positive or negative) from the environment.', icon: '🍎' },
        { name: 'Value Function', def: 'The long-term total reward expected from a state.', icon: '💎' },
        { name: 'Model', def: 'The agent\'s internal prediction of the environment\'s behavior.', icon: '🔮' },
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
                        <SectionWrapper id="story" title="Section 1 — The Components of Intelligence" icon={<Box size={20} className="text-emerald-600" />} badge="Core Elements" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">An RL agent is made of four main organs. If one fails, the agent cannot learn efficiently.</p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {elements.map(el => (
                                        <div key={el.name} className="card p-4 text-center">
                                            <div className="text-2xl mb-2">{el.icon}</div>
                                            <div className="font-bold text-sm mb-1">{el.name}</div>
                                            <p className="text-[10px] text-slate-500">{el.def}</p>
                                        </div>
                                    ))}
                                </div>
                                <InfoCard type="tip" title="Value vs Reward">
                                    Reward is <strong>immediate</strong>. Value is <strong>long-term</strong>. An action might give a low reward now but lead to a very high value state later.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Key Takeaways" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Summary" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <GitMerge className="text-primary-500 mt-1" size={16} />
                                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>The Reward is Primary:</strong> The goal of the agent is defined by the reward signal. Everything else (policy, value) is derived from it.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <GitMerge className="text-primary-500 mt-1" size={16} />
                                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Models are Optional:</strong> Some RL agents (model-free) don't try to predict the environment; they just learn the value of actions directly.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
