import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { HelpCircle } from 'lucide-react';

interface QA { q: string; a: string; }

export default function QuestionAccordion({ questions }: { questions: QA[] }) {
    const [open, setOpen] = useState<Record<number, boolean>>({});
    return (
        <SectionWrapper id="questions" title="Section 5 — Model 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Question Bank" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500" defaultOpen={false}>
            <div className="space-y-3">
                {questions.map((item, i) => (
                    <div key={i} className="card overflow-hidden">
                        <button onClick={() => setOpen(p => ({ ...p, [i]: !p[i] }))} className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                            <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">Q{i + 1}</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200 text-sm flex-1">{item.q}</span>
                        </button>
                        <AnimatePresence>
                            {open[i] && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                    <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700 pt-3">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{item.a}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
