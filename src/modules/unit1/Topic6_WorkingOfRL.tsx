import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, RefreshCw, Play } from 'lucide-react';

export default function Topic6_WorkingOfRL() {
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
                        <SectionWrapper id="story" title="Section 1 — The RL Interaction Loop" icon={<RefreshCw size={20} className="text-blue-600" />} badge="Mechanism" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">RL works through a continuous cycle of interaction. It's like a child learning to walk: Step (Action) → Balance (State) → Fall (Negative Reward) → Try Again (Update Strategy).</p>
                                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-8">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold">🤖</div>
                                            <div className="text-[10px] mt-1 font-bold">AGENT</div>
                                        </div>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-0.5 w-12 bg-slate-400" />
                                                <div className="text-[10px] font-mono">Action (A)</div>
                                                <Play size={10} className="text-slate-400" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Play size={10} className="text-slate-400 rotate-180" />
                                                <div className="text-[10px] font-mono">State (S), Reward (R)</div>
                                                <div className="h-0.5 w-12 bg-slate-400" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">🌍</div>
                                            <div className="text-[10px] mt-1 font-bold">ENV</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Trace the Loop" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Scenario: A drone learning to land.</p>
                                <div className="space-y-3">
                                    {[
                                        { step: '1. State', desc: 'Drone altitude is 10 meters.' },
                                        { step: '2. Action', desc: 'Reduce throttle by 5%.' },
                                        { step: '3. Next State', desc: 'Altitude becomes 8 meters.' },
                                        { step: '4. Reward', desc: '+5 for smooth descent.' }
                                    ].map(item => (
                                        <div key={item.step} className="p-3 border border-slate-100 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex gap-4">
                                            <span className="text-xs font-bold text-primary-600 w-20">{item.step}</span>
                                            <span className="text-xs text-slate-500">{item.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Conceptual Review" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: Does the agent see the environment response immediately?</div>
                                    <p className="text-xs text-slate-500 italic">A: In most RL frameworks (MDPs), the state and reward are received at time t+1 immediately after action t.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: What is the "Agent" in the loop?</div>
                                    <p className="text-xs text-slate-500 italic">A: The learner and decision-maker; the software entity implementing the RL algorithm.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Loop Sandbox" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <RefreshCw size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Cycle Time Explorer</h4>
                                <p className="text-sm text-slate-500">Slow down the interaction loop to 1 frame per second to see exactly how states and rewards are passed back and forth.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Step Through Loop</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Real World Context" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500">
                                <h4 className="font-bold text-sm mb-1">Real-time Constraints</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">In industrial robotics, the loop must often run at 100Hz to 1000Hz. Any delay in the "Next State" signal can lead to unstable behavior and hardware damage.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
