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
    Share2,
    GitBranch,
    Target,
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
    ArrowDown,
    Trophy,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Backup Diagram Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Backup Diagram Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Backup Diagram simulator.",
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
    "🤖 [System] Initializing Backup Diagram Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Backup Diagram\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 7 ─────────────────────────────────────

/**
 * Interactive Backup Diagram: Visualizing the Tree
 */
function BackupDiagramLab() {
    const [activeLayer, setActiveLayer] = useState<number>(0);

    const layers = [
        { name: 'Root State (s)', desc: 'The state we want to evaluate.' },
        { name: 'Actions (a)', desc: 'Choices available according to policy \u03C0.' },
        { name: 'Transitions (s\', r)', desc: 'Probable outcomes of taking action a.' },
        { name: 'Leaves (Successors)', desc: 'The values we "back up" to the root.' }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Control Panel */}
                <div className="w-full md:w-1/3 space-y-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Traverse the Tree</h5>
                    <div className="space-y-2">
                        {layers.map((l, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveLayer(i)}
                                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                                    activeLayer === i 
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                    : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                                }`}
                            >
                                <div className={`text-xs font-black uppercase ${activeLayer === i ? 'text-primary-600' : 'text-slate-400'}`}>{l.name}</div>
                                <div className="text-[10px] text-slate-500 mt-1">{l.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Diagram Display */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative min-h-[400px]">
                    
                    {/* Root */}
                    <motion.div 
                        animate={{ scale: activeLayer >= 0 ? 1 : 0.8, opacity: activeLayer >= 0 ? 1 : 0.2 }}
                        className="w-12 h-12 rounded-full border-2 border-primary-500 bg-white dark:bg-slate-800 flex items-center justify-center font-black text-primary-600 shadow-lg z-10"
                    >
                        s
                    </motion.div>

                    {/* Action Nodes */}
                    <div className="flex gap-16 mt-8 relative">
                        <motion.div 
                            animate={{ opacity: activeLayer >= 1 ? 1 : 0 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-200"
                        />
                        {[1, 2].map(i => (
                            <div key={i} className="flex flex-col items-center">
                                <motion.div 
                                    animate={{ scale: activeLayer >= 1 ? 1 : 0.5, opacity: activeLayer >= 1 ? 1 : 0 }}
                                    className="w-4 h-4 rounded-full bg-slate-800 dark:bg-slate-200 z-10"
                                />
                                
                                {/* Transitions */}
                                <div className="flex gap-8 mt-8 relative">
                                    <motion.div 
                                        animate={{ opacity: activeLayer >= 2 ? 1 : 0 }}
                                        className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-200"
                                    />
                                    {[1, 2].map(j => (
                                        <div key={j} className="flex flex-col items-center">
                                            <motion.div 
                                                animate={{ scale: activeLayer >= 3 ? 1 : 0.5, opacity: activeLayer >= 3 ? 1 : 0 }}
                                                className="w-8 h-8 rounded-full border border-slate-300 bg-white dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-400"
                                            >
                                                s'
                                            </motion.div>
                                            <motion.div 
                                                animate={{ opacity: activeLayer === 3 ? 1 : 0, y: [0, -10, 0] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="text-primary-500 mt-2"
                                            >
                                                <ArrowDown size={14} className="rotate-180" />
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                        Information "Backs Up" from Bottom to Top
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic7_BackupDiagram() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic7_backupdiagram" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Family Tree of Decisions" 
                subtitle="Visualizing the Flow of Value"
                icon={<Share2 className="text-blue-600" size={24} />}
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
                                "Backup diagrams look like weird trees, but they're just visualizing the agent's anxiety about all possible futures."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <GitBranch size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌳 Seeing the Math
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Mathematical equations like the Bellman Equation can be intimidating. But what if you could <em>see</em> them?
                            </p>
                            <p>
                                **Backup Diagrams** are the "family trees" of Reinforcement Learning. They show how the value of a state (the root) is literally built from the values of the states that come after it (the leaves).
                            </p>
                            <p>
                                When we say we "back up" information, we mean we are taking the rewards and values from the future and bringing them back to the present. This visual language is the primary way RL researchers communicate complex algorithms.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Graphical Language">
                            Open circles represent **States**, and solid dots represent **Actions**. The lines show the possible transitions.
                        </InfoCard>
                        <InfoCard type="tip" title="Recursive Depth">
                            A backup diagram for a single step is a "shallow" tree. Multi-step methods (like n-step TD) have deeper trees.
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
                                Visually tracing and explaining the mathematical update path of a value estimation system as it updates a parent node from its child nodes.
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
                            A vital visual and conceptual tool that helps engineers conceptualize and debug how value estimates flow backward through state-action transitions.
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
                                    Highly intuitive graphical representations that make complex recursive equations easily readable.
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
                                    Can become cluttered and unreadable for systems with high branching factors or dense continuous actions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="7. Mapping Diagram to Equation" 
                subtitle="From Nodes to Terms"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                            <h5 className="font-bold text-primary-400 flex items-center gap-2"><Binary size={16} /> The v_pi Diagram</h5>
                            <p className="text-xs text-slate-400">
                                Shows the expectation over actions and next states. All branches are averaged.
                            </p>
                            <div className="text-sm font-mono text-white">$V(s) = \sum \pi \sum p [R + \gamma V']$</div>
                        </div>
                        <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                            <h5 className="font-bold text-indigo-400 flex items-center gap-2"><Trophy size={16} /> The v* Diagram</h5>
                            <p className="text-xs text-slate-400">
                                Shows the MAX over actions. Only the best branch contributes to the root.
                            </p>
                            <div className="text-sm font-mono text-white">$V(s) = \max_a \sum p [R + \gamma V']$</div>
                        </div>
                    </div>

                    <MathBlock 
                        formula="\text{Value flow: } \text{Successor } (s') \xrightarrow{\text{Backup}} \text{Action } (a) \xrightarrow{\text{Backup}} \text{State } (s)"
                        label="The Backup Sequence"
                        explanation="How information travels up the tree."
                        interpretation="Each level of the tree represents a level of uncertainty or decision-making that must be resolved (by averaging or maximizing)."
                        motivation="This mental model helps you understand why RL algorithms converge."
                        terms={[
                            { term: '\\xrightarrow{}', name: 'Information Transfer', meaning: 'The update step in an algorithm.', range: 't \\to t-1', example: 'Updating Q-values.' },
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Backup Diagram Architecture"
                description="Tree representation of look-ahead backups."
                chart={`graph TD
    S((State)) --> |Action| A[Node A]
    A --> |Prob| S1((S'))
    A --> |Prob| S2((S''))
    S1 --> |Reward| R1[R]
    S2 --> |Reward| R2[R]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="7. Multi-Level Activities" 
                subtitle="The Visual Syntax"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Diagram Explorer Demo",
                            objectives: "Observe the structural mapping between mathematical terms and visual tree nodes.",
                            instructions: [
                                "Open the 'Diagram Explorer' in the Virtual Lab section.",
                                "Layer 0: Show the Root State (s). Explain: 'This is where we are.'",
                                "Layer 1: Show the Actions (a). Explain: 'These are the choices in our policy.'",
                                "Layer 3: Show the Successors (s'). Explain: 'This is the information flowing back to update the root.'",
                                "Ask: 'How many leaves would there be if we had 5 possible next states?'"
                            ],
                            inputs: "Interactive BackupDiagramLab component",
                            outputs: "Progressive tree construction and node descriptions.",
                            rubrics: ["Clarity of 'Information Flow' explanation", "Correct node identification", "Student engagement"],
                            outcomes: "Students identify backup diagrams as visual representations of expectation and maximization.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Symbol-to-Sketch Workshop",
                            objectives: "Collaboratively translate a Bellman Equation into a hand-drawn backup diagram.",
                            instructions: [
                                "Teacher writes a specific equation on the board: $V(s) = \\max_a [R + \\gamma \\sum p V']$.",
                                "Guided Sketching: 'Step 1: Is the root a hollow circle or a dot?' (Circle).",
                                "Guided Sketching: 'Step 2: Does the action level use an arc for Max or separate dots?' (Arc for Max).",
                                "Class reflects: 'If we remove the Max and use a sum over $\\pi$, how does the sketch change?'",
                                "Conclusion: Every symbol in the math has a corresponding line or dot in the diagram."
                            ],
                            inputs: "Bellman Equation notation",
                            outputs: "Hand-drawn 'Optimality' Diagram on the board",
                            rubrics: ["Correct use of State/Action symbols", "Logical representation of Max vs Sum", "Classroom participation"],
                            outcomes: "Students master the visual syntax of RL research literature.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Tree Builder Challenge",
                            objectives: "Experience the design of a backup diagram for a relatable multi-stage decision.",
                            instructions: [
                                "Divide class into 4 teams. Scenario: 'Choosing a Dinner Plan'.",
                                "States: {At Home, At Restaurant, Grocery Store}.",
                                "Actions: {Drive, Walk, Order Delivery}.",
                                "Group Task: Design a 2-step backup diagram for this scenario.",
                                "Constraint: Include at least one stochastic transition (e.g., 'Traffic' might delay the drive).",
                                "Teams present their 'Decision Trees' and identify the 'Information Source' (the reward at the end)."
                            ],
                            inputs: "Relatable life scenario",
                            outputs: "Scenario-based Backup Diagrams on chart paper",
                            rubrics: ["Logical consistency of transitions", "Proper node labeling", "Team coordination"],
                            outcomes: "Students understand that backup diagrams are not just for robots, but for any sequential choice.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Paper Diagram Audit",
                            objectives: "Independently audit a professional RL research paper to decode its core diagram.",
                            instructions: [
                                "Task: Find an image of a 'Backup Diagram' from a famous RL paper (e.g., n-step Sarsa, Monte Carlo, or Q-Learning).",
                                "Audit: Count the levels of the tree. Is it 'Shallow' (1-step) or 'Deep' (Multi-step)?",
                                "Reflection: Does the diagram show a 'Sample' (one path) or an 'Expected' (all paths) backup?",
                                "Analysis: How does this specific diagram explain the 'Novelty' of that paper's algorithm?",
                                "Report: Write a 3-sentence 'caption' for the diagram that a non-expert could understand."
                            ],
                            inputs: "Internet access or paper database",
                            outputs: "Individual Research Diagram Audit (1 page)",
                            rubrics: ["Identification of 'Backup Depth'", "Understanding of 'Expectation vs Sampling'", "Originality"],
                            outcomes: "Students bridge the gap between classroom theory and peer-reviewed RL engineering.",
                            time: "15 Mins",
                            materials: ["Student Workbook", "Laptop/Mobile"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="7. Project: Paper Research" 
                subtitle="Reading RL Literature"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Deep RL Skills</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            When reading breakthrough papers like **DQN** or **PPO**, look specifically for the backup diagrams. They will tell you exactly how the researchers modified the Bellman update to handle their specific problem. If you can read the diagram, you can understand the paper!
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100">
                            <div className="text-[10px] font-bold text-indigo-500 uppercase">One-Step TD</div>
                            <p className="text-xs mt-1 text-slate-500">Shortest possible backup. Fast but biased.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100">
                            <div className="text-[10px] font-bold text-indigo-500 uppercase">Monte Carlo</div>
                            <p className="text-xs mt-1 text-slate-500">Backup from the very end of the episode. Slow but accurate.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="7. Quick Check" 
                subtitle="Visual Theory"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What does a hollow circle represent in a backup diagram?', a: 'A hollow circle represents a State (s).' },
                        { q: 'What does a solid black dot represent?', a: 'A solid black dot represents an Action (a).' },
                        { q: 'Why are these diagrams called "Backup" diagrams?', a: 'Because they illustrate how information from successor states is brought back (backed up) to update the current state.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: The Diagram Explorer" 
                subtitle="Deconstruct the Tree"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Backup Tree Explorer"
                    description="Navigate the backup tree interactively"
                    objective="Click on any node to expand the backup tree. Observe how value backs up from leaf nodes to the root."
                    badge="Interactive Lab"
                    tips={['White circles = states, Black squares = state-action pairs',
                'MC backup goes all the way to the leaf (episode end)',
                'TD backup only goes one step ahead']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In this lab, you can interactively build a backup diagram layer by layer. Click through the buttons on the left to see how the mathematical terms translate into visual nodes in the tree.
                    </p>
                    <BackupDiagramLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Visuals Mastered!</h3>
                    <p className="text-primary-100">
                        You can now "see" the math of RL. Ready to zoom out and look at the big picture of the Q-Learning algorithm?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: Q-LEARNING OVERVIEW
                    </button>
                </div>
            </div>
        </div>
    );
}
