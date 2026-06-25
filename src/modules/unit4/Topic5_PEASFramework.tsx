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
import { OptimalPolicyVis } from '../../components/visualizers';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    ClipboardList,
    Target,
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
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "P E A S Framework Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "P E A S Framework Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the P E A S Framework simulator.",
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
    "🤖 [System] Initializing P E A S Framework Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"P E A S Framework\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 5 ──────────────────────────────────────

/**
 * PEAS Configurator: Mapping Agent Architectures
 */
function PEASLab() {
    const [selectedAgent, setSelectedAgent] = useState(0);

    const agents = [
        {
            name: 'Taxi Driver',
            P: 'Safe, fast, legal, comfortable, profit.',
            E: 'Roads, other traffic, pedestrians, customers.',
            A: 'Steering, accelerator, brake, signal, horn.',
            S: 'Cameras, LIDAR, GPS, speedometer, engine sensors.',
            icon: Move
        },
        {
            name: 'Medical Diagnosis',
            P: 'Healthy patient, low cost, no lawsuits.',
            E: 'Patient, hospital, staff.',
            A: 'Display diagnosis, treatment plan, referrals.',
            S: 'Symptoms, patient findings, lab results.',
            icon: Activity
        },
        {
            name: 'Refining Robot',
            P: 'Purity of metal, energy efficiency, safety.',
            E: 'Furnace, raw materials, conveyor belt.',
            A: 'Heat control, flow valve, emergency stop.',
            S: 'Temp sensors, chemical analyzers, pressure gauges.',
            icon: Settings
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Agent Menu */}
                <div className="w-full md:w-1/3 space-y-2">
                    {agents.map((agent, i) => (
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
                                {React.createElement(agents[selectedAgent].icon, { size: 18 })}
                            </div>
                            <span className={`text-xs font-bold ${selectedAgent === i ? 'text-primary-600' : 'text-slate-500'}`}>{agent.name}</span>
                        </button>
                    ))}
                </div>

                {/* PEAS Display */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedAgent}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="contents"
                        >
                            <div className="p-5 bg-red-50 dark:bg-red-900/20 rounded-3xl border border-red-100 dark:border-red-900/30">
                                <h5 className="text-[10px] font-black text-red-500 uppercase mb-2">Performance (P)</h5>
                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{agents[selectedAgent].P}</p>
                            </div>
                            <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
                                <h5 className="text-[10px] font-black text-emerald-500 uppercase mb-2">Environment (E)</h5>
                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{agents[selectedAgent].E}</p>
                            </div>
                            <div className="p-5 bg-primary-50 dark:bg-primary-900/20 rounded-3xl border border-primary-100 dark:border-primary-900/30">
                                <h5 className="text-[10px] font-black text-primary-500 uppercase mb-2">Actuators (A)</h5>
                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{agents[selectedAgent].A}</p>
                            </div>
                            <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-900/30">
                                <h5 className="text-[10px] font-black text-amber-500 uppercase mb-2">Sensors (S)</h5>
                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{agents[selectedAgent].S}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic5_PEASFramework() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic5_peasframework" />

            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => { const d = getTopicData('unit4', 'Topic5_PEASFramework'); if (!d) return null; return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{d.prerequisites.map((p,i) => <li key={i}>{p}</li>)}</ul>); })()}
                </div>
            </SectionWrapper>
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Designer's Blueprint" 
                subtitle="The PEAS Framework"
                icon={<ClipboardList className="text-blue-600" size={24} />}
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
                                "Performance, Environment, Actuators, Sensors. It's like the anatomy of a robot, but without the messy biology."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Target size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            📋 Starting with the End in Mind
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Before you write a single line of code for an AI, you must define its world. If you don't know what it's trying to achieve, what it can see, or what it can do, it will never be intelligent.
                            </p>
                            <p>
                                **PEAS** (Performance, Environment, Actuators, Sensors) is the industry-standard blueprint for designing intelligent systems. It forces you to think like an engineer:
                            </p>
                            <ul className="list-disc list-inside space-y-2 font-medium">
                                <li>What is the score? (**Performance**)</li>
                                <li>Where is it? (**Environment**)</li>
                                <li>How does it act? (**Actuators**)</li>
                                <li>What can it see? (**Sensors**)</li>
                            </ul>
                            <p>
                                Without a clear PEAS specification, an agent is just a "black box" without a purpose. With it, every decision the agent makes can be measured against its performance goal.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Rational Agent">
                            A system is "Rational" if it picks the action that maximizes its **Performance Measure**, given its **Sensor** history.
                        </InfoCard>
                        <InfoCard type="tip" title="Design First">
                            80% of AI failure comes from poorly defined Performance Measures. If you tell a robot to "Clean fast", it might just hide dirt under the rug!
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
                                Fully specifying the Performance metrics, Environment bounds, Actuators, and Sensors (PEAS) for a surgical suturing robot.
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
                            The essential first step in modern agent design, forcing developer clarity before any hardware or software is built.
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
                                    Standardizes requirements and design parameters; ensures that sensors and actuators match performance goals.
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
                                    Highly rigid frameworks can fail to capture fuzzy, emergent behaviors of multi-agent social spaces.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Modelling Rationality" 
                subtitle="The PEAS Equation"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock 
                        formula="\\pi^*(s) = \\arg\\max_a \\mathbb{E}[P \\mid S, A, E]"
                        label="The Optimal PEAS Policy (\pi^*)"
                        accent="blue"
                        explanation="Choosing the action 'a' that results in the highest expected performance 'P'."
                        interpretation="The agent's 'Intelligence' is its ability to map its perceptions (S) to actions (A) that achieve the goal (P) in its world (E). The math is the same whether the agent is a chess engine or a medical bot."
                        motivation="This formula bridges the gap between hardware (Sensors/Actuators) and software (Policy/Learning)."
                        terms={[
                            { term: 'P', name: 'Performance Measure', meaning: 'The scalar value defined by the designer to judge the agent\'s success.', range: '\\mathbb{R}', example: 'Customer Satisfaction Score.' },
                            { term: 'E', name: 'Environment', meaning: 'The external world the agent operates in.', range: '-', example: 'The Global Internet.' }
                        ]}
                    />
                    <OptimalPolicyVis />

                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="P E A S Framework Architecture"
                description="Performance, Environment, Actuators, Sensors framework."
                chart={`graph TD
    Task[Task Environment]
    Task --> P[Performance Measure: Goals]
    Task --> E[Environment: Surroundings]
    Task --> A[Actuators: Output mechanisms]
    Task --> S[Sensors: Input data]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Activity: The PEAS Builder" 
                subtitle="Specify the Agent"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Design Challenge: Mars Rover</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            Fill in the PEAS for a NASA Mars Rover:
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-red-500 uppercase">Performance</h5>
                                <p className="text-[10px] text-slate-500 mt-1">Science data collected, rover safety.</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-emerald-500 uppercase">Environment</h5>
                                <p className="text-[10px] text-slate-500 mt-1">Mars surface, thin atmosphere.</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-primary-500 uppercase">Actuators</h5>
                                <p className="text-[10px] text-slate-500 mt-1">Wheels, drill, camera arm.</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black text-amber-500 uppercase">Sensors</h5>
                                <p className="text-[10px] text-slate-500 mt-1">LIDAR, thermometers, spectrometers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Chatbot Architect" 
                subtitle="Defining Digital Service Agents"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Building Customer Support</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are hired to build a chatbot for a bank. **Performance**: Solve customer issues in {'<'} 3 messages without human escalation. **Environment**: Web chat interface, bank database. **Actuators**: Display text, reset passwords, lock cards. **Sensors**: Text input from user, account status flags.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Layers size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Architecture</div>
                            <p className="text-[8px] mt-1">PEAS Specification</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Search size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Validation</div>
                            <p className="text-[8px] mt-1">Rationality Check</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Globe size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Deployment</div>
                            <p className="text-[8px] mt-1">Real-world Testing</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Framework Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What does the acronym PEAS stand for?', a: 'Performance (success criteria), Environment (external world), Actuators (output hardware/software), and Sensors (input hardware/software).' },
                        { q: 'Why is it important to define the Environment before the Actuators?', a: 'Because the actuators must be capable of interacting with the specific environment (e.g., you can\'t use wheels as actuators in a deep-sea environment).' },
                        { q: 'Give an example of a Performance Measure for an automated stock trader.', a: 'Total profit over a 12-month period, adjusted for risk (e.g., Sharpe Ratio) and transaction costs.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: PEAS Configurator" 
                subtitle="Blueprint for Success"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="PEAS Designer"
                    description="Build a PEAS specification for any agent"
                    objective="Choose an agent type and fill in its PEAS components. Validate that your specification is complete and consistent."
                    badge="Interactive Lab"
                    tips={['Every robotic system can be described with PEAS',
                'Missing a sensor in S means the agent is partially observable']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select different agent archetypes to see how their PEAS components are defined. Notice how shifting the environment (e.g., from a road to a hospital) completely changes the required sensors and actuators.
                    </p>
                    <PEASLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => { const d = getTopicData('unit4', 'Topic5_PEASFramework'); if (!d) return null; return <FeedbackMCQ questions={d.mcqs} />; })()}
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                    {/* RECAP */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Topic Recap</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic5_PEASFramework'); if (!d) return null; return (
                            <ol className="text-left space-y-2 text-sm">{d.recap.map((p,i) => <li key={i} className="flex gap-2"><span className="font-bold">{i+1}.</span>{p}</li>)}</ol>
                        ); })()}
                    </div>
                    {/* SKILL MAPPING */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Skill Mapping</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic5_PEASFramework'); if (!d) return null; return (
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
                        NEXT: TYPES OF AGENTS
                    </button>
                </div>
            </div>
        </div>
    );
}
