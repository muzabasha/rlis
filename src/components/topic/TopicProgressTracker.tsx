import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const SECTIONS = ['story', 'motivation', 'math', 'activity', 'project', 'questions', 'lab'];

interface TopicProgressTrackerProps {
    topicId: string;
}

export default function TopicProgressTracker({ topicId }: TopicProgressTrackerProps) {
    const { topicId: routeTopicId } = useParams<{ topicId: string }>();
    const storageKey = `rlis_progress_${routeTopicId ?? topicId}`;

    const [visited, setVisited] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem(storageKey) || '[]');
        } catch { return []; }
    });

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
                        if (SECTIONS.includes(id)) {
                            markVisited(id);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );
        SECTIONS.forEach(s => {
            const el = document.getElementById(s);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [markVisited]);

    const progress = Math.round((visited.length / SECTIONS.length) * 100);

    const radius = 20;
    const strokeWidth = 3.5;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed bottom-6 left-6 z-[9980] w-14 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center cursor-default shadow-lg shadow-black/10 dark:shadow-black/30 select-none pointer-events-auto"
            title={`${progress}% of sections visited`}
        >
            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} stroke="currentColor" className="text-slate-100 dark:text-slate-800/80" strokeWidth={strokeWidth} fill="transparent" />
                <motion.circle cx="28" cy="28" r={radius} stroke="url(#tracker-gradient)" strokeWidth={strokeWidth} fill="transparent"
                    strokeDasharray={circumference} animate={{ strokeDashoffset }} transition={{ duration: 0.6, ease: 'easeOut' }} strokeLinecap="round" />
                <defs>
                    <linearGradient id="tracker-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="text-[11px] font-black tracking-tight text-slate-800 dark:text-slate-200">{progress}%</span>
        </motion.div>
    );
}
