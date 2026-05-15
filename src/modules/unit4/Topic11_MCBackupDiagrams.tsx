import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Share2, Bot, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, Search, Brain, Globe, Rocket,
    Activity, Cpu, HardDrive, Target, Briefcase,
    Shield, Move, MousePointer2, User, Layout, Map,
    History, ArrowDown, Flag
} from 'lucide-react';

// ─── Interactive Components for Topic 11 ─────────────────────────────────────

/**
 * Episode Tracer: Visualizing MC Trajectories
 */
function EpisodeTracer() {
    const [step, setStep] = useState(0);
    const trajectory = [
        { type: 'State', label: 'S₀', reward: 0 },
        { type: 'Action', label: 'a₀', reward: 0 },
        { type: 'State', label: 'S₁', reward: -1 },
        { type: 'Action', label: 'a₁', reward: 0 },
        { type: 'State', label: 'S₂', reward: -1 },
        { type: 'Action', label: 'a₂', reward: 0 },
        { type: 'State', label: 'Goal', reward: 10, isTerminal: true }
    ];

    const next = () => setStep(prev => Math.min(prev + 1, trajectory.length - 1));
    const reset = () => setStep(0);

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Visual Trajectory */}
                <div className="flex flex-col items-center gap-2 py-4">
                    {trajectory.map((item, i) => (
                        <React.Fragment key={i}>
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                    scale: i <= step ? 1 : 0.5, 
                                    opacity: i <= step ? 1 : 0.2,
                                    backgroundColor: item.isTerminal ? '#10b981' : item.type === 'State' ? '#fff' : '#1e293b'
                                }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm font-black text-[10px] 
                                    ${item.type === 'State' ? 'border-slate-300 text-slate-800' : 'border-slate-800 text-white'}`}
                            >
                                {item.label}
                            </motion.div>
                            {i < trajectory.length - 1 && (
                                <motion.div 
                                    animate={{ opacity: i < step ? 1 : 0.2 }}
                                    className="w-0.5 h-4 bg-slate-300" 
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Info Panel */}
                <div className="flex-1 space-y-6">
                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                        <h4 className="text-lg font-black text-slate-800 dark:text-white mb-2">Step {step}: {trajectory[step].type}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 italic">
                            {trajectory[step].type === 'State' 
                                ? 'The agent observes its surroundings.' 
                                : 'The agent makes a move based on its policy.'}
                        </p>
                        <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Step Reward</span>
                            <span className={`text-sm font-bold ${trajectory[step].reward > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {trajectory[step].reward}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button 
                            onClick={next} 
                            disabled={step === trajectory.length - 1}
                            className="flex-1 bg-primary-600 text-white py-3 rounded-2xl font-black text-xs hover:bg-primary-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
                        >
                            {step === trajectory.length - 1 ? 'TERMINAL STATE' : 'STEP FORWARD'}
                        </button>
                        <button onClick={reset} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-2xl text-slate-500">
                            <RotateCcw size={20} />
                        </button>
                    </div>

                    {step === trajectory.length - 1 && (
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="p-4 bg-emerald-500 text-white rounded-2xl text-center"
                        >
                            <div className="text-[10px] font-bold uppercase opacity-80 mb-1">Final Episode Return (G)</div>
                            <div className="text-2xl font-black">
                                {trajectory.reduce((acc, curr) => acc + curr.reward, 0)}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic11_MCBackupDiagrams() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Thread of Experience" 
                subtitle="Visualizing the Sample Path"
                icon={<Share2 className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ArrowDown size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🧵 The Single Thread
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a **Backup Diagram** as a tree. In Dynamic Programming, the tree is wide—it shows all the branches the agent *could* take.
                            </p>
                            <p>
                                In **Monte Carlo**, the diagram is just a single, thin thread. It shows the exact path the agent *actually* took, from the start to the finish line. There is no "What if?" in an MC backup—only "What happened."
                            </p>
                            <p>
                                This "Depth-First" look at experience is why MC is so simple. We don't need a map of the whole forest; we just need to remember the specific path we walked to find the treasure.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Sample vs. Full">
                            Full backups (DP) require knowing every possible outcome. Sample backups (MC) only require experiencing *one* outcome.
                        </InfoCard>
                        <InfoCard type="tip" title="The Terminal Node">
                            Every MC backup diagram **must** end in a square (Terminal State). Without it, the calculation can't begin.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Modelling the Trace" 
                subtitle="From Percepts to Parameters"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\tau = \{S_0, A_0, R_1, S_1, A_1, R_2, \dots, S_{T-1}, A_{T-1}, R_T, S_T\}"
                        label="The Episode Trajectory (\tau)"
                        explanation="The formal sequence of states, actions, and rewards that make up an episode."
                        interpretation="In MC, we collect these \tau sequences. Each \tau gives us one sample of the return G. The diagram is simply a visual representation of this set \tau."
                        motivation="This formalization allows us to treat a complex interaction as a single unit of data for learning."
                        terms={[
                            { term: '\tau', name: 'Trajectory', meaning: 'The ordered set of experience tuples.', range: '-', example: 'Start -> Left -> -1 -> Pit -> Game Over.' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Depth over Breadth</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            MC backups are "Deep" (all the way to T) but "Narrow" (one sample). DP backups are "Shallow" (one step) but "Wide" (all samples).
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="Visualizing the Sample Path"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Episode Tracer Demo",
                            objectives: "Visualize a single trajectory and the resulting narrow backup diagram.",
                            instructions: [
                                "Open the 'Episode Tracer' in the Virtual Lab section.",
                                "Click 'Step Forward' 3 times. Point out: 'Each circle is a state we actually visited.'",
                                "Reach the 'Goal'. Explain: 'The square is our finish line. We cannot calculate G without it.'",
                                "Explain: 'Unlike DP, we don't care about the states we DID NOT visit in this episode.'",
                                "Ask: 'What does the thin vertical line connecting these states represent?'"
                            ],
                            inputs: "Interactive EpisodeTracer component",
                            outputs: "Step-by-step trajectory visualization with final G-value calculation.",
                            rubrics: ["Clarity of 'Sample path' concept", "Identification of Terminal vs. Non-terminal nodes", "Student engagement"],
                            outcomes: "Students identify the 'Narrow and Deep' nature of Monte Carlo backups.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Trajectory Builder Workshop",
                            objectives: "Collaboratively convert a story into a formal RL backup diagram.",
                            instructions: [
                                "Teacher tells a story: 'Agent starts in a Hallway ($S_0$), opens a Door ($a_0$), finds a Gold Coin ($R=+1$), enters a Room ($S_1$), and falls into a Hole ($R=-10, \text{Terminal}$).'",
                                "Class Task: Draw the formal Backup Diagram (Circles for states, dots for actions, squares for terminal).",
                                "Constraint: Must include labels for every reward ($R_1, R_2$).",
                                "Class reflects: 'Is there any branching in this diagram?'",
                                "Conclusion: MC diagrams represent reality, not possibility."
                            ],
                            inputs: "Experience-based story prompts",
                            outputs: "Hand-drawn backup diagrams on the board",
                            rubrics: ["Correct use of notation (Circles/Squares/Dots)", "Logical flow of the trajectory", "Classroom participation"],
                            outcomes: "Students master the visual syntax of sample-based Reinforcement Learning.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Sample vs. Full Showdown",
                            objectives: "Experience the difference between 'Exhaustive' and 'Experiential' modeling.",
                            instructions: [
                                "Divide class into 2 teams: Team DP (Full Backup) and Team MC (Sample Backup).",
                                "Environment: A 2x2 grid world. Team DP draws the diagram for $V(S_{0,0})$ showing all 4 directions.",
                                "Team MC: Draws 3 different *individual* threads for the same state.",
                                "Output: Compare the 1 branching tree (DP) vs. the 3 single threads (MC).",
                                "Conclusion: 'MC uses many simple threads to approximate what DP calculates with one complex tree.'"
                            ],
                            inputs: "2x2 grid environment definition",
                            outputs: "Comparative Backup Diagram posters",
                            rubrics: ["Accuracy of branching vs. linear paths", "Understanding of 'Expectation' vs 'Sampling'", "Team coordination"],
                            outcomes: "Students develop a deep intuition for why MC is 'model-free'.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Decision Trace Audit",
                            objectives: "Independently audit a recent personal experience as an RL trajectory.",
                            instructions: [
                                "Task: Choose a simple decision you made today (e.g., 'Picking a route to college' or 'Choosing what to eat for lunch').",
                                "Audit: Draw the 'Episode Trace' from your first thought ($S_0$) to the final satisfaction ($R_T$).",
                                "Reflection: If you had taken a different branch, would your diagram look different? Why doesn't MC care about that branch?",
                                "Analysis: Identify one 'Action Dot' that led to a negative reward. How would your diagram change in the NEXT episode?",
                                "Propose: A way to 'Average' multiple days of this decision."
                            ],
                            inputs: "Personal daily decisions",
                            outputs: "Individual Decision-Trace Diagram (1 page)",
                            rubrics: ["Correct use of RL notation", "Logical reward attribution", "Originality"],
                            outcomes: "Students demonstrate the ability to apply formal RL visualization to subjective human experience.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Maze Logger" 
                subtitle="Visualizing Experience"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Mapping the Winner</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building a visualization tool for an RL agent. The agent is learning to solve a 10x10 maze. Your project is to create a **Backup Tracer** that draws a colored line representing the agent's path for a single episode. The intensity of the color should represent the final Return (G) achieved at the end of that path.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <History size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Input</div>
                            <p className="text-[8px] mt-1">State History</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <ArrowDown size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Operation</div>
                            <p className="text-[8px] mt-1">G-Value Attribution</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Flag size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Output</div>
                            <p className="text-[8px] mt-1">Backup Diagram</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Visual Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'How does an MC backup diagram differ from a DP backup diagram?', a: 'MC diagrams show a single sequence of states and actions leading to the terminal state (no branching), whereas DP diagrams show all possible one-step transitions (branching based on probability).' },
                        { q: 'What does a "Circle" and a "Small Dot" represent in an RL backup diagram?', a: 'A circle represents a State (S), and a small solid dot represents an Action (A) taken from that state.' },
                        { q: 'Why do MC backup diagrams always end at a terminal state?', a: 'Because MC methods calculate the value of a state based on the complete return G, which can only be determined once the episode has reached its conclusion.' }
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-purple-500 transition-colors">
                            <div className="font-bold text-slate-800 dark:text-white mb-2 text-sm italic">Q: {item.q}</div>
                            <div className="text-xs text-slate-500 border-l-2 border-slate-100 dark:border-slate-700 pl-4">{item.a}</div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Episode Tracer" 
                subtitle="Visualize the Journey"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Follow a single episode of experience. Click **Step Forward** to see how the agent moves and collects rewards, building a "Trace" that will eventually be used to update the values of every state in the path.
                    </p>
                    <EpisodeTracer />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Diagrams: Mastered!</h3>
                    <p className="text-primary-100">
                        You can visualize the path. Now, let's look at the different strategies we use to average these paths: First-Visit vs. Every-Visit.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MC ALGORITHMS
                    </button>
                </div>
            </div>
        </div>
    );
}
