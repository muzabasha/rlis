import React, { useState, useMemo } from 'react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface TransitionMatrixVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function TransitionMatrixVis({
    formula = "\\mathbf{P} = \\begin{pmatrix} P_{11} & \\cdots & P_{1n} \\\\ \\vdots & \\ddots & \\vdots \\\\ P_{n1} & \\cdots & P_{nn} \\end{pmatrix}",
    label = 'Markov Transition Matrix',
    accent = 'violet'
}: TransitionMatrixVisProps) {
    const [size, setSize] = useState(4);

    const defaultMatrix = useMemo(() => {
        const mat: number[][] = [];
        for (let i = 0; i < 5; i++) {
            const row: number[] = [];
            let remaining = 1;
            for (let j = 0; j < 5; j++) {
                if (j === 4) { row.push(parseFloat(remaining.toFixed(2))); break; }
                const val = parseFloat((Math.random() * remaining * 0.6).toFixed(2));
                row.push(val);
                remaining -= val;
            }
            mat.push(row);
        }
        return mat;
    }, []);

    const [matrix, setMatrix] = useState(defaultMatrix);

    const updateCell = (row: number, col: number, value: number) => {
        const newMat = matrix.map(r => [...r]);
        newMat[row][col] = value;
        const sum = newMat[row].reduce((a, b) => a + b, 0);
        if (sum > 0) newMat[row] = newMat[row].map(v => parseFloat((v / sum).toFixed(3)));
        setMatrix(newMat);
    };

    const displayMat = useMemo(() => {
        return matrix.slice(0, size).map(row => row.slice(0, size));
    }, [matrix, size]);

    const maxVal = Math.max(...displayMat.flat());
    const minVal = Math.min(...displayMat.flat());

    const getColor = (val: number) => {
        const normalized = (val - minVal) / (maxVal - minVal || 1);
        const r = Math.round(239 - normalized * 200);
        const g = Math.round(246 - normalized * 200);
        const b = Math.round(255 - normalized * 50);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[{ name: 'size', label: 'Matrix Size', min: 2, max: 5, step: 1, default: 4 }]}
            values={{ size }}
            onSliderChange={(_, v) => setSize(Math.round(v))}
        >
            <div className="space-y-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                    Click a cell value to edit it. Rows automatically re-normalize to sum to 1.
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr>
                                <th className="p-1 text-slate-400 font-medium" />
                                {Array.from({ length: size }).map((_, j) => (
                                    <th key={j} className="p-1 text-slate-400 font-medium text-center">
                                        <InlineMath math={`s_{${j + 1}}'`} />
                                    </th>
                                ))}
                                <th className="p-1 text-slate-400 font-medium text-center">Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayMat.map((row, i) => (
                                <tr key={i}>
                                    <td className="p-1 text-slate-400 font-medium pr-2"><InlineMath math={`s_{${i + 1}}`} /></td>
                                    {row.map((cell, j) => (
                                        <td key={j} className="p-0.5">
                                            <input
                                                type="number"
                                                min={0}
                                                max={1}
                                                step={0.05}
                                                value={cell}
                                                onChange={e => updateCell(i, j, parseFloat(e.target.value) || 0)}
                                                className="w-full text-center p-1 rounded border-0 text-xs font-mono bg-transparent focus:outline-none focus:ring-1 focus:ring-violet-400"
                                                style={{ backgroundColor: getColor(cell) }}
                                            />
                                        </td>
                                    ))}
                                    <td className="p-1 text-center text-slate-500 font-mono">
                                        {row.reduce((a, b) => a + b, 0).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Each row sums to 1 (a probability distribution over next states).
                    The (i,j) cell = probability of transitioning from <InlineMath math="s_i" /> to <InlineMath math="s_j" />.
                    Darker cells = higher probability.
                </p>
            </div>
        </EquationGraph>
    );
}
