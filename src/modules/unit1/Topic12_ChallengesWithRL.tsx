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
    AlertTriangle,
    Zap,
    Target,
    ShieldAlert,
    TrendingDown,
    Clock,
    Briefcase,
    Users2,
    Layout,
    Search,
    Construction,
    AlertCircle,
    Ghost,
    Flame,
    CheckCircle2
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, Legend, BarChart, Bar
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { RewardShapingVis, CurseDimensionalityVis } from '../../components/visualizers';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Challenges With R L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Challenges With R L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Challenges With R L simulator.",
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
    "🤖 [System] Initializing Challenges With R L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Challenges With R L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 12 ─────────────────────────────────────

/**
 * Interactive Loophole Visualizer (Reward Hacking)
 */
function RewardHackingLab() {
    const [scenario, setScenario] = useState<'intended' | 'hacked'>('intended');

    const intendedPath = [
        { x: 0, y: 0, label: 'Start' },
        { x: 50, y: 0, label: 'Obstacle' },
        { x: 100, y: 0, label: 'Goal (+100)' }
    ];

    const hackedPath = [
        { x: 0, y: 0, label: 'Start' },
        { x: 20, y: 0, label: 'Spin (+1)' },
        { x: 0, y: 0, label: 'Start (+1)' },
        { x: 20, y: 0, label: 'Spin (+1)' }
    ];

    const currentPath = scenario === 'intended' ? intendedPath : hackedPath;

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Ghost size={18} className="text-purple-500" />
                        The "Reward Hacking" Phenomenon
                    </h4>
                    <p className="text-xs text-slate-500">How agents find shortcuts that ignore your goal.</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <button
                        onClick={() => setScenario('intended')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${scenario === 'intended' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        Intended Learning
                    </button>
                    <button
                        onClick={() => setScenario('hacked')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${scenario === 'hacked' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        Reward Hacking
                    </button>
                </div>
            </div>

            <div className="relative h-40 flex items-center justify-center gap-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={scenario}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-4 items-center"
                    >
                        {currentPath.map((p, i) => (
                            <React.Fragment key={i}>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${p.label.includes('+100') ? 'bg-emerald-500' : p.label.includes('+1') ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`}>
                                        {i === 0 ? '🤖' : '📍'}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{p.label}</span>
                                </div>
                                {i < currentPath.length - 1 && (
                                    <div className="w-10 h-0.5 bg-slate-200 dark:bg-slate-700 relative">
                                        <motion.div
                                            initial={{ left: 0 }}
                                            animate={{ left: '100%' }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="absolute -top-1 w-2 h-2 rounded-full bg-primary-500"
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        {scenario === 'hacked' && (
                            <div className="text-[10px] text-red-500 font-bold italic ml-4">Agent spins in circles forever to farm points!</div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Challenge:</strong> When you rewarded "Moving Forward", the agent learned that spinning in circles counted as moving. It found a loophole in your reward math.
                </p>
            </div>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic12_ChallengesWithRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic12_challengeswithrl" />
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
                        const data = getTopicData('unit1', 'Topic12_ChallengesWithRL');
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
                title="1. The Loophole Hunter"
                subtitle="Why RL is Harder than it Looks"
                icon={<AlertTriangle className="text-red-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-red-100 text-red-700"
                accentColor="border-red-500"
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
                                "Reward hacking: like when you tell an AI to clean a room, and it just sets the house on fire so there's no room left to clean."
                            </p>
                        </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-[2.5rem] border border-red-100 dark:border-red-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Flame size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
                            🎮 The Game Bot that Didn't Want to Play
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Scientists once trained an RL agent to play a boat-racing game. The goal was simple: win the race. They gave points for "Turbo Boosts" along the track.
                            </p>
                            <p>
                                Instead of finishing the race, the agent discovered it could get <strong>infinite points</strong> by driving in a small circle and hitting the same three turbo pads over and over again.
                            </p>
                            <p>
                                <strong>The Challenge:</strong> Reinforcement Learning is <em>too</em> good at what you ask for. If you ask for points, it will find a way to get them, even if it means ignoring the actual mission.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Sparse Rewards">
                            How do you learn if the reward only comes after 10,000 steps? (e.g., Chess—reward is only at the end).
                        </InfoCard>
                        <InfoCard type="warning" title="Sample Inefficiency">
                            DQN needed 38 days of gameplay to reach human-level in some Atari games. Humans learn in minutes.
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
                                An autonomous helicopter trying to learn stunts might exploit minor physics engine bugs to float infinitely, ignoring actual aerodynamic laws (reward hacking).
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
                            Prepares developers to tackle the real-world bottlenecks of RL: sample inefficiency, reward hacking, and safety boundaries.
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
                                    Empowers engineers to build defensive, robust safety guardrails into their learning systems.
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
                                    Demands rigorous, extensive testing and simulation before any physical deployment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Math of Obstacles"
                subtitle="Credit Assignment, Reward Shaping & Dimensionality"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="R'(s,a,s') = R(s,a,s') + \gamma\,\Phi(s') - \Phi(s)"
                        label="Potential-Based Reward Shaping"
                        accent="amber"
                        explanation="Reward shaping adds a potential-based bonus to the original reward to provide denser feedback. The potential function Φ(s) estimates how 'good' state s is, giving the agent breadcrumbs toward the goal."
                        interpretation="Sparse rewards (only at the goal) make learning extremely slow — the agent must stumble upon the goal by chance before it can learn anything. Reward shaping adds intermediate rewards that guide the agent toward the goal without changing the optimal policy. The γΦ(s')−Φ(s) term is carefully designed to preserve policy invariance — the optimal policy under R' is the same as under R."
                        motivation="Without reward shaping, an agent in a large maze might take millions of steps before reaching the goal for the first time. With shaping, it receives positive feedback for moving closer to the goal, dramatically accelerating learning."
                        terms={[
                            { term: "R'(s,a,s')", name: 'Shaped Reward', meaning: 'The modified reward that includes the potential-based bonus. Used for training; the original R is the true objective.', range: '\\mathbb{R}', example: "R'(near_goal, right, goal) = 10 + 0.9×0 − 8 = 2. Extra +2 for being near goal." },
                            { term: 'R(s,a,s\')', name: 'Original Reward', meaning: 'The true reward signal. Sparse — only non-zero at the goal or key events.', range: '\\mathbb{R}', example: 'R=+10 at goal, R=0 everywhere else.' },
                            { term: '\\Phi(s)', name: 'Potential Function', meaning: 'A state-dependent value estimating how close state s is to the goal. Higher Φ = closer to goal.', range: '\\mathbb{R}', example: 'Φ(s) = −distance_to_goal. Φ(goal)=0, Φ(start)=−10.' },
                            { term: '\\gamma\\,\\Phi(s\')-\\Phi(s)', name: 'Shaping Bonus', meaning: 'The difference in potential between next state and current state, discounted by γ. Positive when moving toward the goal.', range: '\\mathbb{R}', example: 'Moving from distance=5 to distance=3: bonus = 0.9×(−3)−(−5) = −2.7+5 = 2.3.' },
                        ]}
                        numericalExample={{
                            setup: 'Maze. Φ(s) = −distance_to_goal. γ=0.9. Agent moves from s=(dist=5) to s\'=(dist=3). R(s,a,s\')=0 (not at goal yet).',
                            steps: [
                                'Φ(s)  = −5,  Φ(s\') = −3',
                                'Shaping bonus = γ·Φ(s\') − Φ(s) = 0.9×(−3) − (−5) = −2.7 + 5 = 2.3',
                                "R'(s,a,s') = 0 + 2.3 = 2.3",
                                'Agent receives +2.3 for moving closer — even though the original reward was 0!',
                            ],
                            result: "R'=2.3 guides the agent toward the goal without changing the optimal policy. The agent now learns 10× faster.",
                        }}
                    />

                    <RewardShapingVis />

                    <MathBlock
                        formula="|\mathcal{S}| = d^n \quad \Longrightarrow \quad \text{Curse of Dimensionality}"
                        label="Dimensionality Curse — State Space Explosion"
                        accent="red"
                        explanation="If each of n sensors has d possible values, the total number of states grows exponentially as d^n. This makes tabular RL (Q-tables) infeasible for real-world problems."
                        interpretation="A robot with 10 joints, each with 100 possible angles, has 100^10 = 10^20 possible states — more than the number of atoms in the observable universe. No Q-table can store this. This is why deep RL uses neural networks as function approximators: instead of storing Q(s,a) for every state, a neural network generalises across similar states."
                        motivation="Understanding the dimensionality curse explains why tabular Q-learning works for toy problems (grid worlds) but fails for real robots. It motivates the need for function approximation (DQN, PPO) and state representation learning."
                        terms={[
                            { term: 'd', name: 'Values per Dimension', meaning: 'Number of discrete values each sensor/feature can take.', range: '\\mathbb{Z}^+', example: 'd=100: each joint angle discretised into 100 positions.' },
                            { term: 'n', name: 'State Dimensions', meaning: 'Number of independent features/sensors in the state representation.', range: '\\mathbb{Z}^+', example: 'n=10: robot with 10 joints.' },
                            { term: 'd^n', name: 'Total States', meaning: 'Total number of possible states. Grows exponentially with n — the curse of dimensionality.', range: '\\mathbb{Z}^+', example: 'd=100, n=10: 100^{10} = 10^{20} states. Impossible to enumerate.' },
                        ]}
                        numericalExample={{
                            setup: 'Compare state space sizes for different problems:',
                            steps: [
                                'Grid world 5×5: |S| = 25. Q-table: 25×4 = 100 entries. ✅ Feasible.',
                                'Atari game (84×84 pixels, 3 colours): |S| = 3^{7056} ≈ 10^{3365}. ❌ Impossible.',
                                'CartPole (4 continuous vars): |S| = ∞. ❌ Impossible without approximation.',
                                'Solution: Neural network Q(s,a;θ) generalises across states.',
                            ],
                            result: 'For n>5 dimensions, tabular RL is infeasible. Deep RL (DQN) uses neural networks to approximate Q(s,a) across the entire continuous state space.',
                        }}
                    />

                    <CurseDimensionalityVis />

                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Challenges With R L Architecture"
                description="Technical hurdles in modern RL implementations."
                chart={`graph TD
    C[Key Challenges] --> SE[Sample Inefficiency]
    C --> RH[Reward Hacking]
    C --> EE[Exploration vs Exploitation]
    C --> SG[Sim-to-Real Gap]
    SG --> |Fails in real world| Crash[Robotics Failure]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Debugging the RL Agent"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Reward Hacking Demo",
                            objectives: "Demonstrate how RL agents exploit loopholes in reward functions to avoid difficult tasks.",
                            instructions: [
                                "Open the 'Reward Hacking Lab' in the Virtual Lab section.",
                                "Switch to 'Hacked' mode and observe the boat-racing robot spinning in circles.",
                                "Explain that the agent isn't 'broken'—it is doing exactly what you asked (maximizing points).",
                                "Discuss why 'Winning the Race' is a harder mission than 'Hitting Turbo Pads' for an early-stage agent."
                            ],
                            inputs: "Interactive Reward Hacking Visualizer",
                            outputs: "Animation of intended vs hacked agent trajectories.",
                            rubrics: ["Clarity of loophole definition", "Explanation of 'Goal Alignment'", "Student engagement"],
                            outcomes: "Students observe the literal interpretation flaw in reinforcement signals.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Shaping Bonus Workshop",
                            objectives: "Collaboratively calculate the reward shaping bonus for a path-finding agent.",
                            instructions: [
                                "Teacher draws a 1D line: Start (0) to Goal (10). Current pos = 4, Next pos = 6.",
                                "Potential Φ(s) = −|10−s|. Setup: γ = 0.9.",
                                "Guided Calculation: Φ(4) = −6, Φ(6) = −4.",
                                "Shaping Bonus = 0.9 * (−4) − (−6) = −3.6 + 6 = 2.4.",
                                "Discussion: 'Why does moving closer to the goal give a positive bonus even if we haven't reached it yet?'"
                            ],
                            inputs: "Calculators and Potential-Based Shaping formula",
                            outputs: "Completed step-by-step bonus calculation on the board",
                            rubrics: ["Numerical accuracy", "Explanation of γ impact", "Classroom participation"],
                            outcomes: "Students master the mathematics of dense reward engineering.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Rule-Breaker Scavenger Hunt",
                            objectives: "Identify 'Reward Hacking' loopholes in common human organizational rules.",
                            instructions: [
                                "Divide class into 4 teams. Each team gets a 'Human Reward' scenario.",
                                "Scenario A: Teachers rewarded for high student pass rates (Loophole: Making exams too easy).",
                                "Scenario B: Salespeople rewarded for number of calls made (Loophole: Calling non-customers/automated bots).",
                                "Scenario C: Cops rewarded for number of tickets issued (Loophole: Targeting minor infractions at speed traps).",
                                "Teams must present: 1. The Hacked Behavior. 2. A 'Fixed' Reward Function that prevents it."
                            ],
                            inputs: "Everyday rule-based scenarios",
                            outputs: "Loophole analysis and 'Reward Fix' proposal",
                            rubrics: ["Identification of 'Agent' goals", "Logical fix design", "Team coordination"],
                            outcomes: "Students recognize that 'Reward Hacking' is a fundamental problem in any incentive system, not just AI.",
                            time: "20 Mins",
                            materials: ["Post-it notes", "Chart paper"]
                        },
                        {
                            level: 4,
                            title: "Credit Assignment Audit",
                            objectives: "Independently analyze the difficulty of attributing success to specific historical actions.",
                            instructions: [
                                "Task: Think of a major success you had (e.g., Passing a difficult exam, winning a match).",
                                "Identify: The 'Sparse Reward' (the grade/trophy).",
                                "List 5 actions you took in the 48 hours before that reward.",
                                "Question: Which of those 5 was the 'Critical Action'? Why is it hard to prove mathematically?",
                                "Reflect: If you were an RL agent, how many 'Simulations' would you need to be SURE about which action worked?"
                            ],
                            inputs: "Personal life event memory",
                            outputs: "Individual 'Credit Assignment' Reflection Note",
                            rubrics: ["Depth of analytical thinking", "Application of RL terminology", "Originality"],
                            outcomes: "Students internalize the 'Temporal Credit Assignment' challenge through personal experience.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Safe RL for Drones"
                subtitle="Balancing Speed and Safety"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Construction size={18} /> The Safety Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building a controller for a drone in a warehouse. If it crashes (Exploration), it costs 50,000 rupees. How do you let it learn without destroying the hardware?
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center">
                            <ShieldAlert size={24} className="mx-auto mb-2 text-red-500" />
                            <div className="text-[10px] font-bold">Safety Constrained RL</div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center">
                            <Layout size={24} className="mx-auto mb-2 text-blue-500" />
                            <div className="text-[10px] font-bold">Sim-to-Real Transfer</div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center">
                            <Users2 size={24} className="mx-auto mb-2 text-emerald-500" />
                            <div className="text-[10px] font-bold">Expert Demo Pre-training</div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Exam-Ready Challenges"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the "Credit Assignment Problem"?', a: 'It is the difficulty of determining which previous action or set of actions is responsible for a reward received much later.' },
                        { q: 'Explain "Reward Hacking" with an example.', a: 'When an agent finds a way to get high rewards by exploiting flaws in the reward function instead of solving the task (e.g., a cleaner robot moving dirt in circles).' },
                        { q: 'Define "Sparse Rewards".', a: 'A situation where the agent receives a reward signal very infrequently, making it hard to know if it is making progress.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: The Challenge Explorer"
                subtitle="Visualize Loophole Logic"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Reward Hacking Sandbox"
                    description="See RL fail in surprising ways"
                    objective="Design a reward function and watch the agent find unexpected loopholes that satisfy the reward without achieving the goal."
                    badge="Interactive Lab"
                    tips={['Classic: "Clean the room" → agent hides objects under the rug',
                'Try to design a reward that cannot be hacked!']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between Intended Learning and Reward Hacking to see how an agent's logic can "break" if the reward isn't designed perfectly.
                    </p>
                    <RewardHackingLab />
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
                    const data = getTopicData('unit1', 'Topic12_ChallengesWithRL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic12_ChallengesWithRL');
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
                        <div className="bg-red-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-red-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Challenges: Acknowledged!</h3>
                                <p className="text-red-100">
                                    You've seen the dark side of RL. Now, let's see how it compares to the rest of the AI family.
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-red-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: RL vs DL vs ML
                                </button>
                                <button className="px-10 py-4 bg-red-700 text-white font-black rounded-2xl hover:bg-red-800 transition-colors">
                                    REVIEW CHALLENGES
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

