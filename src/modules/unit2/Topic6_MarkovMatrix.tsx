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

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Matrix Notation" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <MathBlock formula="P = \begin{bmatrix} P_{11} & P_{12} & \dots \\ P_{21} & P_{22} & \dots \\ \vdots & \vdots & \ddots \end{bmatrix}" label="Transition Matrix" explanation="P_{ij} is the probability of moving from state i to state j." />
                                <MathBlock formula="\sum_{j=1}^{n} P_{ij} = 1" label="Row Sum Property" explanation="From any state i, the total probability of transitioning to any possible next state must be 1." />
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
