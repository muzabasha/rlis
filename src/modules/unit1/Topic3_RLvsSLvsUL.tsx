import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, GitBranch, ArrowRightLeft } from 'lucide-react';

export default function Topic3_RLvsSLvsUL() {
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
                        <SectionWrapper id="story" title="Section 1 — The Three Teachers" subtitle="Comparing Learning Paradigms" icon={<ArrowRightLeft size={20} className="text-violet-600" />} badge="Comparison" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="story-block space-y-6">
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="card p-4 border-t-4 border-blue-500">
                                        <h4 className="font-bold mb-2">Supervised</h4>
                                        <p className="text-xs text-slate-500 italic">"The Teacher tells you exactly what the answer is."</p>
                                        <div className="mt-2 text-[10px] bg-blue-50 p-2 rounded">Labeled Data</div>
                                    </div>
                                    <div className="card p-4 border-t-4 border-emerald-500">
                                        <h4 className="font-bold mb-2">Unsupervised</h4>
                                        <p className="text-xs text-slate-500 italic">"There is no teacher. You find patterns by yourself."</p>
                                        <div className="mt-2 text-[10px] bg-emerald-50 p-2 rounded">Hidden Patterns</div>
                                    </div>
                                    <div className="card p-4 border-t-4 border-amber-500">
                                        <h4 className="font-bold mb-2">Reinforcement</h4>
                                        <p className="text-xs text-slate-500 italic">"The Teacher only tells you 'Good' or 'Bad' after you act."</p>
                                        <div className="mt-2 text-[10px] bg-amber-50 p-2 rounded">Reward/Feedback</div>
                                    </div>
                                </div>
                                <InfoCard type="info" title="Key Distinction">
                                    In RL, there is no "Ground Truth" label. There is only a reward signal that arrives after a sequence of actions.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Data Mapping" icon={<Calculator size={20} className="text-red-600" />} badge="Formalism" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <div className="grid gap-4">
                                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                                        <div className="text-xs font-bold text-blue-600 mb-1 uppercase">Supervised Learning</div>
                                        <div className="font-mono text-sm text-center">Dataset: {'{(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)}'}</div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                                        <div className="text-xs font-bold text-amber-600 mb-1 uppercase">Reinforcement Learning</div>
                                        <div className="font-mono text-sm text-center">Trajectory: {'{s₀, a₀, r₁, s₁, a₁, r₂, ...}'}</div>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
