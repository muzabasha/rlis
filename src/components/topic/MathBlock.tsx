import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathBlockProps {
    formula: string;
    label?: string;
    explanation?: string;
    inline?: boolean;
}

export function MathBlock({ formula, label, explanation, inline = false }: MathBlockProps) {
    if (inline) {
        return <InlineMath math={formula} />;
    }

    return (
        <div className="math-block my-4">
            {label && (
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{label}</div>
            )}
            <div className="flex justify-center overflow-x-auto py-2">
                <BlockMath math={formula} />
            </div>
            {explanation && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 text-center italic">{explanation}</p>
            )}
        </div>
    );
}

interface SymbolTableProps {
    symbols: { symbol: string; meaning: string; unit?: string }[];
}

export function SymbolTable({ symbols }: SymbolTableProps) {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300 w-24">Symbol</th>
                        <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Meaning</th>
                        {symbols.some(s => s.unit) && (
                            <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300 w-32">Unit/Type</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {symbols.map((s, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-2 px-3 font-mono text-primary-600 dark:text-primary-400 font-semibold">
                                <InlineMath math={s.symbol} />
                            </td>
                            <td className="py-2 px-3 text-slate-600 dark:text-slate-400">{s.meaning}</td>
                            {s.unit && <td className="py-2 px-3 text-slate-500 dark:text-slate-500 text-xs">{s.unit}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
