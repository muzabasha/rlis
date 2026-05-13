import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, GitBranch, Zap, Cpu, ChevronDown, ChevronRight,
    CheckCircle2, Circle, Clock, Lock, BookOpen, BarChart3,
    Map, FlaskConical, HelpCircle, Lightbulb, Home
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { units } from '../../data/courseData';

const unitIcons: Record<string, React.ReactNode> = {
    unit1: <Brain size={16} />,
    unit2: <GitBranch size={16} />,
    unit3: <Zap size={16} />,
    unit4: <Cpu size={16} />,
};

const unitColors: Record<string, string> = {
    unit1: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
    unit2: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30',
    unit3: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
    unit4: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
};

const difficultyColor = {
    beginner: 'bg-emerald-400',
    intermediate: 'bg-amber-400',
    advanced: 'bg-red-400',
};

export default function Sidebar() {
    const { sidebarOpen, currentTopic, setCurrentTopic, setCurrentUnit, getProgress } = useApp();
    const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({ unit1: true });
    const navigate = useNavigate();

    const toggleUnit = (unitId: string) => {
        setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
    };

    const handleTopicClick = (unitId: string, topicId: string) => {
        setCurrentUnit(unitId);
        setCurrentTopic(topicId);
        navigate(`/topic/${topicId}`);
    };

    if (!sidebarOpen) return null;

    return (
        <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 top-16 bottom-0 w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto scrollbar-thin z-40 flex flex-col"
        >
            {/* Quick Nav */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-3 gap-1">
                    {[
                        { to: '/', icon: <Home size={14} />, label: 'Home' },
                        { to: '/analytics', icon: <BarChart3 size={14} />, label: 'Analytics' },
                        { to: '/dependency-graph', icon: <Map size={14} />, label: 'Graph' },
                    ].map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                        >
                            {item.icon}
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Units & Topics */}
            <div className="flex-1 p-3 space-y-1">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-3">
                    Course Modules
                </p>

                {units.map(unit => {
                    const completedInUnit = unit.topics.filter(t => getProgress(t.id)?.completed).length;
                    const isExpanded = expandedUnits[unit.id];

                    return (
                        <div key={unit.id}>
                            {/* Unit Header */}
                            <button
                                onClick={() => toggleUnit(unit.id)}
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                            >
                                <span className={`p-1.5 rounded-lg ${unitColors[unit.id]}`}>
                                    {unitIcons[unit.id]}
                                </span>
                                <div className="flex-1 text-left min-w-0">
                                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                                        Unit {unit.order}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {completedInUnit}/{unit.topics.length} topics
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-8 h-1 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary-500 rounded-full"
                                            style={{ width: `${(completedInUnit / unit.topics.length) * 100}%` }}
                                        />
                                    </div>
                                    {isExpanded ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                                </div>
                            </button>

                            {/* Topics */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden ml-3 pl-3 border-l-2 border-slate-200 dark:border-slate-700 mt-1 space-y-0.5"
                                    >
                                        {unit.topics.map((topic, idx) => {
                                            const progress = getProgress(topic.id);
                                            const isActive = currentTopic === topic.id;
                                            const isLocked = false; // All topics unlocked

                                            return (
                                                <button
                                                    key={topic.id}
                                                    onClick={() => handleTopicClick(unit.id, topic.id)}
                                                    className={`w-full flex items-start gap-2 px-3 py-2 rounded-lg text-left transition-all duration-150 ${isActive
                                                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                                            : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                                        }`}
                                                >
                                                    <div className="mt-0.5 flex-shrink-0">
                                                        {progress?.completed ? (
                                                            <CheckCircle2 size={14} className="text-emerald-500" />
                                                        ) : isActive ? (
                                                            <div className="w-3.5 h-3.5 rounded-full border-2 border-primary-500 bg-primary-100 dark:bg-primary-900" />
                                                        ) : (
                                                            <Circle size={14} className="text-slate-300 dark:text-slate-600" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className={`text-xs font-medium leading-snug ${isActive ? 'text-primary-700 dark:text-primary-300' : ''}`}>
                                                            {topic.title}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 mt-0.5">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${difficultyColor[topic.difficulty]}`} />
                                                            <span className="text-xs text-slate-400">{topic.duration}</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Links */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-700 space-y-1">
                {[
                    { to: '/question-bank', icon: <HelpCircle size={14} />, label: 'Question Bank' },
                    { to: '/virtual-lab', icon: <FlaskConical size={14} />, label: 'Virtual Lab' },
                    { to: '/insights', icon: <Lightbulb size={14} />, label: 'Insights' },
                ].map(item => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </motion.aside>
    );
}
