import React from 'react';
import { AlertCircle, CheckCircle2, Info, Lightbulb, AlertTriangle } from 'lucide-react';

type CardType = 'info' | 'success' | 'warning' | 'tip' | 'definition' | 'example';

interface InfoCardProps {
    type?: CardType;
    title?: string;
    children: React.ReactNode;
}

const config: Record<CardType, { icon: React.ReactNode; bg: string; border: string; title: string }> = {
    info: {
        icon: <Info size={18} className="text-blue-600 dark:text-blue-400" />,
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        title: 'Note',
    },
    success: {
        icon: <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />,
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-emerald-200 dark:border-emerald-800',
        title: 'Key Point',
    },
    warning: {
        icon: <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400" />,
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800',
        title: 'Warning',
    },
    tip: {
        icon: <Lightbulb size={18} className="text-violet-600 dark:text-violet-400" />,
        bg: 'bg-violet-50 dark:bg-violet-900/20',
        border: 'border-violet-200 dark:border-violet-800',
        title: 'Pro Tip',
    },
    definition: {
        icon: <BookIcon />,
        bg: 'bg-slate-50 dark:bg-slate-800/50',
        border: 'border-slate-200 dark:border-slate-700',
        title: 'Definition',
    },
    example: {
        icon: <AlertCircle size={18} className="text-cyan-600 dark:text-cyan-400" />,
        bg: 'bg-cyan-50 dark:bg-cyan-900/20',
        border: 'border-cyan-200 dark:border-cyan-800',
        title: 'Example',
    },
};

function BookIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 dark:text-slate-400">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}

export default function InfoCard({ type = 'info', title, children }: InfoCardProps) {
    const c = config[type];
    return (
        <div className={`${c.bg} border ${c.border} rounded-xl p-4 my-4`}>
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{c.icon}</div>
                <div className="flex-1">
                    {(title || c.title) && (
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-sm">
                            {title || c.title}
                        </div>
                    )}
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
}
