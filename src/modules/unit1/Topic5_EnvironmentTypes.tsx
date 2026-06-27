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
    Globe,
    Settings,
    Wind,
    Eye,
    EyeOff,
    Zap,
    Target,
    Clock,
    Briefcase,
    ShieldAlert,
    Users2,
    Layout,
    Dice6,
    Map,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, Legend, BarChart, Bar,
    ScatterChart, Scatter, ZAxis
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { TransitionProbVis, ExpectedRewardVis } from '../../components/visualizers';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Environment Types Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Environment Types Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Environment Types simulator.",
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
    "🤖 [System] Initializing Environment Types Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Environment Types\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 5 ──────────────────────────────────────

/**
 * Interactive Environment Property Visualizer
 */
function EnvironmentTuner() {
    const [stochasticity, setStochasticity] = useState(0.2);
    const [observability, setObservability] = useState(0.8);

    // Simulate a path with noise
    const generatePathData = (noise: number) => {
        return Array.from({ length: 10 }, (_, i) => ({
            step: i,
            ideal: i * 10,
            actual: i * 10 + (Math.random() - 0.5) * noise * 50
        }));
    };

    const [pathData, setPathData] = useState(generatePathData(stochasticity));

    useEffect(() => {
        setPathData(generatePathData(stochasticity));
    }, [stochasticity]);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Globe size={18} className="text-cyan-500" />
                    Environment Property Tuner
                </h4>
                <div className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-bold">
                    Sandbox
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium flex items-center gap-2"><Dice6 size={14} /> Stochasticity (Noise)</span>
                            <span className="text-cyan-600 font-bold">{(stochasticity * 100).toFixed(0)}%</span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.1" value={stochasticity}
                            onChange={(e) => setStochasticity(parseFloat(e.target.value))}
                            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-cyan-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Deterministic</span>
                            <span>Highly Stochastic</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium flex items-center gap-2">
                                {observability > 0.5 ? <Eye size={14} /> : <EyeOff size={14} />}
                                Observability
                            </span>
                            <span className="text-indigo-600 font-bold">{(observability * 100).toFixed(0)}%</span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.1" value={observability}
                            onChange={(e) => setObservability(parseFloat(e.target.value))}
                            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-indigo-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Partially (PO-MDP)</span>
                            <span>Fully (MDP)</span>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-[11px] leading-relaxed italic text-slate-500">
                        "In a <span className="text-cyan-600 font-bold">Stochastic</span> environment, the same action might lead to different outcomes. In a <span className="text-indigo-600 font-bold">Partially Observable</span> one, you don't even know where you are exactly."
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-[200px] bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={pathData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="step" hide />
                                <YAxis hide domain={[0, 150]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }}
                                />
                                <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeDasharray="5 5" name="Intended Path" dot={false} />
                                <Line
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#06b6d4"
                                    strokeWidth={3}
                                    name="Actual Path"
                                    dot={{ r: 4, fill: observability > 0.5 ? '#06b6d4' : '#e2e8f0' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center">
                        <div className={`text-xs font-bold uppercase tracking-widest ${stochasticity > 0.5 ? 'text-red-500' : 'text-emerald-500'}`}>
                            {stochasticity > 0.5 ? 'Environment: Chaotic' : 'Environment: Stable'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic5_EnvironmentTypes() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic5_environmenttypes" />
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
                        const data = getTopicData('unit1', 'Topic5_EnvironmentTypes');
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
                title="1. The Jungle vs The Zoo"
                subtitle="A Story of Two Habitats"
                icon={<Wind className="text-cyan-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
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
                                "Deterministic environments are like math tests. Stochastic environments are like trying to guess what your partner wants for dinner."
                            </p>
                        </div>
                    </div>
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-8 rounded-[2rem] border border-cyan-100 dark:border-cyan-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Globe size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-cyan-900 dark:text-cyan-100 mb-4 flex items-center gap-2">
                            🐒 Jojo's Dilemma
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Meet <strong>Jojo</strong>, the world's first RL monkey. Jojo grew up in a high-tech <strong>Zoo</strong>.
                            </p>
                            <p>
                                In the Zoo, everything is <strong>Deterministic</strong>. If Jojo presses a button, a banana drops exactly 2 seconds later. He sees the whole cage (<strong>Fully Observable</strong>), and nothing ever moves (<strong>Static</strong>). Learning here is easy.
                            </p>
                            <p>
                                One day, Jojo is released into the <strong>Amazon Jungle</strong>. Suddenly, the world is <strong>Stochastic</strong>. He pulls a vine, but sometimes it snaps. The wind moves the trees (<strong>Dynamic</strong>), and he can't see the leopards hiding in the tall grass (<strong>Partially Observable</strong>).
                            </p>
                            <p>
                                Jojo's brain (the RL Agent) has to completely change how it thinks. He can no longer trust that "Action A always leads to Result B."
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="question" title="Reflective Question">
                            If you were Jojo, would you prefer a world where you knew exactly what would happen next, or one with surprises? Why?
                        </InfoCard>
                        <InfoCard type="insight" title="The Connection">
                            Most RL research starts in the "Zoo" (Simulations) because it's safe. But real AI must eventually survive in the "Jungle" (The Real World).
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
                                A robotic arm sorting warehouse items must operate under varying visibility (partially observable) and slippery surfaces (stochastic).
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
                            Understanding environment types allows developers to pick the correct mathematical frameworks (e.g., MDP vs. POMDP).
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
                                    Prevents algorithmic failures by matching the agent's assumptions to the actual environment dynamics.
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
                                    Complex environment modeling can significantly increase state space and make computations intractable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. Modelling Environment Dynamics"
                subtitle="The Rules of the Jungle"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\\mathcal{P}(s' \\mid s, a) = \\Pr(S_{t+1}=s' \\mid S_t=s,\\, A_t=a)"
                        label="State Transition Probability"
                        accent="blue"
                        explanation="Probability of transitioning to next state s' given current state s and action a."
                        interpretation="Defines the physics engine of the environment, giving the likelihood of landing in a new state based on current state and chosen action."
                        motivation="Necessary for computing expectations of future states in stochastic environments."
                        terms={[
                            { term: '\\mathcal{P}(s\' \\mid s, a)', name: 'Transition Probability', meaning: 'The probability of landing in next state s\'.', range: '[0, 1]', example: '0.8 probability.' },
                            { term: 'S_{t+1}', name: 'Next State Variable', meaning: 'The state at step t+1.', range: 'State Space \\mathcal{S}', example: 'Grid cell (1,2).' },
                            { term: 'S_t', name: 'Current State Variable', meaning: 'The state at step t.', range: 'State Space \\mathcal{S}', example: 'Grid cell (1,1).' },
                            { term: 'A_t', name: 'Action Variable', meaning: 'Action chosen at step t.', range: 'Action Space \\mathcal{A}', example: 'Move right.' }
                        ]}
                        numericalExample={{
                            setup: 'A robot tries to move forward. In a noisy environment, it succeeds with 80% probability, slips left with 10%, slips right with 10%.',
                            steps: [
                                '\\mathcal{P}(forward\\_cell \\mid current\\_cell, move\\_forward) = 0.8',
                                '\\mathcal{P}(left\\_cell \\mid current\\_cell, move\\_forward) = 0.1',
                                '\\mathcal{P}(right\\_cell \\mid current\\_cell, move\\_forward) = 0.1'
                            ],
                            result: 'Sum of next-state probabilities = 0.8 + 0.1 + 0.1 = 1.0.'
                        }}
                    />

                    <TransitionProbVis />

                    <MathBlock
                        formula="\\mathcal{R}(s,a) = \\mathbb{E}\\!\\left[R_{t+1} \\mid S_t=s,\\, A_t=a\\right] = \\sum_{s'}\\mathcal{P}(s'\\mid s,a)\\cdot r(s,a,s')"
                        label="Expected Reward Function"
                        accent="violet"
                        explanation="Expected reward obtained when taking action a in state s."
                        interpretation="The average reward an agent expects to receive when executing an action, taking into account all possible next-state transitions and their probabilities."
                        motivation="Allows calculating deterministic reward updates even when the transition outcomes are stochastic."
                        terms={[
                            { term: '\\mathcal{R}(s,a)', name: 'Expected Reward', meaning: 'Expected immediate reward value.', range: '\\mathbb{R}', example: '7.0 reward.' },
                            { term: '\\mathcal{P}(s\'\\mid s,a)', name: 'Transition Probability', meaning: 'Probability of transitioning to state s\'.', range: '[0, 1]', example: '0.8' },
                            { term: 'r(s,a,s\')', name: 'Transition Reward', meaning: 'Scalar reward obtained during transition from s to s\' via action a.', range: '\\mathbb{R}', example: '10' }
                        ]}
                        numericalExample={{
                            setup: 'Let action choice lead to goal (+10 reward) with 80% probability, or wall collision (-5 reward) with 20% probability.',
                            steps: [
                                'Probability of goal = 0.8, reward = 10',
                                'Probability of wall = 0.2, reward = -5',
                                'Expected reward = 0.8 \\times 10 + 0.2 \\times (-5) = 8 - 1 = 7'
                            ],
                            result: '\\mathcal{R}(s,a) = 7.0'
                        }}
                    />

                    <ExpectedRewardVis />

                    <EnvironmentTuner />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Environment Types Architecture"
                description="Classification of different environment characteristics."
                chart={`graph TD
    E[Environment Properties]
    E --> D[Deterministic vs Stochastic]
    E --> O[Fully vs Partially Observable]
    E --> S[Static vs Dynamic]
    E --> D2[Discrete vs Continuous]
    E --> Ep[Episodic vs Sequential]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Navigating Different Worlds"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Environment Tuner Demo",
                            objectives: "Demonstrate how Stochasticity and Observability change the agent's ability to plan.",
                            instructions: [
                                "Open the 'Environment Property Tuner' in the Math section.",
                                "Set Stochasticity to 0% (Deterministic) and show the 'Actual Path' matching the 'Ideal Path'.",
                                "Set Stochasticity to 100% and show the 'Chaotic' deviation.",
                                "Drop Observability to 20% and point out how the dots (sensor readings) vanish.",
                                "Explain that real-world AI lives in the bottom-left corner of this tuner (PO-MDP)."
                            ],
                            inputs: "Interactive Environment Tuner Sandbox",
                            outputs: "Visual Path Deviation Graphs and Confidence Indicators.",
                            rubrics: ["Clarity of metric definitions", "Impact visualization", "Student engagement"],
                            outcomes: "Students observe the difference between a 'Zoo' (Deterministic) and 'Jungle' (Stochastic) environment.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Game Classifier Workshop",
                            objectives: "Collaboratively categorize famous games based on RL environment properties.",
                            instructions: [
                                "Teacher creates a 4-column table: Game, Observability, Determinism, Dynamics.",
                                "Class discusses: 'Is Chess Fully Observable?' (Yes). 'Is it Stochastic?' (No, if no dice).",
                                "Class discusses: 'Is Poker Partially Observable?' (Yes, hidden cards).",
                                "Students suggest games like Ludo, CS:GO, and Stock Trading for classification."
                            ],
                            inputs: "List of common games and sports",
                            outputs: "Completed Environment Classification Matrix on the board",
                            rubrics: ["Conceptual accuracy", "Logical reasoning", "Classroom participation"],
                            outcomes: "Students master the taxonomy of RL environments.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Blindfold Drawing Task",
                            objectives: "Experience Partial Observability and Stochasticity in a physical creative task.",
                            instructions: [
                                "Divide class into groups of 3: The Artist (Blindfolded), The Sensor (Describes the paper), The Noise (Shakes the table slightly).",
                                "The Artist must draw a simple house.",
                                "Round 1: Full description (MDP). Round 2: Sensor only speaks every 10 seconds (PO-MDP).",
                                "Discuss: How did 'Table Shaking' (Stochasticity) affect the reward (quality of the drawing)?"
                            ],
                            inputs: "Paper, Pens, Blindfolds",
                            outputs: "A series of drawings with varying 'sensor' quality",
                            rubrics: ["Adaptability to feedback", "Communication efficiency", "Teamwork"],
                            outcomes: "Students internalize the difficulty of PO-MDPs where state information is missing.",
                            time: "20 Mins",
                            materials: ["Stationery", "Blindfolds"]
                        },
                        {
                            level: 4,
                            title: "Commute Stochasticity Audit",
                            objectives: "Independently analyze a daily human task as an RL environment.",
                            instructions: [
                                "Task: Analyze your 'Commute to College'.",
                                "Define the Environment Type: Is it Dynamic? (Yes, traffic moves). Is it Stochastic? (Yes, unexpected signals/delays).",
                                "Explain one 'Partially Observable' element (e.g., You don't know what's around the next corner).",
                                "Propose a 'Reward' for a Self-Driving car on this route (+10 for speed, -50 for safety violations)."
                            ],
                            inputs: "Student's personal experience of travel",
                            outputs: "Personal Environment Audit Report (Digital/Workbook)",
                            rubrics: ["Identification of dynamics", "Logical reward design", "Originality"],
                            outcomes: "Students apply RL environment theory to solve real-world mobility challenges.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Drone Pilot AI"
                subtitle="Mission: Underwater Cave Exploration"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-8">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2">Project Scope</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Design an RL environment for an underwater drone. The environment must feature <strong>Water Currents</strong> (Stochastic), <strong>Murky Water</strong> (Partial Observability), and <strong>Moving Fish</strong> (Dynamic).
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="font-bold flex items-center gap-2 text-sm"><Layout size={16} /> Technical Dependencies</h5>
                            <div className="space-y-2">
                                {['OpenAI Gym / Gymnasium', 'PyBullet Physics Engine', 'DQN / PPO Algorithm'].map(lib => (
                                    <div key={lib} className="flex items-center gap-2 text-xs p-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500" /> {lib}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-bold flex items-center gap-2 text-sm"><ShieldAlert size={16} className="text-red-500" /> Risks</h5>
                            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 text-xs text-red-700 dark:text-red-300">
                                <strong>Catastrophic Forgetting:</strong> If the environment is too dynamic, the agent might forget old skills while learning new ones.
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Examination Focus"
                subtitle="Common Interview & Board Questions"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is the real world considered a PO-MDP?', a: 'Because sensors (like cameras) have blind spots and noise, meaning the agent never knows the "Perfect Truth" of its surroundings.' },
                        { q: 'Distinguish between Static and Dynamic environments.', a: 'Static environments remain unchanged while the agent is deliberating. Dynamic ones change over time regardless of the agent\'s actions.' },
                        { q: 'Define Stochasticity in the context of RL.', a: 'Stochasticity means the next state is a probability distribution $P(s\'|s,a)$ rather than a single fixed result.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Environment Tuner"
                subtitle="The Ultimate Sandbox"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Environment Classifier"
                    description="Experience different environment properties"
                    objective="Switch between environment types (deterministic/stochastic, partial/full obs) and see how agent performance changes."
                    badge="Interactive Lab"
                    tips={['Stochastic environments require the agent to handle randomness explicitly',
                'Partially observable environments force belief-state tracking']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Use the controls below to inject noise and sensor failure into the agent's world. Observe how the "Confidence" drops as you move from Zoo to Jungle.
                    </p>
                    <EnvironmentTuner />
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
                    const data = getTopicData('unit1', 'Topic5_EnvironmentTypes');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic5_EnvironmentTypes');
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
                        <div className="bg-cyan-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-cyan-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black">Environment Mastered!</h3>
                                <p className="text-cyan-100">
                                    You've mapped out the different worlds an agent can live in. Ready to see how they actually "work" inside these worlds?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-cyan-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    APPROVE TOPIC
                                </button>
                                <button className="px-10 py-4 bg-cyan-700 text-white font-black rounded-2xl hover:bg-cyan-800 transition-colors">
                                    NEED MORE EXAMPLES
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

