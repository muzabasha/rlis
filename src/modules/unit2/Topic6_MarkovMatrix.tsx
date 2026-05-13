import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Grid3X3 } from 'lucide-react';

export default function Topic6_MarkovMatrix() {
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
                        <SectionWrapper id="story" title="Section 1 — The Transition Grid" icon={<Grid3X3 size={20} className="text-blue-600" />} badge="Matrix" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">A **Markov Matrix** (or Transition Matrix) is a square matrix used to describe the transitions of a Markov chain. Each entry represents the probability of moving from one state to another.</p>
                                <div className="card p-5 bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                                    <h4 className="font-bold text-sm mb-3">Mathematical Properties</h4>
                                    <ul className="text-xs space-y-2 list-disc pl-4 text-slate-500">
                                        <li><strong>Non-negative:</strong> All entries are ≥ 0.</li>
                                        <li><strong>Row Stochasitc:</strong> The sum of entries in each row must be exactly 1.0.</li>
                                        <li><strong>Square:</strong> The number of rows equals the number of columns (one for each state).</li>
                                    </ul>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Matrix Validator" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Is this a valid Markov Matrix?</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="font-mono text-center space-y-1">
                                        <div>[ 0.7, 0.3 ]</div>
                                        <div>[ 0.1, 0.9 ]</div>
                                    </div>
                                    <div className="mt-4 flex justify-center gap-4">
                                        <div className="text-[10px] text-emerald-600 font-bold">Row 1 Sum: 1.0 ✓</div>
                                        <div className="text-[10px] text-emerald-600 font-bold">Row 2 Sum: 1.0 ✓</div>
                                    </div>
                                    <p className="text-[10px] text-center text-slate-500 mt-2 italic">Since all rows sum to 1 and all values are non-negative, this is a valid stochastic matrix.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Matrix Quiz" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4 border-l-4 border-blue-500">
                                    <div className="text-sm font-bold mb-1">Q: What happens if a row sums to 0.9?</div>
                                    <p className="text-xs text-slate-500 italic">A: It is mathematically invalid. There is a "missing" 0.1 probability, meaning the agent could "disappear" from the system.</p>
                                </div>
                                <div className="card p-4 border-l-4 border-emerald-500">
                                    <div className="text-sm font-bold mb-1">Q: Can a Markov Matrix be rectangular?</div>
                                    <p className="text-xs text-slate-500 italic">A: No, it must be square because it maps from a set of states back to the same set of states.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — State Predictor Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300">
                                <Grid3X3 size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Steady State Calculator</h4>
                                <p className="text-sm text-slate-500">Input transition probabilities and watch how the state distribution converges after 100 iterations (P¹⁰⁰).</p>
                                <button className="btn-primary mt-4 py-2 px-6">Compute Steady State</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500">
                                <h4 className="font-bold text-sm mb-1">Google's PageRank</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">One of the most famous applications of Markov Matrices is Google's PageRank algorithm, which treats the entire internet as a Markov Chain and finds the "steady state" importance of each page.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
