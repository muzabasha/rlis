import React, { useState, useMemo } from 'react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface MatrixPowerVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function MatrixPowerVis({
    formula = "(\\mathbf{P}^n)_{ij} = \\Pr(X_{t+n} = j \\mid X_t = i)",
    label = 'n-Step Transition Probability — Matrix Power',
    accent = 'violet'
}: MatrixPowerVisProps) {
    const [power, setPower] = useState(2);
    const SIZE = 4;

    const P = [
        [0.6, 0.3, 0.1, 0.0],
        [0.2, 0.5, 0.2, 0.1],
        [0.1, 0.2, 0.6, 0.1],
        [0.1, 0.1, 0.3, 0.5],
    ];

    const matPow = (mat: number[][], n: number): number[][] => {
        if (n === 1) return mat;
        const half = matPow(mat, Math.floor(n / 2));
        const squared = multiply(half, half);
        return n % 2 === 0 ? squared : multiply(squared, mat);
    };

    const multiply = (a: number[][], b: number[][]): number[][] => {
        const result = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
        for (let i = 0; i < SIZE; i++)
            for (let j = 0; j < SIZE; j++)
                for (let k = 0; k < SIZE; k++)
                    result[i][j] += a[i][k] * b[k][j];
        return result.map(row => row.map(v => parseFloat(v.toFixed(4))));
    };

    const resultMatrix = useMemo(() => {
        if (power === 0) return Array.from({ length: SIZE }, (_, i) => Array.from({ length: SIZE }, (_, j) => i === j ? 1 : 0));
        return matPow(P, power);
    }, [power]);

    const maxVal = Math.max(...resultMatrix.flat());
    const minVal = Math.min(...resultMatrix.flat());

    const getColor = (val: number) => {
        if (power === 0) return val === 1 ? 'rgb(167, 243, 208)' : 'rgb(248, 250, 252)';
        const normalized = (val - minVal) / (maxVal - minVal || 1);
        const r = Math.round(248 - normalized * 200);
        const g = Math.round(250 - normalized * 200);
        const b = Math.round(252 - normalized * 50);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const stationaryRow = useMemo(() => {
        const stable = matPow(P, 20);
        return stable[0];
    }, []);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[{ name: 'power', label: 'n', min: 1, max: 10, step: 1, default: 2 }]}
            values={{ power }}
            onSliderChange={(_, v) => setPower(Math.round(v))}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        <InlineMath math={`\\mathbf{P}^{${power}}`} /> — n-step transitions
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Stationary row (n→∞): <strong>[{stationaryRow.map(v => v.toFixed(2)).join(', ')}]</strong>
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr>
                                <th className="p-1 text-slate-400 font-medium" />
                                {Array.from({ length: SIZE }).map((_, j) => (
                                    <th key={j} className="p-1 text-slate-400 font-medium text-center">
                                        <InlineMath math={`s_{${j + 1}}`} />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {resultMatrix.map((row, i) => (
                                <tr key={i}>
                                    <td className="p-1 text-slate-400 font-medium pr-2"><InlineMath math={`s_{${i + 1}}`} /></td>
                                    {row.map((cell, j) => (
                                        <td key={j}
                                            className="p-1 text-center text-xs font-mono rounded"
                                            style={{ backgroundColor: getColor(cell) }}
                                        >
                                            {cell.toFixed(3)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    <InlineMath math={`(\\mathbf{P}^{${power}})_{ij}`} /> = probability of being in state <InlineMath math="s_j" /> after {power} steps starting from <InlineMath math="s_i" />.
                    As n→∞, each row converges to the stationary distribution.
                </p>
            </div>
        </EquationGraph>
    );
}
