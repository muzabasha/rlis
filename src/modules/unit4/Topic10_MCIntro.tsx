import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Dice5 } from 'lucide-react';

export default function Topic10_MCIntro() {
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
                    
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Return Calculation" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">MC Prediction estimates the value function $v_\pi(s)$ by averaging the returns $G_t$ observed after visits to state $s$.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        V(s) ≈ average(Gₜ)
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">Where $G_t$ is the total discounted reward from time $t$.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Episode Tracker" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Track an episode and calculate the return:</p>
                                <div className="card p-4 bg-slate-50 dark:bg-slate-900">
                                    <div className="flex justify-between items-center text-[10px] mb-2 border-b pb-1">
                                        <span>Step 1</span>
                                        <span>Reward: 0</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] mb-2 border-b pb-1">
                                        <span>Step 2</span>
                                        <span>Reward: 0</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-emerald-600">
                                        <span>Terminal</span>
                                        <span>Reward: +10</span>
                                    </div>
                                    <div className="mt-4 text-center font-bold text-xs">Total Return G = 10</div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Assessment" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Questions" badgeColor="bg-cyan-100 text-cyan-700" accentColor="border-cyan-500">
                            <div className="space-y-4">
                                <div className="card p-4 border-l-4 border-blue-500">
                                    <strong>Q1: What is the main requirement for MC methods?</strong>
                                    <p className="mt-2 text-xs">A: MC requires **complete episodes**. It cannot update mid-episode.</p>
                                </div>
                                <div className="card p-4 border-l-4 border-emerald-500">
                                    <strong>Q2: Does MC require a model of the environment?</strong>
                                    <p className="mt-2 text-xs">A: No, MC is model-free. It only needs sample experience.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Blackjack Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300">
                                <Dice5 size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Blackjack MC Simulation</h4>
                                <p className="text-sm text-slate-500">Blackjack is a classic MC problem. Observe how the value of a hand (e.g., 20 vs 12) converges as you play more games.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Play Blackjack</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 text-sm italic">"Wait for the end to judge the journey."</p>
                                <InfoCard type="info" title="High Variance, Low Bias">
                                    MC estimates are unbiased but can have high variance because they depend on many random steps within an episode.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
