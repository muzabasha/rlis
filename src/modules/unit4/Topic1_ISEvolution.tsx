import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Cpu, History, CheckCircle2, Clock, Target, AlertTriangle,
    TrendingUp, Briefcase, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, Search, Brain, Globe, Shield, Rocket
} from 'lucide-react';

// ─── Interactive Components for Topic 1 ──────────────────────────────────────

/**
 * Evolution Timeline Visualizer
 */
function EvolutionLab() {
    const [era, setEra] = useState(0);

    const eras = [
        { 
            title: 'Era of Logic (1950s)', 
            tech: 'Expert Systems', 
            desc: 'Intelligence was defined as a set of nested IF-THEN rules.',
            math: 'Logic Gates (AND/OR/NOT)',
            icon: Cpu
        },
        { 
            title: 'Era of Patterns (1990s)', 
            tech: 'Statistical ML', 
            desc: 'Intelligence moved to pattern matching in large datasets.',
            math: 'Linear Regression / SVMs',
            icon: Search
        },
        { 
            title: 'Era of Learning (2010s+)', 
            tech: 'Deep RL / LLMs', 
            desc: 'Intelligence is now defined as the ability to learn from interaction.',
            math: 'Neural Networks / MDPs',
            icon: Brain
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex justify-between items-center gap-4">
                {eras.map((e, i) => (
                    <button
                        key={i}
                        onClick={() => setEra(i)}
                        className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                            era === i 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                            : 'border-slate-100 dark:border-slate-700'
                        }`}
                    >
                        <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${era === i ? 'text-primary-600' : 'text-slate-400'}`}>{e.title.split(' ')[2]}</div>
                        <div className={`text-xs font-bold ${era === i ? 'text-primary-700' : 'text-slate-500'}`}>{e.tech}</div>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={era}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-primary-500">
                            {React.createElement(eras[era].icon, { size: 32 })}
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-slate-800 dark:text-white">{eras[era].title}</h4>
                            <p className="text-sm text-slate-500 font-medium">{eras[era].tech}</p>
                        </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                        "{eras[era].desc}"
                    </p>

                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] font-black text-primary-400 uppercase">Core Math</span>
                        <code className="text-xs text-white">{eras[era].math}</code>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic1_ISEvolution() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic1_isevolution" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. From Logic to Learning" 
                subtitle="The History of Synthetic Thought"
                icon={<History className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
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
                                "Intelligent Systems evolved from rigid rule-books to flexible learners that can outsmart us at our own games."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Cpu size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🕰️ The Rules of the Game
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In the 1950s, we believed intelligence was just a giant list of rules. If you could write down every "If this, then that," you'd have an Intelligent System.
                            </p>
                            <p>
                                But real life is messy. You can't write a rule for every possible way to walk across a room or every possible facial expression. The systems were brittle—one unexpected input, and they'd crash.
                            </p>
                            <p>
                                The **Evolution of Intelligent Systems** is the story of moving from **Knowledge-Based** (Human provides rules) to **Learning-Based** (Machine discovers rules). We stopped trying to be the machine's "brain" and started being its "teacher."
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Dartmouth Workshop">
                            In 1956, the term "Artificial Intelligence" was born. The founders predicted we'd solve AI in a single summer. It's been 70 years and we're still learning!
                        </InfoCard>
                        <InfoCard type="tip" title="Defining Intelligence">
                            Modern systems are judged by their **Adaptability**, not just their processing speed.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Modelling Universal Intelligence" 
                subtitle="The Legg-Hutter Definition"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\Upsilon(\pi) = \sum_{\mu \in E} 2^{-K(\mu)} V_\mu^\pi"
                        label="Universal Intelligence (\Upsilon)"
                        explanation="A formal mathematical definition of intelligence across all environments."
                        interpretation="Intelligence (\Upsilon) is the weighted sum of an agent's (\pi) ability to achieve rewards (V) across all possible environments (\mu). Complex environments are weighted less than simple ones (2^-K)."
                        motivation="This formula tells us that a truly Intelligent System isn't just good at one thing (like Chess); it's good at everything, even things it hasn't seen before."
                        terms={[
                            { term: '\Upsilon', name: 'Intelligence', meaning: 'The capability of an agent to achieve goals in a wide range of environments.', range: '[0, 1]', example: '0.9 for a general-purpose robot.' },
                            { term: '2^{-K(\mu)}', name: 'Complexity Weight', meaning: 'Occam\'s Razor: simple environments get more weight than complex ones.', range: '(0, 1]', example: 'High weight for basic physics.' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Evolution of Capacity</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Historically, we measure evolution through the **Turing Test** (Behavioral) and now through **Cross-Domain Generalization** (Capability).
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="I S Evolution Architecture"
                description="Timeline of Intelligent Systems evolution."
                chart={`graph LR
    Logic[Rule-Based Expert Systems] --> Prob[Probabilistic Models]
    Prob --> ML[Machine Learning]
    ML --> RL[Reinforcement Learning]
    RL --> AGI[Towards AGI]`}
            />


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="Milestones of the Mind"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Evolution Timeline Demo",
                            objectives: "Visualize the shift from rule-based logic to interaction-based learning.",
                            instructions: [
                                "Open the 'Evolution Visualizer' in the Virtual Lab section.",
                                "Select '1950s'. Point out: 'Back then, AI was just a digital encyclopedia of rules.'",
                                "Select '2010s+'. Show how the math shifted from 'Logic Gates' to 'Neural Networks'.",
                                "Explain: 'The machine stopped being a parrot and started being an explorer.'",
                                "Ask: 'What is the biggest limitation of a rule-based system?'"
                            ],
                            inputs: "Interactive EvolutionLab component",
                            outputs: "Timeline interaction showing era-specific tech and math.",
                            rubrics: ["Clarity of 'Rule-based' vs 'Learning-based' distinction", "Historical accuracy", "Student engagement"],
                            outcomes: "Students identify the core paradigm shifts in AI history.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Expert vs. Learner Showdown",
                            objectives: "Collaboratively compare traditional rule-based logic with modern RL approaches.",
                            instructions: [
                                "Teacher draws a scenario on the board: 'Detecting a Spam Email'.",
                                "Group 1 (Expert): Writes 3 fixed rules (e.g., 'If Subject contains Win, it's Spam').",
                                "Group 2 (Learner): Explains how an agent would learn from user 'Report Spam' clicks.",
                                "Class reflects: 'What happens if a spammer changes the word to W-I-N?'",
                                "Conclusion: Expert systems are fragile; learners are robust."
                            ],
                            inputs: "Spam email scenarios",
                            outputs: "Rule list vs. Learning feedback loop diagram",
                            rubrics: ["Logical rule creation", "Correct explanation of the feedback loop", "Classroom participation"],
                            outcomes: "Students master the conceptual difference between brittle logic and adaptive learning.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The AI Time-Capsule",
                            objectives: "Critically map past technological predictions to current real-world reality.",
                            instructions: [
                                "Divide class into 4 teams. Each team receives a famous AI prediction from the 1960s (e.g., 'Machines will be capable of doing any work a man can do by 1980').",
                                "Group Task: Research/Discuss why that prediction failed or succeeded.",
                                "Output: A 'Reality Check' poster showing the 'Intended Goal' vs 'Actual Achievement' in 2026.",
                                "Conclusion: 'AI progress is exponential in math, but linear in safety and common sense.'"
                            ],
                            inputs: "Historical AI prediction quotes",
                            outputs: "Reality Check posters",
                            rubrics: ["Depth of research/analysis", "Clarity of the achievement gap", "Team coordination"],
                            outcomes: "Students develop a realistic perspective on AI hype vs. historical progress.",
                            time: "20 Mins",
                            materials: ["Quote list", "Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "The Rule-Breaker Audit",
                            objectives: "Independently audit a daily task to identify where 'Rules' fail and 'Learning' begins.",
                            instructions: [
                                "Task: Choose a complex human task (e.g., 'Cooking a perfect meal' or 'Navigating a crowded market').",
                                "Audit: Try to write 5 'Perfect Rules' for that task. Identify where they break down.",
                                "Reflection: How does a human 'Learn by Doing' to solve those rule-breaks?",
                                "Analysis: If you were to build a robot for this, would you give it rules or a reward function?",
                                "Propose: A 'Reward Signal' for your chosen task."
                            ],
                            inputs: "Personal daily experiences",
                            outputs: "Individual Task/Rule/Learning Report (1 page)",
                            rubrics: ["Correct use of RL/IS terminology", "Logical rule failure analysis", "Originality"],
                            outcomes: "Students demonstrate the ability to identify MDP opportunities in messy, real-world environments.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: From Expert to Learner" 
                subtitle="Upgrading a Legacy System"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Paradigm Shift</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are an engineer at a car company. Your current cruise control is an **Expert System** (Fixed rules: if distance {'<'} 10m, brake). Your project is to replace it with an **Intelligent Learner** (RL agent) that learns to drive smoothly by observing millions of miles of human behavior.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Shield size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Old Way</div>
                            <p className="text-[8px] mt-1">Brittle Rules</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <TrendingUp size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">Transition</div>
                            <p className="text-[8px] mt-1">Data-Driven</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Rocket size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">New Way</div>
                            <p className="text-[8px] mt-1">Autonomous Learning</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Historical Mastery"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the primary difference between a traditional system and an intelligent system?', a: 'Traditional systems follow fixed rules coded by humans; intelligent systems learn to optimize their behavior through interaction and experience.' },
                        { q: 'Why was the 1956 Dartmouth Workshop significant?', a: 'It was the founding event of the field of Artificial Intelligence, where the term was first coined and the major research goals were established.' },
                        { q: 'How does Legg-Hutter define intelligence?', a: 'Intelligence is defined as the capability of an agent to achieve goals in a wide range of environments, formalized as a weighted sum of returns.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Evolution Visualizer" 
                subtitle="Travel through AI History"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="AI Evolution Timeline"
                    description="Interact with key milestones in AI history"
                    objective="Click on timeline events to see the architecture and performance of each milestone system."
                    badge="Interactive Lab"
                    tips={['Notice how each breakthrough built on the previous one',
                'Deep RL (2013+) combined neural networks with Q-Learning']}
                >
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore how the core technology and definition of intelligence have shifted over the decades. Click through the eras to see the change in math and focus.
                    </p>
                    <EvolutionLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Evolution: Mastered!</h3>
                    <p className="text-primary-100">
                        You've seen where synthetic thought came from. Now, let's explore what makes a behavior "Intelligent."
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: INTELLIGENT BEHAVIOR
                    </button>
                </div>
            </div>
        </div>
    );
}
