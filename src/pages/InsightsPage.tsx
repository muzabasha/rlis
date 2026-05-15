import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Brain, Award, Sparkles, TrendingUp, Compass, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { allTopics } from '../data/courseData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function InsightsPage() {
    const { getProgress, totalProgress } = useApp();

    const completedTopics = allTopics.filter(t => getProgress(t.id)?.completed).length;
    const isBeginner = completedTopics < 10;
    const isIntermediate = completedTopics >= 10 && completedTopics < 30;
    const isAdvanced = completedTopics >= 30;

    const levelName = isAdvanced ? 'RL Architect' : isIntermediate ? 'RL Explorer' : 'RL Novice';
    const levelColor = isAdvanced ? 'text-rose-500' : isIntermediate ? 'text-amber-500' : 'text-emerald-500';
    const levelBg = isAdvanced ? 'bg-rose-50 dark:bg-rose-900/20' : isIntermediate ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20';

    // Simulated Gamification Data aligned with NEP 2020 Cognitive Levels (Bloom's Taxonomy)
    const cognitiveData = [
        { name: 'Remember', value: 85 },
        { name: 'Understand', value: 70 },
        { name: 'Apply', value: Math.min(60, completedTopics * 4) },
        { name: 'Analyze', value: Math.min(45, completedTopics * 3) },
        { name: 'Evaluate', value: Math.min(30, completedTopics * 2) },
        { name: 'Create', value: Math.min(15, completedTopics) },
    ];

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <div className="inline-flex p-4 rounded-3xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 mb-2">
                    <Lightbulb size={40} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Pedagogical Insights</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    A gamified view of your cognitive development, aligned with <strong>NEP 2020</strong> guidelines emphasizing Higher-Order Thinking Skills (HOTS).
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Gamified Profile Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`col-span-1 p-8 rounded-[2.5rem] border border-current/10 ${levelBg} flex flex-col items-center text-center justify-center`}
                >
                    <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center z-10 relative border-4 border-white dark:border-slate-800">
                            <Sparkles size={48} className={levelColor} />
                        </div>
                        <div className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-current ${levelColor}`}></div>
                    </div>
                    <div className={`text-sm font-black uppercase tracking-widest mb-1 ${levelColor}`}>Current Title</div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{levelName}</h2>
                    <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-3 mb-2 overflow-hidden border border-white/40 dark:border-white/10">
                        <div className={`h-full ${isAdvanced ? 'bg-rose-500' : isIntermediate ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${totalProgress}%` }}></div>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{completedTopics} of {allTopics.length} Topics Mastered</p>
                </motion.div>

                {/* Bloom's Taxonomy Cognitive Graph */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="col-span-1 md:col-span-2 p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Brain className="text-indigo-500" size={28} />
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Cognitive Mapping</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">NEP 2020 Bloom's Taxonomy Attainment</p>
                        </div>
                    </div>
                    
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={cognitiveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Gamified Achievements */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "Experiential Learner", desc: "Completed 5 Virtual Labs", icon: <Compass size={24} />, progress: 40, color: "bg-blue-500" },
                    { title: "Problem Solver", desc: "Answered 10 HOT Questions", icon: <Target size={24} />, progress: 75, color: "bg-emerald-500" },
                    { title: "Consistent Scholar", desc: "7-Day Activity Streak", icon: <Flame size={24} />, progress: 100, color: "bg-orange-500" },
                ].map((badge, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4"
                    >
                        <div className={`p-4 rounded-2xl text-white ${badge.color} shadow-lg shadow-${badge.color.split('-')[1]}-500/30`}>
                            {badge.icon}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">{badge.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">{badge.desc}</p>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                <div className={`h-full ${badge.color}`} style={{ width: `${badge.progress}%` }}></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
