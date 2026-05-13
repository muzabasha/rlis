import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, History, Milestone } from 'lucide-react';

export default function Topic1_EarlyRoots() {
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
                        <SectionWrapper id="story" title="Section 1 — The Origins of RL" subtitle="From Psychology to Computer Science" icon={<History size={20} className="text-blue-600" />} badge="Roots" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">🐾 Thorndike's Puzzle Box</h3>
                                <p className="text-slate-600 dark:text-slate-400">In 1898, Edward Thorndike placed hungry cats in boxes. To escape and get food, they had to perform a specific action (like pulling a loop). At first, they struggled. But over time, the <strong>reward</strong> (food) reinforced the <strong>action</strong>. This "Law of Effect" is the grandfather of Reinforcement Learning.</p>
                                <InfoCard type="definition" title="Law of Effect">
                                    Responses that produce a satisfying effect in a particular situation become more likely to occur again in that situation.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Feedback Loop" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">The early mathematical roots come from Optimal Control and Dynamic Programming (Bellman, 1950s).</p>
                                <MathBlock formula="S_t, A_t \rightarrow R_{t+1}, S_{t+1}" label="The Core Cycle" explanation="At time t, an agent in state S takes action A, resulting in reward R and a new state S at t+1." />
                            </div>
                        </SectionWrapper>
                    )}

                    {/* Other tabs with relevant content... */}
                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Prep" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'Who proposed the Law of Effect?', a: 'Edward Thorndike in 1898.' },
                                    { q: 'What are the two main threads of RL history?', a: 'Trial-and-error learning (Psychology) and Optimal Control (Mathematics).' }
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
