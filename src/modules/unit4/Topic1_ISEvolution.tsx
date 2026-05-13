import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Cpu, History, CheckCircle2, Clock, Target, AlertTriangle, TrendingUp, Briefcase } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Topic1_ISEvolution() {
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
                        <SectionWrapper id="story" title="Section 1 — From Logic to Learning" icon={<Cpu size={20} className="text-blue-600" />} badge="History" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">In the early days, we thought intelligence was just logic. If you could write down all the rules of chess, the machine would be intelligent. But real life is messy. You can't write rules for walking or seeing.</p>
                                <p className="text-slate-600 dark:text-slate-400">The evolution of Intelligent Systems is the story of moving from **fixed rules** to **adaptive learning**. Today, agents don't just follow instructions; they discover how to solve problems through experience.</p>
                                <InfoCard type="definition" title="Intelligent Agent">
                                    An autonomous entity which observes through sensors and acts upon an environment using actuators and directs its activity towards achieving goals.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Modeling Intelligence" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">We can model the "Intelligence" of a system using the **Intelligence Quotient (IQ)** or more formally via performance metrics.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        {'I(S) = \\int_{\\mu \\in \\text{Env}} P(S, \\mu) \\cdot 2^{-K(\\mu)} d\\mu'}
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">Legg-Hutter Universal Intelligence: Intelligence is the capability of an agent to achieve goals in a wide range of environments.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Timeline Challenge" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Order these milestones in AI History:</p>
                                <div className="space-y-2">
                                    {[
                                        { year: '1950', event: 'Turing Test Proposed' },
                                        { year: '1997', event: 'Deep Blue defeats Kasparov' },
                                        { year: '2016', event: 'AlphaGo defeats Lee Sedol' }
                                    ].map(item => (
                                        <div key={item.year} className="flex gap-4 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                            <span className="font-bold text-primary-600">{item.year}</span>
                                            <span className="text-sm">{item.event}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — History Quiz" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">What is the "Dartmouth Workshop"?</div>
                                    <p className="text-xs text-slate-500 italic">The 1956 workshop where the term "Artificial Intelligence" was first coined.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Differentiate between Narrow and General AI.</div>
                                    <p className="text-xs text-slate-500 italic">Narrow AI (ANI) is designed for a single task; General AI (AGI) can learn any intellectual task a human can.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Evolution Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <History size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Algorithm Evolution Visualizer</h4>
                                <p className="text-sm text-slate-500">Compare the decision-making process of a 1970s Expert System with a 2024 Reinforcement Learning agent.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Explore Evolution</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500">
                                <h4 className="font-bold text-sm mb-1">The Paradigm Shift</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">The shift from "Coding Knowledge" to "Coding a Learner" is the most significant change in the history of Intelligent Systems. We no longer tell the machine what to do; we tell it how to learn what to do.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
