import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    ArrowRightLeft, Target, Zap, TrendingUp, Clock, Briefcase,
    Users2, Layout, Database, Network, Share2, Compass, CheckCircle2, XCircle, Layers
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';

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

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="2. Mapping the Paradigms"
                subtitle="The Data vs. The Trajectory"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\mathcal{D}_{\text{SL}} = \{(x_i,\, y_i)\}_{i=1}^{n}, \quad \hat{\theta} = \arg\min_{\theta}\frac{1}{n}\sum_{i=1}^{n}\mathcal{L}(f_\theta(x_i),\, y_i)"
                        label="Supervised Learning — Empirical Risk Minimisation"
                        accent="blue"
                        explanation="SL learns a function f_θ by minimising the average loss over n labeled examples. The dataset is fixed and provided upfront."
                        interpretation="In SL, a human expert has already labeled every training example. The algorithm's job is purely to find parameters θ that minimise prediction error. There is no exploration, no sequential decision-making, and no reward signal — just input-output pairs."
                        motivation="Understanding SL's objective helps contrast it with RL. SL minimises a loss; RL maximises a return. SL needs labels; RL needs interaction. This contrast clarifies exactly when to choose RL over SL."
                        terms={[
                            { term: '\\mathcal{D}_{\\text{SL}}', name: 'Supervised Dataset', meaning: 'A fixed collection of n labeled input-output pairs. Created by human annotation.', range: '\\{(x,y)\\}^n', example: '10,000 images each labeled "cat" or "dog".' },
                            { term: 'x_i', name: 'Input Feature Vector', meaning: 'The raw input to the model — pixels, sensor readings, text tokens, etc.', range: '\\mathbb{R}^d', example: 'A 28×28 grayscale image flattened to 784 numbers.' },
                            { term: 'y_i', name: 'Target Label', meaning: 'The correct output provided by a human annotator. This is the "answer key" that RL does NOT have.', range: '\\mathcal{Y}', example: '"cat" (class 0), "dog" (class 1), or a price like ₹450.' },
                            { term: '\\mathcal{L}', name: 'Loss Function', meaning: 'Measures how wrong the prediction f_θ(x_i) is compared to the true label y_i.', range: '\\mathbb{R}^+', example: 'MSE: (y_i − f_θ(x_i))². Cross-entropy: −y_i log f_θ(x_i).' },
                            { term: '\\hat{\\theta}', name: 'Optimal Parameters', meaning: 'The model weights that minimise average loss. Found by gradient descent.', range: '\\mathbb{R}^p', example: 'Weights of a neural network after training.' },
                        ]}
                        numericalExample={{
                            setup: 'SL regression: predict house price. 3 examples: (x₁=50m², y₁=₹20L), (x₂=80m², y₂=₹32L), (x₃=100m², y₃=₹40L). Model: f_θ(x)=θ·x.',
                            steps: [
                                'θ=0.4: predictions = [20, 32, 40]. MSE = 0. Perfect fit.',
                                'θ=0.3: predictions = [15, 24, 30]. MSE = (25+64+100)/3 = 63.',
                                'Gradient descent updates θ toward 0.4 to minimise MSE.',
                            ],
                            result: 'θ̂ = 0.4 minimises loss. No exploration needed — the answer was in the labels.',
                        }}
                    />

                    <MathBlock
                        formula="\tau = (s_0,\, a_0,\, r_1,\, s_1,\, a_1,\, r_2,\, s_2,\, \ldots,\, s_T)"
                        label="RL Trajectory — Self-Generated Experience"
                        accent="emerald"
                        explanation="An RL trajectory is a sequence of states, actions, and rewards generated by the agent interacting with the environment. Unlike SL, this data is created dynamically during learning."
                        interpretation="This is the fundamental data structure of RL. There are no pre-given labels — the agent generates its own training data by acting in the world. The quality of this data depends on the agent's current policy, which creates a chicken-and-egg problem that RL algorithms must solve."
                        motivation="Contrasting τ with 𝒟_SL makes the key difference crystal clear: SL has a fixed dataset with answers; RL has a dynamic trajectory with only reward signals. This is why RL can solve problems where no labeled data exists."
                        terms={[
                            { term: '\\tau', name: 'Trajectory', meaning: 'A complete sequence of interactions from episode start (s₀) to end (s_T). The raw experience from which the agent learns.', range: '(\\mathcal{S}\\times\\mathcal{A}\\times\\mathbb{R})^T', example: 'A full game of chess from opening to checkmate.' },
                            { term: 's_t', name: 'State at step t', meaning: 'The environment\'s configuration at time t. Observed by the agent.', range: '\\mathcal{S}', example: 's₀=(0,0), s₁=(0,1), s₂=(1,1) in a grid.' },
                            { term: 'a_t', name: 'Action at step t', meaning: 'The decision made by the agent in state s_t, according to its current policy π.', range: '\\mathcal{A}', example: 'a₀=right, a₁=down.' },
                            { term: 'r_{t+1}', name: 'Reward at step t+1', meaning: 'Scalar feedback from the environment. This is the only "supervision signal" in RL — not a label, just a score.', range: '\\mathbb{R}', example: 'r₁=−0.1 (step cost), r_T=+10 (goal reached).' },
                            { term: 'T', name: 'Episode Length', meaning: 'Number of steps until the terminal state. Can be fixed or variable.', range: '\\mathbb{Z}^+', example: 'T=200 for CartPole, T=∞ for continuing tasks.' },
                        ]}
                        numericalExample={{
                            setup: 'Grid world 3×3. Agent starts at (0,0), goal at (2,2). γ=0.9.',
                            steps: [
                                'τ = ((0,0), right, −0.1, (0,1), down, −0.1, (1,1), right, −0.1, (1,2), down, +10, (2,2))',
                                'G₀ = −0.1 + 0.9×(−0.1) + 0.81×(−0.1) + 0.729×10',
                                'G₀ = −0.1 − 0.09 − 0.081 + 7.29 = 7.019',
                            ],
                            result: 'The trajectory τ gives G₀=7.019. No labels were needed — only the +10 reward at the goal.',
                        }}
                    />

                    {/* Objective contrast panel */}
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Supervised Learning', obj: '\\min_{\\theta}\\,\\mathcal{L}(f_\\theta(x),y)', color: 'border-blue-400 bg-blue-50 dark:bg-blue-900/20', badge: 'text-blue-700 dark:text-blue-300' },
                            { label: 'Unsupervised Learning', obj: '\\min_{\\mu}\\sum_i\\|x_i-\\mu_{c(i)}\\|^2', color: 'border-violet-400 bg-violet-50 dark:bg-violet-900/20', badge: 'text-violet-700 dark:text-violet-300' },
                            { label: 'Reinforcement Learning', obj: '\\max_{\\pi}\\,\\mathbb{E}[G_t]', color: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20', badge: 'text-emerald-700 dark:text-emerald-300' },
                        ].map(p => (
                            <div key={p.label} className={`rounded-2xl border-l-4 ${p.color} p-4`}>
                                <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${p.badge}`}>{p.label}</p>
                                <div className="overflow-x-auto flex justify-center py-1">
                                    <span className="text-sm"><MathBlock formula={p.obj} accent="blue" /></span>
                                </div>
                            </div>
                        ))}
                    </div>
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


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="3. Multi-Level Activities"
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

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="4. Project: RLHF in Chatbots"
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

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="5. Quick Check"
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

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="6. Virtual Lab: Paradigm Switcher"
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
                >
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between the three paradigms to see how they differ in their reliance on labels, their autonomy, and their ability to explore new solutions.
                    </p>
                    <ParadigmSwitcherLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
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
}

