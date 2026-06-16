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
import { DiscountCurveVis, RecursiveReturnVis } from '../../components/visualizers';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Target,
    Zap,
    TrendingUp,
    Clock,
    Briefcase,
    Users2,
    Layout,
    Compass,
    Map,
    Award,
    Move,
    MousePointer2,
    AlertTriangle,
    Play,
    RotateCcw,
    CheckCircle2
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Need For R L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Need For R L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Need For R L simulator.",
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
    "🤖 [System] Initializing Need For R L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Need For R L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 2 ──────────────────────────────────────

/**
 * Interactive Discovery Maze Visualizer
 */
function DiscoveryMaze() {
    const [position, setPosition] = useState(0);
    const [history, setHistory] = useState<number[]>([]);
    const [message, setMessage] = useState("Click 'Move' to discover the path!");

    const mazeSize = 5;
    const goal = 4;
    const traps = [1, 3];

    const handleMove = () => {
        if (position >= goal) return;

        const nextPos = position + 1;
        setPosition(nextPos);
        setHistory([...history, nextPos]);

        if (traps.includes(nextPos)) {
            setMessage("💥 Ouch! A trap! Learning to avoid this next time...");
            setTimeout(() => {
                setPosition(0);
                setMessage("Restarting... But now you know where the traps are!");
            }, 1000);
        } else if (nextPos === goal) {
            setMessage("🎉 Goal reached! Total experience gained.");
        } else {
            setMessage("Safe move. Keep exploring!");
        }
    };

    const reset = () => {
        setPosition(0);
        setHistory([]);
        setMessage("Click 'Move' to discover the path!");
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Compass size={18} className="text-primary-500" />
                        The Discovery Maze
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Why RL is needed: Learning without a map.</p>
                </div>
                <button onClick={reset} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                    <RotateCcw size={16} />
                </button>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                {Array.from({ length: mazeSize }).map((_, i) => (
                    <React.Fragment key={i}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs shadow-sm transition-all border-2
                            ${position === i ? 'bg-primary-500 text-white scale-110 border-primary-400 shadow-primary-500/20' :
                                traps.includes(i) && history.includes(i) ? 'bg-red-100 text-red-600 border-red-200' :
                                    i === goal ? 'bg-emerald-100 text-emerald-600 border-emerald-200' :
                                        'bg-slate-50 dark:bg-slate-900 text-slate-300 border-slate-100 dark:border-slate-800'}`}>
                            {i === goal ? '🎁' : traps.includes(i) && history.includes(i) ? '💀' : position === i ? '🤖' : i}
                        </div>
                        {i < mazeSize - 1 && <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800" />}
                    </React.Fragment>
                ))}
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className={`text-xs font-bold text-center px-4 py-2 rounded-full ${message.includes('Ouch') ? 'bg-red-50 text-red-600' : message.includes('Goal') ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50 text-primary-600'}`}>
                    {message}
                </p>
                <button
                    disabled={position >= goal || message.includes('Restarting')}
                    onClick={handleMove}
                    className="group relative px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                    <span className="flex items-center gap-2">
                        <Play size={16} fill="currentColor" /> Move Forward
                    </span>
                </button>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic2_NeedForRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic2_needforrl" />
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
                        const data = getTopicData('unit1', 'Topic2_NeedForRL');
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
                title="1. The Mars Explorer"
                subtitle="Why Pre-programming Fails"
                icon={<Zap className="text-amber-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
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
                                "Without RL, your robot vacuum would just repeatedly headbutt the wall like a confused Roomba until its battery dies."
                            </p>
                        </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Target size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                            🚀 The Case for Autonomy
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are a scientist at NASA. You just landed a rover on Mars. You want it to find rare minerals, but you don't have a map of the terrain.
                            </p>
                            <p>
                                <strong>Supervised Learning</strong> won't work because you don't have a dataset of "Mars Rocks" with labels.
                                <strong>Unsupervised Learning</strong> won't work because grouping rocks isn't the same as <em>finding</em> them.
                            </p>
                            <p>
                                <strong>The Solution:</strong> You give the rover a goal and a reward system. "+10 points for finding minerals, -5 points for bumping into a crater." The rover must explore, fail, and learn the best path by itself.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Dynamic Environments">
                            RL is needed when the world changes constantly (e.g., Stock Markets, Traffic).
                        </InfoCard>
                        <InfoCard type="warning" title="The Discovery Gap">
                            RL excels when the "Correct Answer" isn't known beforehand.
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
                                Self-driving cars in dense, chaotic traffic cannot rely purely on labeled images (Supervised Learning) because the next road situation depends dynamically on the car's current speed and angle.
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
                            Crucial for designing agents that solve sequential decision-making tasks where 'correct answers' are not known in advance.
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
                                    Can learn completely autonomous, optimal strategies in complex, high-dimensional, and shifting environments.
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
                                    Designing an accurate, non-exploitable reward function is exceptionally challenging and computationally expensive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Optimization Objective"
                subtitle="The Math of Long-Term Success"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        The core question in RL: <strong>what exactly should the agent maximise?</strong> Not just the next reward — the total discounted sum of all future rewards.
                    </p>

                    <MathBlock
                        formula="\pi^* = \arg\max_{\pi}\; \mathbb{E}_{\pi}\!\left[\sum_{t=0}^{\infty} \gamma^t R_{t+1}\right]"
                        label="The RL Optimisation Objective"
                        accent="blue"
                        explanation="Find the policy π* that maximises the expected discounted cumulative reward starting from any state."
                        interpretation="This is the master equation of RL. It says: search over all possible policies π and pick the one that gives the highest expected total discounted reward. Every RL algorithm — Q-learning, PPO, SAC — is ultimately solving this equation."
                        motivation="Without this objective, we have no direction. A robot that only maximises the next reward will take shortcuts that destroy long-term performance. This equation forces the agent to think ahead."
                        terms={[
                            { term: '\\pi^*', name: 'Optimal Policy', meaning: 'The best possible mapping from states to actions. Once found, the agent always knows the right action in every situation.', range: '\\mathcal{S}\\to\\mathcal{A}', example: 'In chess: π*(board_state) = "move knight to e5".' },
                            { term: '\\arg\\max_{\\pi}', name: 'Argument of Maximum', meaning: 'Returns the policy π that achieves the highest value of the expression. We are searching over the space of all possible policies.', range: '\\text{Policy space}', example: 'Like finding which route gives the shortest travel time.' },
                            { term: '\\mathbb{E}_{\\pi}', name: 'Expectation under π', meaning: 'Average over all possible trajectories the agent might experience when following policy π. Needed because environments can be stochastic.', range: '\\mathbb{R}', example: 'If 70% of the time action A gives +10 and 30% gives −2: E = 0.7×10 + 0.3×(−2) = 6.4.' },
                            { term: '\\gamma^t', name: 'Discount at step t', meaning: 'Exponential decay applied to reward at step t. Makes near-term rewards more valuable than distant ones.', range: '(0,1]', example: 'γ=0.95, t=10: γ^{10}=0.60. A reward of 100 ten steps away is worth 60 now.' },
                            { term: 'R_{t+1}', name: 'Reward at step t+1', meaning: 'Scalar feedback from the environment after the agent acts at time t.', range: '\\mathbb{R}', example: '+1 for each step closer to goal, −100 for falling off cliff.' },
                        ]}
                        numericalExample={{
                            setup: 'Agent follows policy π. Rewards over 3 steps: R₁=1, R₂=4, R₃=2. γ=0.9.',
                            steps: [
                                'Discounted sum = γ⁰·R₁ + γ¹·R₂ + γ²·R₃',
                                '= 1.0×1 + 0.9×4 + 0.81×2',
                                '= 1 + 3.6 + 1.62',
                                '= 6.22',
                            ],
                            result: 'E_π[G₀] = 6.22. The optimal policy π* is the one that achieves the highest such value across all possible trajectories.',
                        }}
                    />
                    <DiscountCurveVis formula="\\pi^* = \\arg\\max_\\pi \\mathbb{E}_\\pi[\\sum \\gamma^t R]" accent="blue" />

                    <MathBlock
                        formula="G_t = R_{t+1} + \gamma G_{t+1} \quad \text{(recursive form)}"
                        label="Recursive Return — Bellman Decomposition"
                        accent="violet"
                        explanation="The return at time t equals the immediate reward plus the discounted return from the next step. This recursive structure is the key to dynamic programming in RL."
                        interpretation="This deceptively simple equation is the foundation of every RL update rule. It says: the value of being in a situation equals what you get right now plus the discounted value of where you end up. Q-learning, TD-learning, and the Bellman equation all derive from this."
                        motivation="The recursive form allows us to compute G_t without knowing all future rewards upfront. We can update estimates incrementally as new rewards arrive — this is what makes online RL learning possible."
                        terms={[
                            { term: 'G_t', name: 'Return at time t', meaning: 'Total discounted reward from step t to end of episode.', range: '\\mathbb{R}', example: 'G₃ = R₄ + γ·G₄' },
                            { term: 'R_{t+1}', name: 'Immediate Reward', meaning: 'Reward received one step after time t.', range: '\\mathbb{R}', example: 'R₄ = +5 (reached sub-goal)' },
                            { term: '\\gamma G_{t+1}', name: 'Discounted Future Return', meaning: 'The return from the next state, scaled down by γ. Captures all future rewards beyond t+1.', range: '\\mathbb{R}', example: 'γ=0.9, G₄=10 → γ·G₄ = 9' },
                        ]}
                        numericalExample={{
                            setup: 'Compute G₁ recursively. Rewards: R₂=3, R₃=0, R₄=6. γ=0.9.',
                            steps: [
                                'G₄ = R₅ = 0  (episode ends)',
                                'G₃ = R₄ + γ·G₄ = 6 + 0.9×0 = 6',
                                'G₂ = R₃ + γ·G₃ = 0 + 0.9×6 = 5.4',
                                'G₁ = R₂ + γ·G₂ = 3 + 0.9×5.4 = 7.86',
                            ],
                            result: 'G₁ = 7.86. Notice how the +6 reward at step 4 propagates backwards through the recursion.',
                        }}
                    />
                    <RecursiveReturnVis />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Need For R L Architecture"
                description="Decision making in ambiguous scenarios vs clear labels."
                chart={`graph TD
    A[Problem] --> B{Are there labels?}
    B -- Yes --> C[Supervised Learning]
    B -- No --> D{Sequential Decisions?}
    D -- No --> E[Unsupervised Learning]
    D -- Yes --> F[Reinforcement Learning]
    F --> G[Trial & Error Discovery]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Understanding Autonomy"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Discovery Maze Demo",
                            objectives: "Demonstrate how an agent learns from failure when no pre-existing map is provided.",
                            instructions: [
                                "Open the 'Discovery Maze' in the Virtual Lab section.",
                                "Move forward and hit a trap intentionally.",
                                "Explain that the negative feedback (💀) is the only information the agent receives.",
                                "Show how the 'History' (history markers) helps the agent 'learn' to avoid the trap in the next run."
                            ],
                            inputs: "Interactive Maze Visualizer",
                            outputs: "Verbal walkthrough of the failure-restart-learning cycle.",
                            rubrics: ["Clarity of explanation", "Engagement", "Demonstration of trap learning"],
                            outcomes: "Students observe that RL is needed because it handles 'Discovery' without labels.",
                            time: "10 Mins",
                            materials: ["Digital Screen", "Virtual Lab"]
                        },
                        {
                            level: 2,
                            title: "Mars Rover Reward Workshop",
                            objectives: "Collaboratively design a reward system for a complex autonomous mission.",
                            instructions: [
                                "Scenario: A Mars Rover must find ice, avoid craters, and maintain battery.",
                                "Teacher lists 5 events on the board: Found Ice, Hit Rock, Low Battery, Fast Move, Goal Reached.",
                                "Students suggest reward values (+/- points) for each.",
                                "Discuss: 'Why should a crash be -100 but a rock hit only -5?' (Penalty scaling)."
                            ],
                            inputs: "List of rover events",
                            outputs: "A balanced Reward Table on the whiteboard",
                            rubrics: ["Logical consistency", "Justification of values", "Collaborative participation"],
                            outcomes: "Students understand that the 'Need' for RL is met by designing correct feedback loops.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Clapping Discovery Game",
                            objectives: "Experience RL-based learning in a social physical environment.",
                            instructions: [
                                "One student (The Agent) leaves the room.",
                                "The class hides a small object (The Goal).",
                                "The Agent returns and must find the object using ONLY claps from the class.",
                                "Loud claps = Positive Reward; Soft claps = Negative Reward.",
                                "Discuss: Did the Agent have a map? No. Did it learn from feedback? Yes."
                            ],
                            inputs: "Physical classroom space",
                            outputs: "Successful discovery of the hidden object",
                            rubrics: ["Agent's responsiveness to feedback", "Classroom coordination", "Debrief participation"],
                            outcomes: "Students internalize the 'Need' for RL when explicit instructions are absent.",
                            time: "20 Mins",
                            materials: ["Small object (Key/Pen)"]
                        },
                        {
                            level: 4,
                            title: "Autonomy Reflection",
                            objectives: "Independently analyze the failure points of traditional programming in dynamic tasks.",
                            instructions: [
                                "Task: Think of an 'Automatic Car Parking' system.",
                                "Write 3 scenarios where 'Traditional IF-THEN' code would fail (e.g., unexpected dog, dynamic lighting).",
                                "Explain how an RL agent would 'discover' a solution for these edge cases.",
                                "Self-Evaluation: List 2 reasons why RL is 'Need-of-the-hour' for robotics."
                            ],
                            inputs: "Personal knowledge of automated systems",
                            outputs: "Individual reflection note (Digital/Paper)",
                            rubrics: ["Identification of edge cases", "Depth of reasoning", "Originality"],
                            outcomes: "Students develop a critical understanding of RL's necessity in non-deterministic worlds.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Autonomous Warehouse Drone"
                subtitle="Applying the Need for RL"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Map size={18} /> The Navigation Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A drone must deliver parcels in a crowded warehouse where shelves are moved daily.
                            <strong>Task:</strong> Explain why a pre-programmed path (Traditional Coding) will fail and how RL provides the "Need" for adaptability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                            <h6 className="font-bold text-xs mb-2 flex items-center gap-2 text-red-500"><AlertTriangle size={14} /> Traditional Failure</h6>
                            <p className="text-[10px] text-slate-500">Fixed paths crash when a shelf is moved. Hard-coded rules are too brittle.</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                            <h6 className="font-bold text-xs mb-2 flex items-center gap-2 text-emerald-500"><Award size={14} /> RL Success</h6>
                            <p className="text-[10px] text-slate-500">The drone explores and updates its "Value Function" as the environment changes.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Essential Review"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'State the need for Reinforcement Learning.', a: 'RL is needed for complex, dynamic environments where an explicit dataset of "Correct Answers" is not available.' },
                        { q: 'Why is Supervised Learning not suitable for a robot walking in a forest?', a: 'Supervised learning needs a pre-labeled dataset of every possible obstacle, which is impossible to create for a random forest.' },
                        { q: 'What is the "Credit Assignment Problem" in RL?', a: 'It refers to the difficulty of knowing which specific action in a long sequence was responsible for an eventually received reward.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: The Discovery Maze"
                subtitle="Visualize Learning Without a Map"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Decision Landscape Explorer"
                    description="Sequential decision-making without labels"
                    objective="Explore why supervised learning fails in sequential, dynamic environments. Navigate the maze yourself vs letting RL do it."
                    badge="Interactive Lab"
                    tips={['Note how the agent has no teacher — it discovers the path through reward signals',
                'Compare how many steps you need vs a random agent']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Help the robot reach the goal! You don't know where the traps are. Every time you hit a trap, the agent learns and restarts. This is how RL "discovers" the safe path.
                    </p>
                    <DiscoveryMaze />
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
                    const data = getTopicData('unit1', 'Topic2_NeedForRL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic2_NeedForRL');
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
                        <div className="bg-amber-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-amber-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Need for RL: Established!</h3>
                                <p className="text-amber-100">
                                    You've seen why traditional AI fails in dynamic worlds. Now, let's see how RL stacks up against Supervised and Unsupervised Learning.
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-amber-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: RL vs SL vs UL
                                </button>
                                <button className="px-10 py-4 bg-amber-700 text-white font-black rounded-2xl hover:bg-amber-800 transition-colors">
                                    REVIEW NEED
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

