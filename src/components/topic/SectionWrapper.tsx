import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionWrapperProps {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    accentColor?: string;
}

export default function SectionWrapper({
    id, title, subtitle, icon, badge, badgeColor = 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    children, defaultOpen = true, accentColor = 'border-primary-500'
}: SectionWrapperProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`card mb-6 overflow-hidden border-l-4 ${accentColor} relative`}
        >
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700/35 transition-colors cursor-pointer select-none"
                aria-expanded={open}
                aria-controls={`${id}-content`}
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        {icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                            {badge && (
                                <span className={`section-tag text-xs ${badgeColor}`}>{badge}</span>
                            )}
                        </div>
                        {subtitle && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
                        )}
                    </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                    {open ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                </div>
            </button>

            <AnimatePresence mode="wait">
                {open && (
                    <motion.div
                        id={`${id}-content`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 prose prose-slate dark:prose-invert max-w-none">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
