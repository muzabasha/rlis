import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { questionBank, Question } from '../data/questionBank';

export default function QuestionBankPage() {
    const [activeUnit, setActiveUnit] = useState(1);
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

    const units = [1, 2, 3, 4];
    const filteredQuestions = questionBank.filter(q => q.unit === activeUnit);

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
            {/* Header */}
            <div className="space-y-4 text-center">
                <div className="inline-flex p-3 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 mb-2">
                    <HelpCircle size={32} />
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">RLIS Question Bank</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    A comprehensive collection of Scenario-Based and Higher Order Thinking (HOT) questions designed to test your deep understanding of Reinforcement Learning concepts.
                </p>
            </div>

            {/* Unit Selector */}
            <div className="flex justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit mx-auto">
                {units.map(u => (
                    <button
                        key={u}
                        onClick={() => setActiveUnit(u)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            activeUnit === u
                                ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                        Unit {u}
                    </button>
                ))}
            </div>

            {/* Questions List */}
            <div className="grid gap-6">
                {filteredQuestions.map((q, idx) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
                    >
                        <div 
                            className="p-8 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                            onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-500">
                                        <BookOpen size={12} />
                                        Question {idx + 1} • 10 Marks
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{q.title}</h3>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                                            <strong>Scenario:</strong> {q.scenario}
                                        </p>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed mt-4">
                                        {q.question}
                                    </p>
                                </div>
                                <div className={`p-2 rounded-full ${expandedQuestion === q.id ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'}`}>
                                    {expandedQuestion === q.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedQuestion === q.id && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800"
                                >
                                    <div className="p-8 space-y-6">
                                        <div className="space-y-3">
                                            <h4 className="font-bold text-emerald-600 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                <CheckCircle2 size={16} />
                                                Detailed Solution
                                            </h4>
                                            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                                                {q.solution}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="font-bold text-amber-600 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                <Target size={16} />
                                                Marking Scheme
                                            </h4>
                                            <ul className="grid sm:grid-cols-2 gap-2">
                                                {q.markingScheme.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-xs text-slate-500 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                                        <div className="w-1 h-1 rounded-full bg-amber-400" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredQuestions.length === 0 && (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-700">
                    <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500">More questions for this unit are being analyzed by the agent...</p>
                </div>
            )}
        </div>
    );
}
