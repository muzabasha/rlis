import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Code, Binary, Zap, Cpu, Search, FlaskConical, Briefcase, ChevronRight, X } from 'lucide-react';
import { sampleProjects, Project } from '../data/sampleProjects';

const domainIcons: Record<string, any> = {
    'Games & Strategy': <Zap size={18} />,
    'Finance & Trading': <Briefcase size={18} />,
    'Robotics & Autonomous Systems': <Cpu size={18} />,
    'Healthcare & Life Sciences': <FlaskConical size={18} />,
    'Smart Infrastructure & Energy': <Binary size={18} />,
    'Human-AI & NLP': <Search size={18} />,
};

export default function SampleProjectsPage() {
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    const domains = Array.from(new Set(sampleProjects.map(p => p.domain)));
    const filteredProjects = selectedDomain 
        ? sampleProjects.filter(p => p.domain === selectedDomain)
        : sampleProjects;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
                        <Rocket size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">RLIS Sample Projects</h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            60 high-impact project ideas with detailed instructions and skeleton implementations.
                        </p>
                    </div>
                </div>
            </div>

            {/* Domain Filter */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedDomain(null)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                        selectedDomain === null 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                            : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    All Domains
                </button>
                {domains.map(domain => (
                    <button
                        key={domain}
                        onClick={() => setSelectedDomain(domain)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border flex items-center gap-2 ${
                            selectedDomain === domain 
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        {domainIcons[domain]}
                        {domain}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        layoutId={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                        onClick={() => setActiveProject(project)}
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:text-indigo-600 transition-colors">
                                    {domainIcons[project.domain]}
                                </div>
                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{project.domain}</div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">{project.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2">{project.instruction}</p>
                            <div className="pt-4 flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                                View Details <ChevronRight size={14} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {activeProject && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveProject(null)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        >
                            <motion.div 
                                layoutId={activeProject.id}
                                onClick={e => e.stopPropagation()}
                                className="bg-white dark:bg-slate-800 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-y-auto relative"
                            >
                                <button 
                                    onClick={() => setActiveProject(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="p-10 space-y-8">
                                    <div className="space-y-2">
                                        <div className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">{activeProject.domain}</div>
                                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{activeProject.title}</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400">Problem Statement</h4>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{activeProject.instruction}</p>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400">Experimental Setup</h4>
                                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-600">
                                                    {activeProject.setup}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400">Methodology</h4>
                                                <ul className="space-y-3">
                                                    {activeProject.methodology.map((step, i) => (
                                                        <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">{i + 1}</div>
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                                    <Code size={16} /> Skeleton Python Code
                                                </h4>
                                                <div className="relative group">
                                                    <pre className="p-6 bg-slate-900 rounded-[2rem] text-xs font-mono text-indigo-300 overflow-x-auto border border-white/5">
                                                        {activeProject.skeleton}
                                                    </pre>
                                                </div>
                                            </div>

                                            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/30">
                                                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-2">Expected Outcome</h4>
                                                <p className="text-xs text-emerald-600 dark:text-emerald-500 leading-relaxed">{activeProject.outcome}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
