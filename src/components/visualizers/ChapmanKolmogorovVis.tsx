import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface ChapmanKolmogorovVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function ChapmanKolmogorovVis({
    formula = "\\mathbf{P}^{(m+n)} = \\mathbf{P}^{(m)} \\cdot \\mathbf{P}^{(n)}",
    label = 'Chapman-Kolmogorov Equation — Matrix Composition',
    accent = 'violet'
}: ChapmanKolmogorovVisProps) {
    const [steps, setSteps] = useState(2);

    const P = [
        [0.7, 0.2, 0.1],
        [0.2, 0.6, 0.2],
        [0.1, 0.2, 0.7],
    ];

    const multiply = (a: number[][], b: number[][]): number[][] => {
        const n = a.length;
        const result = Array.from({ length: n }, () => Array(n).fill(0));
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++)
                for (let k = 0; k < n; k++)
                    result[i][j] += a[i][k] * b[k][j];
        return result.map(row => row.map(v => parseFloat(v.toFixed(4))));
    };

    const matPow = (mat: number[][], n: number): number[][] => {
        if (n === 1) return mat.map(row => [...row]);
        const half = matPow(mat, Math.floor(n / 2));
        const squared = multiply(half, half);
        return n % 2 === 0 ? squared : multiply(squared, mat);
    };

    const [P1, P2, P3] = useMemo(() => {
        const _P1 = matPow(P, 1);
        const _P2 = matPow(P, 2);
        const _P3 = multiply(_P1, _P2);
        return [_P1, _P2, _P3];
    }, []);

    const displayP = steps === 1 ? P1 : steps === 2 ? P2 : P3;

    const getColor = (val: number) => {
        const g = Math.round(255 - val * 200);
        const b = Math.round(252 - val * 100);
        return `rgb(239, ${g}, ${b})`;
    };

    const chainData = useMemo(() => {
        const data: { step: number; p11: number; p12: number; p13: number }[] = [];
        let current = P.map(row => [...row]);
        for (let s = 1; s <= 6; s++) {
            data.push({ step: s, p11: current[0][0], p12: current[0][1], p13: current[0][2] });
            current = multiply(current, P);
        }
        return data;
    }, []);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[{ name: 'steps', label: 'Steps n', min: 1, max: 3, step: 1, default: 2 }]}
            values={{ steps }}
            onSliderChange={(_, v) => setSteps(Math.round(v))}
        >
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-1 text-xs">
                    {steps === 3 && (
                        <div className="col-span-3 text-center text-[10px] text-slate-400 mb-1">
                            <InlineMath math={`\\mathbf{P}^{(3)} = \\mathbf{P}^{(1)} \\cdot \\mathbf{P}^{(2)}`} /> (composition)
                        </div>
                    )}
                    {[1, 2, steps === 3 ? 3 : 0].filter(n => n > 0).map(n => {
                        const mat = n === 1 ? P1 : n === 2 ? P2 : P3;
                        return (
                            <div key={n}>
                                <p className="text-[9px] text-slate-400 text-center mb-0.5">
                                    <InlineMath math={`\\mathbf{P}^{(${n})}`} />
                                </p>
                                <table className="w-full border-collapse">
                                    <tbody>
                                        {mat.map((row, i) => (
                                            <tr key={i}>
                                                {row.map((v, j) => (
                                                    <td key={j} className="p-0.5 text-center font-mono text-[9px] rounded" style={{ backgroundColor: getColor(v) }}>
                                                        {v.toFixed(2)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
                <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={chainData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="step" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                        <YAxis domain={[0, 1]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                        <Legend wrapperStyle={{ fontSize: '9px' }} />
                        <Line type="monotone" dataKey="p11" stroke="#3b82f6" dot={false} name="P(S₁→S₁)" strokeWidth={1.5} />
                        <Line type="monotone" dataKey="p12" stroke="#8b5cf6" dot={false} name="P(S₁→S₂)" strokeWidth={1.5} />
                        <Line type="monotone" dataKey="p13" stroke="#10b981" dot={false} name="P(S₁→S₃)" strokeWidth={1.5} />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    <InlineMath math="\\mathbf{P}^{(m+n)} = \\mathbf{P}^{(m)} \\cdot \\mathbf{P}^{(n)}" /> allows computing
                    multi-step transitions efficiently. The n-step matrix can be computed from smaller step matrices.
                </p>
            </div>
        </EquationGraph>
    );
}
