import React, { useState, useMemo, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from 'recharts';
import { Play, Pause, RotateCcw } from 'lucide-react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

const SD_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

interface StationaryDistVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

export default function StationaryDistVis({
    formula = "\\boldsymbol{\\pi} \\mathbf{P} = \\boldsymbol{\\pi}",
    label = 'Stationary Distribution Convergence',
    accent = 'emerald'
}: StationaryDistVisProps) {
    const [running, setRunning] = useState(false);
    const [step, setStep] = useState(0);

    const transitionMatrix = [
        [0.7, 0.2, 0.1, 0.0],
        [0.1, 0.6, 0.2, 0.1],
        [0.1, 0.1, 0.7, 0.1],
        [0.1, 0.1, 0.2, 0.6],
    ];

    const initialState = [1.0, 0.0, 0.0, 0.0];

    const [distHistory, setDistHistory] = useState<{ step: number; dist: number[] }[]>([
        { step: 0, dist: initialState }
    ]);

    const stepDist = useCallback(() => {
        setDistHistory(prev => {
            const last = prev[prev.length - 1];
            const newDist = Array(4).fill(0);
            for (let j = 0; j < 4; j++)
                for (let i = 0; i < 4; i++)
                    newDist[j] += last.dist[i] * transitionMatrix[i][j];
            const rounded = newDist.map(v => parseFloat(v.toFixed(6)));
            setStep(prev.length);
            return [...prev, { step: prev.length, dist: rounded }];
        });
    }, []);

    React.useEffect(() => {
        if (!running) return;
        const interval = setInterval(() => {
            setDistHistory(prev => {
                const last = prev[prev.length - 1];
                const newDist = Array(4).fill(0);
                for (let j = 0; j < 4; j++)
                    for (let i = 0; i < 4; i++)
                        newDist[j] += last.dist[i] * transitionMatrix[i][j];
                const rounded = newDist.map(v => parseFloat(v.toFixed(6)));
                setStep(prev.length);
                const newHist = [...prev, { step: prev.length, dist: rounded }];
                if (newHist.length > 50) { setRunning(false); }
                return newHist;
            });
        }, 200);
        return () => clearInterval(interval);
    }, [running]);

    const reset = () => {
        setRunning(false);
        setStep(0);
        setDistHistory([{ step: 0, dist: initialState }]);
    };

    const currentDist = distHistory[distHistory.length - 1].dist;

    const convergenceData = useMemo(() => {
        return distHistory.map(h => ({
            step: h.step,
            ...Object.fromEntries(h.dist.map((v, i) => [`S${i + 1}`, parseFloat((v * 100).toFixed(2))])),
        }));
    }, [distHistory]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => setRunning(!running)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                    >
                        {running ? <><Pause className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> Run</>}
                    </button>
                    <button onClick={stepDist} disabled={running}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-40 transition-colors"
                    >
                        Step
                    </button>
                    <button onClick={reset}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                    <span className="text-xs text-slate-500 self-center ml-auto">Step: {step}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {currentDist.map((v, i) => (
                        <div key={i} className="text-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="text-[10px] text-slate-400"><InlineMath math={`\\pi_{${i + 1}}`} /></div>
                            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{(v * 100).toFixed(1)}%</div>
                        </div>
                    ))}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={convergenceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="step" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Probability %', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        {[0, 1, 2, 3].map(i => (
                            <Line key={i} type="monotone" dataKey={`S${i + 1}`} stroke={SD_COLORS[i]} strokeWidth={2} dot={false} name={`State ${i + 1}`} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Starting from <InlineMath math="\\boldsymbol{\\pi}_0 = [1,0,0,0]" />, the distribution converges to the stationary distribution where <InlineMath math="\\boldsymbol{\\pi} \\mathbf{P} = \\boldsymbol{\\pi}" />.
                </p>
            </div>
        </EquationGraph>
    );
}
