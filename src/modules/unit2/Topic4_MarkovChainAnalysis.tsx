import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import {
    motion
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
    TrendingUp,
    GitMerge,
    Search,
    Target,
    Network,
    Layers,
    BarChart4,
    Play,
    Pause,
    RotateCcw,
    Briefcase,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { StationaryDistVis, MatrixPowerVis } from '../../components/visualizers';
import { InlineMath } from 'react-katex';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Markov Chain Analysis Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Markov Chain Analysis Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Markov Chain Analysis simulator.",
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
    "🤖 [System] Initializing Markov Chain Analysis Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Markov Chain Analysis\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components ──────────────────────────────────────────────────

/**
 * Interactive Lab: Stationary Distribution Convergence
 */
function ConvergenceLab() {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Transition Matrix: 
    // P = [[0.8, 0.2], [0.4, 0.6]]
    // Initial State: [1, 0] (Start 100% Sunny)

    const [dist, setDist] = useState([1.0, 0.0]);

    const P = [
        [0.8, 0.2],
        [0.4, 0.6]
    ];

    const nextStep = () => {
        setDist(prev => {
            const next0 = prev[0] * P[0][0] + prev[1] * P[1][0];
            const next1 = prev[0] * P[0][1] + prev[1] * P[1][1];
            return [next0, next1];
        });
        setStep(s => s + 1);
    };

    const reset = () => {
        setDist([1.0, 0.0]);
        setStep(0);
        setIsPlaying(false);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying && step < 20) {
            interval = setInterval(() => {
                nextStep();
            }, 500);
        } else if (step >= 20) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, step]);

    const chartData = [
        { name: 'Sunny (State 1)', prob: parseFloat((dist[0] * 100).toFixed(1)), color: '#f59e0b' },
        { name: 'Rainy (State 2)', prob: parseFloat((dist[1] * 100).toFixed(1)), color: '#3b82f6' }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <TrendingUp size={18} className="text-primary-500" />
                        State Probability Convergence
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Watch the probabilities settle into a "Stationary Distribution".</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`p-2 rounded-xl text-xs font-bold transition-all ${isPlaying ? 'bg-amber-100 text-amber-600' : 'bg-primary-100 text-primary-600'}`}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={nextStep} disabled={isPlaying} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                        <TrendingUp size={16} />
                    </button>
                    <button onClick={reset} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <span>Time Step (t)</span>
                        <span className="text-xl text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">{step}</span>
                    </div>

                    <div className="space-y-3">
                        {chartData.map((d, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{d.name}</span>
                                    <span className="text-xs font-black" style={{ color: d.color }}>{d.prob}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={false}
                                        animate={{ width: `${d.prob}%` }}
                                        transition={{ type: 'spring', bounce: 0 }}
                                        className="h-full"
                                        style={{ backgroundColor: d.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-500 italic">
                        {step > 15 ? "Notice how the probabilities stop changing? The system has reached its Stationary Distribution (approx 66.7% Sunny, 33.3% Rainy)." : "Probabilities are shifting as time progresses..."}
                    </div>
                </div>

                <div className="h-48 w-full bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} hide />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="prob" radius={[6, 6, 0, 0]} animationDuration={500}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic4_MarkovChainAnalysis() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic4_markovchainanalysis" />
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
                        const data = getTopicData('unit2', 'Topic4_MarkovChainAnalysis');
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
                title="1. The Equilibrium Effect"
                subtitle="Where Does the Future Settle?"
                icon={<BookOpen className="text-blue-600" size={24} />}
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
                                "Analyzing a Markov Chain is like predicting the weather: mostly sunny, followed by a 30% chance of an existential crisis."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌊 A Drop of Ink in Water
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine dropping a drop of blue ink into a glass of water. At first, the ink is concentrated in one spot. It moves randomly (stochastically).
                            </p>
                            <p>
                                But if you wait long enough, the water turns a uniform light blue. The ink molecules are still moving randomly, but the <em>overall distribution</em> of color has stopped changing. It has reached an <strong>Equilibrium</strong>.
                            </p>
                            <p>
                                Analyzing a Markov Chain is exactly like this. We want to know: "If we let this system run for 1,000 steps, what is the long-term probability of being in any specific state?" This "settled" probability is called the <strong>Stationary Distribution</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Steady State">
                            In a stationary distribution, the probability of being in a state doesn't change from step <InlineMath math="t" /> to <InlineMath math="t+1" />.
                        </InfoCard>
                        <InfoCard type="tip" title="n-Step Transition">
                            To find out where we are after <InlineMath math="n" /> steps, we multiply the transition matrix by itself <InlineMath math="n" /> times (<InlineMath math="P^n" />).
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
                                Modeling the long-term customer churn of a subscription platform over years using stationary state probabilities.
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
                            Crucial for estimating the long-term steady-state distribution and predicting convergence times of dynamic systems.
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
                                    Provides powerful analytical tools to forecast asymptotic system behaviors and stability points.
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
                                    Calculating stationary distributions is computationally intensive and relies on highly idealized system stability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Math of Convergence"
                subtitle="n-Step Transitions & Stationary Distributions"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\\boldsymbol{\\pi}\\mathbf{P} = \\boldsymbol{\\pi}, \\quad \\sum_{i} \\pi_i = 1"
                        label="Stationary Distribution — Fixed-Point Equation"
                        accent="blue"
                        explanation="The row vector π is the stationary distribution if multiplying it by the transition matrix P returns the same vector π. It is the fixed point of the Markov Chain."
                        interpretation="The stationary distribution π answers: 'In the long run, what fraction of time does the system spend in each state?' Once reached, the distribution no longer changes — like ink fully dissolved in water. For an ergodic chain, π is unique and every starting distribution converges to it."
                        motivation="Stationary distributions are used in Google's PageRank (importance of web pages), MCMC sampling in Bayesian inference, and long-run customer behaviour modelling. Without this equation, we cannot predict the asymptotic behaviour of any Markov system."
                        terms={[
                            { term: '\\boldsymbol{\\pi}', name: 'Stationary Distribution', meaning: 'A row probability vector where π_i is the long-run fraction of time spent in state i. Must be non-negative and sum to 1.', range: '[0,1]^n', example: 'π = [0.667, 0.333] means 66.7% Sunny, 33.3% Rainy in the long run.' },
                            { term: '\\mathbf{P}', name: 'Transition Matrix', meaning: 'The n×n row-stochastic matrix where P_ij = P(next state = j | current state = i).', range: '[0,1]^{n\\\\times n}', example: 'P = [[0.8,0.2],[0.4,0.6]] for the weather chain.' },
                            { term: '\\boldsymbol{\\pi}\\mathbf{P}=\\boldsymbol{\\pi}', name: 'Fixed-Point Condition', meaning: 'Applying one step of the Markov Chain to π leaves it unchanged. This is the definition of stationarity.', range: '\\\\text{Equation}', example: '[0.667, 0.333]·[[0.8,0.2],[0.4,0.6]] = [0.667, 0.333] ✓' },
                            { term: '\\sum_i \\pi_i = 1', name: 'Normalisation Constraint', meaning: 'The probabilities must sum to 1 — the system must be in some state at all times.', range: '\\\\{1\\\\}', example: '0.667 + 0.333 = 1.000 ✓' },
                        ]}
                        numericalExample={{
                            setup: 'Weather chain: P = [[0.8,0.2],[0.4,0.6]]. Find stationary distribution π = [π₁, π₂].',
                            steps: [
                                'From πP = π: 0.8π₁ + 0.4π₂ = π₁  →  −0.2π₁ + 0.4π₂ = 0',
                                'Simplify: π₁ = 2π₂',
                                'Normalise: π₁ + π₂ = 1  →  2π₂ + π₂ = 1  →  π₂ = 1/3',
                                'Therefore: π₁ = 2/3 ≈ 0.667,  π₂ = 1/3 ≈ 0.333',
                            ],
                            result: 'π = [0.667, 0.333]. Long-run: 66.7% Sunny, 33.3% Rainy — regardless of starting state.',
                        }}
                    />

                    <StationaryDistVis />

                    <MathBlock
                        formula="\\left(\\mathbf{P}^n\\right)_{ij} = \\Pr(X_{t+n} = j \\mid X_t = i)"
                        label="n-Step Transition Probability — Matrix Power"
                        accent="violet"
                        explanation="The (i,j) entry of the matrix P raised to the power n gives the probability of being in state j exactly n steps after starting in state i."
                        interpretation="Matrix powers are the computational engine of Markov Chain analysis. P¹ gives 1-step probabilities, P² gives 2-step, P^∞ gives the stationary distribution (all rows become identical). This is how we answer: 'If it is Sunny today, what is the probability it will be Sunny in 10 days?'"
                        motivation="Without matrix powers, we would need to simulate millions of trajectories to estimate multi-step probabilities. The matrix power formula gives exact answers in O(n³) time using standard linear algebra libraries."
                        terms={[
                            { term: '\\mathbf{P}^n', name: 'n-th Matrix Power', meaning: 'The transition matrix multiplied by itself n times. Gives exact n-step transition probabilities.', range: '[0,1]^{n\\\\times n}', example: 'P² = P·P gives 2-step probabilities.' },
                            { term: '(\\mathbf{P}^n)_{ij}', name: 'Matrix Entry (i,j)', meaning: 'The probability of transitioning from state i to state j in exactly n steps.', range: '[0,1]', example: '(P²)_{11} = probability of being Sunny in 2 days given Sunny today.' },
                            { term: 'X_{t+n}', name: 'State at t+n', meaning: 'The random variable representing the state n steps in the future.', range: '\\\\mathcal{S}', example: 'X_{t+10} = weather 10 days from now.' },
                        ]}
                        numericalExample={{
                            setup: 'P = [[0.8,0.2],[0.4,0.6]]. Compute P² and find P(Sunny in 2 days | Sunny today).',
                            steps: [
                                'P² = P·P:',
                                '(P²)₁₁ = 0.8×0.8 + 0.2×0.4 = 0.64 + 0.08 = 0.72',
                                '(P²)₁₂ = 0.8×0.2 + 0.2×0.6 = 0.16 + 0.12 = 0.28',
                                'P² = [[0.72, 0.28], [0.56, 0.44]]',
                            ],
                            result: 'P(Sunny in 2 days | Sunny today) = 0.72. As n→∞, both rows converge to [0.667, 0.333].',
                        }}
                    />

                    <MatrixPowerVis />

                    <ConvergenceLab />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram
                title="Markov Chain Analysis Architecture"
                description="Analyzing sequence probabilities in a Markov Chain."
                chart={`graph TD
    StateA((A)) -->|0.7| StateA
    StateA -->|0.3| StateB((B))
    StateB -->|0.5| StateA
    StateB -->|0.5| StateB`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Analyzing Long-Term Dynamics"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels
                    levels={[
                        {
                            level: 1,
                            title: "Convergence Simulator Demo",
                            objectives: "Observe how a distribution settles into a stationary state regardless of the initial starting point.",
                            instructions: [
                                "Open the 'Convergence Simulator' in the Virtual Lab section.",
                                "Press Play and watch the 'Sunny' probability drop from 100% to ~66.7%.",
                                "Explain that this 66.7% is the value where $\pi P = \pi$ holds.",
                                "Ask: 'What would happen if we started 100% Rainy?' (Predict convergence to the same point)."
                            ],
                            inputs: "Interactive ConvergenceLab component",
                            outputs: "Real-time probability bar charts showing equilibrium.",
                            rubrics: ["Clarity of 'Equilibrium' explanation", "Demonstration of convergence speed", "Student engagement"],
                            outcomes: "Students identify the stationary distribution as the fixed point of the system.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Ergodic Audit Workshop",
                            objectives: "Collaboratively classify Markov Chains as Ergodic or Non-Ergodic based on their topology.",
                            instructions: [
                                "Teacher draws three state-transition diagrams on the board.",
                                "Diagram A: Two disconnected groups (Irreducible check).",
                                "Diagram B: A strict A->B->A cycle (Aperiodic check).",
                                "Diagram C: A fully connected network.",
                                "Guided Discussion: 'Which one will have a unique stationary distribution?'",
                                "Students identify Diagram C as Ergodic and explain why A and B fail."
                            ],
                            inputs: "State-transition topology diagrams",
                            outputs: "Classification of 3 chains (Irreducible, Aperiodic, Ergodic)",
                            rubrics: ["Correct use of terminology", "Logical justification", "Classroom participation"],
                            outcomes: "Students master the theoretical requirements for a Markov Chain to settle down.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Mini-PageRank Simulation",
                            objectives: "Experience the fundamental logic of Google's search algorithm using a manual Markov Chain process.",
                            instructions: [
                                "Divide class into groups of 3 (Webpage A, B, and C).",
                                "A links to B. B links to A and C. C links to A.",
                                "Each group starts with 100 'Importance Points' on Page A.",
                                "Task: Perform 3 steps of point distribution. (e.g., in step 1, A gives all 100 to B).",
                                "Groups track the 'Score Distribution' after 3 steps and identify the 'Most Important' page."
                            ],
                            inputs: "3-page link topology",
                            outputs: "Score Distribution Table [A, B, C] after 3 iterations",
                            rubrics: ["Mathematical accuracy of flow", "Technical matrix mapping", "Team coordination"],
                            outcomes: "Students understand that the Stationary Distribution represents the 'Relative Importance' of states.",
                            time: "20 Mins",
                            materials: ["Large paper sheets", "Score markers"]
                        },
                        {
                            level: 4,
                            title: "The n-Step Calculation Audit",
                            objectives: "Independently calculate the exact probability of a state transition after 2 and 3 steps.",
                            instructions: [
                                "Task: Given $P = [[0.9, 0.1], [0.5, 0.5]]$.",
                                "Calculate $P^2$ manually on paper.",
                                "If starting in state 2, what is the probability of being in state 1 after 2 steps?",
                                "Estimate $P^3$ and observe if the values are moving closer together or staying the same.",
                                "Reflect: How many steps does it take for this matrix to 'forget' its starting state?"
                            ],
                            inputs: "2x2 Transition Matrix P",
                            outputs: "Individual calculation report with $P^2$ values",
                            rubrics: ["Matrix multiplication accuracy", "Correct cell interpretation", "Depth of reflection"],
                            outcomes: "Students gain technical proficiency in calculating multi-step Markovian trajectories.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: PageRank Algorithm"
                subtitle="How Google Uses Markov Chains"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Search size={18} /> The Billion Dollar Algorithm</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Google's original <strong>PageRank</strong> algorithm is essentially finding the stationary distribution of a massive Markov Chain.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Network size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold uppercase">The States</div>
                            <p className="text-[10px] text-slate-500 mt-1">Every webpage on the internet is a state.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <GitMerge size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold uppercase">The Transitions</div>
                            <p className="text-[10px] text-slate-500 mt-1">Hyperlinks between pages define the probabilities.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Target size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold uppercase">The Stationary Dist.</div>
                            <p className="text-[10px] text-slate-500 mt-1">The final probabilities = The Page's "Importance Score".</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Analytical Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is a Stationary Distribution?', a: 'A probability distribution over states that remains unchanged as time progresses in a Markov Chain (πP = π).' },
                        { q: 'What is an Ergodic Markov Chain?', a: 'A Markov chain that is both irreducible (any state can reach any other) and aperiodic (does not get trapped in cycles). It guarantees a unique stationary distribution.' },
                        { q: 'How do you find the probability of transitioning from state i to j in 3 steps?', a: 'By raising the transition matrix P to the power of 3 (P³) and looking at the (i, j) entry.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Convergence Simulator"
                subtitle="Watch the Probabilities Settle"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <VirtualLabShell
                        title="Chain Convergence Simulator"
                        description="Watch state probabilities reach steady state"
                        objective="Run the Markov Chain forward and observe the distribution converge to the stationary distribution."
                        badge="Interactive Lab"
                        tips={['After ~15 steps the probabilities stop changing — this is the stationary distribution',
                            'Try starting from different initial states — they all converge to the same distribution']}
                        challenges={challenges} notebook={notebook} logs={logs}>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            This system starts 100% in the Sunny state. Press play to watch how the state probabilities evolve over time. Notice that after about 10-15 steps, the probabilities stop changing—they have reached the <strong>Stationary Distribution</strong>.
                        </p>
                        <ConvergenceLab />
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
                    const data = getTopicData('unit2', 'Topic4_MarkovChainAnalysis');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit2', 'Topic4_MarkovChainAnalysis');
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
                                <h3 className="text-3xl font-black italic">Analysis Complete!</h3>
                                <p className="text-primary-100">
                                    You've unlocked the secrets of long-term predictions. Next, let's explore Markov Models in more detail.
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: MARKOV MODEL
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
