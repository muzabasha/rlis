import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, GitMerge } from 'lucide-react';

export default function Topic3_DeterministicStochasticPolicy() {
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
                        <SectionWrapper id="story" title="Section 1 — Certainty vs Probability" icon={<GitMerge size={20} className="text-blue-600" />} badge="Policy Types" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="card p-4">
                                        <h4 className="font-bold text-sm mb-2">Deterministic Policy</h4>
                                        <p className="text-xs text-slate-500 italic">"If I am in state S, I always take action A."</p>
                                        <div className="mt-2 text-[10px] bg-blue-50 p-2 rounded font-mono">{'a = π(s)'}</div>
                                    </div>
                                    <div className="card p-4">
                                        <h4 className="font-bold text-sm mb-2">Stochastic Policy</h4>
                                        <p className="text-xs text-slate-500 italic">"If I am in state S, I take action A with probability P."</p>
                                        <div className="mt-2 text-[10px] bg-emerald-50 p-2 rounded font-mono">{'π(a|s) = P[Aₜ=a | Sₜ=s]'}</div>
                                    </div>
                                </div>
                                <InfoCard type="info" title="Why use Stochastic?">
                                    Stochastic policies are useful in partially observable environments or when the agent needs to be unpredictable (e.g., Rock-Paper-Scissors).
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
