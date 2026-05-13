import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain, Moon, Sun, Monitor, Menu, X, Search,
    BookOpen, ChevronRight, Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const { darkMode, projectorMode, sidebarOpen, toggleDarkMode, toggleProjectorMode, toggleSidebar, totalProgress } = useApp();
    const location = useLocation();

    return (
        <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200 dark:border-slate-700"
        >
            <div className="flex items-center justify-between px-4 h-16">
                {/* Left: Logo + Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-violet-600 rounded-xl flex items-center justify-center shadow-sm">
                            <Brain size={20} className="text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                                RL & Intelligent Systems
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                                Interactive Learning Platform
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Center: Breadcrumb */}
                <nav className="hidden md:flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
                    {location.pathname !== '/' && (
                        <>
                            <ChevronRight size={14} />
                            <span className="text-slate-700 dark:text-slate-300 font-medium">Course</span>
                        </>
                    )}
                </nav>

                {/* Right: Controls */}
                <div className="flex items-center gap-2">
                    {/* Progress pill */}
                    <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
                        <div className="w-16 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full transition-all duration-500"
                                style={{ width: `${totalProgress}%` }}
                            />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{totalProgress}%</span>
                    </div>

                    {/* Search */}
                    <Link
                        to="/search"
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Search"
                    >
                        <Search size={18} />
                    </Link>

                    {/* Projector mode */}
                    <button
                        onClick={toggleProjectorMode}
                        className={`p-2 rounded-lg transition-colors ${projectorMode ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                        aria-label="Toggle projector mode"
                        title="Projector Mode"
                    >
                        <Maximize2 size={18} />
                    </button>

                    {/* Dark mode */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
