import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, RefreshCw } from 'lucide-react';

export default function Topic4_BellmanEquationValue() {
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
                        <SectionWrapper id="story" title="Section 1 — The Recursive Truth" icon={<RefreshCw size={20} className="text-blue-600" />} badge="Bellman" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Richard Bellman (1957) discovered that the value of a state can be defined in terms of the values of its successor states. This recursive relationship is the heart of Reinforcement Learning.</p>
                                <InfoCard type="tip" title="Dynamic Programming">
                                    The Bellman Equation is what allows us to use Dynamic Programming to solve RL problems by breaking them into smaller sub-problems.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Recursive Logic" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Scenario: A 1D Gridworld</p>
                                <div className="card p-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="flex justify-between items-center px-8 py-4">
                                        <div className="w-12 h-12 bg-white dark:bg-slate-800 border-2 border-slate-300 rounded flex items-center justify-center font-bold">A</div>
                                        <div className="h-0.5 flex-1 bg-slate-300 mx-2" />
                                        <div className="w-12 h-12 bg-emerald-500 text-white rounded flex items-center justify-center font-bold">B</div>
                                    </div>
                                    <p className="text-[10px] text-center text-slate-500 mt-2 italic">If B has a value of 10 and moving A→B gives reward 0, what is the value of A? (Assume γ=1)</p>
                                    <div className="mt-4 text-center font-bold text-primary-600">Answer: V(A) = 10</div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Bellman Quiz" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">What is the "Backup" concept?</div>
                                    <p className="text-xs text-slate-500 italic">It is the idea of bringing information back from successor states to update the value of the current state.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Is the Bellman Equation linear?</div>
                                    <p className="text-xs text-slate-500 italic">Yes, for a fixed policy, the Bellman expectation equation is a system of linear equations.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Backup Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <RefreshCw size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Recursive Value Explorer</h4>
                                <p className="text-sm text-slate-500">Manually perform a "Bellman Backup" on a small grid. Watch how the value propagates backwards from the goal state.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Launch Backup Lab</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500">
                                <h4 className="font-bold text-sm mb-1">Consistency Condition</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Think of the Bellman Equation not as a calculation, but as a <strong>consistency condition</strong>. If it holds for all states, then you have found the true value function for that policy.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
