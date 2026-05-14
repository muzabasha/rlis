import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
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
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="\mathcal{D} = \{(x_i, y_i)\}_{i=1}^n"
                                label="Supervised Dataset"
                                explanation="A fixed set of input-output pairs. Static and pre-labeled."
                            />
                            <MathBlock 
                                formula="\tau = (s_0, a_0, r_1, s_1, a_1, r_2, \dots)"
                                label="RL Trajectory"
                                explanation="A sequence of states, actions, and rewards. Dynamic and self-generated."
                            />
                        </div>
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex items-center justify-center">
                            <div className="space-y-6 w-full">
                                <h5 className="font-bold text-primary-400 flex items-center gap-2 text-sm"><Layers size={16} /> Objective Contrast</h5>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span>SL: Min Error</span>
                                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-blue-500" /></div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>UL: Max Similarity</span>
                                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="w-[70%] h-full bg-emerald-500" /></div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>RL: Max Reward</span>
                                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="w-[95%] h-full bg-amber-500" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: 'x_i', meaning: 'The input feature vector (e.g., pixel data).' },
                            { symbol: 'y_i', meaning: 'The target label (e.g., "Dog" or 1.0).' },
                            { symbol: '\tau', meaning: 'Trajectory—the path taken by an RL agent.' },
                            { symbol: 's, a, r', meaning: 'State, Action, and Reward respectively.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Paradigm Matcher" 
                subtitle="NEP 2020 Real-World Sorting"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    {/* Level 1 */}
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Teacher Demo: Sorting the Zoo</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Teacher shows 10 photos of animals. Class sorts them. Then, teacher asks: "If I want a robot to walk through this zoo without hitting the cages, which paradigm do we use?" (Answer: RL).
                        </p>
                    </div>

                    {/* Level 2 */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Interactive: Task Categorization</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { task: 'Filtering Spam Emails', type: 'Supervised' },
                                { task: 'AlphaGo winning Go', type: 'Reinforcement' },
                                { task: 'Grouping news by topic', type: 'Unsupervised' },
                                { task: 'Self-driving Lane Keeping', type: 'Reinforcement' }
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-600">{item.task}</span>
                                    <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase ${item.type === 'Supervised' ? 'bg-blue-100 text-blue-700' : item.type === 'Unsupervised' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {item.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
                        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-purple-500 transition-colors">
                            <div className="font-bold text-slate-800 dark:text-white mb-2 text-sm italic">Q: {item.q}</div>
                            <div className="text-xs text-slate-500 border-l-2 border-slate-100 dark:border-slate-700 pl-4">{item.a}</div>
                        </div>
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
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between the three paradigms to see how they differ in their reliance on labels, their autonomy, and their ability to explore new solutions.
                    </p>
                    <ParadigmSwitcherLab />
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

