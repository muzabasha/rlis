import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    TrendingUp, ShieldCheck, Zap, Target, Brain, 
    Clock, Briefcase, ShieldAlert, Users2, Layout,
    CheckCircle2, AlertCircle, Rocket, Gauge, Sparkles
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Cell, Legend
} from 'recharts';

// ─── Interactive Components for Topic 10 ─────────────────────────────────────

/**
 * Interactive Benefit Comparison Chart
 */
function BenefitComparisonChart() {
    const data = [
        { name: 'Adaptability', RL: 95, Classical: 40 },
        { name: 'Complexity', RL: 90, Classical: 30 },
        { name: 'Discovery', RL: 85, Classical: 10 },
        { name: 'Robustness', RL: 80, Classical: 60 },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <TrendingUp size={18} className="text-primary-500" />
                    RL vs Classical Control
                </h4>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary-500"><div className="w-2 h-2 bg-primary-500 rounded-full" /> RL</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 bg-slate-400 rounded-full" /> Classical</span>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="RL" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Classical" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                    <span className="text-[10px] font-bold text-blue-600 block mb-1">RL Power</span>
                    <p className="text-[10px] text-slate-500 leading-tight">Can discover strategies humans haven't thought of.</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/20 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">Classical Limit</span>
                    <p className="text-[10px] text-slate-500 leading-tight">Limited by the mathematical model provided by the engineer.</p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic10_AdvantagesOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Self-Tuning Thermostat" 
                subtitle="The Advantage of Autonomy"
                icon={<Sparkles className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Gauge size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌡️ The Smart Building Mystery
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a massive server room. Traditional engineers use a fixed rule: "If temperature &gt; 22°C, turn on AC."
                            </p>
                            <p>
                                But a Reinforcement Learning agent discovers something else. It learns that if it cools the room <em>pre-emptively</em> at 2 AM when electricity is cheap, it can save 40% on bills while keeping the servers safe.
                            </p>
                            <p>
                                <strong>The Advantage?</strong> The RL agent didn't wait for instructions. It analyzed the cost (Reward), the time (State), and found a strategy no human had scripted.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Beyond Scripting">
                            RL excels when the solution is too complex to write as a set of "If-Then" rules.
                        </InfoCard>
                        <InfoCard type="tip" title="Discovery Machine">
                            RL is a discovery engine—it finds the "How" when we only know the "What" (Goal).
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL GAIN */}
            <SectionWrapper 
                id="math" 
                title="2. The Optimization Edge" 
                subtitle="Why RL Wins the Math Battle"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="\max_{\pi} \mathbb{E} \left[ \sum_{t=0}^{\infty} \gamma^t R_t \right]"
                                label="Long-Term optimization"
                                explanation="RL doesn't just look at the next step; it maximizes the total lifetime reward."
                            />
                            <div className="card p-6 bg-slate-900 text-white space-y-4">
                                <h5 className="font-bold text-primary-400 flex items-center gap-2"><Target size={18} /> Global Optima</h5>
                                <p className="text-xs text-slate-400">
                                    Traditional controllers often get stuck in local optima. RL exploration helps find the global best solution.
                                </p>
                            </div>
                        </div>
                        <BenefitComparisonChart />
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: '\gamma^t', meaning: 'Discounted reward—valuing immediate gains vs future stability.' },
                            { symbol: '\mathbb{E}', meaning: 'Expectation—handling the uncertainty of the real world.' },
                            { symbol: '\pi', meaning: 'The learned behavior policy.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Advantage Showdown" 
                subtitle="Classifying AI Strengths"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Teacher Demo: The Unlabeled Maze</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Teacher shows a complex maze. "In Supervised Learning, I give you the path. In RL, I only give you a treat at the exit. Which one allows you to find a shortcut I didn't see?"
                        </p>
                    </div>

                    {/* Level 2 */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Interactive Scenario Sorting</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 flex justify-between items-center">
                                <span className="text-xs font-bold">AlphaGo winning against Lee Sedol</span>
                                <span className="text-[10px] px-2 py-1 bg-blue-100 text-blue-700 rounded-md">Novel Strategy</span>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 flex justify-between items-center">
                                <span className="text-xs font-bold">Robot walking on uneven sand</span>
                                <span className="text-[10px] px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md">Adaptability</span>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Green Grid" 
                subtitle="Optimizing Sustainable Energy"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Rocket size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Design an RL agent to manage a city's energy grid. It must decide when to store energy from solar panels and when to sell it to the grid to maximize profit and minimize carbon footprint.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Advantages to Highlight</h6>
                            <ul className="text-[10px] space-y-1 list-disc pl-4 text-slate-500">
                                <li>Handles fluctuating weather (Uncertainty).</li>
                                <li>Balances long-term battery life vs short-term profit.</li>
                                <li>Scales to thousands of homes.</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Success Metric</h6>
                            <div className="text-2xl font-black text-slate-800 dark:text-white">30% CO2 Reduction</div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Examination Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is RL better than rule-based systems for robotics?', a: 'Because real-world environments are too complex to script every possible situation. RL allows the robot to learn and adapt to noise and physical changes.' },
                        { q: 'Explain the "Self-Improving" nature of RL.', a: 'As the agent interacts more, its experience grows, allowing it to refine its policy and achieve better rewards over time without human intervention.' },
                        { q: 'What is the role of "Delayed Gratification" in RL?', a: 'RL agents are designed to sacrifice small immediate rewards if it leads to a much larger cumulative reward in the long run.' }
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
                title="6. Virtual Lab: The Advantage Sandbox" 
                subtitle="Quantifying RL Superiority"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Interact with the comparison chart to see how RL outperforms classical methods as the environment complexity increases.
                    </p>
                    <BenefitComparisonChart />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Advantages: Decoded!</h3>
                    <p className="text-primary-100">
                        You've seen why RL is the future of intelligent systems. Ready to see where it's being used today?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: APPLICATIONS
                    </button>
                    <button className="px-10 py-4 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                        REVIEW ADVANTAGES
                    </button>
                </div>
            </div>
        </div>
    );
}

