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
import ActivityLevels from '../../components/topic/ActivityLevels';
import MonteCarloLab from '../../components/labs/MonteCarloLab';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Trophy,
    Bot,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    Search,
    Brain,
    Globe,
    Rocket,
    Activity,
    Cpu,
    HardDrive,
    Target,
    Briefcase,
    Shield,
    Move,
    MousePointer2,
    User,
    Layout,
    Map,
    RefreshCw,
    ArrowUpRight,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "M C Control Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "M C Control Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the M C Control simulator.",
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
    "🤖 [System] Initializing M C Control Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"M C Control\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic14_MCControl() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic14_mccontrol" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Path to Perfection" 
                subtitle="Policy Improvement through Experience"
                icon={<Trophy className="text-blue-600" size={24} />}
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
                                "Using random rollouts to steer the ship. It works surprisingly well, assuming you have infinite time and no real-world consequences."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Rocket size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🏆 Becoming the Champion
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                If **Prediction** is measuring how good a plan is, **Control** is changing the plan to make it better. It's the difference between an auditor (who checks the books) and a CEO (who changes the strategy).
                            </p>
                            <p>
                                In MC Control, the agent plays many games, figures out which actions led to wins (Evaluation), and then updates its rules to "Do that more often" (Improvement).
                            </p>
                            <p>
                                This cycle repeats until the agent's strategy is so good it can't be improved any further. This is how AI learns to play games from scratch—one cycle of "Try, Learn, Improve" at a time.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Q-Value Bridge">
                            In MC Control, we estimate $Q(s,a)$ instead of $V(s)$. Why? Because $Q$ tells us the value of specific actions, making it easy to choose the "Greedy" best one.
                        </InfoCard>
                        <InfoCard type="tip" title="No Transition Math">
                            Because we use $Q$ and sample experience, we still don't need a model of the environment to improve our policy.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            
            {/* SECTION 2: MOTIVATION & APPLICATION CHALLENGE */}
            <SectionWrapper
                id="motivation"
                title="7. Motivation & Application Challenge"
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
                                Teaching an autonomous solar sailer to optimize its sail angles over multi-day voyages by learning only from complete trips.
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
                            Master the complete generalized policy iteration (GPI) framework in model-free control using Monte Carlo policy evaluation and improvement.
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
                                    Discovers true optimal policies directly from experience without needing any model of space physics.
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
                                    Vulnerable to severe local optima if the agent stops exploring too early during training.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="7. Modelling GPI" 
                subtitle="Generalized Policy Iteration"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\pi(s) \leftarrow \arg\max_a Q(s, a)"
                        label="The Policy Improvement Step"
                        explanation="Making the policy greedy with respect to the current value estimates."
                        interpretation="The agent looks at all available actions in state s and picks the one with the highest current Q-value. This 'Greedy' update is what drives the policy toward optimality."
                        motivation="This step converts the agent's knowledge (the Q-values) into actual behavior changes."
                        terms={[
                            { term: '\arg\max_a', name: 'Argument of Maximum', meaning: 'The action (a) that results in the highest value of the following function.', range: '\mathcal{A}', example: 'If Q(Left)=5 and Q(Right)=10, argmax is Right.' },
                            { term: 'Q(s, a)', name: 'Action-Value', meaning: 'The predicted return from taking action a in state s.', range: '\mathbb{R}', example: 'The value of hitting in Blackjack.' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> The Evaluation Update</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Before improvement, we must update: <br/>
                            <span className="font-mono text-sm">{"$Q(s,a) \\leftarrow Q(s,a) + \\frac{1}{N(s,a)}[G - Q(s,a)]$"}</span>
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="M C Control Architecture"
                description="Optimizing policies via Monte Carlo Exploring Starts."
                chart={`graph TD
    Init[Initialize random Q] --> Generate[Generate Episode with Exploring Starts]
    Generate --> Eval[Policy Evaluation: Q = avg(Returns)]
    Eval --> Impr[Policy Improvement: Greedy]
    Impr --> Generate`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="7. Multi-Level Activities" 
                subtitle="The Strategy Loop"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "GPI Loop Demo",
                            objectives: "Visualize the alternating phases of Evaluation (gathering knowledge) and Improvement (making decisions).",
                            instructions: [
                                "Open the 'GPI Loop' in the Virtual Lab section.",
                                "Start in 'Evaluation'. Explain: 'We are observing games to fill our Q-table with real data.'",
                                "Switch to 'Improvement'. Explain: 'Now we change the rules. The agent picks the action with the highest Q-value.'",
                                "Explain: 'Control is the constant dance between these two phases.'",
                                "Ask: 'What happens if we improve the policy before the evaluation is accurate?'"
                            ],
                            inputs: "Interactive GPILab component",
                            outputs: "Visual phase transition between Search and Trophy icons.",
                            rubrics: ["Clarity of 'Evaluation' vs 'Improvement' concepts", "Correct identification of the GPI cycle", "Student engagement"],
                            outcomes: "Students identify the fundamental iterative process of policy optimization.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Argmax Workshop",
                            objectives: "Collaboratively identify the 'Greedy' action from a set of noisy action-value estimates.",
                            instructions: [
                                "Teacher draws a Q-table for state $S_{start}$: {Up: 10.5, Down: 8.2, Left: 14.9, Right: 12.1}.",
                                "Class Task: Identify the 'Greedy' policy $\\pi(S_{start}) \\leftarrow \\arg\\max_a Q(S,a)$.",
                                "Guided Design: 'If we find a new path that makes \"Up\" have a value of 20, how does the policy change?'",
                                "Class reflects: 'Why do we use Q-values instead of just state values (V) for control?'",
                                "Conclusion: Q-values allow for local improvement without knowing the full environment dynamics."
                            ],
                            inputs: "Action-value tables",
                            outputs: "Optimal policy definitions on the board",
                            rubrics: ["Correct use of argmax logic", "Logical justification of action choice", "Classroom participation"],
                            outcomes: "Students master the conversion of numeric knowledge into behavioral rules.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The CEO vs. Auditor Debate",
                            objectives: "Experience the tension between measuring performance and changing strategy.",
                            instructions: [
                                "Divide class into 2 teams: Team Auditor (Evaluation) and Team CEO (Improvement).",
                                "Scenario: 'A failing restaurant'.",
                                "Team Auditor: Argue why you need to observe the customers for 1 month before changing the menu.",
                                "Team CEO: Argue why you need to fire the chef immediately and try a new cuisine.",
                                "Debate: How do you balance 'Learning the Truth' vs 'Taking Action'?",
                                "Conclusion: Control requires a stable evaluation phase to avoid making changes based on noise."
                            ],
                            inputs: "Restaurant management scenario",
                            outputs: "Optimal iteration schedule chart",
                            rubrics: ["Understanding of 'Policy Evaluation' necessity", "Logical arguments on update frequency", "Team coordination"],
                            outcomes: "Students develop a deep intuition for the stability requirements of RL control.",
                            time: "20 Mins",
                            materials: ["None"]
                        },
                        {
                            level: 4,
                            title: "Personal Optimization Audit",
                            objectives: "Independently audit a personal goal as a GPI Control task.",
                            instructions: [
                                "Task: Choose a goal you are working on (e.g., 'Increasing gym stamina' or 'Saving money').",
                                "Audit: Define your current 'Evaluation' metric (e.g., minutes on treadmill or dollars saved).",
                                "Reflection: When was the last time you performed an 'Improvement' step (changed your behavior based on the data)?",
                                "Analysis: Are you being 'Greedy'? Are you picking the absolute best action according to your data, or just repeating habits?",
                                "Propose: One specific 'Greedy' update you will make to your policy tomorrow."
                            ],
                            inputs: "Personal goals and habits",
                            outputs: "Individual GPI Strategy Report (1 page)",
                            rubrics: ["Correct use of 'Evaluation' and 'Improvement' terms", "Logical behavioral update", "Originality"],
                            outcomes: "Students demonstrate the ability to apply the GPI framework to maximize real-world rewards.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="7. Project: Intersection Signal Optimization" 
                subtitle="GPI in Traffic Engineering"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold flex items-center gap-2"><Target size={18} /> The Signal Timing Problem</h5>
                            <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full">PROJECT #42</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A traffic signal timing controller needs to minimize wait times. It evaluates the current timing (Evaluation) and then adjusts the light durations (Improvement). 
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm">
                        <h6 className="font-bold text-xs mb-3 text-indigo-600 uppercase">MC Control Implementation:</h6>
                        <ul className="text-xs space-y-2 text-slate-500 list-disc pl-4">
                            <li><strong>State:</strong> Lane occupancy detected by induction loops.</li>
                            <li><strong>Action:</strong> Phase durations (Green/Red times).</li>
                            <li><strong>Reward:</strong> -1 per second of car delay.</li>
                            <li>Using MC Control, the system learns the "Optimal Cycle" by observing complete peak-hour episodes.</li>
                            <li className="text-primary-600 font-bold mt-2">See "Project Bank" for full Python implementation using Gym-Traffic.</li>
                        </ul>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="7. Quick Check" 
                subtitle="Control Competency"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is "Generalized Policy Iteration" (GPI)?', a: 'The general framework for RL control that alternates between evaluating a policy (finding Q) and improving a policy (making it greedy with respect to Q).' },
                        { q: 'Why do we estimate Q-values instead of V-values in MC Control?', a: 'Because Q-values allow for policy improvement without needing a model of the environment. If we only had V, we wouldn\'t know which action leads to which state and reward.' },
                        { q: 'What happens if we make the policy 100% greedy too early?', a: 'The agent might get stuck in a "Sub-optimal" strategy because it stopped exploring. It assumes its current best is the absolute best, even if a better path exists.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Monte Carlo Control" 
                subtitle="Experience the GPI Loop"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="GLIE Control Simulator"
                    description="On-policy MC Control with exploring starts"
                    objective="Run MC Control and watch the policy improve episode by episode. Observe Q-values and policy arrows update together."
                    badge="Interactive Lab"
                    tips={['GLIE = Greedy in the Limit with Infinite Exploration',
                'Policy improvement step: make policy greedy with respect to current Q',
                'Run for many episodes to reach near-optimal policy']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Adjust parameters like $\epsilon$ and $\gamma$ to see how they affect the agent's learning speed and final performance. Watch the Q-table update in real-time after each episode!
                    </p>
                    <MonteCarloLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Control: Mastered!</h3>
                    <p className="text-primary-100">
                        You can improve a policy. But there's a catch: how do we ensure we don't miss the best path? Enter Epsilon-Greedy Exploration.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: EPSILON-GREEDY
                    </button>
                </div>
            </div>
        </div>
    );
}
