import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useCallback, useEffect } from 'react';
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
    XCircle,
    ArrowRight,
    TrendingUp,
    Briefcase,
    Binary,
    Info,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Action Value Function Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Action Value Function Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Action Value Function simulator.",
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
    "🤖 [System] Initializing Action Value Function Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Action Value Function\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 11 ─────────────────────────────────────

/**
 * Action-Value (Q) Grid Visualization
 */
function ActionValueGrid() {
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [state, setState] = useState(4); // Middle of 3x3

    const actions = [
        { id: 'up', icon: '↑', label: 'Up', q: 8.5 },
        { id: 'down', icon: '↓', label: 'Down', q: 2.1 },
        { id: 'left', icon: '←', label: 'Left', q: 7.8 },
        { id: 'right', icon: '→', label: 'Right', q: 9.2 },
    ];

    const getGridPos = (idx: number) => {
        const r = Math.floor(idx / 3);
        const c = idx % 3;
        return { r, c };
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1 space-y-4">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Target size={18} className="text-primary-500" />
                        The Q-Value decision
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In state $s_4$, you have 4 possible actions. Each has a different <strong>Q-Value</strong>. 
                        Which one would you pick?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {actions.map(a => (
                            <button
                                key={a.id}
                                onClick={() => setSelectedAction(a.id)}
                                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                                    selectedAction === a.id 
                                    ? 'bg-primary-50 border-primary-500 dark:bg-primary-900/20' 
                                    : 'bg-slate-50 border-slate-100 hover:border-slate-200 dark:bg-slate-900/50 dark:border-slate-800'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-bold text-primary-600">{a.icon}</span>
                                    <span className="text-sm font-bold">{a.label}</span>
                                </div>
                                <div className="text-xs font-black text-slate-400">Q = {a.q}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center relative">
                    <div className="grid grid-cols-3 gap-2 w-64 h-64 p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        {[...Array(9)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                    i === state 
                                    ? 'bg-primary-500 text-white shadow-lg scale-110' 
                                    : 'bg-white dark:bg-slate-800 text-slate-300 dark:text-slate-700'
                                }`}
                            >
                                {i === state ? 'Agent' : `s${i}`}
                                {i === state && selectedAction && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute -top-12 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] whitespace-nowrap shadow-xl"
                                    >
                                        Q({selectedAction}) = {actions.find(a => a.id === selectedAction)?.q}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedAction && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl"
                >
                    <h5 className="font-bold text-emerald-800 dark:text-emerald-200 text-sm mb-2">Strategy Analysis</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        If you choose <strong>{selectedAction}</strong>, your expected long-term return is <strong>{actions.find(a => a.id === selectedAction)?.q}</strong>. 
                        The greedy policy would pick <strong>Right (Q=9.2)</strong> because it has the highest "goodness" for this specific action in this specific state.
                    </p>
                </motion.div>
            )}
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic11_ActionValueFunction() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic11_actionvaluefunction" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Crossroads" 
                subtitle="Evaluating Your Next Move"
                icon={<Swords className="text-blue-600" size={24} />}
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
                                "Q-values: answering the eternal question of 'If I do this dumb thing right now, how much will I regret it later?'"
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Zap size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🛣️ More Than Just Location
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Knowing "where you are" is good, but knowing "what to do" is better. 
                            </p>
                            <p>
                                Imagine you are in a burning building. The State Value $V(s)$ might tell you that being in this room is bad (-100). But that doesn't help you escape. 
                            </p>
                            <p>
                                The <strong>Action Value Function $q_\pi(s, a)$</strong>, often called the <strong>Q-Value</strong>, tells you: "If you are in this burning room, and you take the <em>Action</em> of jumping out the window, how much reward will you get?" vs "If you take the <em>Action</em> of using the fire extinguisher?"
                            </p>
                            <p>
                                Q-values allow the agent to rank its choices. Without Q-values, the agent is like a traveler who knows they are lost but doesn't know which path to take.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Action-Value Distinction">
                            While $V(s)$ evaluates the <strong>State</strong>, $Q(s, a)$ evaluates the <strong>Interaction</strong> between the agent and the state.
                        </InfoCard>
                        <InfoCard type="tip" title="Foundation of Q-Learning">
                            The "Q" in Q-Learning stands for "Quality"—representing the quality of an action in a state.
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
                                A self-driving car deciding whether to steer left, right, or stay straight when approaching an obstacle.
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
                            Crucial because it associates values directly to actions in a state (Q(s,a)), allowing action selection without environment model knowledge.
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
                                    The absolute foundation of model-free control algorithms like Q-learning.
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
                                    Large action spaces lead to massive tables that require neural network approximation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="7. The Q-Value Equation" 
                subtitle="The Math of Choice"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="q_\\pi(s, a) = \\mathbb{E}_\\pi [G_t | S_t = s, A_t = a]"
                        label="Action-Value Definition"
                        accent="blue"
                        explanation="The expected return if the agent takes action a in state s and thereafter follows policy \u03C0."
                        interpretation="The Q-value represents the total future reward 'locked' behind a specific choice. Unlike V(s), which averages over all possible actions in a state, Q(s, a) isolates the effect of a single initial decision before reverting to the standard policy."
                        motivation="This is the most important quantity in RL. If an agent knows Q(s, a) for all actions, it can simply pick the action with the highest Q-value to act optimally. This is how Q-Learning works."
                        terms={[
                            { term: 'q_\\pi(s, a)', name: 'Action-Value', meaning: 'The "goodness" of taking action a in state s under policy \u03C0.', range: '\\mathbb{R}', example: 'q(burning_room, use_extinguisher) = +50.' },
                            { term: 'G_t', name: 'Return', meaning: 'The discounted sum of all future rewards starting from time step t.', range: '\\mathbb{R}', example: 'G_t = R_{t+1} + \u03B3 R_{t+2} + ...' },
                            { term: 'A_t = a', name: 'Specific Action', meaning: 'The action being evaluated. Note that this is fixed, regardless of what the policy would normally suggest.', range: '\\mathcal{A}', example: 'Even if the policy is "Run", we can evaluate the Q-value of "Stay".' },
                        ]}
                        numericalExample={{
                            setup: 'Robot at a fork in the road. State s. Actions: left, right. Following policy \u03C0 thereafter. \u03B3=1.0.',
                            steps: [
                                'Take action "Left": leads to gold (+10) in 2 steps. G_t = 0 + 10 = 10.',
                                'Take action "Right": leads to trap (-5) in 1 step. G_t = -5.',
                                'q_\u03C0(s, left) = 10',
                                'q_\u03C0(s, right) = -5'
                            ],
                            result: 'The agent knows that "Left" is the superior choice for maximizing return.',
                        }}
                    />

                    <MathBlock 
                        formula="q_\\pi(s, a) = \\sum_{s', r} p(s', r | s, a) [r + \\gamma v_\\pi(s')]"
                        label="Recursive Relationship (Bellman)"
                        accent="violet"
                        explanation="The Q-value is the expected immediate reward plus the discounted value of the resulting next state."
                        interpretation="This formula connects Q and V. It says that the value of an action is the immediate feedback from the environment (r) plus the value of wherever you end up (v(s')). It's like evaluating a move in chess by looking at the immediate capture and the strength of the resulting board position."
                        motivation="This recursive form allows us to update Q-values iteratively without needing to play out the entire future every time. It's the basis for Temporal Difference (TD) learning."
                        terms={[
                            { term: 'p(s\', r | s, a)', name: 'Dynamics', meaning: 'The probability of ending up in state s\' with reward r after taking action a in state s.', range: '[0, 1]', example: 'Slippery floor: move "Up" has 0.8 prob of success, 0.2 of sliding "Left".' },
                            { term: 'v_\\pi(s\')', name: 'Next State Value', meaning: 'The total future reward we expect from the state we land in.', range: '\\mathbb{R}', example: 'If we land in a "Safe Zone", v(s\') is high.' },
                            { term: '\\gamma', name: 'Discount Factor', meaning: 'Reduces the value of future rewards compared to immediate ones.', range: '[0, 1]', example: '\u03B3=0.9 means a reward of 10 in the next state is worth 9 in the current action evaluation.' },
                        ]}
                    />

                    <MathBlock 
                        formula="v_\\pi(s) = \\sum_{a} \\pi(a|s) q_\\pi(s, a)"
                        label="The Connection: V from Q"
                        accent="amber"
                        explanation="The value of a state is the weighted average of the values of all actions possible in that state, weighted by the policy's probability of choosing them."
                        interpretation="This shows that V(s) is a summary of Q(s, a). If your policy is to flip a coin (0.5 prob) between two actions, the value of being in that state is half the value of action A plus half the value of action B."
                        motivation="Helps us understand how improving individual action-choices (Q) leads to a more valuable state experience (V)."
                        terms={[
                            { term: '\\pi(a|s)', name: 'Policy Probability', meaning: 'The chance of taking action a when in state s.', range: '[0, 1]', example: 'Greedy policy: 1.0 for the best action, 0 for others.' },
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Action Value Function Architecture"
                description="The Q-value formulation."
                chart={`graph TD
    Q[Q(s,a)] --> E[Expected Return G_t]
    E --> Cond[Given S_t = s, A_t = a]
    Cond --> Pi[Following policy &pi; thereafter]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="7. Multi-Level Activities" 
                subtitle="Ranking Decisions with Q-Values"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Action-Value Ranking Demo",
                            objectives: "Observe how an agent uses Q-values to differentiate between multiple possible directions.",
                            instructions: [
                                "Open the 'Action-Value Explorer' in the Virtual Lab section.",
                                "Click through each direction (Up, Down, Left, Right).",
                                "Show the 'Q-Value' for each and explain that $Q(s, \text{Right}) = 9.2$ makes it the dominant choice.",
                                "Ask: 'If the agent took a random walk, would its value $V(s)$ be higher or lower than 9.2?' (Lower, because it would sometimes pick bad actions like 'Down')."
                            ],
                            inputs: "Interactive ActionValueGrid component",
                            outputs: "Visual action rankings and Q-value tooltips.",
                            rubrics: ["Clarity of 'Action Goodness' explanation", "Demonstration of greedy selection", "Student engagement"],
                            outcomes: "Students identify $Q(s, a)$ as the fundamental metric for action selection.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Delayed Gratification Workshop",
                            objectives: "Collaboratively calculate Q-values for a scenario where immediate reward is misleading.",
                            instructions: [
                                "Teacher presents 'The Homework Dilemma'.",
                                "State: {Friday Evening}. Actions: {Play Video Games, Finish Homework}.",
                                "Action A (Games): Reward $r = +10$, Next State $V(S') = -50$ (Stressful Sunday).",
                                "Action B (Work): Reward $r = -5$, Next State $V(S'') = +100$ (Relaxed Weekend).",
                                "Guided Calculation: $Q(S, \text{Games}) = 10 - 50 = -40$. $Q(S, \text{Work}) = -5 + 100 = 95$.",
                                "Class reflects: 'Why did the machine pick the harder task?'"
                            ],
                            inputs: "Scenario data (Rewards and Next-State values)",
                            outputs: "Comparative Q-Value calculation on the board",
                            rubrics: ["Correct application of $Q = r + \gamma V$", "Logical interpretation of results", "Classroom participation"],
                            outcomes: "Students master the technical recursive logic that allows RL to prioritize long-term goals.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Q-Table Race",
                            objectives: "Experience the construction of a lookup table for decision-making in a group setting.",
                            instructions: [
                                "Divide class into 4 teams. Provide a 2x2 gridworld diagram.",
                                "Task: For each cell, calculate the Q-value for 2 actions: 'Move Closer to Goal' and 'Move Away'.",
                                "Set Goal reward to +100 and step penalty to -1.",
                                "Group Task: Fill in the 4x2 Q-Table on chart paper.",
                                "Teams race to identify the cell with the highest 'Choice Gap' (where one action is clearly better than the other)."
                            ],
                            inputs: "2x2 Gridworld diagram",
                            outputs: "Hand-calculated Q-Table chart",
                            rubrics: ["Numerical accuracy", "Matrix-Action mapping", "Team coordination"],
                            outcomes: "Students understand that a policy is just a way of reading a Q-Table.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Strategy Audit",
                            objectives: "Independently analyze a personal decision or game move using formal Q-value logic.",
                            instructions: [
                                "Task: Identify a move in a game (e.g., Chess, Poker, or a MOBA) where you made a mistake.",
                                "Audit: What was the 'Immediate Reward' of that move? (e.g., capturing a piece).",
                                "Audit: What was the 'Next State Value' $V(s')$? (e.g., getting checkmated).",
                                "Calculate: Estimate the true $Q(s, a)$ and compare it to the $Q(s, a_{better})$ of the move you should have made.",
                                "Reflect: Why did you fail to calculate the correct Q-value at the time?"
                            ],
                            inputs: "Personal game or life experiences",
                            outputs: "Individual Decision Audit Report (1 page)",
                            rubrics: ["Correct use of $Q = r + V$ logic", "Depth of strategic reflection", "Originality"],
                            outcomes: "Students realize that 'Strategic Mistakes' are essentially just 'Q-value Estimation Errors'.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="7. Project: Game Engine Ranking" 
                subtitle="Q-Values in Decision Trees"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Binary size={18} /> The Q-Table</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            In simple games like Flappy Bird, the agent maintains a "Q-Table". This is a giant spreadsheet where rows are States (bird height, pipe distance) and columns are Actions (Flap, Stay).
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="p-2 text-left">State (Height)</th>
                                        <th className="p-2 text-center text-primary-600">Q(Flap)</th>
                                        <th className="p-2 text-center text-amber-600">Q(Stay)</th>
                                        <th className="p-2 text-right">Best Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-500">
                                    <tr className="border-b border-slate-50">
                                        <td className="p-2 font-mono">Near Ground</td>
                                        <td className="p-2 text-center">+12.5</td>
                                        <td className="p-2 text-center">-50.0</td>
                                        <td className="p-2 text-right font-bold text-emerald-500">Flap</td>
                                    </tr>
                                    <tr className="border-b border-slate-50">
                                        <td className="p-2 font-mono">Near Ceiling</td>
                                        <td className="p-2 text-center">-40.0</td>
                                        <td className="p-2 text-center">+5.2</td>
                                        <td className="p-2 text-right font-bold text-emerald-500">Stay</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-mono">Mid Air</td>
                                        <td className="p-2 text-center">+2.1</td>
                                        <td className="p-2 text-center">+1.8</td>
                                        <td className="p-2 text-right font-bold text-emerald-500">Flap</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-4 text-center">A Flappy Bird agent learns these numbers through millions of crashes!</p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="7. Quick Check" 
                subtitle="Testing Your Q-Intuition"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the physical meaning of a Q-value?', a: 'It is the total discounted reward an agent expects to receive in the future, starting by taking action a in state s.' },
                        { q: 'How does Q(s, a) differ from V(s)?', a: 'V(s) evaluates a state on average under a policy. Q(s, a) evaluates a specific starting action in that state, regardless of what the policy might prefer initially.' },
                        { q: 'If Q(s, a1) = 10 and Q(s, a2) = 5, what should a rational agent do?', a: 'The agent should choose action a1 (Greedy action) because it leads to a higher expected long-term return.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Action-Value Explorer" 
                subtitle="Rank Your Options"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Q-Table Inspector"
                    description="Explore action values for each state"
                    objective="Observe Q(s,a) values updating in real-time. Click any state to see its action-value breakdown."
                    badge="Interactive Lab"
                    tips={['Q(s,a) tells you: "How good is action a from state s?"',
                'The optimal policy is: always pick the action with the highest Q value']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select different actions in the grid below. See how the mathematical <strong>Q-Value</strong> for each direction allows the agent to decide which way is "best" even before it moves.
                    </p>
                    <ActionValueGrid />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-emerald-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Action Values Mastered!</h3>
                    <p className="text-emerald-100">
                        You've unlocked the ability to evaluate choices. Next, we'll see how the agent uses these values to find the absolute best Strategy (Optimal Policy).
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-emerald-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: OPTIMAL POLICY
                    </button>
                </div>
            </div>
        </div>
    );
}
