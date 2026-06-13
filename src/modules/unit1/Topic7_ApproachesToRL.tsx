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
    GitMerge,
    Target,
    Database,
    Cpu,
    Zap,
    TrendingUp,
    Clock,
    Briefcase,
    ShieldAlert,
    Users2,
    Layout,
    ChevronRight,
    Info,
    BrainCircuit,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Approaches To R L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Approaches To R L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Approaches To R L simulator.",
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
    "🤖 [System] Initializing Approaches To R L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Approaches To R L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 7 ──────────────────────────────────────

/**
 * Radar Chart comparing Value, Policy, and Model Based approaches
 */
function ApproachComparisonChart() {
    const data = [
        { subject: 'Sample Efficiency', A: 80, B: 40, C: 95, fullMark: 100 },
        { subject: 'Stability', A: 90, B: 60, C: 40, fullMark: 100 },
        { subject: 'Versatility', A: 50, B: 95, C: 70, fullMark: 100 },
        { subject: 'Compute Speed', A: 85, B: 90, C: 30, fullMark: 100 },
        { subject: 'Complexity', A: 40, B: 50, C: 90, fullMark: 100 },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <BrainCircuit size={18} className="text-primary-500" />
                    Approach Comparison Radar
                </h4>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Value</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Policy</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500"><div className="w-2 h-2 bg-amber-500 rounded-full" /> Model</span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Value-Based"
                            dataKey="A"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.4}
                        />
                        <Radar
                            name="Policy-Based"
                            dataKey="B"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.4}
                        />
                        <Radar
                            name="Model-Based"
                            dataKey="C"
                            stroke="#f59e0b"
                            fill="#f59e0b"
                            fillOpacity={0.4}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-[11px] leading-relaxed italic text-slate-500">
                "Note how <span className="text-amber-500 font-bold">Model-Based</span> excels at Sample Efficiency but struggles with Compute Speed and Stability."
            </div>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic7_ApproachesToRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic7_approachestorl" />
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
                        const data = getTopicData('unit1', 'Topic7_ApproachesToRL');
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
                title="1. The Three Strategists"
                subtitle="Different Paths to the Same Goal"
                icon={<GitMerge className="text-blue-600" size={24} />}
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
                                "Value-based is like checking price tags. Policy-based is like acting on pure vibes."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <BrainCircuit size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🏰 The Siege of Castle Chess
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine three generals planning a siege on a castle. Each has a completely different way of thinking.
                            </p>
                            <p>
                                <strong>General Value:</strong> He looks at every square on the map and assigns it a price. "Capturing the bridge is worth 50 gold. Losing a knight costs 20 gold." He moves wherever the total gold value is highest.
                            </p>
                            <p>
                                <strong>General Policy:</strong> He doesn't care about gold. He has a book of instincts. "If the bridge is guarded, shoot arrows." He learns a direct mapping from what he sees to what he does.
                            </p>
                            <p>
                                <strong>General Model:</strong> He is a dreamer. Before any soldier moves, he closes his eyes and simulates the battle in his head. "If I move left, they will likely move right, which leads to victory." He builds a <em>mental world</em>.
                            </p>
                            <p>
                                In RL, these are our three core approaches. No one is "best"—they just have different strengths!
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { name: 'Value-Based', icon: '💰', desc: 'Focuses on the "Worth" of states.' },
                            { name: 'Policy-Based', icon: '📜', desc: 'Focuses on the "Action" directly.' },
                            { name: 'Model-Based', icon: '🔮', desc: 'Focuses on "Predicting" the future.' }
                        ].map(item => (
                            <div key={item.name} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center hover:scale-105 transition-transform">
                                <div className="text-2xl mb-2">{item.icon}</div>
                                <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">{item.name}</div>
                                <div className="text-[10px] text-slate-500 leading-tight">{item.desc}</div>
                            </div>
                        ))}
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
                                A robotic bipedal walker needs to decide whether to learn a direct foot-torque mapping (policy-based) or estimate the energy value of each stance (value-based).
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
                            Helps developers choose between policy-gradient, value-iteration, or model-based methods depending on state-space continuity.
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
                                    Offers diverse strategies for optimization, catering to discrete, continuous, high-dimensional, and noisy domains.
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
                                    Selecting the wrong approach can lead to extreme training instability or suboptimal convergence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. Mathematical Formalization"
                subtitle="Equations for Every Strategist"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="Q(s,a) \approx \mathbb{E}\!\left[G_t \mid S_t=s,\,A_t=a\right]"
                        label="Value-Based Approach — Action-Value Function Q(s,a)"
                        accent="blue"
                        explanation="Q(s,a) estimates the expected total discounted reward when taking action a in state s and then following the current policy. The agent acts greedily: always pick the action with the highest Q-value."
                        interpretation="The Q-function is the 'price tag' on every (state, action) pair. A high Q(s,a) means taking action a in state s is expected to lead to a lot of future reward. Value-based methods like Q-learning and DQN learn this function and derive the policy implicitly as π(s)=argmax_a Q(s,a)."
                        motivation="Value-based methods are stable and well-understood. They work best for discrete action spaces. The Q-function provides a complete ranking of all actions in every state, making policy extraction trivial."
                        terms={[
                            { term: 'Q(s,a)', name: 'Action-Value Function', meaning: 'Expected return when taking action a in state s, then following policy π. The core object learned by Q-learning and DQN.', range: '\\mathbb{R}', example: 'Q((2,3),right)=7.2 means going right from (2,3) is expected to yield 7.2 total reward.' },
                            { term: '\\mathbb{E}[G_t\\mid S_t=s,A_t=a]', name: 'Conditional Expectation', meaning: 'Average return over all possible trajectories starting with action a in state s.', range: '\\mathbb{R}', example: 'If 80% of trajectories give G=9 and 20% give G=1: Q=0.8×9+0.2×1=7.4.' },
                        ]}
                        numericalExample={{
                            setup: 'Q-table for a 2-state, 2-action problem. After training: Q(s₁,left)=3, Q(s₁,right)=8, Q(s₂,left)=5, Q(s₂,right)=2.',
                            steps: [
                                'In state s₁: argmax_a Q(s₁,a) = right (Q=8 > Q=3)',
                                'In state s₂: argmax_a Q(s₂,a) = left  (Q=5 > Q=2)',
                                'Greedy policy: π*(s₁)=right, π*(s₂)=left',
                            ],
                            result: 'The optimal policy is extracted directly from the Q-table by taking the argmax at each state. No separate policy network needed.',
                        }}
                    />

                    <MathBlock
                        formula="\pi_\theta(a \mid s) = \frac{\exp\!\left(\theta_a^\top \phi(s)\right)}{\sum_{a'}\exp\!\left(\theta_{a'}^\top \phi(s)\right)}"
                        label="Policy-Based Approach — Softmax Policy"
                        accent="violet"
                        explanation="A parameterised stochastic policy that maps states to probability distributions over actions using a softmax function. Parameters θ are optimised directly by gradient ascent on expected return."
                        interpretation="Instead of learning a value function and deriving the policy, policy-based methods directly parameterise π_θ and optimise θ. The softmax ensures all action probabilities are positive and sum to 1. This approach naturally handles continuous action spaces and stochastic optimal policies."
                        motivation="Policy-based methods are essential when the action space is continuous (robot joints, steering angles) or when the optimal policy is stochastic (game theory, partially observable environments). Value-based methods cannot handle these cases directly."
                        terms={[
                            { term: '\\pi_\\theta(a\\mid s)', name: 'Parameterised Policy', meaning: 'Probability of taking action a in state s, controlled by parameters θ (neural network weights).', range: '[0,1]', example: 'π_θ(right|(2,3))=0.73, π_θ(up|(2,3))=0.18, π_θ(left|(2,3))=0.09.' },
                            { term: '\\theta_a', name: 'Action Parameters', meaning: 'The weight vector for action a. Higher θ_a·φ(s) → higher probability of choosing a.', range: '\\mathbb{R}^d', example: 'θ_right = [0.5, 0.3, −0.1] for a 3-feature state.' },
                            { term: '\\phi(s)', name: 'State Feature Vector', meaning: 'A vector representation of state s. Can be hand-crafted features or the output of a neural network.', range: '\\mathbb{R}^d', example: 'φ((2,3)) = [0.4, 0.6] (normalised row and column).' },
                        ]}
                        numericalExample={{
                            setup: '2 actions: left, right. θ_left·φ(s)=1.0, θ_right·φ(s)=2.0.',
                            steps: [
                                'exp(1.0) = 2.718,  exp(2.0) = 7.389',
                                'Sum = 2.718 + 7.389 = 10.107',
                                'π(left|s)  = 2.718/10.107 = 0.269',
                                'π(right|s) = 7.389/10.107 = 0.731',
                            ],
                            result: 'The agent takes "right" 73.1% of the time and "left" 26.9% — a stochastic policy that still favours the better action.',
                        }}
                    />

                    <MathBlock
                        formula="\hat{s}_{t+1},\,\hat{r}_{t+1} = \mathcal{M}_\phi(s_t,\,a_t)"
                        label="Model-Based Approach — Learned Environment Model"
                        accent="amber"
                        explanation="A learned model M_φ predicts the next state and reward given the current state and action. The agent uses this model to plan (simulate future trajectories) without interacting with the real environment."
                        interpretation="Model-based RL builds an internal simulator of the world. The agent can 'imagine' thousands of future trajectories in its head before taking a single real action. This dramatically improves sample efficiency — the agent learns more from less real experience."
                        motivation="Real-world RL is expensive: each interaction with a physical robot costs time and money. A learned model allows the agent to practice in simulation, then transfer the learned policy to the real world."
                        terms={[
                            { term: '\\mathcal{M}_\\phi', name: 'Learned Model', meaning: 'A function (usually a neural network) that approximates the environment\'s transition and reward dynamics.', range: '\\mathcal{S}\\times\\mathcal{A}\\to\\mathcal{S}\\times\\mathbb{R}', example: 'A neural network trained on (s,a,s\',r) tuples from real experience.' },
                            { term: '\\hat{s}_{t+1}', name: 'Predicted Next State', meaning: 'The model\'s prediction of where the environment will be after action a_t. May differ from the true S_{t+1}.', range: '\\mathcal{S}', example: 'Model predicts robot will be at (2,4) after moving right from (2,3).' },
                            { term: '\\hat{r}_{t+1}', name: 'Predicted Reward', meaning: 'The model\'s prediction of the reward that will be received.', range: '\\mathbb{R}', example: 'Model predicts r=−0.1 for a step action.' },
                        ]}
                    />

                    <div className="grid lg:grid-cols-2 gap-6">
                        <ApproachComparisonChart />
                        <div className="space-y-3">
                            <h5 className="font-bold text-slate-800 dark:text-white text-sm">When to Use Each Approach</h5>
                            {[
                                { approach: 'Value-Based (Q-learning, DQN)', when: 'Discrete action spaces, stable environments, when interpretability matters.' },
                                { approach: 'Policy-Based (REINFORCE, PPO)', when: 'Continuous actions, stochastic optimal policies, high-dimensional action spaces.' },
                                { approach: 'Model-Based (Dyna-Q, AlphaZero)', when: 'Sample efficiency is critical, simulation is cheap, environment is learnable.' },
                            ].map(p => (
                                <div key={p.approach} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-1">{p.approach}</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">{p.when}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Approaches To R L Architecture"
                description="Value-based vs Policy-based approaches."
                chart={`graph TD
    RL[RL Approaches] --> V[Value Based]
    RL --> P[Policy Based]
    RL --> AC[Actor-Critic]
    V --> V1[Learn Q-values]
    P --> P1[Learn Probabilities directly]
    AC --> AC1[Combine both]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Mastering the Three Strategists"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Approach Radar Demo",
                            objectives: "Demonstrate the comparative strengths and weaknesses of Value, Policy, and Model-based RL.",
                            instructions: [
                                "Open the 'Approach Comparison Radar' in the Virtual Lab section.",
                                "Highlight 'Sample Efficiency' and show why Model-Based (Amber) is at 95% (it dreams future trajectories).",
                                "Point out 'Compute Speed' and show why Policy-Based (Emerald) is faster (direct mapping, no search).",
                                "Show the 'Stability' of Value-Based (Blue) for discrete tasks.",
                                "Explain that modern RL often mixes these (e.g., Actor-Critic)."
                            ],
                            inputs: "Interactive Radar Comparison Chart",
                            outputs: "Multi-axis performance visualization (Sample Efficiency, Stability, Versatility, Speed, Complexity).",
                            rubrics: ["Clarity of trade-off explanation", "Connection to the 🏰 Siege story", "Student engagement"],
                            outcomes: "Students learn that no approach is globally superior; selection depends on the problem constraints.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Strategy Classifier Workshop",
                            objectives: "Collaboratively classify real-world automated systems into RL approaches.",
                            instructions: [
                                "Teacher lists 5 systems: 'Chess Engine', 'Self-Driving Lane Keeping', 'Stock Trading Bot', 'Industrial Robot Arm', 'Weather Predictor'.",
                                "Guided Discussion: 'Does a Stock Bot care about the price tag of a state?' (Yes, Value-Based).",
                                "Discussion: 'Does a Robot Arm need continuous torque?' (Yes, Policy-Based).",
                                "Discussion: 'Does a Chess Engine use a mental map?' (Yes, Model-Based)."
                            ],
                            inputs: "List of real-world AI applications",
                            outputs: "Categorized Application Matrix on the whiteboard",
                            rubrics: ["Conceptual accuracy", "Logical reasoning", "Classroom participation"],
                            outcomes: "Students master the criteria for selecting Value vs Policy vs Model based methods.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Three Generals Roleplay",
                            objectives: "Experience the internal logic of different RL approaches through a physical grid game.",
                            instructions: [
                                "Divide class into 3 groups: The Value Generals, The Policy Generals, The Model Generals.",
                                "Place a 'Treasure' in a 5x5 classroom grid.",
                                "Value Group: Must label every tile with a 'Gold Value' (+/-) before moving.",
                                "Policy Group: Must decide a 'Rule' (e.g., If wall on left, go right) and follow it blindly.",
                                "Model Group: Must close their eyes and predict 3 steps ahead before any real movement.",
                                "Groups race to the treasure. Discuss: Who was 'safest'? Who was 'fastest'?"
                            ],
                            inputs: "Classroom grid with obstacles and treasure",
                            outputs: "Timed completion of the navigation task",
                            rubrics: ["Adherence to role logic", "Execution speed", "Post-game reflection"],
                            outcomes: "Students internalize the different 'thinking styles' behind RL algorithms.",
                            time: "20 Mins",
                            materials: ["Labels/Sticky notes", "Stopwatch"]
                        },
                        {
                            level: 4,
                            title: "The Rubik's Cube Strategy",
                            objectives: "Independently design a high-level RL strategy for a specific complex puzzle.",
                            instructions: [
                                "Task: You are designing an AI to solve a Rubik's Cube.",
                                "Question 1: If you use Value-Based (Q-learning), how many states would you need to value? (Hint: It's millions).",
                                "Question 2: If you use Model-Based, why is it easy to 'model' a cube? (Rules are fixed).",
                                "Final Proposal: Write 3 sentences justifying which approach you would pick and why.",
                                "Self-Evaluation: Does your choice prioritize speed or stability?"
                            ],
                            inputs: "Knowledge of Rubik's Cube rules",
                            outputs: "1-page Strategy Proposal",
                            rubrics: ["Understanding of state-space complexity", "Model-based feasibility", "Originality"],
                            outcomes: "Students develop the engineering intuition required to architect RL solutions for real-world puzzles.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Pendulum Battle"
                subtitle="Value vs Policy vs Model"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-8">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2">Objective</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Implement three different agents (DQN, REINFORCE, and Dyna-Q) to solve the <strong>Classic Inverted Pendulum</strong> task. Compare which one learns to balance the pole the fastest!
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="font-bold flex items-center gap-2 text-sm"><Clock size={16} /> Deliverables</h5>
                            <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
                                <li>Learning curves (Reward vs Time) for all 3 agents.</li>
                                <li>Video of the pendulum swing-up.</li>
                                <li>Report on "Why Model-Based failed initially but succeeded later".</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-bold flex items-center gap-2 text-sm"><Target size={16} /> Success Metrics</h5>
                            <div className="flex gap-2">
                                {['Stability > 20s', 'Steps < 1000', 'No Jitter'].map(m => (
                                    <div key={m} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">
                                        {m}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Examination Focus"
                subtitle="Targeting Core Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Contrast Model-Free and Model-Based RL.', a: 'Model-Free RL learns from experience without building an internal simulator. Model-Based RL builds a model of the environment to plan future actions.' },
                        { q: 'When is a Policy-Based approach preferred over Value-Based?', a: 'When the action space is continuous or high-dimensional, and when the optimal policy is stochastic (like in Rock-Paper-Scissors).' },
                        { q: 'What is "Planning" in the context of Model-Based RL?', a: 'Planning is the process of using the internal environment model to simulate possible futures and pick the best action without actual physical execution.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: The Approach Sandbox"
                subtitle="Visualizing Strategy Trade-offs"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Value vs Policy Sandbox"
                    description="Compare value-based and policy-based approaches"
                    objective="Run both approaches on the same gridworld and compare convergence speed, stability, and policy quality."
                    badge="Interactive Lab"
                    tips={['Value-based methods (Q-Learning) are more sample-efficient on small discrete spaces',
                'Policy-based methods handle continuous actions better']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Use the interactive radar to understand which approach to pick for your specific problem. Move the focus to see how different parameters change for each strategist.
                    </p>
                    <ApproachComparisonChart />
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
                    const data = getTopicData('unit1', 'Topic7_ApproachesToRL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic7_ApproachesToRL');
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
                        <div className="bg-blue-600 rounded-[3rem] p-12 text-center text-white space-y-6 shadow-2xl shadow-blue-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-4xl font-black italic">Approaches Mastered!</h3>
                                <p className="text-blue-100 text-lg">
                                    You've unlocked the three core strategies of RL. Ready to dive into the specific "Types" of algorithms that implement these?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-12 py-5 bg-white text-blue-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    APPROVE TOPIC
                                </button>
                                <button className="px-12 py-5 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 transition-colors">
                                    NEED CLARITY
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

