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
    Share2,
    GitBranch,
    Target,
    Zap,
    TrendingUp,
    Clock,
    Briefcase,
    ShieldAlert,
    Users2,
    Layout,
    Network,
    Layers,
    Binary,
    ChevronRight,
    Info,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, Legend, BarChart, Bar
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { SARSAQLearningVis } from '../../components/visualizers';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Types Of R L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Types Of R L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Types Of R L simulator.",
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
    "🤖 [System] Initializing Types Of R L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Types Of R L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 8 ──────────────────────────────────────

/**
 * Interactive Hierarchy of RL
 */
function RLHierarchy() {
    const [selected, setSelected] = useState<string | null>(null);

    const categories = [
        {
            id: 'modality',
            label: 'Environment Model',
            types: [
                { name: 'Model-Free', desc: 'Learns directly from experience. (DQN, PPO)', icon: <Binary size={14} /> },
                { name: 'Model-Based', desc: 'Builds a world model first. (Dyna-Q, AlphaZero)', icon: <Network size={14} /> }
            ]
        },
        {
            id: 'policy',
            label: 'Policy Update',
            types: [
                { name: 'On-Policy', desc: 'Learns while following the policy. (SARSA)', icon: <Target size={14} /> },
                { name: 'Off-Policy', desc: 'Learns from any data/expert. (Q-Learning)', icon: <Share2 size={14} /> }
            ]
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="text-center space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-white">The RL Taxonomy</h4>
                <p className="text-xs text-slate-500">Click a category to explore the branches.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {categories.map(cat => (
                    <div key={cat.id} className="space-y-4">
                        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-primary-600 text-center uppercase tracking-widest shadow-sm">
                            {cat.label}
                        </div>
                        <div className="grid gap-3">
                            {cat.types.map(type => (
                                <motion.button
                                    key={type.name}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelected(type.name)}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all ${selected === type.name ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm'}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${selected === type.name ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                                            {type.icon}
                                        </div>
                                        <span className="font-bold text-sm text-slate-800 dark:text-white">{type.name}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">{type.desc}</p>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-primary-600 rounded-2xl text-white flex items-center justify-between shadow-xl shadow-primary-500/20"
                    >
                        <div className="flex items-center gap-3">
                            <Info size={18} />
                            <span className="text-xs font-bold uppercase tracking-tight">Key Algorithm: {selected === 'Model-Free' ? 'Q-Learning' : selected === 'Model-Based' ? 'Dyna-Q' : selected === 'On-Policy' ? 'SARSA' : 'Deep Q-Network'}</span>
                        </div>
                        <ChevronRight size={18} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic8_TypesOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic8_typesofrl" />
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
                        const data = getTopicData('unit1', 'Topic8_TypesOfRL');
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
                title="1. The Family Reunion"
                subtitle="Understanding the RL Taxonomy"
                icon={<Share2 className="text-blue-600" size={24} />}
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
                                "Model-free is like driving without a map and just turning where the road looks nice."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <Network size={200} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌲 The RL Family Tree
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are learning to play <strong>Tennis</strong>. There are two very different ways to get better:
                            </p>
                            <p>
                                <strong>The Practice Path:</strong> You go onto the court and hit thousands of balls. You don't try to calculate physics; you just feel what works. This is <strong>Model-Free</strong> learning.
                            </p>
                            <p>
                                <strong>The Video Path:</strong> You watch a pro player's video. You analyze their swing, their footwork, and you try to <em>copy</em> them, even if you are just sitting on your couch. This is <strong>Off-Policy</strong> learning.
                            </p>
                            <p>
                                Reinforcement Learning isn't just one algorithm; it's a diverse family of methods, each suited for different sports (problems).
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Taxonomy Rule">
                            Most algorithms aren't just one type—they are combinations! For example, DQN is <strong>Model-Free</strong> AND <strong>Off-Policy</strong>.
                        </InfoCard>
                        <InfoCard type="warning" title="Naming Confusion">
                            Don't confuse "Offline RL" with "Off-Policy RL". Offline RL means learning from a fixed dataset without any environment interaction.
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
                                An autonomous flight simulator needs to learn aerodynamics. Do we construct a complex wind tunnel model (model-based) or learn directly from trial-and-error crashes (model-free)?
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
                            Helps strike the right balance between sample efficiency (planning with a model) and computational simplicity (learning without a model).
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
                                    Enables extreme sample savings when a reliable environment simulator is available.
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
                                    If the internal model is inaccurate, it leads to severe 'model exploitation' and catastrophic real-world failures.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. On-Policy vs Off-Policy Math"
                subtitle="The Logic of Update Rules"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="Q(S_t,A_t) \\leftarrow Q(S_t,A_t) + \\alpha\\!\\underbrace{\\bigl[R_{t+1} + \\gamma\\, Q(S_{t+1},A_{t+1}) - Q(S_t,A_t)\\bigr]}_{\\delta_t^{\\text{SARSA}}}"
                        label="SARSA — On-Policy TD Update"
                        accent="violet"
                        explanation="Update the action-value function based on the actual next action taken by the agent's policy."
                        interpretation="SARSA learns the value of the action-value function on-policy by using the actual trajectory tuple (S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1})."
                        motivation="Necessary for safe online learning, as it evaluates the actual path taken by the agent including exploratory mistakes."
                        terms={[
                            { term: 'Q(S_t, A_t)', name: 'Action-Value Estimate', meaning: 'Current estimated return for taking action A_t in state S_t.', range: '\\mathbb{R}', example: '10' },
                            { term: '\\alpha', name: 'Learning Rate', meaning: 'Controls how much new information overrides old estimates.', range: '(0, 1]', example: '0.1' },
                            { term: 'R_{t+1}', name: 'Immediate Reward', meaning: 'Reward received immediately after the action.', range: '\\mathbb{R}', example: '2' },
                            { term: '\\gamma', name: 'Discount Factor', meaning: 'Discount factor determining the weight of future Q-values.', range: '[0, 1]', example: '0.9' },
                            { term: '\\delta_t^{\\text{SARSA}}', name: 'SARSA TD Error', meaning: 'The discrepancy between the TD target and current estimate.', range: '\\mathbb{R}', example: '2.8' }
                        ]}
                        numericalExample={{
                            setup: 'Initialize $Q(S_t, A_t) = 10$. Given step outputs $R_{t+1} = 2$, next state $Q(S_{t+1}, A_{t+1}) = 12$, discount factor $\\gamma = 0.9$, learning rate $\\alpha = 0.1$.',
                            steps: [
                                'Compute TD Target = $R_{t+1} + \\gamma Q(S_{t+1}, A_{t+1}) = 2 + 0.9 \\times 12 = 13.8$',
                                'Compute TD Error = $13.8 - Q(S_t, A_t) = 13.8 - 10 = 3.8$',
                                'Update Q-value = $10 + 0.1 \\times 3.8 = 10.38$'
                            ],
                            result: 'New $Q(S_t, A_t) = 10.38$'
                        }}
                    />

                    <SARSAQLearningVis />

                    <MathBlock
                        formula="Q(S_t,A_t) \\leftarrow Q(S_t,A_t) + \\alpha\\!\\underbrace{\\bigl[R_{t+1} + \\gamma\\max_{a'}Q(S_{t+1},a') - Q(S_t,A_t)\\bigr]}_{\\delta_t^{\\text{Q-learning}}}"
                        label="Q-Learning — Off-Policy TD Update"
                        accent="blue"
                        explanation="Update the action-value function based on the maximum possible Q-value in the next state."
                        interpretation="Q-learning learns off-policy by assuming the agent will select the optimal action in the next state, regardless of actual behavior."
                        motivation="Allows learning the optimal policy directly from arbitrary exploratory behavior (off-policy)."
                        terms={[
                            { term: '\\max_{a\'} Q(S_{t+1}, a\')', name: 'Maximum Next Q-Value', meaning: 'The highest estimated Q-value for any action in the next state.', range: '\\mathbb{R}', example: '15' },
                            { term: '\\delta_t^{\\text{Q-learning}}', name: 'Q-Learning TD Error', meaning: 'The discrepancy between the greedy TD target and current estimate.', range: '\\mathbb{R}', example: '5.5' }
                        ]}
                        numericalExample={{
                            setup: 'Initialize $Q(S_t, A_t) = 10$. Given step outputs $R_{t+1} = 2$, next state maximum $\\max_{a\'} Q(S_{t+1}, a\') = 15$, discount factor $\\gamma = 0.9$, learning rate $\\alpha = 0.1$.',
                            steps: [
                                'Compute TD Target = $R_{t+1} + \\gamma \\max_{a\'} Q(S_{t+1}, a\') = 2 + 0.9 \\times 15 = 15.5$',
                                'Compute TD Error = $15.5 - Q(S_t, A_t) = 15.5 - 10 = 5.5$',
                                'Update Q-value = $10 + 0.1 \\times 5.5 = 10.55$'
                            ],
                            result: 'New $Q(S_t, A_t) = 10.55$'
                        }}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Types Of R L Architecture"
                description="Model-Free versus Model-Based architectures."
                chart={`graph LR
    RL[RL Architectures] --> MB[Model-Based]
    RL --> MF[Model-Free]
    MB --> |Learns Transition Dynamics| Plan[Planning]
    MF --> |Learns purely from experience| React[Direct Policy/Value]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Classifying the RL Universe"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Taxonomy Explorer Demo",
                            objectives: "Demonstrate the structural differences between Environment Models and Policy Update styles.",
                            instructions: [
                                "Open the 'RL Taxonomy' explorer in the Virtual Lab section.",
                                "Select 'Model-Free' and explain why it relies on 'Hitting the ball' (Direct experience).",
                                "Select 'Off-Policy' and explain why it allows 'Learning from videos' (Expert logs).",
                                "Show the 'Key Algorithm' badge for each selection to link theory to practice (e.g., DQN, PPO).",
                                "Point out that most real-world deep RL is Model-Free and Off-Policy."
                            ],
                            inputs: "Interactive RLHierarchy component",
                            outputs: "Hierarchical category badges and descriptive tooltips.",
                            rubrics: ["Clarity of taxonomy mapping", "Explanation of key algorithms", "Student engagement"],
                            outcomes: "Students identify the high-level categories of RL and their representative algorithms.",
                            time: "10 Mins",
                            materials: ["Interactive Lab", "Digital Screen"]
                        },
                        {
                            level: 2,
                            title: "The SARSA vs Q-Learning Duel",
                            objectives: "Collaboratively calculate the Q-value update for On-policy and Off-policy methods.",
                            instructions: [
                                "Teacher draws a 2-state chain on the board: S1 -> S2.",
                                "Setup: Q(S1, right) = 5.0. Actual next action taken (exploratory) is 'Down' with Q(S2, down) = 2.0.",
                                "However, the BEST action in S2 is 'Right' with Q(S2, right) = 8.0.",
                                "Guided Calculation: Step 1 (SARSA) uses 2.0. Step 2 (Q-Learning) uses 8.0.",
                                "Discuss: 'Why did Q-Learning update more aggressively?'"
                            ],
                            inputs: "Q-table values and \\alpha/\\gamma hyperparameters",
                            outputs: "Parallel Q-update calculations on the board",
                            rubrics: ["Numerical accuracy", "Explanation of 'max' vs 'actual'", "Classroom participation"],
                            outcomes: "Students master the fundamental mathematical difference between On-policy and Off-policy logic.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Cliff Walker Simulation",
                            objectives: "Analyze the behavior of different RL types in a high-risk environment.",
                            instructions: [
                                "Divide class into two teams: Team On-Policy (SARSA) and Team Off-Policy (Q-Learning).",
                                "Scenario: Navigating a narrow path next to a deep cliff.",
                                "Team On-Policy must explain why they take the 'Long, Safe Path' away from the edge.",
                                "Team Off-Policy must explain why they take the 'Short, Risky Path' right on the edge.",
                                "Debrief: 'If this was a real million-dollar robot, which team would you hire?'"
                            ],
                            inputs: "Cliff-Walking scenario diagram",
                            outputs: "Position statements on 'Safety' vs 'Efficiency'",
                            rubrics: ["Understanding of risk modeling", "Logical persuasion", "Team coordination"],
                            outcomes: "Students realize that 'optimal' path (Off-policy) isn't always 'safe' path (On-policy).",
                            time: "20 Mins",
                            materials: ["Cliff-Walking Diagram", "Posters"]
                        },
                        {
                            level: 4,
                            title: "Hobby Taxonomy Audit",
                            objectives: "Independently map a personal hobby to the RL classification framework.",
                            instructions: [
                                "Task: Choose a hobby (e.g., Playing a musical instrument, Gaming, Cooking).",
                                "Identify: Is your learning style mostly Model-Free (just doing it) or Model-Based (reading theory first)?",
                                "Identify: Do you learn mostly On-Policy (learning from your own current mistakes) or Off-Policy (watching YouTube tutorials)?",
                                "Write a 3-sentence summary of your 'Hybrid RL Profile'."
                            ],
                            inputs: "Self-reflection on learning habits",
                            outputs: "Individual 'Personal RL Profile' Note",
                            rubrics: ["Correct use of taxonomy terms", "Depth of self-analysis", "Originality"],
                            outcomes: "Students internalize abstract RL categories by applying them to their own learning behaviors.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: The Cliff Walker"
                subtitle="On-Policy vs Off-Policy Duel"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>
                        In the <strong>CliffWalking</strong> environment, the agent must reach a goal without falling off a cliff.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="card p-6 border-l-4 border-emerald-500">
                            <h5 className="font-bold text-slate-800 dark:text-white mb-2">Team SARSA (On-Policy)</h5>
                            <p className="text-xs">It will take a long, safe path far from the cliff because it learns that its own "Exploration" (random moves) could make it fall.</p>
                        </div>
                        <div className="card p-6 border-l-4 border-blue-500">
                            <h5 className="font-bold text-slate-800 dark:text-white mb-2">Team Q-Learning (Off-Policy)</h5>
                            <p className="text-xs">It will learn the optimal path right along the cliff edge, ignoring the risk that its own exploration might cause a fall.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Exam-Ready Definitions"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the primary advantage of Off-Policy RL?', a: 'It can learn from expert demonstrations, historical data, or even a different policy, making it more sample-efficient.' },
                        { q: 'Why is SARSA called "On-Policy"?', a: 'Because it evaluates and improves the same policy that it uses to make decisions during learning.' },
                        { q: 'Define a "Model" in Model-Based RL.', a: 'A model is any function that mimics the environment dynamics, specifically predicting the next state and reward given a current state and action.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: The Taxonomy Explorer"
                subtitle="Navigating the RL Landscape"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Model-Free vs Model-Based"
                    description="Observe the planning advantage"
                    objective="Compare a model-free agent (trial-and-error) vs a model-based agent (plans ahead) on the same navigation task."
                    badge="Interactive Lab"
                    tips={['Model-based agents learn faster but fail when the model is wrong',
                'Model-free agents are slower but more robust to environment changes']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore the different categories of Reinforcement Learning. Notice how modern algorithms like <strong>PPO</strong> or <strong>SAC</strong> fit into multiple branches of this tree.
                    </p>
                    <RLHierarchy />
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
                    const data = getTopicData('unit1', 'Topic8_TypesOfRL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic8_TypesOfRL');
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
                        <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-emerald-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Family Tree: Explored!</h3>
                                <p className="text-emerald-100">
                                    You've mapped the entire RL landscape. Ready to tackle the biggest challenge in all of AI?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-emerald-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: EXPLORATION
                                </button>
                                <button className="px-10 py-4 bg-emerald-700 text-white font-black rounded-2xl hover:bg-emerald-800 transition-colors">
                                    REVIEW TYPES
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

