import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, GitBranch, Box } from 'lucide-react';

export default function Topic5_MarkovModel() {
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
                        <SectionWrapper id="story" title="Section 1 — Modeling Randomness" icon={<GitBranch size={20} className="text-blue-600" />} badge="Concepts" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">A **Markov Model** is a stochastic model used to model randomly changing systems. It assumes that future states depend only on the current state, not on the events that occurred before it.</p>
                                <div className="card p-5 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                                    <h4 className="font-bold text-sm mb-2">Real-World Use Cases</h4>
                                    <ul className="text-xs space-y-2 list-disc pl-4 text-slate-500">
                                        <li><strong>Weather Prediction:</strong> Sunny → Rainy transitions.</li>
                                        <li><strong>NLP:</strong> Predicting the next word in a sentence (Bigram models).</li>
                                        <li><strong>Stock Market:</strong> Modeling price movements as random walks.</li>
                                    </ul>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
