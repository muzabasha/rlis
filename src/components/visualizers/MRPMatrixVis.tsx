import React, { useState, useMemo } from 'react';
import { InlineMath } from 'react-katex';
import EquationGraph from './EquationGraph';

interface MRPMatrixVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function MRPMatrixVis({
    formula = "\\mathbf{V} = (\\mathbf{I} - \\gamma\\mathbf{P})^{-1} \\mathbf{R}",
    label = 'MRP Bellman Equation — Matrix Form',
    accent = 'violet'
}: MRPMatrixVisProps) {
    const [gamma, setGamma] = useState(0.9);
    const SIZE = 4;

    const P = useMemo(() => {
        const mat = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
        for (let i = 0; i < SIZE; i++) {
            let remaining = 1;
            for (let j = 0; j < SIZE; j++) {
                if (j === SIZE - 1) { mat[i][j] = parseFloat(remaining.toFixed(2)); break; }
                const val = parseFloat((Math.random() * remaining * 0.5 + 0.1).toFixed(2));
                mat[i][j] = val;
                remaining -= val;
            }
        }
        return mat;
    }, []);

    const R = useMemo(() => [1, -0.5, 2, 10], []);

    const V = useMemo(() => {
        const I = Array.from({ length: SIZE }, (_, i) => Array.from({ length: SIZE }, (_, j) => i === j ? 1 : 0));
        const IP_minus = Array.from({ length: SIZE }, (_, i) =>
            Array.from({ length: SIZE }, (_, j) => I[i][j] - gamma * P[i][j])
        );

        const augmented = IP_minus.map((row, i) => [...row, R[i]]);
        const n = SIZE;
        for (let col = 0; col < n; col++) {
            let pivot = col;
            while (pivot < n && Math.abs(augmented[pivot][col]) < 1e-10) pivot++;
            if (pivot >= n) continue;
            [augmented[col], augmented[pivot]] = [augmented[pivot], augmented[col]];
            const pivotVal = augmented[col][col];
            for (let j = col; j <= n; j++) augmented[col][j] /= pivotVal;
            for (let row = 0; row < n; row++) {
                if (row !== col) {
                    const factor = augmented[row][col];
                    for (let j = col; j <= n; j++) augmented[row][j] -= factor * augmented[col][j];
                }
            }
        }
        return Array.from({ length: n }, (_, i) => parseFloat(augmented[i][n].toFixed(4)));
    }, [gamma, P, R]);

    const getColor = (val: number) => {
        const normalized = (val + 1) / 12;
        const g = Math.round(255 - normalized * 200);
        const b = Math.round(250 - normalized * 100);
        return `rgb(239, ${g}, ${b})`;
    };

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[{ name: 'gamma', label: 'Discount γ', min: 0, max: 0.99, step: 0.01, default: 0.9 }]}
            values={{ gamma }}
            onSliderChange={(_, v) => setGamma(v)}
        >
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1"><InlineMath math="\\mathbf{P}" /></p>
                        <table className="w-full border-collapse">
                            <tbody>
                                {P.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((v, j) => (
                                            <td key={j} className="p-1 text-center font-mono text-[10px] rounded" style={{ backgroundColor: getColor(v) }}>
                                                {v.toFixed(2)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1"><InlineMath math="\\mathbf{R}" /></p>
                        <table className="w-full border-collapse">
                            <tbody>
                                {R.map((v, i) => (
                                    <tr key={i}>
                                        <td className="p-1 text-center font-mono text-[10px] rounded" style={{ backgroundColor: getColor(v) }}>
                                            {v.toFixed(1)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-[10px] text-slate-400 mt-1"><InlineMath math="\\mathbf{V}" /></p>
                        <table className="w-full border-collapse">
                            <tbody>
                                {V.map((v, i) => (
                                    <tr key={i}>
                                        <td className="p-1 text-center font-mono text-[10px] font-bold rounded" style={{ backgroundColor: getColor(v) }}>
                                            {v.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-[10px] text-slate-500 leading-relaxed">
                        <p className="mb-1"><InlineMath math="\\mathbf{V} = (\\mathbf{I} - \\gamma\\mathbf{P})^{-1}\\mathbf{R}" /></p>
                        <p>Analytical solution to the MRP Bellman equation.</p>
                        <p className="mt-1">
                            γ = {gamma.toFixed(2)}<br />
                            V₀ = {V[0].toFixed(2)}, V₃ = {V[3].toFixed(2)}
                        </p>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    The matrix form gives the exact solution in one step (no iteration needed).
                    <InlineMath math="(\\mathbf{I} - \\gamma\\mathbf{P})" /> must be invertible.
                    Change γ to see how values shift.
                </p>
            </div>
        </EquationGraph>
    );
}
