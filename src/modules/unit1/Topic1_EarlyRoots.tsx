import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, History, ChevronDown, ChevronUp, Play, Pause, RotateCcw, CheckCircle2, Clock, Target, AlertTriangle, TrendingUp, Briefcase, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';

// ─── Puzzle Box Simulation ───────────────────────────────────────────────────
function PuzzleBoxLab() {
    const [rewardProb, setRewardProb] = useState(0.7);
    const [running, setRunning] = useState(false);
    const [trial, setTrial] = useState(0);
    const [escapeTime, setEscapeTime] = useState<number[]>([]);
    const [speed, setSpeed] = useState(400);
    const runRef = useRef(false);

    const runTrial = () => {
        let t = 0;
        while (Math.random() > rewardProb && t < 60) t++;
        return t + 1;
    };

    useEffect(() => {
        if (!running) { runRef.current = false; return; }
        runRef.current = true;
        const id = setInterval(() => {
            if (!runRef.current) { clearInterval(id); return; }
            const t = runTrial();
            setEscapeTime(prev => [...prev.slice(-49), t]);
            setTrial(n => n + 1);
        }, speed);
        return () => clearInterval(id);
    }, [running, speed, rewardProb]);

    const reset = () => { setRunning(false); setTrial(0); setEscapeTime([]); };
    const chartData = escapeTime.map((t, i) => ({ trial: i + 1, time: t, avg: escapeTime.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1) }));

    return (
        <div className="lab-block space-y-4">
            <h4 className="font-bold text-cyan-900 dark:text-cyan-100 text-lg">🐱 Thorndike's Puzzle Box — Virtual Simulation</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Watch how a cat learns to escape faster over trials. Adjust reward probability to see how learning speed changes.</p>

            <div className="grid sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Reward Probability = {rewardProb}</label>
                    <input type="range" min="0.1" max="0.99" step="0.05" value={rewardProb} onChange={e => { setRewardProb(parseFloat(e.target.value)); reset(); }} className="w-full accent-cyan-600" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>Hard (0.1)</span><span>Easy (0.99)</span></div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Speed: {speed}ms/trial</label>
                    <input type="range" min="100" max="1000" step="100" value={speed} onChange={e => setSpeed(parseInt(e.target.value))} className="w-full accent-cyan-600" />
                </div>
                <div className="flex flex-col gap-2 justify-end">
                    <button onClick={() => setRunning(r => !r)} className={`flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-sm ${running ? 'bg-amber-500 text-white' : 'bg-cyan-600 text-white'}`}>
                        {running ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Run Trials</>}
                    </button>
                    <button onClick={reset} className="flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        <RotateCcw size={14} /> Reset
                    </button>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
                {[
                    { label: 'Trials Run', value: trial, color: 'text-blue-600 dark:text-blue-400' },
                    { label: 'Last Escape Time', value: escapeTime[escapeTime.length - 1] ?? '—', color: 'text-violet-600 dark:text-violet-400' },
                    { label: 'Avg Escape Time', value: escapeTime.length ? (escapeTime.reduce((a, b) => a + b, 0) / escapeTime.length).toFixed(1) : '—', color: 'text-emerald-600 dark:text-emerald-400' },
                ].map(s => (
                    <div key={s.label} className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-3 text-center">
                        <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
                    </div>
                ))}
            </div>

            {chartData.length > 1 && (
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="timeGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="trial" label={{ value: 'Trial Number', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 11 }} />
                        <YAxis label={{ value: 'Steps to Escape', angle: -90, position: 'insideLeft', offset: 10 }} tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }} />
                        <Legend />
                        <Area type="monotone" dataKey="time" stroke="#3b82f6" fill="url(#timeGrad)" name="Escape Time" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="avg" stroke="#10b981" name="Running Average" strokeWidth={2} dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            )}

            <InfoCard type="success" title="What to Observe">
                As trials increase, escape time decreases — the cat is LEARNING. Higher reward probability = faster learning curve. This is the Law of Effect in action: rewarded actions get reinforced. This is the biological foundation of all RL algorithms.
            </InfoCard>
        </div>
    );
}

// ─── Question Accordion ───────────────────────────────────────────────────────
const QA_DATA = [
    {
        type: 'Conceptual', q: 'What is the "Law of Effect"? Who proposed it and when?',
        a: 'The Law of Effect was proposed by Edward Thorndike in 1898. It states: "Responses that produce a satisfying effect in a particular situation become more likely to occur again in that situation, and responses that produce a discomforting effect become less likely to occur again." This is the psychological foundation of reinforcement learning — rewarded behaviors are strengthened, punished behaviors are weakened.',
        keyPoints: ['Thorndike (1898) — puzzle box experiments', 'Reward strengthens behavior', 'Punishment weakens behavior', 'Foundation of operant conditioning'],
        mistake: 'Confusing Law of Effect with Pavlovian conditioning — Pavlov studied reflexes (classical), Thorndike studied voluntary actions (operant).',
        tip: 'Remember: Law of Effect = Effect of reward/punishment on future behavior frequency.'
    },
    {
        type: 'Conceptual', q: 'Name the three historical threads that converged to form modern RL.',
        a: '(1) Trial-and-Error Learning: from animal psychology (Thorndike, Pavlov). The idea that agents learn by trying actions and observing consequences. (2) Optimal Control Theory: from mathematics and engineering (Bellman, 1950s). Dynamic programming for finding optimal policies in sequential decision problems. (3) Temporal Difference (TD) Learning: from neuroscience and computer science (Sutton, 1988). Learning predictions from the difference between successive estimates. Modern RL unified all three threads.',
        keyPoints: ['Trial-and-error: psychology roots', 'Optimal control: math/engineering roots', 'TD learning: neuroscience/CS roots', 'Sutton & Barto unified them (1998/2019)'],
        mistake: 'Thinking RL was invented by one person — it evolved over 70+ years from multiple disciplines.',
        tip: 'Three threads: Psychology + Math + CS = RL'
    },
    {
        type: 'Application', q: 'How does Thorndike\'s puzzle box experiment relate to a modern RL agent playing a video game?',
        a: 'The mapping is direct: Cat = RL Agent. Puzzle box = Game environment. Cat\'s actions (scratching, pulling) = Agent\'s actions (button presses). Food reward = Game score/reward. Escape time decreasing = Q-values converging to optimal. In both cases: (1) No explicit instructions given, (2) Learning happens through trial-and-error, (3) Rewarded actions become more frequent, (4) Performance improves over time. The only difference is scale — a modern DQN agent runs millions of "trials" per hour.',
        keyPoints: ['Same principle: reward → reinforce action', 'Cat trials ≈ training episodes', 'Escape time ≈ episode reward', 'Both learn without explicit programming'],
        mistake: 'Thinking the cat "understands" the puzzle — it just learns stimulus-response associations, exactly like a Q-table.',
        tip: 'Cat : Puzzle Box :: RL Agent : Environment. Same math, different substrate.'
    },
    {
        type: 'Numerical', q: 'If a cat takes 120, 80, 45, 20, 12 seconds to escape over 5 trials, calculate the learning rate (improvement per trial).',
        a: 'Improvement from trial 1 to 5: 120 - 12 = 108 seconds total improvement. Average improvement per trial: 108 / 4 = 27 seconds/trial. Percentage improvement: (108/120) × 100 = 90% improvement. Alternatively, fit an exponential decay: T(n) ≈ T₀ × e^(-λn). From T(1)=120, T(5)=12: 12 = 120 × e^(-4λ) → e^(-4λ) = 0.1 → λ = ln(10)/4 ≈ 0.576. This exponential decay mirrors how Q-values converge in RL.',
        keyPoints: ['Learning shows exponential decay pattern', 'λ = learning rate parameter', 'Same math as ε-decay in RL', 'Performance plateau is normal'],
        mistake: 'Using linear interpolation — learning curves are exponential, not linear.',
        tip: 'Learning curves in biology and RL both follow exponential decay: fast improvement early, slower later.'
    },
    {
        type: 'Problem-Solving', q: 'Samuel\'s Checkers program (1959) is considered a landmark in RL history. Explain why it was revolutionary.',
        a: 'Arthur Samuel\'s Checkers program (1959) was revolutionary for three reasons: (1) Self-play learning: it played against itself to generate training data — no human opponent needed. (2) Value function approximation: it learned to evaluate board positions using a weighted linear function of features, not a lookup table. (3) Temporal difference learning: it updated its evaluation function based on the difference between current and future position values — the core idea of TD learning. It demonstrated that machines could learn to play games better than their programmers, decades before Deep Blue or AlphaGo. Samuel coined the term "Machine Learning" in this work.',
        keyPoints: ['First self-learning game program', 'Used value function approximation', 'Pioneered TD-like updates', 'Coined "Machine Learning"'],
        mistake: 'Thinking Deep Blue (1997) was the first chess/checkers AI — Samuel\'s program predates it by 38 years.',
        tip: 'Samuel 1959 → TD Learning → Q-Learning → DQN → AlphaGo. One continuous thread.'
    },
];

export default function Topic1_EarlyRoots() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Origins of RL" 
                subtitle="From Psychology to Computer Science" 
                icon={<History className="text-blue-600" size={24} />} 
                badge="Storytelling" 
                badgeColor="bg-blue-100 text-blue-700" 
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Users size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🐾 Thorndike's Puzzle Box
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In 1898, Edward Thorndike placed hungry cats in boxes. To escape and get food, they had to perform a specific action (like pulling a loop). At first, they struggled.
                            </p>
                            <p>
                                But over time, the <strong>reward</strong> (food) reinforced the <strong>action</strong>. This "Law of Effect" is the grandfather of Reinforcement Learning.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="definition" title="Law of Effect">
                            Responses that produce a satisfying effect in a particular situation become more likely to occur again in that situation.
                        </InfoCard>
                        <InfoCard type="insight" title="From Cats to AlphaGo">
                            The same principles of <strong>Trial and Error</strong> and <strong>Reward Maximization</strong> that Thorndike observed in cats are exactly what powered DeepMind's AlphaGo to beat world champions.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Feedback Loop" 
                subtitle="The Core Cycle" 
                icon={<Calculator className="text-primary-600" size={24} />} 
                badge="Math Modelling" 
                badgeColor="bg-primary-100 text-primary-700" 
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        The early mathematical roots come from Optimal Control and Dynamic Programming (Bellman, 1950s).
                    </p>
                    <MathBlock 
                        formula="S_t, A_t \rightarrow R_{t+1}, S_{t+1}" 
                        label="The Core Cycle" 
                        explanation="At time t, an agent in state S takes action A, resulting in reward R and a new state S at t+1." 
                    />
                    
                    <SymbolTable 
                        symbols={[
                            { symbol: 'S_t', meaning: 'The state of the environment at time step t.' },
                            { symbol: 'A_t', meaning: 'The action taken by the agent at time step t.' },
                            { symbol: 'R_{t+1}', meaning: 'The reward received after taking action A_t.' },
                            { symbol: 'S_{t+1}', meaning: 'The new state of the environment.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Trial & Error Simulation" 
                subtitle="Predicting Behavior" 
                icon={<Users className="text-emerald-600" size={24} />} 
                badge="Activity" 
                badgeColor="bg-emerald-100 text-emerald-700" 
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <p className="text-slate-600 dark:text-slate-400">Try to predict the cat's behavior in the puzzle box over multiple trials.</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="card p-6 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200">
                            <h4 className="font-bold text-sm mb-3">Trial 1</h4>
                            <p className="text-xs text-slate-500 italic">"Cat meows, scratches at walls, pushes randomly..."</p>
                            <div className="mt-4 p-2 bg-white dark:bg-slate-800 rounded text-[10px] text-slate-400 font-medium">Exploration phase (High Randomness)</div>
                        </div>
                        <div className="card p-6 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200">
                            <h4 className="font-bold text-sm mb-3 text-emerald-800 dark:text-emerald-200">Trial 50</h4>
                            <p className="text-xs text-emerald-600 italic">"Cat immediately pulls the loop and escapes."</p>
                            <div className="mt-4 p-2 bg-white dark:bg-slate-800 rounded text-[10px] text-emerald-500 font-medium">Exploitation phase (Learned Policy)</div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Samuel's Checkers" 
                subtitle="The First Learning Program" 
                icon={<Briefcase className="text-indigo-600" size={24} />} 
                badge="PBL" 
                badgeColor="bg-indigo-100 text-indigo-700" 
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500">
                        <h5 className="font-bold mb-2 text-slate-800 dark:text-white flex items-center gap-2">
                            <History size={18} /> Arthur Samuel's Checkers Program (1959)
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            <strong>Task:</strong> Explain why Samuel's Checkers program was revolutionary in the history of RL.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600">Self-Play Learning</h6>
                            <p className="text-[10px] text-slate-500">It played against itself to generate training data — no human opponent needed.</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600">Temporal Difference</h6>
                            <p className="text-[10px] text-slate-500">It updated its evaluation based on the difference between current and future position values.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Historical Context" 
                icon={<HelpCircle className="text-purple-600" size={24} />} 
                badge="Questions" 
                badgeColor="bg-purple-100 text-purple-700" 
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {QA_DATA.filter(q => q.type === 'Conceptual').slice(0, 3).map((item, i) => (
                        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-purple-500 transition-colors">
                            <div className="font-bold text-slate-800 dark:text-white mb-2 text-sm italic">Q: {item.q}</div>
                            <div className="text-xs text-slate-500 border-l-2 border-slate-100 dark:border-slate-700 pl-4">{item.a}</div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Puzzle Box" 
                subtitle="Experience the Law of Effect" 
                icon={<FlaskConical className="text-cyan-600" size={24} />} 
                badge="Virtual Lab" 
                badgeColor="bg-cyan-100 text-cyan-700" 
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <PuzzleBoxLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-blue-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Early Roots: Mastered!</h3>
                    <p className="text-blue-100">
                        You've discovered the historical foundations of Reinforcement Learning. Now let's explore why we need it today.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-blue-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: NEED FOR RL
                    </button>
                    <button className="px-10 py-4 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 transition-colors">
                        REVIEW ROOTS
                    </button>
                </div>
            </div>
        </div>
    );
}
