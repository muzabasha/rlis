import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    Layers, Cpu, Brain, Zap, Target, TrendingUp,
    Clock, Briefcase, Users2, Layout,
    Network, Database, Share2, Compass
} from 'lucide-react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

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

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Loss Functions Compared" 
                subtitle="The Math of Learning"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="L_{SL} = \frac{1}{N} \sum_{i=1}^N (y_i - f(x_i))^2"
                                label="Supervised Loss (MSE)"
                                explanation="We minimize the distance between the prediction and the known correct label."
                            />
                            <MathBlock 
                                formula="L_{RL} = \mathbb{E} [(R + \gamma \max Q' - Q)^2]"
                                label="Reinforcement Loss (TD)"
                                explanation="We minimize the difference between our 'Estimate' and the 'Actual Experience' (TD Error)."
                            />
                        </div>
                        <AIComparisonRadar />
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: 'y_i', meaning: 'The Ground Truth Label (the answer key).' },
                            { symbol: 'f(x_i)', meaning: 'The model prediction in ML/DL.' },
                            { symbol: 'Q', meaning: 'The estimate of the total reward we expect to get.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: The AI Task Sorter" 
                subtitle="NEP 2020 Hands-on Taxonomy"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Teacher Demo: The Learning Styles</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Teacher shows an image of a dog. "In DL, I tell you it's a dog. In RL, you guess 'Cat', I give you a shock, you guess 'Dog', I give you a biscuit. Which one is better for a robot walking in a new forest?"
                        </p>
                    </div>

                    {/* Level 2 */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">The Selection Matrix</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 flex justify-between items-center">
                                <span className="text-xs font-bold">Email Spam Filter</span>
                                <span className="text-[10px] px-2 py-1 bg-blue-100 text-blue-700 rounded-md">ML (Supervised)</span>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 flex justify-between items-center">
                                <span className="text-xs font-bold">Self-Driving Lane Change</span>
                                <span className="text-[10px] px-2 py-1 bg-amber-100 text-amber-700 rounded-md">Reinforcement</span>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Hybrid Architect" 
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

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
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
                title="6. Virtual Lab: AI Comparison Dashboard" 
                subtitle="Quantifying Technique Strengths"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Use the Radar Chart to compare the core characteristics of ML, DL, and RL. Notice how RL excels in autonomy and exploration.
                    </p>
                    <AIComparisonRadar />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
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
}

