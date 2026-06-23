import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
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
    Grid3X3,
    ArrowRight,
    Zap,
    Target,
    Briefcase,
    Activity,
    CheckCircle2,
    XCircle,
    AlertTriangle
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { TransitionMatrixVis, ChapmanKolmogorovVis } from '../../components/visualizers';
import { InlineMath } from 'react-katex';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Markov Matrix Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Markov Matrix Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Markov Matrix simulator.",
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
    "🤖 [System] Initializing Markov Matrix Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Markov Matrix\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components ──────────────────────────────────────────────────

/**
 * Interactive Lab: Matrix Validator and Power Calculator
 */
function MatrixPowerLab() {
    const [matrix, setMatrix] = useState([
        [0.8, 0.2],
        [0.4, 0.6]
    ]);
    const [power, setPower] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (r: number, c: number, val: string) => {
        const num = parseFloat(val);
        const newMatrix = [...matrix];
        newMatrix[r] = [...newMatrix[r]];

        if (!isNaN(num)) {
            newMatrix[r][c] = num;
        }

        setMatrix(newMatrix);

        // Validate
        let hasError = false;
        for (let i = 0; i < 2; i++) {
            const sum = newMatrix[i].reduce((a, b) => a + b, 0);
            if (Math.abs(sum - 1.0) > 0.001) {
                setError(`Row ${i + 1} sum is ${sum.toFixed(2)}. It must be exactly 1.0.`);
                hasError = true;
            }
        }
        if (!hasError) setError(null);
    };

    const multiplyMatrix = (A: number[][], B: number[][]) => {
        return [
            [
                A[0][0] * B[0][0] + A[0][1] * B[1][0],
                A[0][0] * B[0][1] + A[0][1] * B[1][1]
            ],
            [
                A[1][0] * B[0][0] + A[1][1] * B[1][0],
                A[1][0] * B[0][1] + A[1][1] * B[1][1]
            ]
        ];
    };

    let resultMatrix = [...matrix];
    if (!error) {
        for (let i = 1; i < power; i++) {
            resultMatrix = multiplyMatrix(resultMatrix, matrix);
        }
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">

                {/* Input Matrix */}
                <div className="flex-1 space-y-4 w-full">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Transition Matrix P</h5>
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 relative">
                        <div className="absolute top-0 bottom-0 left-4 w-2 border-l-2 border-t-2 border-b-2 border-slate-300 dark:border-slate-600 rounded-l-lg" />
                        <div className="absolute top-0 bottom-0 right-4 w-2 border-r-2 border-t-2 border-b-2 border-slate-300 dark:border-slate-600 rounded-r-lg" />

                        <div className="flex flex-col gap-4 px-8 relative z-10">
                            {matrix.map((row, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="text-[10px] text-slate-400 font-bold w-4 text-right">R{i + 1}</div>
                                    {row.map((cell, j) => (
                                        <input
                                            key={j}
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="1"
                                            value={cell}
                                            onChange={(e) => handleInputChange(i, j, e.target.value)}
                                            className="w-20 text-center font-mono p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    ))}
                                    <div className={`text-[10px] font-bold w-8 ${Math.abs(row.reduce((a, b) => a + b, 0) - 1.0) < 0.001 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        = {row.reduce((a, b) => a + b, 0).toFixed(1)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {error && (
                        <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-center font-bold flex items-center justify-center gap-2">
                            <XCircle size={14} /> {error}
                        </div>
                    )}
                </div>

                {/* Power Controls */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Power (n)</span>
                    <input
                        type="range"
                        min="1" max="50"
                        value={power}
                        onChange={(e) => setPower(parseInt(e.target.value))}
                        disabled={!!error}
                        className="w-32 accent-primary-600"
                    />
                    <div className="text-xl font-black text-primary-600 bg-primary-50 px-4 py-2 rounded-xl">n = {power}</div>
                </div>

                {/* Result Matrix */}
                <div className={`flex-1 space-y-4 w-full transition-opacity ${error ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Result P^{power}</h5>
                    <div className="p-6 bg-primary-50 dark:bg-primary-900/10 rounded-2xl shadow-sm border border-primary-200 dark:border-primary-900/30 relative">
                        <div className="absolute top-0 bottom-0 left-4 w-2 border-l-2 border-t-2 border-b-2 border-primary-300 dark:border-primary-600 rounded-l-lg" />
                        <div className="absolute top-0 bottom-0 right-4 w-2 border-r-2 border-t-2 border-b-2 border-primary-300 dark:border-primary-600 rounded-r-lg" />

                        <div className="flex flex-col gap-4 px-8 relative z-10 text-center font-mono">
                            {resultMatrix.map((row, i) => (
                                <div key={i} className="flex gap-4 justify-center">
                                    {row.map((cell, j) => (
                                        <div key={j} className="w-20 p-2 text-primary-700 dark:text-primary-300 font-bold">
                                            {cell.toFixed(3)}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-sm text-slate-600 dark:text-slate-400 italic text-center">
                Increase the power (n) to see how the matrix converges to the stationary distribution. When all rows become identical, the system has reached equilibrium!
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic6_MarkovMatrix() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic6_markovmatrix" />
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
                        const data = getTopicData('unit2', 'Topic6_MarkovMatrix');
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
                title="1. The Transition Grid"
                subtitle="Organizing Chaos into Rows and Columns"
                icon={<Grid3X3 className="text-blue-600" size={24} />}
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
                                "A grid of numbers that tells you exactly how likely you are to transition from 'Productive' to 'Watching Cat Videos'."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Activity size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            📊 Taming the Probabilities
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                If you only have two states (Sunny, Rainy), drawing circles and arrows is easy. But what if you are Google, trying to map the transitions between <strong>10 billion web pages</strong>?
                            </p>
                            <p>
                                You can't draw 10 billion circles. You need a data structure. A grid. A <strong>Matrix</strong>.
                            </p>
                            <p>
                                A Markov Matrix (or Transition Matrix) is simply a spreadsheet where the rows represent "Where you are NOW" and the columns represent "Where you go NEXT". By organizing probabilities this way, we allow computers to calculate billions of futures using linear algebra in milliseconds.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Matrix Size">
                            If an environment has N states, its transition matrix will always be an N × N square.
                        </InfoCard>
                        <InfoCard type="tip" title="Rows vs Columns">
                            Row <InlineMath math="i" />, Column <InlineMath math="j" /> tells you the probability of jumping from state <InlineMath math="i" /> to state <InlineMath math="j" />.
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
                                Simulating step-by-step probability distributions in a user's web browsing trajectory across multiple linked domains.
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
                            Essential for mathematically computing the multi-step reachability probabilities of a system using matrix powers.
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
                                    High computational efficiency using optimized matrix algebra libraries.
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
                                    Storage and computation scale quadratically with the number of states (O(|S|^2)).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Stochastic Properties"
                subtitle="The Rules of the Matrix"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\\mathbf{P} = \\begin{pmatrix} P_{11} & P_{12} & \\cdots & P_{1n} \\\\ P_{21} & P_{22} & \\cdots & P_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ P_{n1} & P_{n2} & \\cdots & P_{nn} \\end{pmatrix}, \\quad P_{ij} \\geq 0,\\quad \\sum_{j=1}^{n} P_{ij} = 1\\;\\forall i"
                        label="Right-Stochastic Transition Matrix — Full Definition"
                        accent="blue"
                        explanation="A Markov transition matrix P is an n×n matrix where entry P_ij is the probability of transitioning from state i to state j. Every entry must be non-negative and every row must sum to exactly 1."
                        interpretation="The matrix P is the complete mathematical description of a Markov Chain's dynamics. Row i is a probability distribution over all possible next states when currently in state i. The 'right-stochastic' property (rows sum to 1) ensures the matrix represents a valid probability distribution at every step."
                        motivation="The matrix form enables powerful computational tools: matrix multiplication for multi-step predictions, eigenvalue decomposition for stationary distributions, and linear algebra for policy evaluation. Without this structure, we cannot apply the rich toolkit of linear algebra to Markov systems."
                        terms={[
                            { term: 'P_{ij}', name: 'Transition Probability', meaning: 'Probability of moving from state i (row) to state j (column) in one step.', range: '[0,1]', example: 'P₁₂=0.2: 20% chance of going from state 1 to state 2.' },
                            { term: 'P_{ij} \\\\geq 0', name: 'Non-negativity', meaning: 'Probabilities cannot be negative. Every entry must be zero or positive.', range: '[0,1]', example: 'P₂₃=−0.1 is INVALID. Probabilities are always ≥ 0.' },
                            { term: '\\\\sum_j P_{ij}=1', name: 'Row-Sum Constraint', meaning: 'Each row must sum to exactly 1.0. The agent must transition to SOME state — it cannot disappear.', range: '\\\\{1\\\\}', example: 'Row 1: 0.8+0.2=1.0 ✓. Row 1: 0.6+0.6=1.2 ✗ INVALID.' },
                            { term: 'n', name: 'Number of States', meaning: 'The dimension of the square matrix. An n-state system has an n×n transition matrix.', range: '\\\\mathbb{Z}^+', example: 'Weather (2 states): 2×2 matrix. Traffic light (3 states): 3×3 matrix.' },
                        ]}
                        numericalExample={{
                            setup: 'Validate this 3×3 matrix: P = [[0.7, 0.2, 0.1], [0.3, 0.5, 0.2], [0.0, 0.4, 0.6]]',
                            steps: [
                                'Row 1: 0.7+0.2+0.1 = 1.0 ✓  All entries ≥ 0 ✓',
                                'Row 2: 0.3+0.5+0.2 = 1.0 ✓  All entries ≥ 0 ✓',
                                'Row 3: 0.0+0.4+0.6 = 1.0 ✓  All entries ≥ 0 ✓',
                                'All rows sum to 1, all entries non-negative → VALID Markov Matrix',
                            ],
                            result: 'P is a valid right-stochastic matrix. It can be used as a Markov transition matrix.',
                        }}
                    />
                    <TransitionMatrixVis />

                    <MathBlock
                        formula="\\mathbf{P}^{(m+n)} = \\mathbf{P}^{(m)} \\cdot \\mathbf{P}^{(n)} \\quad \\text{(Chapman-Kolmogorov Equation)}"
                        label="Chapman-Kolmogorov Equation — Matrix Composition"
                        accent="violet"
                        explanation="The m+n step transition matrix equals the product of the m-step and n-step matrices. This allows computing long-range probabilities by composing shorter-range ones."
                        interpretation="The Chapman-Kolmogorov equation is the mathematical justification for using matrix powers to compute multi-step probabilities. It says: to go from state i to state j in m+n steps, you must pass through some intermediate state k after m steps. Summing over all possible k gives the total probability."
                        motivation="This equation is the foundation of dynamic programming in MDPs. The Bellman equation is essentially the Chapman-Kolmogorov equation applied to value functions. It allows breaking long-horizon problems into shorter sub-problems."
                        terms={[
                            { term: '\\\\mathbf{P}^{(m+n)}', name: 'm+n Step Matrix', meaning: 'Transition probabilities for exactly m+n steps.', range: '[0,1]^{n\\\\times n}', example: 'P^(3) = P^(1)·P^(2) = P·P².' },
                            { term: '\\\\mathbf{P}^{(m)}\\\\cdot\\\\mathbf{P}^{(n)}', name: 'Matrix Product', meaning: 'Standard matrix multiplication. The (i,j) entry of the product sums over all intermediate states k.', range: '[0,1]^{n\\\\times n}', example: '(P·P)_ij = Σ_k P_ik · P_kj.' },
                        ]}
                        numericalExample={{
                            setup: 'P = [[0.8,0.2],[0.4,0.6]]. Verify Chapman-Kolmogorov: P^(2) = P^(1)·P^(1).',
                            steps: [
                                'P^(2)₁₁ = P₁₁·P₁₁ + P₁₂·P₂₁ = 0.8×0.8 + 0.2×0.4 = 0.64+0.08 = 0.72',
                                'P^(2)₁₂ = P₁₁·P₁₂ + P₁₂·P₂₂ = 0.8×0.2 + 0.2×0.6 = 0.16+0.12 = 0.28',
                                'P^(2) = [[0.72, 0.28], [0.56, 0.44]]',
                                'Verify: P^(3) = P^(2)·P^(1) = [[0.688,0.312],[0.624,0.376]]',
                            ],
                            result: 'Chapman-Kolmogorov verified. P^(n) converges to [[0.667,0.333],[0.667,0.333]] as n→∞.',
                        }}
                    />
                    <ChapmanKolmogorovVis />

                    <MatrixPowerLab />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram
                title="Markov Matrix Architecture"
                description="State transition probability matrix."
                chart={`graph LR
    P[Transition Matrix P] --> Row1[Row 1: Probabilities from State 1]
    P --> Row2[Row 2: Probabilities from State 2]
    Note over Row1: Sum of probabilities = 1
    Note over Row2: Sum of probabilities = 1`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="The Rules of Stochastic Grids"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels
                    levels={[
                        {
                            level: 1,
                            title: "Matrix Validator Demo",
                            objectives: "Verify the row-sum constraint and non-negativity property of a Markov Matrix.",
                            instructions: [
                                "Open the 'Matrix Power Calculator' in the Virtual Lab section.",
                                "Intentionally enter 0.6 and 0.6 in Row 1 to trigger the validation error.",
                                "Explain why 1.2 is impossible (you can't have 120% probability of transitions).",
                                "Adjust the values to 0.7 and 0.3 to show a valid 'Right Stochastic' row."
                            ],
                            inputs: "Interactive MatrixPowerLab component",
                            outputs: "Real-time error/success messages and color-coded validation.",
                            rubrics: ["Clarity of 'Stochastic' definition", "Demonstration of Row-Sum rule", "Student engagement"],
                            outcomes: "Students identify the critical constraints that define a valid transition matrix.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Broken Spreadsheet Workshop",
                            objectives: "Collaboratively identify and fix errors in a 3x3 Markov Matrix.",
                            instructions: [
                                "Teacher displays a 3x3 matrix with three deliberate errors (Negative number, Row sum = 0.9, Row sum = 1.1).",
                                "Guided Discussion: 'Team, row 2 sums to 1.1. If we know the first two values are 0.4 and 0.4, what MUST the third value be?'",
                                "Students calculate: $1.0 - 0.4 - 0.4 = 0.2$.",
                                "Repeat for the negative entry and the zero-sum row."
                            ],
                            inputs: "Incorrect 3x3 Transition Matrix data",
                            outputs: "Corrected 3x3 Matrix on the board",
                            rubrics: ["Mathematical accuracy", "Logic of constraint satisfaction", "Classroom participation"],
                            outcomes: "Students master the technical properties of Markovian data structures.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Traffic Light Logic Design",
                            objectives: "Experience the process of translating descriptive rules into a formal matrix structure in a group setting.",
                            instructions: [
                                "Divide class into 4 teams. Scenario: Design a matrix for a 'Smart Traffic Light' (Green, Yellow, Red).",
                                "Rule 1: Green always goes to Yellow ($P=1.0$).",
                                "Rule 2: Yellow always goes to Red ($P=1.0$).",
                                "Rule 3: Red has a 0.8 chance of staying Red and 0.2 chance of turning Green.",
                                "Group Task: Draw the 3x3 Matrix on chart paper and ensure all rows sum to 1.0."
                            ],
                            inputs: "Descriptive urban infrastructure rules",
                            outputs: "3x3 Traffic Light Transition Matrix",
                            rubrics: ["Correct mapping of 'From-To' states", "Matrix formatting accuracy", "Team coordination"],
                            outcomes: "Students bridge the gap between real-world logic and linear algebraic representation.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Absorbing State Design",
                            objectives: "Independently design a matrix containing an 'Absorbing State' (a state you can enter but never leave).",
                            instructions: [
                                "Task: Design a 2x2 matrix for a 'Game Over' scenario.",
                                "States: {Playing, Game Over}.",
                                "Rule: Once you reach 'Game Over', you stay there forever.",
                                "Individual Task: Write the row for 'Game Over' in the matrix. (Answer: [0, 1]).",
                                "Reflect: What happens to the stationary distribution of a system with an absorbing state? (The probability eventually collects entirely in that state)."
                            ],
                            inputs: "Game state scenario",
                            outputs: "Individual 2x2 Absorbing Matrix Note",
                            rubrics: ["Correct use of 1.0 for self-loop", "Depth of reflection on 'Stationarity'", "Technical accuracy"],
                            outcomes: "Students understand the concept of 'Terminal States' in RL and their matrix representation.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Traffic Light Predictor"
                subtitle="Modeling Urban Infrastructure"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A smart city needs to predict traffic light states. A light can be Green (1), Yellow (2), or Red (3). It is broken, so it changes randomly, but follows these rules:
                            <br /><br />
                            1. Green never goes to Red directly. It stays Green (0.4) or goes Yellow (0.6).
                            <br />
                            2. Yellow always goes to Red (1.0).
                            <br />
                            3. Red stays Red (0.5) or goes Green (0.5).
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center font-mono overflow-x-auto">
                        <div className="text-xs text-slate-400 mb-4 uppercase tracking-widest font-sans font-bold">The Traffic Light Matrix</div>
                        <table className="mx-auto text-sm border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-2 text-slate-400"></th>
                                    <th className="p-2 text-emerald-500">Green</th>
                                    <th className="p-2 text-amber-500">Yellow</th>
                                    <th className="p-2 text-red-500">Red</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-slate-100 dark:border-slate-700">
                                    <th className="p-3 text-emerald-500 text-left">Green</th>
                                    <td className="p-3">0.4</td>
                                    <td className="p-3 font-bold">0.6</td>
                                    <td className="p-3 text-slate-300 dark:text-slate-600">0.0</td>
                                </tr>
                                <tr className="border-t border-slate-100 dark:border-slate-700">
                                    <th className="p-3 text-amber-500 text-left">Yellow</th>
                                    <td className="p-3 text-slate-300 dark:text-slate-600">0.0</td>
                                    <td className="p-3 text-slate-300 dark:text-slate-600">0.0</td>
                                    <td className="p-3 font-bold">1.0</td>
                                </tr>
                                <tr className="border-t border-slate-100 dark:border-slate-700">
                                    <th className="p-3 text-red-500 text-left">Red</th>
                                    <td className="p-3 font-bold">0.5</td>
                                    <td className="p-3 text-slate-300 dark:text-slate-600">0.0</td>
                                    <td className="p-3">0.5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Matrix Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is a Right Stochastic Matrix?', a: 'A square matrix where all entries are non-negative real numbers, and each row sums to exactly 1.0. This is the standard form used for Markov Chains.' },
                        { q: 'Can a transition matrix have a column that sums to more than 1?', a: 'Yes. The row sums must equal 1 (since you must go somewhere from a given state), but column sums can be anything (many states can lead to the same destination state).' },
                        { q: 'If state A is an "absorbing state", what does its row look like in the matrix?', a: 'The entry P_{AA} will be 1.0, and all other entries in that row will be 0.0. Once you enter the state, you never leave.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Matrix Power Calculator"
                subtitle="Multiply to See the Future"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <VirtualLabShell
                        title="Matrix Power Calculator"
                        description="Compute n-step transition probabilities"
                        objective="Raise the transition matrix to the power of n and observe how n-step reachability changes."
                        badge="Interactive Lab"
                        tips={['P^n gives you the probability of going from state i to state j in exactly n steps',
                            'As n→∞, P^n converges to the stationary distribution (for ergodic chains)']}
                        challenges={challenges} notebook={notebook} logs={logs}>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Edit the 2x2 transition matrix below. As long as the rows sum to 1.0, you can increase the power <InlineMath math="n" /> to see the <InlineMath math="P^n" /> matrix. Notice how, at high powers, all rows become identical—revealing the Stationary Distribution!
                        </p>
                        <MatrixPowerLab />
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
                    const data = getTopicData('unit2', 'Topic6_MarkovMatrix');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit2', 'Topic6_MarkovMatrix');
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
                                <h3 className="text-3xl font-black italic">Matrix Mastered!</h3>
                                <p className="text-primary-100">
                                    You've unlocked the core data structure of AI. Ready to see how Machine Learning uses this matrix in the real world?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: MATRICES IN ML
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
