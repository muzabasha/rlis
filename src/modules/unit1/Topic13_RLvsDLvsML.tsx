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
    Layers,
    Cpu,
    Brain,
    Zap,
    Target,
    TrendingUp,
    Clock,
    Briefcase,
    Users2,
    Layout,
    Network,
    Database,
    Share2,
    Compass,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { LossCurveVis } from '../../components/visualizers';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "R Lvs D Lvs M L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "R Lvs D Lvs M L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the R Lvs D Lvs M L simulator.",
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
    "🤖 [System] Initializing R Lvs D Lvs M L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"R Lvs D Lvs M L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 13 ─────────────────────────────────────

/**
 * Interactive Comparison Radar Chart
 */
function AIComparisonRadar() {
    const data = [
        { subject: 'Data Need', ML: 70, DL: 95, RL: 80, fullMark: 100 },
        { subject: 'Exploration', ML: 10, DL: 20, RL: 95, fullMark: 100 },
        { subject: 'Compute', ML: 40, DL: 90, RL: 85, fullMark: 100 },
        { subject: 'Feedback', ML: 90, DL: 90, RL: 40, fullMark: 100 },
        { subject: 'Autonomy', ML: 30, DL: 50, RL: 95, fullMark: 100 },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <TrendingUp size={18} className="text-primary-500" />
                    AI Capability Profile
                </h4>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500"><div className="w-2 h-2 bg-blue-500 rounded-full" /> ML</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> DL</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500"><div className="w-2 h-2 bg-amber-500 rounded-full" /> RL</span>
                </div>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                        <Radar name="ML" dataKey="ML" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        <Radar name="DL" dataKey="DL" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                        <Radar name="RL" dataKey="RL" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                <p className="text-[10px] text-slate-500 leading-relaxed text-center">
                    Note: **RL** is the king of **Exploration** and **Autonomy**, while **DL** dominates in high **Data Need** and **Compute**.
                </p>
            </div>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic13_RLvsDLvsML() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic13_rlvsdlvsml" />
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
                        const data = getTopicData('unit1', 'Topic13_RLvsDLvsML');
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
                title="1. The AI Family Tree"
                subtitle="Siblings with Different Strengths"
                icon={<Layers className="text-blue-600" size={24} />}
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
                                "Machine Learning is the family. Deep Learning is the trendy cousin. RL is the wild child doing parkour in the backyard."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <Share2 size={200} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌳 The AI Genealogy
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Think of **Machine Learning (ML)** as the parent. It includes everything that learns from data.
                            </p>
                            <p>
                                **Deep Learning (DL)** is the specialized child that uses "Deep Neural Networks" to see patterns in massive data.
                            </p>
                            <p>
                                **Reinforcement Learning (RL)** is the adventurous child. It doesn't want to be shown examples; it wants to explore the world and learn from its own mistakes.
                            </p>
                            <p>
                                <strong>The Fusion:</strong> When RL uses DL to "see" and "think," we get **Deep RL**—the tech behind AlphaGo and ChatGPT.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Data Divide">
                            SL needs "Labeled Data" (Input + Answer). RL needs "Experience" (State + Reward).
                        </InfoCard>
                        <InfoCard type="tip" title="When to use RL?">
                            Use RL when you have a goal but don't have the "Answer Key" (Labels) for every step.
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
                                Selecting the brain architecture for a self-driving Tesla. Does it need a neural network to see (DL), a regressor to predict speed (ML), or a decision loop to steer (RL)?
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
                            Synthesizes how RL merges with ML and Deep Learning (Deep RL) to conquer complex sensory-motor tasks.
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
                                    Harnesses the raw perceptual power of deep networks alongside the decision capability of RL.
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
                                    Combining them creates an extremely black-box system that is incredibly difficult to explain or formally verify.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. Loss Functions Compared"
                subtitle="The Math of Learning"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\mathcal{L}_{\text{SL}}(\theta) = \frac{1}{N}\sum_{i=1}^{N}\bigl(y_i - f_\theta(x_i)\bigr)^2"
                        label="Supervised Learning Loss — Mean Squared Error"
                        accent="blue"
                        explanation="SL minimises the average squared difference between predictions f_θ(x_i) and true labels y_i over N training examples. Gradient descent updates θ to reduce this loss."
                        interpretation="This is the 'answer key' loss. Every training example has a known correct answer y_i. The model just needs to learn to reproduce those answers. The loss is always well-defined because y_i is always available. This is fundamentally different from RL where no 'correct answer' exists — only a reward signal."
                        motivation="Understanding SL's loss function clarifies why RL is harder: in SL, the gradient ∂L/∂θ is computed from fixed labels. In RL, the 'target' itself changes as the agent learns — creating a moving target problem that makes RL training unstable."
                        terms={[
                            { term: '\\mathcal{L}_{\\text{SL}}(\\theta)', name: 'SL Loss', meaning: 'Scalar measure of how wrong the model\'s predictions are. Minimised by gradient descent.', range: '\\mathbb{R}^+', example: 'L=0.05 means predictions are on average 0.22 units away from true labels.' },
                            { term: 'y_i', name: 'True Label', meaning: 'The correct output for training example i, provided by a human annotator. The "answer key" that RL does NOT have.', range: '\\mathcal{Y}', example: 'y_i = "cat" (class 0) or y_i = ₹450 (house price).' },
                            { term: 'f_\\theta(x_i)', name: 'Model Prediction', meaning: 'The model\'s output for input x_i, parameterised by θ (neural network weights).', range: '\\mathcal{Y}', example: 'f_θ(cat_image) = 0.92 (92% confidence it\'s a cat).' },
                            { term: 'N', name: 'Dataset Size', meaning: 'Number of labeled training examples. SL needs large N; RL generates its own data through interaction.', range: '\\mathbb{Z}^+', example: 'ImageNet: N=1.2 million labeled images.' },
                        ]}
                        numericalExample={{
                            setup: 'Regression: predict house price. 3 examples: true=[200, 350, 500], predicted=[210, 340, 480] (in ₹k).',
                            steps: [
                                'Errors: (200−210)²=100, (350−340)²=100, (500−480)²=400',
                                'MSE = (100+100+400)/3 = 200',
                                'RMSE = √200 = ₹14.1k average error',
                                'Gradient descent reduces MSE by adjusting θ.',
                            ],
                            result: 'MSE=200 (₹k²). Model is off by ~₹14k on average. Gradient descent will update θ to reduce this.',
                        }}
                    />

                    <LossCurveVis type="mse" />

                    <MathBlock
                        formula="\mathcal{L}_{\text{DQN}}(\theta) = \mathbb{E}_{(s,a,r,s')\sim\mathcal{D}}\!\left[\Bigl(\underbrace{r + \gamma\max_{a'}Q(s',a';\theta^-)}_{\text{TD target}} - \underbrace{Q(s,a;\theta)}_{\text{current estimate}}\Bigr)^{\!2}\right]"
                        label="Deep Q-Network (DQN) Loss — TD Error Squared"
                        accent="violet"
                        explanation="DQN minimises the squared TD error between the current Q-value estimate and the TD target. The target network θ⁻ is a frozen copy of θ, updated periodically to stabilise training."
                        interpretation="This is the RL equivalent of SL's MSE loss. But there are two critical differences: (1) The 'label' (TD target) is not fixed — it depends on Q(s',a';θ⁻) which changes as θ updates. (2) The data (s,a,r,s') is sampled from a replay buffer 𝒟, not a fixed dataset. These differences make RL training fundamentally harder than SL."
                        motivation="DQN's loss function is the bridge between deep learning and RL. By expressing the RL objective as a differentiable loss, we can use standard backpropagation and gradient descent — the same tools used for image classification and language models."
                        terms={[
                            { term: 'Q(s,a;\\theta)', name: 'Current Q-Network', meaning: 'Neural network with parameters θ that estimates Q(s,a). Updated every step by gradient descent.', range: '\\mathbb{R}', example: 'Q((2,3),right;θ) = 5.2 — current estimate.' },
                            { term: 'Q(s\',a\';\\theta^-)', name: 'Target Q-Network', meaning: 'A frozen copy of the Q-network with parameters θ⁻, updated every C steps. Provides stable training targets.', range: '\\mathbb{R}', example: 'θ⁻ is copied from θ every 1000 steps. Prevents oscillation.' },
                            { term: '\\mathcal{D}', name: 'Replay Buffer', meaning: 'A memory bank storing past transitions (s,a,r,s\'). Random sampling from 𝒟 breaks temporal correlations and stabilises training.', range: '\\text{Set of }(s,a,r,s\')', example: '𝒟 stores last 100,000 transitions. Each update samples a mini-batch of 32.' },
                            { term: 'r + \\gamma\\max_{a\'}Q(s\',a\';\\theta^-)', name: 'TD Target', meaning: 'The "label" for DQN training. Unlike SL labels, this target changes as θ⁻ is updated — the moving target problem.', range: '\\mathbb{R}', example: 'r=−0.1, γ=0.9, max Q(s\',·;θ⁻)=7.5 → target = −0.1+6.75 = 6.65.' },
                        ]}
                        numericalExample={{
                            setup: 'DQN update. Transition: s=(2,3), a=right, r=−0.1, s\'=(2,4). Q(s,a;θ)=5.2. max Q(s\',·;θ⁻)=7.5. γ=0.9. α=0.001.',
                            steps: [
                                'TD target = r + γ·max Q(s\',·;θ⁻) = −0.1 + 0.9×7.5 = 6.65',
                                'TD error  = target − Q(s,a;θ) = 6.65 − 5.2 = 1.45',
                                'Loss = (1.45)² = 2.1025',
                                'Gradient: ∂L/∂θ computed by backprop through Q-network',
                                'θ ← θ − α·∂L/∂θ  (gradient descent step)',
                            ],
                            result: 'Q(s,a;θ) moves from 5.2 toward 6.65. After many updates, Q converges to Q*(s,a).',
                        }}
                    />

                    <LossCurveVis type="dqn" label="DQN Loss Function" accent="red" />

                    <div className="grid lg:grid-cols-2 gap-6">
                        <AIComparisonRadar />
                        <div className="space-y-3">
                            <h5 className="font-bold text-slate-800 dark:text-white text-sm">Key Mathematical Differences</h5>
                            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                                <table className="w-full text-xs">
                                    <thead><tr className="bg-slate-100 dark:bg-slate-800">
                                        {['Property', 'ML/DL', 'RL'].map(h => <th key={h} className="text-left p-2 font-semibold text-slate-600 dark:text-slate-300">{h}</th>)}
                                    </tr></thead>
                                    <tbody>
                                        {[
                                            ['Objective', 'Min loss L(θ)', 'Max E[G_t]'],
                                            ['Training data', 'Fixed dataset 𝒟', 'Self-generated τ'],
                                            ['Labels', 'Fixed y_i', 'Moving target r+γQ'],
                                            ['Feedback', 'Instructive (correct answer)', 'Evaluative (reward)'],
                                            ['Convergence', 'Guaranteed (convex)', 'Not guaranteed'],
                                        ].map((row, i) => (
                                            <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                                                {row.map((cell, j) => <td key={j} className={`p-2 ${j === 0 ? 'font-semibold text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>{cell}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="R Lvs D Lvs M L Architecture"
                description="Where RL fits in the broader AI landscape."
                chart={`graph TD
    AI[Artificial Intelligence] --> ML[Machine Learning]
    ML --> DL[Deep Learning]
    ML --> RL[Reinforcement Learning]
    DL -.-> |Combined| DRL[Deep Reinforcement Learning]
    RL -.-> |Combined| DRL`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="The AI Taxonomy in Action"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Capability Profile Demo",
                            objectives: "Demonstrate the trade-offs between Data, Exploration, and Autonomy across AI paradigms.",
                            instructions: [
                                "Open the 'AI Capability Profile' radar chart in the Virtual Lab section.",
                                "Point out the 'Exploration' axis: Show why RL is 95% while ML is 10%.",
                                "Show the 'Data Need' axis: Explain why DL is 95% (it needs millions of images) while RL generates its own data.",
                                "Discuss why 'Autonomy' is the primary differentiator for Reinforcement Learning."
                            ],
                            inputs: "Interactive AIComparisonRadar component",
                            outputs: "Visual radar overlay comparing ML, DL, and RL profiles.",
                            rubrics: ["Clarity of trade-off explanation", "Explanation of 'Exploration' gap", "Student engagement"],
                            outcomes: "Students observe the structural strengths and weaknesses of each AI sibling.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Loss Logic Workshop",
                            objectives: "Collaboratively compare the 'Feedback' mathematics of SL and RL.",
                            instructions: [
                                "Teacher presents two formulas: MSE (SL) and TD Error (RL).",
                                "Scenario: A model predicts a value of 100. In SL, the label is 120. In RL, the reward is +5 and the next state value is 90.",
                                "Guided Calculation: SL Loss = (120 - 100)² = 400. RL Loss = (5 + 0.9*90 - 100)² = (86 - 100)² = 196.",
                                "Discussion: 'Which loss feels more stable?' (Answer: SL, because 120 is a fixed constant, whereas 90 is an estimate that also changes)."
                            ],
                            inputs: "Loss formulas and simulated data points",
                            outputs: "Comparative error calculation on the board",
                            rubrics: ["Mathematical accuracy", "Logic of 'Fixed' vs 'Moving' targets", "Classroom participation"],
                            outcomes: "Students master the mathematical distinction between instructive (SL) and evaluative (RL) feedback.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The AI Selection Matrix",
                            objectives: "Experience the decision-making process of an AI Architect choosing the right tool for the job.",
                            instructions: [
                                "Divide class into 4 teams. Each team gets a mission: 1. Predict Stock Prices, 2. Detect Facial Emotions, 3. Master a New Video Game, 4. Organize a Library's Unlabeled Books.",
                                "Teams must choose: ML, DL, or RL (or a hybrid).",
                                "They must justify based on: 'Do we have a label?', 'Do we need to explore?', 'Is it a sequence of decisions?'",
                                "Teams present their 'Architectural Blueprint' to the class."
                            ],
                            inputs: "4 distinct real-world AI problems",
                            outputs: "Justification posters (Problem -> Technique -> Reason)",
                            rubrics: ["Correct technique selection", "Strength of justification", "Team coordination"],
                            outcomes: "Students develop the intuition for when to deploy RL vs traditional deep learning.",
                            time: "20 Mins",
                            materials: ["Poster sheets", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Personal Learning Taxonomy",
                            objectives: "Independently map human learning patterns to the ML/DL/RL framework.",
                            instructions: [
                                "Task: Think of 3 things you learned this semester.",
                                "1. Something you learned by reading/watching (SL style - copying labels).",
                                "2. Something you learned by pure trial and error (RL style - exploring rewards).",
                                "3. Something you learned by finding patterns in raw data (Unsupervised style - clustering).",
                                "Write a 4-sentence reflection: Which style felt most 'Deep' and which felt most 'Rewarding'?"
                            ],
                            inputs: "Personal academic history",
                            outputs: "Individual 'Cognitive AI' Mapping Note",
                            rubrics: ["Accurate use of AI paradigm terms", "Depth of self-analysis", "Originality"],
                            outcomes: "Students internalize the AI family tree by relating it to their own biological intelligence.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: The Hybrid Architect"
                subtitle="Combining DL with RL"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Cpu size={18} /> Building an RL-enabled Camera</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Project: Design a camera system that uses <strong>Deep Learning</strong> (CNNs) to detect faces and <strong>Reinforcement Learning</strong> to decide how to rotate the gimbal to keep the person perfectly framed.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">The DL Brain</h6>
                            <p className="text-[10px] text-slate-500">Extracts features (Eyes, Nose) from the pixels.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">The RL Muscle</h6>
                            <p className="text-[10px] text-slate-500">Learns the best motor torque for smooth tracking.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Comparison Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the key difference between RL and ML?', a: 'ML learns patterns from a fixed dataset, while RL learns from interaction with an environment through a reward signal.' },
                        { q: 'Can RL exist without Deep Learning?', a: 'Yes! Basic RL (like Q-learning) uses tables. Deep RL only happens when we use neural networks to handle complex state spaces.' },
                        { q: 'Why is RL more autonomous than SL?', a: 'Because SL requires a human to label every example, whereas RL discovers its own strategy by trying different actions.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: AI Comparison Dashboard"
                subtitle="Quantifying Technique Strengths"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="AI Paradigm Map"
                    description="Position algorithms in the AI landscape"
                    objective="Place different algorithms (SVM, CNN, DQN, PPO) on the ML/DL/RL taxonomy map and observe their relationships."
                    badge="Interactive Lab"
                    tips={['DQN is where Deep Learning meets RL',
                'Not all RL uses deep learning — tabular Q-Learning is pure RL']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Use the Radar Chart to compare the core characteristics of ML, DL, and RL. Notice how RL excels in autonomy and exploration.
                    </p>
                    <AIComparisonRadar />
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
                    const data = getTopicData('unit1', 'Topic13_RLvsDLvsML');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic13_RLvsDLvsML');
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
                        <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Unit 1: Completed!</h3>
                                <p className="text-primary-100">
                                    You've mastered the fundamentals of RL and Intelligent Systems. Ready to dive into the mathematical heart of RL?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    START UNIT 2: MDP
                                </button>
                                <button className="px-10 py-4 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                                    REVIEW UNIT 1
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

