import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import { ChevronDown, ChevronUp, Info, BookOpen } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TermInterpretation {
    term: string;          // LaTeX string for the term
    name: string;          // Human-readable name
    meaning: string;       // What it represents
    range?: string;        // Domain / range e.g. "[0, 1)"
    example?: string;      // Concrete numerical example
}

export interface MathBlockProps {
    formula: string;
    label?: string;
    explanation?: string;
    inline?: boolean;
    /** Full sentence interpretation of the whole equation */
    interpretation?: string;
    /** Why this equation is needed */
    motivation?: string;
    /** Per-term breakdown */
    terms?: TermInterpretation[];
    /** Numerical worked example */
    numericalExample?: {
        setup: string;
        steps: string[];
        result: string;
    };
    /** Colour accent: 'blue' | 'violet' | 'emerald' | 'red' | 'amber' */
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const ACCENT_MAP = {
    blue: { border: 'border-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300', label: 'text-blue-600 dark:text-blue-400' },
    violet: { border: 'border-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20', badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300', label: 'text-violet-600 dark:text-violet-400' },
    emerald: { border: 'border-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300', label: 'text-emerald-600 dark:text-emerald-400' },
    red: { border: 'border-red-400', bg: 'bg-red-50 dark:bg-red-900/20', badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300', label: 'text-red-600 dark:text-red-400' },
    amber: { border: 'border-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300', label: 'text-amber-600 dark:text-amber-400' },
};

// ─── Safe KaTeX renderer (never crashes the page) ────────────────────────────

function SafeBlock({ math }: { math: string }) {
    try {
        const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
        return <code className="text-red-500 text-sm">{math}</code>;
    }
}

function SafeInline({ math }: { math: string }) {
    try {
        const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
        return <code className="text-red-500 text-xs">{math}</code>;
    }
}

/**
 * Applies the original math-term regex to a plain text string.
 * Returns a string if no matches, otherwise an array of text + SafeInline elements.
 */
function formatSimpleMath(text: string, outerKey: string = ''): React.ReactNode | string {
    const mathRegex = /(\b[a-zA-Z0-9γππαδεΦφθβλP_]+(?:_[a-zA-Z0-9+\-*']+|\^[a-zA-Z0-9+\-*']+|_\{[a-zA-Z0-9+\-*',]+\}|\^\{[a-zA-Z0-9+\-*',_']+\})+(?:\b|(?<=[\}]))|\\[a-zA-Z_]+(?:{[a-zA-Z0-9+=\-{}*']+})?|\b[QPVqv]\([a-zA-Z0-9,\s|'_^+*\-={}]+\)|[γππαδεΦφθβλ])/g;
    const parts = text.split(mathRegex);
    if (parts.length === 1) return text;
    return parts.map((part, i) =>
        i % 2 === 0 ? part : <SafeInline key={`${outerKey}m${i}`} math={part} />
    );
}

/**
 * Automatically parses mathematical terms (subscripts, superscripts, LaTeX commands,
 * function calls, Greek letters) and `$...$` delimiters in plain text,
 * rendering them dynamically as SafeInline KaTeX.
 */
export function formatMathText(text: string | undefined): React.ReactNode | string {
    if (!text) return '';

    // First pass: split by $...$ delimiters
    const dollarParts = text.split(/(\$[^$]+\$)/g);
    if (dollarParts.length === 1) {
        return formatSimpleMath(text);
    }

    return dollarParts.map((part, i) => {
        if (i % 2 === 1) {
            const inner = part.slice(1, -1);
            return <SafeInline key={`$` + i} math={inner} />;
        }
        return formatSimpleMath(part, `t${i}`);
    });
}

// ─── Main MathBlock ───────────────────────────────────────────────────────────

export function MathBlock({
    formula,
    label,
    explanation,
    inline = false,
    interpretation,
    motivation,
    terms,
    numericalExample,
    accent = 'blue',
}: MathBlockProps) {
    const [expanded, setExpanded] = useState(false);
    const c = ACCENT_MAP[accent];
    const hasDetails = !!(interpretation || motivation || (terms && terms.length) || numericalExample);

    if (inline) {
        return <SafeInline math={formula} />;
    }

    return (
        <div className={`rounded-2xl border-l-4 ${c.border} ${c.bg} overflow-hidden my-5`}>
            {/* ── Label bar ── */}
            {label && (
                <div className={`px-4 pt-3 pb-1 flex items-center gap-2`}>
                    <BookOpen size={13} className={c.label} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${c.label}`}>{label}</span>
                </div>
            )}

            {/* ── Equation ── */}
            <div className="px-4 py-4 overflow-x-auto flex justify-center bg-white/60 dark:bg-slate-900/40 mx-3 mb-3 rounded-xl border border-slate-200/60 dark:border-slate-700/40">
                <SafeBlock math={formula} />
            </div>

            {/* ── Short explanation ── */}
            {explanation && (
                <p className="px-4 pb-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {formatMathText(explanation)}
                </p>
            )}

            {/* ── Expand / collapse details ── */}
            {hasDetails && (
                <>
                    <button
                        onClick={() => setExpanded(v => !v)}
                        className={`w-full flex items-center justify-between px-4 py-2 text-xs font-semibold ${c.label} hover:opacity-80 transition-opacity border-t border-slate-200/60 dark:border-slate-700/40`}
                    >
                        <span className="flex items-center gap-1.5">
                            <Info size={12} />
                            {expanded ? 'Hide interpretation' : 'Show full interpretation & term breakdown'}
                        </span>
                        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {expanded && (
                        <div className="px-4 pb-5 space-y-5 border-t border-slate-200/60 dark:border-slate-700/40 pt-4">

                            {/* Interpretation */}
                            {interpretation && (
                                <div>
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">What this equation says</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{formatMathText(interpretation)}</p>
                                </div>
                            )}

                            {/* Motivation */}
                            {motivation && (
                                <div className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200/60 dark:border-slate-700/40">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Why we need it</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{formatMathText(motivation)}</p>
                                </div>
                            )}

                            {/* Term-by-term breakdown */}
                            {terms && terms.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Term-by-term breakdown</p>
                                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-slate-100 dark:bg-slate-800">
                                                    <th className="text-left py-2 px-3 font-semibold text-slate-600 dark:text-slate-300 w-28">Term</th>
                                                    <th className="text-left py-2 px-3 font-semibold text-slate-600 dark:text-slate-300">Name</th>
                                                    <th className="text-left py-2 px-3 font-semibold text-slate-600 dark:text-slate-300">Meaning</th>
                                                    <th className="text-left py-2 px-3 font-semibold text-slate-600 dark:text-slate-300 w-24">Range</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {terms.map((t, i) => (
                                                    <tr key={i} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                                        <td className="py-2.5 px-3">
                                                            <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-mono font-bold ${c.badge}`}>
                                                                <SafeInline math={t.term} />
                                                            </span>
                                                        </td>
                                                        <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300 text-xs">{t.name}</td>
                                                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{formatMathText(t.meaning)}</td>
                                                        <td className="py-2.5 px-3 text-slate-500 dark:text-slate-500 text-xs font-mono">{t.range ? formatMathText(t.range) : '—'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Per-term examples */}
                                    {terms.some(t => t.example) && (
                                        <div className="mt-3 grid sm:grid-cols-2 gap-2">
                                            {terms.filter(t => t.example).map((t, i) => (
                                                <div key={i} className="bg-white/70 dark:bg-slate-800/50 rounded-lg p-2.5 border border-slate-200/60 dark:border-slate-700/40 flex items-start gap-2">
                                                    <span className={`text-xs font-mono font-bold ${c.label} shrink-0`}>
                                                        <SafeInline math={t.term} />
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">{formatMathText(t.example)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Numerical example */}
                            {numericalExample && (
                                <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-4 text-sm">
                                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Numerical Example</p>
                                    <p className="text-slate-300 mb-3 text-xs">{formatMathText(numericalExample.setup)}</p>
                                    <div className="space-y-1 font-mono text-xs">
                                        {numericalExample.steps.map((step, i) => (
                                            <div key={i} className="text-slate-400">
                                                <span className="text-slate-600 mr-2">Step {i + 1}:</span>{formatMathText(step)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-2">
                                        <span className="text-xs font-bold text-emerald-400">Result:</span>
                                        <span className="text-white text-xs font-mono">{formatMathText(numericalExample.result)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

// ─── SymbolTable (kept for backward compat) ───────────────────────────────────

export interface SymbolTableProps {
    symbols: { symbol: string; meaning: string; unit?: string }[];
}

export function SymbolTable({ symbols }: SymbolTableProps) {
    return (
        <div className="overflow-x-auto mt-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                        <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300 w-28">Symbol</th>
                        <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Meaning</th>
                        {symbols.some(s => s.unit) && (
                            <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300 w-32">Range / Type</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {symbols.map((s, i) => (
                        <tr key={i} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-2.5 px-3">
                                <span className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-lg text-xs font-mono font-bold">
                                    <SafeInline math={s.symbol} />
                                </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 text-sm">{s.meaning}</td>
                            {s.unit && (
                                <td className="py-2.5 px-3 text-slate-500 dark:text-slate-500 text-xs font-mono">{s.unit}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── Convenience: inline math ─────────────────────────────────────────────────
export function IM({ m }: { m: string }) {
    return <SafeInline math={m} />;
}
