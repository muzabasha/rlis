import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../../components/topic/SectionWrapper';
import InfoCard from '../../../components/topic/InfoCard';
import { FlaskConical, Play, Pause, RotateCcw, FastForward, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Grid World Simulation
const GRID_SIZE = 5;
const GOAL = { r: 4, c: 4 };
const OBSTACLES = [{ r: 1, c: 1 }, { r: 2, c: 3 }, { r: 3, c: 1 }];

type Cell = { r: number; c: number };
type Action = 'up' | 'down' | 'left' | 'right';
const ACTIONS: Action[] = ['up', 'down', 'left', 'right'];

function isObstacle(cell: Cell) {
    return OBSTACLES.some(o => o.r === cell.r && o.c === cell.c);
}

function isGoal(cell: Cell) {
    return cell.r === GOAL.r && cell.c === GOAL.c;
}

function step(pos: Cell, action: Action): { next: Cell; reward: number; done: boolean } {
    let next = { ...pos };
    if (action === 'up') next.r = Math.max(0, pos.r - 1);
    if (action === 'down') next.r = Math.min(GRID_SIZE - 1, pos.r + 1);
    if (action === 'left') next.c = Math.max(0, pos.c - 1);
    if (action === 'right') next.c = Math.min(GRID_SIZE - 1, pos.c + 1);

    if (isObstacle(next)) { next = { ...pos }; return { next, reward: -1, done: false }; }
    if (isGoal(next)) return { next, reward: 10, done: true };
    return { next, reward: -0.1, done: false };
}

function initQTable(): number[][][] {
    return Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => [0, 0, 0, 0])
    );
}

export default function VirtualLabSection_T1() {
    const [qTable, setQTable] = useState<number[][][]>(initQTable());
    const [agentPos, setAgentPos] = useState<Cell>({ r: 0, c: 0 });
    const [episode, setEpisode] = useState(0);
    const [totalReward, setTotalReward] = useState(0);
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(300);
    const [epsilon, setEpsilon] = useState(0.9);
    const [alpha, setAlpha] = useState(0.1);
    const [gamma, setGamma] = useState(0.9);
    const [history, setHistory] = useState<{ episode: number; reward: number; steps: number }[]>([]);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [log, setLog] = useState<string[]>(['🚀 Lab ready. Press Play to start training!']);
    const [showPolicy, setShowPolicy] = useState(false);

    const runningRef = useRef(running);
    const qRef = useRef(qTable);
    const posRef = useRef(agentPos);
    const epRef = useRef(episode);
    const epsilonRef = useRef(epsilon);
    const stepsRef = useRef(currentSteps);
    const rewardRef = useRef(totalReward);

    runningRef.current = running;
    qRef.current = qTable;
    posRef.current = agentPos;
    epRef.current = episode;
    epsilonRef.current = epsilon;
    stepsRef.current = currentSteps;
    rewardRef.current = totalReward;

    const addLog = useCallback((msg: string) => {
        setLog(prev => [...prev.slice(-8), msg]);
    }, []);

    const runStep = useCallback(() => {
        const pos = posRef.current;
        const q = qRef.current;
        const eps = epsilonRef.current;

        // ε-greedy action selection
        let actionIdx: number;
        if (Math.random() < eps) {
            actionIdx = Math.floor(Math.random() * 4);
        } else {
            const qVals = q[pos.r][pos.c];
            actionIdx = qVals.indexOf(Math.max(...qVals));
        }

        const action = ACTIONS[actionIdx];
        const { next, reward, done } = step(pos, action);

        // Q-learning update
        const currentQ = q[pos.r][pos.c][actionIdx];
        const maxNextQ = Math.max(...q[next.r][next.c]);
        const newQ = currentQ + alpha * (reward + gamma * maxNextQ - currentQ);

        const newQTable = q.map(row => row.map(cell => [...cell]));
        newQTable[pos.r][pos.c][actionIdx] = newQ;

        setQTable(newQTable);
        setAgentPos(next);
        setTotalReward(prev => prev + reward);
        setCurrentSteps(prev => prev + 1);

        if (done || stepsRef.current >= 49) {
            const ep = epRef.current + 1;
            const newEps = Math.max(0.05, epsilonRef.current * 0.995);
            setEpisode(ep);
            setEpsilon(newEps);
            setHistory(prev => [...prev.slice(-49), { episode: ep, reward: parseFloat((rewardRef.current + reward).toFixed(2)), steps: stepsRef.current + 1 }]);
            setAgentPos({ r: 0, c: 0 });
            setTotalReward(0);
            setCurrentSteps(0);
            addLog(`Episode ${ep}: ${done ? '✅ Goal reached' : '⏱️ Timeout'} | ε=${newEps.toFixed(3)}`);
        }
    }, [alpha, gamma, addLog]);

    useEffect(() => {
        if (!running) return;
        const interval = setInterval(runStep, speed);
        return () => clearInterval(interval);
    }, [running, speed, runStep]);

    const reset = () => {
        setRunning(false);
        setQTable(initQTable());
        setAgentPos({ r: 0, c: 0 });
        setEpisode(0);
        setTotalReward(0);
        setCurrentSteps(0);
        setEpsilon(0.9);
        setHistory([]);
        setLog(['🔄 Reset complete. Press Play to start!']);
    };

    const policyArrow = (r: number, c: number) => {
        const arrows = ['↑', '↓', '←', '→'];
        const qVals = qTable[r][c];
        const best = qVals.indexOf(Math.max(...qVals));
        return arrows[best];
    };

    return (
        <SectionWrapper
            id="lab"
            title="Section 6: Virtual Lab — Grid World RL Simulation"
            subtitle="Watch an RL agent learn to navigate a grid world in real-time"
            icon={<FlaskConical size={20} className="text-cyan-600" />}
            badge="Interactive Lab"
            badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300"
            accentColor="border-cyan-500"
        >
            <div className="space-y-6">
                <InfoCard type="info" title="What This Lab Demonstrates">
                    This simulation shows a simplified Q-learning agent learning to navigate a 5×5 grid.
                    The agent starts at (0,0) and must reach the goal at (4,4) while avoiding obstacles.
                    Watch how the agent's behavior changes from random exploration to goal-directed movement!
                </InfoCard>

                {/* Controls */}
                <div className="lab-block">
                    <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-4">⚙️ Simulation Controls</h4>
                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                Speed: {speed}ms/step
                            </label>
                            <input type="range" min="50" max="1000" step="50" value={speed}
                                onChange={e => setSpeed(parseInt(e.target.value))}
                                className="w-full accent-cyan-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                Learning Rate α = {alpha}
                            </label>
                            <input type="range" min="0.01" max="1.0" step="0.01" value={alpha}
                                onChange={e => setAlpha(parseFloat(e.target.value))}
                                className="w-full accent-cyan-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                Discount γ = {gamma}
                            </label>
                            <input type="range" min="0.1" max="0.99" step="0.01" value={gamma}
                                onChange={e => setGamma(parseFloat(e.target.value))}
                                className="w-full accent-cyan-600" />
                        </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={() => setRunning(r => !r)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${running ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                                }`}
                        >
                            {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Play</>}
                        </button>
                        <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
                            <RotateCcw size={16} /> Reset
                        </button>
                        <button
                            onClick={() => setShowPolicy(p => !p)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${showPolicy ? 'bg-violet-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            {showPolicy ? 'Hide Policy' : 'Show Policy'}
                        </button>
                    </div>
                </div>

                {/* Grid + Stats */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Grid World */}
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">🗺️ Grid World</h4>
                        <div className="inline-block bg-slate-100 dark:bg-slate-800 rounded-2xl p-3">
                            {Array.from({ length: GRID_SIZE }, (_, r) => (
                                <div key={r} className="flex gap-1 mb-1">
                                    {Array.from({ length: GRID_SIZE }, (_, c) => {
                                        const isAgent = agentPos.r === r && agentPos.c === c;
                                        const isGoalCell = isGoal({ r, c });
                                        const isObs = isObstacle({ r, c });
                                        const isStart = r === 0 && c === 0;

                                        return (
                                            <motion.div
                                                key={c}
                                                animate={isAgent ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                                                transition={{ duration: 0.2 }}
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold relative ${isObs ? 'bg-slate-700 dark:bg-slate-600' :
                                                        isGoalCell ? 'bg-emerald-400 dark:bg-emerald-500' :
                                                            isStart ? 'bg-blue-100 dark:bg-blue-900/40' :
                                                                'bg-white dark:bg-slate-700'
                                                    }`}
                                            >
                                                {isAgent ? '🤖' : isGoalCell ? '🏆' : isObs ? '🧱' : (
                                                    showPolicy && !isStart ? (
                                                        <span className="text-slate-400 dark:text-slate-500 text-base">{policyArrow(r, c)}</span>
                                                    ) : null
                                                )}
                                                {isStart && !isAgent && <span className="text-blue-400 text-xs">S</span>}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex gap-3 mt-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">🤖 Agent</span>
                            <span className="flex items-center gap-1">🏆 Goal (+10)</span>
                            <span className="flex items-center gap-1">🧱 Obstacle (−1)</span>
                            <span className="flex items-center gap-1">S Start</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">📊 Live Statistics</h4>
                        {[
                            { label: 'Episode', value: episode, color: 'text-blue-600 dark:text-blue-400' },
                            { label: 'Current Steps', value: currentSteps, color: 'text-violet-600 dark:text-violet-400' },
                            { label: 'Epsilon (ε)', value: epsilon.toFixed(3), color: 'text-amber-600 dark:text-amber-400' },
                            { label: 'Cumulative Reward', value: totalReward.toFixed(2), color: 'text-emerald-600 dark:text-emerald-400' },
                        ].map(s => (
                            <div key={s.label} className="card p-3 flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-400">{s.label}</span>
                                <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
                            </div>
                        ))}

                        {/* Log */}
                        <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-3 font-mono text-xs text-emerald-400 h-32 overflow-y-auto">
                            {log.map((l, i) => <div key={i}>{l}</div>)}
                        </div>
                    </div>
                </div>

                {/* Learning Curve */}
                {history.length > 1 && (
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">📈 Learning Curve</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="episode" label={{ value: 'Episode', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }} />
                                <Legend />
                                <Line type="monotone" dataKey="reward" stroke="#10b981" name="Episode Reward" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="steps" stroke="#3b82f6" name="Steps to Goal" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                        <InfoCard type="success" title="What to Observe">
                            As episodes increase: (1) Episode reward should trend upward, (2) Steps to goal should decrease,
                            (3) ε decreases — agent exploits more. This is the agent LEARNING!
                        </InfoCard>
                    </div>
                )}

                {/* Explanation */}
                <div className="card p-5">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">🔍 What's Happening Inside?</h4>
                    <div className="space-y-3">
                        {[
                            { step: '1. Observe', desc: 'Agent reads current position (r, c) as state S_t' },
                            { step: '2. Select Action', desc: `With ε=${epsilon.toFixed(2)} probability: random action (explore). Otherwise: best Q-table action (exploit)` },
                            { step: '3. Execute', desc: 'Agent moves in chosen direction. If obstacle: stays put (−1 reward). If goal: +10 reward.' },
                            { step: '4. Update Q-Table', desc: 'Q(s,a) ← Q(s,a) + α[R + γ·max Q(s\',a\') − Q(s,a)]' },
                            { step: '5. Repeat', desc: 'After each episode, ε decays. Agent gradually shifts from exploration to exploitation.' },
                        ].map(item => (
                            <div key={item.step} className="flex items-start gap-3">
                                <span className="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-lg text-xs font-bold flex-shrink-0">{item.step}</span>
                                <span className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
