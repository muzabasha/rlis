import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import MCBackupLab from '../../components/labs/MCBackupLab';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Share2, Bot, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, Search, Brain, Globe, Rocket,
    Activity, Cpu, HardDrive, Target, Briefcase,
    Shield, Move, MousePointer2, User, Layout, Map,
    History, ArrowDown, Flag
} from 'lucide-react';

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic11_MCBackupDiagrams() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic11_mcbackupdiagrams" />
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
                    <div className="mt-2 mb-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm flex items-start gap-4 transform hover:scale-[1.02] transition-transform">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-2xl">
                            🎭
                        </div>
                        <div>
                            <h5 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                                Fun Fact / Comic Relief
                            </h5>
                            <p className="text-indigo-700 dark:text-indigo-300 font-medium italic leading-relaxed">
                                "Unlike TD backups that look one step ahead, MC backups wait until the end of the game to figure out if it was a good idea."
                            </p>
                        </div>
                    </div>
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

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="M C Backup Diagrams Architecture"
                description="Monte Carlo vs TD Backup Diagrams."
                chart={`graph TD
    subgraph Monte Carlo
        S_MC((S)) --> |Entire Episode| R_MC[Final Return G]
    end
    subgraph Temporal Difference
        S_TD((S)) --> |One Step| S_Next((S'))
    end`}
            />


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
                            title: "Backup Visualizer Demo",
                            objectives: "Visualize a single trajectory and the resulting reverse flow of return values.",
                            instructions: [
                                "Open the 'MC Backup Visualizer' in the Virtual Lab section.",
                                "Click 'Step Forward' until you reach the Goal. Point out: 'The diagram shows only the path actually taken.'",
                                "Click 'Back-Propagate'. Watch the purple flow move upwards.",
                                "Explain: 'This flow represents the calculation of G for every state in the trajectory.'",
                                "Ask: 'How does the backup change if the reward at the goal is doubled?'"
                            ],
                            inputs: "Interactive MCBackupLab component",
                            outputs: "Step-by-step trajectory and back-propagation visualization.",
                            rubrics: ["Clarity of 'Narrow and Deep' backup concept", "Identification of back-propagation direction", "Student engagement"],
                            outcomes: "Students identify the visual mechanics of Monte Carlo backups.",
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
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: MC Backup Visualizer" 
                subtitle="Trajectory Flow Analysis"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Backup Depth Comparator"
                    description="Compare TD vs MC backup depth"
                    objective="Visualize and compare 1-step TD backup vs full Monte Carlo backup on the same trajectory."
                    badge="Interactive Lab"
                    tips={['TD updates immediately after each step — MC waits until episode end',
                'TD has lower variance but higher bias than MC']}
                >
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Experience the "Narrow and Deep" nature of Monte Carlo. Step through a trajectory, then watch the **G-value** flow backwards from the terminal state to all previous states in the path.
                    </p>
                    <MCBackupLab />
                </VirtualLabShell>
            
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
