import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface MCFirstEveryVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

const STATES = ['A', 'B', 'C', 'D', 'E'];

const STATE_COLORS: Record<string, string> = {
    A: '#3b82f6',
    B: '#8b5cf6',
    C: '#10b981',
    D: '#f59e0b',
    E: '#ef4444',
};

const TRANSITIONS: Record<string, { next: string; prob: number; reward: number }[]> = {
    A: [{ next: 'B', prob: 0.5, reward: 1 }, { next: 'C', prob: 0.5, reward: 2 }],
    B: [{ next: 'A', prob: 0.3, reward: 0 }, { next: 'C', prob: 0.4, reward: 1 }, { next: 'D', prob: 0.3, reward: 3 }],
    C: [{ next: 'B', prob: 0.5, reward: 2 }, { next: 'D', prob: 0.5, reward: 1 }],
    D: [{ next: 'A', prob: 0.4, reward: 0 }, { next: 'E', prob: 0.6, reward: 5 }],
    E: [],
};

function generateEpisode(): { trajectory: string[]; totalReward: number } {
    const trajectory = ['A'];
    let current = 'A';
    let totalReward = 0;
    let steps = 0;
    const maxSteps = 12;

    while (current !== 'E' && steps < maxSteps) {
        const trans = TRANSITIONS[current];
        const r = Math.random();
        let cum = 0;
        let chosen = trans[0];
        for (const t of trans) {
            cum += t.prob;
            if (r <= cum) { chosen = t; break; }
        }
        trajectory.push(chosen.next);
        totalReward += chosen.reward;
        current = chosen.next;
        steps++;
    }

    return { trajectory, totalReward };
}

export default function MCFirstEveryVis({
    formula = "N(s) \\leftarrow N(s) + 1",
    label = "First-Visit vs Every-Visit MC",
    accent = 'emerald'
}: MCFirstEveryVisProps) {
    const [episodes, setEpisodes] = useState<{ trajectory: string[]; totalReward: number }[]>([
        { trajectory: ['A', 'B', 'C', 'B', 'D', 'A', 'E'], totalReward: 12 }
    ]);
    const [currentIdx, setCurrentIdx] = useState(0);

    const runEpisode = () => {
        const ep = generateEpisode();
        setEpisodes(prev => [...prev, ep]);
        setCurrentIdx(prev => prev + 1);
    };

    const stats = useMemo(() => {
        const fv: Record<string, { n: number; totalR: number }> = {};
        const ev: Record<string, { n: number; totalR: number }> = {};

        for (const ep of episodes) {
            const seen = new Set<string>();
            for (const s of ep.trajectory) {
                if (!ev[s]) ev[s] = { n: 0, totalR: 0 };
                ev[s].n++;
                ev[s].totalR += ep.totalReward;

                if (!seen.has(s)) {
                    seen.add(s);
                    if (!fv[s]) fv[s] = { n: 0, totalR: 0 };
                    fv[s].n++;
                    fv[s].totalR += ep.totalReward;
                }
            }
        }

        return { fv, ev };
    }, [episodes]);

    const chartData = useMemo(() =>
        STATES.map(s => ({
            state: s,
            fvN: stats.fv[s]?.n ?? 0,
            evN: stats.ev[s]?.n ?? 0,
            fvV: stats.fv[s]?.n ? parseFloat((stats.fv[s].totalR / stats.fv[s].n).toFixed(2)) : 0,
            evV: stats.ev[s]?.n ? parseFloat((stats.ev[s].totalR / stats.ev[s].n).toFixed(2)) : 0,
        })),
    [stats]);

    const currentEpisode = episodes[currentIdx];
    const episodesCount = episodes.length;

    return (
        <EquationGraph formula={formula} label={label} accent={accent}>
            <div className="space-y-3">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={runEpisode}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                    >
                        Run Episode
                    </button>
                    <span className="text-xs text-slate-500">Episodes: {episodesCount}</span>
                </div>
                {currentEpisode && (
                    <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 flex-wrap">
                        <span className="text-[10px] text-slate-400 mr-1">Trajectory:</span>
                        {currentEpisode.trajectory.map((s, i) => (
                            <React.Fragment key={i}>
                                <span
                                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white font-bold"
                                    style={{ backgroundColor: STATE_COLORS[s], fontSize: 10 }}
                                >
                                    {s}
                                </span>
                                {i < currentEpisode.trajectory.length - 1 && (
                                    <span className="text-slate-300 dark:text-slate-600">→</span>
                                )}
                            </React.Fragment>
                        ))}
                        <span className="ml-2 text-[10px] text-slate-400">
                            Return: <strong>{currentEpisode.totalReward}</strong>
                        </span>
                    </div>
                )}
                <div className="flex justify-center gap-2 text-[9px] text-slate-400 mb-1">
                    {STATES.map(s => (
                        <span key={s} className="flex items-center gap-0.5">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: STATE_COLORS[s] }} />
                            {s}
                        </span>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1 text-center font-medium">
                            <InlineMath math="N(s)" /> — First-Visit MC
                        </p>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={chartData} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="state" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} allowDecimals={false} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '11px' }} />
                                <Legend wrapperStyle={{ fontSize: '9px' }} />
                                <Bar dataKey="fvN" name="First-Visit" radius={[3, 3, 0, 0]}>
                                    {chartData.map(d => <Cell key={d.state} fill={STATE_COLORS[d.state]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="text-center p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mt-1">
                            <span className="text-[10px] text-slate-500">
                                <InlineMath math="V(s) = G / N(s)" />:{' '}
                                {chartData.map(d => (
                                    <span key={d.state} className="mx-1">
                                        <InlineMath math={d.state} />={d.fvV > 0 ? d.fvV.toFixed(1) : '—'}
                                    </span>
                                ))}
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 mb-1 text-center font-medium">
                            <InlineMath math="N(s)" /> — Every-Visit MC
                        </p>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={chartData} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="state" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} allowDecimals={false} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '11px' }} />
                                <Legend wrapperStyle={{ fontSize: '9px' }} />
                                <Bar dataKey="evN" name="Every-Visit" radius={[3, 3, 0, 0]}>
                                    {chartData.map(d => <Cell key={d.state} fill={STATE_COLORS[d.state]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="text-center p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mt-1">
                            <span className="text-[10px] text-slate-500">
                                <InlineMath math="V(s) = G / N(s)" />:{' '}
                                {chartData.map(d => (
                                    <span key={d.state} className="mx-1">
                                        <InlineMath math={d.state} />={d.evV > 0 ? d.evV.toFixed(1) : '—'}
                                    </span>
                                ))}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                        <span className="font-medium text-blue-600 dark:text-blue-400">First-Visit MC:</span>{' '}
                        Counts each state at most once per episode.{' '}
                        <InlineMath math="N(s)" /> = episodes containing <InlineMath math="s" />.
                        Unbiased estimate.
                    </div>
                    <div className="p-2 rounded bg-purple-50 dark:bg-purple-900/20">
                        <span className="font-medium text-purple-600 dark:text-purple-400">Every-Visit MC:</span>{' '}
                        Counts every occurrence of a state.{' '}
                        <InlineMath math="N(s)" /> = total visits to <InlineMath math="s" />.
                        More data, can be biased.
                    </div>
                </div>
            </div>
        </EquationGraph>
    );
}
