import React, { useState } from 'react';
import {
    motion } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import QuizCard from '../../components/topic/QuizCard';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell,
    { LabChallenge,
    NotebookEntry } from '../../components/topic/VirtualLabShell';
import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Briefcase,
    Zap,
    Award,
    Layers,
    GitBranch,
    Binary,
    CheckCircle2,
    AlertTriangle,
    Lightbulb,
    Target
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { TransitionProbVis, ExpectedRewardVis } from '../../components/visualizers';
import { InlineMath } from 'react-katex';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Formal M D P Definition Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Formal M D P Definition Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Formal M D P Definition simulator.",
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
    "🤖 [System] Initializing Formal M D P Definition Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Formal M D P Definition\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 2 ──────────────────────────────────────

/**
 * Interactive Transition Matrix Explorer
 */
function TransitionMatrixExplorer() {
    const [action, setAction] = useState<'Search' | 'Wait'>('Search');

    const transitionData = {
        'Search': [
            { state: 'High Energy', probability: 0.7, color: '#3b82f6' },
            { state: 'Low Energy', probability: 0.3, color: '#f59e0b' },
        ],
        'Wait': [
            { state: 'High Energy', probability: 0.2, color: '#3b82f6' },
            { state: 'Low Energy', probability: 0.8, color: '#f59e0b' },
        ]
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Binary size={18} className="text-primary-500" />
                        Transition Dynamics: P(s' | s, a)
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Observe how actions change the probability of the next state.</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    {(['Search', 'Wait'] as const).map(a => (
                        <button
                            key={a}
                            onClick={() => setAction(a)}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${action === a ? 'bg-primary-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            {a}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    {transitionData[action].map((item, i) => (
                        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-600">{item.state}</span>
                                <span className="text-xs font-black text-primary-600">{(item.probability * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.probability * 100}%` }}
                                    className="h-full bg-primary-500"
                                />
                            </div>
                        </div>
                    ))}
                    <InfoCard type="info" title="The Probability Constraint">
                        The sum of probabilities for all possible next states <InlineMath math="s'" /> must always equal 1.0.
                    </InfoCard>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={transitionData[action]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="state" tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 1]} hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="probability" radius={[10, 10, 10, 10]} animationDuration={1000}>
                                {transitionData[action].map((entry, index) => (
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

export default function Topic2_FormalMDPDefinition() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic2_formalmdpdefinition" />

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
                        const data = getTopicData('unit2', 'Topic2_FormalMDPDefinition');
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
                title="1. The Inventory Manager"
                subtitle="Formalizing Business Logic"
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
                                "The 4-tuple is the DNA of reinforcement learning. Change one value, and your robot goes from a champion stock trader to a vacuum cleaner."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Briefcase size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            📦 The Logic of a Warehouse
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are managing a warehouse. At the end of each week, you look at your stock (<strong>State</strong>) and decide how many items to order (<strong>Action</strong>).
                            </p>
                            <p>
                                However, you don't know exactly how many customers will buy items next week. This uncertainty—where the next state is partly random—is exactly what a <strong>Formal MDP</strong> captures.
                            </p>
                            <p>
                                By defining a "Formal MDP", we turn this messy real-world problem into a clean mathematical 4-tuple that an AI can solve perfectly.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Tuple Hierarchy">
                            Some define MDP as a 4-tuple <InlineMath math="(S, A, P, R)" />, assuming <InlineMath math="\gamma" /> is external, while others use the 5-tuple <InlineMath math="(S, A, P, R, \gamma)" />.
                        </InfoCard>
                        <InfoCard type="tip" title="State Transitions">
                            Transitions are stochastic (probabilistic), not deterministic.
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
                                Defining the exact physics and transition probabilities for a drone flight controller in turbulent weather conditions.
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
                            Essential for establishing the formal mathematical 5-tuple (S, A, P, R, Gamma) required to mathematically prove and compute optimal solutions.
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
                                    Enables exact mathematical proofs of policy convergence and optimality.
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
                                    Defining precise transition probability matrices in high-dimensional real-world spaces is often mathematically impossible.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Formal 4-Tuple"
                subtitle="The Mathematical Foundation"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\\mathcal{P}_{ss'}^{a} = \\mathbb{P}\\!\\left[S_{t+1}=s' \\;\\middle|\\; S_t=s,\\, A_t=a\\right]"
                        label="Transition Function — Compact Notation"
                        accent="blue"
                        explanation="The superscript a and subscripts ss' compactly denote the transition probability from state s to state s' under action a. This notation is used in Sutton & Barto (2019) and most RL textbooks."
                        interpretation="This is the same transition probability P(s'|s,a) written in a more compact matrix notation. For each action a, we get a matrix P^a where entry (s,s') gives the probability of transitioning from s to s'. This matrix form is useful for analytical solutions and policy evaluation via linear algebra."
                        motivation="The matrix notation allows us to write the Bellman equation as a linear system: v = R + γP^π v, which can be solved by matrix inversion for small MDPs. This is the foundation of policy evaluation in dynamic programming."
                        terms={[
                            { term: '\\\\mathcal{P}_{ss\'}^{a}', name: 'Transition Matrix Entry', meaning: 'Probability of transitioning from state s to state s\' under action a. Equivalent to P(s\'|s,a).', range: '[0,1]', example: 'P^{Search}_{High,Low} = 0.3 — 30% chance of draining battery when searching.' },
                            { term: 's', name: 'Current State (row)', meaning: 'The state the agent is currently in. Indexes the row of the transition matrix.', range: '\\\\mathcal{S}', example: 's = High (battery level).' },
                            { term: "s'", name: 'Next State (column)', meaning: 'The state the environment transitions to. Indexes the column of the transition matrix.', range: '\\\\mathcal{S}', example: "s' = Low (battery drained after searching)." },
                        ]}
                        numericalExample={{
                            setup: 'Recycling robot. Transition matrix P^{Search} (rows=current state, cols=next state):',
                            steps: [
                                'P^{Search} = [[0.7, 0.3],   ← from High: 70% stay High, 30% go Low',
                                '              [0.1, 0.9]]   ← from Low:  10% go High, 90% stay Low',
                                'Row sums: 0.7+0.3=1.0 ✓, 0.1+0.9=1.0 ✓',
                                'P^{Wait}   = [[0.9, 0.1],   ← Waiting is safer (less battery drain)',
                                '              [0.0, 1.0]]   ← Low+Wait always stays Low',
                            ],
                            result: 'Two 2×2 transition matrices, one per action. Each row sums to 1. These matrices completely define the environment dynamics.',
                        }}
                    />

                    <TransitionProbVis />

                    <MathBlock
                        formula="\\mathcal{R}_{s}^{a} = \\mathbb{E}\\!\\left[R_{t+1} \\;\\middle|\\; S_t=s,\\, A_t=a\\right] = \\sum_{s'\\in\\mathcal{S}}\\mathcal{P}_{ss'}^{a}\\cdot r(s,a,s')"
                        label="Reward Function — Expected Immediate Reward"
                        accent="violet"
                        explanation="R^a_s is the expected immediate reward for taking action a in state s, averaged over all possible next states weighted by their transition probabilities."
                        interpretation="The reward function is the most critical design choice in RL. It defines what the agent is trying to achieve. A well-designed reward function leads to the desired behaviour; a poorly designed one leads to reward hacking. The expected form R^a_s = Σ P^a_{ss'} · r(s,a,s') shows that the reward is an average over all possible outcomes."
                        motivation="Using expected reward rather than per-transition reward simplifies the Bellman equation. It allows us to write the value function as v_π(s) = Σ_a π(a|s)[R^a_s + γ Σ_{s'} P^a_{ss'} v_π(s')], which is the standard form used in dynamic programming."
                        terms={[
                            { term: '\\\\mathcal{R}_s^a', name: 'Expected Reward', meaning: 'Average reward for taking action a in state s, over all possible next states.', range: '\\\\mathbb{R}', example: 'R^{Search}_{High} = 4.0 cans expected per search from High battery.' },
                            { term: 'r(s,a,s\')', name: 'Per-Transition Reward', meaning: 'The specific reward received for the transition from s to s\' via action a. May differ by next state.', range: '\\\\mathbb{R}', example: 'r(Low,Search,depleted)=−3 (penalty for running out of battery).' },
                            { term: '\\\\mathcal{P}_{ss\'}^a', name: 'Transition Weight', meaning: 'Probability of reaching s\', used to weight the per-transition reward.', range: '[0,1]', example: 'P^{Search}_{Low,depleted}=0.1 → contributes 0.1×(−3)=−0.3 to expected reward.' },
                        ]}
                        numericalExample={{
                            setup: 'Recycling robot. Action: Search from Low battery. Transitions: Low→High(p=0.1,r=4), Low→Low(p=0.9,r=4), Low→depleted(p=0.0,r=−3).',
                            steps: [
                                'R^{Search}_{Low} = P(High|Low,Search)×r(Low,S,High) + P(Low|Low,Search)×r(Low,S,Low)',
                                '               = 0.1×4 + 0.9×4',
                                '               = 0.4 + 3.6 = 4.0',
                                'Note: if P(depleted|Low,Search)=0.1 with r=−3: R = 0.1×4 + 0.8×4 + 0.1×(−3) = 3.3',
                            ],
                            result: 'R^{Search}_{Low} = 4.0 (or 3.3 with depletion risk). The reward function captures the expected outcome of each action.',
                        }}
                    />

                    <ExpectedRewardVis />

                    <TransitionMatrixExplorer />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram
                title="Formal MDP Loop Dynamics"
                description="The cyclic 4-tuple interaction loop between Agent and Environment state transitions."
                chart={`graph LR
                    A[Agent] -->|Action: a| E[Environment]
                    E -->|Reward: R| A
                    E -->|Next State: s'| A
                    classDef default fill:#1e293b,stroke:#475569,stroke-width:2px,color:#fff;
                    classDef agent fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff;
                    classDef env fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff;
                    class A agent;
                    class E env;
                `}
            />

            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Formalizing the Dynamics"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Transition Matrix Demo",
                            objectives: "Visualize how different actions redistribute the probability of future states.",
                            instructions: [
                                "Open the 'Transition Explorer' in the Virtual Lab section.",
                                "Select the 'Search' action and point out the 30% risk of battery drain.",
                                "Switch to 'Wait' and show how the probability shifts back to 80% safety.",
                                "Explain that the 'P' in the (S, A, P, R) tuple is actually a set of matrices, one for each action."
                            ],
                            inputs: "Interactive TransitionMatrixExplorer component",
                            outputs: "Real-time probability bar charts for 'Search' vs 'Wait'.",
                            rubrics: ["Clarity of matrix explanation", "Demonstration of stochasticity", "Student engagement"],
                            outcomes: "Students identify that actions control the probability distribution of the next state.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Matrix Validation Workshop",
                            objectives: "Collaboratively verify and correct transition matrices based on probability axioms.",
                            instructions: [
                                "Teacher writes a 2x2 matrix on the board with a missing value: [[0.7, ?], [0.4, 0.6]].",
                                "Guided Question: 'What must the missing value be for the matrix to be valid? Why?'",
                                "Class calculates: 1.0 - 0.7 = 0.3.",
                                "Teacher introduces a 'Broken Matrix': [[0.7, 0.4], [0.1, 0.9]].",
                                "Students identify why row 1 is invalid (sums to 1.1) and suggest a fix."
                            ],
                            inputs: "Incomplete and broken transition matrices",
                            outputs: "Corrected 2x2 Transition Matrix on the board",
                            rubrics: ["Mathematical accuracy", "Understanding of row-sum rule", "Classroom participation"],
                            outcomes: "Students master the fundamental constraint of transition dynamics (row sums must equal 1.0).",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Rainy Day Modeler",
                            objectives: "Experience the process of estimating real-world transition probabilities in a group setting.",
                            instructions: [
                                "Divide class into 4 teams. Each team must model the 'Weather MDP'.",
                                "States: {Sunny, Rainy}. Action: {Walk Outside}.",
                                "Task: Estimate the probability P(Rainy | Sunny, Walk) and P(Sunny | Sunny, Walk) based on 'Intuitive Seasonal Data'.",
                                "Challenge: If it's Rainy now, and you 'Wait', what is the probability it stays Rainy vs becomes Sunny?",
                                "Teams present their 2x2 Transition Matrix on chart paper."
                            ],
                            inputs: "Intuitive weather scenarios",
                            outputs: "Complete Weather Transition Matrix",
                            rubrics: ["Logical probability estimation", "Technical matrix formatting", "Team coordination"],
                            outcomes: "Students bridge the gap between qualitative scenarios and quantitative MDP dynamics.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Personal Habit Tuple",
                            objectives: "Independently formalize a daily personal decision as a 4-tuple MDP.",
                            instructions: [
                                "Task: Choose one daily habit (e.g., Checking Instagram, Going to the Gym, Drinking Coffee).",
                                "Write down the 4-tuple (S, A, P, R) for this habit.",
                                "Identify 2 States (e.g., Feeling Bored, Feeling Energetic).",
                                "Identify 1 Action (e.g., Scroll Feed).",
                                "Estimate the Transition: If you are 'Bored' and 'Scroll Feed', what is the probability you transition to 'Happy' vs 'More Bored'?",
                                "Define the Reward: What 'Points' does your brain get?"
                            ],
                            inputs: "Personal daily routines",
                            outputs: "Individual 'Habit MDP' Report (1 page)",
                            rubrics: ["Correct use of 4-tuple notation", "Logical transition estimation", "Originality"],
                            outcomes: "Students realize that MDPs are a universal language for modeling any purposeful behavior.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: The Recycling Robot MDP"
                subtitle="Formulating a Classic Example"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><GitBranch size={18} /> The Search Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A robot searches for cans. It has two energy levels: <strong>High</strong> and <strong>Low</strong>.
                            It can <strong>Search</strong>, <strong>Wait</strong>, or <strong>Recharge</strong>.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Layers className="mx-auto text-emerald-500" size={20} />
                            <div className="text-[10px] font-bold">S</div>
                            <p className="text-[8px] text-slate-500">{'[High, Low]'}</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Zap className="mx-auto text-blue-500" size={20} />
                            <div className="text-[10px] font-bold">A</div>
                            <p className="text-[8px] text-slate-500">{'[Search, Wait, Recharge]'}</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Binary className="mx-auto text-amber-500" size={20} />
                            <div className="text-[10px] font-bold">P</div>
                            <p className="text-[8px] text-slate-500">Prob. of battery drain.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Award className="mx-auto text-purple-500" size={20} />
                            <div className="text-[10px] font-bold">R</div>
                            <p className="text-[8px] text-slate-500">Points per can found.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Essential Definitions"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Define the formal 4-tuple of an MDP.', a: 'An MDP is defined by the set (S, A, P, R), representing States, Actions, Transition Probabilities, and Reward Functions.' },
                        { q: 'What is a Transition Probability Matrix?', a: 'A matrix where each element P[i][j] represents the probability of moving from state i to state j under a specific action.' },
                        { q: 'What is the "Finite" requirement in a Finite MDP?', a: 'It means the sets S, A, and R must have a finite number of elements, allowing for exact computation.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Transition Explorer"
                subtitle="Visualizing Environment Dynamics"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Transition Matrix Explorer"
                    description="Visualize stochastic state transitions"
                    objective="Toggle actions and see how the transition probability matrix changes. Verify probabilities sum to 1."
                    badge="Interactive Lab"
                    tips={[
                        'All rows in the transition matrix must sum to 1.0',
                        'Stochastic transitions mean the agent cannot predict the exact next state'
                    ]}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between actions to see how the Transition Matrix changes. Notice how <strong>Searching</strong> has a higher risk of battery drain (Low Energy) compared to <strong>Waiting</strong>.
                    </p>
                    <TransitionMatrixExplorer />
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
                    const data = getTopicData('unit2', 'Topic2_FormalMDPDefinition');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit2', 'Topic2_FormalMDPDefinition');
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
                                <h3 className="text-3xl font-black italic">MDP Defined!</h3>
                                <p className="text-primary-100">
                                    You've mastered the 4-tuple. Ready to explore the core "Markov Property" that makes this math work?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: MARKOV PROPERTY
                                </button>
                                <button className="px-10 py-4 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                                    REVIEW DEFINITION
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
