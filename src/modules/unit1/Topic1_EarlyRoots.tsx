import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { RLInteractionCycleVis, DiscountCurveVis } from '../../components/visualizers';
import ActivityLevels from '../../components/topic/ActivityLevels';
import { BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, History, ChevronDown, ChevronUp, Play, Pause, RotateCcw, CheckCircle2, Clock, Target, AlertTriangle, TrendingUp, Briefcase, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';

// ─── Puzzle Box Simulation ───────────────────────────────────────────────────

// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Early Roots Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Early Roots Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Early Roots simulator.",
        "question": "Based on your experiment, how does this concept influence long-term state-action values under stochastic conditions?",
        "hint": "Consider factors like the discount factor (gamma), immediate rewards, and next-state expectations."
    },
    {
        "task": "Change the parameters to their minimum and maximum settings and compare results.",
        "question": "What primary edge-case did you observe when parameters were set to extreme boundary values?",
        "hint": "For example, consider what happens when exploration is completely shut off, or when rewards are purely negative."
    }
];
const logs: string[] = [
    "🤖 [System] Initializing Early Roots Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Early Roots\" model has been loaded and initialized. Ready for student interaction."
];

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
                    <input type="range" min="0.1" max="0.99" step="0.05" value={rewardProb} onChange={e => { setRewardProb(parseFloat(e.target.value)); reset(); }} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-cyan-600" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>Hard (0.1)</span><span>Easy (0.99)</span></div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Speed: {speed}ms/trial</label>
                    <input type="range" min="100" max="1000" step="100" value={speed} onChange={e => setSpeed(parseInt(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-cyan-600" />
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
            <TopicProgressTracker topicId="unit1-topic1_earlyroots" />
            {/* SECTION 0: PREREQUISITES */}
            <SectionWrapper
                id="prerequisites"
                title="0. Prerequisites"
                subtitle="What you should know before starting"
                icon={<BookOpen className="text-sky-600" size={24} />}
                badge="Prerequisites"
                badgeColor="bg-sky-100 text-sky-700"
                accentColor="border-sky-500"
            >
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit1', 'Topic1_EarlyRoots');
                        if (!data) return <p className="text-sm text-slate-500">No prerequisites listed.</p>;
                        return (
                            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                {data.prerequisites.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        );
                    })()}
                </div>
            </SectionWrapper>

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
                    <div className="mt-2 mb-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm flex items-start gap-4 transform hover:scale-[1.02] transition-transform">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-2xl">
                            🎭
                        </div>
                        <div>
                            <h5 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                                Fun Fact / Comic Relief
                            </h5>
                            <p className="text-indigo-700 dark:text-indigo-300 font-medium italic leading-relaxed">
                                "Thorndike's cats were probably just trying to find a warm keyboard to sit on, but accidentally invented RL instead."
                            </p>
                        </div>
                    </div>
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

            
            {/* SECTION 2: MOTIVATION & APPLICATION CHALLENGE */}
            <SectionWrapper
                id="motivation"
                title="2. Motivation & Application Challenge"
                subtitle="Why study this topic?"
                icon={<Lightbulb className="text-amber-500" size={24} />}
                badge="Motivation"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
            >
                <div className="space-y-6">
                    {/* APPLICATION CHALLENGE CARD */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900 shadow-sm flex items-start gap-4 animate-fade-in">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-2xl">
                            🚀
                        </div>
                        <div className="space-y-2">
                            <h5 className="font-bold text-amber-900 dark:text-amber-100 text-base">
                                Application-Specific Challenge
                            </h5>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                How to design automated systems that can adapt to changing biological or robotic parameters in real time without human intervention.
                            </p>
                        </div>
                    </div>

                    {/* THE NEED TO STUDY */}
                    <div className="bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Target className="text-primary-500" size={16} />
                            The Need to Study this Topic
                        </h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Understanding how psychological animal behaviors (like trial and error) map to mathematical algorithms helps us build bio-inspired artificial intelligence.
                        </p>
                    </div>

                    {/* ADVANTAGES & DISADVANTAGES */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-emerald-900 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">
                                    Advantages
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Extremely robust in modeling emergent behaviors; provides deep insights into the root mechanisms of learning.
                                </p>
                            </div>
                        </div>

                        <div className="bg-rose-50/50 dark:bg-rose-950/10 p-5 rounded-2xl border border-rose-100 dark:border-rose-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <AlertTriangle className="text-rose-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-rose-900 dark:text-rose-400 text-xs uppercase tracking-wider mb-1">
                                    Disadvantages / Bottlenecks
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Bio-inspired trial-and-error can be extremely slow and highly sample-inefficient in complex computational tasks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Feedback Loop"
                subtitle="The Core Cycle"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        The early mathematical roots come from Optimal Control and Dynamic Programming (Bellman, 1950s).
                        Every RL algorithm is built on this single interaction equation.
                    </p>

                    <MathBlock
                        formula="S_t,\\; A_t \\;\\xrightarrow{\\text{environment}}\\; R_{t+1},\\; S_{t+1}"
                        label="The RL Interaction Cycle"
                        accent="blue"
                        explanation="The fundamental state-action-reward-state loop where an agent interacts with an environment."
                        interpretation="At time t, the agent in state S_t chooses action A_t. The environment responds by transitioning to next state S_{t+1} and emitting reward R_{t+1}."
                        motivation="Formalizes the trial-and-error feedback loop of learning from consequences."
                        terms={[
                            { term: 'S_t', name: 'Current State', meaning: 'The state of the environment at time step t.', range: 'State Space \\mathcal{S}', example: 'Grid cell position (1,1).' },
                            { term: 'A_t', name: 'Action', meaning: 'The decision made by the agent at time step t.', range: 'Action Space \\mathcal{A}', example: 'Move right.' },
                            { term: 'R_{t+1}', name: 'Reward', meaning: 'Scalar feedback signal received after the transition.', range: '\\mathbb{R}', example: '-1 step penalty.' },
                            { term: 'S_{t+1}', name: 'Next State', meaning: 'The state transitioned into after taking action A_t.', range: 'State Space \\mathcal{S}', example: 'Grid cell position (1,2).' }
                        ]}
                        numericalExample={{
                            setup: 'Gridworld agent starts at cell (1, 1) and wants to reach (1, 2).',
                            steps: [
                                'State S_t = (1, 1)',
                                'Agent chooses Action A_t = Move Right',
                                'Environment moves agent to next cell S_{t+1} = (1, 2) and gives reward R_{t+1} = -1'
                            ],
                            result: 'Interaction tuple ((1,1), Move Right, -1, (1,2)) is generated.'
                        }}
                    />
                    <RLInteractionCycleVis />

                    <MathBlock
                        formula="G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}"
                        label="The Discounted Return"
                        accent="violet"
                        explanation="The total accumulated discounted reward received by the agent over time."
                        interpretation="The agent's goal is to maximize this discounted sum, prioritizing near-term rewards over distant rewards depending on the discount factor."
                        motivation="Prevents infinite returns in infinite-horizon tasks and models the uncertainty of future outcomes."
                        terms={[
                            { term: 'G_t', name: 'Discounted Return', meaning: 'The discounted cumulative reward starting from time step t.', range: '\\mathbb{R}', example: 'G_t = 27.1' },
                            { term: 'R_{t+k+1}', name: 'Future Reward', meaning: 'Reward received at future step t+k+1.', range: '\\mathbb{R}', example: '10' },
                            { term: '\\gamma', name: 'Discount Factor', meaning: 'Determines the present value of future rewards.', range: '[0, 1]', example: '0.9' }
                        ]}
                        numericalExample={{
                            setup: 'Discount factor \\gamma = 0.9, rewards = [10, 10, 10] for next 3 steps, 0 thereafter.',
                            steps: [
                                'Step 1: R_{t+1} = 10',
                                'Step 2: \\gamma R_{t+2} = 0.9 \\times 10 = 9',
                                'Step 3: \\gamma^2 R_{t+3} = 0.81 \\times 10 = 8.1'
                            ],
                            result: 'G_t = 10 + 9 + 8.1 = 27.1'
                        }}
                    />
                    <DiscountCurveVis />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Early Roots Architecture"
                description="Evolution of Trial-and-Error from Biology to Machine Learning."
                chart={`graph LR
    A[Animal Psychology] --> C[Law of Effect]
    B[Optimal Control] --> D[Dynamic Programming]
    C --> E(Reinforcement Learning)
    D --> E
    E --> F[Modern AI & Deep RL]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="From Demonstration to Mastery"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Thorndike's Box Live Demo",
                            objectives: "Demonstrate the 'Law of Effect' using a digital simulation to show how rewards reinforce behavior.",
                            instructions: [
                                "Open the Virtual Lab below.",
                                "Set Reward Probability to 0.5 (Neutral).",
                                "Run 10 trials and observe the random movement initially.",
                                "Increase Reward Probability to 0.9 and observe the steep learning curve.",
                                "Point out the decreasing 'Escape Time' on the chart."
                            ],
                            inputs: "Reward Probability Slider (0.1 to 0.9)",
                            outputs: "Decreasing Escape Time Graph",
                            rubrics: ["Clarity of demonstration", "Explanation of Law of Effect", "Engagement of students"],
                            outcomes: "Students will visually verify that behavior frequency increases with positive reinforcement.",
                            time: "10 Mins",
                            materials: ["Digital Screen", "Virtual Lab Component"]
                        },
                        {
                            level: 2,
                            title: "Collaborative Data Analysis",
                            objectives: "Calculate the average improvement rate (learning rate) across different reward settings.",
                            instructions: [
                                "Divide students into two groups: 'Hard' (0.3 prob) and 'Easy' (0.8 prob).",
                                "Run 50 trials in each group using the Virtual Lab.",
                                "Compare the Trial 1 Escape Time vs Trial 50 Escape Time.",
                                "Guide students to calculate: (Initial - Final) / 50."
                            ],
                            inputs: "Trial Data from Simulator",
                            outputs: "Calculated Learning Rate (seconds/trial)",
                            rubrics: ["Data Accuracy", "Mathematical Calculation", "Collaborative Input"],
                            outcomes: "Students understand that higher rewards lead to faster convergence (steeper slopes).",
                            time: "15 Mins",
                            materials: ["Calculators", "Shared Classroom Lab"]
                        },
                        {
                            level: 3,
                            title: "The RL Mapping Workshop",
                            objectives: "Enable students to map biological learning concepts to formal RL mathematical components.",
                            instructions: [
                                "Form groups of 4 students.",
                                "Assign each group a 'Pet Learning Task' (e.g., teaching a dog to sit).",
                                "Identify: Who is the Agent? What is the State? What is the Action? What is the Reward?",
                                "Present the mapping to the class."
                            ],
                            inputs: "Real-world animal training scenario",
                            outputs: "Completed RL Mapping Table (S, A, R, S')",
                            rubrics: ["Conceptual Correctness", "Team Presentation", "Diversity of Scenarios"],
                            outcomes: "Students master the translation of abstract biological ideas into the RL tuple.",
                            time: "20 Mins",
                            materials: ["Flip charts", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Reflective Synthesis",
                            objectives: "Individually evaluate the impact of early roots on modern AI breakthroughs.",
                            instructions: [
                                "Write a 100-word reflection on Arthur Samuel's contribution.",
                                "Explain why self-play (Samuel's Checkers) was the ancestor of AlphaGo.",
                                "Identify one modern app (e.g., YouTube Recommendations) and explain its 'Law of Effect'."
                            ],
                            inputs: "Historical notes and current app knowledge",
                            outputs: "Individual Reflection Paper/Digital Note",
                            rubrics: ["Depth of insight", "Connection to history", "Originality"],
                            outcomes: "Students internalize the long-term evolution of RL from 1898 to today.",
                            time: "15 Mins",
                            materials: ["Student Journals"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Samuel's Checkers"
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

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Historical Context"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {QA_DATA.filter(q => q.type === 'Conceptual').slice(0, 3).map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Puzzle Box"
                subtitle="Experience the Law of Effect"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Puzzle Box Simulator"
                    description="Thorndike-style trial & error learning"
                    objective="Observe how reward probability shapes learning speed. Adjust reward rate and see how escape times shrink over trials."
                    badge="Interactive Lab"
                    tips={['Higher reward probability = faster learning',
                'Watch the trend line — it should decrease over trials',
                'Try 0% reward to see the agent stuck forever']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <PuzzleBoxLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper
                id="mcq"
                title="8. Knowledge Check"
                subtitle="10 Feedback-Based MCQs"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="MCQ Quiz"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                {(() => {
                    const data = getTopicData('unit1', 'Topic1_EarlyRoots');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic1_EarlyRoots');
                if (!data) return null;
                return (
                    <div className="space-y-6">
                        {/* Recap Section */}
                        <SectionWrapper
                            id="recap"
                            title="9. Topic Recap"
                            subtitle="Key points to remember"
                            icon={<BookOpen className="text-emerald-600" size={24} />}
                            badge="Recap"
                            badgeColor="bg-emerald-100 text-emerald-700"
                            accentColor="border-emerald-500"
                        >
                            <ul className="space-y-2">
                                {data.recap.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </SectionWrapper>

                        {/* Skill Mapping Section */}
                        <SectionWrapper
                            id="skills"
                            title="10. Skill Mapping"
                            subtitle="Competencies developed"
                            icon={<Target className="text-indigo-600" size={24} />}
                            badge="Skills"
                            badgeColor="bg-indigo-100 text-indigo-700"
                            accentColor="border-indigo-500"
                        >
                            <div className="grid gap-3">
                                {data.skillMapping.map((skill, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.skill}</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                            skill.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            skill.level === 'Intermediate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>

                        {/* Original Mastered navigation */}
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
            })()}
        </div>
    );
}
