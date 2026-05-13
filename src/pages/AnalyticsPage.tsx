import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, Clock, Target, TrendingUp, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { units, allTopics } from '../data/courseData';
import {
    RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';

const unitColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
    const { getProgress, totalProgress } = useApp();

    const unitProgress = units.map((unit, idx) => {
        const completed = unit.topics.filter(t => getProgress(t.id)?.completed).length;
        return {
            name: `Unit ${unit.order}`,
            completed,
            total: unit.topics.length,
            percent: Math.round((completed / unit.topics.length) * 100),
            color: unitColors[idx],
        };
    });

    const coData = [
        { co: 'CO1', score: getProgress('u1t1')?.completed ? 80 : 20 },
        { co: 'CO2', score: 15 },
        { co: 'CO3', score: 10 },
        { co: 'CO4', score: 10 },
        { co: 'CO5', score: 10 },
        { co: 'CO6', score: 10 },
    ];

    const completedTopics = allTopics.filter(t => getProgress(t.id)?.completed);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                    <BarChart3 size={32} className="text-primary-600" /> Learning Analytics
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Track your progress across all units and course outcomes</p>

                {/* Overall Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Overall Progress', value: `${totalProgress}%`, icon: TrendingUp, color: 'text-primary-600' },
                        { label: 'Topics Completed', value: `${completedTopics.length}/${allTopics.length}`, icon: CheckCircle2, color: 'text-emerald-600' },
                        { label: 'Units Started', value: `${unitProgress.filter(u => u.completed > 0).length}/4`, icon: Target, color: 'text-violet-600' },
                        { label: 'Study Streak', value: '1 day', icon: Award, color: 'text-amber-600' },
                    ].map(stat => (
                        <div key={stat.label} className="card p-5 text-center">
                            <stat.icon size={24} className={`${stat.color} mx-auto mb-2`} />
                            <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    {/* Unit Progress */}
                    <div className="card p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Unit-wise Progress</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={unitProgress}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(v) => [`${v}%`, 'Progress']} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
                                <Bar dataKey="percent" radius={[6, 6, 0, 0]}>
                                    {unitProgress.map((entry, idx) => (
                                        <Cell key={idx} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* CO Radar */}
                    <div className="card p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Course Outcome Attainment</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <RadarChart data={coData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="co" tick={{ fontSize: 13, fontWeight: 600 }} />
                                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Topic Checklist */}
                <div className="card p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Topic Completion Status</h3>
                    <div className="space-y-4">
                        {units.map((unit, idx) => (
                            <div key={unit.id}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: unitColors[idx] }} />
                                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Unit {unit.order}: {unit.title}</span>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-2 ml-5">
                                    {unit.topics.map(topic => {
                                        const done = getProgress(topic.id)?.completed;
                                        return (
                                            <div key={topic.id} className={`flex items-center gap-2 p-2 rounded-lg text-sm ${done ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
                                                {done
                                                    ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                                                    : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" />
                                                }
                                                <span className={`truncate ${done ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-400'}`}>
                                                    {topic.title}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
