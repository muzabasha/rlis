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
import { SLvsRLVis, RLTrajectoryVis } from '../../components/visualizers';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    ArrowRightLeft,
    Target,
    Zap,
    TrendingUp,
    Clock,
    Briefcase,
    Users2,
    Layout,
    Database,
    Network,
    Share2,
    Compass,
    CheckCircle2,
    XCircle,
    Layers,
    AlertTriangle
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "R Lvs S Lvs U L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "R Lvs S Lvs U L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the R Lvs S Lvs U L simulator.",
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
    "🤖 [System] Initializing R Lvs S Lvs U L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"R Lvs S Lvs U L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 3 ──────────────────────────────────────

/**
 * Interactive Paradigm Switcher Lab
 */
function ParadigmSwitcherLab() {
    const [paradigm, setParadigm] = useState<'SL' | 'UL' | 'RL'>('SL');

    const data = [
        { name: 'Labels', SL: 100, UL: 0, RL: 20 },
        { name: 'Autonomy', SL: 20, UL: 80, RL: 100 },
        { name: 'Feedback', SL: 90, UL: 10, RL: 100 },
        { name: 'Exploration', SL: 0, UL: 30, RL: 100 },
    ];

    const paradigmInfo = {
        SL: {
            title: 'Supervised Learning',
            icon: <Database className="text-blue-500" />,
            desc: 'Learning with a teacher who gives the correct label for every input.',
            example: 'Recognizing a cat in a photo.',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        UL: {
            title: 'Unsupervised Learning',
            icon: <Share2 className="text-emerald-500" />,
            desc: 'Learning without labels by finding hidden structures in data.',
            example: 'Grouping customers by buying habits.',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50'
        },
        RL: {
            title: 'Reinforcement Learning',
            icon: <Zap className="text-amber-500" />,
            desc: 'Learning through trial and error to maximize a reward signal.',
            example: 'Teaching a robot to walk.',
            color: 'text-amber-600',
            bgColor: 'bg-amber-50'
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-1 text-center md:text-left">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center justify-center md:justify-start gap-2">
                        <ArrowRightLeft size={18} className="text-primary-500" />
                        The Paradigm Switcher
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">How learning styles change across AI branches.</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    {(['SL', 'UL', 'RL'] as const).map(p => (
                        <button
                            key={p}
                            onClick={() => setParadigm(p)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${paradigm === p ? 'bg-primary-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={paradigm}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-6 rounded-3xl border-2 border-transparent transition-all ${paradigmInfo[paradigm].bgColor}`}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                {paradigmInfo[paradigm].icon}
                            </div>
                            <h5 className={`font-black text-lg ${paradigmInfo[paradigm].color}`}>{paradigmInfo[paradigm].title}</h5>
                        </div>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                            {paradigmInfo[paradigm].desc}
                        </p>
                        <div className="p-4 bg-white/60 rounded-2xl border border-white/50">
                            <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Practical Example</span>
                            <p className="text-xs font-bold text-slate-800">{paradigmInfo[paradigm].example}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey={paradigm} radius={[10, 10, 10, 10]} animationDuration={1000}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={paradigm === 'SL' ? '#3b82f6' : paradigm === 'UL' ? '#10b981' : '#f59e0b'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic3_RLvsSLvsUL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic3_rlvsslvsul" />
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
                        const data = getTopicData('unit1', 'Topic3_RLvsSLvsUL');
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
                title="1. The Three Teachers"
                subtitle="Classifying the Learning Styles"
                icon={<ArrowRightLeft className="text-violet-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-violet-100 text-violet-700"
                accentColor="border-violet-500"
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
                                "Supervised Learning is a helicopter parent. Unsupervised is a neglectful parent. RL is giving a toddler a candy every time they do the dishes."
                            </p>
                        </div>
                    </div>
                    <div className="bg-violet-50 dark:bg-violet-900/20 p-8 rounded-[2.5rem] border border-violet-100 dark:border-violet-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Network size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-violet-900 dark:text-violet-100 mb-4 flex items-center gap-2">
                            🧑‍🏫 The AI Academy
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Think of the three main types of AI as different teaching styles in a classroom:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={18} />
                                    <span><strong>Supervised:</strong> The teacher gives you a textbook where every question has an answer. You learn to memorize and generalize those answers.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                                    <span><strong>Unsupervised:</strong> The teacher gives you a bag of mixed legos and says "Sort them". You find patterns (color, shape) yourself.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="text-amber-500 shrink-0 mt-1" size={18} />
                                    <span><strong>Reinforcement:</strong> The teacher says nothing. You try to build a tower. If it stands, you get a candy. If it falls, you don't. You learn through <strong>experience</strong>.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Feedback Type">
                            SL feedback is "Instructional" (the right answer). RL feedback is "Evaluative" (how good the action was).
                        </InfoCard>
                        <InfoCard type="tip" title="Data Requirement">
                            SL is data-hungry for labels. RL is hungry for interaction/simulation.
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
                                A dynamic stock trading bot must choose whether to buy, sell, or hold. It has no teacher to label the 'perfect trade' (SL) nor is it just clustering stocks (UL); it must maximize cumulative profit.
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
                            Helps system designers select the correct machine learning paradigm for a given problem rather than trying to fit a square peg in a round hole.
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
                                    Clarifies the distinct operational boundaries and data requirements (rewards vs. labels vs. unlabelled features) of ML.
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
                                    Can lead to over-engineering if a simple supervised classifier or unsupervised clustering algorithm could solve the problem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. Mapping the Paradigms"
                subtitle="The Data vs. The Trajectory"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\\mathcal{D}_{\\text{SL}} = \\{(x_i,\\, y_i)\\}_{i=1}^{n}, \\quad \\hat{\\theta} = \\arg\\min_{\\theta}\\frac{1}{n}\\sum_{i=1}^{n}\\mathcal{L}(f_\\theta(x_i),\\, y_i)"
                        label="Supervised Learning — Empirical Risk Minimisation"
                        accent="blue"
                        explanation="Find the model parameter \\theta that minimizes the average loss over a fixed dataset of input-label pairs."
                        interpretation="Supervised learning fits a function to pre-labeled static data by minimizing the difference (loss) between predictions and labels."
                        motivation="Highlights the main difference with RL: SL requires correct action labels upfront, while RL discovers them via trial-and-error."
                        terms={[
                            { term: '\\mathcal{D}_{\\text{SL}}', name: 'Supervised Dataset', meaning: 'The collection of n training examples of input-target pairs.', range: 'Dataset Space', example: '{(Image, Label)}' },
                            { term: 'x_i', name: 'Input Features', meaning: 'The input feature vector for the i-th training example.', range: '\\mathbb{R}^d', example: 'Image pixel values.' },
                            { term: 'y_i', name: 'Target Label', meaning: 'The true ground-truth label/output for the i-th example.', range: 'Label Space', example: 'Dog/Cat label.' },
                            { term: '\\mathcal{L}', name: 'Loss Function', meaning: 'Measures the error between model prediction and true label.', range: '[0, \\infty)', example: 'Squared Error: (y_i - f_\\theta(x_i))^2.' },
                            { term: 'f_\\theta', name: 'Model Function', meaning: 'The predictive model parameterized by \\theta.', range: 'Function Space', example: 'Deep Neural Network.' }
                        ]}
                        numericalExample={{
                            setup: 'Let model predict f_\\theta(2) = 9 for a true label y = 10, using loss function \\mathcal{L} = (y - f_\\theta(x))^2.',
                            steps: [
                                'Prediction f_\\theta(x_i) = 9',
                                'Actual Label y_i = 10',
                                'Loss = (10 - 9)^2 = 1'
                            ],
                            result: 'Loss contribution = 1'
                        }}
                    />
                    <SLvsRLVis />

                    <MathBlock
                        formula="\\tau = (s_0,\\, a_0,\\, r_1,\\, s_1,\\, a_1,\\, r_2,\\, s_2,\\, \\ldots,\\, s_T)"
                        label="RL Trajectory — Self-Generated Experience"
                        accent="violet"
                        explanation="The chronological sequence of states, actions, and rewards representing a single episode."
                        interpretation="RL operates on trajectories of highly correlated states and actions generated dynamically by the agent's policy."
                        motivation="Shows that RL data is sequential and violates the independent and identically distributed (i.i.d.) assumptions of SL."
                        terms={[
                            { term: '\\tau', name: 'Trajectory', meaning: 'The complete sequence of transitions in an episode.', range: 'Trajectories Space', example: 'Full game sequence.' },
                            { term: 's_t', name: 'State', meaning: 'The environmental state at step t.', range: 'State Space \\mathcal{S}', example: 'Grid cell A.' },
                            { term: 'a_t', name: 'Action', meaning: 'Action chosen by the agent at step t.', range: 'Action Space \\mathcal{A}', example: 'Move right.' },
                            { term: 'r_{t+1}', name: 'Reward', meaning: 'Reward received after taking action a_t.', range: '\\mathbb{R}', example: '+10 reward.' }
                        ]}
                        numericalExample={{
                            setup: 'A robot navigates a maze starting at cell A, moves right to B, and moves up to C.',
                            steps: [
                                'Start state s_0 = A',
                                'Take action a_0 = right, get reward r_1 = 0, transition to s_1 = B',
                                'Take action a_1 = up, get reward r_2 = 10, transition to s_2 = C'
                            ],
                            result: '\\tau = (A, right, 0, B, up, 10, C)'
                        }}
                    />
                    <RLTrajectoryVis />

                    
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="R Lvs S Lvs U L Architecture"
                description="Comparing the three main paradigms of Machine Learning."
                chart={`graph TD
    A[Machine Learning] --> SL[Supervised]
    A --> UL[Unsupervised]
    A --> RL[Reinforcement]
    SL --> |Labels provided| SL_Out[Predict/Classify]
    UL --> |No labels| UL_Out[Cluster/Structure]
    RL --> |Delayed Rewards| RL_Out[Optimal Policy]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Classifying Intelligence"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Paradigm Switcher Demo",
                            objectives: "Visually demonstrate the trade-offs between Label Dependency, Autonomy, and Exploration across AI branches.",
                            instructions: [
                                "Open the 'Paradigm Switcher' in the Virtual Lab section.",
                                "Select SL and show the high 'Labels' bar (Fixed dataset dependency).",
                                "Switch to UL and point out zero 'Labels' but lower 'Feedback'.",
                                "Switch to RL and highlight 100% 'Exploration' and 'Autonomy'.",
                                "Explain that RL generates its own data through interaction."
                            ],
                            inputs: "Interactive Bar Chart Lab",
                            outputs: "Visual comparison of 4 metrics (Labels, Autonomy, Feedback, Exploration).",
                            rubrics: ["Clarity of metric explanation", "Transition logic", "Student engagement"],
                            outcomes: "Students identify that RL is the most autonomous and exploratory branch of AI.",
                            time: "10 Mins",
                            materials: ["Interactive Lab Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Label vs Reward Workshop",
                            objectives: "Collaboratively analyze if a task needs an 'Answer Key' (SL) or a 'Scoreboard' (RL).",
                            instructions: [
                                "Teacher lists 5 tasks: 'Detecting Fraud', 'Winning Poker', 'Translating French', 'Flying a Fighter Jet', 'Clustering News'.",
                                "For each task, ask: 'Do we have a teacher who knows the exact right move?'",
                                "Guided Discussion: If YES, it's SL. If NO (only 'Better' or 'Worse'), it's RL.",
                                "Students mark the tasks on a spectrum on the board."
                            ],
                            inputs: "List of real-world AI tasks",
                            outputs: "Categorized Task Spectrum on the board",
                            rubrics: ["Conceptual accuracy", "Reasoning depth", "Team participation"],
                            outcomes: "Students master the criteria for selecting the appropriate learning paradigm.",
                            time: "15 Mins",
                            materials: ["Board", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Medical Diagnosis Debate",
                            objectives: "Analyze the ethical and practical implications of SL vs RL in safety-critical domains.",
                            instructions: [
                                "Divide class into two groups: 'The SL Doctors' and 'The RL Researchers'.",
                                "Topic: Using AI for Cancer Diagnosis.",
                                "SL Group argues for 'Imitating Human Experts' (Safety through labels).",
                                "RL Group argues for 'Optimizing Long-term Patient Outcome' (Discovery of new treatments).",
                                "Groups present: Why is RL 'dangerous' but potentially 'superior'?"
                            ],
                            inputs: "Case study on AI in medicine",
                            outputs: "Brief position statements from both groups",
                            rubrics: ["Understanding of loss vs return", "Safety awareness", "Persuasive logic"],
                            outcomes: "Students realize that SL mimics existing knowledge while RL searches for optimal (possibly superhuman) strategies.",
                            time: "20 Mins",
                            materials: ["Debate Prompt Sheet"]
                        },
                        {
                            level: 4,
                            title: "Hybrid System Architect",
                            objectives: "Independently design a multi-paradigm system for a complex real-world application.",
                            instructions: [
                                "Task: Design a 'Smart YouTube' system.",
                                "Step 1: Use SL for what? (e.g., Categorizing video content/thumbnails).",
                                "Step 2: Use RL for what? (e.g., Maximizing 'Watch Time' through recommendations).",
                                "Step 3: Draw a simple block diagram showing how the SL output feeds into the RL agent.",
                                "Self-Check: Does the RL part have a reward? (Yes, watch time)."
                            ],
                            inputs: "Knowledge of content platforms",
                            outputs: "Hybrid Architecture Diagram + Description",
                            rubrics: ["Correct use of SL vs RL", "Logical flow", "System complexity"],
                            outcomes: "Students internalize that modern AI (like ChatGPT or YouTube) is a hybrid of multiple paradigms.",
                            time: "15 Mins",
                            materials: ["A4 Paper/Tablets"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: RLHF in Chatbots"
                subtitle="Bridging the Gap"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Network size={18} /> The ChatGPT Hybrid</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            ChatGPT doesn't just use one style. It uses <strong>Supervised Learning</strong> to learn how to talk and <strong>Reinforcement Learning from Human Feedback (RLHF)</strong> to learn how to be helpful and safe.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Database size={20} className="mx-auto mb-2 text-blue-500" />
                            <div className="text-[10px] font-bold">STAGE 1: SL</div>
                            <p className="text-[8px] text-slate-500 mt-1">Predict the next word.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Users2 size={20} className="mx-auto mb-2 text-purple-500" />
                            <div className="text-[10px] font-bold">STAGE 2: HUMANS</div>
                            <p className="text-[8px] text-slate-500 mt-1">Rank the responses.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Zap size={20} className="mx-auto mb-2 text-amber-500" />
                            <div className="text-[10px] font-bold">STAGE 3: RL</div>
                            <p className="text-[8px] text-slate-500 mt-1">Maximize reward scores.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Conceptual Comparisons"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Distinguish between Supervised and Reinforcement Learning.', a: 'Supervised Learning uses explicit labels (Instructional), while RL uses a scalar reward signal (Evaluative).' },
                        { q: 'What is the goal of Unsupervised Learning?', a: 'To discover hidden patterns or groupings in unlabeled data without any external reward or guidance.' },
                        { q: 'Why is RL considered "Learning through Trial and Error"?', a: 'Because the agent must take actions to discover which ones yield the highest rewards, often failing before succeeding.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Paradigm Switcher"
                subtitle="Compare AI Capabilities"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Paradigm Comparator"
                    description="Compare the three ML paradigms live"
                    objective="Run the same dataset through SL, UL, and RL frameworks. Observe the different outputs each produces."
                    badge="Interactive Lab"
                    tips={['Supervised Learning needs labelled data — notice the accuracy increase with more labels',
                'RL only uses reward signals, no labels at all']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between the three paradigms to see how they differ in their reliance on labels, their autonomy, and their ability to explore new solutions.
                    </p>
                    <ParadigmSwitcherLab />
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
                    const data = getTopicData('unit1', 'Topic3_RLvsSLvsUL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic3_RLvsSLvsUL');
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
                        <div className="bg-violet-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-violet-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Paradigms: Mastered!</h3>
                                <p className="text-violet-100">
                                    You can now distinguish between the three pillars of AI. Next, let's explore the fundamental building blocks (Elements) of RL.
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-violet-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: ELEMENTS OF RL
                                </button>
                                <button className="px-10 py-4 bg-violet-700 text-white font-black rounded-2xl hover:bg-violet-800 transition-colors">
                                    REVIEW COMPARISON
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

