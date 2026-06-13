import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect, useCallback } from 'react';
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
    Target,
    LayoutGrid,
    Brain,
    Swords,
    Focus,
    CheckCircle2,
    Play,
    Pause,
    RotateCcw,
    ChevronRight,
    Binary,
    TrendingUp,
    Activity,
    Cpu,
    HardDrive,
    Briefcase,
    Shield,
    Move,
    MousePointer2,
    User,
    Layout,
    Map,
    AlertTriangle
} from 'lucide-react';

import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Q Learning Overview Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Q Learning Overview Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Q Learning Overview simulator.",
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
    "🤖 [System] Initializing Q Learning Overview Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Q Learning Overview\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 8 ─────────────────────────────────────

/**
 * Q-Learning Process Simulator
 */
function QLearningSimulator() {
    const [qValue, setQValue] = useState(0);
    const [step, setStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Params
    const alpha = 0.5;
    const gamma = 0.9;
    const reward = 10;
    const nextMaxQ = 8; // Assume next state has a max Q of 8

    const updateQ = useCallback(() => {
        setQValue(prev => {
            const tdTarget = reward + gamma * nextMaxQ;
            const tdError = tdTarget - prev;
            return prev + alpha * tdError;
        });
        setStep(s => s + 1);
    }, [alpha, gamma, reward, nextMaxQ]);

    useEffect(() => {
        let interval: any;
        if (isRunning && step < 20) {
            interval = setInterval(updateQ, 500);
        } else {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, step, updateQ]);

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1 space-y-4">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Binary size={18} className="text-primary-500" />
                        Iterative Value Convergence
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Watch how the <strong>Q-Value</strong> for a single (state, action) pair converges over multiple updates. 
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <span className="text-slate-400 block uppercase font-bold tracking-widest text-[8px] mb-1">Learning Rate (\u03B1)</span>
                            <span className="font-mono text-primary-600">{alpha}</span>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <span className="text-slate-400 block uppercase font-bold tracking-widest text-[8px] mb-1">Discount (\u03B3)</span>
                            <span className="font-mono text-primary-600">{gamma}</span>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <span className="text-slate-400 block uppercase font-bold tracking-widest text-[8px] mb-1">Immediate Reward</span>
                            <span className="font-mono text-emerald-600">+{reward}</span>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <span className="text-slate-400 block uppercase font-bold tracking-widest text-[8px] mb-1">Future Max Q</span>
                            <span className="font-mono text-blue-600">{nextMaxQ}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsRunning(!isRunning)} 
                            disabled={step >= 20}
                            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isRunning ? 'bg-red-100 text-red-600' : 'bg-primary-100 text-primary-600'}`}
                        >
                            {isRunning ? <Pause size={18} /> : <Play size={18} />}
                            {step === 0 ? 'Start Updates' : step >= 20 ? 'Converged' : 'Continue'}
                        </button>
                        <button onClick={() => { setQValue(0); setStep(0); setIsRunning(false); }} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-500">
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="w-full h-full border-[20px] border-primary-500 rounded-full scale-150 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-bold text-primary-400 uppercase tracking-[0.2em] mb-2">Estimated Q(s, a)</span>
                    <motion.span 
                        key={qValue}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl font-black text-white font-mono"
                    >
                        {qValue.toFixed(2)}
                    </motion.span>
                    <div className="mt-6 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-primary-500" 
                            animate={{ width: `${(qValue / 17.2) * 100}%` }} 
                        />
                    </div>
                    <p className="text-[8px] text-slate-500 mt-4 italic">Theoretical Limit: reward + \u03B3 * nextMaxQ = 17.20</p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic8_QLearningOverview() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic8_qlearningoverview" />
            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit3', 'Topic8_QLearningOverview');
                        if (!data) return null;
                        return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{data.prerequisites.map((p, i) => <li key={i}>{p}</li>)}</ul>);
                    })()}
                </div>
            </SectionWrapper>

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Learning Breakthrough" 
                subtitle="Learning from Experience, Not Maps"
                icon={<Zap className="text-blue-600" size={24} />}
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
                                "The algorithm that proved you don't need to understand the world to conquer it, just a really big lookup table."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Brain size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🧭 Finding Your Way in the Dark
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are dropped into a pitch-black cave. You don't have a map. You don't know where the exit is. All you can do is move and feel your way around.
                            </p>
                            <p>
                                Every time you bump into a wall, it hurts (Negative Reward). When you find a flat path, you feel relief (Positive Reward). 
                            </p>
                            <p>
                                <strong>Q-Learning</strong> is exactly like this. The agent doesn't need to know the rules of the world (the map). It just tries things, remembers what happened, and builds its own "mental map" of which actions are good in which places.
                            </p>
                            <p>
                                This "Model-Free" nature is what made Q-Learning a revolution. It proved that machines can learn complex tasks purely by <strong>Trial and Error</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Breakthrough">
                            Before Q-Learning (1989), most AI needed a perfect mathematical model of the world. Q-Learning proved you only need <strong>Experience</strong>.
                        </InfoCard>
                        <InfoCard type="tip" title="Off-Policy Power">
                            Q-Learning can learn the optimal strategy even while it is acting randomly. It's like learning the best way to drive while watching someone else make mistakes.
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
                                An automated grid-routing algorithm trying to find the shortest delivery path in a city where streets are randomly blocked or opened.
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
                            Essential for reviewing the complete, end-to-end framework of Q-learning to build a solid synthesis before diving into complex parameters.
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
                                    Simple to implement and highly effective for standard discrete optimization tasks.
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
                                    Suffers from severe overestimation bias of Q-values due to the 'max' operator in its update rule.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Q-Learning Rule" 
                subtitle="The Equation that Changed RL"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma \max_{a'} Q(s', a') - Q(s, a)]"
                        label="The Q-Learning Update Equation"
                        accent="blue"
                        explanation="The formula used to update the estimate of an action's value based on new experience."
                        interpretation="This is a 'self-correcting' formula. It compares what you *thought* the action was worth (Q(s, a)) with a new, more informed estimate (the TD Target: r + \u03B3 max Q). If the new estimate is higher, the Q-value moves up. If lower, it moves down."
                        motivation="This single line of math allows an agent to learn from the future. By using the 'max' of the next state, the agent is always looking for the best possible outcome, which eventually leads to the optimal policy."
                        terms={[
                            { term: 'Q(s, a)', name: 'Current Estimate', meaning: 'The current value stored in the agent\'s memory for action a in state s.', range: '\\mathbb{R}', example: 'Q(room1, move_north) = 5.2.' },
                            { term: '\\alpha', name: 'Learning Rate', meaning: 'How much the new information overrides the old. 0 = learn nothing, 1 = forget everything old.', range: '[0, 1]', example: '0.1 is a common value for stable learning.' },
                            { term: 'r', name: 'Reward', meaning: 'The immediate reward received after taking action a.', range: '\\mathbb{R}', example: '+10 for reaching a goal.' },
                            { term: '\\gamma', name: 'Discount Factor', meaning: 'How much the agent cares about future rewards compared to now.', range: '[0, 1]', example: '0.9 means a future reward is worth 90% of its value today.' },
                            { term: '\\max_{a\'} Q(s\', a\')', name: 'Best Future', meaning: 'The value of the best possible action the agent *could* take in the next state s\'.', range: '\\mathbb{R}', example: 'If in next state, the best action is worth 8.0, then max Q = 8.0.' },
                        ]}
                        numericalExample={{
                            setup: 'Current Q(s, a) = 5. Agent takes action, gets reward r = 10, lands in state s\'. In s\', the best possible action has Q(s\', a\') = 8. \u03B1 = 0.5, \u03B3 = 0.9.',
                            steps: [
                                'Target = 10 + 0.9 * 8 = 17.2',
                                'Difference (TD Error) = 17.2 - 5 = 12.2',
                                'New Q = 5 + 0.5 * 12.2 = 11.1'
                            ],
                            result: 'The Q-value jumped from 5 to 11.1, reflecting the high reward and good future potential discovered.',
                        }}
                    />

                    <div className="grid lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h5 className="font-bold text-[10px] text-primary-500 uppercase mb-2">Model-Free</h5>
                            <p className="text-[10px] text-slate-500">The agent doesn't need to know $p(s', r|s, a)$. It learns solely from samples.</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h5 className="font-bold text-[10px] text-emerald-500 uppercase mb-2">Off-Policy</h5>
                            <p className="text-[10px] text-slate-500">The agent learns about the optimal policy while potentially following a random one.</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h5 className="font-bold text-[10px] text-amber-500 uppercase mb-2">TD Learning</h5>
                            <p className="text-[10px] text-slate-500">It updates its guesses based on other guesses (bootstrapping), not waiting for the end.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Q Learning Overview Architecture"
                description="The macro architecture of the Q-Learning algorithm."
                chart={`graph LR
    Init[Initialize Q-table] --> Act[Epsilon-Greedy Action]
    Act --> Env[Environment Step]
    Env --> Observe[Observe R, S']
    Observe --> Update[Bellman Update]
    Update --> Act`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="Mastering the Update"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Convergence Sandbox Demo",
                            objectives: "Observe how the iterative update rule eventually reaches a stable mathematical truth.",
                            instructions: [
                                "Open the 'Convergence Sandbox' in the Virtual Lab section.",
                                "Run the simulation with $\\alpha=0.5$. Show how the value 'jumps' at first.",
                                "Reset and run with $\\alpha=0.1$. Show how it crawls slowly but smoothly.",
                                "Explain: 'High learning rates are fast but unstable. Low rates are slow but precise.'",
                                "Ask: 'What happens to our guess if the future Max Q suddenly drops to zero?'"
                            ],
                            inputs: "Interactive QLearningSimulator component",
                            outputs: "Live Q-value graph and convergence animations.",
                            rubrics: ["Clarity of 'Learning Rate' explanation", "Demonstration of convergence", "Student engagement"],
                            outcomes: "Students identify Q-Learning as a self-correcting process driven by experience.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Bootstrapping Workshop",
                            objectives: "Collaboratively perform a manual Q-update calculation using the 'Max' of the next state.",
                            instructions: [
                                "Teacher writes current state on board: $Q(s, a) = 10$.",
                                "The agent takes action, gets $R = 5$, and lands in $s'$.",
                                "In $s'$, there are two actions: $Q(s', a_1) = 20$ and $Q(s', a_2) = 8$.",
                                "Guided Calculation: 'Step 1: Pick the Max of next state' (20).",
                                "Guided Calculation: 'Step 2: Apply the full formula with $\\alpha=0.5, \\gamma=0.9$'.",
                                "Class reflects: 'Why did we ignore the action worth 8?' (Because Q-learning assumes we will always be smart in the future)."
                            ],
                            inputs: "Numerical Q-table snippets",
                            outputs: "Full calculation string and updated Q-value on the board",
                            rubrics: ["Correct use of Max operator", "Accurate arithmetic for TD Target", "Classroom participation"],
                            outcomes: "Students master the technical execution of the Q-Learning update rule.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Human DQN Challenge",
                            objectives: "Experience how a Neural Network approximates Q-values for complex inputs.",
                            instructions: [
                                "Divide class into 3 'Layers' (Input, Hidden, Output).",
                                "Input Layer: Receive 'Pixel Data' (e.g., 'Ball is at x=5, y=10').",
                                "Hidden Layer: Apply a simple rule (e.g., 'If x < 10, pass 1; else pass 0').",
                                "Output Layer: Students acting as Q-values for {Left, Right}. They adjust their 'weights' based on if the agent scored points.",
                                "Group Task: Play 5 rounds of a 'mental' Pong game. Can the Human DQN learn to pass the correct action?",
                                "Conclusion: 'DQN is just Q-learning where the brain is a group of layers instead of a table.'"
                            ],
                            inputs: "Simulated game coordinates",
                            outputs: "Action predictions and weight adjustments",
                            rubrics: ["Understanding of 'Approximation'", "Communication between layers", "Team coordination"],
                            outcomes: "Students visualize the transition from Tabular Q-Learning to Deep Q-Learning.",
                            time: "20 Mins",
                            materials: ["Cards for data passing", "Scoreboard"]
                        },
                        {
                            level: 4,
                            title: "Learning from Failure Audit",
                            objectives: "Independently audit a real-world learning system that uses 'Trial and Error' logic.",
                            instructions: [
                                "Task: Choose a failure-heavy engineering task (e.g., SpaceX rocket landings or Boston Dynamics robot balancing).",
                                "Audit: How does the system record its 'Mistakes'? (The Negative Reward).",
                                "Reflection: Why is this 'Off-Policy'? (Engineers can analyze data from a crashed rocket to learn how a successful rocket *should* fly).",
                                "Analysis: If the 'Learning Rate' $\\alpha$ was 1.0, what would happen after one crash? (The system would forget all previous successful flights).",
                                "Propose: A 'Safe' Q-Learning rule for an autonomous car."
                            ],
                            inputs: "Case study videos or reports",
                            outputs: "Individual Q-Learning Strategy Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Critical thinking on 'Stability'", "Originality"],
                            outcomes: "Students bridge the classroom formula with state-of-the-art aerospace and robotics engineering.",
                            time: "15 Mins",
                            materials: ["Student Workbook", "Internet Access"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Self-Driving Cart" 
                subtitle="From Pixels to Actions"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Deep Q-Networks (DQN)</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            When the state space is too big for a table (like pixels in a game), we use a Neural Network to <em>predict</em> the Q-values. This is what DeepMind used to master Atari games.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <LayoutGrid size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Input</div>
                            <p className="text-[8px] mt-1">Camera Pixels</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Binary size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Network</div>
                            <p className="text-[8px] mt-1">Predicts Q(s, a)</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Focus size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Output</div>
                            <p className="text-[8px] mt-1">Best Action</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Q-Learning Essentials"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What does "Off-Policy" mean in the context of Q-Learning?', a: 'It means the agent can learn about the optimal policy (the target policy) while actually following a different policy (the behavior policy, like random exploration).' },
                        { q: 'Why is Q-Learning considered "Model-Free"?', a: 'Because it doesn\'t need to know the environment\'s transition probabilities or reward function. It learns strictly from interacting with the environment.' },
                        { q: 'What happens if the learning rate \u03B1 is set to 0?', a: 'The agent will never update its Q-values; it will never learn anything new from its experiences.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Convergence Sandbox" 
                subtitle="Witness the Math in Action"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Q-Learning Full Demo"
                    description="Complete Q-Learning on a gridworld"
                    objective="Run Q-Learning to completion and extract the learned optimal policy. Compare with random policy."
                    badge="Interactive Lab"
                    tips={['Watch the Q-table heat up as the agent learns',
                'The learned policy should navigate optimally to the goal',
                'Try changing α (learning rate) and γ (discount factor)']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Hit "Start" to see how the Q-Learning update rule pulls a random initial guess towards the correct mathematical value over time.
                    </p>
                    <QLearningSimulator />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => {
                    const data = getTopicData('unit3', 'Topic8_QLearningOverview');
                    if (!data) return null;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit3', 'Topic8_QLearningOverview');
                if (!data) return null;
                return (<React.Fragment>
                    <SectionWrapper id="recap" title="9. Topic Recap" subtitle="Key points to remember" icon={<BookOpen className="text-emerald-600" size={24} />} badge="Recap" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                        <ul className="space-y-2">{data.recap.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>{point}
                            </li>
                        ))}</ul>
                    </SectionWrapper>
                    <SectionWrapper id="skills" title="10. Skill Mapping" subtitle="Competencies developed" icon={<Target className="text-indigo-600" size={24} />} badge="Skills" badgeColor="bg-indigo-100 text-indigo-700" accentColor="border-indigo-500">
                        <div className="grid gap-3">{data.skillMapping.map((skill, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.skill}</span>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${skill.level === 'Beginner' ? 'bg-green-100 text-green-700' : skill.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{skill.level}</span>
                            </div>
                        ))}</div>
                    </SectionWrapper>
                </React.Fragment>);
            })()}

            {/* Keep existing navigation buttons here */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Q-Learning: Decoded!</h3>
                    <p className="text-primary-100">
                        You've mastered the logic behind the world's most famous RL algorithm. Ready to see the terms and conditions?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: Q-LEARNING TERMS
                    </button>
                </div>
            </div>
        </div>
    );
}
