import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    GitMerge, Target, Database, Cpu, Zap, TrendingUp, 
    Clock, Briefcase, ShieldAlert, Users2, Layout,
    ChevronRight, Info, BrainCircuit
} from 'lucide-react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, Legend
} from 'recharts';

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

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Mathematical Formalization" 
                subtitle="Equations for Every Strategist"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="Q(s, a) \approx \mathbb{E}[G_t | S_t=s, A_t=a]"
                                label="Value-Based (Q-Learning)"
                                explanation="We try to learn the Quality (Q) of taking action 'a' in state 's'."
                            />
                            <MathBlock 
                                formula="\pi(a|s, \theta) = \mathbb{P}[A_t=a | S_t=s, \theta]"
                                label="Policy-Based (REINFORCE)"
                                explanation="We learn the probability distribution of actions directly."
                            />
                            <MathBlock 
                                formula="\mathcal{P}(s', r | s, a) = \text{Model}(s, a)"
                                label="Model-Based (Dyna-Q)"
                                explanation="We learn a simulator that predicts the environment's response."
                            />
                        </div>
                        <ApproachComparisonChart />
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: '\theta', meaning: 'Parameters of the policy (usually neural network weights).' },
                            { symbol: 'Q(s, a)', meaning: 'Action-value function; estimated future reward.' },
                            { symbol: '\pi', meaning: 'Policy function — the strategy itself.' },
                            { symbol: '\mathcal{P}', meaning: 'Transition model — the simulator.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Strategy Swap" 
                subtitle="Thinking like a General"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="NEP 2020"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    {/* Level 1: Teacher Do */}
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Teacher Demo: The Grid Master</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Teacher draws a grid on the board. For <strong>Value-Based</strong>, teacher writes numbers in every cell. For <strong>Policy-Based</strong>, teacher draws arrows in every cell. For <strong>Model-Based</strong>, teacher closes the board and tries to describe the grid from memory.
                        </p>
                    </div>

                    {/* Level 2: Teacher + Student */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Collaborative Sort</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Let's classify these real-world AI behaviors:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { task: 'GPS calculating route', type: 'Model-Based' },
                                { task: 'Pro-player muscle memory', type: 'Policy-Based' },
                                { task: 'Evaluating stock prices', type: 'Value-Based' }
                            ].map(item => (
                                <div key={item.task} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 text-center">
                                    <div className="text-xs font-bold text-primary-600">{item.type}</div>
                                    <div className="text-[10px] text-slate-500">{item.task}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Pendulum Battle" 
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

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Examination Focus" 
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
                title="6. Virtual Lab: The Approach Sandbox" 
                subtitle="Visualizing Strategy Trade-offs"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Use the interactive radar to understand which approach to pick for your specific problem. Move the focus to see how different parameters change for each strategist.
                    </p>
                    <ApproachComparisonChart />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
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
}

