import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, UserCheck, Layout, Settings, Rocket } from 'lucide-react';

export default function Topic2_PEASAndAgents() {
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
                        <SectionWrapper id="story" title="Section 1 — The Anatomy of an Agent" subtitle="PEAS Framework & Agent Taxonomy" icon={<UserCheck size={20} className="text-amber-600" />} badge="Core Concepts" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="space-y-5">
                                <div className="story-block">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">🧩 Defining the Problem: PEAS</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Before building an agent, we must specify its task environment using the <strong>PEAS</strong> framework. Think of it as a "Job Description" for the AI.
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                        {[
                                            { key: 'P', name: 'Performance', desc: 'The criteria for success.', icon: '🏆' },
                                            { key: 'E', name: 'Environment', desc: 'Where the agent operates.', icon: '🌍' },
                                            { key: 'A', name: 'Actuators', desc: 'How the agent takes action.', icon: '🦾' },
                                            { key: 'S', name: 'Sensors', desc: 'How the agent perceives.', icon: '👁️' },
                                        ].map(item => (
                                            <div key={item.key} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
                                                <div className="text-2xl mb-1">{item.icon}</div>
                                                <div className="font-bold text-lg text-amber-600">{item.key}</div>
                                                <div className="text-xs font-bold mb-1 uppercase">{item.name}</div>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="card p-5">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">🏠 Example: Automated Taxi</h4>
                                    <div className="grid sm:grid-cols-2 gap-4 text-xs">
                                        <div className="space-y-2">
                                            <p><strong>Performance:</strong> Safety, speed, comfort, profit, legal driving.</p>
                                            <p><strong>Environment:</strong> Streets, traffic, pedestrians, weather.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p><strong>Actuators:</strong> Steering, accelerator, brake, signal, horn.</p>
                                            <p><strong>Sensors:</strong> Cameras, LiDAR, GPS, speedometer, odometer.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── MATH ── */}
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Agent Architectures" icon={<Calculator size={20} className="text-red-600" />} badge="Architectures" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Reflex Agent Logic</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        The simplest agent follows "Condition-Action" rules.
                                    </p>
                                    <MathBlock formula="Action = \text{Rule}(Percept)" label="Simple Reflex" explanation="Action is determined solely by the current percept." />
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Utility-Based Agent</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        More complex agents use a utility function $U$ to measure "happiness" of states.
                                    </p>
                                    <MathBlock formula="\text{Action} = \arg\max_a \mathbb{E}[U(S_{next} | S, a)]" label="Utility-Based Decision" explanation="Choose action that maximizes expected utility of the resulting state." />
                                    <SymbolTable symbols={[
                                        { symbol: 'U(s)', meaning: 'Utility (desirability) of state s', unit: 'ℝ' },
                                        { symbol: 'S', meaning: 'Current internal state', unit: '-' },
                                        { symbol: 'a', meaning: 'Possible action', unit: '-' },
                                    ]} />
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── ACTIVITY ── */}
                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Matching PEAS" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" accentColor="border-emerald-500">
                            <div className="space-y-5">
                                <InfoCard type="info" title="Task: Define PEAS for 'Medical Diagnosis System'">
                                    Fill in the missing pieces for an AI that helps doctors diagnose diseases.
                                </InfoCard>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Performance', options: ['Patient health, cost reduction', 'Miles driven', 'Score in game'], answer: 'Patient health, cost reduction' },
                                        { label: 'Environment', options: ['Hospital, patients', 'Internet ads', 'Robot factory'], answer: 'Hospital, patients' },
                                        { label: 'Actuators', options: ['Display diagnosis, treatment plan', 'Robotic arm', 'Steering wheel'], answer: 'Display diagnosis, treatment plan' },
                                        { label: 'Sensors', options: ['Lab results, symptoms, patient history', 'Camera, GPS', 'Microphone'], answer: 'Lab results, symptoms, patient history' },
                                    ].map((item, i) => (
                                        <div key={i} className="card p-4">
                                            <div className="font-bold text-sm mb-2">{item.label}</div>
                                            <div className="flex flex-wrap gap-2">
                                                {item.options.map(opt => (
                                                    <button key={opt} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg text-xs transition-colors">
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
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
                                    { q: 'What does PEAS stand for in Intelligent Systems?', a: 'P: Performance Measure, E: Environment, A: Actuators, S: Sensors.' },
                                    { q: 'What is a Simple Reflex Agent?', a: 'A simple reflex agent selects actions based only on the current percept, ignoring the rest of the percept history. It uses condition-action rules.' },
                                    { q: 'Explain Utility-Based Agents.', a: 'Utility-based agents use a utility function to map a state to a real number, representing how "happy" or "desirable" that state is. They choose actions that lead to states with higher utility.' },
                                    { q: 'What is a Learning Agent?', a: 'A learning agent is an agent that can improve its performance over time by learning from its experiences. it usually consists of four components: learning element, performance element, critic, and problem generator.' },
                                ].map((item, i) => (
                                    <details key={i} className="group card">
                                        <summary className="p-4 cursor-pointer font-medium text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center">
                                            <span>Q{i + 1}: {item.q}</span>
                                            <Settings size={14} className="text-amber-500 group-open:rotate-180 transition-transform" />
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
                        <SectionWrapper id="lab" title="Section 5 — Agent Taxonomy" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Interactive" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-6">
                                <InfoCard type="tip" title="Choose your Agent Type">
                                    Click on an agent type to see its "Brain" structure.
                                </InfoCard>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {['Reflex', 'Model-Based', 'Goal-Based', 'Utility-Based', 'Learning'].map(type => (
                                        <button key={type} className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-amber-500 dark:hover:border-amber-500 transition-all text-sm font-bold shadow-sm">
                                            {type} Agent
                                        </button>
                                    ))}
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[200px]">
                                    <div className="text-center text-slate-400 italic">
                                        <Layout size={40} className="mx-auto mb-2 opacity-20" />
                                        Select an agent to visualize its logic flow
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── INSIGHTS ── */}
                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Key Takeaways" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Summary" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'The PEAS First Principle', desc: 'Always define the task (PEAS) before choosing the agent architecture.' },
                                    { title: 'Reflex vs. Planning', desc: 'Reflex agents are fast but short-sighted. Planning (Goal/Utility) agents are smart but computationally heavy.' },
                                    { title: 'Model-Based Thinking', desc: 'Keeping track of the "World State" allows agents to handle partially observable environments.' },
                                    { title: 'The Ultimate Goal', desc: 'Learning agents are the gold standard because they can adapt to environments the designer didn\'t fully specify.' },
                                ].map(item => (
                                    <div key={item.title} className="card p-4">
                                        <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                                            <Rocket size={16} className="text-amber-500" />
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