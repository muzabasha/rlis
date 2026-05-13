import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, GitCompare, Zap } from 'lucide-react';

export default function Topic3_TraditionalVsIS() {
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
                        <SectionWrapper id="story" title="Section 1 — Rigid Code vs Flexible Intelligence" icon={<GitCompare size={20} className="text-blue-600" />} badge="Comparison" badgeColor="bg-blue-100 text-blue-700" accentColor="border-blue-500">
                            <div className="story-block space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="card p-5 border-t-4 border-slate-400">
                                        <h4 className="font-bold text-sm mb-2 text-slate-700">Traditional Systems</h4>
                                        <ul className="text-xs space-y-2 text-slate-500">
                                            <li>• Follow fixed algorithms.</li>
                                            <li>• Cannot handle unseen data.</li>
                                            <li>• Require explicit programming.</li>
                                            <li>• Deterministic and predictable.</li>
                                        </ul>
                                    </div>
                                    <div className="card p-5 border-t-4 border-primary-500">
                                        <h4 className="font-bold text-sm mb-2 text-primary-700">Intelligent Systems</h4>
                                        <ul className="text-xs space-y-2 text-slate-500">
                                            <li>• Learn from patterns and experience.</li>
                                            <li>• Generalize to new situations.</li>
                                            <li>• Heuristic-based or learned.</li>
                                            <li>• Adaptive and non-linear.</li>
                                        </ul>
                                    </div>
                                </div>
                                <InfoCard type="info" title="The Key Difference">
                                    Traditional systems are <strong>passive</strong> (they do exactly what they are told); Intelligent systems are <strong>active</strong> (they decide what to do to reach a goal).
                                </InfoCard>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
