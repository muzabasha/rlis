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
import { BellmanOptimalityVis } from '../../components/visualizers';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Layout,
    Shield,
    Search,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    TrendingUp,
    Brain,
    Globe,
    Rocket,
    Activity,
    Settings,
    Cpu,
    HardDrive,
    Target,
    Briefcase,
    Stethoscope,
    Factory,
    Landmark,
    Truck,
    MessageSquare,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "I S Applications Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "I S Applications Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the I S Applications simulator.",
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
    "🤖 [System] Initializing I S Applications Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"I S Applications\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 4 ──────────────────────────────────────

/**
 * Impact Map: Industry-specific applications
 */
function ImpactLab() {
    const [selectedSector, setSelectedSector] = useState(0);

    const sectors = [
        { 
            title: 'Healthcare', 
            icon: Stethoscope, 
            app: 'Diagnostic Assistance', 
            benefit: '99% accuracy in tumor detection.',
            math: 'Image Classification (CNNs)',
            desc: 'AI systems analyze MRI and CT scans to spot anomalies that might be invisible to the human eye, providing a vital second opinion for doctors.'
        },
        { 
            title: 'Finance', 
            icon: Landmark, 
            app: 'Fraud Detection', 
            benefit: 'Billions of dollars saved annually.',
            math: 'Anomaly Detection',
            desc: 'Every time you swipe your credit card, an intelligent system analyzes the location, amount, and frequency to ensure it is actually you.'
        },
        { 
            title: 'Logistics', 
            icon: Truck, 
            app: 'Route Optimization', 
            benefit: '15% reduction in carbon footprint.',
            math: 'TSP / Reinforcement Learning',
            desc: 'Delivery giants use RL to optimize thousands of routes in real-time, accounting for traffic, weather, and fuel efficiency.'
        },
        { 
            title: 'Industry 4.0', 
            icon: Factory, 
            app: 'Predictive Maintenance', 
            benefit: 'Zero unplanned downtime.',
            math: 'Time-Series Prediction',
            desc: 'Sensors in factory machines predict when a part is about to fail before it actually does, allowing for proactive repairs.'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sectors.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <button
                            key={i}
                            onClick={() => setSelectedSector(i)}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                                selectedSector === i 
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                            }`}
                        >
                            <div className={`p-3 rounded-xl ${selectedSector === i ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                <Icon size={20} />
                            </div>
                            <span className={`text-[10px] font-black uppercase ${selectedSector === i ? 'text-primary-600' : 'text-slate-500'}`}>{s.title}</span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedSector}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="space-y-2">
                            <h4 className="text-xl font-black text-slate-800 dark:text-white">{sectors[selectedSector].app}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                "{sectors[selectedSector].desc}"
                            </p>
                        </div>
                        <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-[10px] font-black uppercase whitespace-nowrap">
                            Impact: {sectors[selectedSector].benefit}
                        </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Binary size={14} className="text-primary-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase">Underlying Model</span>
                        </div>
                        <code className="text-xs font-mono text-primary-600 font-bold">{sectors[selectedSector].math}</code>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic4_ISApplications() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic4_isapplications" />

            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => { const d = getTopicData('unit4', 'Topic4_ISApplications'); if (!d) return null; return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{d.prerequisites.map((p,i) => <li key={i}>{p}</li>)}</ul>); })()}
                </div>
            </SectionWrapper>
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Invisible Force" 
                subtitle="Intelligence in the Background"
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
                                "They are in your phone, your car, and your fridge. Yes, your smart fridge is definitely judging your midnight snacking."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Search size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌐 A Day in the Life of AI
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                You woke up this morning because your phone's **Intelligent Alarm** tracked your sleep cycle. You checked the weather, which was predicted by a **Deep Learning Model**. You drove to work using a route optimized by **Reinforcement Learning**.
                            </p>
                            <p>
                                Intelligent Systems are no longer futuristic concepts; they are the "invisible force" that keeps modern civilization running efficiently. They are solving problems that are too big for humans to track and too complex for simple code to solve.
                            </p>
                            <p>
                                From saving lives in hospitals to saving energy in power grids, these systems are taking the mathematical principles we've learned and applying them at a global scale.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Automation Paradox">
                            As systems become more intelligent, they don't just replace humans; they amplify human capability, allowing doctors to be more accurate and engineers to be more creative.
                        </InfoCard>
                        <InfoCard type="tip" title="Data is the Fuel">
                            Every application you see relies on a massive influx of data to train its "Intelligence."
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
                                Designing an automated medical diagnostic helper that integrates real-time visual analysis, patient history, and text reports.
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
                            Explores how abstract intelligent agent concepts scale to solve high-impact, real-world problems in medicine, automotive, and finance.
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
                                    Demonstrates high multi-disciplinary utility and direct industrial value of intelligent agents.
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
                                    Deploying statistical systems in safety-critical domains carries significant ethical and legal liabilities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Cross-Domain Formula" 
                subtitle="Generalizing the Solution"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock 
                        formula="y = \\arg\\max_{a} Q(s, a; \\theta)"
                        label="The Universal Decision Function"
                        accent="blue"
                        explanation="How an agent chooses its next application-specific action."
                        interpretation="In Healthcare, 'a' might be a diagnosis. In Finance, 'a' might be 'Block Transaction'. In Robotics, 'a' might be 'Turn Left'. The math remains the same: pick the action that maximizes the learned value Q."
                        motivation="This unity of mathematics is why one algorithm can be applied across dozens of different industries."
                        terms={[
                            { term: '\\theta', name: 'Domain Knowledge', meaning: 'The parameters learned from industry-specific data.', range: '\\mathbb{R}^n', example: 'Weights trained on cancer biopsies.' }
                        ]}
                    />
                    <BellmanOptimalityVis />

                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="I S Applications Architecture"
                description="Modern deployments of Intelligent Systems."
                chart={`graph TD
    IS[Intelligent Systems] --> NLP[Conversational Agents]
    IS --> CV[Computer Vision Systems]
    IS --> RecSys[Recommender Systems]
    IS --> Control[Autonomous Control]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Activity: Domain Mapping" 
                subtitle="Solving Industry Problems"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Match the Tech to the Task</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            Connect these tasks to their primary Intelligent System application:
                        </p>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                                <MessageSquare size={20} className="mx-auto mb-2 text-primary-500" />
                                <div className="text-[10px] font-bold">Customer Support</div>
                                <p className="text-[8px] text-slate-400 mt-1">NLP Chatbots</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                                <Shield size={20} className="mx-auto mb-2 text-indigo-500" />
                                <div className="text-[10px] font-bold">Bank Security</div>
                                <p className="text-[8px] text-slate-400 mt-1">Anomaly Detection</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                                <Target size={20} className="mx-auto mb-2 text-emerald-500" />
                                <div className="text-[10px] font-bold">Ad Targeting</div>
                                <p className="text-[8px] text-slate-400 mt-1">Recommendation Engines</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Smart Grid" 
                subtitle="Engineering Sustainability"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Zero-Waste Power</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Wind and Solar energy are unpredictable. Your project is to design an **Intelligent Dispatcher** that learns when to store energy in batteries and when to release it to the city grid. The goal is to minimize coal usage (Penalty) while ensuring no blackouts (Constraint).
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Binary size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase tracking-widest">Input</div>
                            <p className="text-[8px] mt-1">Weather Forecasts</p>
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center text-primary-500">
                            <Activity size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase tracking-widest">Action</div>
                            <p className="text-[8px] mt-1">Grid Switching</p>
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center text-emerald-600">
                            <TrendingUp size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase tracking-widest">Reward</div>
                            <p className="text-[8px] mt-1">Carbon Reduction</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Applied Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'How is an Intelligent System used in modern healthcare?', a: 'They are primarily used in medical imaging (diagnosing diseases from scans), personalized medicine (tailoring drug dosages), and robot-assisted surgery.' },
                        { q: 'Why is "Predictive Maintenance" important for Industry 4.0?', a: 'It allows factories to fix machines before they break, preventing expensive production halts and extending the lifespan of industrial equipment.' },
                        { q: 'Give an example of an Intelligent System in cybersecurity.', a: 'An Intrusion Detection System (IDS) that uses anomaly detection to spot unusual patterns of network traffic that might indicate a hack or a virus.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Impact Map" 
                subtitle="Explore Industrial Intelligence"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Smart System Showcase"
                    description="Interactive demos of IS applications"
                    objective="Interact with mini-demos of NLP, Computer Vision, and Recommender systems. Observe how each uses intelligent behaviour."
                    badge="Interactive Lab"
                    tips={['Each system uses a different form of learning',
                'Recommender systems are closest to RL — they optimize for user engagement']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select a sector to see the real-world impact of Intelligent Systems. Notice how different industries use the same mathematical models to solve completely different problems.
                    </p>
                    <ImpactLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => { const d = getTopicData('unit4', 'Topic4_ISApplications'); if (!d) return null; return <FeedbackMCQ questions={d.mcqs} />; })()}
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                    {/* RECAP */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Topic Recap</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic4_ISApplications'); if (!d) return null; return (
                            <ol className="text-left space-y-2 text-sm">{d.recap.map((p,i) => <li key={i} className="flex gap-2"><span className="font-bold">{i+1}.</span>{p}</li>)}</ol>
                        ); })()}
                    </div>
                    {/* SKILL MAPPING */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Skill Mapping</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic4_ISApplications'); if (!d) return null; return (
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
                        NEXT: PEAS FRAMEWORK
                    </button>
                </div>
            </div>
        </div>
    );
}
