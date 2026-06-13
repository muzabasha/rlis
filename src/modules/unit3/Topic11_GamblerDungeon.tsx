import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect, useCallback } from 'react';
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
    Gamepad2,
    Skull,
    Coins,
    DoorOpen,
    Play,
    RotateCcw,
    Target,
    Briefcase,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Search,
    Brain,
    Trophy,
    Flame,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';

import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Interactive Components for Topic 11 ─────────────────────────────────────

/**
 * Dungeon Mini-Game: Manual Q-Learning Exploration
 */
function DungeonLab() {
    const [pos, setPos] = useState(0); // 0 to 4 (Start to Exit)
    const [qValues, setQValues] = useState([0, 0, 0, 0, 0]);
    const [status, setStatus] = useState<'Exploring' | 'Won' | 'Dead'>('Exploring');
    const [rewardHistory, setRewardHistory] = useState<number[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const [challenges, setChallenges] = useState<LabChallenge[]>([
        { id: 'survivor', quest: 'Dungeon Survivor', target: 'Reach the Exit safely', isCompleted: false },
        { id: 'greedy_path', quest: 'Greedy Path Finder', target: 'Reach the Exit with total score > 0', isCompleted: false },
        { id: 'pain_learner', quest: 'Learning from Pain', target: 'Fall into Lava to initialize Q-warning values', isCompleted: false }
    ]);

    const grid = [
        { type: 'Start', icon: User, reward: 0 },
        { type: 'Gold', icon: Coins, reward: 10 },
        { type: 'Lava', icon: Flame, reward: -50 },
        { type: 'Gold', icon: Coins, reward: 20 },
        { type: 'Exit', icon: DoorOpen, reward: 100 }
    ];

    function User({ size, className }: { size: number, className?: string }) {
        return <div className={`rounded-full bg-primary-500 w-[${size}px] h-[${size}px] ${className}`} />;
    }

    const moveRight = () => {
        if (status !== 'Exploring') return;
        
        const nextPos = pos + 1;
        const reward = grid[nextPos].reward;
        
        // Q-Update (Simplified alpha=0.5, gamma=0.9)
        const currentQ = qValues[pos];
        const nextMaxQ = nextPos < 4 ? qValues[nextPos + 1] : 0;
        const target = reward + 0.9 * nextMaxQ;
        const newQ = currentQ + 0.5 * (target - currentQ);

        const newQValues = [...qValues];
        newQValues[pos] = parseFloat(newQ.toFixed(1));
        setQValues(newQValues);

        setPos(nextPos);
        const newRewardHistory = [...rewardHistory, reward];
        setRewardHistory(newRewardHistory);
        
        const totalScore = newRewardHistory.reduce((a, b) => a + b, 0);

        // Streaming Log
        const logMsg = `[Step ${newRewardHistory.length}] Moved state ${pos} → ${nextPos} (${grid[nextPos].type}) | Reward: ${reward >= 0 ? '+' : ''}${reward} | Q-Update: Q(${pos}) = ${currentQ} → ${newQValues[pos].toFixed(1)} | Total Score: ${totalScore}`;
        setLogs(prev => [...prev, logMsg]);

        let finalStatus: 'Exploring' | 'Won' | 'Dead' = 'Exploring';
        if (grid[nextPos].type === 'Exit') {
            finalStatus = 'Won';
            setStatus('Won');
            setLogs(prev => [...prev, `🎉 HUZZAH! Gambler reached the Exit safely! Total Score: ${totalScore}`]);
            
            setChallenges(prev => prev.map(c => {
                if (c.id === 'survivor') return { ...c, isCompleted: true };
                if (c.id === 'greedy_path' && totalScore > 0) return { ...c, isCompleted: true };
                return c;
            }));
        }
        if (grid[nextPos].type === 'Lava') {
            finalStatus = 'Dead';
            setStatus('Dead');
            setLogs(prev => [...prev, `💀 CRASH! Gambler fell into a Lava Pit. Received -50 reward.`]);
            setChallenges(prev => prev.map(c => c.id === 'pain_learner' ? { ...c, isCompleted: true } : c));
        }
    };

    const reset = () => {
        setPos(0);
        setStatus('Exploring');
        setRewardHistory([]);
        setLogs(prev => [...prev, `🔄 Simulation Reset. Gambler returned to State 0.`]);
    };

    const fullReset = () => {
        setPos(0);
        setStatus('Exploring');
        setRewardHistory([]);
        setQValues([0, 0, 0, 0, 0]);
        setLogs([]);
        setChallenges(prev => prev.map(c => ({ ...c, isCompleted: false })));
    };

    return (
        <VirtualLabShell
            title="Dungeon Crawler Workspace"
            description="Manual Bellman Value iteration Sandbox"
            objective="Manually navigate the gambler to the exit. Observe how Q-values propagate backwards in real-time."
            badge="Interactive Lab"
            telemetry={[
                { label: 'Current Square', value: `State ${pos}` },
                { label: 'Status', value: status, color: status === 'Won' ? 'text-emerald-450' : status === 'Dead' ? 'text-red-450' : 'text-cyan-400' },
                { label: 'Total Score', value: rewardHistory.reduce((a, b) => a + b, 0), color: 'text-amber-400', highlight: true }
            ]}
            tips={[
                'Click "MOVE RIGHT" to advance the agent step-by-step.',
                'Watch the numbers above the cells — these are the Q-value estimates of reaching the exit.',
                'Fall into the lava once to see how the negative reinforcement propagates backwards to warn the agent.'
            ]}
            challenges={challenges}
            logs={logs}
            notebook={[
                {
                    task: 'Successfully navigate to the Exit (State 4) once. Look at the new Q-value at State 3.',
                    question: 'What is the updated value of Q(3) and why is it positive even though State 3 itself yields no immediate gold?',
                    hint: 'The Q-update looks ahead: Q(3) incorporates the discounted exit reward (+100 * gamma).'
                },
                {
                    task: 'Reset and walk directly into the Lava pit (State 2). Inspect Q(1) immediately.',
                    question: 'Why does a negative value at Q(1) serve as an automated shield warning for a greedy agent?',
                    hint: 'A greedy policy picks max Q. Since Q(1) is negative, other paths are favored.'
                }
            ]}
            onReset={fullReset}
        >
            <div className="space-y-6">
                {/* Grid Visualizer */}
                <div className="flex justify-between items-center gap-2 p-6 bg-slate-900 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 opacity-50" />
                    
                    {grid.map((cell, i) => {
                        const Icon = cell.icon;
                        const isUserHere = pos === i;
                        return (
                            <div key={i} className="flex flex-col items-center gap-3 z-10">
                                <div className={`text-[10px] font-mono font-black uppercase tracking-widest ${isUserHere ? 'text-cyan-400' : 'text-slate-400'}`}>
                                    {qValues[i]}
                                </div>
                                <motion.div 
                                    animate={{ 
                                        scale: isUserHere ? 1.15 : 1,
                                        borderColor: isUserHere ? '#06b6d4' : 'rgba(255,255,255,0.1)'
                                    }}
                                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center relative transition-all ${
                                        cell.type === 'Lava' ? 'bg-red-950/40 border-red-500/20' : cell.type === 'Exit' ? 'bg-emerald-950/40 border-emerald-500/20' : 'bg-slate-800/50'
                                    }`}
                                >
                                    <Icon size={24} className={cell.type === 'Lava' ? 'text-red-500' : cell.type === 'Exit' ? 'text-emerald-500' : 'text-slate-400'} />
                                    {isUserHere && (
                                        <motion.div 
                                            layoutId="user"
                                            className="absolute inset-0 bg-cyan-500/20 rounded-2xl flex items-center justify-center"
                                        >
                                            <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                                        </motion.div>
                                    )}
                                </motion.div>
                                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wide">{cell.type}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-3xl border border-slate-100 dark:border-slate-800/80">
                    <div className="space-y-1 text-center md:text-left">
                        <h4 className="font-bold text-slate-800 dark:text-white flex items-center justify-center md:justify-start gap-2">
                            {status === 'Exploring' && <Search size={18} className="text-cyan-500" />}
                            {status === 'Won' && <Trophy size={18} className="text-emerald-500 animate-bounce" />}
                            {status === 'Dead' && <Skull size={18} className="text-red-500" />}
                            Dungeon Status: <span className="uppercase font-black text-cyan-600">{status}</span>
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">Step Reward: {rewardHistory.length > 0 ? rewardHistory[rewardHistory.length - 1] : 0}</p>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={moveRight}
                            disabled={status !== 'Exploring'}
                            className="px-8 py-4 bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-2xl font-black shadow-lg shadow-cyan-500/10 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-30 disabled:hover:scale-100"
                        >
                            MOVE RIGHT <StepForward size={18} />
                        </button>
                        <button 
                            onClick={reset}
                            className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-colors"
                            title="Restart Episode"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </VirtualLabShell>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic11_GamblerDungeon() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic11_gamblerdungeon" />
            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit3', 'Topic11_GamblerDungeon');
                        if (!data) return null;
                        return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{data.prerequisites.map((p, i) => <li key={i}>{p}</li>)}</ul>);
                    })()}
                </div>
            </SectionWrapper>

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Escape from the Lava Dungeon" 
                subtitle="The Q-Table's First Adventure"
                icon={<Gamepad2 className="text-blue-600" size={24} />}
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
                                "The Gambler's Problem: teaching AI why going to Vegas with your life savings is a mathematically terrible idea."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Skull size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌋 Gold, Lava, and Logic
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a gambler trapped in a 1D dungeon grid. To escape, they must reach the **Exit**.
                            </p>
                            <p>
                                Along the way, there are **Gold Coins** (Small Positive Rewards) and **Lava Pits** (Huge Negative Rewards). The gambler has no map and doesn't know where the lava is.
                            </p>
                            <p>
                                In the first episode, the gambler moves randomly and likely falls into the lava. But the **Q-Update** ensures that the "Action" that led to the lava is marked as "Bad" in the Q-table.
                            </p>
                            <p>
                                Over many rounds, the gambler learns to sprint past the gold and stop exactly before the lava. The Q-table has turned a deadly mystery into a **Calculated Path**.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Negative Reinforcement">
                            Large negative rewards (like Lava) cause the Q-values of nearby states to drop sharply, creating a "Warning Zone" the agent learns to avoid.
                        </InfoCard>
                        <InfoCard type="tip" title="The Golden Path">
                            Eventually, the highest Q-values in each state will point directly toward the Exit, forming the **Optimal Policy**.
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
                                Optimizing a high-frequency trading algorithm's bet sizes when the probability of win/loss changes dynamically.
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
                            Illustrates how value iteration solves classic probability staking problems, teaching students the mathematics of risk and reward.
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
                                    Beautifully demonstrates how non-intuitive, optimal staking patterns naturally emerge from the Bellman equation.
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
                                    Assumes perfect knowledge of win probabilities, which is rarely available in actual financial markets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Dungeon MDP" 
                subtitle="Quantifying Risk and Reward"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                            <h5 className="font-bold text-primary-400 flex items-center gap-2"><Binary size={16} /> Reward Structure</h5>
                            <ul className="text-xs space-y-2 text-slate-400">
                                <li className="flex justify-between"><span>Gold Cell</span> <span className="text-emerald-500">+10</span></li>
                                <li className="flex justify-between"><span>Lava Cell</span> <span className="text-red-500">-50</span></li>
                                <li className="flex justify-between"><span>Exit Cell</span> <span className="text-primary-400">+100</span></li>
                            </ul>
                        </div>
                        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                            <h5 className="font-bold text-indigo-400 flex items-center gap-2"><Zap size={16} /> Convergence Goal</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {"We want $Q(s, \\text{right})$ to represent the true proximity to the exit, accounting for both the gold rewards and the risk of the lava pit."}
                            </p>
                        </div>
                    </div>

                    <MathBlock 
                        formula="Q(s, a) \approx \mathbb{E} [r + \gamma r' + \gamma^2 r'' + \dots]"
                        label="Long-term Quality"
                        explanation="The Q-value represents the sum of all future rewards from that point."
                        interpretation="In the dungeon, the Q-value of the square right before the exit will be nearly 100, while the square before the lava will be very low."
                        motivation="This allows the agent to make 'Safe' decisions today by looking at the 'Value' of tomorrow."
                        terms={[
                            { term: 'r', name: 'Immediate', meaning: 'The gold or lava in the next square.', range: '\mathbb{R}', example: '-50 for lava.' },
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Gambler Dungeon Architecture"
                description="State space representation of the Gambler's Problem."
                chart={`graph LR
    0((0: Lose)) <-- |Tails| 1((1)) --> |Heads| 2((2))
    2 <-- |Tails| 3((3)) --> |Heads| 4((4))
    3 -.-> 100((100: Win))`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="Dungeon Survival Tactics"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Lava Pit Crash Demo",
                            objectives: "Observe the drastic impact of negative reinforcement on an agent's memory.",
                            instructions: [
                                "Open the 'Dungeon Crawler' in the Virtual Lab section.",
                                "Deliberately move the agent into the 'Lava' cell.",
                                "Point out the Q-value change: 'Look how it crashed from 0 to -25 or -50.'",
                                "Explain: 'This isn't just a number; it's a permanent warning sign that says DO NOT ENTER.'",
                                "Ask: 'If the exit reward was only +1, would the agent ever try to cross the lava?'"
                            ],
                            inputs: "Interactive DungeonLab component",
                            outputs: "Live Q-value drops and 'Dead' status animations.",
                            rubrics: ["Clarity of 'Negative Reinforcement' explanation", "Demonstration of Q-crash", "Student engagement"],
                            outcomes: "Students identify high-penalty rewards as the primary drivers of safety-critical learning.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Value Propagation Workshop",
                            objectives: "Collaboratively calculate how many steps it takes for a goal reward to 'trickle down' to the start.",
                            instructions: [
                                "Teacher draws a 4-cell grid on the board: [S] [ ] [ ] [G].",
                                "The Goal [G] has a value of 100. All others are 0.",
                                "Guided Calculation: 'Round 1: Agent moves from Cell 2 to G. What is Cell 2's new value?' ($\\gamma \\times 100$).",
                                "Guided Calculation: 'Round 2: Agent moves from Cell 1 to Cell 2. What is Cell 1's new value?' ($\\gamma^2 \\times 100$).",
                                "Class reflects: 'Why does the value get smaller the further we are from the goal?' (The Discount Factor $\\gamma$ acts like distance).",
                                "Conclusion: RL is a game of 'reward whispering' where the end tells the beginning what to do."
                            ],
                            inputs: "Linear 4-cell grid diagram",
                            outputs: "Calculated Q-gradient on the whiteboard",
                            rubrics: ["Correct application of $\\gamma$ powers", "Understanding of 'Backward' propagation", "Classroom participation"],
                            outcomes: "Students master the concept of how Q-values form a path through space and time.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Deadliest Dungeon Challenge",
                            objectives: "Experience the design of reward structures and their impact on agent behavior.",
                            instructions: [
                                "Divide class into 4 teams. Each team receives a 5x5 grid template.",
                                "Group Task: Place 1 Start, 1 Exit, 3 Gold, and 3 Lava pits.",
                                "Constraint: The Gold must be placed so that it tempts the agent to walk *near* the Lava.",
                                "Teams exchange grids and must 'solve' them by identifying the 'Deadly Path' (where the agent would likely crash) and the 'Safe Path'.",
                                "Conclusion: 'Bad reward design leads to bad agent behavior.'"
                            ],
                            inputs: "5x5 Grid templates",
                            outputs: "Mapped reward environments and 'Safety Audits'",
                            rubrics: ["Strategic placement of rewards", "Logical identification of risk paths", "Team coordination"],
                            outcomes: "Students visualize the relationship between environment design and policy convergence.",
                            time: "20 Mins",
                            materials: ["Grid paper", "Colored markers"]
                        },
                        {
                            level: 4,
                            title: "High-Stakes Decision Audit",
                            objectives: "Independently audit a real-world high-risk decision using Dungeon logic.",
                            instructions: [
                                "Task: Choose a scenario like 'Investing in Crypto', 'Extreme Sports', or 'Medical Surgery'.",
                                "Audit: Define the 'Lava' (The catastrophic failure) and the 'Gold' (The minor wins).",
                                "Reflection: Is the 'Exit' reward (The ultimate success) high enough to justify the 'Lava' squares?",
                                "Analysis: If the 'Discount Factor' $\\gamma$ was 1.0 (no discount), would you take more risks or fewer?",
                                "Propose: A 'Reward Function' for an AI that manages a city's power grid during a storm."
                            ],
                            inputs: "Case study prompts or personal experience",
                            outputs: "Individual Risk/Reward Strategy Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Logical risk assessment", "Originality"],
                            outcomes: "Students bridge the gap between grid-world simulations and critical real-world decision theory.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: Autonomous Mining" 
                subtitle="Robots in High-Risk Zones"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Mining Automation</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Deep-sea or underground mining robots use Q-Learning to navigate tunnels. "Lava" in their world might be unstable rock formations or high-pressure zones. The robot learns to maximize ore extraction (Gold) while minimizing equipment damage (Lava).
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Binary size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Sensors</div>
                            <p className="text-[8px] mt-1">Detecting Unstable Rock</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-750 text-center">
                            <Search size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Process</div>
                            <p className="text-[8px] mt-1">Updating Safety Q-Table</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-750 text-center text-emerald-600">
                            <CheckCircle2 size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">Result</div>
                            <p className="text-[8px] mt-1">Safe Extraction</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Dungeon Mastery"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'In the dungeon example, why do we use a high negative reward for lava?', a: 'To ensure the Q-value for actions leading to lava becomes significantly lower than others, forcing the agent\'s policy to avoid those actions.' },
                        { q: 'How does the gambler "look ahead" without a map?', a: 'By using the max Q-value of the next state in its update rule. This "backs up" the value of the exit through the intermediate squares.' },
                        { q: 'What happens to the Q-values after the gambler has explored for 1000 episodes?', a: 'The Q-values will converge, creating a smooth gradient of increasing values that lead directly to the exit.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Dungeon Crawler" 
                subtitle="Train your own Gambler"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Manually move the gambler across the dungeon. Watch how the **Q-Values** (the numbers above the cells) update in real-time as you encounter gold or lava. Try to "train" the agent so that the highest numbers lead to the exit!
                    </p>
                    <DungeonLab />
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => {
                    const data = getTopicData('unit3', 'Topic11_GamblerDungeon');
                    if (!data) return null;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit3', 'Topic11_GamblerDungeon');
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
            <div className="bg-cyan-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-cyan-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Dungeon Escaped!</h3>
                    <p className="text-cyan-100">
                        You've seen Q-Learning solve a survival task. Now, let's explore where else this technology is changing the world.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-cyan-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: Q-LEARNING APPLICATIONS
                    </button>
                </div>
            </div>
        </div>
    );
}

// Helper icons
function StepForward({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" />
        </svg>
    );
}
