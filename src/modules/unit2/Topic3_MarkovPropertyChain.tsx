import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock,
    SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Zap,
    TrendingUp,
    Clock,
    Briefcase,
    Layout,
    Compass,
    Map,
    Award,
    Move,
    MousePointer2,
    Layers,
    GitBranch,
    Binary,
    Brain,
    CloudSun,
    RefreshCcw,
    CheckCircle2,
    AlertTriangle,
    Target
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { MarkovPropertyVis, TransitionMatrixVis } from '../../components/visualizers';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Markov Property Chain Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Markov Property Chain Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Markov Property Chain simulator.",
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
    "🤖 [System] Initializing Markov Property Chain Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Markov Property Chain\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 3 ──────────────────────────────────────

/**
 * Interactive Markov Chain Visualizer
 */
function MarkovChainVisualizer() {
    const [state, setState] = useState<'Sunny' | 'Rainy'>('Sunny');
    const [history, setHistory] = useState<string[]>(['Sunny']);

    const transitionMatrix = {
        'Sunny': { 'Sunny': 0.8, 'Rainy': 0.2 },
        'Rainy': { 'Sunny': 0.4, 'Rainy': 0.6 }
    };

    const nextStep = () => {
        const rand = Math.random();
        const probabilities = transitionMatrix[state];
        let nextState: 'Sunny' | 'Rainy' = 'Sunny';

        if (rand < probabilities['Sunny']) {
            nextState = 'Sunny';
        } else {
            nextState = 'Rainy';
        }

        setState(nextState);
        setHistory(prev => [...prev.slice(-9), nextState]);
    };

    const reset = () => {
        setState('Sunny');
        setHistory(['Sunny']);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <CloudSun size={18} className="text-primary-500" />
                        Weather Markov Chain
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">The future depends only on the current weather.</p>
                </div>
                <button onClick={reset} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                    <RefreshCcw size={16} />
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Visual Representation */}
                <div className="relative h-48 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-around overflow-hidden">
                    <motion.div
                        animate={{ scale: state === 'Sunny' ? 1.2 : 1, opacity: state === 'Sunny' ? 1 : 0.4 }}
                        className={`p-6 rounded-2xl ${state === 'Sunny' ? 'bg-amber-100 text-amber-600 shadow-lg shadow-amber-500/20' : 'bg-slate-50 text-slate-400'}`}
                    >
                        <CloudSun size={32} />
                        <span className="block text-[10px] font-bold mt-2">SUNNY</span>
                    </motion.div>

                    <div className="flex flex-col gap-4 text-[10px] font-bold text-slate-300">
                        <div className="flex items-center gap-2">0.8 <TrendingUp size={10} className="rotate-90" /></div>
                        <div className="flex items-center gap-2"><TrendingUp size={10} className="-rotate-90" /> 0.4</div>
                    </div>

                    <motion.div
                        animate={{ scale: state === 'Rainy' ? 1.2 : 1, opacity: state === 'Rainy' ? 1 : 0.4 }}
                        className={`p-6 rounded-2xl ${state === 'Rainy' ? 'bg-blue-100 text-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-50 text-slate-400'}`}
                    >
                        <Brain size={32} />
                        <span className="block text-[10px] font-bold mt-2">RAINY</span>
                    </motion.div>
                </div>

                {/* Controls and History */}
                <div className="space-y-4">
                    <button
                        onClick={nextStep}
                        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Next Time Step (t+1)
                    </button>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Trajectory History</span>
                        <div className="flex gap-1 overflow-x-auto pb-2">
                            {history.map((h, i) => (
                                <div key={i} className={`w-6 h-6 shrink-0 rounded-md flex items-center justify-center text-[8px] font-bold ${h === 'Sunny' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {h[0]}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic3_MarkovPropertyChain() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic3_markovpropertychain" />
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
                        const data = getTopicData('unit2', 'Topic3_MarkovPropertyChain');
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
                title="1. The Forgetful Weather"
                subtitle="The Core Assumption of RL"
                icon={<Brain className="text-purple-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
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
                                "The Markov Property means having the memory of a goldfish. The future only depends on right now!"
                            </p>
                        </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-[2.5rem] border border-purple-100 dark:border-purple-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Clock size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
                            🧠 Memoryless Intelligence
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a weather system. To predict if it will rain tomorrow, do you need to know the weather for the last 100 years?
                            </p>
                            <p>
                                <strong>The Markov Property</strong> says: No. All the information you need to predict the future is contained in the <strong>present state</strong>. The past is irrelevant once you know the "now".
                            </p>
                            <p>
                                This "forgetfulness" is actually a superpower. It allows us to build complex AI models that don't need to store infinite history—they just need to understand the current situation.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Present is Sufficient">
                            The current state captures all relevant information from the past.
                        </InfoCard>
                        <InfoCard type="tip" title="Markov Chain">
                            A sequence of states where each state depends only on the previous one is called a <strong>Markov Chain</strong>.
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
                                Predicting the next weather state based solely on today's weather conditions, without storing months of historical meteorological charts.
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
                            Vital for optimizing memory usage in AI; ensuring the system needs only the current state rather than the entire historical path to act optimally.
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
                                    Dramatically simplifies state representation and minimizes memory storage requirements.
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
                                    If the environment is not memoryless, the Markov assumption fails, resulting in highly suboptimal policies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Markov Equation"
                subtitle="Defining the Property Formally"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\\mathbb{P}\\!\\left[S_{t+1} \\mid S_t\\right] = \\mathbb{P}\\!\\left[S_{t+1} \\mid S_1,\\, S_2,\\, \\ldots,\\, S_t\\right]"
                        label="The Markov Property — Conditional Independence"
                        accent="blue"
                        explanation="The probability of the next state S_{t+1} depends only on the current state S_t, not on the entire history S_1,...,S_t. The present state is a sufficient statistic for the future."
                        interpretation="This equation says: knowing the full history S_1,...,S_t gives you no more predictive power than knowing just S_t. The current state 'summarises' all relevant information from the past. This is the fundamental assumption that makes RL tractable — without it, the agent would need to store and process an ever-growing history."
                        motivation="The Markov property is what allows us to define value functions V(s) that depend only on the current state. Without it, we would need V(s_1,...,s_t) — a function of the entire history — which is computationally infeasible."
                        terms={[
                            { term: 'S_{t+1}', name: 'Next State', meaning: 'The state the environment will be in at the next time step. This is what we are predicting.', range: '\\\\mathcal{S}', example: 'Tomorrow\'s weather.' },
                            { term: 'S_t', name: 'Current State', meaning: 'The state at the present time step. Under the Markov property, this is all we need to predict S_{t+1}.', range: '\\\\mathcal{S}', example: 'Today\'s weather (Sunny/Rainy).' },
                            { term: 'S_1,\\ldots,S_t', name: 'Full History', meaning: 'The complete sequence of past states. The Markov property says this provides no additional information beyond S_t alone.', range: '\\\\mathcal{S}^t', example: 'Weather for the past 100 days — irrelevant if we know today\'s weather.' },
                            { term: '\\mathbb{P}[\\cdot\\mid\\cdot]', name: 'Conditional Probability', meaning: 'Probability of an event given some conditioning information. The Markov property says conditioning on S_t is equivalent to conditioning on the full history.', range: '[0,1]', example: 'P[Rain tomorrow | Sunny today] = P[Rain tomorrow | all past weather, Sunny today].' },
                        ]}
                        numericalExample={{
                            setup: 'Weather Markov Chain. Transition matrix: P(Sunny|Sunny)=0.8, P(Rainy|Sunny)=0.2, P(Sunny|Rainy)=0.4, P(Rainy|Rainy)=0.6.',
                            steps: [
                                'Today: Sunny. P(Sunny tomorrow) = 0.8 — regardless of past weather.',
                                'History: [Rainy, Rainy, Sunny]. P(Sunny tomorrow) = 0.8 — same answer!',
                                'History: [Sunny, Sunny, Sunny]. P(Sunny tomorrow) = 0.8 — still the same!',
                                'The Markov property holds: only today\'s state matters.',
                            ],
                            result: 'P(Sunny tomorrow | Sunny today) = 0.8, regardless of the entire weather history. The Markov property is verified.',
                        }}
                    />

                    <MarkovPropertyVis />

                    <MathBlock
                        formula="\\mathbf{P} = \\begin{pmatrix} P_{11} & P_{12} & \\cdots & P_{1n} \\\\ P_{21} & P_{22} & \\cdots & P_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ P_{n1} & P_{n2} & \\cdots & P_{nn} \\end{pmatrix}, \\quad \\sum_{j=1}^{n} P_{ij} = 1 \\;\\forall i"
                        label="Markov Transition Matrix"
                        accent="violet"
                        explanation="The complete transition dynamics of a Markov Chain encoded as an n×n matrix. Row i gives the probability distribution over next states when currently in state i. Every row must sum to 1."
                        interpretation="The transition matrix P is the complete mathematical description of a Markov Chain. Multiplying the current state distribution μ_t by P gives the next distribution: μ_{t+1} = μ_t · P. Repeated multiplication P^n gives the n-step transition probabilities. As n→∞, the distribution converges to the stationary distribution π where π·P = π."
                        motivation="The matrix form enables powerful analytical tools: eigenvalue analysis for stationary distributions, matrix powers for multi-step predictions, and linear algebra for policy evaluation. The Bellman equation for policy evaluation is a linear system that can be solved by matrix inversion."
                        terms={[
                            { term: 'P_{ij}', name: 'Matrix Entry (i,j)', meaning: 'Probability of transitioning from state i to state j in one step. Equivalent to P(s_j|s_i).', range: '[0,1]', example: 'P_{12}=0.2: 20% chance of going from state 1 to state 2.' },
                            { term: '\\sum_j P_{ij}=1', name: 'Row-Stochastic Constraint', meaning: 'Each row must sum to 1 — the agent must transition to SOME state. This makes P a row-stochastic (or right-stochastic) matrix.', range: '\\\\{1\\\\}', example: 'Row 1: P_{11}+P_{12}=0.8+0.2=1.0 ✓' },
                            { term: '\\mathbf{P}^n', name: 'n-Step Transition Matrix', meaning: 'The matrix power P^n gives the probability of transitioning from state i to state j in exactly n steps.', range: '[0,1]^{n\\\\times n}', example: 'P²_{ij} = probability of going from i to j in 2 steps.' },
                        ]}
                        numericalExample={{
                            setup: 'Weather Markov Chain. P = [[0.8, 0.2], [0.4, 0.6]] (Sunny=0, Rainy=1).',
                            steps: [
                                'P¹ = [[0.8, 0.2], [0.4, 0.6]]  ← 1-step transitions',
                                'P² = P×P = [[0.72, 0.28], [0.56, 0.44]]  ← 2-step transitions',
                                'P^∞ → [[0.667, 0.333], [0.667, 0.333]]  ← stationary distribution',
                                'Stationary: π = [0.667, 0.333] → 66.7% Sunny, 33.3% Rainy long-run',
                            ],
                            result: 'Regardless of starting state, the weather converges to 66.7% Sunny and 33.3% Rainy in the long run. This is the stationary distribution π where π·P = π.',
                        }}
                    />

                    <TransitionMatrixVis />

                    <MarkovChainVisualizer />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Markov Property Chain Architecture"
                description="The memoryless property explained."
                chart={`graph LR
    S_t_minus_1[S_{t-1}] -.-> |Ignored| S_t[S_t]
    S_t --> |Determines entirely| S_t_plus_1[S_{t+1}]
    Note over S_t, S_t_plus_1: P(S_{t+1} | S_t) = P(S_{t+1} | S_1, ..., S_t)`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Testing the Memoryless Property"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Markov Chain Demo",
                            objectives: "Observe how a sequence of states is generated using only the transition probabilities of the current state.",
                            instructions: [
                                "Open the 'Weather Markov Chain' in the Virtual Lab section.",
                                "Run 10 steps and watch the 'Trajectory History' grow.",
                                "Stop at a 'Rainy' state and ask the class: 'Does the probability of the next state change if the last 5 days were Sunny?'",
                                "Explain that the 0.4 probability of Sunny remains constant, proving the property $P(S_{t+1}|S_t)$."
                            ],
                            inputs: "Interactive MarkovChainVisualizer component",
                            outputs: "Visual weather trajectory and state toggle animations.",
                            rubrics: ["Clarity of 'Memoryless' explanation", "Demonstration of fixed probabilities", "Student engagement"],
                            outcomes: "Students visually confirm that the past path does not alter the current transition logic.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Multi-Step Matrix Workshop",
                            objectives: "Collaboratively calculate the probability of the state 'the day after tomorrow' using matrix multiplication.",
                            instructions: [
                                "Teacher presents the matrix $P = [[0.8, 0.2], [0.4, 0.6]]$.",
                                "Scenario: Today is Sunny ($S_0 = [1, 0]$).",
                                "Task: Find $P(S_2)$ (the weather in two days).",
                                "Guided Calculation: $P^2 = P \times P$. Calculate the top-left entry: $(0.8 \times 0.8) + (0.2 \times 0.4) = 0.64 + 0.08 = 0.72$.",
                                "Class completes the full $2 \times 2$ matrix for $P^2$ on the board."
                            ],
                            inputs: "2x2 Transition Matrix data",
                            outputs: "Completed 2-step Transition Matrix ($P^2$)",
                            rubrics: ["Mathematical accuracy", "Understanding of state-to-state flow", "Classroom participation"],
                            outcomes: "Students learn how to project Markovian systems into the future mathematically.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Markov Detective",
                            objectives: "Experience the analytical process of determining if a system's current representation satisfies the Markov property.",
                            instructions: [
                                "Divide class into 4 teams. Each team gets a system: 1. A stock market price, 2. A person's hunger level, 3. A car's position on a highway, 4. A player's mood in a game.",
                                "Team Task: Is this system Markovian if we ONLY look at the current value?",
                                "Example: If I know the car is at 50km/h, do I know where it will be in 1 second? (No, I need its acceleration history).",
                                "Teams must propose an 'Augmented State' to make it Markovian (e.g., adding 'Velocity' or 'Trend')."
                            ],
                            inputs: "Real-world dynamic systems",
                            outputs: "System Analysis Poster: (Raw State -> Hidden History -> Markovian State)",
                            rubrics: ["Correct identification of history-dependence", "Logic of state augmentation", "Team coordination"],
                            outcomes: "Students develop the intuition needed to design 'Full' state representations for RL agents.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "History to State Audit",
                            objectives: "Independently transform a personal memory-dependent decision into a Markovian mathematical state.",
                            instructions: [
                                "Task: Think of a decision you make that depends on history (e.g., 'What should I eat for dinner?').",
                                "Usually, this is non-Markovian because it depends on what you ate for the last 3 days.",
                                "Rewrite this as a Markovian state: Create a 'State Vector' that includes the last 3 meals as features.",
                                "State = [Current Hunger, Meal_t-1, Meal_t-2, Meal_t-3].",
                                "Self-Evaluation: Does this new 'Augmented State' now contain all information needed to predict tonight's dinner?"
                            ],
                            inputs: "Personal meal history or habit",
                            outputs: "Individual 'Augmented State' Definition Note",
                            rubrics: ["Technical accuracy of state vector", "Explanation of 'History Folding'", "Originality"],
                            outcomes: "Students internalize that any system can become Markovian if the state is rich enough.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Next-Word Predictor"
                subtitle="The Simplest Markov Model"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><GitBranch size={18} /> Building a Text Generator</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A "Bigram" model is a Markov Chain for text. It predicts the next word based <strong>only</strong> on the current word.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400">Input Sequence</span>
                            <p className="text-sm font-mono mt-1">"The AI is ..."</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-bold text-emerald-500">Markov Prediction</span>
                            <p className="text-sm font-mono mt-1">"Learning" (Prob: 0.6)</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Markov Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'State the Markov Property.', a: 'A state satisfies the Markov Property if the future is independent of the past given the present.' },
                        { q: 'Define a Markov Chain.', a: 'A stochastic process where the transition from one state to another depends only on the current state.' },
                        { q: 'Why is the Markov Property important in RL?', a: 'It allows the agent to make optimal decisions based only on the current state representation without needing a full history.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Markov Chain Visualizer"
                subtitle="Experience State Transitions"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Markov Property Tester"
                    description="Test the memoryless assumption"
                    objective="Compare predictions using full history vs only current state. Observe when the Markov assumption holds."
                    badge="Interactive Lab"
                    tips={['The current state must contain all information needed for future predictions',
                'If the Markov property fails, you need a POMDP instead']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Interact with a 2-state Markov Chain. Observe how the system jumps between <strong>Sunny</strong> and <strong>Rainy</strong> based on fixed probabilities.
                    </p>
                    <MarkovChainVisualizer />
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
                    const data = getTopicData('unit2', 'Topic3_MarkovPropertyChain');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit2', 'Topic3_MarkovPropertyChain');
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
                                <h3 className="text-3xl font-black italic">The Future is Now!</h3>
                                <p className="text-primary-100">
                                    You've understood how Markov Chains work. Ready to add "Rewards" and see how agents learn values?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: MARKOV REWARD PROCESS
                                </button>
                                <button className="px-10 py-4 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                                    REVIEW PROPERTY
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
