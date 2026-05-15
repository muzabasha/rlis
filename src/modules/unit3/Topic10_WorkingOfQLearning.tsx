import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    RefreshCw, Play, RotateCcw, Target, Briefcase, Zap, Binary,
    Layers, Eye, ChevronRight, Search, Brain, CheckCircle2,
    StepForward, TrendingUp
} from 'lucide-react';

// ─── Interactive Components for Topic 10 ─────────────────────────────────────

/**
 * Q-Learning Lifecycle Visualizer
 */
function LifecycleLab() {
    const [currentStep, setCurrentStep] = useState(0);
    
    const steps = [
        { title: 'Initialize', desc: 'The agent starts with a blank memory (Q-Table with zeros).', icon: RotateCcw, color: 'text-slate-400' },
        { title: 'Observe', desc: 'The agent look at its surroundings (State s).', icon: Eye, color: 'text-blue-500' },
        { title: 'Act', desc: 'The agent picks a move (Action a) using \u03B5-greedy.', icon: Zap, color: 'text-amber-500' },
        { title: 'Execute', desc: 'The world changes. Agent gets Reward r and sees State s\'.', icon: Play, color: 'text-emerald-500' },
        { title: 'Learn', desc: 'The agent updates its Q-Table using the TD Error.', icon: Brain, color: 'text-primary-500' }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Step List */}
                <div className="w-full md:w-1/3 space-y-3">
                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        const isActive = currentStep === i;
                        return (
                            <div 
                                key={i}
                                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                                    isActive 
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                    : 'border-slate-100 dark:border-slate-700 opacity-40'
                                }`}
                            >
                                <Icon size={20} className={s.color} />
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step {i+1}</div>
                                    <div className={`text-sm font-bold ${isActive ? 'text-primary-600' : 'text-slate-500'}`}>{s.title}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Step Visualization */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 min-h-[300px] text-center space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <div className={`p-6 rounded-full bg-white dark:bg-slate-800 shadow-lg mx-auto w-fit ${steps[currentStep].color}`}>
                                {React.createElement(steps[currentStep].icon, { size: 48 })}
                            </div>
                            <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider">{steps[currentStep].title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                                {steps[currentStep].desc}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <button 
                        onClick={() => setCurrentStep(prev => (prev + 1) % steps.length)}
                        className="px-8 py-3 bg-primary-600 text-white rounded-xl font-black shadow-lg shadow-primary-500/20 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <StepForward size={18} /> NEXT STEP
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic10_WorkingOfQLearning() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Cycle of Wisdom" 
                subtitle="The 5-Step Loop of Learning"
                icon={<RefreshCw className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Binary size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🔄 Endless Iteration
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Q-Learning doesn't happen all at once. It's a relentless cycle of **Interaction** and **Adjustment**.
                            </p>
                            <p>
                                Every few milliseconds, the agent looks at its state, picks an action, and feels the consequences. It then uses a single line of math to "patch" its memory, making its internal map slightly more accurate.
                            </p>
                            <p>
                                This loop repeats millions of times. At first, the agent is clueless and chaotic. But slowly, the "noise" in the Q-Table turns into "signal." A path emerges. A strategy is born. This is how machines learn to master worlds we can't even visualize.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Episode Concept">
                            Learning is often divided into **Episodes** (like game rounds). When the agent fails or succeeds, the world resets, but the Q-Table remains!
                        </InfoCard>
                        <InfoCard type="tip" title="Epsilon-Greedy">
                            Crucial to the loop: sometimes the agent takes the best move, and sometimes it takes a random move to keep exploring.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Step-by-Step Logic" 
                subtitle="Formalizing the Algorithm"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6 font-mono text-xs overflow-x-auto">
                        <div className="text-primary-400"># Pseudo-code for Q-Learning</div>
                        <div className="space-y-1">
                            <div>{"Initialize $Q(s, a)$ arbitrarily"}</div>
                            <div><span className="text-indigo-400">Repeat</span> (for each episode):</div>
                            <div className="pl-6">Initialize $s$</div>
                            <div className="pl-6"><span className="text-indigo-400">Repeat</span> (for each step of episode):</div>
                            <div className="pl-12">{"Choose $a$ from $s$ using policy derived from $Q$ (e.g., $\epsilon$-greedy)"}</div>
                            <div className="pl-12">{"Take action $a$, observe $r, s'$"}</div>
                            <div className="pl-12">{"$Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma \max_{a'} Q(s', a') - Q(s, a)]$"}</div>
                            <div className="pl-12">{"$s \leftarrow s'$"}</div>
                            <div className="pl-6"><span className="text-indigo-400">until</span> $s$ is terminal</div>
                        </div>
                    </div>

                    <MathBlock 
                        formula="\delta_t = r_{t+1} + \gamma \max_a Q(s_{t+1}, a) - Q(s_t, a_t)"
                        label="The TD Error (\delta)"
                        explanation="The difference between the new target and the old estimate."
                        interpretation="$\delta$ is the 'Surprise' signal. If $\delta > 0$, the action was better than expected. If $\delta < 0$, it was worse."
                        motivation="This error signal is what drives the updates in both Q-Learning and Deep Q-Networks."
                        terms={[
                            { term: '\delta_t', name: 'TD Error', meaning: 'The correction signal at time t.', range: '\mathbb{R}', example: '+5 (pleasant surprise).' },
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Rhythm of Reinforcement"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Lifecycle Visualizer Demo",
                            objectives: "Observe the procedural sequence of a single Q-Learning interaction step.",
                            instructions: [
                                "Open the 'Lifecycle Visualizer' in the Virtual Lab section.",
                                "Step through the 'Observe' and 'Act' stages. Explain: 'The agent has to make a choice before it knows the reward.'",
                                "Stop at 'Learn'. Show how the TD Error is calculated only after the outcome is known.",
                                "Explain: 'This loop is the heartbeat of RL. It repeats thousands of times per second.'",
                                "Ask: 'Which step is the most computationally expensive?'"
                            ],
                            inputs: "Interactive LifecycleLab component",
                            outputs: "Visual step-through of the agent's internal state logic.",
                            rubrics: ["Clarity of 'Procedural Flow' explanation", "Correct stage identification", "Student engagement"],
                            outcomes: "Students identify the chronological dependency of observation, action, and learning.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The State Transition Audit",
                            objectives: "Collaboratively map a single interaction into the formal $(s, a, r, s')$ tuple.",
                            instructions: [
                                "Teacher presents a simple scenario: 'A robot tries to open a door'.",
                                "Guided Mapping: 'State $s$: Door is closed. Action $a$: Pull handle. Reward $r$: +10 (success). Next State $s'$: Door is open.'",
                                "Teacher asks: 'What was the information gap before we pulled the handle?' (We didn't know if pulling would work).",
                                "Class reflects: 'How does the Q-table update use the knowledge that the door is now open?'",
                                "Conclusion: Every update is a bridge between the unknown (before action) and the known (after action)."
                            ],
                            inputs: "Simple physical interaction scenarios",
                            outputs: "Formal $(s, a, r, s')$ mapping on the board",
                            rubrics: ["Correct identification of tuple components", "Logical link between $r$ and $s'$", "Classroom participation"],
                            outcomes: "Students master the technical translation of physical actions into RL data structures.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Q-Learning Relay",
                            objectives: "Experience the parallel and sequential nature of the learning loop through a physical simulation.",
                            instructions: [
                                "Divide class into teams of 4 students each.",
                                "Role 1 (The Sensor): Observes a card with a number (State).",
                                "Role 2 (The Actor): Picks a card (Action) and passes it to the 'World'.",
                                "Role 3 (The World): Reveals the reward and the next number.",
                                "Role 4 (The Brain): Performs a quick mental calculation ($r + V'$) and updates a sticky note (The Table).",
                                "Teams race to complete 5 full 'cycles' of learning.",
                                "Conclusion: 'Learning is a team effort of sensing, acting, and reflecting.'"
                            ],
                            inputs: "State/Action cards and sticky notes",
                            outputs: "Updated 'Classroom Q-Table'",
                            rubrics: ["Accuracy of data passing", "Understanding of role boundaries", "Team coordination"],
                            outcomes: "Students visualize the Q-Learning algorithm as a physical flow of information.",
                            time: "20 Mins",
                            materials: ["Index cards", "Sticky notes", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Skill Acquisition Audit",
                            objectives: "Independently audit a personal skill-learning process using the Q-Learning 5-step cycle.",
                            instructions: [
                                "Task: Choose a skill you've learned (e.g., Typing, Riding a bike, or a Video game).",
                                "Audit: Map your learning to the 5 steps. Observe (visuals), Act (muscle move), Execute (outcome), Learn (muscle memory adjustment).",
                                "Reflection: What was your 'TD Error' when you first succeeded? (The feeling of 'Oh! That's how it works!').",
                                "Analysis: If you stopped 'Exploring' (random actions) too early, did you end up with a suboptimal skill level?",
                                "Propose: How could you use the 'Initialize State' step to learn a new skill faster?"
                            ],
                            inputs: "Personal learning experiences",
                            outputs: "Individual Learning Lifecycle Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Introspective mapping quality", "Originality"],
                            outcomes: "Students bridge the gap between abstract algorithmic loops and biological neuroplasticity.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Logistics Agent" 
                subtitle="Applying the Loop to Supply Chains"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Optimization in the Real World</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Supply chain managers use this exact cycle to optimize delivery routes. Each "Step" represents a delivery stop. Each "Episode" represents a full day of logistics. Over months, the Q-learning agent discovers routes that human managers never considered, saving millions in fuel.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Layers size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">State</div>
                            <p className="text-[8px] mt-1">Truck Location / Fuel</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Eye size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Action</div>
                            <p className="text-[8px] mt-1">Pick Next Customer</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <TrendingUp size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">Reward</div>
                            <p className="text-[8px] mt-1">On-time Delivery</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Procedural Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is the Q-table updated using the max Q of the next state?', a: 'Because Q-Learning assumes the agent will behave optimally in the future. By using the max Q of the next state, the update always pushes the current Q-value toward the highest possible future return.' },
                        { q: 'What marks the end of an episode in the Q-learning cycle?', a: 'An episode ends when the agent reaches a "Terminal State" (like a goal square or a crash). The agent is then reset to a start state to begin a new episode.' },
                        { q: 'What is the role of the learning rate in the working loop?', a: 'It determines how much of the new information (the TD Error) is actually applied to the Q-table. A small learning rate makes the process more stable but slower.' }
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
                title="6. Virtual Lab: Lifecycle Visualizer" 
                subtitle="Track the Agent's Flow"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In this lab, you can step through the internal logic of a single Q-Learning interaction. Click **Next Step** to advance through the loop from Initialization to Learning.
                    </p>
                    <LifecycleLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Working Loop: Mastered!</h3>
                    <p className="text-primary-100">
                        You know how the engine runs. Now, let's put it to the test in a high-stakes dungeon adventure!
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: GAMBLER IN A DUNGEON
                    </button>
                </div>
            </div>
        </div>
    );
}
