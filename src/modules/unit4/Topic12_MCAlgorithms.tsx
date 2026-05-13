import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, GitBranch } from 'lucide-react';

export default function Topic12_MCAlgorithms() {
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
                        <SectionWrapper id="story" title="Section 1 — Counting Visits" icon={<GitBranch size={20} className="text-blue-600" />} badge="Algorithms" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="card p-4">
                                        <h4 className="font-bold text-sm mb-2 text-primary-600">First-Visit MC</h4>
                                        <p className="text-xs text-slate-500">Only the first time a state is visited in an episode is used to estimate the value.</p>
                                    </div>
                                    <div className="card p-4">
                                        <h4 className="font-bold text-sm mb-2 text-emerald-600">Every-Visit MC</h4>
                                        <p className="text-xs text-slate-500">Every time a state is visited in an episode, it contributes to the value estimation.</p>
                                    </div>
                                </div>
                                <InfoCard type="info" title="Convergence">
                                    Both methods converge to the true value function as the number of visits to each state goes to infinity.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — First vs Every Visit" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Episode Trace: S1 → S2 → S1 → S3 (End)</p>
                                <div className="card p-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="flex justify-between items-center px-4">
                                        <div className="text-center">
                                            <div className="text-[10px] font-bold text-primary-600">First-Visit</div>
                                            <div className="text-xs">S1 counted ONCE</div>
                                        </div>
                                        <div className="h-8 w-px bg-slate-300" />
                                        <div className="text-center">
                                            <div className="text-[10px] font-bold text-emerald-600">Every-Visit</div>
                                            <div className="text-xs">S1 counted TWICE</div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center text-slate-500 mt-4 italic">Which one is more computationally expensive? (Every-Visit)</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Algorithm Quiz" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: Does MC Prediction require a model of the environment?</div>
                                    <p className="text-xs text-slate-500 italic">A: No, it only requires experience—sample sequences of states, actions, and rewards.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: What is the main disadvantage of MC?</div>
                                    <p className="text-xs text-slate-500 italic">A: It can only be applied to episodic tasks (tasks that eventually end).</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Simulation Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <Calculator size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">MC Statistics Tracker</h4>
                                <p className="text-sm text-slate-500">Generate 1000 random episodes and watch how the running average of the state values settles towards the true value.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Generate Episodes</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500">
                                <h4 className="font-bold text-sm mb-1">Law of Large Numbers</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Monte Carlo methods are a direct application of the Law of Large Numbers. The more samples we have, the closer our estimate becomes to the mathematical expectation.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
