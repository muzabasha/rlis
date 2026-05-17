import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Bot, Settings, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, Search, Brain, Globe, Rocket,
    Activity, Cpu, HardDrive, Target, Briefcase,
    Shield, Move, MousePointer2, User, Layout, Map,
    GraduationCap, MessageCircle, AlertCircle, RefreshCw
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Environments Detailed Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Environments Detailed Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Environments Detailed simulator.",
        "question": "Based on your experiment, how does this concept influence long-term state-action values under stochastic conditions?",
        "hint": "Consider factors like the discount factor (gamma), immediate rewards, and next-state expectations."
    },
    {
        "task": "Change the parameters to their minimum and maximum settings and compare results.",
        "question": "What primary edge-case did you observe when parameters were set to extreme boundary values?",
        "hint": "For example, consider what happens when exploration is completely shut off, or when rewards are purely negative."
    }
];
const logs: string[] = [
    "🤖 [System] Initializing Environments Detailed Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Environments Detailed\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 9 ──────────────────────────────────────

/**
 * Learning Agent Visualizer: Mapping the 4 components
 */
function LearningAgentLab() {
    const [activeComponent, setActiveComponent] = useState(0);

    const components = [
        {
            name: 'Performance Element',
            role: 'The Doer',
            desc: 'This is the "old" agent. It takes percepts and chooses actions based on its current policy.',
            icon: Move,
            color: 'text-primary-500'
        },
        {
            name: 'Learning Element',
            role: 'The Improver',
            desc: 'It makes changes to the performance element to improve it based on feedback from the critic.',
            icon: GraduationCap,
            color: 'text-emerald-500'
        },
        {
            name: 'The Critic',
            role: 'The Evaluator',
            desc: 'It tells the learning element how well the agent is doing by comparing performance against a fixed standard.',
            icon: Eye,
            color: 'text-amber-500'
        },
        {
            name: 'Problem Generator',
            role: 'The Explorer',
            desc: 'It suggests "sub-optimal" actions that might lead to new, better experiences (Exploration).',
            icon: RefreshCw,
            color: 'text-purple-500'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Component Diagram */}
                <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-dashed border-slate-100 dark:border-slate-700 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="grid grid-cols-2 gap-4">
                        {components.map((c, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveComponent(i)}
                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                                    activeComponent === i 
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-110' 
                                    : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-200'
                                }`}
                            >
                                <c.icon size={20} className={activeComponent === i ? c.color : 'text-slate-400'} />
                                <span className="text-[8px] font-black uppercase tracking-tighter">{c.name.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Insight Panel */}
                <div className="flex-1 space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeComponent}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${components[activeComponent].color}`}>
                                    {React.createElement(components[activeComponent].icon, { size: 24 })}
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-800 dark:text-white">{components[activeComponent].name}</h4>
                                    <span className={`text-[10px] font-black uppercase ${components[activeComponent].color}`}>{components[activeComponent].role}</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                "{components[activeComponent].desc}"
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic9_EnvironmentsDetailed() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic9_environmentsdetailed" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Self-Improving Mind" 
                subtitle="The Architecture of Learning"
                icon={<Brain className="text-blue-600" size={24} />}
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
                                "Fully observable vs partially observable: the difference between playing chess and playing poker blindfolded."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <GraduationCap size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🎓 The Student and the Master
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                A static agent is like a book; it only knows what was written in it. A **Learning Agent** is like a student. It doesn't just act; it *observes* the results of its actions and *updates* its own internal code to do better next time.
                            </p>
                            <p>
                                To do this, the agent needs more than just a brain. It needs a **Critic** to judge its mistakes, a **Learning Element** to fix them, and a **Problem Generator** to keep it curious. 
                            </p>
                            <p>
                                This is the peak of Agent Architecture. It's the framework that allows an AI to start with zero knowledge and eventually defeat world champions in Go or navigate complex city streets.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Critic's Standard">
                            A learning agent cannot judge itself. It needs an external "Standard" (Performance Measure) to tell it whether its learning is moving in the right direction.
                        </InfoCard>
                        <InfoCard type="tip" title="Exploration vs Exploitation">
                            The **Problem Generator**'s job is to be annoying! It forces the agent to try things it normally wouldn't, just to see if a better path exists.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Modelling the Learning Loop" 
                subtitle="Feedback and Updates"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\theta_{t+1} = \theta_t + \alpha \cdot \text{Feedback}(P_t, \text{Critic})"
                        label="The Learning Update (\theta)"
                        explanation="How the agent's internal parameters evolve over time."
                        interpretation="The agent's 'Knowledge' (\theta) is updated by a small step (\alpha) based on the feedback from the Critic. If the Feedback is positive, the current strategy is reinforced. If negative, it's corrected."
                        motivation="This formula is the mathematical engine of all Reinforcement Learning. It's how experience is converted into intelligence."
                        terms={[
                            { term: '\alpha', name: 'Learning Rate', meaning: 'How much the agent trusts new experience over old knowledge.', range: '(0, 1]', example: '0.01 for stable learning.' },
                            { term: '\theta', name: 'Agent Parameters', meaning: 'The internal data structure (weights/rules) that define behavior.', range: '\mathbb{R}^n', example: 'Weights in a Neural Network.' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> The Performance Element</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            The **Performance Element** is what actually acts in the environment. Its function is $a = \pi(s; \theta)$. The learning agent's goal is to find the best $\theta$.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Environments Detailed Architecture"
                description="Impact of environment complexity on agent design."
                chart={`graph TD
    Simple[Fully Observable, Deterministic] --> Exact[Search Algorithms / A*]
    Complex[Partially Observable, Stochastic] --> Prob[POMDPs & RL]`}
            />


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Component Identification" 
                subtitle="Deconstructing the Learner"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">The AlphaGo Breakdown</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">
                            Match the AlphaGo part to its Learning Agent component:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                <p className="text-[10px] text-slate-500 italic mb-2">"The neural network that picks the next move."</p>
                                <div className="text-[10px] font-black text-primary-500 uppercase">→ Performance Element</div>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                <p className="text-[10px] text-slate-500 italic mb-2">"The system that compares a move to professional games."</p>
                                <div className="text-[10px] font-black text-amber-500 uppercase">→ The Critic</div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Recommendation Engine" 
                subtitle="Building a Better Netflix"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Fighting the Content Bubble</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building a movie recommender. If you only use a **Performance Element**, it will only suggest movies the user already likes (The Bubble). Your project is to add a **Problem Generator** that occasionally suggests a totally different genre to "Probe" the user's hidden interests.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <RefreshCw size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Probe</div>
                            <p className="text-[8px] mt-1">Experimental Suggester</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Eye size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Audit</div>
                            <p className="text-[8px] mt-1">Critic (User Rating)</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <GraduationCap size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Update</div>
                            <p className="text-[8px] mt-1">Learning Engine</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Architectural Mastery"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'List the four main components of a Learning Agent.', a: 'Learning Element, Performance Element, Critic, and Problem Generator.' },
                        { q: 'What is the specific role of the "Problem Generator"?', a: 'It suggests actions that will lead to new and informative experiences, ensuring the agent continues to explore rather than getting stuck in its current routine.' },
                        { q: 'Why is the "Critic" separate from the "Learning Element"?', a: 'So that the evaluation standard remains objective and fixed, preventing the agent from "lying" to itself about its own performance to make its learning look better.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Learning Agent Architecture" 
                subtitle="The 4-Part Brain"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Environment Complexity Ladder"
                    description="Scale from simple to complex environments"
                    objective="Run the same agent in increasingly complex environments. Observe when the agent fails and why."
                    badge="Interactive Lab"
                    tips={['Simple agents fail in complex environments',
                'POMDP environments require belief-state tracking']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore the internal structure that allows an AI to learn from its environment. Click each component to see its specific role in the "Learning Loop."
                    </p>
                    <LearningAgentLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Architecture: Mastered!</h3>
                    <p className="text-primary-100">
                        You've completed the fundamentals of Intelligent Systems. Now, let's dive into the core of RL algorithms: Monte Carlo Methods.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MONTE CARLO METHODS
                    </button>
                </div>
            </div>
        </div>
    );
}
