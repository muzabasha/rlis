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
    Globe,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    Search,
    Brain,
    Rocket,
    Activity,
    Settings,
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
    Timer,
    Users2,
    Infinity as InfinityIcon,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Environment Types Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Environment Types Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Environment Types simulator.",
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
    "🤖 [System] Initializing Environment Types Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Environment Types\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 7 ──────────────────────────────────────

/**
 * World Dimension Explorer: Classifying Task Environments
 */
function WorldLab() {
    const [selectedEnv, setSelectedEnv] = useState(0);

    const worldTypes = [
        {
            name: 'Static vs Dynamic',
            desc: 'Does the world change while the agent is thinking?',
            example: 'Chess (Static) vs. Taxi Driving (Dynamic)',
            icon: Timer
        },
        {
            name: 'Discrete vs Continuous',
            desc: 'Are states and actions countable or infinite?',
            example: 'Tic-Tac-Toe (Discrete) vs. Robot Arm (Continuous)',
            icon: InfinityIcon
        },
        {
            name: 'Single vs Multi-Agent',
            desc: 'Is the agent alone or interacting with others?',
            example: 'Crossword (Single) vs. Poker (Multi)',
            icon: Users2
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {worldTypes.map((w, i) => {
                    const Icon = w.icon;
                    return (
                        <button
                            key={i}
                            onClick={() => setSelectedEnv(i)}
                            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-3 ${
                                selectedEnv === i 
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                            }`}
                        >
                            <div className={`p-3 rounded-xl ${selectedEnv === i ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                <Icon size={20} />
                            </div>
                            <span className={`text-[10px] font-black uppercase ${selectedEnv === i ? 'text-primary-600' : 'text-slate-500'}`}>{w.name}</span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedEnv}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-primary-500">
                            {React.createElement(worldTypes[selectedEnv].icon, { size: 32 })}
                        </div>
                        <h4 className="text-xl font-black text-slate-800 dark:text-white">{worldTypes[selectedEnv].name}</h4>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                        "{worldTypes[selectedEnv].desc}"
                    </p>

                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Real-World Case</span>
                        <span className="text-xs font-bold text-primary-600">{worldTypes[selectedEnv].example}</span>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic7_EnvironmentTypes() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic7_environmenttypes" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Seven Dimensions of Difficulty" 
                subtitle="Classifying the Agent's World"
                icon={<Globe className="text-blue-600" size={24} />}
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
                                "Discrete, continuous, episodic... the universe has many flavors, and agents complain about all of them."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Map size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🎭 The Stage is Set
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                An agent is like an actor on a stage. If the stage is **Static** (the props don't move), the performance is easy to rehearse. But if the stage is **Dynamic** (other actors are moving props around while you're talking), you need to be much smarter.
                            </p>
                            <p>
                                Every "Environment" an AI operates in can be categorized across several dimensions. Is it **Discrete** like a chessboard or **Continuous** like a race track? Is it **Single-Agent** like a crossword puzzle or **Multi-Agent** like a game of football?
                            </p>
                            <p>
                                Identifying the type of environment is the first thing an AI engineer does. It tells you which algorithms will work and which will fail spectacularly.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Complexity Ceiling">
                            The "Ultimate Boss" of AI environments is one that is **Partially Observable, Stochastic, Dynamic, and Multi-Agent**. This is effectively the real world.
                        </InfoCard>
                        <InfoCard type="tip" title="Dimensional Analysis">
                            Always ask: "Does the future depend on the past?" If yes, your environment is **Sequential**.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            
            {/* SECTION 2: MOTIVATION & APPLICATION CHALLENGE */}
            <SectionWrapper
                id="motivation"
                title="7. Motivation & Application Challenge"
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
                                Classifying the operational space of an automated warehouse floor to select the correct navigation sensors.
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
                            Essential to understand properties like determinism, observability, and dynamicity to ensure chosen algorithms can succeed.
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
                                    Saves project resources by matching agent design assumptions with environment physics.
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
                                    Over-simplifying environment dynamic traits can lead to severe safety failures in real deployments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="7. Modelling Dimensions" 
                subtitle="Formalizing the Constraints"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\mathcal{E} = \{D_{obs}, D_{sto}, D_{seq}, D_{dyn}, D_{con}, D_{mul}\}"
                        label="The Environment Vector (\mathcal{E})"
                        explanation="The set of dimensions that define the task environment."
                        interpretation="Each dimension D is a binary or continuous scale. For example, D_obs = 1 (Fully Observable) or 0 (Partially Observable). This vector allows us to compare the difficulty of different AI tasks."
                        motivation="By quantifying the environment, we can choose the mathematical framework (e.g., MDP for stochastic/sequential worlds) that best fits the problem."
                        terms={[
                            { term: 'D_{dyn}', name: 'Dynamism', meaning: 'If the environment can change while the agent is deliberating.', range: '{0, 1}', example: '1 for a robot navigating a crowd.' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Discrete vs. Continuous Math</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            **Discrete** environments use Summation ($\sum$); **Continuous** environments require Integration ($\int$) and Calculus to model.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Environment Types Architecture"
                description="Detailed environment classification matrix."
                chart={`graph LR
    Env[Environment]
    Env --> O[Observability: Full/Partial]
    Env --> A[Agents: Single/Multi]
    Env --> D[Determinism: Deterministic/Stochastic]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="7. Activity: Environment Classifier" 
                subtitle="The Consultant's Audit"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Audit the Poker Table</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium">
                            Is a game of Poker:
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase">Observability</h5>
                                <p className="text-[10px] text-slate-600 mt-1">Partially Observable (you can't see the opponent's cards).</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase">Agents</h5>
                                <p className="text-[10px] text-slate-600 mt-1">Multi-Agent (Competitive).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="7. Project: Smart City Design" 
                subtitle="Engineering the Infrastructure"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Automated Intersection</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are designing a traffic light system that talks to self-driving cars. **Environment**: Multi-agent (cars and other lights), Dynamic (traffic changes constantly), Continuous (car positions), and Stochastic (accidents). Your project is to define the **Safety Constraints** for such a chaotic environment.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Users2 size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Conflict</div>
                            <p className="text-[8px] mt-1">Multi-Agent Logic</p>
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center text-primary-500">
                            <Timer size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Speed</div>
                            <p className="text-[8px] mt-1">Dynamic Response</p>
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center text-emerald-600">
                            <Shield size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Goal</div>
                            <p className="text-[8px] mt-1">Fail-Safe Design</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="7. Quick Check" 
                subtitle="Environmental Mastery"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Differentiate between a Static and a Dynamic environment.', a: 'A Static environment doesn\'t change while the agent is deliberating (e.g., Crossword); a Dynamic environment keeps changing (e.g., Taxi driving).' },
                        { q: 'What is a "Continuous" environment?', a: 'One where the number of possible states or actions is infinite (e.g., the exact angle of a robotic joint or the velocity of a car).' },
                        { q: 'Why is a Multi-Agent environment more complex than a Single-Agent one?', a: 'Because the agent must account for the decisions of other agents, whose goals may be competitive (opposing) or cooperative (shared).' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: World Dimension Explorer" 
                subtitle="Categorize the Stage"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Environment Property Lab"
                    description="Classify environments by their properties"
                    objective="Drag environment examples into the correct classification (Deterministic/Stochastic, Episodic/Sequential, etc.)."
                    badge="Interactive Lab"
                    tips={['Chess: deterministic, fully observable, sequential, static',
                'Poker: stochastic, partially observable, sequential, static']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore the different dimensions that define the complexity of an AI's task. Click through the categories to see real-world examples and the mathematical challenges they present.
                    </p>
                    <WorldLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Environments: Mastered!</h3>
                    <p className="text-primary-100">
                        You've mapped the terrain. Now, let's explore the final piece of the puzzle—the detailed types of Agents that navigate these worlds.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: AGENT TYPES (DETAILED)
                    </button>
                </div>
            </div>
        </div>
    );
}
