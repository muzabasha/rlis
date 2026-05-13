import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Trophy } from 'lucide-react';

export default function Topic12_OptimalPolicyMDP() {
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
                        <SectionWrapper id="story" title="Section 1 — The Holy Grail of RL" icon={<Trophy size={20} className="text-amber-600" />} badge="Optimal Policy" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">Solving an MDP means finding the **Optimal Policy** $\pi^*$—the strategy that maximizes the total expected reward for every state in the environment.</p>
                                <InfoCard type="success" title="Existence Proof">
                                    For any finite MDP, there exists at least one deterministic optimal policy that is better than or equal to all other policies.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Bellman Optimality" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <MathBlock formula="v_*(s) = \max_\pi v_\pi(s)" label="Optimal Value Function" explanation="The maximum value function over all possible policies." />
                                <MathBlock formula="\pi_*(s) = \arg\max_a q_*(s, a)" label="Optimal Policy" explanation="The optimal policy is to always choose the action that maximizes the optimal action-value function." />
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
