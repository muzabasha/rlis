import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, UserPlus, Presentation, Clock, Package, Target, ClipboardList, PlayCircle, CheckCircle2 } from 'lucide-react';

interface ActivityLevelProps {
    level: 1 | 2 | 3 | 4;
    title: string;
    objectives: string;
    instructions: string[];
    inputs?: string;
    outputs?: string;
    rubrics?: string[];
    outcomes: string;
    time: string;
    materials: string[];
}

const levelConfig = {
    1: { icon: <Presentation size={18} />, label: 'Level 1: Teacher Do', color: 'blue' },
    2: { icon: <UserPlus size={18} />, label: 'Level 2: Teacher + Student', color: 'violet' },
    3: { icon: <Users size={18} />, label: 'Level 3: All Students Do', color: 'emerald' },
    4: { icon: <User size={18} />, label: 'Level 4: Individual Student', color: 'amber' },
};

export function ActivityLevel({ level, title, objectives, instructions, inputs, outputs, rubrics, outcomes, time, materials }: ActivityLevelProps) {
    const config = levelConfig[level];
    const colorClass = {
        blue: 'border-blue-200 bg-blue-50/30 text-blue-700 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-300',
        violet: 'border-violet-200 bg-violet-50/30 text-violet-700 dark:border-violet-900/30 dark:bg-violet-900/10 dark:text-violet-300',
        emerald: 'border-emerald-200 bg-emerald-50/30 text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-900/10 dark:text-emerald-300',
        amber: 'border-amber-200 bg-amber-50/30 text-amber-700 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-300',
    }[config.color as 'blue' | 'violet' | 'emerald' | 'amber'];

    const iconBg = {
        blue: 'bg-blue-600',
        violet: 'bg-violet-600',
        emerald: 'bg-emerald-600',
        amber: 'bg-amber-600',
    }[config.color as 'blue' | 'violet' | 'emerald' | 'amber'];

    return (
        <div className={`p-6 rounded-3xl border-2 ${colorClass} space-y-6 relative overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${iconBg} text-white flex items-center justify-center shadow-lg`}>
                        {config.icon}
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{config.label}</h4>
                        <h3 className="text-xl font-black">{title}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                        <Clock size={14} /> {time}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                        <Package size={14} /> {materials.length} Materials
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-70">
                            <Target size={14} /> Objectives
                        </h5>
                        <p className="text-sm leading-relaxed font-medium">{objectives}</p>
                    </div>

                    <div className="space-y-2">
                        <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-70">
                            <PlayCircle size={14} /> Instructions
                        </h5>
                        <ul className="space-y-2">
                            {instructions.map((inst, i) => (
                                <li key={i} className="flex gap-3 text-sm">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/50 dark:bg-black/20 flex items-center justify-center font-bold text-[10px]">{i + 1}</span>
                                    <span className="leading-relaxed">{inst}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {inputs && (
                            <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/10 border border-white/20">
                                <h6 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Inputs</h6>
                                <p className="text-xs font-bold">{inputs}</p>
                            </div>
                        )}
                        {outputs && (
                            <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/10 border border-white/20">
                                <h6 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Expected Outputs</h6>
                                <p className="text-xs font-bold">{outputs}</p>
                            </div>
                        )}
                    </div>

                    {rubrics && (
                        <div className="space-y-2">
                            <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-70">
                                <ClipboardList size={14} /> Assessment Rubrics
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {rubrics.map((rub, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-xl bg-white/30 dark:bg-black/10 border border-white/10 text-[10px] font-bold">
                                        {rub}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5">
                        <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-70 mb-2">
                            <CheckCircle2 size={14} /> Learning Outcomes
                        </h5>
                        <p className="text-[11px] font-bold leading-relaxed">{outcomes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ActivityLevels({ levels }: { levels: ActivityLevelProps[] }) {
    return (
        <div className="space-y-8">
            {levels.map((lvl, idx) => (
                <ActivityLevel key={idx} {...lvl} />
            ))}
        </div>
    );
}
