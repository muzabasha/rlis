import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    Rocket, Cpu, Briefcase, Target, Zap, TrendingUp, 
    Clock, ShieldAlert, Users2, Layout,
    Gamepad2, Stethoscope, ShoppingCart, Truck, Database
} from 'lucide-react';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// ─── Interactive Components for Topic 11 ─────────────────────────────────────

/**
 * Interactive Application Showcase
 */
function ApplicationGrid() {
    const apps = [
        { 
            id: 'games', 
            name: 'Gaming & Simulation', 
            icon: <Gamepad2 />, 
            details: 'AlphaGo, Dota 2, StarCraft II. Mastering complex strategy and real-time tactics.',
            color: 'bg-blue-500',
            reward: 'Score / Win Ratio'
        },
        { 
            id: 'finance', 
            name: 'Quantitative Finance', 
            icon: <Briefcase />, 
            details: 'Portfolio optimization, algorithmic trading, and dynamic risk management.',
            color: 'bg-emerald-500',
            reward: 'ROI / Sharpe Ratio'
        },
        { 
            id: 'healthcare', 
            name: 'Personalized Medicine', 
            icon: <Stethoscope />, 
            details: 'Dynamic treatment regimes and drug discovery simulations.',
            color: 'bg-rose-500',
            reward: 'Patient Outcome'
        },
        { 
            id: 'robotics', 
            name: 'Robotics & Control', 
            icon: <Cpu />, 
            details: 'Autonomous navigation, industrial automation, and robotic manipulation.',
            color: 'bg-amber-500',
            reward: 'Efficiency / Safety'
        },
        { 
            id: 'ecommerce', 
            name: 'Recommendation Systems', 
            icon: <ShoppingCart />, 
            details: 'Netflix, Amazon, YouTube. Optimizing for long-term user engagement.',
            color: 'bg-indigo-500',
            reward: 'CTR / Watch Time'
        },
        { 
            id: 'logistics', 
            name: 'Supply Chain', 
            icon: <Truck />, 
            details: 'Inventory management and route optimization in dynamic environments.',
            color: 'bg-purple-500',
            reward: 'Cost Reduction'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
                <motion.div
                    key={app.id}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group"
                >
                    <div className={`w-12 h-12 rounded-2xl ${app.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        {app.icon}
                    </div>
                    <h5 className="font-bold text-slate-800 dark:text-white mb-2">{app.name}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{app.details}</p>
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-700">
                        <Target size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reward: {app.reward}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic11_ApplicationsOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The AlphaGo Revolution" 
                subtitle="From Games to Real World"
                icon={<Rocket className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <Gamepad2 size={200} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            ♟️ The Move 37
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In 2016, DeepMind's AlphaGo played against Lee Sedol, one of the world's best Go players. In Game 2, AlphaGo made a move (Move 37) that every human commentator thought was a mistake.
                            </p>
                            <p>
                                It was a move no human had ever played in thousands of years of Go history. But AlphaGo had learned from <em>itself</em> through millions of simulations. That "mistake" turned out to be the winning strategy.
                            </p>
                            <p>
                                <strong>The Insight:</strong> Reinforcement Learning doesn't just copy humans; it discovers new, superior ways of solving problems that we might not even recognize as "correct" at first.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Beyond Human Logic">
                            RL is being used in Data Centers (like Google's) to optimize cooling, saving millions in electricity bills by finding patterns humans missed.
                        </InfoCard>
                        <InfoCard type="warning" title="The Reality Check">
                            Most RL success stories are in games because we have perfect simulators. Moving to the "messy" real world is the current frontier.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Mapping the World to MDPs" 
                subtitle="The Formalization of Domains"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                        <h5 className="text-primary-400 font-bold mb-6 flex items-center gap-2"><Database size={18} /> The Universal Template</h5>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Application</div>
                                <div className="font-bold text-lg">Stock Trading</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">State (S)</div>
                                <div className="text-sm font-mono text-emerald-400">{'[Price, Volume, Portfolio]'}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reward (R)</div>
                                <div className="text-sm font-mono text-blue-400">Profit / Risk-Ratio</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        <MathBlock 
                            formula="\text{CTR}(t) = \frac{\sum \text{Clicks}}{\sum \text{Impressions}}"
                            label="Recommendation Success"
                            explanation="The Reward Signal for Netflix/Amazon is usually a proxy for user satisfaction like CTR or Watch-Time."
                        />
                        <MathBlock 
                            formula="\text{Efficiency} = \frac{\text{Task Complete}}{\text{Energy Consumed}}"
                            label="Robotic Optimization"
                            explanation="Industrial robots optimize for high throughput with minimal mechanical wear and energy."
                        />
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: The Industry Consultant" 
                subtitle="Designing RL Solutions"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Teacher Demo: RL in your Phone</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Teacher explains how Spotify "Discover Weekly" uses RL. "If I skip a song, what is the reward? (-1). If I add to a playlist? (+10). If I listen to the end? (+1). How does the agent learn my taste?"
                        </p>
                    </div>

                    {/* Level 2 */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Brainstorm: RL for Campus</h4>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Problem: The Canteen Queue is too long.</p>
                            <p className="text-[10px] text-slate-500">Task: Define the Agent, State, and Reward for an RL-based queue management system.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The RL Chatbot" 
                subtitle="Reinforcement Learning from Human Feedback"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Zap size={18} /> The LLM Connection (RLHF)</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Modern AI like ChatGPT isn't just trained on text. It uses <strong>RLHF</strong>. Humans rank different responses, and an RL agent learns to reward the model for producing "helpful and safe" text.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Phase 1: Ranking</h6>
                            <p className="text-[10px] text-slate-500">Humans compare two AI answers and pick the better one.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Phase 2: Learning</h6>
                            <p className="text-[10px] text-slate-500">The RL agent optimizes the model to get higher "Human-Rank" rewards.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Exam-Ready Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'How is RL used in Dynamic Pricing?', a: 'Agents observe demand, competitor prices, and time of day (State) to adjust prices (Action) and maximize revenue (Reward) in real-time.' },
                        { q: 'What is the role of RL in AlphaFold?', a: 'RL helps optimize the 3D structure of proteins by rewarding configurations that minimize energy and match physical constraints.' },
                        { q: 'Give one example of RL in autonomous vehicles.', a: 'Decision-making for lane changes or intersection navigation, where the agent learns to balance speed, safety, and passenger comfort.' }
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
                title="6. Virtual Lab: Industry Explorer" 
                subtitle="Visualizing RL Domains"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore the various industries where Reinforcement Learning is creating a massive impact today.
                    </p>
                    <ApplicationGrid />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-indigo-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Applications: Explored!</h3>
                    <p className="text-indigo-100">
                        You've seen RL in the real world. Ready to transition into the core concepts of intelligent agents?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: AGENT TYPES
                    </button>
                    <button className="px-10 py-4 bg-indigo-700 text-white font-black rounded-2xl hover:bg-indigo-800 transition-colors">
                        REVIEW APPS
                    </button>
                </div>
            </div>
        </div>
    );
}

