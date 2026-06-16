import React, { useState, useMemo, useCallback } from 'react';
import { Play, RotateCcw, SkipForward } from 'lucide-react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface MarkovChainSimVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const STATE_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export default function MarkovChainSimVis({
    formula = "\\Pr(S_{t+1} = j \\mid S_t = i) = P_{ij}",
    label = 'Markov Chain State Simulation',
    accent = 'violet'
}: MarkovChainSimVisProps) {
    const [currentState, setCurrentState] = useState(0);
    const [visited, setVisited] = useState<number[]>([0]);
    const [running, setRunning] = useState(false);

    const NUM_STATES = 5;

    const transitionMatrix = useMemo(() => {
        const mat: number[][] = [];
        for (let i = 0; i < NUM_STATES; i++) {
            const row: number[] = [];
            let remaining = 1;
            for (let j = 0; j < NUM_STATES; j++) {
                if (j === NUM_STATES - 1) { row.push(parseFloat(remaining.toFixed(2))); break; }
                const bias = i === j ? 0.4 : 0.15;
                const val = parseFloat(Math.min(bias, remaining * 0.8).toFixed(2));
                row.push(val);
                remaining -= val;
            }
            const sum = row.reduce((a, b) => a + b, 0);
            if (Math.abs(sum - 1) > 0.01) row[row.length - 1] += 1 - sum;
            mat.push(row);
        }
        return mat;
    }, []);

    const step = useCallback(() => {
        const probs = transitionMatrix[currentState];
        const r = Math.random();
        let cumulative = 0;
        for (let i = 0; i < NUM_STATES; i++) {
            cumulative += probs[i];
            if (r <= cumulative) {
                setCurrentState(i);
                setVisited(prev => [...prev, i]);
                return;
            }
        }
    }, [currentState, transitionMatrix]);

    React.useEffect(() => {
        if (!running) return;
        const interval = setInterval(step, 400);
        return () => clearInterval(interval);
    }, [running, step]);

    const reset = () => {
        setRunning(false);
        setCurrentState(0);
        setVisited([0]);
    };

    const stateCounts = useMemo(() => {
        const counts = Array(NUM_STATES).fill(0);
        visited.forEach(s => counts[s]++);
        return counts;
    }, [visited]);

    const currentDist = useMemo(() => {
        const row = transitionMatrix[currentState];
        return row.map((p, i) => ({ state: i, prob: p }));
    }, [currentState, transitionMatrix]);

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
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                    >
                        {running ? '⏸ Pause' : '▶ Run'}
                    </button>
                    <button onClick={step} disabled={running}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-40 transition-colors"
                    >
                        <SkipForward className="w-3 h-3" /> Step
                    </button>
                    <button onClick={reset}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                    <span className="text-xs text-slate-500 self-center ml-auto">Steps: {visited.length - 1}</span>
                </div>
                <div className="flex justify-center gap-3">
                    {Array.from({ length: NUM_STATES }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300 ${
                                    i === currentState ? 'ring-2 ring-offset-2 ring-violet-500 scale-125' : ''
                                }`}
                                style={{ backgroundColor: STATE_COLORS[i] }}
                            >
                                S{i + 1}
                            </div>
                            <span className="text-[10px] text-slate-400">[{stateCounts[i]}x]</span>
                        </div>
                    ))}
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Current: <InlineMath math={`S_{t} = ${currentState + 1}`} /> → Transition probabilities:
                    </p>
                    <div className="flex gap-1">
                        {currentDist.map((d, i) => (
                            <div key={i} className="flex-1 text-center p-1 rounded bg-slate-50 dark:bg-slate-700/50">
                                <div className="text-[10px] text-slate-400"><InlineMath math={`S_{${i + 1}}`} /></div>
                                <div className="text-xs font-bold" style={{ color: STATE_COLORS[i] }}>{(d.prob * 100).toFixed(0)}%</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    <span className="font-medium">Path:</span> {visited.map((s, i) => (
                        <span key={i}>
                            <span style={{ color: STATE_COLORS[s] }}>S{s + 1}</span>
                            {i < visited.length - 1 && <span className="text-slate-300 dark:text-slate-600"> → </span>}
                        </span>
                    ))}
                    {visited.length > 30 && <span className="text-slate-400"> ...</span>}
                </div>
            </div>
        </EquationGraph>
    );
}
