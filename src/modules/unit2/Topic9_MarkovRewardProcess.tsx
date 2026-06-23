import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import {
    motion,
    AnimatePresence
} from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import {
    MathBlock,
    SymbolTable
} from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Coins,
    Rocket,
    Waypoints,
    Search,
    Play,
    Pause,
    RotateCcw,
    TrendingUp,
    CheckCircle2,
    AlertTriangle,
    Target
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { BellmanConvergenceVis, MRPMatrixVis } from '../../components/visualizers';
import { InlineMath } from 'react-katex';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Markov Reward Process Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Markov Reward Process Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Markov Reward Process simulator.",
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
    "🤖 [System] Initializing Markov Reward Process Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Markov Reward Process\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components ──────────────────────────────────────────────────

function MRPSimulatorLab() {
    // 3 states: Class (0), Facebook (1), Sleep (2 - Absorbing)
    const [currentState, setCurrentState] = useState(0);
    const [totalReward, setTotalReward] = useState(0);
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const gamma = 0.9;

    const states = [
        { id: 0, name: 'Class', reward: -2, icon: '📚', color: 'blue' },
        { id: 1, name: 'Facebook', reward: -1, icon: '📱', color: 'red' },
        { id: 2, name: 'Sleep', reward: 0, icon: '😴', color: 'emerald' }
    ];

    // Transition Matrix
    const P = [
        [0.4, 0.4, 0.2], // From Class -> Class, Facebook, Sleep
        [0.2, 0.8, 0.0], // From Facebook -> Class, Facebook, Sleep
        [0.0, 0.0, 1.0]  // From Sleep -> Sleep (Absorbing)
    ];

    const nextStep = () => {
        if (currentState === 2) {
            setIsPlaying(false);
            return;
        }

        const rand = Math.random();
        const probs = P[currentState];
        let nextState = 0;

        if (rand < probs[0]) nextState = 0;
        else if (rand < probs[0] + probs[1]) nextState = 1;
        else nextState = 2;

        const currentReward = states[currentState].reward;
        const discountedReward = currentReward * Math.pow(gamma, step);

        setTotalReward(prev => prev + discountedReward);
        setCurrentState(nextState);
        setStep(s => s + 1);
    };

    const reset = () => {
        setCurrentState(0);
        setTotalReward(0);
        setStep(0);
        setIsPlaying(false);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying && currentState !== 2) {
            interval = setInterval(nextStep, 1000);
        } else if (currentState === 2) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentState, step]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Waypoints size={18} className="text-primary-500" />
                        Student MRP Simulator
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Watch the agent transition through states and accumulate discounted rewards.</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <button onClick={() => setIsPlaying(!isPlaying)} disabled={currentState === 2} className={`p-2 rounded-xl text-xs font-bold transition-all ${isPlaying ? 'bg-amber-100 text-amber-600' : 'bg-primary-100 text-primary-600'} disabled:opacity-50`}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={reset} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* State Visualization */}
                <div className="relative h-48 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-around p-4 overflow-hidden">
                    {states.map((s, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: currentState === i ? 1.2 : 1,
                                opacity: currentState === i ? 1 : 0.4,
                                y: currentState === i ? -10 : 0
                            }}
                            className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl ${currentState === i ? `bg-${s.color}-100 text-${s.color}-600 shadow-lg shadow-${s.color}-500/20` : 'bg-slate-50 text-slate-400'}`}
                        >
                            <span className="text-3xl mb-1">{s.icon}</span>
                            <span className="text-[10px] font-bold uppercase">{s.name}</span>
                            <span className="text-[10px] font-mono bg-white/50 px-2 rounded-md mt-1 border border-black/5">R: {s.reward}</span>
                        </motion.div>
                    ))}

                    {currentState === 2 && (
                        <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="bg-white px-4 py-2 rounded-full font-bold text-sm shadow-xl text-slate-800">Episode Terminated</span>
                        </div>
                    )}
                </div>

                {/* Metrics Dashboard */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Time Step (t)</span>
                            <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">{step}</div>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Return (G)</span>
                            <div className="text-2xl font-black text-primary-600 mt-1">{totalReward.toFixed(2)}</div>
                        </div>
                    </div>

                    <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-900/30">
                        <div className="flex justify-between text-xs font-bold mb-2">
                            <span className="text-slate-600 dark:text-slate-400">Current Math</span>
                            <span className="text-primary-600">γ = 0.9</span>
                        </div>
                        <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                            Reward: {states[currentState].reward} <br />
                            Discount: 0.9^{step} = {Math.pow(gamma, step).toFixed(2)} <br />
                            <div className="h-px bg-primary-200 dark:bg-primary-800 my-2" />
                            Added to Return: {(states[currentState].reward * Math.pow(gamma, step)).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic9_MarkovRewardProcess() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic9_markovrewardprocess" />
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
                        const data = getTopicData('unit2', 'Topic9_MarkovRewardProcess');
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
                title="1. Adding Value to the Chain"
                subtitle="From Observer to Evaluator"
                icon={<Coins className="text-emerald-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
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
                                "An MRP is an MDP but the agent is on autopilot and just along for the ride, collecting coins."
                            </p>
                        </div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Waypoints size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
                            🗺️ The Treasure Map
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                A Markov Chain is like watching a leaf blow in the wind. You know where it is, and you know the probabilities of where it will go next. But you don't really care.
                            </p>
                            <p>
                                A <strong>Markov Reward Process (MRP)</strong> changes that. It adds a "Reward" to every state. Suddenly, moving through the chain has a score.
                            </p>
                            <p>
                                In an MRP, you are still a passive observer—you have no control over where the leaf blows. But now, every time the leaf lands on a specific spot, you either gain a gold coin or lose one. Your goal is to evaluate exactly how much gold you expect to have by the end of the journey.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The MRP Tuple">
                            An MRP is defined by 4 elements: ⟨S, P, R, γ⟩ (States, Transitions, Rewards, Discount).
                        </InfoCard>
                        <InfoCard type="tip" title="No Actions Yet">
                            Notice there is no 'A' (Actions) in the tuple. We cannot control the transitions yet.
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
                                Estimating the lifetime value of a customer as they transition between different subscription levels.
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
                            Helps analyze systems with states and rewards but without active decision-making control to establish baseline values.
                        </p>
                    </div>

                    {/* ADVANTAGES & DISADVANTAGES */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-emerald-950 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">
                                    Advantages
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Simplifies value analysis before introducing complex action spaces.
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
                                    Limited utility for interactive control tasks since it lacks action selection.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Bellman Equation for MRPs"
                subtitle="The Mathematical Heart of Evaluation"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="V(s) = \\mathbb{E}\\!\\left[G_t \\mid S_t = s\\right] = \\mathcal{R}_s + \\gamma \\sum_{s' \\in \\mathcal{S}} \\mathcal{P}_{ss'}\\, V(s')"
                        label="Bellman Equation for MRP — Value Function"
                        accent="blue"
                        explanation="The value of state s equals the immediate reward R_s plus the discounted expected value of all possible next states, weighted by their transition probabilities."
                        interpretation="This is the Bellman equation for a Markov Reward Process — an MDP without actions. It says: the value of being in state s is what you get right now (R_s) plus the discounted average value of where you might end up (γ·Σ P_{ss'}·V(s')). This recursive equation can be solved as a linear system for small state spaces."
                        motivation="The MRP Bellman equation is the simplest form of the Bellman equation — no actions, no policy choices. Understanding it builds intuition for the more complex MDP Bellman equation. It also enables policy evaluation: once we fix a policy π in an MDP, it becomes an MRP."
                        terms={[
                            { term: 'V(s)', name: 'State Value Function', meaning: 'Expected total discounted reward starting from state s and following the chain forever.', range: '\\\\mathbb{R}', example: 'V(Class)=2.5 means being in Class state is worth 2.5 expected reward.' },
                            { term: '\\\\mathcal{R}_s', name: 'Immediate Reward', meaning: 'The reward received upon entering (or leaving) state s. A fixed property of the state.', range: '\\\\mathbb{R}', example: 'R(Class)=−2 (studying is costly), R(Pass)=+10 (passing is rewarding).' },
                            { term: '\\\\gamma', name: 'Discount Factor', meaning: 'How much future rewards are valued relative to immediate ones.', range: '[0,1)', example: 'γ=0.9: a reward 10 steps away is worth 0.9^{10}≈0.35 of its face value.' },
                            { term: '\\\\mathcal{P}_{ss\'}', name: 'Transition Probability', meaning: 'Probability of moving from state s to state s\' in one step.', range: '[0,1]', example: 'P(Facebook|Class)=0.4: 40% chance of going to Facebook from Class.' },
                            { term: '\\\\sum_{s\'} \\\\mathcal{P}_{ss\'} V(s\')', name: 'Expected Next Value', meaning: 'Weighted average of next-state values. The "future" component of the Bellman equation.', range: '\\\\mathbb{R}', example: 'If P(A)=0.5,V(A)=8 and P(B)=0.5,V(B)=4: expected = 0.5×8+0.5×4=6.' },
                        ]}
                        numericalExample={{
                            setup: 'Student MRP: States={Class(R=−2), Facebook(R=−1), Sleep(R=0)}. γ=0.9. P(Class→Class)=0.4, P(Class→Facebook)=0.4, P(Class→Sleep)=0.2. V(Sleep)=0 (absorbing). V(Facebook)=−1+0.9×(0.2×0+0.8×V(Facebook)).',
                            steps: [
                                'V(Facebook): V_F = −1 + 0.9×(0.2×0 + 0.8×V_F)',
                                '  V_F = −1 + 0.72×V_F  →  0.28×V_F = −1  →  V_F = −3.57',
                                'V(Class): V_C = −2 + 0.9×(0.4×V_C + 0.4×(−3.57) + 0.2×0)',
                                '  V_C = −2 + 0.36×V_C − 1.286  →  0.64×V_C = −3.286  →  V_C = −5.13',
                            ],
                            result: 'V(Class)=−5.13, V(Facebook)=−3.57, V(Sleep)=0. Being in Class is worse than Facebook because it has higher cost AND leads to Facebook anyway.',
                        }}
                    />

                    <BellmanConvergenceVis formula="V(s) = \\mathcal{R}_s + \\gamma \\sum_{s'} \\mathcal{P}_{ss'} V(s')" label="MRP Bellman Equation" accent="violet" />

                    <MathBlock
                        formula="\\mathbf{V} = (\\mathbf{I} - \\gamma\\mathbf{P})^{-1}\\mathbf{R}"
                        label="MRP Bellman Equation — Matrix Form (Exact Solution)"
                        accent="violet"
                        explanation="The Bellman equation for all states simultaneously can be written as a linear system and solved by matrix inversion. This gives the exact value function in O(n³) time."
                        interpretation="The matrix form V = (I−γP)⁻¹R is the closed-form solution to the MRP value function. It works because the Bellman equation for a fixed policy is a linear system of equations. For small MDPs (n<1000 states), this is the fastest exact method. For large MDPs, iterative methods (value iteration) are used instead."
                        motivation="The matrix form reveals the deep connection between Markov chains and linear algebra. It also shows why γ<1 is necessary: if γ=1, the matrix (I−P) may be singular (non-invertible). The discount factor ensures (I−γP) is always invertible."
                        terms={[
                            { term: '\\\\mathbf{V}', name: 'Value Vector', meaning: 'Column vector of length n containing V(s) for every state s.', range: '\\\\mathbb{R}^n', example: 'V = [V(s₁), V(s₂), ..., V(sₙ)]ᵀ' },
                            { term: '\\\\mathbf{I}', name: 'Identity Matrix', meaning: 'n×n matrix with 1s on the diagonal and 0s elsewhere.', range: '\\\\{0,1\\\\}^{n\\\\times n}', example: 'I₂ = [[1,0],[0,1]]' },
                            { term: '(\\\\mathbf{I}-\\\\gamma\\\\mathbf{P})^{-1}', name: 'Neumann Series', meaning: 'The inverse of (I−γP). Exists and is well-defined when γ<1 because all eigenvalues of γP have magnitude < 1.', range: '\\\\mathbb{R}^{n\\\\times n}', example: '= I + γP + γ²P² + γ³P³ + ... (geometric series of matrices)' },
                            { term: '\\\\mathbf{R}', name: 'Reward Vector', meaning: 'Column vector of immediate rewards R(s) for each state.', range: '\\\\mathbb{R}^n', example: 'R = [−2, −1, 0]ᵀ for [Class, Facebook, Sleep]' },
                        ]}
                        numericalExample={{
                            setup: '2-state MRP: P=[[0.8,0.2],[0.4,0.6]], R=[5,2]ᵀ, γ=0.9.',
                            steps: [
                                'I − γP = [[1,0],[0,1]] − 0.9×[[0.8,0.2],[0.4,0.6]]',
                                '       = [[1−0.72, −0.18],[−0.36, 1−0.54]]',
                                '       = [[0.28, −0.18],[−0.36, 0.46]]',
                                'det = 0.28×0.46 − (−0.18)×(−0.36) = 0.1288 − 0.0648 = 0.064',
                                '(I−γP)⁻¹ = (1/0.064)×[[0.46,0.18],[0.36,0.28]]',
                                'V = (I−γP)⁻¹·R ≈ [42.5, 26.25]ᵀ',
                            ],
                            result: 'V(s₁)≈42.5, V(s₂)≈26.25. State 1 is more valuable because it has higher immediate reward AND better transition dynamics.',
                        }}
                    />

                    <MRPMatrixVis />

                    <MRPSimulatorLab />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram
                title="Markov Reward Process Architecture"
                description="Adding rewards to a standard Markov Chain."
                chart={`graph LR
    S1((State 1)) -->|P12| S2((State 2))
    S1 -.->|R1| Reward((+5))
    S2 -.->|R2| Reward2((-1))`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Evaluating the Stochastic Journey"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels
                    levels={[
                        {
                            level: 1,
                            title: "MRP Trajectory Demo",
                            objectives: "Observe how rewards accumulate and decay along a single sample path through the state space.",
                            instructions: [
                                "Open the 'Student MRP Simulator' in the Virtual Lab section.",
                                "Press 'Play' and watch the current state bounce between Class and Facebook.",
                                "Trace the 'Current Math' panel: show how the step count 't' increases the discount power.",
                                "Explain that even though 'Class' has a constant reward of -2, its contribution to the return shrinks every step."
                            ],
                            inputs: "Interactive MRPSimulatorLab component",
                            outputs: "Real-time state transitions and discounted reward tallies.",
                            rubrics: ["Clarity of 'Return Accumulation' explanation", "Demonstration of path stochasticity", "Student engagement"],
                            outcomes: "Students differentiate between a static state reward and its time-discounted contribution.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Bellman Update Workshop",
                            objectives: "Collaboratively solve a one-step Bellman expectation equation for a specific state.",
                            instructions: [
                                "Teacher presents a 2-state system: {A, B}.",
                                "Rewards: $R_A = +10, R_B = -5$. Transition: A goes to B (100% chance). $\gamma = 0.9$.",
                                "Guided Calculation: 'If we know $V(B) = -5$, what is $V(A)$?'",
                                "Class calculates: $V(A) = R_A + \gamma V(B) = 10 + 0.9(-5) = 10 - 4.5 = 5.5$.",
                                "Teacher asks: 'Why is $V(A)$ lower than its immediate reward?' (Because B is a bad place to go)."
                            ],
                            inputs: "2-state system graph with rewards and next-state values",
                            outputs: "Calculated Value $V(s)$ on the board",
                            rubrics: ["Correct application of Bellman equation", "Mathematical accuracy", "Classroom participation"],
                            outcomes: "Students master the technical recursive logic of state evaluation.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Treasure Map Design",
                            objectives: "Experience the transition from a Markov Chain to an MRP by layering rewards onto an existing topology.",
                            instructions: [
                                "Divide class into 4 teams. Provide them with the 'Weather Markov Chain' (Sunny, Rainy).",
                                "Task: Transform it into an MRP for a 'Coffee Shop'.",
                                "Rule: Sunny leads to +100 profit. Rainy leads to -50 profit (no customers).",
                                "Group Task: Calculate the 'Value' of a Sunny Day vs a Rainy Day over a 2-day horizon with $\gamma = 0.8$.",
                                "Teams present their 'Value Estimates' for both states."
                            ],
                            inputs: "Base Markov Chain (Weather topology)",
                            outputs: "Coffee Shop MRP Diagram with Value Annotations",
                            rubrics: ["Logical reward assignment", "Matrix-Value mapping", "Team coordination"],
                            outcomes: "Students understand that state value depends on both current reward and future transition probabilities.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Game Environment Audit",
                            objectives: "Independently evaluate a non-controllable game environment as a formal MRP.",
                            instructions: [
                                "Task: Think of a simple 'Passive' game element (e.g., A slot machine, a board game like Snakes & Ladders, or a screen saver).",
                                "Audit: Identify 3 states and their immediate rewards (e.g., State: 'On a Ladder' -> Reward: +10).",
                                "Report: Which state has the highest 'Value'? Is it the one with the highest immediate reward, or the one that leads to more rewards?",
                                "Reflect: Why is it important to know the 'Value' even if you can't change your actions? (Answer: Evaluation precedes Control)."
                            ],
                            inputs: "Passive game scenarios",
                            outputs: "Individual State Value Evaluation Report (1 page)",
                            rubrics: ["Correct state/reward identification", "Logical justification of 'Value'", "Originality"],
                            outcomes: "Students realize that 'Value' is a measure of potential, distinct from immediate gratification.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: PageRank with Taxation"
                subtitle="Google's Secret MRP"
                icon={<Rocket className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Search size={18} /> The Teleportation Fix</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Google's PageRank algorithm is famous for using a Markov Chain. But early on, users figured out how to build "link farms" (cyclic traps) to trick the algorithm and trap the Markov chain in an infinite loop.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-sm text-slate-600 dark:text-slate-400">
                        <p className="mb-4">
                            Google fixed this by introducing a <strong>Discount Factor (<InlineMath math="\gamma = 0.85" />)</strong>.
                        </p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>At any given step, the web surfer has an 85% chance of following a link (<InlineMath math="\gamma" />).</li>
                            <li>They have a 15% chance of getting bored and "teleporting" to a completely random page (<InlineMath math="1 - \gamma" />).</li>
                        </ul>
                        <p className="mt-4 italic font-bold text-indigo-500">
                            By adding <InlineMath math="\gamma" />, Google transformed the internet from a standard Markov Chain into a Markov Reward Process!
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="MRP Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the key difference between a Markov Chain and a Markov Reward Process?', a: 'An MRP introduces Rewards (\u211C) and a Discount Factor (\u03B3) to evaluate the "value" of being in different states, whereas a Markov Chain only models the transition probabilities.' },
                        { q: 'Explain the Bellman Equation for an MRP in plain English.', a: 'The value of a state is equal to the immediate reward you get for being there, plus the average of the discounted values of all the places you might end up next.' },
                        { q: 'Can an agent choose its actions in an MRP?', a: 'No. An MRP models autonomous environments. The agent is a passive observer along for the ride.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Student MRP Simulator"
                subtitle="Watch Rewards Accumulate"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <VirtualLabShell
                        title="MRP Value Estimator"
                        description="Estimate state values via Monte Carlo simulation"
                        objective="Run episodes through the MRP and watch the estimated state values converge to the true values."
                        badge="Interactive Lab"
                        tips={['More episodes = better value estimates',
                            'The Law of Large Numbers guarantees convergence']}
                        challenges={challenges} notebook={notebook} logs={logs}>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Hit Play to watch a passive agent transition through the "Student" MRP. Notice how negative rewards (Class, Facebook) reduce the total return until the agent hits the "Sleep" absorbing state, ending the episode.
                        </p>
                        <MRPSimulatorLab />
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
                    const data = getTopicData('unit2', 'Topic9_MarkovRewardProcess');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit2', 'Topic9_MarkovRewardProcess');
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
                        <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Evaluation Complete!</h3>
                                <p className="text-primary-100">
                                    You know how to evaluate the value of states when you have no control. Now, what happens when we give the agent the power to CHOOSE actions?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: STATE VALUE FUNCTION (MDP)
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
