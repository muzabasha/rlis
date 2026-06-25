import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock,
    SymbolTable } from '../../components/topic/MathBlock';
import { BellmanConvergenceVis } from '../../components/visualizers';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    RefreshCw,
    TrendingUp,
    Target,
    Briefcase,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    Brain,
    Activity,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';

import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { InlineMath } from 'react-katex';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Bellman Equation Value Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Bellman Equation Value Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Bellman Equation Value simulator.",
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
    "🤖 [System] Initializing Bellman Equation Value Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Bellman Equation Value\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 4 ─────────────────────────────────────

/**
 * Bellman Backup Visualizer: One-step propagation
 */
function BellmanBackupLab() {
    const [gamma, setGamma] = useState(0.9);
    const [nextValues, setNextValues] = useState([10, 20, 5]); // V(s') for 3 possible next states
    
    // Probabilities P(s'|s,a) for 3 next states
    const probs = [0.4, 0.4, 0.2];
    const reward = 2;

    const calculateCurrentV = () => {
        const expectedNextV = nextValues.reduce((sum, v, i) => sum + probs[i] * v, 0);
        return (reward + gamma * expectedNextV).toFixed(2);
    };

    const handleValueChange = (index: number, val: string) => {
        const n = parseFloat(val);
        if (!isNaN(n)) {
            const newValues = [...nextValues];
            newValues[index] = n;
            setNextValues(newValues);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Successor States */}
                <div className="w-full md:w-1/2 space-y-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Successor States <InlineMath math="V(s')" /></h5>
                    <div className="space-y-3">
                        {nextValues.map((v, i) => (
                            <div key={i} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                    s'{i+1}
                                </div>
                                <div className="flex-1 text-[10px] font-bold text-slate-400">P = {probs[i]}</div>
                                <input 
                                    type="number" 
                                    value={v} 
                                    onChange={(e) => handleValueChange(i, e.target.value)}
                                    className="w-20 bg-white dark:bg-slate-800 border border-slate-200 rounded-lg p-2 text-right font-mono text-xs font-bold"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* The "Backup" Animation */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <RefreshCw size={180} className="animate-spin-slow" />
                    </div>

                    <div className="text-center space-y-1 z-10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Current Value</span>
                        <motion.div 
                            key={calculateCurrentV()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl font-black text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-8 py-4 rounded-3xl border-2 border-primary-100"
                        >
                            $V(s) = {calculateCurrentV()}$
                        </motion.div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl text-white text-[10px] font-mono space-y-1 z-10">
                        <div className="text-primary-400"># The Equation:</div>
                        <div><InlineMath math="V(s) = R + \gamma \sum P(s')V(s')" /></div>
                        <div>$V(s) = {reward} + {gamma} \times ({probs[0]} \cdot {nextValues[0]} + {probs[1]} \cdot {nextValues[1]} + {probs[2]} \cdot {nextValues[2]})$</div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                    <span>Discount Factor (<InlineMath math="\gamma" />)</span>
                    <span className="text-primary-600 font-black">{gamma.toFixed(2)}</span>
                </div>
                <input 
                    type="range" min="0" max="1" step="0.05" 
                    value={gamma} 
                    onChange={(e) => setGamma(parseFloat(e.target.value))}
                    className="w-full accent-primary-600"
                />
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic4_BellmanEquationValue() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic4_bellmanequationvalue" />
            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit3', 'Topic4_BellmanEquationValue');
                        if (!data) return null;
                        return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{data.prerequisites.map((p, i) => <li key={i}>{p}</li>)}</ul>);
                    })()}
                </div>
            </SectionWrapper>

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Recursive Secret" 
                subtitle="Breaking Down the Future"
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
                                "Richard Bellman invented this in the 1950s, probably while trying to optimally navigate his way to the coffee machine."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🔄 The Value of a State
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In 1957, Richard Bellman discovered a fundamental truth about decision-making: the value of your current situation depends <em>exactly</em> on the value of what happens next.
                            </p>
                            <p>
                                Imagine you are one step away from a treasure chest. The **Value** of your current square is almost as high as the chest itself—just minus a small "discount" for the effort of taking that last step.
                            </p>
                            <p>
                                This recursive relationship—where the present value is defined by the future value—is the <strong>Bellman Equation</strong>. It is the mathematical bridge that allows an AI to "look ahead" without actually simulating every possible future until the end of time.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Consistency Condition">
                            The Bellman Equation isn't just a calculation; it's a consistency check. If the equation holds for every state, you've found the correct value function.
                        </InfoCard>
                        <InfoCard type="tip" title="Dynamic Programming">
                            This equation is the heart of Dynamic Programming, allowing us to solve complex problems by solving smaller, overlapping sub-problems.
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
                                Calculating the fair market value of real estate properties when prices depend recursively on the changing values of neighboring houses.
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
                            Essential to understand the elegant recursive mathematical equations that let us compute current values by looking just one step ahead.
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
                                    Allows incremental, step-by-step calculation of state values without waiting for the entire future trajectory to unfold.
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
                                    Solving the system of equations exactly is computationally prohibitive for state spaces larger than a few thousand states.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Bellman Expectation Equation" 
                subtitle="The Equation of State Value"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock 
                        formula="v_\\pi(s) = \\sum_a \\pi(a|s) \\sum_{s', r} p(s', r | s, a) \\left[ r + \\gamma v_\\pi(s') \\right]"
                        label="Bellman Expectation Equation for v_\pi"
                        accent="blue"
                        explanation="The value of state s under policy π is the expected total return — immediate reward plus discounted value of all reachable next states."
                        interpretation="This is an averaging process: sum over all actions you might take (weighted by π), and for each action sum over all states you might land in (weighted by p). The Bellman equation is recursive — the value of s depends on the values of successor states."
                        motivation="This equation is the mathematical definition of how good a state is. Without it, there is no way to compare or improve policies. It is the foundation of Dynamic Programming, TD Learning, and all modern RL."
                        terms={[
                            { term: 'v_\\pi(s)', name: 'State Value', meaning: 'The expected return when starting in state s and following policy π forever.', range: '\\mathbb{R}', example: 'v(Room_1) = 7.3 means Room 1 is worth 7.3 points on average.' },
                            { term: '\\pi(a|s)', name: 'Policy Probability', meaning: 'Probability of taking action a in state s under policy π.', range: '[0, 1]', example: '\\pi(Left|s) = 0.5.' },
                            { term: 'p(s\', r | s, a)', name: 'Transition Dynamics', meaning: 'Joint probability of transitioning to state s\' and receiving reward r when taking action a in state s.', range: '[0, 1]', example: 'p(Room_2, -1 | Room_1, East) = 0.8.' },
                            { term: 'r + \\gamma v_\\pi(s\')', name: 'Estimated Return', meaning: 'The immediate reward plus the discounted value of the next state.', range: '\\mathbb{R}', example: '-1 + 0.9 * 7.3 = 5.57.' },
                            { term: '\\gamma', name: 'Discount Factor', meaning: 'Controls the relative importance of future vs immediate rewards.', range: '[0,1)', example: '0.9 means a reward 1 step away is worth 90% of its face value now.' },
                        ]}
                        numericalExample={{
                            setup: 'Two-state MDP: State A and State B. Policy: π(go_B | A) = 1.0. Transition: p(B, r=5 | A, go_B) = 1.0. Discount γ = 0.9. v_π(B) = 0 (terminal).',
                            steps: [
                                'v_π(A) = π(go_B|A) * p(B, 5|A, go_B) * [5 + 0.9 * v_π(B)]',
                                'v_π(A) = 1.0 * 1.0 * [5 + 0.9 * 0]',
                                'v_π(A) = 5.0'
                            ],
                            result: 'State A has a value of 5.0 under this deterministic policy.'
                        }}
                    />
                    <BellmanConvergenceVis />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Bellman Equation Value Architecture"
                description="The recursive Bellman Equation for Value Functions."
                chart={`graph TD
    V[V(s)] --> |Equals| Sum[Reward R + &gamma; * V(s')]
    Sum --> |Averaged over| Trans[Transition Probabilities]
    Trans --> NextS[Next States s']`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="The Flow of Future Value"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Bellman Backup Demo",
                            objectives: "Observe how current state values are mathematically anchored to successor states.",
                            instructions: [
                                "Open the 'Backup Calculator' in the Virtual Lab section.",
                                "Set $\\gamma = 1.0$ (No discount). Show how $V(s)$ is the exact average of $V(s')$.",
                                "Now, lower $\\gamma$ to 0.5. Notice how $V(s)$ shrinks even if the future values stay high.",
                                "Explain: 'The Bellman Equation is a bridge. If the future changes, the present must update instantly to remain consistent.'",
                                "Ask: 'What happens to the current value if one successor state becomes a trap (V=-100)?'"
                            ],
                            inputs: "Interactive BellmanBackupLab component",
                            outputs: "Real-time value backup and equation breakdown.",
                            rubrics: ["Clarity of 'Value Anchoring' explanation", "Demonstration of discounting effects", "Student engagement"],
                            outcomes: "Students identify the recursive dependency of the value function.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Treasure Map Workshop",
                            objectives: "Collaboratively calculate the value of a 3-step path with rewards and discounting.",
                            instructions: [
                                "Teacher draws a 3-node path on the board: A -> B -> Goal.",
                                "Goal Value = +100. Step Reward = -2 (Effort). $\\gamma = 0.9$.",
                                "Guided Calculation: Step 1 (Backwards): $V(B) = -2 + 0.9(100) = 88$.",
                                "Guided Calculation: Step 2: $V(A) = -2 + 0.9(88) = 77.2$.",
                                "Class reflects: 'Why is A worth less than B?' (It is further from the reward, and every step costs energy)."
                            ],
                            inputs: "3-step node diagram and parameters",
                            outputs: "Full value propagation calculation on the board",
                            rubrics: ["Correct use of $R + \\gamma V$ formula", "Reverse-order logic application", "Classroom participation"],
                            outcomes: "Students master the technical execution of a manual Bellman backup.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Value Propagation Race",
                            objectives: "Experience the iterative nature of the Bellman Equation in a grid setting.",
                            instructions: [
                                "Divide class into 4 teams. Provide a 3x3 grid on chart paper.",
                                "Place a 'Goal' (+10) in the corner. All other cells start at 0.",
                                "Rule: Every minute, teams update every cell using the average value of its neighbors (Bellman iteration).",
                                "Group Task: Watch how the 'high value' slowly spreads from the goal to the opposite corner.",
                                "Teams race to identify when the center cell reaches a value > 5."
                            ],
                            inputs: "3x3 blank grid and parameters",
                            outputs: "Heatmap of values across iterations",
                            rubrics: ["Accuracy of averaging calculations", "Understanding of 'Information Spread'", "Team coordination"],
                            outcomes: "Students visualize how the Bellman Equation ensures global consistency across a state space.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers", "Calculators"]
                        },
                        {
                            level: 4,
                            title: "Life Degree Audit",
                            objectives: "Independently model a long-term personal decision using Bellman's recursive logic.",
                            instructions: [
                                "Task: Choose a goal (e.g., Earning a Degree, Learning a Language).",
                                "Audit: Define the 'Future Value' $V(s')$ (e.g., Career opportunities).",
                                "Audit: Define the 'Immediate Reward' (e.g., -5 effort for studying, +2 for learning a cool fact).",
                                "Reflection: Use the Bellman Equation to justify your current 'Value' (motivation level).",
                                "Analysis: If the 'Discount Factor' $\\gamma$ is too low, does your current value become zero? (The 'Short-termism' trap)."
                            ],
                            inputs: "Personal long-term goals",
                            outputs: "Individual Recursive Value Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Logical justification of 'Motivation' as Value", "Originality"],
                            outcomes: "Students bridge mathematical recursion with biological and professional planning.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Maze Solver" 
                subtitle="Visualizing Global Consistency"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building a pathfinding AI for a delivery drone. Instead of searching every path, you initialize all values to zero and repeatedly apply the Bellman Equation to every square. 
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <div className="text-[10px] font-bold text-indigo-500 uppercase">Iteration 1</div>
                            <p className="text-xs mt-1 text-slate-500">Only the squares next to the goal get a value.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <div className="text-[10px] font-bold text-indigo-500 uppercase">Iteration 50</div>
                            <p className="text-xs mt-1 text-slate-500">Value has spread throughout the maze, forming a "Gradient" that points toward the goal.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Bellman's Logic"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'State the Bellman Expectation Equation in words.', a: 'The value of the current state is equal to the expected immediate reward plus the discounted expected value of the next state.' },
                        { q: 'What is a "Backup" diagram?', a: 'A graphical representation of the Bellman Equation, showing how value flows from successor states (leaves) back to the current state (root).' },
                        { q: 'Can we solve the Bellman Equation for infinite states?', a: 'Exactly solving it with matrix inversion is impossible for infinite states; instead, we use iterative methods like Value Iteration or function approximation (Deep RL).' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: The Backup Calculator" 
                subtitle="Manually Update a State"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Bellman Backup Calculator"
                    description="Compute Bellman updates step by step"
                    objective="Enter state values and see the Bellman backup equation compute the new value. Observe convergence over iterations."
                    badge="Interactive Lab"
                    tips={['The Bellman equation is recursive — it expresses V(s) in terms of V(s\')',
                'Iterating the Bellman equation (Value Iteration) converges to V*']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In this lab, you act as the Bellman Equation. You have one current state and three possible successor states (<InlineMath math="s'_1, s'_2, s'_3" />). Change the values of the next states or the discount factor to see how the "Current Value" updates automatically.
                    </p>
                    <BellmanBackupLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => {
                    const data = getTopicData('unit3', 'Topic4_BellmanEquationValue');
                    if (!data) return null;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit3', 'Topic4_BellmanEquationValue');
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
                    <h3 className="text-3xl font-black italic">Bellman Equation: Mastered!</h3>
                    <p className="text-primary-100">
                        You've unlocked the recursive secret of RL. Ready to apply this to a real robot case study?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: RECYCLING ROBOT CASE
                    </button>
                </div>
            </div>
        </div>
    );
}
