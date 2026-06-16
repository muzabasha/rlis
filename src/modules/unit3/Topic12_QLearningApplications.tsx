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
import { ExpectedRewardVis } from '../../components/visualizers';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Rocket,
    Network,
    Briefcase,
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
    Car,
    ShoppingCart,
    Activity,
    ShieldCheck,
    Server,
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
        "quest": "Q Learning Applications Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Q Learning Applications Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Q Learning Applications simulator.",
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
    "🤖 [System] Initializing Q Learning Applications Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Q Learning Applications\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 12 ─────────────────────────────────────

/**
 * Industry Application Selector: How RL fits in different sectors
 */
function ApplicationLab() {
    const [selectedApp, setSelectedApp] = useState(0);

    const apps = [
        { 
            title: 'Traffic Management', 
            icon: Car, 
            state: 'Vehicle density / wait times', 
            action: 'Change signal timing', 
            reward: 'Reduced average delay',
            desc: 'Cities use Q-Learning to dynamically adjust green lights, preventing traffic jams before they happen.'
        },
        { 
            title: 'Dynamic Pricing', 
            icon: ShoppingCart, 
            state: 'Demand / Inventory / Time', 
            action: 'Increase or decrease price', 
            reward: 'Total revenue / sales volume',
            desc: 'Airlines and e-commerce sites use RL to find the perfect price point that maximizes profit while keeping seats full.'
        },
        { 
            title: 'Energy Grid Optimization', 
            icon: Server, 
            state: 'Current load / solar output', 
            action: 'Route power to storage/grid', 
            reward: 'Cost reduction / grid stability',
            desc: 'Smart grids use RL to decide when to store energy in batteries and when to release it to avoid blackouts.'
        },
        { 
            title: 'Recommendation Systems', 
            icon: Search, 
            state: 'User history / current time', 
            action: 'Show specific product/video', 
            reward: 'Click-through / Watch time',
            desc: 'Streaming services use RL to learn which content will keep you engaged for the longest time.'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Application Menu */}
                <div className="w-full md:w-1/3 space-y-2">
                    {apps.map((app, i) => {
                        const Icon = app.icon;
                        return (
                            <button
                                key={i}
                                onClick={() => setSelectedApp(i)}
                                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 text-left ${
                                    selectedApp === i 
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                    : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                                }`}
                            >
                                <div className={`p-2 rounded-lg ${selectedApp === i ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                    <Icon size={18} />
                                </div>
                                <span className={`text-xs font-bold ${selectedApp === i ? 'text-primary-600' : 'text-slate-500'}`}>{app.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Details Panel */}
                <div className="flex-1 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedApp}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-primary-500">
                                    {React.createElement(apps[selectedApp].icon, { size: 32 })}
                                </div>
                                <h4 className="text-xl font-black text-slate-800 dark:text-white">{apps[selectedApp].title}</h4>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                "{apps[selectedApp].desc}"
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-primary-500 uppercase mb-1">State (S)</div>
                                    <div className="text-[10px] text-slate-500 font-medium">{apps[selectedApp].state}</div>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-indigo-500 uppercase mb-1">Action (A)</div>
                                    <div className="text-[10px] text-slate-500 font-medium">{apps[selectedApp].action}</div>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-emerald-500 uppercase mb-1">Reward (R)</div>
                                    <div className="text-[10px] text-slate-500 font-medium">{apps[selectedApp].reward}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic12_QLearningApplications() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic12_qlearningapplications" />
            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit3', 'Topic12_QLearningApplications');
                        if (!data) return null;
                        return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{data.prerequisites.map((p, i) => <li key={i}>{p}</li>)}</ul>);
                    })()}
                </div>
            </SectionWrapper>

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Beyond the Game Console" 
                subtitle="Q-Learning in the Real World"
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
                                "From beating Atari games to optimizing traffic lights, Q-learning is everywhere, judging your suboptimal decisions."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Network size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌍 Global Optimization
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Q-Learning is famous for mastering Atari games and chess, but its most impactful work happens in the shadows of our modern infrastructure.
                            </p>
                            <p>
                                From managing the **Electricity Grid** of entire nations to deciding the **Price of your Flight**, Q-Learning agents are working behind the scenes to optimize efficiency and minimize waste.
                            </p>
                            <p>
                                Any problem that involves a **Sequence of Decisions** with **Delayed Consequences** is a perfect candidate for Q-Learning. It turns complex, multi-variable environments into a simple game of maximizing cumulative reward.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Resource Saver">
                            Q-Learning is a powerful tool for sustainability, helping reduce fuel consumption in logistics and energy waste in data centers.
                        </InfoCard>
                        <InfoCard type="tip" title="Industry Standard">
                            While newer algorithms exist, Q-Learning remains a foundational "First Choice" for industrial control due to its simplicity and theoretical stability.
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
                                Coordinating autonomous traffic light signals across a major city grid to minimize average vehicle waiting times.
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
                            Demonstrates how tabular Q-learning concepts scale and translate into real-world control systems.
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
                                    Shows how to formulate complex, high-impact industrial tasks as simple state-action-reward tables.
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
                                    Tabular representation fails completely on continuous control tasks, requiring deep neural networks (DQN).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Modelling the Industry MDP" 
                subtitle="Translating Business into Math"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\\mathcal{R}_{\\text{Business}} = \\text{Revenue} - \\text{Cost} - \\text{Penalty}"
                        label="The Business Reward Function"
                        explanation="How we translate company goals into a reward signal."
                        interpretation="The agent doesn't understand 'Brand Loyalty' or 'Efficiency'; it only understands numbers. We must carefully design R so that maximizing it achieves the actual business goal."
                        motivation="Design errors in the reward function (Reward Hacking) can lead to agents that achieve high scores but destroy the system."
                        terms={[
                            { term: '\\text{Penalty}', name: 'Risk Mitigation', meaning: 'Negative reward for unsafe or illegal actions.', range: '\\mathbb{R}^-', example: '-1000 for server crash.' },
                        ]}
                    />
                    <ExpectedRewardVis />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Convergence in Practice</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            In real-world applications, we rarely use a simple table. Instead, we use **Function Approximators** (Neural Networks) to map complex states to Q-values:
                            <br/><br/>
                            <span className="text-sm font-mono text-white">Q(s, a; \theta) \approx Q^*(s, a)</span>
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Q Learning Applications Architecture"
                description="Where Q-Learning is used practically."
                chart={`graph TD
    QL[Q-Learning] --> Robotics[Path Planning]
    QL --> Comms[Network Routing Optimization]
    QL --> Games[Solving Atari / Discrete Games]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="The Consultant's Workshop"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Sector Explorer Demo",
                            objectives: "Observe how abstract RL components (S, A, R) adapt to vastly different industries.",
                            instructions: [
                                "Open the 'Industry Sector Explorer' in the Virtual Lab section.",
                                "Select 'Traffic Management'. Explain: 'State is sensory data; Action is a mechanical control.'",
                                "Select 'Dynamic Pricing'. Explain: 'State is market data; Action is a financial decision.'",
                                "Show how the 'Reward' always represents the primary business KPI (Key Performance Indicator).",
                                "Ask: 'Which sector has the most unpredictable Next State (s')?'"
                            ],
                            inputs: "Interactive ApplicationLab component",
                            outputs: "Visual mapping of 4 distinct industrial MDPs.",
                            rubrics: ["Clarity of 'Translation' logic", "Comparison of different sectors", "Student engagement"],
                            outcomes: "Students identify Q-Learning as a universal framework for sequence-based optimization.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Corporate Reward Workshop",
                            objectives: "Collaboratively design a balanced reward function for a complex ethical/financial task.",
                            instructions: [
                                "Teacher presents a scenario: 'Designing an RL agent for a Bank Loan Approval Bot'.",
                                "Guided Design: 'What is a +R?' (Loan repaid with interest). 'What is a -R?' (Loan default).",
                                "Add Complexity: 'How do we penalize Bias or Unfairness?'",
                                "Class reflects: 'If we only reward Profit, will the agent stop giving loans to low-income students?'",
                                "Conclusion: Professional reward design must balance efficiency with ethics and risk."
                            ],
                            inputs: "Financial and ethical constraint list",
                            outputs: "A multi-weighted Reward Equation on the board",
                            rubrics: ["Inclusion of 'Risk' vs 'Profit'", "Addressing ethical constraints", "Classroom participation"],
                            outcomes: "Students master the skill of multi-objective reward engineering.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The RL Consultant Pitch",
                            objectives: "Experience the creative application of RL to local, relatable business problems.",
                            instructions: [
                                "Divide class into 4 teams. Assign each team a 'Local Business' (e.g., The School Canteen, The Gym, The Library).",
                                "Group Task: Design a Q-Learning system to 'Optimize' that business.",
                                "Output: Define the State (e.g., Inventory levels), Action (e.g., Discount price), and Reward (e.g., Zero food waste).",
                                "Teams pitch their 'Smart Solution' to the class, explaining how 'Delayed Reward' works in their scenario.",
                                "Conclusion: 'Anything that can be measured can be optimized by RL.'"
                            ],
                            inputs: "Local business prompts",
                            outputs: "Consultancy posters showing the MDP architecture",
                            rubrics: ["Logical consistency of the MDP", "Relevance of the chosen reward", "Team coordination"],
                            outcomes: "Students bridge the gap between classroom algorithms and entrepreneurship.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Smart Device Audit",
                            objectives: "Independently audit a commercial device or app to predict its internal RL logic.",
                            instructions: [
                                "Task: Choose a device/app you use daily (e.g., Netflix, Instagram, Google Maps, or a Smart Thermostat).",
                                "Audit: What is the 'Action' the app takes to keep you engaged? (The recommendation).",
                                "Reflection: Predict a 'Reward Hacking' failure. (e.g., 'Instagram shows me shocking news because it gets a high reward for my click, even if I hate the content').",
                                "Analysis: If the 'Discount Factor' $\\gamma$ was 0, how would the app's behavior change?",
                                "Propose: A 'User-Centric' reward function that prioritizes mental health over clicks."
                            ],
                            inputs: "Personal smartphone/apps",
                            outputs: "Individual Application Audit Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Critical thinking on 'Reward Hacking'", "Originality"],
                            outcomes: "Students develop a critical, engineering-based perspective on modern AI consumer products.",
                            time: "15 Mins",
                            materials: ["Student Workbook", "Personal device"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Smart Thermostat" 
                subtitle="Energy Efficiency at Scale"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Consumer Electronics</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Google Nest and other smart thermostats use RL to learn your habits. State: [Current Temp, Time, Occupancy]. Action: [Heat, Cool, Idle]. Reward: [User Comfort - Energy Cost]. Over one week, the Q-learning agent finds the optimal policy to keep you warm while saving 15% on your bill.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Layers size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Input</div>
                            <p className="text-[8px] mt-1">Room Sensors</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Brain size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">Learning</div>
                            <p className="text-[8px] mt-1">User Schedule</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <ShieldCheck size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">Outcome</div>
                            <p className="text-[8px] mt-1">Low Energy Bill</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Applied Theory"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is Q-Learning suitable for traffic light control?', a: 'Because traffic flow is a sequence of states with delayed consequences. An action taken now (Green light) affects vehicle density minutes later in different parts of the city.' },
                        { q: 'What is "Reward Hacking"?', a: 'When an agent finds a way to get a high reward without actually solving the intended problem (e.g., a cleaner robot moving dirt in circles because it gets a reward for every "cleaning action").' },
                        { q: 'Can Q-Learning be used for stock trading?', a: 'Yes. State: [Price history, Volume]. Action: [Buy, Sell, Hold]. Reward: [Profit/Loss]. However, the market is highly non-stationary, making it a difficult MDP.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Industry Sector Explorer" 
                subtitle="Apply Q-Learning Everywhere"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Application Playground"
                    description="Q-Learning on real-world inspired tasks"
                    objective="Choose a domain (Traffic, Inventory, Robot Arm) and train a Q-Learning agent. Compare reward curves across domains."
                    badge="Interactive Lab"
                    tips={['Traffic control has sparse rewards — the agent only learns when it improves wait times',
                'Inventory management has well-shaped rewards — learning is fast']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select an industry sector on the left to see how the abstract concepts of **States, Actions, and Rewards** translate into real business logic and physical control.
                    </p>
                    <ApplicationLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => {
                    const data = getTopicData('unit3', 'Topic12_QLearningApplications');
                    if (!data) return null;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit3', 'Topic12_QLearningApplications');
                if (!data) return null;
                return (<React.Fragment>
                    <SectionWrapper id="recap" title="9. Topic Recap" subtitle="Key points to remember" icon={<BookOpen className="text-emerald-600" size={24} />} badge="Recap" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                        <ul className="space-y-2">{data.recap.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>{point}
                            </li>
                        ))}</ul>
                    </SectionWrapper>
                    <SectionWrapper id="skills" title="10. Skill Mapping" subtitle="Competencies developed" icon={<Target className="text-indigo-600" size={24} />} badge="Skills" badgeColor="bg-indigo-100 text-indigo-700" accentColor="border-indigo-500">
                        <div className="grid gap-3">{data.skillMapping.map((skill, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.skill}</span>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${skill.level === 'Beginner' ? 'bg-green-100 text-green-700' : skill.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{skill.level}</span>
                            </div>
                        ))}</div>
                    </SectionWrapper>
                </React.Fragment>);
            })()}

            {/* Keep existing navigation buttons here */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Applications Mastered!</h3>
                    <p className="text-primary-100">
                        You've seen the power of RL in the real world. Now, let's look at the most famous Case Studies that put Q-Learning on the map.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: Q-LEARNING CASE STUDIES
                    </button>
                </div>
            </div>
        </div>
    );
}
