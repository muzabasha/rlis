import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allTopics, getUnitById } from '../data/courseData';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const results = query.length > 1
        ? allTopics.filter(t =>
            t.title.toLowerCase().includes(query.toLowerCase()) ||
            t.coMapping.some(co => co.toLowerCase().includes(query.toLowerCase()))
        )
        : [];

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <Search size={32} className="text-primary-600" /> Search Topics
                </h1>

                <div className="relative mb-6">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search topics, concepts, course outcomes..."
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        autoFocus
                    />
                </div>

                {query.length > 1 && (
                    <div className="space-y-2">
                        {results.length === 0 ? (
                            <div className="card p-8 text-center text-slate-500 dark:text-slate-400">
                                No topics found for "{query}"
                            </div>
                        ) : (
                            results.map(topic => {
                                const unit = getUnitById(topic.unitId);
                                return (
                                    <motion.button
                                        key={topic.id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={() => navigate(`/topic/${topic.id}`)}
                                        className="w-full card card-hover p-4 flex items-center gap-4 text-left"
                                    >
                                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <BookOpen size={18} className="text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{topic.title}</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                                <span>Unit {unit?.order}</span>
                                                <span>·</span>
                                                <Clock size={12} />
                                                <span>{topic.duration}</span>
                                                <span>·</span>
                                                <span>{topic.coMapping.join(', ')}</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-400 flex-shrink-0" />
                                    </motion.button>
                                );
                            })
                        )}
                    </div>
                )}

                {query.length === 0 && (
                    <div className="card p-8 text-center text-slate-500 dark:text-slate-400">
                        <Search size={40} className="mx-auto mb-3 opacity-30" />
                        <p>Type to search across all {allTopics.length} topics</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
