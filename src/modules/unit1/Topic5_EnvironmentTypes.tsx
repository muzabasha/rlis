import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    Globe, Settings, Wind, Eye, EyeOff, Zap, Target, Clock, 
    Briefcase, ShieldAlert, Users2, Layout, Dice6, Map
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, AreaChart, Area, Legend, BarChart, Bar,
    ScatterChart, Scatter, ZAxis
} from 'recharts';

// ─── Interactive Components for Topic 5 ──────────────────────────────────────

/**
 * Interactive Environment Property Visualizer
 */
function EnvironmentTuner() {
    const [stochasticity, setStochasticity] = useState(0.2);
    const [observability, setObservability] = useState(0.8);
    
    // Simulate a path with noise
    const generatePathData = (noise: number) => {
        return Array.from({ length: 10 }, (_, i) => ({
            step: i,
            ideal: i * 10,
            actual: i * 10 + (Math.random() - 0.5) * noise * 50
        }));
    };

    const [pathData, setPathData] = useState(generatePathData(stochasticity));

    useEffect(() => {
        setPathData(generatePathData(stochasticity));
    }, [stochasticity]);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Globe size={18} className="text-cyan-500" />
                    Environment Property Tuner
                </h4>
                <div className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-bold">
                    Sandbox
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium flex items-center gap-2"><Dice6 size={14} /> Stochasticity (Noise)</span>
                            <span className="text-cyan-600 font-bold">{(stochasticity * 100).toFixed(0)}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.1" value={stochasticity} 
                            onChange={(e) => setStochasticity(parseFloat(e.target.value))}
                            className="w-full accent-cyan-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Deterministic</span>
                            <span>Highly Stochastic</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium flex items-center gap-2">
                                {observability > 0.5 ? <Eye size={14} /> : <EyeOff size={14} />} 
                                Observability
                            </span>
                            <span className="text-indigo-600 font-bold">{(observability * 100).toFixed(0)}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.1" value={observability} 
                            onChange={(e) => setObservability(parseFloat(e.target.value))}
                            className="w-full accent-indigo-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Partially (PO-MDP)</span>
                            <span>Fully (MDP)</span>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-[11px] leading-relaxed italic text-slate-500">
                        "In a <span className="text-cyan-600 font-bold">Stochastic</span> environment, the same action might lead to different outcomes. In a <span className="text-indigo-600 font-bold">Partially Observable</span> one, you don't even know where you are exactly."
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-[200px] bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={pathData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="step" hide />
                                <YAxis hide domain={[0, 150]} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }}
                                />
                                <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeDasharray="5 5" name="Intended Path" dot={false} />
                                <Line 
                                    type="monotone" 
                                    dataKey="actual" 
                                    stroke="#06b6d4" 
                                    strokeWidth={3} 
                                    name="Actual Path" 
                                    dot={{ r: 4, fill: observability > 0.5 ? '#06b6d4' : '#e2e8f0' }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center">
                        <div className={`text-xs font-bold uppercase tracking-widest ${stochasticity > 0.5 ? 'text-red-500' : 'text-emerald-500'}`}>
                            {stochasticity > 0.5 ? 'Environment: Chaotic' : 'Environment: Stable'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic5_EnvironmentTypes() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Jungle vs The Zoo" 
                subtitle="A Story of Two Habitats"
                icon={<Wind className="text-cyan-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-8 rounded-[2rem] border border-cyan-100 dark:border-cyan-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Globe size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-cyan-900 dark:text-cyan-100 mb-4 flex items-center gap-2">
                            🐒 Jojo's Dilemma
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Meet <strong>Jojo</strong>, the world's first RL monkey. Jojo grew up in a high-tech <strong>Zoo</strong>. 
                            </p>
                            <p>
                                In the Zoo, everything is <strong>Deterministic</strong>. If Jojo presses a button, a banana drops exactly 2 seconds later. He sees the whole cage (<strong>Fully Observable</strong>), and nothing ever moves (<strong>Static</strong>). Learning here is easy.
                            </p>
                            <p>
                                One day, Jojo is released into the <strong>Amazon Jungle</strong>. Suddenly, the world is <strong>Stochastic</strong>. He pulls a vine, but sometimes it snaps. The wind moves the trees (<strong>Dynamic</strong>), and he can't see the leopards hiding in the tall grass (<strong>Partially Observable</strong>).
                            </p>
                            <p>
                                Jojo's brain (the RL Agent) has to completely change how it thinks. He can no longer trust that "Action A always leads to Result B."
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="question" title="Reflective Question">
                            If you were Jojo, would you prefer a world where you knew exactly what would happen next, or one with surprises? Why?
                        </InfoCard>
                        <InfoCard type="insight" title="The Connection">
                            Most RL research starts in the "Zoo" (Simulations) because it's safe. But real AI must eventually survive in the "Jungle" (The Real World).
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Modelling Environment Dynamics" 
                subtitle="The Rules of the Jungle"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div>
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Classifying the Complexity</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            We use four major axes to classify every environment an RL agent encounters.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Stochasticity', math: 'P(s\'|s, a) < 1', desc: 'Outcomes are probabilistic.' },
                            { title: 'Observability', math: 'O \subseteq S', desc: 'Agent sees only a subset of true state.' },
                            { title: 'Continuity', math: 'S \in \mathbb{R}^n', desc: 'States or actions are infinite ranges.' },
                            { title: 'Dynamism', math: '\frac{dE}{dt} \neq 0', desc: 'Environment changes while agent thinks.' }
                        ].map(item => (
                            <div key={item.title} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div className="text-primary-600 font-mono text-sm mb-1">{item.math}</div>
                                <div className="font-bold text-slate-800 dark:text-white mb-1">{item.title}</div>
                                <div className="text-xs text-slate-500">{item.desc}</div>
                            </div>
                        ))}
                    </div>

                    <MathBlock 
                        formula="P(s' | s, a) = \text{Probability of next state } s' \text{ given current state } s \text{ and action } a"
                        label="State Transition Probability"
                        explanation="In a deterministic environment, this is always 1 for one specific s' and 0 for others. In stochastic worlds, it's a distribution."
                    />

                    <EnvironmentTuner />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Environment Scavenger Hunt" 
                subtitle="Learning by Identifying"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    {/* Level 1: Teacher Do */}
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Teacher Demo: The Invisible Board</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Teacher plays a game of Tic-Tac-Toe but keeps the board hidden from students, only announcing moves. 
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-white dark:bg-slate-800 p-2 rounded-lg inline-block">
                            <EyeOff size={14} /> This transforms a Fully Observable game into a Partially Observable one!
                        </div>
                    </div>

                    {/* Level 2: Teacher + Student */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Class Collaboration: Classification Table</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {['Game', 'Observability', 'Determinism', 'Classify'].map((h, i) => (
                                <div key={i} className="text-[10px] font-black uppercase text-slate-400 p-2">{h}</div>
                            ))}
                            {['Chess', 'Full', 'Det', 'Zoo'].map((v, i) => (
                                <div key={i} className="text-xs p-2 bg-white dark:bg-slate-800 rounded">{v}</div>
                            ))}
                            {['Poker', 'Partial', 'Stoch', 'Jungle'].map((v, i) => (
                                <div key={i} className="text-xs p-2 bg-white dark:bg-slate-800 rounded">{v}</div>
                            ))}
                        </div>
                    </div>

                    {/* Level 3: All Students Do */}
                    <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-amber-900/10 border-2 border-amber-100 dark:border-amber-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">L3</div>
                            <h4 className="font-bold text-amber-900 dark:text-amber-100">Team Challenge: The Wind Game</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Students try to toss a paper ball into a bin. In Round 2, other students use fans or wave papers to create "Wind" (Stochasticity).
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Drone Pilot AI" 
                subtitle="Mission: Underwater Cave Exploration"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-8">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2">Project Scope</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Design an RL environment for an underwater drone. The environment must feature <strong>Water Currents</strong> (Stochastic), <strong>Murky Water</strong> (Partial Observability), and <strong>Moving Fish</strong> (Dynamic).
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="font-bold flex items-center gap-2 text-sm"><Layout size={16} /> Technical Dependencies</h5>
                            <div className="space-y-2">
                                {['OpenAI Gym / Gymnasium', 'PyBullet Physics Engine', 'DQN / PPO Algorithm'].map(lib => (
                                    <div key={lib} className="flex items-center gap-2 text-xs p-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500" /> {lib}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-bold flex items-center gap-2 text-sm"><ShieldAlert size={16} className="text-red-500" /> Risks</h5>
                            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 text-xs text-red-700 dark:text-red-300">
                                <strong>Catastrophic Forgetting:</strong> If the environment is too dynamic, the agent might forget old skills while learning new ones.
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Examination Focus" 
                subtitle="Common Interview & Board Questions"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is the real world considered a PO-MDP?', a: 'Because sensors (like cameras) have blind spots and noise, meaning the agent never knows the "Perfect Truth" of its surroundings.' },
                        { q: 'Distinguish between Static and Dynamic environments.', a: 'Static environments remain unchanged while the agent is deliberating. Dynamic ones change over time regardless of the agent\'s actions.' },
                        { q: 'Define Stochasticity in the context of RL.', a: 'Stochasticity means the next state is a probability distribution $P(s\'|s,a)$ rather than a single fixed result.' }
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-purple-500 transition-colors">
                            <div className="font-bold text-slate-800 dark:text-white mb-2 italic">Q: {item.q}</div>
                            <div className="text-sm text-slate-500 border-l-2 border-slate-100 dark:border-slate-700 pl-4">{item.a}</div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Environment Tuner" 
                subtitle="The Ultimate Sandbox"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Use the controls below to inject noise and sensor failure into the agent's world. Observe how the "Confidence" drops as you move from Zoo to Jungle.
                    </p>
                    <EnvironmentTuner />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-cyan-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-cyan-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black">Environment Mastered!</h3>
                    <p className="text-cyan-100">
                        You've mapped out the different worlds an agent can live in. Ready to see how they actually "work" inside these worlds?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-cyan-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        APPROVE TOPIC
                    </button>
                    <button className="px-10 py-4 bg-cyan-700 text-white font-black rounded-2xl hover:bg-cyan-800 transition-colors">
                        NEED MORE EXAMPLES
                    </button>
                </div>
            </div>
        </div>
    );
}

