import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    RefreshCw, Play, ArrowRight, Brain, Globe, Zap, 
    Target, Clock, Briefcase, ShieldAlert, Users2, Layout,
    Pause, SkipForward, Info
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, AreaChart, Area, Legend, BarChart, Bar
} from 'recharts';

// ─── Interactive Components for Topic 6 ──────────────────────────────────────

/**
 * Interactive RL Loop Visualizer
 */
function RLLoopVisualizer() {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const steps = [
        { label: 'State (S_t)', target: 'Agent', desc: 'Agent observes the environment.', icon: <Globe size={18} /> },
        { label: 'Action (A_t)', target: 'Environment', desc: 'Agent makes a decision.', icon: <Brain size={18} /> },
        { label: 'Reward (R_{t+1})', target: 'Agent', desc: 'Environment gives feedback.', icon: <Zap size={18} /> },
        { label: 'Next State (S_{t+1})', target: 'Agent', desc: 'Environment changes state.', icon: <RefreshCw size={18} /> }
    ];

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(prev => (prev + 1) % steps.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">The Interaction Cycle</h4>
                    <p className="text-xs text-slate-500">Step through the RL interaction loop.</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`p-2 rounded-xl transition-colors ${isPlaying ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button 
                        onClick={() => setStep((step + 1) % steps.length)}
                        className="p-2 bg-slate-200 dark:bg-slate-700 rounded-xl"
                    >
                        <SkipForward size={18} />
                    </button>
                </div>
            </div>

            <div className="relative h-64 flex items-center justify-between px-12">
                {/* Agent */}
                <motion.div 
                    animate={{ 
                        scale: steps[step].target === 'Agent' ? 1.1 : 1,
                        borderColor: steps[step].target === 'Agent' ? '#3b82f6' : '#e2e8f0'
                    }}
                    className="w-32 h-32 rounded-[2rem] bg-white dark:bg-slate-800 border-4 shadow-xl flex flex-col items-center justify-center gap-2 z-10"
                >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl">
                        <Brain size={24} />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">Agent</span>
                </motion.div>

                {/* Arrows/Flow */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100%" height="100%" className="overflow-visible">
                        {/* Action Flow */}
                        <path 
                            d="M 140 128 L 360 128" 
                            fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6"
                        />
                        {/* Feedback Flow */}
                        <path 
                            d="M 360 160 Q 250 200 140 160" 
                            fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6"
                        />
                        
                        {/* Active Pulse Action */}
                        {step === 1 && (
                            <motion.circle 
                                r="6" fill="#3b82f6"
                                initial={{ cx: 140, cy: 128 }}
                                animate={{ cx: 360, cy: 128 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                        {/* Active Pulse Feedback */}
                        {(step === 2 || step === 3) && (
                            <motion.circle 
                                r="6" fill="#10b981"
                                initial={{ offset: 0 }}
                                animate={{ offset: 1 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <animateMotion 
                                    path="M 360 160 Q 250 200 140 160" 
                                    dur="1.5s" repeatCount="indefinite" 
                                />
                            </motion.circle>
                        )}
                    </svg>
                </div>

                {/* Environment */}
                <motion.div 
                    animate={{ 
                        scale: steps[step].target === 'Environment' ? 1.1 : 1,
                        borderColor: steps[step].target === 'Environment' ? '#10b981' : '#e2e8f0'
                    }}
                    className="w-32 h-32 rounded-[2rem] bg-white dark:bg-slate-800 border-4 shadow-xl flex flex-col items-center justify-center gap-2 z-10"
                >
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
                        <Globe size={24} />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">Env</span>
                </motion.div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div 
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4"
                >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-primary-500">
                        {steps[step].icon}
                    </div>
                    <div>
                        <div className="font-black text-sm text-primary-600 uppercase tracking-tighter">{steps[step].label}</div>
                        <div className="text-xs text-slate-500">{steps[step].desc}</div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic6_WorkingOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Blindfolded Explorer" 
                subtitle="The Rhythm of Trial and Error"
                icon={<RefreshCw className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <RefreshCw size={200} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🤖 Rover's First Night
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a small robot named <strong>Rover</strong>. Rover has been placed in a pitch-black room. He has no map and no sensors except for a small "Ouch" detector.
                            </p>
                            <p>
                                Rover takes a step forward (<strong>Action</strong>). <em>CLANG!</em> He hits a metal shelf (<strong>Reward: -10</strong>). His "Ouch" detector glows red. He now knows that "moving forward in this spot" is a bad idea.
                            </p>
                            <p>
                                He turns 90 degrees and moves again. This time, no noise. He feels a soft carpet (<strong>Next State</strong>). He keeps going until he finds a Charging Dock (<strong>Reward: +100</strong>).
                            </p>
                            <p>
                                This cycle of <strong>Observe → Act → Feedback → Update</strong> is exactly how Reinforcement Learning works. It's a rhythm that never stops.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="question" title="Class Reflection">
                            Think about how you learned to ride a bike. Can you identify the "State", "Action", and "Reward" in that experience?
                        </InfoCard>
                        <InfoCard type="insight" title="The 'Step' Concept">
                            In RL, time isn't measured in seconds, but in <strong>Steps</strong>. One step is one full cycle of the loop.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Formal Interaction Loop" 
                subtitle="From Words to Equations"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                        <h4 className="font-bold flex items-center gap-2 text-primary-400"><Info size={18} /> The Interaction Sequence</h4>
                        <p className="text-sm text-slate-400">
                            The interaction between the agent and environment can be written as a sequence of states, actions, and rewards:
                        </p>
                        <div className="bg-slate-800 p-4 rounded-xl text-center font-mono text-xl text-emerald-400">
                            S_0, A_0, R_1, S_1, A_1, R_2, S_2, A_2, R_3, \dots
                        </div>
                        <p className="text-[10px] text-slate-500 italic text-center">
                            Note: The reward Rₜ and next state Sₜ are generated by the environment in response to action Aₜ₋₁.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="S_t \in \mathcal{S}, A_t \in \mathcal{A}(s), R_t \in \mathcal{R} \subset \mathbb{R}"
                                label="The Sets of RL"
                                explanation="The agent picks an action from the set of allowed actions in that state, and receives a real-number reward."
                            />
                            <SymbolTable 
                                symbols={[
                                    { symbol: 'S_t', meaning: 'State at time t' },
                                    { symbol: 'A_t', meaning: 'Action taken at time t' },
                                    { symbol: 'R_{t+1}', meaning: 'Reward received as a result of A_t' },
                                    { symbol: '\mathcal{A}(s)', meaning: 'Action Space — the menu of available actions' }
                                ]}
                            />
                        </div>
                        <RLLoopVisualizer />
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Trace the Loop" 
                subtitle="Simulating the Cycle"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Teacher Demo: The Human Robot</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Teacher acts as "Environment" and a student acts as "Agent". Student is blindfolded. Teacher says: "State: Chair nearby." Student says: "Action: Sit." Teacher says: "Reward: +10. Next State: Sitting."
                        </p>
                    </div>

                    {/* Level 2 */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Collaborative Flowchart</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Let's map the loop for a **Coffee Vending Machine**:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['State: Idle', 'Action: Insert Coin', 'Reward: 0', 'Next State: Paid', 'Action: Select Latte', 'Reward: +10', 'Next State: Dispensing'].map((step, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 text-xs font-bold">{step}</div>
                                    {i < 6 && <ArrowRight size={14} className="text-slate-300" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Smart Traffic" 
                subtitle="Optimizing the Urban Loop"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-8">
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="card p-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">State</div>
                            <p className="text-xs font-bold">Traffic density at 4 junctions.</p>
                        </div>
                        <div className="card p-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Action</div>
                            <p className="text-xs font-bold">Set Green light duration (30s-90s).</p>
                        </div>
                        <div className="card p-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Reward</div>
                            <p className="text-xs font-bold">Negative of average wait time.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="font-bold text-sm">Implementation Risks</h5>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30 text-xs text-amber-700 dark:text-amber-300 flex gap-3">
                            <ShieldAlert size={18} />
                            <div>
                                <strong>Safety Constraint:</strong> The RL agent must never set all lights to Green simultaneously! This requires an "Action Mask" layer.
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Essential Examination Points"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What are the two main entities in the RL loop?', a: 'The Agent (learner/decision maker) and the Environment (everything outside the agent).' },
                        { q: 'Explain the difference between S_t and S_{t+1}.', a: 'S_t is the current state observed by the agent before taking an action. S_{t+1} is the state the environment transitions into after the action.' },
                        { q: 'Is the reward R_t always positive?', a: 'No. Rewards can be positive (pleasure), negative (pain/cost), or zero (neutral).' }
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
                title="6. Virtual Lab: The Cycle Explorer" 
                subtitle="Fine-tuning the Interaction"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Adjust the animation speed to see how the agent updates its internal "Brain" after receiving a reward. In high-speed systems, this happens thousands of times per second.
                    </p>
                    <RLLoopVisualizer />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-blue-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Interaction Loop: Complete!</h3>
                    <p className="text-blue-100">
                        You've decoded the heartbeat of Reinforcement Learning. Ready to see the actual math that connects these dots?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-blue-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        APPROVE TOPIC
                    </button>
                    <button className="px-10 py-4 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 transition-colors">
                        REVIEW LOOP
                    </button>
                </div>
            </div>
        </div>
    );
}

