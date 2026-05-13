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
                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Trial & Error Simulation" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Try to predict the cat's behavior in the puzzle box over multiple trials.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="card p-4 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200">
                                        <h4 className="font-bold text-xs mb-2">Trial 1</h4>
                                        <p className="text-[10px] text-slate-500 italic">"Cat meows, scratches at walls, pushes randomly..."</p>
                                    </div>
                                    <div className="card p-4 bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200">
                                        <h4 className="font-bold text-xs mb-2">Trial 50</h4>
                                        <p className="text-[10px] text-primary-600 italic">"Cat immediately pulls the loop and escapes."</p>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Assessment" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Questions" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'What is the "Law of Effect"?', a: 'Actions followed by pleasant consequences are more likely to be repeated.' },
                                    { q: 'Who is considered the pioneer of trial-and-error learning?', a: 'Edward Thorndike.' },
                                    { q: 'Name the three main historical threads of RL.', a: 'Trial-and-error, Optimal Control, and Temporal-Difference learning.' }
                                ].map((item, i) => (
                                    <div key={i} className="card p-4">
                                        <div className="font-bold text-sm mb-2">Q: {item.q}</div>
                                        <div className="text-xs text-slate-500">A: {item.a}</div>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Virtual Puzzle Box" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300">
                                <FlaskConical size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Interactive Simulation</h4>
                                <p className="text-sm text-slate-500">Experience Thorndike's experiment by adjusting the "Reward Probability" and observing the learning curve.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Launch Lab</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Real-World Impact" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Why do the roots matter today?</p>
                                <InfoCard type="tip" title="From Cats to AlphaGo">
                                    The same principles of <strong>Trial and Error</strong> and <strong>Reward Maximization</strong> that Thorndike observed in cats are exactly what powered DeepMind\'s AlphaGo to beat world champions.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
