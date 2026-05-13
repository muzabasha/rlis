import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Coins, Gift } from 'lucide-react';

export default function Topic8_RewardAndReturns() {
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
                        <SectionWrapper id="story" title="Section 1 — Immediate vs Cumulative" icon={<Coins size={20} className="text-amber-600" />} badge="Rewards" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="story-block space-y-4">
                                <p className="text-slate-600 dark:text-slate-400">In RL, we distinguish between the **Reward** (what you get right now) and the **Return** (the sum of all rewards you will get in the future).</p>
                                <InfoCard type="tip" title="The Discount Factor">
                                    Why do we use γ (gamma)? Because a reward today is usually worth more than a reward tomorrow. It helps the math converge and reflects human/natural behavior.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — The Return Equation" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <MathBlock formula="G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots" label="Discounted Return" explanation="The total accumulated reward from time t, where future rewards are weighted by the discount factor γ." />
                                <MathBlock formula="G_t = R_{t+1} + \gamma G_{t+1}" label="Recursive Return" explanation="The return at time t is the immediate reward plus the discounted return of the next time step." />
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
