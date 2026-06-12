import { motion } from 'framer-motion';
import { Lightbulb, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { allTopics, units } from '../data/courseData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function InsightsPage() {
    const { getProgress, totalProgress } = useApp();

    const completedTopics = allTopics.filter(t => getProgress(t.id)?.completed).length;

    // Derive cognitive data from actual topic completion
    const cognitiveData = [
        { name: 'Remember', value: Math.min(100, completedTopics * 8) },
        { name: 'Understand', value: Math.min(90, completedTopics * 7) },
        { name: 'Apply', value: Math.min(75, completedTopics * 5) },
        { name: 'Analyze', value: Math.min(60, completedTopics * 4) },
        { name: 'Evaluate', value: Math.min(45, completedTopics * 3) },
        { name: 'Create', value: Math.min(30, completedTopics * 2) },
    ];

    const unitProgress = units.map(unit => {
        const completed = unit.topics.filter(t => getProgress(t.id)?.completed).length;
        return {
            name: `Unit ${unit.order}`,
            completed,
            total: unit.topics.length,
            percent: Math.round((completed / unit.topics.length) * 100),
        };
    });

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <div className="inline-flex p-4 rounded-3xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 mb-2">
                    <Lightbulb size={40} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Learning Insights</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Track your progress across all units and Bloom's cognitive levels.
                </p>
            </div>

            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-1 p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center justify-center"
                >
                    <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center z-10 relative border-4 border-white dark:border-slate-800">
                        <Brain size={48} className="text-indigo-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-4 mb-2">{totalProgress}%</h2>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{completedTopics} of {allTopics.length} Topics Completed</p>
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
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Bloom's Taxonomy Attainment</p>
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

            {/* Unit Progress */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {unitProgress.map((unit, idx) => (
                    <motion.div
                        key={unit.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{unit.name}</h4>
                            <span className="text-xs font-bold text-slate-500">{unit.completed}/{unit.total}</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${unit.percent}%` }}
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{unit.percent}% complete</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
