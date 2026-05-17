import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface QuizCardProps {
    question: string;
    answer: string;
}

export default function QuizCard({ question, answer }: QuizCardProps) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div 
            className="relative w-full min-h-[140px] perspective-1000 cursor-pointer group"
            onClick={() => setFlipped(!flipped)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateX: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
            >
                {/* Front - Question */}
                <div className={`absolute w-full h-full backface-hidden p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-purple-400 dark:hover:border-purple-500 transition-colors flex flex-col justify-center items-center text-center gap-3 ${flipped ? 'pointer-events-none' : ''}`}>
                    <HelpCircle size={24} className="text-purple-500 opacity-80" />
                    <h5 className="font-bold text-slate-800 dark:text-white text-sm lg:text-base leading-relaxed">
                        {question}
                    </h5>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to Reveal Answer
                    </span>
                </div>

                {/* Back - Answer */}
                <div className="absolute w-full h-full backface-hidden p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-sm flex flex-col justify-center items-center text-center gap-3 rotate-x-180">
                    <CheckCircle2 size={24} className="text-emerald-500 opacity-80" />
                    <p className="text-sm lg:text-base text-purple-900 dark:text-purple-100 font-medium leading-relaxed">
                        {answer}
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <RotateCcw size={10} /> Click to Flip Back
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
