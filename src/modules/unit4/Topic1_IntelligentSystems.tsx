import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Cpu, History, Zap } from 'lucide-react';

export default function Topic1_IntelligentSystems() {
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
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === t.id ? 'bg-amber-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                            <Icon size={14} />{t.label}
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                    {/* ── STORY ── */}
                    {activeTab === 'story' && (
                        <SectionWrapper id="story" title="Section 1 — The Rise of Thinking Machines" subtitle="Evolution of Intelligent Systems" icon={<History size={20} className="text-amber-600" />} badge="Evolution" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="space-y-5">
                                <div className="story-block">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">🛠️ From Tools to Agents</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        For centuries, humans built tools to amplify physical strength. Then came automation to handle repetitive tasks. But the true frontier is <strong>Intelligence</strong>—systems that don't just follow recipes but "think" and "adapt."
                                    </p>
                                    <div className="grid sm:grid-cols-4 gap-4 mt-4">
                                        {[
                                            { era: 'Pre-1950s', title: 'Automation', desc: 'Fixed logic, no learning. Mechanical looms, simple thermostats.', icon: '⚙️' },
                                            { era: '1960s-80s', title: 'Symbolic AI', desc: 'Rule-based systems. "If-Then" expert systems.', icon: '📜' },
                                            { era: '1990s-2010s', title: 'Machine Learning', desc: 'Learning from data. Spam filters, recommendation engines.', icon: '📉' },
                                            { era: '2020s+', title: 'Autonomous Agents', desc: 'Reasoning and goal-oriented. LLMs, Self-driving cars.', icon: '🤖' },
                                        ].map(item => (
                                            <div key={item.title} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                                <div className="text-2xl mb-2">{item.icon}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">{item.era}</div>
                                                <div className="font-bold text-sm mb-1">{item.title}</div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <InfoCard type="definition" title="What is an Intelligent System?">
                                    An <strong>Intelligent System (IS)</strong> is a computer-based system that can perceive its environment, learn from data or experience, and take rational actions to achieve specific goals, often mimicking aspects of human intelligence such as reasoning and problem-solving.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── MATH ── */}
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Agent Function" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Modeling the Intelligent Agent</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Mathematically, an agent is a mapping from percept sequences to actions.
                                    </p>
                                    <MathBlock formula="f: \mathcal{P}^* \to \mathcal{A}" label="Agent Function" explanation="The agent function maps any given percept sequence to an action." />
                                    <SymbolTable symbols={[
                                        { symbol: '\mathcal{P}^*', meaning: 'The set of all possible percept sequences (history)', unit: '-' },
                                        { symbol: '\mathcal{A}', meaning: 'The set of possible actions', unit: '-' },
                                        { symbol: 'f', meaning: 'The agent function (abstract)', unit: '-' },
                                    ]} />
                                </div>
                                
                                <InfoCard type="tip" title="Agent Program vs Agent Function">
                                    The <strong>Agent Function</strong> is an abstract mathematical description; the <strong>Agent Program</strong> is a concrete implementation (code) that runs on the physical architecture.
                                </InfoCard>
                                
                                <div className="card p-5 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                                    <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Goal-Oriented Behavior</h4>
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        An intelligent system often seeks to maximize a performance measure $E$:
                                    </p>
                                    <div className="mt-3 text-center py-4 bg-white dark:bg-slate-900 rounded-lg">
                                        {'$\text{Maximize } \mathbb{E}[E(p_1, p_2, ..., p_n)]$'}
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── ACTIVITY ── */}
                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — System Classification" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" accentColor="border-emerald-500">
                            <div className="space-y-5">
                                <InfoCard type="info" title="Is it Intelligent?">
                                    Evaluate the following systems based on three criteria: <strong>Autonomy</strong>, <strong>Adaptability</strong>, and <strong>Perception</strong>.
                                </InfoCard>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: 'Traditional Calculator', intelligence: 'Low', reason: 'Fixed rules, no learning, no environment perception.' },
                                        { name: 'Modern Thermostat (Nest)', intelligence: 'Medium', reason: 'Perceives temperature, learns user preferences over time.' },
                                        { name: 'Chess Engine (Stockfish)', intelligence: 'High', reason: 'Deep search, evaluates millions of states, goal-oriented.' },
                                        { name: 'Industrial Robot Arm', intelligence: 'Medium/High', reason: 'Precise sensors (perception), adapts to collision (autonomy).' },
                                    ].map((item, i) => (
                                        <div key={i} className="card p-4 border-l-4 border-emerald-500">
                                            <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">{item.name}</div>
                                            <div className="text-xs font-bold text-emerald-600 uppercase mb-2">Intelligence: {item.intelligence}</div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">{item.reason}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── QUESTIONS ── */}
                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Exam Prep" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'Define an Intelligent System.', a: 'An Intelligent System is a system that can process information, learn from its environment, and take rational actions to achieve specific goals, often mimicking human-like cognitive functions.' },
                                    { q: 'What are the four main characteristics of an Intelligent System?', a: '1. Perception (sensing the environment), 2. Learning (adapting to new data), 3. Reasoning (making logical decisions), and 4. Autonomy (operating without constant human intervention).' },
                                    { q: 'Differentiate between an Agent Function and an Agent Program.', a: 'An Agent Function is a mathematical mapping of percept sequences to actions ($f: P^* \to A$). An Agent Program is the actual software implementation that executes this mapping on a physical architecture.' },
                                    { q: 'Mention two real-world examples of intelligent systems in daily life.', a: '1. Voice Assistants (Alexa/Siri) using NLP to understand and act. 2. Recommendation Engines (Netflix/YouTube) that learn user preferences.' },
                                ].map((item, i) => (
                                    <details key={i} className="group card">
                                        <summary className="p-4 cursor-pointer font-medium text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center">
                                            <span>Q{i + 1}: {item.q}</span>
                                            <Zap size={14} className="text-amber-500 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── LAB ── */}
                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Interactive Characteristics" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Interactive" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-4">
                                <InfoCard type="tip" title="The IS Scoreboard">
                                    Rate a system on these 5 dimensions to see if it qualifies as an "Intelligent System."
                                </InfoCard>
                                <div className="card p-6 space-y-6">
                                    {[
                                        { label: 'Perception', desc: 'Can it sense the world?', color: 'bg-blue-500' },
                                        { label: 'Adaptability', desc: 'Does it learn from mistakes?', color: 'bg-emerald-500' },
                                        { label: 'Autonomy', desc: 'Can it work alone?', color: 'bg-violet-500' },
                                        { label: 'Reasoning', desc: 'Can it solve puzzles?', color: 'bg-amber-500' },
                                        { label: 'Goal-Orientation', desc: 'Is it trying to win?', color: 'bg-red-500' },
                                    ].map((trait) => (
                                        <div key={trait.label} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-sm">{trait.label}</span>
                                                <span className="text-xs text-slate-400">{trait.desc}</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1 }} className={`h-full ${trait.color}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── INSIGHTS ── */}
                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Key Takeaways" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Summary" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'Beyond Automation', desc: 'Intelligence is about handling novelty and uncertainty, not just repeating steps.' },
                                    { title: 'The Percept History', desc: 'Rational decisions depend on everything the agent has sensed so far, not just the current moment.' },
                                    { title: 'Evolutionary Trend', desc: 'We are moving from systems we "program" to systems we "train" or "instruct".' },
                                    { title: 'The Human Link', desc: 'IS are designed to mimic human-like rationality, but they often solve problems in non-human ways.' },
                                ].map(item => (
                                    <div key={item.title} className="card p-4">
                                        <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                                            <Cpu size={16} className="text-amber-500" />
                                            {item.title}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
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