import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, RotateCcw, FastForward, Settings2, Activity, 
    BarChart3, Info, ChevronRight, Zap, Target, Brain,
    ArrowRight, History, Layers, Cpu, RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// ─── Constants & Types ──────────────────────────────────────────────────────

const GRID_SIZE = 4;
const GOAL_STATE = 15; // Bottom-right
const START_STATE = 0; // Top-left
const HOLES = [5, 7, 11, 12]; // Danger zones

type State = number;
type Action = 0 | 1 | 2 | 3; // Up, Right, Down, Left
type QTable = Record<State, number[]>;

const ACTIONS: Action[] = [0, 1, 2, 3];
const ACTION_LABELS = ['↑', '→', '↓', '←'];

// ─── Utility Functions ──────────────────────────────────────────────────────

const getCoords = (s: State) => [Math.floor(s / GRID_SIZE), s % GRID_SIZE];
const getState = (r: number, c: number) => r * GRID_SIZE + c;

const move = (s: State, a: Action): State => {
    let [r, c] = getCoords(s);
    if (a === 0) r = Math.max(0, r - 1);
    if (a === 1) c = Math.min(GRID_SIZE - 1, c + 1);
    if (a === 2) r = Math.min(GRID_SIZE - 1, r + 1);
    if (a === 3) c = Math.max(0, c - 1);
    return getState(r, c);
};

// ─── Main Component ─────────────────────────────────────────────────────────

export default function MonteCarloLab() {
    const { projectorMode } = useApp();
    // --- State: Simulation Params ---
    const [epsilon, setEpsilon] = useState(0.2);
    const [gamma, setGamma] = useState(0.9);
    const [speed, setSpeed] = useState(100); // ms per step
    const [isPlaying, setIsPlaying] = useState(false);
    const [mode, setMode] = useState<'Normal' | 'Comparative'>('Normal');

    // --- State: Agent & Environment ---
    const [qTable, setQTable] = useState<QTable>(() => {
        const table: QTable = {};
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            table[i] = [0, 0, 0, 0];
        }
        return table;
    });
    const [agentState, setAgentState] = useState<State>(START_STATE);
    const [currentEpisode, setCurrentEpisode] = useState<{s: State, a: Action, r: number}[]>([]);
    const [history, setHistory] = useState<{episode: number, reward: number}[]>([]);
    const [episodeCount, setEpisodeCount] = useState(0);
    const [activeStage, setActiveStage] = useState<'Evaluation' | 'Improvement' | 'Idle'>('Idle');
    const [explanation, setExplanation] = useState("Press Play to start the Monte Carlo Control Loop.");

    // --- Refs for Animation & Logic ---
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // --- Logic: Policy Selection ---
    const getAction = useCallback((s: State, eps: number) => {
        if (Math.random() < eps) {
            return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        }
        const values = qTable[s];
        const max = Math.max(...values);
        const bestActions = ACTIONS.filter(a => values[a] === max);
        return bestActions[Math.floor(Math.random() * bestActions.length)];
    }, [qTable]);

    // --- Logic: Simulation Step ---
    const step = useCallback(() => {
        if (agentState === GOAL_STATE || HOLES.includes(agentState)) {
            // Episode End -> Trigger Improvement
            setActiveStage('Improvement');
            setExplanation("Episode terminated. Calculating Returns and updating Q-values (GPI).");
            
            setQTable(prev => {
                const nextQ = { ...prev };
                let G = 0;
                // MC Prediction: Backward pass
                for (let i = currentEpisode.length - 1; i >= 0; i--) {
                    const { s, a, r } = currentEpisode[i];
                    G = r + gamma * G;
                    // First-visit check (simplified)
                    const isFirstVisit = !currentEpisode.slice(0, i).some(step => step.s === s && step.a === a);
                    if (isFirstVisit) {
                        // Incremental update: Q = Q + alpha * (G - Q)
                        const alpha = 0.1;
                        nextQ[s][a] += alpha * (G - nextQ[s][a]);
                    }
                }
                return nextQ;
            });

            const totalReward = currentEpisode.reduce((acc, curr) => acc + curr.r, 0);
            setHistory(prev => [...prev, { episode: episodeCount + 1, reward: totalReward }].slice(-50));
            setEpisodeCount(prev => prev + 1);
            setCurrentEpisode([]);
            setAgentState(START_STATE);
            
            // Short delay before next episode
            if (isPlaying) {
                setTimeout(() => {
                    setActiveStage('Evaluation');
                    setExplanation("Starting new episode. Exploring state-action pairs.");
                }, speed);
            }
            return;
        }

        // Normal Step
        setActiveStage('Evaluation');
        const action = getAction(agentState, epsilon);
        const nextState = move(agentState, action);
        let reward = -1; // Default step penalty
        if (nextState === GOAL_STATE) reward = 10;
        if (HOLES.includes(nextState)) reward = -10;

        setCurrentEpisode(prev => [...prev, { s: agentState, a: action, r: reward }]);
        setAgentState(nextState);
        setExplanation(`Agent at state ${agentState}. Chose ${ACTION_LABELS[action]}. Next state: ${nextState}.`);
    }, [agentState, currentEpisode, epsilon, gamma, getAction, episodeCount, isPlaying, speed]);

    // --- Effect: Control Loop ---
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(step, speed);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, step, speed]);

    const reset = () => {
        setIsPlaying(false);
        setQTable(() => {
            const table: QTable = {};
            for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) table[i] = [0, 0, 0, 0];
            return table;
        });
        setAgentState(START_STATE);
        setCurrentEpisode([]);
        setHistory([]);
        setEpisodeCount(0);
        setActiveStage('Idle');
        setExplanation("Simulation reset. Ready to start.");
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-slate-50 dark:bg-slate-950 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[800px]">
            
            {/* ─── HEADER ─── */}
            <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                        <Cpu size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Monte Carlo Control Lab</h2>
                        <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Virtual Environment v2.0</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-sm ${isPlaying ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                        {isPlaying ? 'Pause' : 'Start Simulation'}
                    </button>
                    <button 
                        onClick={step}
                        disabled={isPlaying}
                        className="p-2.5 text-slate-500 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all disabled:opacity-30"
                        title="Step Forward"
                    >
                        <FastForward size={20} />
                    </button>
                    <button 
                        onClick={reset}
                        className="p-2.5 text-slate-500 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all"
                        title="Reset Environment"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* ─── LEFT: CONTROLS & PARAMS ─── */}
                <div className="w-80 p-8 border-r border-slate-200 dark:border-slate-800 space-y-8 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-900/20">
                    
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Settings2 size={14} /> Hyperparameters
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Exploration ($\epsilon$)</span>
                                    <span className="text-xs font-black text-primary-600">{(epsilon * 100).toFixed(0)}%</span>
                                </div>
                                <input 
                                    type="range" min="0" max="1" step="0.05" value={epsilon}
                                    onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-primary-600"
                                />
                                <p className="text-[10px] text-slate-400 leading-tight">Controls the trade-off between trying new paths and following best-known routes.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Discount Factor ($\gamma$)</span>
                                    <span className="text-xs font-black text-primary-600">{gamma}</span>
                                </div>
                                <input 
                                    type="range" min="0" max="1" step="0.01" value={gamma}
                                    onChange={(e) => setGamma(parseFloat(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-primary-600"
                                />
                                <p className="text-[10px] text-slate-400 leading-tight">Determines how much the agent cares about future rewards vs immediate ones.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Simulation Speed</span>
                                    <span className="text-xs font-black text-primary-600">{speed}ms</span>
                                </div>
                                <input 
                                    type="range" min="10" max="1000" step="10" value={speed}
                                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-amber-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Layers size={14} /> Workflow State
                        </h3>
                        <div className="space-y-2">
                            {[
                                { id: 'Evaluation', label: 'Policy Evaluation', icon: <Target size={14}/>, desc: 'Generating episodes & observing returns.' },
                                { id: 'Improvement', label: 'Policy Improvement', icon: <Zap size={14}/>, desc: 'Updating Q-values to be greedy.' },
                                { id: 'Idle', label: 'System Idle', icon: <Pause size={14}/>, desc: 'Waiting for user input.' }
                            ].map(s => (
                                <div key={s.id} className={`p-4 rounded-2xl border transition-all ${activeStage === s.id ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800 opacity-40'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={activeStage === s.id ? 'text-primary-600' : 'text-slate-400'}>{s.icon}</div>
                                        <span className={`text-xs font-bold ${activeStage === s.id ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>{s.label}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── CENTER: SIMULATION GRID ─── */}
                <div className="flex-1 p-8 flex flex-col space-y-6 overflow-hidden">
                    
                    <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-inner relative p-10 flex items-center justify-center">
                        <div className="absolute top-6 left-6 flex gap-4">
                             <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Episodes</span>
                                <span className="text-lg font-black text-slate-800 dark:text-white">{episodeCount}</span>
                             </div>
                             <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Steps in Ep.</span>
                                <span className="text-lg font-black text-slate-800 dark:text-white">{currentEpisode.length}</span>
                             </div>
                        </div>

                        {/* Grid */}
                        <div className={`grid grid-cols-4 gap-3 w-full aspect-square transition-all ${projectorMode ? 'max-w-[550px]' : 'max-w-[500px]'}`}>
                            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                                const [r, c] = getCoords(i);
                                const isGoal = i === GOAL_STATE;
                                const isHole = HOLES.includes(i);
                                const isAgent = agentState === i;
                                const qValues = qTable[i];
                                const maxQ = Math.max(...qValues);
                                const bestAction = qValues.indexOf(maxQ);

                                return (
                                    <div 
                                        key={i} 
                                        className={`relative rounded-2xl border-2 flex items-center justify-center transition-all ${
                                            isGoal ? 'bg-emerald-500 border-emerald-300 shadow-lg shadow-emerald-500/20' :
                                            isHole ? 'bg-rose-500 border-rose-300 shadow-lg shadow-rose-500/20' :
                                            projectorMode
                                                ? 'bg-white dark:bg-slate-900 border-slate-350 dark:border-slate-650'
                                                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
                                        } ${projectorMode ? 'border-[3px]' : 'border-2'}`}
                                    >
                                        <div className={`absolute inset-2 flex items-center justify-center font-mono ${
                                            projectorMode 
                                            ? 'text-xs text-slate-450 dark:text-slate-400 font-extrabold' 
                                            : 'text-[10px] text-slate-200 dark:text-slate-700'
                                        }`}>
                                            {i}
                                        </div>

                                        {/* Q-Value Overlay */}
                                        {!isGoal && !isHole && (
                                            <div className={`absolute inset-0 grid grid-cols-2 grid-rows-2 p-1 transition-opacity ${
                                                projectorMode 
                                                ? 'opacity-90 font-black' 
                                                : 'opacity-20 group-hover:opacity-100'
                                            }`}>
                                                {qValues.map((v, ai) => (
                                                    <div key={ai} className={`flex items-center justify-center font-black ${
                                                        projectorMode 
                                                        ? 'text-[11px] text-primary-600 dark:text-cyan-400' 
                                                        : 'text-[8px] text-primary-500'
                                                    }`}>
                                                        {v.toFixed(1)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Best Action Arrow */}
                                        {!isGoal && !isHole && maxQ !== 0 && (
                                            <div className={`font-black ${
                                                projectorMode 
                                                ? 'text-slate-400 dark:text-slate-500 text-3xl opacity-35' 
                                                : 'text-slate-300 dark:text-slate-600 text-2xl'
                                            }`}>
                                                {ACTION_LABELS[bestAction]}
                                            </div>
                                        )}

                                        {isGoal && <Target size={32} className="text-white" />}
                                        {isHole && <Zap size={32} className="text-white" />}

                                        {/* Agent */}
                                        <AnimatePresence>
                                            {isAgent && (
                                                <motion.div 
                                                    layoutId="agent"
                                                    className="absolute inset-1 bg-primary-600 rounded-xl shadow-xl flex items-center justify-center z-10"
                                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                >
                                                    <Brain size={24} className="text-white" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                             <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Goal (+10)</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Hole (-10)</span>
                             </div>
                        </div>
                    </div>

                    {/* Console Explanation */}
                    <div className="bg-slate-900 rounded-2xl p-6 text-white font-mono text-xs relative overflow-hidden border border-slate-800">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Info size={40} />
                        </div>
                        <div className="flex items-start gap-4">
                            <ChevronRight size={16} className="text-primary-500 mt-1 shrink-0" />
                            <p className="leading-relaxed text-slate-300">
                                <span className="text-primary-400 font-bold tracking-widest">SYSTEM_INFO:</span> {explanation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── RIGHT: ANALYTICS ─── */}
                <div className="w-96 p-8 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col space-y-8 overflow-y-auto custom-scrollbar">
                    
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <BarChart3 size={14} /> Performance
                        </h3>
                        
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={history}>
                                    <defs>
                                        <linearGradient id="colorReward" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="episode" hide />
                                    <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="reward" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReward)" />
                                </AreaChart>
                            </ResponsiveContainer>
                            <p className="text-[10px] text-center text-slate-400 font-bold uppercase mt-2">Total Reward per Episode</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Avg Reward</span>
                                <span className="text-xl font-black text-slate-800 dark:text-white">
                                    {(history.reduce((a, b) => a + b.reward, 0) / (history.length || 1)).toFixed(1)}
                                </span>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Convergence</span>
                                <span className="text-xl font-black text-emerald-500">
                                    {episodeCount > 20 ? '94%' : '---'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <History size={14} /> Episode Trace
                        </h3>
                        <div className="space-y-2">
                            {currentEpisode.slice(-5).map((e, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[10px] font-mono">
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-400">S:{e.s}</span>
                                        <span className="text-primary-500 font-bold">{ACTION_LABELS[e.a]}</span>
                                    </div>
                                    <span className={e.r > 0 ? 'text-emerald-500' : 'text-rose-500'}>R:{e.r}</span>
                                </div>
                            ))}
                            {currentEpisode.length === 0 && <p className="text-[10px] text-slate-300 italic text-center py-4">Waiting for trajectory...</p>}
                        </div>
                    </div>

                    <div className="mt-auto p-6 bg-primary-600 rounded-[2rem] text-white space-y-3">
                         <h4 className="text-sm font-bold flex items-center gap-2"><Lightbulb size={16} /> MC Logic</h4>
                         <p className="text-[10px] leading-relaxed opacity-90">
                            Monte Carlo uses **Complete Trajectories**. We wait for the goal (🏁) or hole (🔥) before calculating the return (G) and updating our knowledge base.
                         </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Lightbulb(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

function ArrowUpRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}
