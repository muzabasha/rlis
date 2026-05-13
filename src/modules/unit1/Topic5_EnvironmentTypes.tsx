import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Globe, Settings } from 'lucide-react';

export default function Topic5_EnvironmentTypes() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const envTypes = [
        { name: 'Deterministic', desc: 'The next state is fixed given the current state and action.', example: 'Chess' },
        { name: 'Stochastic', desc: 'The next state involves randomness.', example: 'Dice Games' },
        { name: 'Fully Observable', desc: 'Agent sees everything it needs to know.', example: 'Tic-Tac-Toe' },
        { name: 'Partially Observable', desc: 'Agent has limited information.', example: 'Poker (hidden cards)' },
    ];

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
                        <SectionWrapper id="story" title="Section 1 — The World Around the Agent" icon={<Globe size={20} className="text-cyan-600" />} badge="Classification" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">Not all worlds are created equal. An agent in a warehouse (deterministic) has a different life than an agent in the stock market (stochastic).</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {envTypes.map(env => (
                                        <div key={env.name} className="card p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Settings size={14} className="text-primary-500" />
                                                <span className="font-bold text-sm">{env.name}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-1">{env.desc}</p>
                                            <div className="text-[10px] text-primary-600 font-semibold italic">Example: {env.example}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Stochastic Dynamics" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">In a stochastic environment, transitions are governed by probabilities.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        Σ P(s' | s, a) = 1
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">The sum of probabilities of moving to all possible next states $s'$ must be 1.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Environment Sort" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Classify these real-world tasks:</p>
                                <div className="space-y-2">
                                    {[
                                        { task: 'Self-driving in rain', types: ['Stochastic', 'Partially Observable'] },
                                        { task: 'Playing Go', types: ['Deterministic', 'Fully Observable'] },
                                        { task: 'Medical diagnosis', types: ['Stochastic', 'Partially Observable'] }
                                    ].map(item => (
                                        <div key={item.task} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                            <span className="text-sm font-semibold">{item.task}</span>
                                            <div className="flex gap-1">
                                                {item.types.map(t => (
                                                    <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Uncertainty Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <Globe size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Stochasticity Sandbox</h4>
                                <p className="text-sm text-slate-500">Add "Wind" or "Sensor Noise" to a simple gridworld and see how the agent's optimal path changes.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Open Sandbox</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Real World Complexity" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500">
                                <h4 className="font-bold text-sm mb-1">Observation ≠ State</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">In real life, we rarely see the "true state". We only get observations. Learning to act under this uncertainty is the hallmark of advanced Intelligent Systems.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
