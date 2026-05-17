import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    RefreshCw, Play, ArrowRight, Brain, Globe, Zap,
    Target, Clock, Briefcase, ShieldAlert, Users2, Layout,
    Pause, SkipForward, Info
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, Legend, BarChart, Bar
} from 'recharts';


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

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="2. The Formal Interaction Loop"
                subtitle="From Words to Equations"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="S_0,\;A_0,\;R_1,\;S_1,\;A_1,\;R_2,\;S_2,\;A_2,\;R_3,\;\ldots"
                        label="The RL Interaction Sequence"
                        accent="blue"
                        explanation="The complete history of an RL episode written as an alternating sequence of states, actions, and rewards. This sequence is the raw data from which all RL algorithms learn."
                        interpretation="Reading left to right: the agent starts in S₀, takes action A₀, receives reward R₁ and observes new state S₁, takes action A₁, receives R₂, and so on. Every RL algorithm — from simple Q-learning to complex PPO — processes this sequence to improve the agent's policy."
                        motivation="Writing the interaction as a formal sequence allows us to apply mathematical tools from probability theory and dynamic programming. Without this notation, we cannot derive update rules or prove convergence."
                        terms={[
                            { term: 'S_t', name: 'State at time t', meaning: 'The environment\'s configuration observed by the agent at step t. Must satisfy the Markov property.', range: '\\mathcal{S}', example: 'S₀=(0,0) start, S₁=(0,1) after moving right.' },
                            { term: 'A_t', name: 'Action at time t', meaning: 'The decision made by the agent in state S_t, sampled from policy π(·|S_t).', range: '\\mathcal{A}(S_t)', example: 'A₀=right, A₁=down.' },
                            { term: 'R_{t+1}', name: 'Reward at t+1', meaning: 'Scalar feedback from the environment after action A_t. Subscript t+1 because it arrives one step after the action.', range: '\\mathbb{R}', example: 'R₁=−0.1 (step cost), R_T=+10 (goal reached).' },
                        ]}
                        numericalExample={{
                            setup: 'Robot navigating a 3×3 grid. Start=(0,0), Goal=(2,2). γ=0.9.',
                            steps: [
                                'S₀=(0,0), A₀=right → R₁=−0.1, S₁=(0,1)',
                                'S₁=(0,1), A₁=down  → R₂=−0.1, S₂=(1,1)',
                                'S₂=(1,1), A₂=right → R₃=−0.1, S₃=(1,2)',
                                'S₃=(1,2), A₃=down  → R₄=+10,  S₄=(2,2) ← GOAL',
                            ],
                            result: 'G₀ = −0.1 + 0.9×(−0.1) + 0.81×(−0.1) + 0.729×10 = 7.02. The agent reached the goal in 4 steps.',
                        }}
                    />

                    <MathBlock
                        formula="S_t \in \mathcal{S},\quad A_t \in \mathcal{A}(S_t),\quad R_{t+1} \in \mathcal{R} \subset \mathbb{R}"
                        label="The Sets of RL — Formal Domains"
                        accent="violet"
                        explanation="States, actions, and rewards each belong to well-defined mathematical sets. This formalisation is necessary to prove properties like convergence and optimality."
                        interpretation="This equation defines the 'type system' of RL. States live in the state space 𝒮, actions live in the action space 𝒜(s) which may depend on the current state, and rewards are real numbers. Knowing these sets determines which algorithms are applicable."
                        motivation="Without defining these sets, we cannot distinguish between discrete and continuous RL, finite and infinite MDPs, or episodic and continuing tasks — all of which require different algorithms."
                        terms={[
                            { term: '\\mathcal{S}', name: 'State Space', meaning: 'The set of all possible states the environment can be in. Can be finite (grid world) or infinite (continuous robot state).', range: 'Finite or \\mathbb{R}^n', example: 'Grid world: 𝒮 = {(r,c) : 0≤r,c≤4} — 25 states. CartPole: 𝒮 = ℝ⁴.' },
                            { term: '\\mathcal{A}(S_t)', name: 'Action Space', meaning: 'The set of actions available in state S_t. May vary by state (e.g., cannot move through walls).', range: 'Finite or \\mathbb{R}^m', example: 'Grid: 𝒜={up,down,left,right}. Robot arm: 𝒜=ℝ² (continuous torques).' },
                            { term: '\\mathcal{R}\\subset\\mathbb{R}', name: 'Reward Set', meaning: 'The set of possible reward values. Usually a bounded subset of the real numbers.', range: '\\mathbb{R}', example: '𝒮 = {−1, 0, +1, +10} for a simple grid task.' },
                        ]}
                    />

                    <div className="grid lg:grid-cols-2 gap-6">
                        <RLLoopVisualizer />
                        <div className="space-y-3">
                            <h5 className="font-bold text-slate-800 dark:text-white text-sm">Key Properties of the Interaction</h5>
                            {[
                                { prop: 'Markov Property', desc: 'P(S_{t+1}|S_t,A_t) = P(S_{t+1}|S_0,...,S_t,A_0,...,A_t). The future depends only on the present state, not the full history.' },
                                { prop: 'Stationarity', desc: 'The transition dynamics P(s\'|s,a) and reward R(s,a) do not change over time. The same action in the same state always has the same distribution of outcomes.' },
                                { prop: 'Causality', desc: 'R_{t+1} and S_{t+1} are caused by A_t and S_t. The agent\'s action at time t affects the world at time t+1, not before.' },
                            ].map(p => (
                                <div key={p.prop} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-1">{p.prop}</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
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


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="3. Multi-Level Activities"
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

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="4. Project: Smart Traffic"
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

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="5. Quick Check"
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

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="6. Virtual Lab: The Cycle Explorer"
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

            {/* FEEDBACK SECTION */}
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
}

