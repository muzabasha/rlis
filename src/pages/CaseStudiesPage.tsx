import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, Building2, Target, Lightbulb, ShieldAlert,
    Wrench, Clock, DollarSign, Globe, Award, ChevronRight, X, Layers
} from 'lucide-react';
import { caseStudies, CaseStudy } from '../data/caseStudies';

const unitColors: Record<number, { bg: string, text: string, border: string, iconBg: string }> = {
    1: { bg: 'bg-blue-50 dark:bg-blue-900/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800', iconBg: 'bg-blue-100 dark:bg-blue-900/30' },
    2: { bg: 'bg-violet-50 dark:bg-violet-900/10', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-800', iconBg: 'bg-violet-100 dark:bg-violet-900/30' },
    3: { bg: 'bg-emerald-50 dark:bg-emerald-900/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    4: { bg: 'bg-amber-50 dark:bg-amber-900/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', iconBg: 'bg-amber-100 dark:bg-amber-900/30' },
};

export default function CaseStudiesPage() {
    const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
    const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

    const units = [1, 2, 3, 4];
    const filteredStudies = selectedUnit
        ? caseStudies.filter(c => c.unit === selectedUnit)
        : caseStudies;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 space-y-12">
            {/* Header */}
            <div className="space-y-4 text-center max-w-3xl mx-auto">
                <div className="inline-flex p-4 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 mb-4">
                    <Briefcase size={36} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Real-World Case Studies</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Deep dive into 16 comprehensive industry applications of Reinforcement Learning and Intelligent Systems.
                </p>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={() => setSelectedUnit(null)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border shadow-sm ${
                        selectedUnit === null
                            ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-lg'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                    All Units
                </button>
                {units.map(unit => (
                    <button
                        key={unit}
                        onClick={() => setSelectedUnit(unit)}
                        className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border shadow-sm flex items-center gap-2 ${
                            selectedUnit === unit
                                ? `${unitColors[unit].bg} ${unitColors[unit].text} ${unitColors[unit].border} shadow-lg`
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        Unit {unit}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredStudies.map((study, idx) => {
                    const theme = unitColors[study.unit];
                    return (
                        <motion.div
                            key={study.id}
                            layoutId={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`group bg-white dark:bg-slate-800 p-6 rounded-[2rem] border ${theme.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full`}
                            onClick={() => setActiveStudy(study)}
                        >
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.text}`}>
                                        <Layers size={20} />
                                    </div>
                                    <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${theme.bg} ${theme.text}`}>
                                        Unit {study.unit}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{study.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{study.problemStatement}</p>
                            </div>
                            <div className="pt-6 mt-auto">
                                <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-colors ${theme.text} group-hover:opacity-80`}>
                                    Read Case Study <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {activeStudy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveStudy(null)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
                    >
                        <motion.div
                            layoutId={activeStudy.id}
                            onClick={e => e.stopPropagation()}
                            className="bg-white dark:bg-slate-800 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-y-auto relative flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-700 p-6 flex items-start justify-between z-10">
                                <div>
                                    <div className={`text-xs font-black uppercase tracking-[0.2em] mb-2 ${unitColors[activeStudy.unit].text}`}>
                                        Unit {activeStudy.unit} Case Study
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{activeStudy.title}</h2>
                                </div>
                                <button
                                    onClick={() => setActiveStudy(null)}
                                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 md:p-10 grid md:grid-cols-2 gap-12">
                                {/* Left Column */}
                                <div className="space-y-8">
                                    <section>
                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                                            <Target size={18} className="text-indigo-500" /> Problem Statement
                                        </h4>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{activeStudy.problemStatement}</p>
                                    </section>

                                    <section>
                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                                            <Lightbulb size={18} className="text-amber-500" /> Motivation
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{activeStudy.motivation}</p>
                                    </section>

                                    <section className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                                            <Wrench size={18} className="text-emerald-500" /> Technical Details & Methodology
                                        </h4>
                                        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                            <div>
                                                <strong className="text-slate-800 dark:text-slate-200 block mb-1">State & Action Space:</strong>
                                                {activeStudy.technicalDetails}
                                            </div>
                                            <div>
                                                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Algorithm / Method:</strong>
                                                {activeStudy.methodology}
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                                            <ShieldAlert size={18} className="text-red-500" /> Key Challenges
                                        </h4>
                                        <ul className="space-y-2">
                                            {activeStudy.challenges.map((c, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                    <span className="text-red-400 mt-0.5">•</span> {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-8">
                                    <section className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                                            <DollarSign size={20} className="text-emerald-500 mb-2" />
                                            <div className="text-xs font-bold text-emerald-600/70 uppercase tracking-wider mb-1">Budget</div>
                                            <div className="font-bold text-emerald-800 dark:text-emerald-400">{activeStudy.budget}</div>
                                        </div>
                                        <div className="p-5 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                                            <Clock size={20} className="text-blue-500 mb-2" />
                                            <div className="text-xs font-bold text-blue-600/70 uppercase tracking-wider mb-1">Timeline</div>
                                            <div className="font-bold text-blue-800 dark:text-blue-400">{activeStudy.timeline}</div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                                            <Award size={18} className="text-violet-500" /> Outcomes
                                        </h4>
                                        <div className="p-5 rounded-2xl bg-violet-50 dark:bg-violet-900/20 text-violet-800 dark:text-violet-300 font-medium leading-relaxed">
                                            {activeStudy.outcomes}
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                                            <Target size={18} className="text-pink-500" /> Objectives
                                        </h4>
                                        <ul className="space-y-2">
                                            {activeStudy.objectives.map((o, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-[10px] mt-0.5">{i+1}</span>
                                                    {o}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section>
                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                                            <Globe size={18} className="text-cyan-500" /> Global Impact & Application
                                        </h4>
                                        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                            <p><strong className="text-slate-800 dark:text-slate-200">Applications:</strong> {activeStudy.application}</p>
                                            <p><strong className="text-slate-800 dark:text-slate-200">Social Impact:</strong> {activeStudy.socialImpact}</p>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                                            <Building2 size={18} className="text-slate-500" /> Industry Partners
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {activeStudy.industryPartners.map((p, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-600">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
