import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Topic10_AdvantagesOfRL() {
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
                        <SectionWrapper id="math" title="Section 2 — Cumulative Gain" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">The primary mathematical advantage is the ability to optimize the **Cumulative Return** $G_t$.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        Gₜ = Rₜ₊₁ + γRₜ₊₂ + γ²Rₜ₊₃ + ...
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">RL allows us to quantify the value of delayed gratification.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — RL vs Rules" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Which problem needs RL?</p>
                                <div className="space-y-2">
                                    {[
                                        { task: 'Sorting emails by date', type: 'Rule-Based' },
                                        { task: 'Flying a drone in high winds', type: 'Reinforcement Learning' },
                                        { task: 'Identifying cats in photos', type: 'Supervised Learning' }
                                    ].map(item => (
                                        <div key={item.task} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                            <span className="text-sm">{item.task}</span>
                                            <span className="text-[10px] font-bold text-primary-600">{item.type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Advantage Quiz" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: What is the biggest advantage of RL over Supervised Learning?</div>
                                    <p className="text-xs text-slate-500 italic">A: RL doesn't need "correct" labels for every situation; it only needs a reward signal, allowing it to discover new strategies humans might not know.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: How does RL handle uncertainty?</div>
                                    <p className="text-xs text-slate-500 italic">A: By modeling the environment stochastically and using exploration to reduce uncertainty over time.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Performance Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <TrendingUp size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Learning Curve Visualizer</h4>
                                <p className="text-sm text-slate-500">See how an RL agent starts by failing completely and gradually builds a robust strategy. Compare this to a fixed "Rule-based" agent that never improves.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Launch Visualizer</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500">
                                <h4 className="font-bold text-sm mb-1">Human-Level Performance</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">The ultimate advantage of RL is its potential to achieve <strong>superhuman</strong> performance by exploring millions of variations of a task—something a human coder could never manually script.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
