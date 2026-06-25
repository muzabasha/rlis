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
    RefreshCw,
    Play,
    ArrowRight,
    Brain,
    Globe,
    Zap,
    Target,
    Clock,
    Briefcase,
    ShieldAlert,
    Users2,
    Layout,
    Pause,
    SkipForward,
    Info,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, Legend, BarChart, Bar
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { RLInteractionCycleVis, SetsOfRLVis } from '../../components/visualizers';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Working Of R L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Working Of R L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Working Of R L simulator.",
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
    "🤖 [System] Initializing Working Of R L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Working Of R L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 6 ──────────────────────────────────────

/**
 * Interactive RL Loop Visualizer
 */
function RLLoopVisualizer() {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const steps = [
        { label: 'State (S_t)', target: 'Agent', desc: 'Agent observes the environment.', icon: <Globe size={18} /> },
        { label: 'Action (A_t)', target: 'Environment', desc: 'Agent makes a decision.', icon: <Brain size={18} /> },
        { label: 'Reward (R_{t+1})', target: 'Agent', desc: 'Environment gives feedback.', icon: <Zap size={18} /> },
        { label: 'Next State (S_{t+1})', target: 'Agent', desc: 'Environment changes state.', icon: <RefreshCw size={18} /> }
    ];

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(prev => (prev + 1) % steps.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">The Interaction Cycle</h4>
                    <p className="text-xs text-slate-500">Step through the RL interaction loop.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`p-2 rounded-xl transition-colors ${isPlaying ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button
                        onClick={() => setStep((step + 1) % steps.length)}
                        className="p-2 bg-slate-200 dark:bg-slate-700 rounded-xl"
                    >
                        <SkipForward size={18} />
                    </button>
                </div>
            </div>

            <div className="relative h-64 flex items-center justify-between px-12">
                {/* Agent */}
                <motion.div
                    animate={{
                        scale: steps[step].target === 'Agent' ? 1.1 : 1,
                        borderColor: steps[step].target === 'Agent' ? '#3b82f6' : '#e2e8f0'
                    }}
                    className="w-32 h-32 rounded-[2rem] bg-white dark:bg-slate-800 border-4 shadow-xl flex flex-col items-center justify-center gap-2 z-10"
                >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl">
                        <Brain size={24} />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">Agent</span>
                </motion.div>

                {/* Arrows/Flow */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100%" height="100%" className="overflow-visible">
                        {/* Action Flow */}
                        <path
                            d="M 140 128 L 360 128"
                            fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6"
                        />
                        {/* Feedback Flow */}
                        <path
                            d="M 360 160 Q 250 200 140 160"
                            fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6"
                        />

                        {/* Active Pulse Action */}
                        {step === 1 && (
                            <motion.circle
                                r="6" fill="#3b82f6"
                                initial={{ cx: 140, cy: 128 }}
                                animate={{ cx: 360, cy: 128 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                        {/* Active Pulse Feedback */}
                        {(step === 2 || step === 3) && (
                            <motion.circle
                                r="6" fill="#10b981"
                                initial={{ offset: 0 }}
                                animate={{ offset: 1 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <animateMotion
                                    path="M 360 160 Q 250 200 140 160"
                                    dur="1.5s" repeatCount="indefinite"
                                />
                            </motion.circle>
                        )}
                    </svg>
                </div>

                {/* Environment */}
                <motion.div
                    animate={{
                        scale: steps[step].target === 'Environment' ? 1.1 : 1,
                        borderColor: steps[step].target === 'Environment' ? '#10b981' : '#e2e8f0'
                    }}
                    className="w-32 h-32 rounded-[2rem] bg-white dark:bg-slate-800 border-4 shadow-xl flex flex-col items-center justify-center gap-2 z-10"
                >
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
                        <Globe size={24} />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">Env</span>
                </motion.div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4"
                >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-primary-500">
                        {steps[step].icon}
                    </div>
                    <div>
                        <div className="font-black text-sm text-primary-600 uppercase tracking-tighter">{steps[step].label}</div>
                        <div className="text-xs text-slate-500">{steps[step].desc}</div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic6_WorkingOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic6_workingofrl" />
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
                        const data = getTopicData('unit1', 'Topic6_WorkingOfRL');
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
                title="1. The Blindfolded Explorer"
                subtitle="The Rhythm of Trial and Error"
                icon={<RefreshCw className="text-blue-600" size={24} />}
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
                                "It's basically an endless loop of 'mess around and find out', mathematically formalized."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <RefreshCw size={200} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🤖 Rover's First Night
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a small robot named <strong>Rover</strong>. Rover has been placed in a pitch-black room. He has no map and no sensors except for a small "Ouch" detector.
                            </p>
                            <p>
                                Rover takes a step forward (<strong>Action</strong>). <em>CLANG!</em> He hits a metal shelf (<strong>Reward: -10</strong>). His "Ouch" detector glows red. He now knows that "moving forward in this spot" is a bad idea.
                            </p>
                            <p>
                                He turns 90 degrees and moves again. This time, no noise. He feels a soft carpet (<strong>Next State</strong>). He keeps going until he finds a Charging Dock (<strong>Reward: +100</strong>).
                            </p>
                            <p>
                                This cycle of <strong>Observe → Act → Feedback → Update</strong> is exactly how Reinforcement Learning works. It's a rhythm that never stops.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="question" title="Class Reflection">
                            Think about how you learned to ride a bike. Can you identify the "State", "Action", and "Reward" in that experience?
                        </InfoCard>
                        <InfoCard type="insight" title="The 'Step' Concept">
                            In RL, time isn't measured in seconds, but in <strong>Steps</strong>. One step is one full cycle of the loop.
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
                                An automated HVAC thermostat must continuously sense temperature (state), adjust cooling (action), and receive energy efficiency scores (reward) in a closed loop.
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
                            Essential to understand the step-by-step telemetry of the closed-loop agent-environment interaction.
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
                                    Simulates real-time, online continuous adaptation to external environmental perturbations.
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
                                    A single delay or latency in the state feedback loop can destabilize the control system completely.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. The Formal Interaction Loop"
                subtitle="From Words to Equations"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="S_0,\\;A_0,\\;R_1,\\;S_1,\\;A_1,\\;R_2,\\;S_2,\\;A_2,\\;R_3,\\;\\ldots"
                        label="The RL Interaction Sequence"
                        accent="blue"
                        explanation="The chronological sequence of alternating states, actions, and rewards representing a single interaction run."
                        interpretation="The time series generated by the agent and environment interacting step-by-step. Time increments with each action and response cycle."
                        motivation="Visualizes how experience unfolds sequentially in a Markov Decision Process."
                        terms={[
                            { term: 'S_0', name: 'Initial State', meaning: 'The starting state of the environment.', range: 'State Space \\mathcal{S}', example: 'Grid cell position (0,0).' },
                            { term: 'A_0', name: 'Initial Action', meaning: 'The first action chosen by the agent.', range: 'Action Space \\mathcal{A}', example: 'Move right.' },
                            { term: 'R_1', name: 'First Reward', meaning: 'The first scalar reward emitted by the environment.', range: '\\mathbb{R}', example: '-1 step penalty.' }
                        ]}
                        numericalExample={{
                            setup: 'An agent starts at state 0, takes action 1, receives reward 0, transitions to state 2, takes action 0, receives reward 10.',
                            steps: [
                                'Start: State S_0 = 0',
                                'Action: A_0 = 1, Reward: R_1 = 0, Next State: S_1 = 2',
                                'Action: A_1 = 0, Reward: R_2 = 10, Next State: S_2 = 3'
                            ],
                            result: 'Interaction prefix trajectory: (0, 1, 0, 2, 0, 10, 3)'
                        }}
                    />

                    <RLInteractionCycleVis />

                    <MathBlock
                        formula="S_t \\in \\mathcal{S},\\quad A_t \\in \\mathcal{A}(S_t),\\quad R_{t+1} \\in \\mathcal{R} \\subset \\mathbb{R}"
                        label="The Sets of RL — Formal Domains"
                        accent="violet"
                        explanation="Mathematical bounds constraining states, actions, and rewards."
                        interpretation="At time t, the state S_t belongs to the state space. The action A_t must be chosen from the set of actions available in state S_t. The next reward belongs to the reward space."
                        motivation="Ensures all variables are mathematically bounded and that action availability can depend on state context."
                        terms={[
                            { term: '\\mathcal{S}', name: 'State Space', meaning: 'The set of all possible environmental states.', range: 'Set of states', example: 'All grid cell coordinate pairs.' },
                            { term: '\\mathcal{A}(S_t)', name: 'State-Dependent Actions', meaning: 'The set of actions the agent can take when in state S_t.', range: 'Set of actions', example: 'Available movements (no wall crossings).' },
                            { term: '\\mathcal{R}', name: 'Reward Space', meaning: 'The set of possible reward values, bounded within real numbers.', range: 'Subset of \\mathbb{R}', example: '{-1, 0, 100}.' }
                        ]}
                        numericalExample={{
                            setup: 'An agent is at grid corner cell (0, 0). Movement options are limited compared to center cells.',
                            steps: [
                                'State S_t = (0, 0)',
                                'Available actions: \\mathcal{A}((0, 0)) = \\{down, right\\} (cannot go up or left)',
                                'Action selected: A_t = right \\in \\mathcal{A}((0,0))'
                            ],
                            result: 'Action choice is mathematically valid within state constraints.'
                        }}
                    />

                    <SetsOfRLVis />

                    
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Working Of R L Architecture"
                description="The step-by-step control loop of an RL agent."
                chart={`sequenceDiagram
    participant A as Agent
    participant E as Environment
    A->>E: Execute Action (A_t)
    E-->>A: Yield Reward (R_{t+1})
    E-->>A: Transition State (S_{t+1})
    Note over A: Update Knowledge
    Note over A: Select Next Action`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Stepping through the RL Loop"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Loop Visualizer Demo",
                            objectives: "Visually demonstrate the sequence of State, Action, Reward, and Next State in a continuous cycle.",
                            instructions: [
                                "Open the 'Interaction Cycle' visualizer in the Virtual Lab section.",
                                "Click 'Play' and point out the pulse moving from Agent to Environment (Action).",
                                "Wait for the feedback pulse (Reward + Next State) to return to the Agent.",
                                "Pause at 'Step 2' and ask: 'What did the agent just receive?' (Reward).",
                                "Explain that this cycle happens thousands of times in a real RL training run."
                            ],
                            inputs: "Interactive RLLoopVisualizer component",
                            outputs: "Dynamic SVG animation showing data flow between Agent and Env.",
                            rubrics: ["Clarity of step sequencing", "Explanation of data flow", "Student engagement"],
                            outcomes: "Students identify the chronological order of events in the RL interaction loop.",
                            time: "10 Mins",
                            materials: ["Interactive Lab", "Digital Projector"]
                        },
                        {
                            level: 2,
                            title: "The Vending Machine Trace",
                            objectives: "Collaboratively map the state-action transitions of a common automated system.",
                            instructions: [
                                "Teacher draws 3 empty boxes on the board: S_t, A_t, R_{t+1}.",
                                "Scenario: Using a Coffee Vending Machine.",
                                "Guided Discussion: If S_t is 'Idle (Waiting for Coin)', what is the Action? (Insert Coin).",
                                "If the action is successful, what is R_{t+1}? (0 or sound). What is S_{t+1}? (Paid).",
                                "Repeat for 'Selecting Beverage' and 'Dispensing'."
                            ],
                            inputs: "Vending machine operational steps",
                            outputs: "Completed sequence trace on the whiteboard",
                            rubrics: ["Correct state-action mapping", "Logical flow", "Team participation"],
                            outcomes: "Students learn to break down a complex task into discrete RL interaction steps.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Colored Markers"]
                        },
                        {
                            level: 3,
                            title: "The Smart Traffic Roleplay",
                            objectives: "Simulate a multi-step RL loop where actions have delayed consequences.",
                            instructions: [
                                "Divide class into 4 groups: The Sensor (Detects cars), The Controller (Sets light timer), The Driver (Gives 'Ouch' if stuck), The Timer (Manages 'Steps').",
                                "Run 5 'Steps' of a traffic junction simulation.",
                                "The Controller must decide the 'Green Light' duration based on what the Sensor 'Observes'.",
                                "If a queue builds up, the Driver gives a negative reward.",
                                "Discuss: 'Why did the action in Step 1 cause a traffic jam in Step 3?'"
                            ],
                            inputs: "Paper cars/junction markers",
                            outputs: "A log of 5 steps with actions and rewards",
                            rubrics: ["Coordination between roles", "Responsiveness to rewards", "Post-activity debrief"],
                            outcomes: "Students internalize that RL actions affect the future state of the world.",
                            time: "20 Mins",
                            materials: ["Role cards", "Toy cars (optional)"]
                        },
                        {
                            level: 4,
                            title: "Personal RL Skill Loop",
                            objectives: "Independently map the RL loop to a personal learning experience.",
                            instructions: [
                                "Task: Choose a skill you recently learned (e.g., Cooking, Gaming, or a Sport).",
                                "Write down one full loop: What was your 'Observation' (State)? What was your 'Attempt' (Action)?",
                                "What was the 'Result' (Reward)? How did you 'Change' (Next State/Policy)?",
                                "Self-Evaluation: Did you use high γ (long-term focus) or low γ (short-term fun)?"
                            ],
                            inputs: "Personal learning memories",
                            outputs: "Individual Skill-Loop Diagram",
                            rubrics: ["Depth of reflection", "Correct use of RL sequence notation", "Originality"],
                            outcomes: "Students connect formal RL math (S, A, R) to their own human learning process.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Smart Traffic"
                subtitle="Optimizing the Urban Loop"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-8">
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="card p-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">State</div>
                            <p className="text-xs font-bold">Traffic density at 4 junctions.</p>
                        </div>
                        <div className="card p-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Action</div>
                            <p className="text-xs font-bold">Set Green light duration (30s-90s).</p>
                        </div>
                        <div className="card p-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Reward</div>
                            <p className="text-xs font-bold">Negative of average wait time.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="font-bold text-sm">Implementation Risks</h5>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30 text-xs text-amber-700 dark:text-amber-300 flex gap-3">
                            <ShieldAlert size={18} />
                            <div>
                                <strong>Safety Constraint:</strong> The RL agent must never set all lights to Green simultaneously! This requires an "Action Mask" layer.
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Essential Examination Points"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What are the two main entities in the RL loop?', a: 'The Agent (learner/decision maker) and the Environment (everything outside the agent).' },
                        { q: 'Explain the difference between S_t and S_{t+1}.', a: 'S_t is the current state observed by the agent before taking an action. S_{t+1} is the state the environment transitions into after the action.' },
                        { q: 'Is the reward R_t always positive?', a: 'No. Rewards can be positive (pleasure), negative (pain/cost), or zero (neutral).' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: The Cycle Explorer"
                subtitle="Fine-tuning the Interaction"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="RL Loop Visualizer"
                    description="Step through the Agent-Environment cycle"
                    objective="Use Step mode to manually tick through the RL control loop. Observe state, action, reward, and next state at each tick."
                    badge="Interactive Lab"
                    tips={['Press Step once and trace the full SARS tuple',
                'Use Run to watch continuous learning unfold',
                'Increase speed for long-horizon convergence']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Adjust the animation speed to see how the agent updates its internal "Brain" after receiving a reward. In high-speed systems, this happens thousands of times per second.
                    </p>
                    <RLLoopVisualizer />
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
                    const data = getTopicData('unit1', 'Topic6_WorkingOfRL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic6_WorkingOfRL');
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
                                <h3 className="text-3xl font-black italic">Interaction Loop: Complete!</h3>
                                <p className="text-blue-100">
                                    You've decoded the heartbeat of Reinforcement Learning. Ready to see the actual math that connects these dots?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-blue-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    APPROVE TOPIC
                                </button>
                                <button className="px-10 py-4 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 transition-colors">
                                    REVIEW LOOP
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

