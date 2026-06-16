import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
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
    Rocket,
    Cpu,
    Briefcase,
    Target,
    Zap,
    TrendingUp,
    Clock,
    ShieldAlert,
    Users2,
    Layout,
    Gamepad2,
    Stethoscope,
    ShoppingCart,
    Truck,
    Database,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { MDPTupleVis, CTRVis } from '../../components/visualizers';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Applications Of R L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Applications Of R L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Applications Of R L simulator.",
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
    "🤖 [System] Initializing Applications Of R L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Applications Of R L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 11 ─────────────────────────────────────

/**
 * Interactive Application Showcase
 */
function ApplicationGrid() {
    const apps = [
        {
            id: 'games',
            name: 'Gaming & Simulation',
            icon: <Gamepad2 />,
            details: 'AlphaGo, Dota 2, StarCraft II. Mastering complex strategy and real-time tactics.',
            color: 'bg-blue-500',
            reward: 'Score / Win Ratio'
        },
        {
            id: 'finance',
            name: 'Quantitative Finance',
            icon: <Briefcase />,
            details: 'Portfolio optimization, algorithmic trading, and dynamic risk management.',
            color: 'bg-emerald-500',
            reward: 'ROI / Sharpe Ratio'
        },
        {
            id: 'healthcare',
            name: 'Personalized Medicine',
            icon: <Stethoscope />,
            details: 'Dynamic treatment regimes and drug discovery simulations.',
            color: 'bg-rose-500',
            reward: 'Patient Outcome'
        },
        {
            id: 'robotics',
            name: 'Robotics & Control',
            icon: <Cpu />,
            details: 'Autonomous navigation, industrial automation, and robotic manipulation.',
            color: 'bg-amber-500',
            reward: 'Efficiency / Safety'
        },
        {
            id: 'ecommerce',
            name: 'Recommendation Systems',
            icon: <ShoppingCart />,
            details: 'Netflix, Amazon, YouTube. Optimizing for long-term user engagement.',
            color: 'bg-indigo-500',
            reward: 'CTR / Watch Time'
        },
        {
            id: 'logistics',
            name: 'Supply Chain',
            icon: <Truck />,
            details: 'Inventory management and route optimization in dynamic environments.',
            color: 'bg-purple-500',
            reward: 'Cost Reduction'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
                <motion.div
                    key={app.id}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group"
                >
                    <div className={`w-12 h-12 rounded-2xl ${app.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        {app.icon}
                    </div>
                    <h5 className="font-bold text-slate-800 dark:text-white mb-2">{app.name}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{app.details}</p>
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-700">
                        <Target size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reward: {app.reward}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic11_ApplicationsOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic11_applicationsofrl" />
            {/* SECTION 0: PREREQUISITES */}
            <SectionWrapper
                id="prerequisites"
                title="0. Prerequisites"
                subtitle="What you should know before starting"
                icon={<BookOpen className="text-sky-600" size={24} />}
                badge="Prerequisites"
                badgeColor="bg-sky-100 text-sky-700"
                accentColor="border-sky-500"
            >
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit1', 'Topic11_ApplicationsOfRL');
                        if (!data) return <p className="text-sm text-slate-500">No prerequisites listed.</p>;
                        return (
                            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                {data.prerequisites.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        );
                    })()}
                </div>
            </SectionWrapper>

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. The AlphaGo Revolution"
                subtitle="From Games to Real World"
                icon={<Rocket className="text-blue-600" size={24} />}
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
                                "It can beat you at chess, Go, and Starcraft, but still struggles to open a door properly."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <Gamepad2 size={200} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            ♟️ The Move 37
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In 2016, DeepMind's AlphaGo played against Lee Sedol, one of the world's best Go players. In Game 2, AlphaGo made a move (Move 37) that every human commentator thought was a mistake.
                            </p>
                            <p>
                                It was a move no human had ever played in thousands of years of Go history. But AlphaGo had learned from <em>itself</em> through millions of simulations. That "mistake" turned out to be the winning strategy.
                            </p>
                            <p>
                                <strong>The Insight:</strong> Reinforcement Learning doesn't just copy humans; it discovers new, superior ways of solving problems that we might not even recognize as "correct" at first.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Beyond Human Logic">
                            RL is being used in Data Centers (like Google's) to optimize cooling, saving millions in electricity bills by finding patterns humans missed.
                        </InfoCard>
                        <InfoCard type="warning" title="The Reality Check">
                            Most RL success stories are in games because we have perfect simulators. Moving to the "messy" real world is the current frontier.
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
                                Modern power grids require instantaneous balancing of solar, wind, and thermal generators.
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
                            Explores how abstract mathematical rewards are translated into real-world industrial systems (finance, robotics, games).
                        </p>
                    </div>

                    {/* ADVANTAGES & DISADVANTAGES */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-emerald-900 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">
                                    Advantages
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Unlocks new automated capabilities across high-impact industries.
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
                                    Translating real-world metrics into a clean scalar reward is prone to human bias and system errors.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. Mapping the World to MDPs"
                subtitle="The Formalization of Domains"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\text{MDP}_{\text{app}} = \langle \mathcal{S}_{\text{app}},\;\mathcal{A}_{\text{app}},\;\mathcal{P}_{\text{app}},\;\mathcal{R}_{\text{app}},\;\gamma \rangle"
                        label="Universal MDP Template for Any Application"
                        accent="blue"
                        explanation="Every real-world RL application is an instantiation of this 5-tuple. The designer's job is to define each component for their specific domain."
                        interpretation="This template is the bridge between theory and practice. AlphaGo, ChatGPT, self-driving cars, and recommendation systems all use this same mathematical structure — they just have different definitions of S, A, P, R, and γ. Understanding this template allows you to formulate any sequential decision problem as an RL task."
                        motivation="Without this formalisation, RL remains abstract. By mapping a real problem to this tuple, we immediately know which algorithms to apply, what data to collect, and how to measure success."
                        terms={[
                            { term: '\\mathcal{S}_{\\text{app}}', name: 'Application State Space', meaning: 'All information the agent needs to make decisions. Must be Markov — the future depends only on the current state.', range: '\\mathbb{R}^n \\text{ or finite}', example: 'Trading: S = [price, volume, RSI, portfolio_value]. Recommendation: S = [user_history, time_of_day, device].' },
                            { term: '\\mathcal{A}_{\\text{app}}', name: 'Application Action Space', meaning: 'All decisions the agent can make. Can be discrete (buy/sell/hold) or continuous (steering angle).', range: 'Finite or \\mathbb{R}^m', example: 'Trading: A = {buy, sell, hold}. Self-driving: A = [steering ∈ [−30°,30°], throttle ∈ [0,1]].' },
                            { term: '\\mathcal{R}_{\\text{app}}', name: 'Application Reward', meaning: 'The scalar signal that defines success. The most critical design choice — must align with the true objective.', range: '\\mathbb{R}', example: 'Trading: R = daily_profit − risk_penalty. Recommendation: R = watch_time − skip_penalty.' },
                            { term: '\\gamma', name: 'Application Discount', meaning: 'How much the application values future rewards. High γ for long-horizon tasks (energy management); lower γ for short-horizon tasks (ad placement).', range: '[0,1)', example: 'Energy management: γ=0.99 (plan months ahead). Ad placement: γ=0.9 (plan hours ahead).' },
                        ]}
                    />

                    <MDPTupleVis />

                    <MathBlock
                        formula="\text{CTR}(t) = \frac{\displaystyle\sum_{i=1}^{t}\mathbf{1}[\text{click}_i]}{\displaystyle\sum_{i=1}^{t}\mathbf{1}[\text{impression}_i]}"
                        label="Recommendation System Reward — Click-Through Rate"
                        accent="violet"
                        explanation="CTR is the fraction of impressions that result in clicks. Used as the reward signal for recommendation RL agents (Netflix, YouTube, Amazon)."
                        interpretation="CTR is a proxy for user satisfaction. The RL agent learns to recommend content that maximises long-term CTR, not just the next click. This is why recommendation systems sometimes show you content you didn't know you wanted — the agent discovered that certain sequences of recommendations lead to higher long-term engagement."
                        motivation="CTR is measurable, immediate, and directly tied to business value. However, optimising only for CTR can lead to clickbait. Modern systems use a combination of CTR, watch time, and user ratings as a composite reward."
                        terms={[
                            { term: '\\mathbf{1}[\\text{click}_i]', name: 'Click Indicator', meaning: 'Equals 1 if the user clicked on impression i, 0 otherwise. A binary reward signal.', range: '\\{0,1\\}', example: 'User clicked on recommended movie → 1. User scrolled past → 0.' },
                            { term: '\\mathbf{1}[\\text{impression}_i]', name: 'Impression Indicator', meaning: 'Equals 1 if the content was shown to the user. The denominator counts total opportunities.', range: '\\{0,1\\}', example: '100 recommendations shown → 100 impressions.' },
                            { term: '\\text{CTR}(t)', name: 'CTR at time t', meaning: 'Running click-through rate up to time t. The RL agent\'s reward signal.', range: '[0,1]', example: '30 clicks out of 100 impressions → CTR = 0.30 = 30%.' },
                        ]}
                        numericalExample={{
                            setup: 'Recommendation agent. 5 recommendations shown. User clicks on items 2 and 4.',
                            steps: [
                                'Impressions: [1,1,1,1,1] → sum = 5',
                                'Clicks:      [0,1,0,1,0] → sum = 2',
                                'CTR = 2/5 = 0.40 = 40%',
                                'Reward R = CTR = 0.40 (positive signal to reinforce this recommendation sequence)',
                            ],
                            result: 'CTR=0.40. The agent receives R=0.40 and updates Q-values to make similar recommendations more likely in similar user states.',
                        }}
                    />

                    <CTRVis />

                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Applications Of R L Architecture"
                description="Real-world industry applications of RL."
                chart={`graph LR
    RL((RL)) --> Games[Game Playing e.g. AlphaGo]
    RL --> Robo[Robotics & Manipulation]
    RL --> Auto[Autonomous Vehicles]
    RL --> Fin[Algorithmic Trading]
    RL --> Med[Personalized Treatment]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Designing RL Solutions"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Industry Showcase Demo",
                            objectives: "Survey the diverse fields where RL provides a competitive advantage over traditional methods.",
                            instructions: [
                                "Open the 'Application Showcase' in the Virtual Lab section.",
                                "Select 'Quantitative Finance' and explain why ROI is a perfect RL reward signal.",
                                "Select 'Personalized Medicine' and discuss the 'Patient Outcome' as a long-term goal.",
                                "Show the 'Recommendation Systems' card and explain the Netflix/YouTube connection.",
                                "Discuss how each industry maps back to the <S, A, P, R, γ> tuple."
                            ],
                            inputs: "Interactive ApplicationGrid component",
                            outputs: "Detailed industry cards showing Rewards, Icons, and Use Cases.",
                            rubrics: ["Clarity of industry mapping", "Connection to reward functions", "Student engagement"],
                            outcomes: "Students identify the variety of domains where sequential decision-making (RL) is used.",
                            time: "10 Mins",
                            materials: ["Interactive Lab", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The CTR Reward Workshop",
                            objectives: "Collaboratively calculate and evaluate the reward signal for a recommendation system.",
                            instructions: [
                                "Teacher presents a scenario: A user is shown 10 YouTube thumbnails.",
                                "Teacher lists results: [Click, Skip, Click, Skip, Skip, Skip, Skip, Skip, Click, Skip].",
                                "Guided Calculation: Total Impressions = 10. Total Clicks = 3. CTR = 3/10 = 0.30.",
                                "Discussion: 'Is CTR a good enough reward? What if the user clicks but hates the video?'",
                                "Class adds a 'Watch Time' weight to the formula: R = (0.5 * CTR) + (0.5 * WatchRatio)."
                            ],
                            inputs: "Simulated user interaction logs",
                            outputs: "Composite Reward Formula on the board",
                            rubrics: ["Mathematical accuracy", "Logic of composite rewards", "Classroom participation"],
                            outcomes: "Students learn to design and calculate domain-specific reward signals.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Campus RL Consultant",
                            objectives: "Experience the engineering process of formulating a real-world problem as an MDP.",
                            instructions: [
                                "Divide class into 4 groups: The Canteen Team, The Library Team, The Parking Team, The Exam Scheduler Team.",
                                "Task: Each team must define <S, A, R> for their campus problem.",
                                "Canteen: S = queue length, A = dynamic pricing/opening counters, R = total throughput/wait-time reduction.",
                                "Library: S = book availability, A = reminder frequency, R = return rate.",
                                "Teams pitch their 'Campus RL Solution' to the class."
                            ],
                            inputs: "Common campus operational problems",
                            outputs: "Formal <S, A, R> Definitions on chart paper",
                            rubrics: ["Correct MDP formulation", "Practicality of actions", "Team coordination"],
                            outcomes: "Students bridge the gap between abstract math and real-world organizational efficiency.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "App-Log RL Audit",
                            objectives: "Independently audit a personal digital experience through the lens of RL application design.",
                            instructions: [
                                "Task: Open your favorite app (Instagram, Spotify, or Amazon).",
                                "Identify 3 things the app 'Observed' about you today (State).",
                                "Identify the 'Action' it took (e.g., what it recommended).",
                                "Define the 'Reward' it received from you (e.g., like, purchase, or 5-second view).",
                                "Self-Evaluation: Did the app's 'RL Agent' succeed in engaging you for more than 10 minutes?"
                            ],
                            inputs: "Student's own smartphone/app usage",
                            outputs: "Individual 'App-RL Audit' Report",
                            rubrics: ["Accuracy of State/Action identification", "Logic of Reward deduction", "Originality"],
                            outcomes: "Students realize they are active participants in RL-driven economies every day.",
                            time: "15 Mins",
                            materials: ["Student Smartphone"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: The RL Chatbot"
                subtitle="Reinforcement Learning from Human Feedback"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Zap size={18} /> The LLM Connection (RLHF)</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Modern AI like ChatGPT isn't just trained on text. It uses <strong>RLHF</strong>. Humans rank different responses, and an RL agent learns to reward the model for producing "helpful and safe" text.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Phase 1: Ranking</h6>
                            <p className="text-[10px] text-slate-500">Humans compare two AI answers and pick the better one.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Phase 2: Learning</h6>
                            <p className="text-[10px] text-slate-500">The RL agent optimizes the model to get higher "Human-Rank" rewards.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Exam-Ready Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'How is RL used in Dynamic Pricing?', a: 'Agents observe demand, competitor prices, and time of day (State) to adjust prices (Action) and maximize revenue (Reward) in real-time.' },
                        { q: 'What is the role of RL in AlphaFold?', a: 'RL helps optimize the 3D structure of proteins by rewarding configurations that minimize energy and match physical constraints.' },
                        { q: 'Give one example of RL in autonomous vehicles.', a: 'Decision-making for lane changes or intersection navigation, where the agent learns to balance speed, safety, and passenger comfort.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Industry Explorer"
                subtitle="Visualizing RL Domains"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Application Simulator Hub"
                    description="Simulate real RL applications"
                    objective="Pick an application domain and simulate an RL agent solving it. Observe domain-specific reward functions in action."
                    badge="Interactive Lab"
                    tips={['Try the Traffic Signal domain — see how agents reduce average wait times',
                'Each domain has a unique reward function shaping agent behaviour']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore the various industries where Reinforcement Learning is creating a massive impact today.
                    </p>
                    <ApplicationGrid />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper
                id="mcq"
                title="8. Knowledge Check"
                subtitle="10 Feedback-Based MCQs"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="MCQ Quiz"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                {(() => {
                    const data = getTopicData('unit1', 'Topic11_ApplicationsOfRL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic11_ApplicationsOfRL');
                if (!data) return null;
                return (
                    <div className="space-y-6">
                        {/* Recap Section */}
                        <SectionWrapper
                            id="recap"
                            title="9. Topic Recap"
                            subtitle="Key points to remember"
                            icon={<BookOpen className="text-emerald-600" size={24} />}
                            badge="Recap"
                            badgeColor="bg-emerald-100 text-emerald-700"
                            accentColor="border-emerald-500"
                        >
                            <ul className="space-y-2">
                                {data.recap.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </SectionWrapper>

                        {/* Skill Mapping Section */}
                        <SectionWrapper
                            id="skills"
                            title="10. Skill Mapping"
                            subtitle="Competencies developed"
                            icon={<Target className="text-indigo-600" size={24} />}
                            badge="Skills"
                            badgeColor="bg-indigo-100 text-indigo-700"
                            accentColor="border-indigo-500"
                        >
                            <div className="grid gap-3">
                                {data.skillMapping.map((skill, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.skill}</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                            skill.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            skill.level === 'Intermediate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>

                        {/* Original Mastered navigation */}
                        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-indigo-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Applications: Explored!</h3>
                                <p className="text-indigo-100">
                                    You've seen RL in the real world. Ready to transition into the core concepts of intelligent agents?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: AGENT TYPES
                                </button>
                                <button className="px-10 py-4 bg-indigo-700 text-white font-black rounded-2xl hover:bg-indigo-800 transition-colors">
                                    REVIEW APPS
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

