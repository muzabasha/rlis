import React, { useState } from 'react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface GridworldVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const GRID_SIZE = 4;
const GOAL = { r: 3, c: 3 };
const OBSTACLES = [{ r: 1, c: 1 }, { r: 2, c: 2 }];

export default function GridworldVis({
    formula = "\\text{Gridworld}: \\mathcal{S} = \\{(r,c)\\}, \\mathcal{A} = \\{\\uparrow,\\downarrow,\\leftarrow,\\rightarrow\\}",
    label = 'Gridworld MDP',
    accent = 'violet'
}: GridworldVisProps) {
    const [agentPos, setAgentPos] = useState({ r: 0, c: 0 });
    const [path, setPath] = useState<{ r: number; c: number }[]>([{ r: 0, c: 0 }]);
    const [reward, setReward] = useState<number | null>(null);

    const move = (dr: number, dc: number) => {
        const newR = agentPos.r + dr;
        const newC = agentPos.c + dc;
        if (newR < 0 || newR >= GRID_SIZE || newC < 0 || newC >= GRID_SIZE) {
            setReward(-1);
            return;
        }
        if (OBSTACLES.some(o => o.r === newR && o.c === newC)) {
            setReward(-5);
            return;
        }
        const isGoal = newR === GOAL.r && newC === GOAL.c;
        setReward(isGoal ? 10 : -0.1);
        setAgentPos({ r: newR, c: newC });
        setPath(prev => [...prev, { r: newR, c: newC }]);
    };

    const reset = () => {
        setAgentPos({ r: 0, c: 0 });
        setPath([{ r: 0, c: 0 }]);
        setReward(null);
    };

    const actions = [
        { label: '↑', dr: -1, dc: 0 },
        { label: '↓', dr: 1, dc: 0 },
        { label: '←', dr: 0, dc: -1 },
        { label: '→', dr: 0, dc: 1 },
    ];

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
        >
            <div className="space-y-3">
                <div className="flex gap-2 justify-center">
                    {actions.map(a => (
                        <button
                            key={a.label}
                            onClick={() => move(a.dr, a.dc)}
                            className="w-8 h-8 flex items-center justify-center text-sm font-bold rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                        >
                            {a.label}
                        </button>
                    ))}
                    <button onClick={reset} className="px-2 py-1 text-[10px] rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                        Reset
                    </button>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-4 gap-1">
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                            const r = Math.floor(idx / GRID_SIZE);
                            const c = idx % GRID_SIZE;
                            const isAgent = r === agentPos.r && c === agentPos.c;
                            const isGoal = r === GOAL.r && c === GOAL.c;
                            const isObs = OBSTACLES.some(o => o.r === r && o.c === c);
                            const inPath = path.some(p => p.r === r && p.c === c);

                            return (
                                <div
                                    key={idx}
                                    className={`w-12 h-12 flex items-center justify-center text-xs font-bold rounded-lg border-2 transition-all ${
                                        isAgent
                                            ? 'bg-blue-500 text-white border-blue-300 scale-110 shadow-lg'
                                            : isGoal
                                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-400'
                                            : isObs
                                            ? 'bg-red-100 dark:bg-red-900/40 text-red-500 border-red-300'
                                            : inPath
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-400 border-blue-200 dark:border-blue-800'
                                            : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                                    }`}
                                >
                                    {isAgent ? '🤖' : isGoal ? '🏆' : isObs ? '🧱' : ''}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {reward !== null && (
                    <div className={`text-center text-xs font-medium ${reward > 0 ? 'text-emerald-500' : reward < -1 ? 'text-red-500' : 'text-slate-500'}`}>
                        Reward: <strong>{reward > 0 ? '+' : ''}{reward.toFixed(1)}</strong>
                    </div>
                )}
                <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    <p>🤖 = Agent, 🏆 = Goal (+10), 🧱 = Obstacle (-5), Steps = -0.1</p>
                    <p className="mt-1">
                        <InlineMath math={`\\mathcal{S} = \\{(r,c)\\}, \\mathcal{A} = \\{\\uparrow, \\downarrow, \\leftarrow, \\rightarrow\\}`} />
                        . Gridworld is the standard RL benchmark where agents learn to navigate to the goal.
                    </p>
                </div>
            </div>
        </EquationGraph>
    );
}
