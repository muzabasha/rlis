import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Rocket, Cpu, Briefcase } from 'lucide-react';

export default function Topic11_ApplicationsOfRL() {
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    const apps = [
        { name: 'Gaming', desc: 'AlphaGo, Dota 2 bots, and human-level performance in Atari.', icon: <Rocket className="text-blue-500" /> },
        { name: 'Robotics', desc: 'Learning to walk, pick objects, and navigate obstacles.', icon: <Cpu className="text-emerald-500" /> },
        { name: 'Finance', desc: 'Algorithmic trading, portfolio optimization, and risk management.', icon: <Briefcase className="text-amber-500" /> },
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
                    
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Metrics of Success" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">In applications, we often measure the **Reward Density** to see how well the agent is learning.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        ρ = \frac{1}{T} \sum_{t=1}^{T} R_t
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">The average reward per time step over a period $T$.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Industry Match" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Match the Reward Signal to the App:</p>
                                <div className="space-y-2">
                                    {[
                                        { app: 'Recommender System', reward: 'Click-through rate (CTR)' },
                                        { app: 'Energy Grid', reward: 'Cost reduction / Grid stability' },
                                        { app: 'Inventory Management', reward: 'Minimized stockouts' }
                                    ].map(item => (
                                        <div key={item.app} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                            <span className="text-xs font-bold">{item.app}</span>
                                            <span className="text-[10px] text-primary-600 italic">{item.reward}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Field Questions" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: Why is RL good for personalization?</div>
                                    <p className="text-xs text-slate-500 italic">A: Because it can learn the unique preferences of a user by observing their reactions (rewards) to different suggestions over time.</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Q: How is RL used in Large Language Models (LLMs)?</div>
                                    <p className="text-xs text-slate-500 italic">A: Through RLHF (Reinforcement Learning from Human Feedback), where the model is fine-tuned to generate responses that humans prefer.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Portfolio Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <Briefcase size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">Trader Bot Sandbox</h4>
                                <p className="text-sm text-slate-500">Train an agent to buy and sell a mock stock. Observe how it learns to "Buy Low, Sell High" without being explicitly told to do so.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Launch Bot</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500">
                                <h4 className="font-bold text-sm mb-1">The "Safe" Application</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">While RL is powerful, its biggest barrier to real-world application is **Safety**. In a game, failing costs nothing; in a self-driving car or a medical system, the cost of "exploration" can be catastrophic.</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
