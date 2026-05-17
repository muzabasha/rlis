import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, BookOpen, Calculator, Users, Briefcase, HelpCircle, FlaskConical, BarChart3 } from 'lucide-react';

const SECTIONS = [
    { id: 'story',    label: 'Story',      icon: BookOpen },
    { id: 'math',     label: 'Math',       icon: Calculator },
    { id: 'activity', label: 'Activity',   icon: Users },
    { id: 'project',  label: 'Project',    icon: Briefcase },
    { id: 'questions',label: 'Quiz',       icon: HelpCircle },
    { id: 'lab',      label: 'Virtual Lab',icon: FlaskConical },
];

interface TopicProgressTrackerProps {
    topicId: string;
}

export default function TopicProgressTracker({ topicId }: TopicProgressTrackerProps) {
    const storageKey = `rlis_progress_${topicId}`;
    const [visited, setVisited] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem(storageKey) || '[]');
        } catch { return []; }
    });
    const [activeSection, setActiveSection] = useState('story');

    const markVisited = useCallback((id: string) => {
        setVisited(prev => {
            if (prev.includes(id)) return prev;
            const next = [...prev, id];
            localStorage.setItem(storageKey, JSON.stringify(next));
            return next;
        });
    }, [storageKey]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        if (SECTIONS.some(s => s.id === id)) {
                            setActiveSection(id);
                            markVisited(id);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );
        SECTIONS.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [markVisited]);

    const progress = Math.round((visited.length / SECTIONS.length) * 100);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const resetProgress = () => {
        localStorage.removeItem(storageKey);
        setVisited([]);
    };

    return (
        <div className="sticky top-4 z-10 mb-8">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-black/5 p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <BarChart3 size={16} className="text-primary-600" />
                        <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">Topic Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-primary-600">{progress}%</span>
                        {progress === 100 && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Complete! 🎉</span>
                        )}
                        {progress > 0 && (
                            <button onClick={resetProgress} className="text-[10px] text-slate-400 hover:text-red-400 transition-colors">Reset</button>
                        )}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>

                {/* Section tabs */}
                <div className="flex gap-1 overflow-x-auto scrollbar-thin pb-1">
                    {SECTIONS.map(({ id, label, icon: Icon }) => {
                        const isDone = visited.includes(id);
                        const isActive = activeSection === id;
                        return (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                                    isActive
                                        ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                                        : isDone
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                }`}
                            >
                                {isDone
                                    ? <CheckCircle2 size={12} />
                                    : <Icon size={12} />
                                }
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
