import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, FileText } from 'lucide-react';

export default function Topic2_FormalMDPDefinition() {
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
                        <SectionWrapper id="story" title="Section 1 — The Formal Language of RL" icon={<FileText size={20} className="text-blue-600" />} badge="Formalism" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">To build algorithms, we need a precise mathematical language. The formal definition of an MDP allows us to prove that our algorithms will actually work.</p>
                                <InfoCard type="definition" title="Markov Decision Process (MDP)">
                                    A Markov Decision Process is a 5-tuple (S, A, P, R, γ), where S is a finite set of states, A is a finite set of actions, P is a state transition probability matrix, R is a reward function, and γ is a discount factor.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Transition Dynamics" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <MathBlock formula="P(s' | s, a) = \mathbb{P}[S_{t+1} = s' | S_t = s, A_t = a]" label="State Transition Probability" explanation="The probability of landing in state s' given the current state is s and the action taken is a." />
                                <MathBlock formula="R(s, a) = \mathbb{E}[R_{t+1} | S_t = s, A_t = a]" label="Expected Reward" explanation="The immediate reward expected after taking action a in state s." />
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
