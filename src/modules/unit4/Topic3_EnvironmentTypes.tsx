import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Globe, Activity, Layers, Repeat } from 'lucide-react';

export default function Topic3_EnvironmentTypes() {
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
                        <SectionWrapper id="story" title="Section 1 — The World the Agent Lives In" subtitle="Environment Properties & Interactions" icon={<Globe size={20} className="text-amber-600" />} badge="Environments" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="space-y-5">
                                <div className="story-block">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">🌍 Knowing Your Surroundings</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Not all environments are created equal. Solving a Sudoku puzzle is vastly different from driving a car in rush hour traffic. We classify environments using several key properties.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                        {[
                                            { title: 'Observability', desc: 'Can you see everything (Chess) or only parts (Poker)?', icon: '👁️' },
                                            { title: 'Determinism', desc: 'Is the next state fixed (Math) or random (Dice)?', icon: '🎲' },
                                            { title: 'Episodicity', desc: 'Are actions independent (Spam Filter) or connected (Gaming)?', icon: '🎞️' },
                                            { title: 'Dynamism', desc: 'Does the world change while you think (Driving) or wait (Chess)?', icon: '⏳' },
                                        ].map(item => (
                                            <div key={item.title} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex gap-3 items-center">
                                                <div className="text-2xl">{item.icon}</div>
                                                <div>
                                                    <div className="font-bold text-sm">{item.title}</div>
                                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <InfoCard type="definition" title="Agent-Environment Interaction">
                                    The agent perceives the environment through <strong>Sensors</strong> and acts upon it through <strong>Actuators</strong>. This loop continues until a terminal state or goal is reached.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── MATH ── */}
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Stochastic vs Deterministic" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Deterministic Transitions</h4>
                                    <MathBlock formula="s_{t+1} = f(s_t, a_t)" label="Deterministic Environment" explanation="The next state is a fixed function of the current state and action." />
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Stochastic Transitions</h4>
                                    <MathBlock formula="P(s_{t+1} | s_t, a_t) = \text{Probability Distribution}" label="Stochastic Environment" explanation="The next state is uncertain, modeled by a probability distribution." />
                                    <SymbolTable symbols={[
                                        { symbol: 's_t', meaning: 'State at time t', unit: '-' },
                                        { symbol: 'a_t', meaning: 'Action at time t', unit: '-' },
                                        { symbol: 'P(...)', meaning: 'Transition probability', unit: '[0, 1]' },
                                    ]} />
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── ACTIVITY ── */}
                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Classify the Environment" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <InfoCard type="info" title="Environment Matrix">
                                    Identify properties for these famous environments.
                                </InfoCard>
                                <div className="overflow-x-auto card">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-800 text-left">
                                                <th className="p-3">Environment</th>
                                                <th className="p-3">Observable</th>
                                                <th className="p-3">Deterministic</th>
                                                <th className="p-3">Episodic</th>
                                                <th className="p-3">Dynamic</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {[
                                                { name: 'Chess', obs: 'Fully', det: 'Deterministic', epi: 'Sequential', dyn: 'Static' },
                                                { name: 'Poker', obs: 'Partial', det: 'Stochastic', epi: 'Sequential', dyn: 'Static' },
                                                { name: 'Taxi Driving', obs: 'Partial', det: 'Stochastic', epi: 'Sequential', dyn: 'Dynamic' },
                                                { name: 'Image Analysis', obs: 'Fully', det: 'Deterministic', epi: 'Episodic', dyn: 'Semi' },
                                            ].map(row => (
                                                <tr key={row.name}>
                                                    <td className="p-3 font-bold">{row.name}</td>
                                                    <td className="p-3">{row.obs}</td>
                                                    <td className="p-3">{row.det}</td>
                                                    <td className="p-3">{row.epi}</td>
                                                    <td className="p-3">{row.dyn}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── QUESTIONS ── */}
                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Exam Prep" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-3">
                                {[
                                    { q: 'What is a Partially Observable environment?', a: 'An environment where the agent\'s sensors cannot perceive the complete state of the world at any given time (e.g., Poker, where opponent cards are hidden).' },
                                    { q: 'Differentiate between Episodic and Sequential environments.', a: 'In Episodic environments, the agent\'s experience is divided into independent "episodes" (e.g., image classification). In Sequential environments, current actions affect future decisions (e.g., Chess).' },
                                    { q: 'Define a Dynamic environment.', a: 'An environment is dynamic if it can change while the agent is deliberating (e.g., taxi driving). If it doesn\'t change but the agent\'s performance score does, it\'s semi-dynamic.' },
                                    { q: 'What is a Multi-agent environment?', a: 'An environment where multiple agents operate and interact, either competitively (Chess) or cooperatively (robot soccer).' },
                                ].map((item, i) => (
                                    <details key={i} className="group card">
                                        <summary className="p-4 cursor-pointer font-medium text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center">
                                            <span>Q{i + 1}: {item.q}</span>
                                            <Activity size={14} className="text-amber-500 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── LAB ── */}
                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Interaction Simulator" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Sim" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-4">
                                <div className="card p-6 flex flex-col items-center justify-center min-h-[300px] bg-slate-50 dark:bg-slate-900">
                                    <div className="flex gap-10 items-center">
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center border-2 border-amber-500 text-3xl">🤖</div>
                                            <div className="text-[10px] font-bold mt-2 uppercase">Agent</div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <div className="w-20 h-0.5 bg-slate-300 dark:bg-slate-700" />
                                                <span>Action (Actuators)</span>
                                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                <span>Percept (Sensors)</span>
                                                <div className="w-20 h-0.5 bg-slate-300 dark:bg-slate-700" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center border-2 border-blue-500 text-3xl">🌎</div>
                                            <div className="text-[10px] font-bold mt-2 uppercase">Environment</div>
                                        </div>
                                    </div>
                                    <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                                        <button className="btn-secondary text-xs">Trigger Sensor</button>
                                        <button className="btn-primary text-xs">Take Action</button>
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
                                    { title: 'The Hardest Case', desc: 'Partially observable, stochastic, sequential, dynamic, continuous, and multi-agent environments are the most challenging.' },
                                    { title: 'Information Gap', desc: 'Partial observability forces agents to maintain internal "belief states" about the world.' },
                                    { title: 'Time Matters', desc: 'In dynamic environments, the agent must be able to act quickly or risk the state changing during calculation.' },
                                    { title: 'Predictability', desc: 'Deterministic worlds are easier to plan in, but most real-world problems are stochastic.' },
                                ].map(item => (
                                    <div key={item.title} className="card p-4">
                                        <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                                            <Repeat size={16} className="text-amber-500" />
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