import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, CheckCircle2, Lock, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { units, allTopics, getTopicById } from '../data/courseData';

const unitColors: Record<string, string> = {
    unit1: '#3b82f6',
    unit2: '#8b5cf6',
    unit3: '#10b981',
    unit4: '#f59e0b',
};

export default function DependencyGraphPage() {
    const navigate = useNavigate();
    const { getProgress } = useApp();
    const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                    <Map size={32} className="text-primary-600" /> Topic Dependency Graph
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Visual map of topic dependencies and learning path. Complete topics in order for best results.
                </p>

                {/* Legend */}
                <div className="flex gap-4 flex-wrap mb-6">
                    {[
                        { icon: <CheckCircle2 size={14} className="text-emerald-500" />, label: 'Completed' },
                        { icon: <Circle size={14} className="text-primary-500" />, label: 'Available' },
                        { icon: <Lock size={14} className="text-slate-400" />, label: 'Locked' },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            {item.icon} {item.label}
                        </div>
                    ))}
                </div>

                {/* Graph */}
                <div className="space-y-8">
                    {units.map((unit, unitIdx) => (
                        <div key={unit.id} className="card p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: unitColors[unit.id] }} />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Unit {unit.order}: {unit.title}
                                </h3>
                            </div>

                            <div className="flex items-start gap-0 overflow-x-auto pb-2">
                                {unit.topics.map((topic, topicIdx) => {
                                    const done = getProgress(topic.id)?.completed;
                                    const prevDone = topicIdx === 0 || getProgress(unit.topics[topicIdx - 1].id)?.completed;
                                    const isLocked = topicIdx > 1 && !prevDone;
                                    const isHovered = hoveredTopic === topic.id;

                                    return (
                                        <div key={topic.id} className="flex items-center">
                                            {/* Topic Node */}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                onHoverStart={() => setHoveredTopic(topic.id)}
                                                onHoverEnd={() => setHoveredTopic(null)}
                                                onClick={() => !isLocked && navigate(`/topic/${topic.id}`)}
                                                className={`relative flex flex-col items-center cursor-pointer ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                style={{ minWidth: '120px' }}
                                            >
                                                {/* Node Circle */}
                                                <div
                                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md transition-all ${done ? 'bg-emerald-500' : isLocked ? 'bg-slate-400 dark:bg-slate-600' : 'bg-gradient-to-br'
                                                        }`}
                                                    style={!done && !isLocked ? { background: `linear-gradient(135deg, ${unitColors[unit.id]}, ${unitColors[unit.id]}cc)` } : {}}
                                                >
                                                    {done ? <CheckCircle2 size={24} /> : isLocked ? <Lock size={20} /> : topicIdx + 1}
                                                </div>

                                                {/* Topic Label */}
                                                <div className={`mt-2 text-center text-xs font-medium max-w-[100px] leading-tight ${done ? 'text-emerald-600 dark:text-emerald-400' :
                                                        isLocked ? 'text-slate-400' :
                                                            'text-slate-700 dark:text-slate-300'
                                                    }`}>
                                                    {topic.title.length > 30 ? topic.title.substring(0, 30) + '...' : topic.title}
                                                </div>

                                                {/* Difficulty dot */}
                                                <div className={`mt-1 w-2 h-2 rounded-full ${topic.difficulty === 'beginner' ? 'bg-emerald-400' :
                                                        topic.difficulty === 'intermediate' ? 'bg-amber-400' : 'bg-red-400'
                                                    }`} />

                                                {/* Tooltip */}
                                                {isHovered && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10"
                                                    >
                                                        {topic.duration} · {topic.coMapping.join(', ')}
                                                    </motion.div>
                                                )}
                                            </motion.div>

                                            {/* Arrow connector */}
                                            {topicIdx < unit.topics.length - 1 && (
                                                <div className="flex items-center mx-1 mt-[-20px]">
                                                    <div className="w-8 h-0.5 bg-slate-300 dark:bg-slate-600" />
                                                    <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-slate-300 dark:border-l-slate-600" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cross-unit dependencies */}
                <div className="card p-6 mt-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Cross-Unit Dependencies</h3>
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        {[
                            { from: 'Unit 1 → Unit 2', desc: 'RL fundamentals (U1T4: Working of RL) required before MDP (U2T1)' },
                            { from: 'Unit 2 → Unit 3', desc: 'MDP & Value Functions (U2T5) required before Policy & Q-Learning (U3T1)' },
                            { from: 'Unit 3 → Unit 4', desc: 'Q-Learning (U3T5) required before Monte Carlo RL (U4T4)' },
                            { from: 'Unit 1 → Unit 4', desc: 'Unit 4 (Intelligent Systems) can be studied independently after Unit 1' },
                        ].map(dep => (
                            <div key={dep.from} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <span className="font-semibold text-primary-600 dark:text-primary-400 flex-shrink-0">{dep.from}</span>
                                <span>{dep.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
