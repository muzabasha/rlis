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
    Settings,
    Cpu,
    HardDrive,
    Briefcase,
    Shield,
    Move,
    MousePointer2,
    User,
    Layout,
    Map,
    Target,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Agent Types Reflex Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Agent Types Reflex Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Agent Types Reflex simulator.",
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
    "🤖 [System] Initializing Agent Types Reflex Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Agent Types Reflex\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 6 ──────────────────────────────────────

/**
 * Logic Circuit: Visualizing Agent Decision Internal Flows
 */
function AgentLogicLab() {
    const [selectedAgent, setSelectedAgent] = useState(0);

    const agentFlows = [
        {
            name: 'Simple Reflex',
            tagline: 'See → Act',
            flow: ['Percept', 'Condition-Action Rule', 'Action'],
            logic: 'If (Percept == X) then (Action = Y)',
            complexity: 'Low',
            icon: Zap
        },
        {
            name: 'Model-Based',
            tagline: 'See + History → Act',
            flow: ['Percept', 'Internal State', 'How world evolves', 'Action'],
            logic: 'Current Percept + Past Knowledge = Current Decision',
            complexity: 'Medium',
            icon: Map
        },
        {
            name: 'Goal-Based',
            tagline: 'See + Goal → Act',
            flow: ['Percept', 'Internal State', 'Goals', 'Action Selection', 'Action'],
            logic: 'What action gets me closer to my Target?',
            complexity: 'High',
            icon: Rocket
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Agent Type Selector */}
                <div className="w-full md:w-1/3 space-y-2">
                    {agentFlows.map((flow, i) => (
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
                                {React.createElement(flow.icon, { size: 18 })}
                            </div>
                            <div>
                                <span className={`text-xs font-bold block ${selectedAgent === i ? 'text-primary-600' : 'text-slate-500'}`}>{flow.name}</span>
                                <span className="text-[10px] text-slate-400">{flow.tagline}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Logic Flow Visualization */}
                <div className="flex-1 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col justify-center min-h-[350px]">
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {agentFlows[selectedAgent].flow.map((step, i) => (
                                <React.Fragment key={i}>
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        key={step}
                                        className="px-3 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 shadow-sm text-[10px] font-bold text-slate-600"
                                    >
                                        {step}
                                    </motion.div>
                                    {i < agentFlows[selectedAgent].flow.length - 1 && (
                                        <ChevronRight size={14} className="text-slate-300" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                            <div className="text-[10px] font-black text-primary-400 uppercase mb-2 flex items-center gap-2">
                                <Binary size={14} /> Internal Logic
                            </div>
                            <code className="text-xs text-white block leading-relaxed italic">
                                "{agentFlows[selectedAgent].logic}"
                            </code>
                        </div>

                        <div className="flex justify-between items-center px-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Complexity Level</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                agentFlows[selectedAgent].complexity === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                                agentFlows[selectedAgent].complexity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                                {agentFlows[selectedAgent].complexity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic6_AgentTypesReflex() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic6_agenttypesreflex" />

            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => { const d = getTopicData('unit4', 'Topic6_AgentTypesReflex'); if (!d) return null; return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{d.prerequisites.map((p,i) => <li key={i}>{p}</li>)}</ul>); })()}
                </div>
            </SectionWrapper>
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Hierarchy of Brains" 
                subtitle="From Insects to Architects"
                icon={<Bot className="text-blue-600" size={24} />}
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
                                "Simple reflex agents are the knee-jerk reactors of the AI world. 'See fire, run away.' No thinking required."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Cpu size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🐜 The Reflex Instinct
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                An insect doesn't "think" about where it's going. It just reacts. If it feels a breeze, it moves. If it sees light, it flies toward it. This is a **Simple Reflex Agent**. It's fast, but it can be easily fooled.
                            </p>
                            <p>
                                As we climb the ladder of intelligence, agents get "memory" (**Model-Based**), then "desire" (**Goal-Based**), and finally "values" (**Utility-Based**).
                            </p>
                            <p>
                                Choosing the right "Brain" for your agent is the most important architectural decision in AI. A reflex agent is perfect for a thermostat, but it would be a disaster for a self-driving car.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Complexity vs. Speed">
                            Simple agents are nearly instantaneous but brittle. Complex agents are robust but require more computation and time to "think."
                        </InfoCard>
                        <InfoCard type="tip" title="Hybrid Models">
                            Most modern AI (like ChatGPT or Tesla Autopilot) use a combination of all these types to handle different tasks.
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
                                Programming a fast, automated assembly line sorting arm that immediately ejects broken bottles based solely on light reflections.
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
                            Teaches the simplest, lowest-overhead agent design (Condition-Action rules) for rapid, real-time trigger reactions.
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
                                    Sub-millisecond latency; extremely simple to code, test, and mathematically verify.
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
                                    Lacks memory or state planning; fails completely in even mildly partially observable or sequential environments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Modelling the Agent Function" 
                subtitle="Quantifying Information Flow"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="f: \mathcal{P}^* \to \mathcal{A}"
                        label="The Agent Function (f)"
                        explanation="Mapping the entire history of percepts (P*) to an action (A)."
                        interpretation="The agent's internal logic is a function that looks at everything it has ever seen and decides what to do next. For a reflex agent, this function only looks at the very last P. For a model-based agent, it looks at the whole sequence."
                        motivation="This abstraction allows us to treat any agent—from a simple IF-statement to a billion-parameter neural network—as a single mathematical mapping."
                        terms={[
                            { term: '\mathcal{P}^*', name: 'Percept History', meaning: 'The sequence of everything the agent has sensed since it was turned on.', range: '-', example: 'Last 10 frames of camera data.' },
                            { term: '\mathcal{A}', name: 'Action Space', meaning: 'The set of all possible moves the agent can make.', range: '-', example: '{Move, Stop}.' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Reflex Logic</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            For a Simple Reflex Agent, the function simplifies to: <br/>
                            <span className="text-sm font-mono text-white">f(p_t) = a_t</span>
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Agent Types Reflex Architecture"
                description="Simple Reflex Agent Architecture."
                chart={`graph TD
    Sen[Sensors] --> State[What the world is like now]
    State --> Rules[Condition-Action Rules]
    Rules --> Action[What action I should do now]
    Action --> Act[Actuators]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Activity: Brain Selector" 
                subtitle="Match the Logic to the Task"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Which Agent is Best?</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                            A robot is navigating a maze it has never seen before. It needs to remember where it has already been.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-red-100 opacity-50">
                                <h5 className="text-[10px] font-black text-red-500 uppercase">Simple Reflex</h5>
                                <p className="text-[8px] text-slate-500 mt-1">"I just move forward until I hit a wall." (Fail: will get stuck in loops)</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-500 ring-2 ring-emerald-500/20">
                                <h5 className="text-[10px] font-black text-emerald-500 uppercase">Model-Based</h5>
                                <p className="text-[8px] text-slate-500 mt-1">"I build a map as I move so I don't go back." (Success: handles hidden state)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Smart Thermostat" 
                subtitle="Refining the Reflex"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Optimizing Comfort</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building a thermostat. A **Simple Reflex** version turns on the heater if temp {'<'} 20°C. But if a window is open, it will waste energy. Your project is to upgrade it to a **Model-Based Agent** that checks "Is a window open?" (Hidden state) before deciding to heat.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Eye size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Perception</div>
                            <p className="text-[8px] mt-1">Temperature Probe</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Layers size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Internal State</div>
                            <p className="text-[8px] mt-1">Window Status Log</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Zap size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Action</div>
                            <p className="text-[8px] mt-1">Relay Control</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Agent Architecture"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the main limitation of a Simple Reflex Agent?', a: 'It can only operate in "fully observable" environments. If information is hidden or depends on the past, the reflex agent will fail or behave chaotically.' },
                        { q: 'How does a Model-Based Agent handle hidden information?', a: 'It maintains an "internal state" that tracks the parts of the world it can\'t currently see, using its history and knowledge of how the world evolves.' },
                        { q: 'Define a "Goal-Based Agent".', a: 'An agent that uses goal information (the desired future state) to guide its decisions, allowing it to choose between multiple paths to reach a specific destination.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Logic Circuit" 
                subtitle="Visualizing Internal Flows"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Reflex Agent Sandbox"
                    description="Build and test condition-action rules"
                    objective="Add IF-THEN rules to a reflex agent and test it in a simple grid environment. See where it fails."
                    badge="Interactive Lab"
                    tips={['Reflex agents have no memory — they cannot handle sequences',
                'Try a scenario requiring 2 steps to solve — the reflex agent will fail']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select an agent type to see how information flows from the **Percept** to the **Action**. Notice how complex agents add more "layers" of processing to handle uncertainty.
                    </p>
                    <AgentLogicLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => { const d = getTopicData('unit4', 'Topic6_AgentTypesReflex'); if (!d) return null; return <FeedbackMCQ questions={d.mcqs} />; })()}
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                    {/* RECAP */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Topic Recap</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic6_AgentTypesReflex'); if (!d) return null; return (
                            <ol className="text-left space-y-2 text-sm">{d.recap.map((p,i) => <li key={i} className="flex gap-2"><span className="font-bold">{i+1}.</span>{p}</li>)}</ol>
                        ); })()}
                    </div>
                    {/* SKILL MAPPING */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Skill Mapping</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic6_AgentTypesReflex'); if (!d) return null; return (
                            <div className="grid gap-2">{d.skillMapping.map((s,i) => (
                                <div key={i} className="flex justify-between bg-white/10 rounded-xl p-3 text-sm">
                                    <span>{s.skill}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${s.level === 'Beginner' ? 'bg-green-500/20 text-green-200' : s.level === 'Intermediate' ? 'bg-amber-500/20 text-amber-200' : 'bg-red-500/20 text-red-200'}`}>{s.level}</span>
                                </div>
                            ))}</div>
                        ); })()}
                    </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: TYPES OF ENVIRONMENTS
                    </button>
                </div>
            </div>
        </div>
    );
}
