import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp, Award, RotateCcw } from 'lucide-react';

export interface MCQQuestion {
    id: string;
    question: string;
    options: { id: string; text: string; }[];
    correctAnswer: string;
    justification: string;
    wrongJustifications: { [optionId: string]: string; };
}

interface FeedbackMCQProps {
    questions: MCQQuestion[];
    title?: string;
}

export default function FeedbackMCQ({ questions, title = "Knowledge Check" }: FeedbackMCQProps) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length;

    const handleSelect = (qId: string, optionId: string) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [qId]: optionId }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setShowResults(true);
    };

    const handleReset = () => {
        setAnswers({});
        setSubmitted(false);
        setShowResults(false);
    };

    const allAnswered = questions.every(q => answers[q.id] !== undefined);

    return (
        <div className="space-y-6">
            <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-3">
                    <HelpCircle className="text-purple-600" size={22} />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
                    <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {questions.length} Questions
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {submitted && (
                        <span className="text-sm font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                            {correctCount}/{questions.length}
                        </span>
                    )}
                    {expanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-4">
                            {questions.map((q, idx) => {
                                const selected = answers[q.id];
                                const isCorrect = selected === q.correctAnswer;
                                const wasSubmitted = submitted && selected !== undefined;

                                return (
                                    <div
                                        key={q.id}
                                        className={`rounded-2xl border-2 p-5 transition-colors ${
                                            wasSubmitted
                                                ? isCorrect
                                                    ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/10 dark:border-emerald-700'
                                                    : 'border-red-300 bg-red-50/50 dark:bg-red-950/10 dark:border-red-700'
                                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40'
                                        }`}
                                    >
                                        <p className="font-bold text-slate-800 dark:text-white text-sm mb-3">
                                            {idx + 1}. {q.question}
                                        </p>

                                        <div className="space-y-2">
                                            {q.options.map(opt => {
                                                const isSelected = selected === opt.id;
                                                const isOptionCorrect = opt.id === q.correctAnswer;
                                                let optionStyle = 'border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600';

                                                if (wasSubmitted) {
                                                    if (isOptionCorrect) {
                                                        optionStyle = 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-600';
                                                    } else if (isSelected && !isOptionCorrect) {
                                                        optionStyle = 'border-red-400 bg-red-50 dark:bg-red-950/20 dark:border-red-600';
                                                    } else {
                                                        optionStyle = 'border-slate-200 dark:border-slate-600 opacity-60';
                                                    }
                                                } else if (isSelected) {
                                                    optionStyle = 'border-purple-400 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-600';
                                                }

                                                return (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => handleSelect(q.id, opt.id)}
                                                        className={`w-full text-left p-3 rounded-xl border-2 text-sm flex items-start gap-3 transition-all ${optionStyle}`}
                                                        disabled={submitted}
                                                    >
                                                        <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                                                            wasSubmitted && isOptionCorrect
                                                                ? 'border-emerald-500 bg-emerald-500 text-white'
                                                                : wasSubmitted && isSelected && !isOptionCorrect
                                                                    ? 'border-red-500 bg-red-500 text-white'
                                                                    : isSelected
                                                                        ? 'border-purple-500 bg-purple-500 text-white'
                                                                        : 'border-slate-300 dark:border-slate-500 text-slate-500 dark:text-slate-400'
                                                        }`}>
                                                            {wasSubmitted && isOptionCorrect ? <CheckCircle2 size={12} /> :
                                                             wasSubmitted && isSelected && !isOptionCorrect ? <XCircle size={12} /> :
                                                             opt.id.toUpperCase()}
                                                        </span>
                                                        <span className="text-slate-700 dark:text-slate-300">{opt.text}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {wasSubmitted && (
                                            <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                                                isCorrect
                                                    ? 'bg-emerald-100/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200'
                                                    : 'bg-amber-100/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200'
                                            }`}>
                                                {isCorrect ? (
                                                    <p><span className="font-bold">Correct!</span> {q.justification}</p>
                                                ) : (
                                                    <div>
                                                        <p className="font-bold text-red-600 dark:text-red-400 mb-1">
                                                            Incorrect. Correct answer: {q.options.find(o => o.id === q.correctAnswer)?.text}
                                                        </p>
                                                        <p className="mb-1">{q.justification}</p>
                                                        {selected && q.wrongJustifications[selected] && (
                                                            <p className="mt-1 text-red-600 dark:text-red-400">
                                                                Why "{q.options.find(o => o.id === selected)?.text}" is wrong: {q.wrongJustifications[selected]}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                            {!submitted ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!allAnswered}
                                    className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 ${
                                        allAnswered
                                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                    }`}
                                >
                                    <Award size={16} />
                                    Submit Answers
                                </button>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <span className={`text-sm font-bold ${
                                        correctCount === questions.length
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : correctCount >= questions.length / 2
                                                ? 'text-amber-600 dark:text-amber-400'
                                                : 'text-red-600 dark:text-red-400'
                                    }`}>
                                        Score: {correctCount}/{questions.length} ({Math.round((correctCount / questions.length) * 100)}%)
                                    </span>
                                    <button
                                        onClick={handleReset}
                                        className="px-4 py-2 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center gap-2"
                                    >
                                        <RotateCcw size={14} />
                                        Retry
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
