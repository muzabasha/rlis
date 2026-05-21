import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, BookOpen, Calculator, Users, Briefcase, 
    HelpCircle, FlaskConical, BarChart3, Eye, EyeOff, 
    ChevronUp, ChevronDown, Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SECTIONS = [
    { id: 'story',    label: 'Story Context',      icon: BookOpen },
    { id: 'math',     label: 'Mathematical Model', icon: Calculator },
    { id: 'activity', label: 'Interactive Activity',icon: Users },
    { id: 'project',  label: 'Hands-on Project',   icon: Briefcase },
    { id: 'questions',label: 'Taxonomy Quiz',      icon: HelpCircle },
    { id: 'lab',      label: 'Virtual Laboratory', icon: FlaskConical },
];

interface TopicProgressTrackerProps {
    topicId: string;
}

export default function TopicProgressTracker({ topicId }: TopicProgressTrackerProps) {
    const { sidebarOpen, toggleSidebar } = useApp();
    const storageKey = `rlis_progress_${topicId}`;
    
    const [visited, setVisited] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem(storageKey) || '[]');
        } catch { return []; }
    });
    const [activeSection, setActiveSection] = useState('story');
    const [isMinimized, setIsMinimized] = useState(true);
    const [focusMode, setFocusMode] = useState(false);

    // Track active section and auto-mark as visited
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

    // Keyboard navigation listener (Alt + [1-6])
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.altKey) {
                const num = parseInt(e.key);
                if (num >= 1 && num <= 6) {
                    e.preventDefault();
                    const section = SECTIONS[num - 1];
                    if (section) {
                        scrollTo(section.id);
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus Reading Mode side effect (collapses sidebars & hides headers)
    useEffect(() => {
        if (focusMode) {
            // Collapse sidebar if open
            if (sidebarOpen) {
                toggleSidebar();
            }
            document.body.classList.add('focus-reading-mode');
        } else {
            document.body.classList.remove('focus-reading-mode');
        }
        return () => {
            document.body.classList.remove('focus-reading-mode');
        };
    }, [focusMode]);

    const progress = Math.round((visited.length / SECTIONS.length) * 100);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
    };

    const resetProgress = () => {
        localStorage.removeItem(storageKey);
        setVisited([]);
    };

    // Calculate circular stroke details
    const radius = 20;
    const strokeWidth = 3.5;
    const circumference = 2 * Math.PI * radius; // ~125.66
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <>
            {/* 1. Minimized State: Beautiful Glowing Circle */}
            {isMinimized && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.08 }}
                    onClick={() => setIsMinimized(false)}
                    className="fixed bottom-6 left-6 z-[9980] w-14 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-black/10 dark:shadow-black/30 select-none group pointer-events-auto"
                >
                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 56 56">
                        <circle 
                            cx="28" 
                            cy="28" 
                            r={radius} 
                            stroke="currentColor" 
                            className="text-slate-100 dark:text-slate-800/80" 
                            strokeWidth={strokeWidth} 
                            fill="transparent"
                        />
                        <motion.circle 
                            cx="28" 
                            cy="28" 
                            r={radius} 
                            stroke="url(#tracker-gradient)" 
                            strokeWidth={strokeWidth} 
                            fill="transparent"
                            strokeDasharray={circumference}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="tracker-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    
                    <span className="text-[11px] font-black tracking-tight text-slate-800 dark:text-slate-200 group-hover:hidden">
                        {progress}%
                    </span>
                    <Compass size={18} className="hidden group-hover:block text-primary-600 dark:text-sky-400 animate-spin" style={{ animationDuration: '4s' }} />
                </motion.div>
            )}

            {/* 2. Expanded State: Premium Floating HUD */}
            <AnimatePresence>
                {!isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                        className="fixed bottom-6 left-6 z-[9980] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800/95 rounded-2xl shadow-2xl p-4 w-[310px] select-none pointer-events-auto flex flex-col gap-3"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                            <div className="flex items-center gap-2">
                                <BarChart3 size={16} className="text-primary-600 dark:text-sky-400" />
                                <span className="text-[11px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-300">Topic Navigation</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-black text-primary-600 dark:text-sky-400">{progress}%</span>
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                    title="Minimize HUD"
                                >
                                    <ChevronDown size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Focus Reading Mode & Reset Button */}
                        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950/40 p-2 rounded-xl border border-slate-150/40 dark:border-slate-850/40">
                            <button
                                onClick={() => setFocusMode(!focusMode)}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                    focusMode 
                                    ? 'bg-primary-600 text-white shadow-sm' 
                                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                                }`}
                                title="Toggle Distraction-free Reading"
                            >
                                {focusMode ? <EyeOff size={12} /> : <Eye size={12} />}
                                <span>Focus Mode</span>
                            </button>
                            {progress > 0 && (
                                <button 
                                    onClick={resetProgress} 
                                    className="text-[10px] font-bold text-slate-400 hover:text-red-400 transition-colors px-2 py-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md"
                                >
                                    Reset Progress
                                </button>
                            )}
                        </div>

                        {/* Section Quick-Jump List */}
                        <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto pr-0.5 scrollbar-thin">
                            {SECTIONS.map(({ id, label, icon: Icon }, index) => {
                                const isDone = visited.includes(id);
                                const isActive = activeSection === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => scrollTo(id)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${
                                            isActive
                                                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                                                : isDone
                                                ? 'bg-emerald-50 dark:bg-emerald-950/15 text-emerald-700 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/40'
                                                : 'bg-slate-50 dark:bg-slate-800/40 border border-slate-150/40 dark:border-slate-800/40 text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-850'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {isDone ? (
                                                <CheckCircle2 size={13} className={isActive ? 'text-white' : 'text-emerald-500'} />
                                            ) : (
                                                <Icon size={13} className={isActive ? 'text-white' : 'text-slate-400'} />
                                            )}
                                            <span className="truncate max-w-[160px]">{label}</span>
                                        </div>
                                        <span className={`text-[9px] px-1 rounded ${isActive ? 'bg-white/30 text-white' : 'bg-slate-200 dark:bg-slate-850 text-slate-400 dark:text-slate-500'}`}>
                                            Alt+{index + 1}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Keyboard shortcut tips */}
                        <div className="text-[9px] leading-relaxed text-slate-400 dark:text-slate-500 text-center pt-1 border-t border-slate-100 dark:border-slate-800/60">
                            Press <kbd className="px-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">Alt</kbd> + <kbd className="px-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">1-6</kbd> to jump between sections
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
