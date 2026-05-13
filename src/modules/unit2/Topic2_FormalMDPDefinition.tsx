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

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — MDP Builder" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Define a 5-tuple for a simple game: Coin Flip.</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { tuple: 'S (States)', value: '{Start, Heads, Tails}' },
                                        { tuple: 'A (Actions)', value: '{Flip}' },
                                        { tuple: 'P (Transitions)', value: 'P(Heads|Start, Flip) = 0.5' },
                                        { tuple: 'R (Rewards)', value: 'R(Heads) = +1, R(Tails) = -1' },
                                        { tuple: 'γ (Discount)', value: '0.9 (Value tomorrow is worth 90% of today)' }
                                    ].map(item => (
                                        <div key={item.tuple} className="flex border-b border-slate-100 dark:border-slate-800 py-2">
                                            <span className="w-32 font-bold text-xs text-primary-600">{item.tuple}</span>
                                            <span className="text-xs text-slate-500">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Definition Quiz" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">What does the "finite" requirement mean in S and A?</div>
                                    <p className="text-xs text-slate-500 italic">It means there is a countable number of states and actions, allowing us to represent them in matrices.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Why do we need the discount factor γ?</div>
                                    <p className="text-xs text-slate-500 italic">To prevent infinite returns in continuing tasks and to represent the preference for immediate rewards.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Tuple Explorer" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <Calculator size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">MDP Configuration Lab</h4>
                                <p className="text-sm text-slate-500">Modify the P matrix and R vector of a 3-state MDP and see how the state values recalculate instantly.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Launch Matrix Lab</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500">
                                <h4 className="font-bold text-sm mb-1">The Power of Generalization</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">The 5-tuple is so powerful because it can describe almost any sequential decision problem—from playing Atari to controlling a nuclear reactor.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
