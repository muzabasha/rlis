import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Brain, GitBranch, Zap, Cpu, ArrowRight, BookOpen,
    Target, Users, FlaskConical, BarChart3, Award, Clock,
    CheckCircle2, Star, Lightbulb, Code2, Calculator, Briefcase, HelpCircle, GraduationCap
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

export default function HomePage() {
    const navigate = useNavigate();
    const { totalProgress, getProgress } = useApp();
    const [activeUnitId, setActiveUnitId] = useState('unit1');

    const getVisitedSections = (topicId: string) => {
        try {
            const progressKey = `rlis_progress_${topicId}`;
            return JSON.parse(localStorage.getItem(progressKey) || '[]');
        } catch {
            return [];
        }
    };

    const getVisitedCount = (topicId: string) => {
        const isTopicComplete = getProgress(topicId)?.completed;
        if (isTopicComplete) return 7;
        const visited = getVisitedSections(topicId);
        const hasStory = visited.includes('story');
        const adjustedLength = visited.length + (hasStory ? 1 : 0);
        return Math.min(adjustedLength, 7);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                {/* Institution Logos */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-8">
                    {/* REVA University Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/reva-logo.png"
                            alt="REVA University"
                            className="h-16 sm:h-20 w-auto object-contain"
                        />
                    </div>

                    {/* SDG 4 Quality Education Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/SDG4.png"
                            alt="SDG 4 - Quality Education"
                            className="h-16 sm:h-20 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* Faculty Details */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <GraduationCap size={20} className="text-primary-600" />
                    <div className="text-left">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            Dr. Syed Muzamil Basha
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            Professor, School of Computer Science and Engineering
                        </div>
                    </div>
                </div>

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
                        onClick={() => window.open('https://scholar-sparkle-web.lovable.app/', '_blank')}
                        className="btn-secondary flex items-center gap-2 bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800"
                    >
                        <Users size={18} /> Teacher Portal
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

            {/* Interactive Course Explorer */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-16 animate-fade-in"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <BookOpen size={28} className="text-primary-600" />
                            NEP 2020 Course Explorer
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                            Select a unit below and click on any core learning component icon to jump directly into that specific section.
                        </p>
                    </div>
                </div>

                {/* Glassmorphic Unit Switcher */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 bg-slate-100/50 dark:bg-slate-800/40 p-2 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
                    {units.map((unit, idx) => {
                        const config = unitConfig[idx];
                        const Icon = config.icon;
                        const isActive = activeUnitId === unit.id;
                        const completedTopics = unit.topics.filter(t => getProgress(t.id)?.completed).length;
                        const progress = Math.round((completedTopics / unit.topics.length) * 100);

                        return (
                            <button
                                key={unit.id}
                                onClick={() => setActiveUnitId(unit.id)}
                                className={`relative flex flex-col items-start text-left p-4 rounded-2xl transition-all duration-300 ${
                                    isActive
                                        ? `bg-gradient-to-br ${config.color} text-white shadow-xl shadow-primary-500/10`
                                        : 'hover:bg-slate-200/50 dark:hover:bg-slate-700/40 text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2 w-full">
                                    <div className={`p-2 rounded-xl ${
                                        isActive ? 'bg-white/20 text-white' : `${config.bg} ${config.text}`
                                    }`}>
                                        <Icon size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-[10px] font-bold uppercase tracking-wider ${
                                            isActive ? 'text-white/80' : 'text-slate-400'
                                        }`}>
                                            Unit {unit.order}
                                        </div>
                                        <div className="text-xs font-black truncate">{unit.title}</div>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between text-[11px] mt-1 font-bold">
                                    <span className={isActive ? 'text-white/80' : 'text-slate-400'}>
                                        {completedTopics}/{unit.topics.length} Completed
                                    </span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full h-1 bg-slate-200/30 dark:bg-slate-700/30 rounded-full overflow-hidden mt-1.5">
                                    <div
                                        className={`h-full ${isActive ? 'bg-white' : 'bg-primary-500'}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Topics List with Interactive Component Docks */}
                <motion.div
                    key={activeUnitId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-4"
                >
                    {units.find(u => u.id === activeUnitId)?.topics.map((topic) => {
                        const topicProgress = getProgress(topic.id);
                        const visitedSections = getVisitedSections(topic.id);
                        const isCompleted = topicProgress?.completed;
                        const visitedCount = getVisitedCount(topic.id);
                        const percentProgress = Math.round((visitedCount / 7) * 100);

                        return (
                            <div
                                key={topic.id}
                                className="group relative bg-white/70 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-5 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                            >
                                {/* Left Side: Topic Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary-600 bg-primary-50 dark:bg-primary-950/40 px-2.5 py-1 rounded-md">
                                            Topic {topic.order}
                                        </span>
                                        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                                            topic.difficulty === 'beginner'
                                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                                                : topic.difficulty === 'intermediate'
                                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600'
                                                : 'bg-red-50 dark:bg-red-950/40 text-red-600'
                                        }`}>
                                            {topic.difficulty}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                            <Clock size={12} /> {topic.duration}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                            <Target size={12} /> {topic.coMapping.join(', ')}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/topic/${topic.id}`)}
                                        className="text-left text-lg font-black text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-tight mb-2 group-hover:translate-x-1 duration-200 inline-block"
                                    >
                                        {topic.title}
                                    </button>

                                    {/* Sub-progress line */}
                                    <div className="flex items-center gap-3 mt-1 max-w-xs">
                                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full transition-all duration-500"
                                                style={{ width: `${percentProgress}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {visitedCount}/7 Components
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side: 7 Interactive Component Buttons Dock */}
                                <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap sm:flex-nowrap bg-slate-50/50 dark:bg-slate-900/40 p-2 sm:p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                                    {[
                                        { id: 'story', label: 'Story', desc: 'Storytelling Analogy', icon: BookOpen, color: 'hover:bg-blue-500 hover:text-white text-blue-500 hover:shadow-blue-500/20' },
                                        { id: 'motivation', label: 'Why', desc: 'Pedagogical Focus', icon: Lightbulb, color: 'hover:bg-amber-500 hover:text-white text-amber-500 hover:shadow-amber-500/20' },
                                        { id: 'math', label: 'Math', desc: 'Formula Breakdown', icon: Calculator, color: 'hover:bg-red-500 hover:text-white text-red-500 hover:shadow-red-500/20' },
                                        { id: 'activity', label: 'Activity', desc: '4-Level Activities', icon: Users, color: 'hover:bg-emerald-500 hover:text-white text-emerald-500 hover:shadow-emerald-500/20' },
                                        { id: 'project', label: 'Project', desc: 'PBL Sample Projects', icon: Briefcase, color: 'hover:bg-violet-500 hover:text-white text-violet-500 hover:shadow-violet-500/20' },
                                        { id: 'questions', label: 'Quiz', desc: 'Assessments & Checking', icon: HelpCircle, color: 'hover:bg-purple-500 hover:text-white text-purple-500 hover:shadow-purple-500/20' },
                                        { id: 'lab', label: 'Lab', desc: 'Virtual Lab Simulator', icon: FlaskConical, color: 'hover:bg-cyan-500 hover:text-white text-cyan-500 hover:shadow-cyan-500/20' }
                                    ].map(comp => {
                                        const CompIcon = comp.icon;
                                        const isVisited = isCompleted || visitedSections.includes(comp.id) || (comp.id === 'motivation' && visitedSections.includes('story'));

                                        return (
                                            <button
                                                key={comp.id}
                                                type="button"
                                                onClick={() => navigate(`/topic/${topic.id}#${comp.id}`)}
                                                aria-label={`Open ${comp.label} for ${topic.title}`}
                                                className={`flex items-center gap-1 px-2 py-1.5 sm:w-10 sm:h-10 sm:justify-center sm:p-0 rounded-xl transition-all duration-300 ${comp.color} hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${
                                                    isVisited
                                                        ? 'bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500/60'
                                                        : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600'
                                                }`}
                                            >
                                                <CompIcon size={16} className="flex-shrink-0" />
                                                <span className="text-[10px] font-bold sm:hidden">{comp.label}</span>
                                                {isVisited && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 sm:absolute sm:-top-0.5 sm:-right-0.5" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
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
