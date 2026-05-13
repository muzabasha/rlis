import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, Layers } from 'lucide-react';

export default function Topic13_RLvsDLvsML() {
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
                        <SectionWrapper id="story" title="Section 1 — The AI Venn Diagram" icon={<Layers size={20} className="text-primary-600" />} badge="Taxonomy" badgeColor="bg-primary-100 text-primary-700" accentColor="border-primary-500">
                            <div className="story-block space-y-6">
                                <p className="text-slate-600 dark:text-slate-400">Where does RL fit in the broader field of AI? It's often misunderstood as a competitor to Machine Learning, when it is actually a subset.</p>
                                <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-700 relative overflow-hidden">
                                    <div className="w-64 h-64 rounded-full border-4 border-slate-300 dark:border-slate-600 flex items-center justify-center relative">
                                        <div className="absolute top-4 font-bold text-slate-400 uppercase tracking-widest text-xs">AI</div>
                                        <div className="w-48 h-48 rounded-full border-4 border-blue-400 flex items-center justify-center relative bg-blue-50/20">
                                            <div className="absolute top-4 font-bold text-blue-500 uppercase tracking-widest text-[10px]">Machine Learning</div>
                                            <div className="w-32 h-32 rounded-full border-4 border-emerald-400 flex items-center justify-center relative bg-emerald-50/20">
                                                <div className="absolute top-4 font-bold text-emerald-500 uppercase tracking-widest text-[8px]">Deep Learning</div>
                                                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                                                    <span className="text-white font-black text-xs">RL</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <InfoCard type="info" title="Deep RL">
                                    When we use Deep Neural Networks to represent the RL policy or value function, we get **Deep Reinforcement Learning**.
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
