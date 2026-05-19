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
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Briefcase,
    Target,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    TrendingUp,
    Search,
    Brain,
    CheckCircle2,
    BarChart3,
    Globe,
    Shield,
    Cpu,
    ExternalLink,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Q Learning Case Studies Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Q Learning Case Studies Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Q Learning Case Studies simulator.",
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
    "🤖 [System] Initializing Q Learning Case Studies Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Q Learning Case Studies\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 13 ─────────────────────────────────────

/**
 * Case Study Showcase: Deconstructing famous implementations
 */
function CaseStudyLab() {
    const [selectedCase, setSelectedCase] = useState(0);

    const cases = [
        { 
            title: 'Inventory Control', 
            metric: '92% Reduction in Stockouts',
            problem: 'Traditional systems failed to handle demand spikes for seasonal products.',
            solution: 'Q-Learning learned to "Pre-order" stock 2 weeks before spikes by observing leading indicators.',
            impact: 'Lower storage costs and higher customer satisfaction.',
            icon: BarChart3
        },
        { 
            title: 'Adaptive Cybersecurity', 
            metric: 'Instant Response Time',
            problem: 'Static firewalls were too slow for zero-day exploits.',
            solution: 'A Q-agent monitors packet signatures (State) and decides to Block, Filter, or Allow (Action).',
            impact: 'The agent evolves its defense policy as hackers change their attack patterns.',
            icon: Shield
        },
        { 
            title: 'Resource Allocation', 
            metric: '30% Energy Savings',
            problem: 'Cloud data centers wasted energy cooling idle servers.',
            solution: 'Q-Learning balances workload distribution and cooling intensity in real-time.',
            impact: 'Massive reduction in operational carbon footprint.',
            icon: Cpu
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="grid lg:grid-cols-3 gap-4">
                {cases.map((c, i) => {
                    const Icon = c.icon;
                    return (
                        <button
                            key={i}
                            onClick={() => setSelectedCase(i)}
                            className={`p-6 rounded-3xl border-2 transition-all text-left space-y-3 ${
                                selectedCase === i 
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                            }`}
                        >
                            <div className={`p-3 rounded-2xl w-fit ${selectedCase === i ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                <Icon size={20} />
                            </div>
                            <div>
                                <div className={`text-sm font-black ${selectedCase === i ? 'text-primary-600' : 'text-slate-500'}`}>{c.title}</div>
                                <div className="text-[10px] font-bold text-emerald-600 mt-1">{c.metric}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The Challenge</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{cases[selectedCase].problem}</p>
                        </div>
                        <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-primary-500 uppercase tracking-widest">The Q-Learning Fix</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{cases[selectedCase].solution}</p>
                        </div>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 w-full" />
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase italic">
                        <CheckCircle2 size={16} /> Final Impact: {cases[selectedCase].impact}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic13_QLearningCaseStudies() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic13_qlearningcasestudies" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Proof of Concept" 
                subtitle="Turning Theory into Enterprise Value"
                icon={<Briefcase className="text-blue-600" size={24} />}
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
                                "Real-world examples of Q-learning where the agent didn't just spin in circles endlessly."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Globe size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🏭 RL in the Boardroom
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Why do we care about Bellman Equations and Q-Updates? Because they solve problems that used to cost companies billions of dollars every year.
                            </p>
                            <p>
                                From **Logistics giants** like FedEx to **Streaming platforms** like Netflix, Q-Learning is used to navigate massive, unpredictable data landscapes.
                            </p>
                            <p>
                                In this final topic of Unit 3, we look at the specific **Case Studies** where Q-learning moved out of the research lab and into the real world, proving that "Learning by Doing" is the most efficient way for a machine to solve any human-scale problem.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Economic Impact">
                            RL-based optimization can result in 10-40% increases in efficiency for industrial systems.
                        </InfoCard>
                        <InfoCard type="tip" title="Strategic Value">
                            The true value of Q-Learning is its ability to find "Non-Intuitive" solutions that human experts might miss.
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
                                Replicating and verifying the published performance metrics of an industrial robot arm controller in a local lab setup.
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
                            Prepares students to audit, reproduce, and critically analyze empirical research and case studies.
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
                                    Builds highly critical research and verification skills; exposes real-world implementation nuances.
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
                                    Published research often omits crucial seed details, making exact duplication highly challenging.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Cross-Domain Modelling" 
                subtitle="The Universal Language of Profit"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}"
                        label="The Cumulative Goal (Return)"
                        explanation="Every case study boils down to maximizing this single variable: G."
                        interpretation="Whether the R represents 'Bottles Sold' or 'Megawatts Saved', the agent's math remains identical. It is always looking for the sum of future discounted rewards."
                        motivation="This mathematical abstraction is what makes RL 'General Intelligence'. The same formula that plays Mario can also manage a supply chain."
                        terms={[
                            { term: 'G_t', name: 'Total Return', meaning: 'The target the agent is trying to maximize.', range: '\mathbb{R}', example: 'Total profit over 1 year.' },
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center justify-between">
                        <div className="space-y-1">
                            <h5 className="font-bold text-primary-400 text-sm flex items-center gap-2"><Binary size={16} /> Algorithm: Q-Learning</h5>
                            <p className="text-[10px] text-slate-400 italic">"The reliable workhorse of industrial control."</p>
                        </div>
                        <div className="px-4 py-2 bg-primary-500/20 border border-primary-500/50 rounded-xl text-[10px] font-bold text-primary-400">
                            Status: Production Ready
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Q Learning Case Studies Architecture"
                description="Real-world implementations of Tabular Q-Learning."
                chart={`graph LR
    Grid[Gridworld Traversal] --> Train[Agent Training]
    Train --> |Episodes| Converge[Q-Table Convergence]
    Converge --> Deploy[Optimal Path Found]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="Deconstructing Success"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Case Showcase Demo",
                            objectives: "Observe the translation of high-level business success into specific RL metrics.",
                            instructions: [
                                "Open the 'Case Showcase' in the Virtual Lab section.",
                                "Select the 'Inventory Control' case. Explain: 'The +92% metric is the result of a perfectly tuned reward function.'",
                                "Select 'Adaptive Cybersecurity'. Explain: 'The agent doesn't follow rules; it follows the highest Q-value for defense.'",
                                "Show how the 'Impact' section justifies the ROI (Return on Investment) for a company.",
                                "Ask: 'Why would a data center trust an AI to manage its cooling?'"
                            ],
                            inputs: "Interactive CaseStudyLab component",
                            outputs: "Visual deconstruction of 3 major enterprise RL projects.",
                            rubrics: ["Clarity of 'Success Metric' explanation", "Link between math and business impact", "Student engagement"],
                            outcomes: "Students identify RL as a tool for creating measurable financial and operational value.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Warehouse MDP Workshop",
                            objectives: "Collaboratively architect a large-scale industrial MDP on the whiteboard.",
                            instructions: [
                                "Teacher draws a complex 10x10 warehouse grid with 'Obstacles', 'Picking Zones', and 'Charging Stations'.",
                                "Guided Architecture: 'Step 1: Define the State.' (Is it just x/y? Or battery level too?).",
                                "Guided Architecture: 'Step 2: Define the Actions.' (Move, Pick, Wait).",
                                "Class reflects: 'Where are the information bottlenecks?' (e.g., Narrow aisles where robots might collide).",
                                "Conclusion: Industrial RL requires mapping every physical constraint into the $(s, a)$ space."
                            ],
                            inputs: "Warehouse architectural floorplan",
                            outputs: "Full MDP Specification for a mobile robot on the board",
                            rubrics: ["Completeness of state variables", "Logical action-reward mapping", "Classroom participation"],
                            outcomes: "Students master the skill of scaling simple grid-world theory to industrial complexity.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The ROI Presentation",
                            objectives: "Experience the role of an AI Project Manager by presenting a business case for RL.",
                            instructions: [
                                "Divide class into 4 teams. Assign each a case: {Grid Optimization, Ad Placement, Robot Logistics, Traffic Control}.",
                                "Group Task: Prepare a 2-minute pitch for the CEO. Highlight: The Problem, The RL Solution, and The Expected ROI.",
                                "Constraint: Must use at least 2 RL terms (e.g., 'Delayed Reward', 'Policy Convergence').",
                                "Teams present their 'Business Case' and the rest of the class acts as 'Investors' asking tough questions about risk.",
                                "Conclusion: 'AI value is only as good as your ability to explain it to the boardroom.'"
                            ],
                            inputs: "Case study fact sheets",
                            outputs: "Verbal business pitch and ROI summary",
                            rubrics: ["Correct use of RL terminology", "Persuasiveness of business logic", "Team coordination"],
                            outcomes: "Students bridge the gap between technical engineering and professional consultancy.",
                            time: "20 Mins",
                            materials: ["Pitch templates", "Timer"]
                        },
                        {
                            level: 4,
                            title: "Local Problem Audit",
                            objectives: "Independently identify and model a local, non-technical problem as a potential Q-Learning case study.",
                            instructions: [
                                "Task: Identify a repetitive, inefficient process in your life or school (e.g., Canteen lines, Bus routes, Library book shelving).",
                                "Audit: Define the 'Agent' and its 'Environment'.",
                                "Reflection: Why is this better for RL than for simple 'If-Then' rules? (e.g., 'Because demand changes unpredictably').",
                                "Analysis: Propose a 'Reward Signal' that would encourage efficiency without causing 'Reward Hacking' (e.g., robots throwing books to shelve them faster).",
                                "Propose: A 3-phase implementation plan for your local case study."
                            ],
                            inputs: "Local environment observation",
                            outputs: "Individual RL Case Study Proposal (1 page)",
                            rubrics: ["Correct use of RL terminology", "Feasibility of the chosen reward", "Originality"],
                            outcomes: "Students demonstrate the ability to generalize RL principles to arbitrary real-world systems.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The RL Consultant" 
                subtitle="Selling the Solution"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Professional Pitch</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Imagine you are pitching Q-Learning to a **Green Energy Company**. Your mission: use RL to manage wind turbine angles. Explain to them that the agent will learn to face the wind autonomously, maximizing energy generation (Reward) without needing a manual controller.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <TrendingUp size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Phase 1</div>
                            <p className="text-[8px] mt-1">Data Collection</p>
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Cpu size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Phase 2</div>
                            <p className="text-[8px] mt-1">Policy Training</p>
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Globe size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Phase 3</div>
                            <p className="text-[8px] mt-1">Global Scale-up</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Industry Review"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'In the Inventory Control case study, what constitutes the "State"?', a: 'The state is typically the current inventory level, current demand indicators, and lead times for replenishment.' },
                        { q: 'Why is RL better than static rules for cybersecurity?', a: 'Hackers constantly change their tactics. A Q-learning agent can adapt its defense policy through experience, learning to block new attack patterns as they emerge.' },
                        { q: 'What is the "Economic Benefit" of Q-Learning in data centers?', a: 'By dynamically managing server load and cooling, RL agents can reduce energy costs by up to 40%, leading to significant financial savings and reduced environmental impact.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: The Case Showcase" 
                subtitle="Explore Success Stories"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Case Study Runner"
                    description="Reproduce published Q-Learning results"
                    objective="Run the exact hyperparameters from a published case study and compare your results to the paper's figures."
                    badge="Interactive Lab"
                    tips={['Reproducibility requires fixing the random seed',
                'Small differences in α and γ can dramatically change convergence speed']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Browse through the famous real-world implementations of Q-Learning. See how the core concepts you've learned—States, Rewards, and Impacts—actually look in a professional setting.
                    </p>
                    <CaseStudyLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Unit 3 Completed!</h3>
                    <p className="text-primary-100">
                        You've mastered Policy and Q-Learning. You are now ready to step into the final frontier: Dynamic Programming and Monte Carlo methods.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        UNITS 4: ADVANCED RL METHODS
                    </button>
                </div>
            </div>
        </div>
    );
}
