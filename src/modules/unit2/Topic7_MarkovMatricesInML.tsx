import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Brain, Network } from 'lucide-react';

export default function Topic7_MarkovMatricesInML() {
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
                        <SectionWrapper id="story" title="Section 1 — Matrices in Action" icon={<Network size={20} className="text-blue-600" />} badge="ML Integration" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">In Machine Learning, Markov Matrices are used to model sequential data and predict future outcomes based on current observations.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-primary-600">
                                            <Brain size={16} />
                                            <span className="font-bold text-sm">Sequence Modeling</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Predicting the next state in a sequence (e.g., character-level text generation).</p>
                                    </div>
                                    <div className="card p-4">
                                        <div className="flex items-center gap-2 mb-2 text-primary-600">
                                            <Network size={16} />
                                            <span className="font-bold text-sm">PageRank</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Google's famous algorithm models the web as a Markov chain to rank pages.</p>
                                    </div>
                                </div>
                                <InfoCard type="info" title="Transition vs Transformation">
                                    While standard ML uses weight matrices for transformations, Markov models use transition matrices to represent **probabilistic movement** between states.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
