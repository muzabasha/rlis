import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, PlayCircle, Filter, BookOpen, Target, Settings, Zap, Cpu, Activity, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Since some labs are embedded in topics, we can link to those topics or render them here.
// For the sake of the hub, we'll provide interactive cards that launch or link to the experiential labs.

const virtualLabs = [
    {
        id: 'lab1',
        title: 'Multi-Armed Bandit Arena',
        description: 'Explore the classic exploration vs. exploitation dilemma. Play against Bandit algorithms like Epsilon-Greedy, UCB, and Thompson Sampling in a virtual casino.',
        unit: 1,
        co: 'CO1',
        type: 'Gamified',
        icon: <Cpu size={24} />,
        color: 'blue',
        route: '/topic/u1t9'
    },
    {
        id: 'lab2',
        title: 'Markov Decision Process Explorer',
        description: 'Design and build your own stochastic Gridworld environment. Define transition matrices and observe the agent navigate the state space.',
        unit: 2,
        co: 'CO3',
        type: 'Experiential',
        icon: <Activity size={24} />,
        color: 'violet',
        route: '/topic/u2t1'
    },
    {
        id: 'lab3',
        title: 'Markov Reward Process Chain',
        description: 'Visualize transition chains, calculate rewards, and study how value functions discount future expectations over time.',
        unit: 2,
        co: 'CO3',
        type: 'Simulation',
        icon: <Settings size={24} />,
        color: 'emerald',
        route: '/topic/u2t9'
    },
    {
        id: 'lab4',
        title: 'Q-Learning Convergence Sandbox',
        description: 'Watch the Q-table update in real-time as an agent explores a state-action grid. Tweak epsilon, alpha, and gamma parameters to witness mathematical convergence.',
        unit: 3,
        co: 'CO4',
        type: 'Simulation',
        icon: <Zap size={24} />,
        color: 'amber',
        route: '/topic/u3t8'
    },
    {
        id: 'lab5',
        title: 'The Gambler\'s Dungeon Adventure',
        description: 'Step into a fully gamified stochastic playground. Learn to optimize action policies while surviving a monster-infested dungeon with real-time stats and quests.',
        unit: 3,
        co: 'CO4',
        type: 'Gamified',
        icon: <PlayCircle size={24} />,
        color: 'pink',
        route: '/topic/u3t11'
    },
    {
        id: 'lab6',
        title: 'Monte Carlo Sampling Engine',
        description: 'Witness Monte Carlo estimation in action. Generate complete episode trajectories and average their returns to approximate true state values without a transition model.',
        unit: 4,
        co: 'CO5',
        type: 'Experiential',
        icon: <Target size={24} />,
        color: 'indigo',
        route: '/topic/u4t10'
    },
    {
        id: 'lab7',
        title: 'Monte Carlo GLIE Control Loop',
        description: 'Optimize policies using Generalized Policy Iteration (GPI) and Greedy in the Limit with Infinite Exploration (GLIE) with full telemetry visualizers.',
        unit: 4,
        co: 'CO5',
        type: 'Experiential',
        icon: <Lightbulb size={24} />,
        color: 'rose',
        route: '/topic/u4t14'
    }
];


export default function VirtualLabPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<string>('All');

    const filteredLabs = filter === 'All' ? virtualLabs : virtualLabs.filter(l => l.type === filter);
    const types = ['All', 'Simulation', 'Experiential', 'Gamified'];

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 space-y-12">
            {/* Header - NEP 2020 Aligned */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md text-emerald-400 mb-2 border border-white/20 shadow-2xl">
                        <FlaskConical size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Experiential Virtual Labs</h1>
                    <p className="text-lg text-indigo-200 font-medium leading-relaxed">
                        Aligned with <strong className="text-white">NEP 2020</strong> standards for experiential and competency-based learning. 
                        Interact with parameters, visualize complex algorithms in real-time, and "Learn by Doing".
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-800/50 text-indigo-200 text-sm font-bold border border-indigo-700/50">
                            <Lightbulb size={16} className="text-amber-400" /> Active Experimentation
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-800/50 text-indigo-200 text-sm font-bold border border-indigo-700/50">
                            <Target size={16} className="text-emerald-400" /> Competency Mapped (COs)
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <Filter size={24} className="text-indigo-500" /> Available Simulations
                </h2>
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                    {types.map(t => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                filter === t 
                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Labs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredLabs.map((lab, idx) => {
                        const colorMap: Record<string, string> = {
                            emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
                            violet: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400 border-violet-200 dark:border-violet-800/50',
                            amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
                            blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800/50',
                            pink: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400 border-pink-200 dark:border-pink-800/50',
                            indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50',
                            rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 border-rose-200 dark:border-rose-800/50',
                        };

                        const themeClass = colorMap[lab.color];

                        return (
                            <motion.button
                                type="button"
                                key={lab.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                className={`w-full text-left flex flex-col p-6 rounded-[2rem] border-2 ${themeClass} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group bg-white dark:bg-slate-800`}
                                onClick={() => navigate(lab.route)}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm group-hover:scale-110 transition-transform`}>
                                        {lab.icon}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="px-3 py-1 rounded-lg bg-white/50 dark:bg-black/20 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                                            {lab.type}
                                        </span>
                                        <span className="px-3 py-1 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-black uppercase tracking-wider">
                                            {lab.co}
                                        </span>
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white leading-tight">
                                    {lab.title}
                                </h3>
                                <p className="text-sm font-medium leading-relaxed opacity-80 flex-1">
                                    {lab.description}
                                </p>
                                
                                <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                        <BookOpen size={14} /> Unit {lab.unit}
                                    </span>
                                    <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider group-hover:opacity-70 transition-opacity">
                                        Launch Lab <PlayCircle size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
