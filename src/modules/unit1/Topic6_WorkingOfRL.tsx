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

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Formalizing the Loop" icon={<Calculator size={20} className="text-red-600" />} badge="Equations" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <MathBlock formula="A_t = \pi(S_t)" label="Policy Function" explanation="The agent chooses an action based on the current state." />
                                <MathBlock formula="S_{t+1}, R_{t+1} = \text{Env}(S_t, A_t)" label="Environment Response" explanation="The world gives back a new state and reward." />
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
