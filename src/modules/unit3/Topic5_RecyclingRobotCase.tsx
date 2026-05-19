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
    Bot,
    Zap,
    Battery,
    Search,
    RefreshCcw,
    TrendingUp,
    Target,
    LayoutGrid,
    Brain,
    Swords,
    Focus,
    CheckCircle2,
    Play,
    Pause,
    RotateCcw,
    ChevronRight,
    Binary,
    Trophy,
    Briefcase,
    Layers,
    Eye,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Recycling Robot Case Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Recycling Robot Case Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Recycling Robot Case simulator.",
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
    "🤖 [System] Initializing Recycling Robot Case Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Recycling Robot Case\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 5 ─────────────────────────────────────

/**
 * Recycling Robot Simulation: State-Action Visualizer
 */
function RobotCaseLab() {
    const [energy, setEnergy] = useState<'High' | 'Low'>('High');
    const [lastAction, setLastAction] = useState<string | null>(null);
    const [totalReward, setTotalReward] = useState(0);
    const [history, setHistory] = useState<string[]>([]);

    const runAction = (action: 'Search' | 'Wait' | 'Recharge') => {
        setLastAction(action);
        let reward = 0;
        let nextEnergy = energy;

        if (action === 'Search') {
            if (energy === 'High') {
                const rand = Math.random();
                reward = 10;
                nextEnergy = rand < 0.7 ? 'High' : 'Low';
            } else {
                const rand = Math.random();
                if (rand < 0.5) {
                    reward = 10;
                    nextEnergy = 'Low';
                } else {
                    reward = -3; // Rescued
                    nextEnergy = 'High';
                }
            }
        } else if (action === 'Wait') {
            reward = 1;
            nextEnergy = energy;
        } else if (action === 'Recharge') {
            reward = 0;
            nextEnergy = 'High';
        }

        const logEntry = `${action} in ${energy}: Reward ${reward}`;
        setHistory(prev => [logEntry, ...prev].slice(0, 4));
        setTotalReward(prev => prev + reward);
        setEnergy(nextEnergy);
    };

    const reset = () => {
        setEnergy('High');
        setTotalReward(0);
        setHistory([]);
        setLastAction(null);
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Control Panel */}
                <div className="w-full md:w-1/3 space-y-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pick an Action</h5>
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={() => runAction('Search')}
                            className="p-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                        >
                            <Search size={18} /> SEARCH
                        </button>
                        <button 
                            onClick={() => runAction('Wait')}
                            className="p-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                        >
                            <Target size={18} /> WAIT
                        </button>
                        <button 
                            onClick={() => runAction('Recharge')}
                            disabled={energy === 'High'}
                            className="p-4 bg-amber-500 text-white rounded-2xl font-black shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-30 disabled:hover:scale-100"
                        >
                            <Zap size={18} /> RECHARGE
                        </button>
                        <button 
                            onClick={reset}
                            className="mt-4 p-2 text-slate-400 hover:text-slate-600 text-[10px] font-bold uppercase flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={12} /> Reset Robot
                        </button>
                    </div>
                </div>

                {/* Robot Display */}
                <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Bot size={140} />
                    </div>

                    <div className="relative">
                        <motion.div
                            animate={{ 
                                y: [0, -5, 0],
                                scale: lastAction ? [1, 1.1, 1] : 1
                            }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="text-slate-700 dark:text-slate-200"
                        >
                            <Bot size={80} />
                        </motion.div>
                        <motion.div 
                            animate={{ opacity: energy === 'Low' ? [0.2, 1, 0.2] : 1 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="absolute -top-2 -right-2"
                        >
                            {energy === 'High' ? <Battery className="text-emerald-500" /> : <Battery className="text-red-500" />}
                        </motion.div>
                    </div>

                    <div className="text-center space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Energy State</span>
                        <div className={`text-2xl font-black ${energy === 'High' ? 'text-emerald-600' : 'text-red-500'}`}>
                            {energy} Energy
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-center border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Reward</span>
                            <p className="text-xl font-black text-primary-600">{totalReward}</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl flex flex-col justify-center border border-slate-100 overflow-hidden">
                            <span className="text-[8px] font-bold text-slate-400 uppercase mb-1">History</span>
                            <div className="space-y-0.5">
                                {history.map((h, i) => (
                                    <div key={i} className="text-[8px] text-slate-500 font-medium truncate">{h}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic5_RecyclingRobotCase() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic5_recyclingrobotcase" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Soda Can Scavenger" 
                subtitle="The Classic Recycling Robot"
                icon={<Bot className="text-blue-600" size={24} />}
                badge="Case Study"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Search size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🥫 Sutton & Barto's Favorite Robot
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Meet the **Recycling Robot**. Its only job is to wander around an office and collect empty soda cans. It doesn't have a map, and its battery isn't infinite.
                            </p>
                            <p>
                                The robot has two states: **High** energy and **Low** energy. It faces a difficult choice every minute:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-base font-medium">
                                <li>**Search**: High reward (+10), but risks draining the battery.</li>
                                <li>**Wait**: Small safe reward (+1), battery stays the same.</li>
                                <li>**Recharge**: Zero reward, but battery goes back to High.</li>
                            </ul>
                            <p>
                                This case study is the perfect playground for testing policies and value functions in a world of trade-offs.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Resource Dilemma">
                            The robot must balance the greed for cans (**Search**) with the survival need for energy (**Recharge**).
                        </InfoCard>
                        <InfoCard type="tip" title="MDP Transitions">
                            Searching in "Low" energy has a chance of complete depletion, requiring a human rescue (Reward -3).
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
                                Optimizing a solar-powered field robot's battery consumption so it never drains completely and gets stranded in the middle of a mission.
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
                            Provides a tangible, classic industrial case study showing how state, action, and energy transitions are mathematically optimized.
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
                                    Highly relatable and practical; clearly illustrates the delicate trade-off between battery risk and work reward.
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
                                    Highly idealized scenario that oversimplifies real-world continuous electrical and terrain dynamics.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="7. Modelling the Robot MDP" 
                subtitle="States, Actions, and Probabilities"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                            <h5 className="font-bold text-primary-400 flex items-center gap-2"><Binary size={16} /> {"State Space $\\mathcal{S}$"}</h5>
                            <ul className="text-xs space-y-2 text-slate-400">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {"$s_1 = \text{High Energy}$"}</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {"$s_2 = \text{Low Energy}$"}</li>
                            </ul>
                        </div>
                        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                            <h5 className="font-bold text-indigo-400 flex items-center gap-2"><Zap size={16} /> {"Action Space $\\mathcal{A}$"}</h5>
                            <ul className="text-xs space-y-2 text-slate-400">
                                <li>{"$a_1 = \text{Search}$"}</li>
                                <li>{"$a_2 = \text{Wait}$"}</li>
                                <li>{"$a_3 = \text{Recharge (only in Low)}$"}</li>
                            </ul>
                        </div>
                    </div>

                    <MathBlock 
                        formula="p(s_{low} | s_{high}, \text{search}) = 1 - \alpha"
                        label="Transition Probability"
                        explanation="The probability that searching in High energy state results in a Low energy state."
                        interpretation="$\alpha$ is the probability that the battery remains High after searching. If $\alpha=0.7$, the robot has a 30% chance of dropping to Low energy."
                        motivation="This uncertainty is what makes the policy decision interesting."
                        terms={[
                            { term: '\alpha', name: 'Retention Prob', meaning: 'Likelihood energy stays high.', range: '0 \to 1', example: '0.7 (70% chance).' },
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Recycling Robot Case Architecture"
                description="State machine for the Recycling Robot case study."
                chart={`stateDiagram-v2
    [*] --> High
    High --> High : Search (prob alpha)
    High --> Low : Search (prob 1-alpha)
    High --> High : Wait
    Low --> Low : Wait
    Low --> High : Recharge
    Low --> Rescue : Search (prob 1-beta)
    Rescue --> High : (Penalty -3)`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="7. Multi-Level Activities" 
                subtitle="The Strategy of Survival"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Robot Command Demo",
                            objectives: "Observe the stochastic nature of searching and the deterministic nature of recharging.",
                            instructions: [
                                "Open the 'Robot Command Center' in the Virtual Lab section.",
                                "Search 5 times in the 'High' state. Show how it eventually drops to 'Low'.",
                                "Wait until energy is Low. Search again. Show the 'Rescue Penalty' (r=-3) if it fails.",
                                "Explain: 'Recharge is a safe move with 0 immediate reward, but it has high value because it prevents the penalty.'",
                                "Ask: 'Which action is the riskiest and why?'"
                            ],
                            inputs: "Interactive RobotCaseLab component",
                            outputs: "State transition logs and reward accumulation visuals.",
                            rubrics: ["Clarity of 'Risk/Reward' explanation", "Demonstration of transition probabilities", "Student engagement"],
                            outcomes: "Students identify the core tension between greed and battery safety in RL.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Expected Scavenge Workshop",
                            objectives: "Collaboratively calculate expected rewards for different actions in different states.",
                            instructions: [
                                "Teacher presents parameters: Search Reward = +10, Rescue Penalty = -3.",
                                "Scenario: In 'Low' state, searching has a 50% success (+10) and 50% failure (-3).",
                                "Teacher asks: 'What is the expected reward of Searching from Low?' ($0.5(10) + 0.5(-3) = 3.5$).",
                                "Class reflects: 'Is 3.5 better than the safe Wait reward of +1?' (Yes, mathematically, but it might drain the battery forever).",
                                "Discussion: 'How does $\\gamma$ change our willingness to risk the penalty?'"
                            ],
                            inputs: "Action reward/penalty parameters",
                            outputs: "Expected Value calculations on the board",
                            rubrics: ["Correct use of expected value formula", "Logical comparison of actions", "Classroom participation"],
                            outcomes: "Students master the technical skill of evaluating action 'Quality' using probability.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Safety Threshold Challenge",
                            objectives: "Experience the design of a robust policy for resource management.",
                            instructions: [
                                "Divide class into 4 teams. Provide a 'Robot Log' template.",
                                "Condition: If the robot is rescued, it loses all cans collected in that 'day'.",
                                "Group Task: Design a policy using a 'Safety Threshold'. At what exact energy level (represented by probability $\\alpha$) do you stop searching and go to Recharge?",
                                "Teams 'compete' by simulating their policy against the board's random dice rolls.",
                                "Conclusion: 'Which team collected the most cans without a single rescue?'"
                            ],
                            inputs: "Robot simulation rules and dice",
                            outputs: "Safety-First Policy Document (Threshold Chart)",
                            rubrics: ["Strategic depth of the threshold", "Understanding of cumulative risk", "Team coordination"],
                            outcomes: "Students realize that 'Optimal' often means 'Safest over the long term'.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers", "Dice"]
                        },
                        {
                            level: 4,
                            title: "Smart Device Energy Audit",
                            objectives: "Independently audit a real-world device's MDP-like power management logic.",
                            instructions: [
                                "Task: Choose a device (e.g., Laptop, Smartphone, or EV).",
                                "Audit: Identify its 'Low Energy' policy (e.g., Phone turns off 5G, dims screen, stops background sync).",
                                "Reflection: Map these to RL components. State (Battery %), Actions (Dim screen, kill sync), Rewards (Extended life).",
                                "Analysis: Does your device have a 'Search' equivalent? (e.g., Performance Mode). Why is it disabled at 10% battery?",
                                "Propose: How would an 'RL-based Power Saver' be better than current static rules?"
                            ],
                            inputs: "Personal device settings",
                            outputs: "Individual Energy Management Audit (1 page)",
                            rubrics: ["Correct mapping to RL terminology", "Critical thinking on 'Utility vs Life'", "Originality"],
                            outcomes: "Students bridge the gap between classroom case studies and commercial engineering.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="7. Project: The Rescue Signal" 
                subtitle="Modelling Catastrophic Failure"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Industrial Context</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            In automated warehouses (like Amazon), robots must decide when to go to a charging station. If a robot runs out of battery in a middle of a shelf aisle, it blocks other robots, causing a **Negative Global Reward**. This is exactly why we model "Rescues" as high negative rewards in the MDP.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Layers size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Input</div>
                            <p className="text-[8px] mt-1">Battery Voltage</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Eye size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Detection</div>
                            <p className="text-[8px] mt-1">Low Energy Threshold</p>
                        </div>
                        <div className="p-3 bg-indigo-600 text-white rounded-xl text-center">
                            <Zap size={24} className="mx-auto mb-2 text-indigo-100" />
                            <div className="text-[10px] font-bold uppercase">Decision</div>
                            <p className="text-[8px] mt-1">Force Recharge</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="7. Quick Check" 
                subtitle="Robot Theory"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is "Recharge" not available in the High energy state?', a: 'Because the battery is already full; it wouldn\'t change the state. In MDP modelling, we often exclude actions that have no effect to simplify the action space.' },
                        { q: 'What represents the "Reward" in the Recycling Robot case?', a: 'The reward is the number of cans collected. Searching gives a high reward (+R_search), Waiting gives a small reward (+R_wait), and being rescued gives a negative reward (-3).' },
                        { q: 'Is the Recycling Robot MDP episodic or continuing?', a: 'It is typically modelled as a continuing task because the robot keeps operating day after day without a natural "Terminal State".' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Robot Command Center" 
                subtitle="Operate the Scavenger"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Robot Command Center"
                    description="Operate the Recycling Robot directly"
                    objective="Act as the policy! Choose Search, Wait, or Recharge and try to maximize total reward without getting rescued."
                    badge="Interactive Lab"
                    tips={['Getting rescued costs -3 reward — avoid it at Low energy',
                'Recharge has 0 immediate reward but prevents -3 penalty',
                'Can you beat 50 total reward in 20 steps?']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In this lab, you are the policy! Click the actions to see how the robot's energy state changes. Try to collect as many cans as possible without needing a rescue (which drains your total reward).
                    </p>
                    <RobotCaseLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Case Study Completed!</h3>
                    <p className="text-primary-100">
                        You've seen MDPs in action. Now, let's look at the mathematical peak: The Optimal Policy and Optimal Value Function.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: OPTIMAL POLICY
                    </button>
                </div>
            </div>
        </div>
    );
}
