import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, ClipboardList } from 'lucide-react';

export default function Topic5_PEASFramework() {
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
                        <SectionWrapper id="math" title="Section 2 — Rationality Analysis" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 text-red-700" accentColor="border-red-500">
                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 text-sm">We define rationality mathematically as the maximization of the expected value of the performance measure $P$.</p>
                                <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200">
                                    <div className="text-center font-mono text-xl text-primary-600 mb-2">
                                        max E[P(Environment, Sensors, Actuators)]
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-center italic">The agent aims for the best "average" case success given its perceptions.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — PEAS Builder" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Design PEAS for: Medical Diagnosis System</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-red-500 uppercase">Performance</div>
                                        <div className="text-xs">Healthy patient, low cost.</div>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-green-500 uppercase">Environment</div>
                                        <div className="text-xs">Patient, hospital staff.</div>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-blue-500 uppercase">Actuators</div>
                                        <div className="text-xs">Display diagnosis, treatment.</div>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-amber-500 uppercase">Sensors</div>
                                        <div className="text-xs">Symptoms, lab results.</div>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 4 — Framework Check" icon={<HelpCircle size={20} className="text-violet-600" />} badge="Questions" badgeColor="bg-violet-100 text-violet-700" accentColor="border-violet-500">
                            <div className="space-y-4">
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Why is PEAS the first step in AI design?</div>
                                    <p className="text-xs text-slate-500 italic">Because the agent's internal logic depends entirely on what it can see (Sensors) and what it can do (Actuators).</p>
                                </div>
                                <div className="card p-4">
                                    <div className="text-sm font-bold mb-1">Difference between Sensor and Percept?</div>
                                    <p className="text-xs text-slate-500 italic">A sensor is the hardware; a percept is the actual data received at any given instant.</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 5 — Agent Design Lab" icon={<FlaskConical size={20} className="text-purple-600" />} badge="Lab" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                            <div className="card p-8 text-center bg-slate-50 dark:bg-slate-900">
                                <ClipboardList size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                                <h4 className="font-bold text-slate-600 mb-2">PEAS Visualizer</h4>
                                <p className="text-sm text-slate-500">Select an agent type (e.g., Vacuum, Mars Rover) and see its PEAS components mapped out in a 3D environment.</p>
                                <button className="btn-primary mt-4 py-2 px-6">Launch Visualizer</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 6 — Strategic Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 text-amber-700" accentColor="border-amber-500">
                            <div className="card p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500">
                                <h4 className="font-bold text-sm mb-1">Task Environment Definition</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Specifying the task environment is the most important part of AI engineering. A poorly defined environment leads to agents that optimize for the wrong things (e.g., a cleaning robot that creates a mess just to clean it again).</p>
                            </div>
                        </SectionWrapper>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
