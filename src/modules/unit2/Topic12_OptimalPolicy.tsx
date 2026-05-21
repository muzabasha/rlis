import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import {
    motion,
    AnimatePresence
} from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import {
    MathBlock,
    SymbolTable
} from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Trophy,
    Target,
    Zap,
    TrendingUp,
    Star,
    Crown,
    CheckCircle2,
    Play,
    RotateCcw,
    ChevronRight,
    Binary,
    Focus,
    Briefcase,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Optimal Policy Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Optimal Policy Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Optimal Policy simulator.",
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
    "🤖 [System] Initializing Optimal Policy Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Optimal Policy\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 12 ─────────────────────────────────────

/**
 * Policy Improvement Lab
 */
function PolicyLab() {
    const [policy, setPolicy] = useState<string[]>(Array(9).fill('?'));
    const [isOptimal, setIsOptimal] = useState(false);

    const optimalPolicy = ['→', '→', 'Goal', '↑', '↑', '↑', '↑', '↑', '↑']; // Simplified

    const toggleAction = (idx: number) => {
        if (idx === 2) return; // Goal
        const actions = ['↑', '→', '↓', '←'];
        const current = policy[idx];
        const next = actions[(actions.indexOf(current) + 1) % 4] || '↑';
        const newPolicy = [...policy];
        newPolicy[idx] = next;
        setPolicy(newPolicy);
    };

    useEffect(() => {
        const correct = policy.every((p, i) => i === 2 || p === optimalPolicy[i]);
        // Note: In a real MDP there might be multiple optimal policies, but for this lab we simplify.
        // Let's just check if they point generally towards the goal.
        const win = policy[1] === '→' && policy[0] === '→' && policy[5] === '↑';
        setIsOptimal(win);
    }, [policy]);

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Target size={18} className="text-primary-500" />
                        Find the Optimal Strategy
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Click each cell to change the agent's action. Your goal is to find the <strong>Optimal Policy ($\pi^*$)</strong> that leads every state to the Goal in the minimum steps.
                    </p>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
                        <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
                            Hint: The agent starts at $s_6$ (bottom-left) and the Goal is at $s_2$ (top-right).
                        </p>
                    </div>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="grid grid-cols-3 gap-2 w-64 h-64 p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        {policy.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => toggleAction(i)}
                                className={`rounded-lg flex flex-col items-center justify-center transition-all ${i === 2
                                        ? 'bg-emerald-500 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-slate-200 dark:border-slate-700 shadow-sm'
                                    }`}
                            >
                                <span className="text-[10px] text-slate-400 mb-1">s{i}</span>
                                <span className="text-xl font-black">{i === 2 ? '🏁' : p}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOptimal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500 text-white p-6 rounded-2xl flex items-center gap-4 shadow-xl shadow-emerald-500/20"
                    >
                        <Crown size={32} />
                        <div>
                            <h5 className="font-bold">Convergence Reached!</h5>
                            <p className="text-sm opacity-90">You have discovered the Optimal Policy. For every state, the chosen action maximizes the expected return. This is the goal of all RL algorithms.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic12_OptimalPolicyMDP() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic12_optimalpolicy" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. The Master Plan"
                subtitle="The Search for Perfection"
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
                                "The Optimal Policy is the ultimate cheat code for life, dictating the best possible action in every conceivable scenario."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Star size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🏆 The Best Possible You
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In every Reinforcement Learning problem, there exists a "perfect" way to behave.
                            </p>
                            <p>
                                Think of a GPS navigation system. There might be 1,000 ways to get to your destination, but there is usually one path that is the fastest. That "Fastest Path" for every possible location is the <strong>Optimal Policy ($\pi^*$)</strong>.
                            </p>
                            <p>
                                Finding this policy is the "Holy Grail" of RL. We don't just want a policy that works; we want the one that is mathematically impossible to beat.
                            </p>
                            <p>
                                <strong>The Theorem:</strong> For any finite MDP, there is always at least one deterministic optimal policy that is as good as or better than all other possible policies.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Global Optimality">
                            An optimal policy is optimal for <strong>every</strong> state simultaneously. It's not just a good path from one point; it's a map that works no matter where you start.
                        </InfoCard>
                        <InfoCard type="tip" title="Deterministic Power">
                            Even if the environment is random (stochastic), there always exists a deterministic (no coin-flips) optimal policy.
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
                                Finding the absolute best sequence of actions for a robotic picker to empty warehouse shelves in the shortest possible time.
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
                            The ultimate objective of RL; finding the mapping that guarantees maximum possible returns from every starting point.
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
                                    Guarantees peak theoretical performance of an agent across all scenarios.
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
                                    Highly expensive to compute and vulnerable to even minor environment shifts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. Bellman Optimality"
                subtitle="The Equations of Perfection"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                            <MathBlock
                                formula="v_*(s) = \max_{\pi}\, v_\pi(s) = \max_{a}\sum_{s'}\mathcal{P}(s'|s,a)\Bigl[\mathcal{R}(s,a,s') + \gamma\, v_*(s')\Bigr]"
                                label="Bellman Optimality Equation for V*(s)"
                                accent="blue"
                                explanation="The optimal state value equals the value of the best action — the one that maximises expected immediate reward plus discounted optimal next-state value."
                                interpretation="This is the master equation of RL. It says: the best possible value of state s is achieved by picking the single best action at each step. Unlike the Bellman expectation equation (which averages over a policy), the optimality equation uses max — making it nonlinear. This nonlinearity is why we need iterative algorithms like value iteration rather than direct matrix inversion."
                                motivation="Solving this equation gives V*(s) for all states, from which the optimal policy is trivially extracted: π*(s) = argmax_a Q*(s,a). Every RL algorithm — Q-learning, value iteration, policy gradient — is ultimately trying to solve this equation."
                                terms={[
                                    { term: 'v_*(s)', name: 'Optimal Value Function', meaning: 'The maximum expected return achievable from state s over all possible policies. The upper bound of performance.', range: '\\mathbb{R}', example: 'v_*(near_goal)=9.8 — the best any policy can do from this state.' },
                                    { term: '\\max_a', name: 'Action Maximisation', meaning: 'Choose the single best action — the one that maximises the bracketed expression. This is the greedy operator.', range: '\\mathcal{A}', example: 'max(Q*(s,left)=3, Q*(s,right)=9) = 9 → choose right.' },
                                    { term: '\\mathcal{P}(s\'|s,a)', name: 'Transition Probability', meaning: 'Probability of reaching state s\' when taking action a in state s.', range: '[0,1]', example: 'P(goal|near_goal,right)=0.9.' },
                                    { term: '\\gamma\\,v_*(s\')', name: 'Discounted Optimal Future', meaning: 'The optimal value of the next state, discounted by γ. Assumes optimal behaviour from s\' onwards.', range: '\\mathbb{R}', example: 'γ=0.9, v_*(s\')=10 → contribution = 9.' },
                                ]}
                                numericalExample={{
                                    setup: 'State s. Two actions: a1 (r=2, leads to s\' with v_*(s\')=10) and a2 (r=5, leads to s\'\' with v_*(s\'\')=1). γ=0.9.',
                                    steps: [
                                        'Q*(s,a1) = 2 + 0.9×10 = 2 + 9 = 11',
                                        'Q*(s,a2) = 5 + 0.9×1  = 5 + 0.9 = 5.9',
                                        'v_*(s) = max(11, 5.9) = 11',
                                        'π*(s) = a1  (choose the action with highest Q*)',
                                    ],
                                    result: 'v_*(s)=11, π*(s)=a1. Despite a2 having higher immediate reward (+5 vs +2), a1 is optimal because it leads to a much better future state.',
                                }}
                            />

                            <MathBlock
                                formula="q_*(s,a) = \sum_{s'}\mathcal{P}(s'|s,a)\Bigl[\mathcal{R}(s,a,s') + \gamma\max_{a'}q_*(s',a')\Bigr]"
                                label="Bellman Optimality Equation for Q*(s,a)"
                                accent="violet"
                                explanation="The optimal Q-value equals the expected immediate reward plus the discounted best Q-value achievable in the next state."
                                interpretation="This is the equation that Q-learning directly approximates. The key term is max_{a'} Q*(s',a') — it assumes optimal behaviour from the next state onwards. This is what makes Q-learning off-policy: the update uses the greedy next action regardless of what the agent actually did."
                                motivation="Q*(s,a) is more useful than V*(s) for practical RL because it directly tells us which action to take without needing the transition model P. Once Q* is known, π*(s) = argmax_a Q*(s,a) — no model needed."
                                terms={[
                                    { term: 'q_*(s,a)', name: 'Optimal Action-Value', meaning: 'Best expected return when taking action a in state s, then acting optimally forever after.', range: '\\mathbb{R}', example: 'q_*(start,right)=9.8 — going right from start is nearly optimal.' },
                                    { term: '\\max_{a\'} q_*(s\',a\')', name: 'Greedy Next Q', meaning: 'The highest Q-value achievable in the next state — assumes optimal future behaviour.', range: '\\mathbb{R}', example: 'max(q_*(s\',left)=4, q_*(s\',right)=7.5) = 7.5.' },
                                ]}
                                numericalExample={{
                                    setup: 'Q-learning update. s=(2,3), a=right, r=−0.1, s\'=(2,4). max Q*(s\',·)=7.5. γ=0.9.',
                                    steps: [
                                        'Q*(s,a) = r + γ·max_{a\'} Q*(s\',a\')',
                                        '        = −0.1 + 0.9×7.5',
                                        '        = −0.1 + 6.75',
                                        '        = 6.65',
                                    ],
                                    result: 'Q*((2,3),right) = 6.65. This is the target value Q-learning tries to converge to.',
                                }}
                            />

                            <MathBlock
                                formula="\pi^*(s) = \arg\max_{a}\, q_*(s,a) = \arg\max_{a}\sum_{s'}\mathcal{P}(s'|s,a)\Bigl[\mathcal{R}(s,a,s') + \gamma\, v_*(s')\Bigr]"
                                label="Optimal Policy — Greedy with Respect to Q*"
                                accent="emerald"
                                explanation="The optimal policy always takes the action with the highest Q* value. It is deterministic and greedy with respect to the optimal value function."
                                interpretation="Once Q* is known, the optimal policy is trivially extracted by taking the argmax at each state. This is a deterministic policy — no randomness needed. The optimal policy is unique (up to ties) for any finite MDP. This is the end goal of all RL algorithms."
                                motivation="This equation shows that the hard part of RL is learning Q* — once that is done, the optimal policy is free. This is why Q-learning focuses entirely on learning Q* rather than directly learning π*."
                                terms={[
                                    { term: '\\pi^*(s)', name: 'Optimal Policy', meaning: 'The best possible action to take in state s. Deterministic and greedy with respect to Q*.', range: '\\mathcal{A}', example: 'π*((2,3)) = right (if Q*((2,3),right) is highest).' },
                                    { term: '\\arg\\max_a', name: 'Argmax', meaning: 'Returns the action a that achieves the maximum value, not the maximum value itself.', range: '\\mathcal{A}', example: 'argmax(Q=3,Q=9,Q=5) = action 2 (not 9).' },
                                ]}
                            />

                            <PolicyLab />
                        </div>
                    </SectionWrapper>

                    {/* INTERACTIVE DIAGRAM */}
                    <InteractiveDiagram
                        title="Optimal Policy Architecture"
                        description="Defining the best possible policy."
                        chart={`graph LR
    Pi1[Policy 1] --> V1[V_pi1(s)]
    Pi2[Policy 2] --> V2[V_pi2(s)]
    Pi_star[Policy *] --> V_star[V*(s) >= V_pi(s) for all pi]
    V_star -.-> |Determines| Optimal[Optimal Behavior]`}
                    />


                    {/* SECTION 4: ACTIVITY BASED LEARNING */}
                    <SectionWrapper
                        id="activity"
                        title="4. Multi-Level Activities"
                        subtitle="Engineering Perfection"
                        icon={<Users className="text-emerald-600" size={24} />}
                        badge="Activity"
                        badgeColor="bg-emerald-100 text-emerald-700"
                        accentColor="border-emerald-500"
                    >
                        <ActivityLevels
                            levels={[
                                {
                                    level: 1,
                                    title: "Policy Sandbox Demo",
                                    objectives: "Observe how a policy (a mapping from state to action) determines the efficiency of reaching a goal.",
                                    instructions: [
                                        "Open the 'Policy Sandbox' in the Virtual Lab section.",
                                        "Deliberately set a 'Suboptimal Policy' (e.g., pointing the arrows away from the goal).",
                                        "Trace the resulting path mentally. Show how it takes more steps or never reaches the finish.",
                                        "Now, click to set the 'Optimal Policy' arrows. Watch for the 'Convergence Reached' badge.",
                                        "Explain: 'Optimality means there is no faster way to get from $s_6$ to $s_2$.'"
                                    ],
                                    inputs: "Interactive PolicyLab component",
                                    outputs: "Visual policy grid and 'Convergence' status indicator.",
                                    rubrics: ["Clarity of 'Policy efficiency' explanation", "Demonstration of boundary discovery", "Student engagement"],
                                    outcomes: "Students define an optimal policy as one that maximizes return for all states.",
                                    time: "10 Mins",
                                    materials: ["Interactive Component", "Projector"]
                                },
                                {
                                    level: 2,
                                    title: "Bellman Optimality Workshop",
                                    objectives: "Collaboratively calculate the optimal value $v_*(s)$ using the max-action operator.",
                                    instructions: [
                                        "Teacher presents state $S$. Two actions: {Safe, Gamble}.",
                                        "Safe: Reward $r=+5$, leads to $s_{End}$ where $V_*=0$. Total = 5.",
                                        "Gamble: 50% chance of +20 ($s_{End}$), 50% chance of -10 ($s_{End}$).",
                                        "Guided Calculation: $Q_*(S, \text{Safe}) = 5 + 0 = 5$. $Q_*(S, \text{Gamble}) = 0.5(20) + 0.5(-10) = 5$.",
                                        "Teacher asks: 'Since both Q-values are 5, are both actions part of an optimal policy?'",
                                        "Class concludes: Yes, optimal policies are not necessarily unique."
                                    ],
                                    inputs: "Action-reward probability data",
                                    outputs: "Calculated Optimal Value $v_*(s)$ on the board",
                                    rubrics: ["Correct use of the 'max' operator", "Probability weight calculation", "Classroom participation"],
                                    outcomes: "Students master the technical application of the Bellman Optimality Equation.",
                                    time: "15 Mins",
                                    materials: ["Whiteboard", "Markers"]
                                },
                                {
                                    level: 3,
                                    title: "The Perfect Intersection Design",
                                    objectives: "Experience the design of an optimal logic for a multi-variable control system.",
                                    instructions: [
                                        "Divide class into 4 teams. Provide a diagram of a 3-way intersection (A, B, C).",
                                        "Task: Create a 'Policy Table' for 4 states: {A busy}, {B busy}, {C busy}, {All empty}.",
                                        "Rule: Transition time between lights takes 2 seconds. The Goal is zero queue length.",
                                        "Group Task: Design the policy that minimizes the 'Max Wait Time' for any single car.",
                                        "Teams present their 'Optimal Logic' and defend it against 'Suboptimal' edge cases."
                                    ],
                                    inputs: "3-way intersection topology and state definitions",
                                    outputs: "Traffic Control Policy Table",
                                    rubrics: ["Efficiency of the logic", "Handling of edge cases", "Team coordination"],
                                    outcomes: "Students understand that 'Optimal' often means balancing competing future rewards.",
                                    time: "20 Mins",
                                    materials: ["Chart paper", "Markers"]
                                },
                                {
                                    level: 4,
                                    title: "Life Routine Audit",
                                    objectives: "Independently audit a personal routine to identify if it is currently 'Optimal' according to RL theory.",
                                    instructions: [
                                        "Task: Choose a recurring task (e.g., Your morning routine, your route to college, or your method for studying).",
                                        "Audit: Define the 'State' (Time left, energy level) and 'Action' (The specific sub-task).",
                                        "Reflection: Is there a sequence of actions that would get you to the 'Goal' (Ready for class) faster or with less stress?",
                                        "Report: If you found a better sequence, why weren't you using it before? (e.g., lack of exploration, high transition cost).",
                                        "Calculate: Estimate your current $V(s)$ vs the $V_*(s)$ of your new proposed routine."
                                    ],
                                    inputs: "Personal daily routines",
                                    outputs: "Individual Routine Optimization Note (1 page)",
                                    rubrics: ["Correct use of RL terminology", "Logical justification of 'Optimality'", "Originality"],
                                    outcomes: "Students apply the mathematical rigorousness of MDPs to improve personal efficiency.",
                                    time: "15 Mins",
                                    materials: ["Student Workbook"]
                                }
                            ]}
                        />
                    </SectionWrapper>

                    {/* SECTION 5: PROJECT BASED LEARNING */}
                    <SectionWrapper
                        id="project"
                        title="5. Project: Traffic Light Control"
                        subtitle="The Search for the Perfect Green"
                        icon={<Briefcase className="text-indigo-600" size={24} />}
                        badge="PBL"
                        badgeColor="bg-indigo-100 text-indigo-700"
                        accentColor="border-indigo-500"
                    >
                        <div className="space-y-6">
                            <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                                <h5 className="font-bold mb-2 flex items-center gap-2"><Crown size={18} /> Optimization Task</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    You are designing an AI to control traffic lights at a 4-way intersection.
                                    <strong>State:</strong> Number of cars waiting in each lane.
                                    <strong>Action:</strong> Which light to turn green.
                                    <strong>Reward:</strong> Negative of the total waiting time.
                                </p>
                            </div>

                            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm">
                                <h6 className="font-bold text-xs mb-3 text-indigo-600 uppercase">Characteristics of the Optimal Policy:</h6>
                                <ul className="text-xs space-y-2 text-slate-500 list-disc pl-4">
                                    <li>It doesn't just clear the busiest lane immediately if that would cause a massive pile-up elsewhere later.</li>
                                    <li>It learns the "rhythm" of traffic—anticipating cars that aren't even at the intersection yet.</li>
                                    <li>It achieves the <strong>Absolute Minimum</strong> average wait time possible for that intersection geometry.</li>
                                </ul>
                            </div>
                        </div>
                    </SectionWrapper>

                    {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
                    <SectionWrapper
                        id="questions"
                        title="6. Quick Check"
                        subtitle="Optimality Theory"
                        icon={<HelpCircle className="text-purple-600" size={24} />}
                        badge="Questions"
                        badgeColor="bg-purple-100 text-purple-700"
                        accentColor="border-purple-500"
                    >
                        <div className="grid gap-4">
                            {[
                                { q: 'Can there be more than one optimal policy for an MDP?', a: 'Yes. Multiple policies can achieve the same maximum expected return (e.g., in a grid where two different paths are exactly the same length).' },
                                { q: 'Does every finite MDP have an optimal policy?', a: 'Yes. It is a fundamental theorem of MDPs that at least one optimal policy always exists.' },
                                { q: 'How is the optimal policy related to the optimal action-value function?', a: 'The optimal policy is to always choose an action a that maximizes q_*(s, a) for the current state s.' }
                            ].map((item, i) => (
                                <QuizCard key={i} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
                    <SectionWrapper
                        id="lab"
                        title="7. Virtual Lab: Policy Sandbox"
                        subtitle="Build the Optimal Strategy"
                        icon={<FlaskConical className="text-cyan-600" size={24} />}
                        badge="Virtual Lab"
                        badgeColor="bg-cyan-100 text-cyan-700"
                        accentColor="border-cyan-500"
                    >
                        <div className="space-y-6">
                            <VirtualLabShell
                                title="Policy Optimizer"
                                description="Converge to the optimal policy via iteration"
                                objective="Run policy iteration and observe the policy stabilize. Compare the initial random policy vs the optimal one."
                                badge="Interactive Lab"
                                tips={['Policy Evaluation → Policy Improvement → repeat until stable',
                                    'The algorithm is guaranteed to converge to the optimal policy']}
                                challenges={challenges} notebook={notebook} logs={logs}>
                                <PolicyLab />
                            </VirtualLabShell>

                        </div>
                    </SectionWrapper>

                    {/* FEEDBACK SECTION */}
                    <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                        <div className="max-w-xl mx-auto space-y-2">
                            <h3 className="text-3xl font-black italic">Optimality Achieved!</h3>
                            <p className="text-primary-100">
                                You've reached the summit of MDP theory. Now, let's look at some real-world examples where these optimal policies make a difference.
                            </p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                NEXT: MDP EXAMPLES
                            </button>
                        </div>
                    </div>
                </div>
                );
}
