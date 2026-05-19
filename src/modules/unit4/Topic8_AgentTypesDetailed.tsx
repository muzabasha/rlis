import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock,
    SymbolTable } from '../../components/topic/MathBlock';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Bot,
    Settings,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    Search,
    Brain,
    Globe,
    Rocket,
    Activity,
    Cpu,
    HardDrive,
    Target,
    Briefcase,
    Shield,
    Move,
    MousePointer2,
    User,
    Layout,
    Map,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Agent Types Detailed Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Agent Types Detailed Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Agent Types Detailed simulator.",
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
    "🤖 [System] Initializing Agent Types Detailed Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Agent Types Detailed\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 8 ──────────────────────────────────────

/**
 * Agent Brain Comparison: Deep dive into internal structures
 */
function AgentBrainLab() {
    const [selectedAgent, setSelectedAgent] = useState(0);

    const agentBrains = [
        {
            name: 'Model-Based',
            slogan: 'I track what I can\'t see.',
            logic: 'State_{t+1} = Update(State_t, Action_t, Percept_{t+1})',
            desc: 'This agent maintains an internal "Map" or "Model" of the world. Even if it loses sight of an object, it remembers where it was based on its history.',
            icon: Map
        },
        {
            name: 'Goal-Based',
            slogan: 'I know where I want to go.',
            logic: 'Action = FindPath(CurrentState, GoalState)',
            desc: 'This agent has a specific target (a goal). It evaluates every action based on whether it brings it closer to that target.',
            icon: Target
        },
        {
            name: 'Utility-Based',
            slogan: 'I want to be as happy as possible.',
            logic: 'Action = \arg\max_a U(Result(State, a))',
            desc: 'This agent doesn\'t just want a goal; it wants the "best" goal. It uses a Utility function to measure how "happy" (or efficient) a state is.',
            icon: Activity
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Brain Type Menu */}
                <div className="w-full md:w-1/3 space-y-2">
                    {agentBrains.map((brain, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedAgent(i)}
                            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 text-left ${
                                selectedAgent === i 
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                            }`}
                        >
                            <div className={`p-2 rounded-lg ${selectedAgent === i ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                {React.createElement(brain.icon, { size: 18 })}
                            </div>
                            <div>
                                <span className={`text-xs font-bold block ${selectedAgent === i ? 'text-primary-600' : 'text-slate-500'}`}>{brain.name}</span>
                                <span className="text-[10px] text-slate-400">{brain.slogan}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Brain Insight Panel */}
                <div className="flex-1 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedAgent}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-primary-500">
                                    {React.createElement(agentBrains[selectedAgent].icon, { size: 32 })}
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-800 dark:text-white">{agentBrains[selectedAgent].name} Brain</h4>
                                    <p className="text-sm text-slate-500 font-medium italic">"{agentBrains[selectedAgent].slogan}"</p>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {agentBrains[selectedAgent].desc}
                            </p>

                            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                                <div className="text-[10px] font-black text-primary-400 uppercase mb-2">Mathematical Logic</div>
                                <code className="text-xs text-white block font-mono">
                                    {agentBrains[selectedAgent].logic}
                                </code>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic8_AgentTypesDetailed() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic8_agenttypesdetailed" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Beyond the Reflex" 
                subtitle="The Evolution of Agency"
                icon={<Settings className="text-blue-600" size={24} />}
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
                                "From simple reflexes to learning agents, it's the evolutionary tree of things that will eventually automate our chores."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Brain size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🧭 Finding the Way
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a robot vacuum cleaner. A **Reflex** version just bumps into a wall and turns. A **Model-Based** version remembers where the wall is, even when it's facing the other way.
                            </p>
                            <p>
                                Now, imagine you tell it "Clean the kitchen by 6 PM." Now it's a **Goal-Based Agent**. It has to plan a sequence of actions to meet that deadline. 
                            </p>
                            <p>
                                Finally, imagine you tell it "Clean the kitchen, but use the least amount of electricity possible." Now it's a **Utility-Based Agent**. It's not just reaching a goal; it's optimizing for a "happiness" score (Utility).
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Internal Model">
                            The "Model" is the agent's internal representation of how the world works. It allows the agent to simulate "What if?" before actually moving.
                        </InfoCard>
                        <InfoCard type="tip" title="Utility is Scalar">
                            In math, Utility is usually a single number. The agent's whole life is dedicated to making that number as big as possible.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            
            {/* SECTION 2: MOTIVATION & APPLICATION CHALLENGE */}
            <SectionWrapper
                id="motivation"
                title="2. Motivation & Application Challenge"
                subtitle="Why study this topic?"
                icon={<Lightbulb className="text-amber-500" size={24} />}
                badge="Motivation"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
            >
                <div className="space-y-6">
                    {/* APPLICATION CHALLENGE CARD */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900 shadow-sm flex items-start gap-4 animate-fade-in">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-2xl">
                            🚀
                        </div>
                        <div className="space-y-2">
                            <h5 className="font-bold text-amber-900 dark:text-amber-100 text-base">
                                Application-Specific Challenge
                            </h5>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                Choosing between reflex, model-based, goal-based, or utility-based agent architectures for a complex automated driving assistant.
                            </p>
                        </div>
                    </div>

                    {/* THE NEED TO STUDY */}
                    <div className="bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Target className="text-primary-500" size={16} />
                            The Need to Study this Topic
                        </h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Crucial to know how to select and scale the agent's internal reasoning architecture to match the environment's complexity.
                        </p>
                    </div>

                    {/* ADVANTAGES & DISADVANTAGES */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-emerald-950 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">
                                    Advantages
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Provides a comprehensive roadmap of agent designs from basic reactive reflexes to self-optimizing utility systems.
                                </p>
                            </div>
                        </div>

                        <div className="bg-rose-50/50 dark:bg-rose-950/10 p-5 rounded-2xl border border-rose-100 dark:border-rose-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <AlertTriangle className="text-rose-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-rose-900 dark:text-rose-400 text-xs uppercase tracking-wider mb-1">
                                    Disadvantages / Bottlenecks
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Advanced agent architectures (like utility-based) require enormous computing power to plan decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Utility Function" 
                subtitle="Quantifying Happiness"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="a^* = \arg\max_a \sum_{s'} P(s' \mid s, a) U(s')"
                        label="Maximum Expected Utility (MEU)"
                        explanation="The formula for a rational agent's decision-making."
                        interpretation="A utility-based agent calculates the probability (P) of ending up in a next state (s') for each action (a), and chooses the action that gives the highest average happiness (U)."
                        motivation="This is the gold standard for AI rationality. It accounts for both uncertainty (Probabilities) and preferences (Utility)."
                        terms={[
                            { term: 'U(s\')', name: 'Utility of State', meaning: 'How desirable a specific state is.', range: '\mathbb{R}', example: 'Win = +100, Loss = -100.' },
                            { term: 'P(s\' \mid s, a)', name: 'Transition Probability', meaning: 'The chance of action (a) in state (s) leading to state (s\').', range: '[0, 1]', example: '0.8 (80% success).' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Goal vs Utility</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            A **Goal** is binary (Success/Failure). **Utility** is continuous (How successful?).
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Agent Types Detailed Architecture"
                description="Learning Agent Architecture."
                chart={`graph TD
    Critic --> |Feedback| Learning[Learning Element]
    Learning --> |Changes| Perf[Performance Element]
    Perf --> |Knowledge| Gen[Problem Generator]
    Gen --> |Exploration| Actuators`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Activity: Brain Upgrade" 
                subtitle="Evolution of a Delivery Drone"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Drone Design Challenge</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">
                            How does the drone's logic change as we upgrade it?
                        </p>
                        <div className="space-y-3">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <span className="text-[10px] font-bold">Reflex</span>
                                <span className="text-[10px] text-slate-400 italic">"If sensor detects tree, turn left."</span>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <span className="text-[10px] font-bold">Goal-Based</span>
                                <span className="text-[10px] text-slate-400 italic">"Fly to Latitude 40.7, Longitude -74.0."</span>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-primary-500 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-primary-600">Utility-Based</span>
                                <span className="text-[10px] text-slate-400 italic">"Find the path that is shortest AND avoids high-wind areas."</span>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Smart Thermostat (Advanced)" 
                subtitle="From On/Off to Optimization"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Energy Miser</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Your task is to design the Utility Function for a smart home heater. It needs to balance two conflicting goals: **User Comfort** (Warmth) and **Cost** (Electricity usage). If you make it too warm, the utility drops due to cost. If you make it too cheap, the utility drops because the user is cold.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Binary size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Utility (U)</div>
                            <p className="text-[8px] mt-1">Comfort - Cost</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Activity size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Decision</div>
                            <p className="text-[8px] mt-1">Maximize Expected U</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Shield size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Result</div>
                            <p className="text-[8px] mt-1">Efficient Comfort</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Brain Archetypes"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the "Utility Function" in an agent?', a: 'A mathematical mapping from a state (or sequence of states) to a real number that represents the agent\'s level of "happiness" or success in that state.' },
                        { q: 'Why is a Model-Based agent more robust than a Reflex agent?', a: 'Because it can handle partial observability by maintaining an internal state that tracks objects or information it can no longer see through its sensors.' },
                        { q: 'When would you prefer a Goal-Based agent over a Utility-Based one?', a: 'When the outcome is binary (you either win or you don\'t) and there is no need to optimize for factors like cost, speed, or comfort.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Agent Brain Comparison" 
                subtitle="Analyze Internal Architectures"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Agent Architecture Comparator"
                    description="Compare all 5 agent architectures"
                    objective="Run Simple Reflex, Model-Based, Goal-Based, Utility-Based, and Learning agents on the same task. Compare performance."
                    badge="Interactive Lab"
                    tips={['Each architecture handles different types of complexity',
                'Learning agents improve over time — the others do not']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore the different ways an agent's "Brain" can be structured. Notice how information is added at each step—from tracking hidden state to optimizing for complex utilities.
                    </p>
                    <AgentBrainLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Agent Types: Decoded!</h3>
                    <p className="text-primary-100">
                        You've seen the hierarchy of intelligence. Now, let's explore the final, most advanced type of brain: the Learning Agent.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: LEARNING AGENTS
                    </button>
                </div>
            </div>
        </div>
    );
}
