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
    Target,
    Zap,
    TrendingUp,
    Sparkles,
    Binary,
    Focus,
    Play,
    RotateCcw,
    Layout,
    Gamepad2,
    Grid3X3,
    Briefcase,
    GraduationCap,
    ArrowRight,
    Battery,
    Coins,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "M D P Examples Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "M D P Examples Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the M D P Examples simulator.",
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
    "🤖 [System] Initializing M D P Examples Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"M D P Examples\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 13 ─────────────────────────────────────

/**
 * Recycling Robot State Visualizer
 */
function RecyclingRobotLab() {
    const [state, setState] = useState<'High' | 'Low'>('High');
    const [history, setHistory] = useState<string[]>([]);
    const [reward, setReward] = useState(0);

    const takeAction = (action: 'Search' | 'Wait' | 'Recharge') => {
        let nextState = state;
        let r = 0;

        if (action === 'Search') {
            if (state === 'High') {
                const prob = Math.random();
                nextState = prob < 0.7 ? 'High' : 'Low';
                r = 4;
            } else {
                const prob = Math.random();
                if (prob < 0.1) {
                    nextState = 'High';
                    r = 4;
                } else if (prob < 0.9) {
                    nextState = 'Low';
                    r = 4;
                } else {
                    nextState = 'Low'; // Simplified
                    r = -3; // Penalty for depletion
                }
            }
        } else if (action === 'Wait') {
            r = 1;
        } else if (action === 'Recharge') {
            nextState = 'High';
            r = 0;
        }

        setState(nextState);
        setReward(prev => prev + r);
        setHistory(prev => [`${action} → ${nextState} (r=${r})`, ...prev].slice(0, 5));
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Battery size={18} className="text-primary-500" />
                            Robot State: <span className={state === 'High' ? 'text-emerald-500' : 'text-amber-500'}>{state} Energy</span>
                        </h4>
                        <div className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100">
                            <span className="text-[10px] font-bold text-primary-400 uppercase block">Total Reward</span>
                            <span className="text-xl font-black text-primary-600">{reward}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <button onClick={() => takeAction('Search')} className="p-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-2xl flex flex-col items-center gap-2 transition-all">
                            <Zap size={20} />
                            <span className="text-xs font-bold">Search</span>
                        </button>
                        <button onClick={() => takeAction('Wait')} className="p-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-2xl flex flex-col items-center gap-2 transition-all">
                            <Layout size={20} />
                            <span className="text-xs font-bold">Wait</span>
                        </button>
                        <button onClick={() => takeAction('Recharge')} className="p-4 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-2xl flex flex-col items-center gap-2 transition-all">
                            <Battery size={20} />
                            <span className="text-xs font-bold">Recharge</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Transitions</h5>
                        <div className="space-y-1">
                            {history.map((h, i) => (
                                <div key={i} className="text-[10px] p-2 bg-slate-50 dark:bg-slate-900 rounded-lg font-mono text-slate-500 border border-slate-100">
                                    {h}
                                </div>
                            ))}
                            {history.length === 0 && <div className="text-[10px] text-slate-300 italic">Take an action to start...</div>}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="relative w-full h-48 flex items-center justify-center">
                        {/* State High */}
                        <motion.div 
                            animate={{ scale: state === 'High' ? 1.2 : 0.9, opacity: state === 'High' ? 1 : 0.5 }}
                            className={`absolute left-0 w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 ${state === 'High' ? 'bg-emerald-500 border-emerald-200 text-white shadow-lg shadow-emerald-500/20' : 'bg-white border-slate-200 text-slate-400'}`}
                        >
                            <span className="text-[8px] font-bold uppercase">State</span>
                            <span className="text-sm font-black">HIGH</span>
                        </motion.div>
                        
                        {/* Arrow */}
                        <div className="w-12 h-px bg-slate-300 relative">
                            <div className="absolute top-1/2 left-full -translate-y-1/2 -ml-1 border-4 border-transparent border-l-slate-300" />
                        </div>

                        {/* State Low */}
                        <motion.div 
                            animate={{ scale: state === 'Low' ? 1.2 : 0.9, opacity: state === 'Low' ? 1 : 0.5 }}
                            className={`absolute right-0 w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 ${state === 'Low' ? 'bg-amber-500 border-amber-200 text-white shadow-lg shadow-amber-500/20' : 'bg-white border-slate-200 text-slate-400'}`}
                        >
                            <span className="text-[8px] font-bold uppercase">State</span>
                            <span className="text-sm font-black">LOW</span>
                        </motion.div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 text-center">Transitions are <strong>Stochastic</strong>. Searching from High might lead to Low, but it might stay High!</p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic13_MDPExamples() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic13_mdpexamples" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Real-World Decision Loops" 
                subtitle="The Versatility of the MDP"
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
                                "From gridworlds to helicopter acrobatics, MDPs are everywhere. Just don't ask it to do your taxes."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Grid3X3 size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌎 Everything is an MDP (Almost)
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                We've learned the math, but how do we apply it? The power of the Markov Decision Process is that it can describe almost any sequential decision problem.
                            </p>
                            <p>
                                {"From a **Recycling Robot** deciding how to manage its battery, to an **Inventory Manager** deciding when to restock, to a **Doctor** deciding on a sequence of treatments—all these can be mapped to the 4-tuple $\\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{P}, \\mathcal{R} \\rangle$."}
                            </p>
                            <p>
                                If you can define where the agent is (State), what it can do (Action), how the world changes (Dynamics), and what success looks like (Reward), you have an MDP.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Abstraction Power">
                            The MDP framework doesn't care if the agent is a physical robot or a line of code in a financial trading bot. The math remains the same.
                        </InfoCard>
                        <InfoCard type="tip" title="State Representation">
                            The most important part of building an MDP is choosing the right <strong>State Space</strong>. Too small, and you lose critical info. Too large, and the math becomes impossible.
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
                                Navigating a lunar lander module onto a designated landing pad under dynamic gravity and thruster physics.
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
                            Bridges theoretical formulations with concrete, classic benchmarks to validate new RL algorithms.
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
                                    Standardizes benchmarking across different research and development frameworks.
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
                                    Success on idealized benchmark models does not always translate to performance in messy, real-world systems.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Modelling the Examples" 
                subtitle="Mapping Reality to Math"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\text{Recycling Robot} = \langle \{H, L\}, \{S, W, R\}, P, \mathcal{R} \rangle"
                        label="Example 1: The Recycling Robot"
                        accent="blue"
                        explanation="A classic textbook example of a small, finite MDP."
                        interpretation="The robot's goal is to find as many cans as possible without letting its battery die. It must balance the 'High Reward' but 'Risky' Search action with the 'Safe' Wait or Recharge actions."
                        motivation="This example demonstrates how constraints (battery life) and objectives (cans) are perfectly captured by rewards and transitions."
                        terms={[
                            { term: '\{H, L\}', name: 'State Space', meaning: 'High Energy or Low Energy battery status.', range: '\mathcal{S}', example: 'Robot starts at H.' },
                            { term: '\{S, W, R\}', name: 'Action Space', meaning: 'Search, Wait, or Recharge.', range: '\mathcal{A}', example: 'Robot chooses S to maximize cans.' },
                        ]}
                    />

                    <MathBlock 
                        formula="\text{Inventory MDP} = \langle \mathbb{Z}_{\geq 0}, \{0, \dots, M\}, P, \mathcal{R} \rangle"
                        label="Example 2: Inventory Management"
                        accent="emerald"
                        explanation="A state space representing stock levels in a warehouse."
                        interpretation="The state is the number of items in stock. The action is how many to order. The dynamics $P$ involve random customer demand. The reward is (Sales Profit - Storage Cost)."
                        motivation="This shows that states don't have to be 'locations'; they can be numbers representing resources."
                        terms={[
                            { term: 'M', name: 'Max Capacity', meaning: 'The maximum storage limit of the warehouse.', range: '\mathbb{Z}^+', example: 'M = 500 units.' },
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Target size={16} /> Gridworld Standard</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Most RL research starts with **Gridworld**. It's an MDP where states are coordinates $(x, y)$, actions are direction vectors, and rewards are usually $-1$ per step to encourage the agent to find the goal quickly.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="M D P Examples Architecture"
                description="Various real-world MDP examples."
                chart={`graph TD
    MDP[MDP Framework]
    MDP --> R[Robot Navigation]
    MDP --> I[Inventory Management]
    MDP --> G[Grid World]
    R --> S[States: Coords]
    I --> A[Actions: Order Qty]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="The Architecture of Application"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Recycling Robot Demo",
                            objectives: "Observe how risk-reward trade-offs and battery constraints are modeled within an MDP.",
                            instructions: [
                                "Open the 'Recycling Robot Lab' in the Virtual Lab section.",
                                "Perform 5 'Search' actions while at High Energy. Observe the stochastic transitions.",
                                "Wait until battery is Low. Try searching again. Show the student the 'Depletion Penalty' (r=-3) if it fails.",
                                "Explain: 'Recharging has zero immediate reward, but it has high value because it prevents the depletion penalty.'"
                            ],
                            inputs: "Interactive RecyclingRobotLab component",
                            outputs: "Real-time state transitions and reward history.",
                            rubrics: ["Clarity of 'Risk vs Reward' explanation", "Demonstration of stochasticity", "Student engagement"],
                            outcomes: "Students identify the difference between immediate rewards and long-term state maintenance.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Student Life MDP Workshop",
                            objectives: "Collaboratively map the 4-tuple components for a relatable real-world scenario.",
                            instructions: [
                                "Teacher selects a scenario: 'Preparing for the RLIS Midterm'.",
                                "Guided Discussion: 'What are the States?' (e.g., Prepared, Tired, Unprepared).",
                                "Guided Discussion: 'What are the Actions?' (e.g., Read Textbook, Solve Problems, Sleep).",
                                "Collaborative Mapping: Assign rewards for passing (+100) vs failing (-100).",
                                "Class determines a transition probability: 'If I'm Tired and I Study, what's the chance I become Prepared?' (e.g., 30%)."
                            ],
                            inputs: "Exam preparation context",
                            outputs: "Formal ⟨S, A, P, R⟩ tuple on the board",
                            rubrics: ["Completeness of the tuple", "Logical reward scaling", "Classroom participation"],
                            outcomes: "Students master the skill of abstracting reality into formal MDP notation.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Drone Delivery Design",
                            objectives: "Experience the design of an MDP for a high-stakes engineering problem.",
                            instructions: [
                                "Divide class into 4 teams. Scenario: 'Amazon Drone Delivery in High Winds'.",
                                "Group Task: Define the 'State Space' for the drone (must include at least 3 variables like battery, wind, and distance).",
                                "Group Task: Design a 'Search' vs 'Safe' logic. When should the drone land and wait for the wind to die down?",
                                "Rule: Every minute of waiting costs -1 reward. A crash costs -1000.",
                                "Teams present their 'Safety Policies' on chart paper."
                            ],
                            inputs: "Drone logistics scenario",
                            outputs: "Drone MDP Definition Chart",
                            rubrics: ["Depth of state representation", "Risk mitigation logic", "Team coordination"],
                            outcomes: "Students understand that MDPs allow for formal safety-performance trade-offs.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Industry MDP Audit",
                            objectives: "Independently identify a business or technical process and model it as an MDP.",
                            instructions: [
                                "Task: Think of a professional domain (e.g., Healthcare, E-commerce, Finance, or Agriculture).",
                                "Audit: Choose a recurring decision (e.g., 'When should a farmer water the crops?').",
                                "Report: Define the State (Soil moisture, Weather forecast), Action (Water, Don't Water), and Reward (Crop yield - Water cost).",
                                "Reflect: Why is it better to use an MDP for this than a simple set of static rules? (e.g., handling uncertainty and long-term soil health)."
                            ],
                            inputs: "Professional domain choice",
                            outputs: "Individual Industry MDP Proposal (1 page)",
                            rubrics: ["Correct use of RL tuple", "Economic/Technical justification", "Originality"],
                            outcomes: "Students realize that MDPs are the engine behind modern industrial optimization.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Logistics Optimizer" 
                subtitle="Scaling MDPs for Industry"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Delivery Route Planning</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Imagine an AI for a delivery drone. 
                            <strong>State:</strong> Current GPS, Remaining Battery, Wind Speed. 
                            <strong>Action:</strong> Target Velocity, Altitude. 
                            <strong>Reward:</strong> On-time delivery bonus, penalty for crashing or low battery.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Coins size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Revenue</div>
                            <p className="text-[8px] mt-1">Delivery Fees</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Battery size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Cost</div>
                            <p className="text-[8px] mt-1">Energy & Wear</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <TrendingUp size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Objective</div>
                            <p className="text-[8px] mt-1">Max Profit per Hour</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Applying the Framework"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'In the Recycling Robot example, what is the trade-off between "Search" and "Recharge"?', a: 'Search yields immediate reward (cans) but risks battery depletion and penalty. Recharge has zero immediate reward but guarantees a return to the High state for future gains.' },
                        { q: 'Give an example of a stochastic transition in an inventory MDP.', a: 'When the agent decides to "Wait" (no order), the next state (stock level) is uncertain because it depends on the random number of customers who arrive.' },
                        { q: 'Why are games like Chess or Go modeled as MDPs?', a: 'Because they are sequential decision processes where the current board (State) and move (Action) determine the win/loss (Reward), and the board transitions are deterministic (though the opponent adds uncertainty).' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: The Recycling Robot" 
                subtitle="Experience Stochastic Transitions"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="MDP Gallery"
                    description="Simulate pre-built MDP examples"
                    objective="Pick from classic MDPs (Gridworld, Cliff Walking, Mountain Car) and run Q-Learning to see how each poses unique challenges."
                    badge="Interactive Lab"
                    tips={['Cliff Walking has a high penalty cliff — the agent must learn to avoid it',
                'Gridworld is the simplest — good for understanding the basics']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Play as the agent! Notice how <strong>Search</strong> from Low energy is a gamble—it might work, or it might result in a depletion penalty.
                    </p>
                    <RecyclingRobotLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">MDP Examples: Mastered!</h3>
                    <p className="text-primary-100">
                        You've seen how the MDP framework adapts to any challenge. Now, let's dive into the core properties that make these models solvable!
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MARKOV PROPERTY
                    </button>
                </div>
            </div>
        </div>
    );
}
