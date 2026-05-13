import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Brain, GitBranch, Zap, Cpu, ArrowRight, BookOpen,
    Target, Users, FlaskConical, BarChart3, Award, Clock,
    CheckCircle2, Star, Lightbulb, Code2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { units, courseOutcomes } from '../data/courseData';

const unitConfig = [
    { id: 'unit1', icon: Brain, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300', firstTopic: 'u1t1' },
    { id: 'unit2', icon: GitBranch, color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-200 dark:border-violet-800', text: 'text-violet-700 dark:text-violet-300', firstTopic: 'u2t1' },
    { id: 'unit3', icon: Zap, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300', firstTopic: 'u3t1' },
    { id: 'unit4', icon: Cpu, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300', firstTopic: 'u4t1' },
];

const features = [
    { icon: BookOpen, title: 'Story-Based Learning', desc: 'Every concept introduced through engaging real-world analogies', color: 'text-blue-500' },
    { icon: FlaskConical, title: 'Virtual Labs', desc: 'Interactive simulations with real-time parameter tuning', color: 'text-emerald-500' },
    { icon: Code2, title: 'Activity-Based', desc: '4-level activities from teacher demo to independent work', color: 'text-violet-500' },
    { icon: Target, title: 'Project-Based', desc: 'Industry-grade projects with Gantt charts and risk analysis', color: 'text-amber-500' },
    { icon: BarChart3, title: 'Math Modelling', desc: 'Interactive equations with sliders and dynamic graphs', color: 'text-red-500' },
    { icon: Award, title: 'NEP 2020 Aligned', desc: 'Competency-based, outcome-driven learning framework', color: 'text-cyan-500' },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function HomePage() {
    const navigate = useNavigate();
    const { totalProgress, getProgress } = useApp();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <Star size={14} className="fill-current" />
                    NEP 2020 Aligned · Interactive · Classroom Optimized
                </div>

                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                    Reinforcement Learning &<br />
                    <span className="bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">
                        Intelligent Systems
                    </span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                    A complete interactive learning platform for engineering students — from fundamentals to advanced RL algorithms, with virtual labs, storytelling, and project-based learning.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => navigate('/topic/u1t1')}
                        className="btn-primary flex items-center gap-2"
                    >
                        Start Learning <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => navigate('/analytics')}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <BarChart3 size={18} /> View Progress
                    </button>
                </div>

                {/* Overall progress */}
                {totalProgress > 0 && (
                    <div className="mt-6 inline-flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-3 shadow-card">
                        <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full transition-all duration-700"
                                style={{ width: `${totalProgress}%` }}
                            />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{totalProgress}% Complete</span>
                    </div>
                )}
            </motion.div>

            {/* Stats */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
            >
                {[
                    { label: 'Units', value: '4', icon: BookOpen, color: 'text-blue-500' },
                    { label: 'Topics', value: '24', icon: Target, color: 'text-violet-500' },
                    { label: 'Virtual Labs', value: '24', icon: FlaskConical, color: 'text-emerald-500' },
                    { label: 'Activities', value: '96', icon: Users, color: 'text-amber-500' },
                ].map(stat => (
                    <motion.div key={stat.label} variants={item} className="card p-5 text-center">
                        <stat.icon size={24} className={`${stat.color} mx-auto mb-2`} />
                        <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Course Outcomes */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
            >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Target size={24} className="text-primary-600" />
                    Course Outcomes
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courseOutcomes.map((co, idx) => (
                        <motion.div
                            key={co.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="card p-5 flex gap-4"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {co.code}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{co.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Units */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
            >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <BookOpen size={24} className="text-primary-600" />
                    Course Modules
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                    {units.map((unit, idx) => {
                        const config = unitConfig[idx];
                        const Icon = config.icon;
                        const completedTopics = unit.topics.filter(t => getProgress(t.id)?.completed).length;
                        const progress = Math.round((completedTopics / unit.topics.length) * 100);

                        return (
                            <motion.div
                                key={unit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className={`card card-hover p-6 border ${config.border} cursor-pointer`}
                                onClick={() => navigate(`/topic/${config.firstTopic}`)}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                                        <Icon size={22} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Unit {unit.order}</div>
                                        <h3 className={`text-lg font-bold ${config.text}`}>{unit.title}</h3>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {unit.topics.slice(0, 3).map(topic => (
                                        <div key={topic.id} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            {getProgress(topic.id)?.completed
                                                ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                                                : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" />
                                            }
                                            <span className="truncate">{topic.title}</span>
                                        </div>
                                    ))}
                                    {unit.topics.length > 3 && (
                                        <div className="text-xs text-slate-400 pl-5">+{unit.topics.length - 3} more topics</div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex-1 mr-4">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-400">
                                        <span>{completedTopics}/{unit.topics.length}</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* Features */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Lightbulb size={24} className="text-primary-600" />
                    Platform Features
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((f, idx) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * idx }}
                            className="card p-5 flex gap-4"
                        >
                            <f.icon size={24} className={`${f.color} flex-shrink-0 mt-0.5`} />
                            <div>
                                <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{f.title}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-primary-600 to-violet-700 rounded-3xl p-8 text-center text-white"
            >
                <h2 className="text-3xl font-black mb-3">Ready to Master RL?</h2>
                <p className="text-primary-100 mb-6 text-lg">Start with Unit 1 — no prerequisites needed. Learn through stories, experiments, and projects.</p>
                <button
                    onClick={() => navigate('/topic/u1t1')}
                    className="bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
                >
                    Begin Unit 1 →
                </button>
            </motion.div>
        </div>
    );
}
