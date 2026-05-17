import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Zap, TrendingUp, Target, Briefcase, Binary, Layers,
    Eye, ChevronRight, Play, RotateCcw, Brain, Activity, Search
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Q Learning Intro Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Q Learning Intro Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Q Learning Intro simulator.",
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
    "🤖 [System] Initializing Q Learning Intro Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Q Learning Intro\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 2 ─────────────────────────────────────

/**
 * Q-Table Explorer: Watch the values update
 */
function QTableLab() {
    const [qTable, setQTable] = useState({
        'State 1': { 'Left': 0, 'Right': 0 },
        'State 2': { 'Left': 0, 'Right': 0 }
    });
    const [alpha, setAlpha] = useState(0.5);
    const [history, setHistory] = useState<string[]>([]);

    const runUpdate = () => {
        const state = Math.random() > 0.5 ? 'State 1' : 'State 2';
        const action = Math.random() > 0.5 ? 'Left' : 'Right';
        const reward = state === 'State 2' && action === 'Right' ? 10 : -1;
        
        const currentQ = qTable[state][action as 'Left' | 'Right'];
        // simplified update: next max Q is estimated
        const nextMaxQ = state === 'State 1' ? 5 : 0; 
        const gamma = 0.9;
        
        const tdError = reward + gamma * nextMaxQ - currentQ;
        const newQ = currentQ + alpha * tdError;

        setQTable(prev => ({
            ...prev,
            [state]: {
                ...prev[state],
                [action]: parseFloat(newQ.toFixed(2))
            }
        }));

        setHistory(prev => [`${state}: ${action} → Reward ${reward} (New Q: ${newQ.toFixed(2)})`, ...prev].slice(0, 5));
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Controls */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Activity size={18} className="text-primary-500" />
                            Update Logic
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">Click to simulate one experience step.</p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                            <span>Learning Rate ($\alpha$)</span>
                            <span className="text-primary-600">{alpha.toFixed(1)}</span>
                        </div>
                        <input 
                            type="range" min="0.1" max="1.0" step="0.1" 
                            value={alpha} 
                            onChange={(e) => setAlpha(parseFloat(e.target.value))}
                            className="w-full accent-primary-600"
                        />
                    </div>

                    <button 
                        onClick={runUpdate}
                        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Zap size={18} /> SIMULATE STEP
                    </button>
                </div>

                {/* Q-Table Display */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="text-left pl-4">State</div>
                        <div>Action: Left</div>
                        <div>Action: Right</div>
                    </div>
                    
                    {Object.entries(qTable).map(([state, actions]) => (
                        <div key={state} className="grid grid-cols-3 gap-2 items-center bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="font-bold text-slate-700 dark:text-slate-300">{state}</div>
                            <motion.div 
                                key={`${state}-Left-${actions.Left}`}
                                initial={{ scale: 1.1, color: '#3b82f6' }}
                                animate={{ scale: 1, color: 'inherit' }}
                                className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 text-center font-mono text-xs font-bold"
                            >
                                {actions.Left}
                            </motion.div>
                            <motion.div 
                                key={`${state}-Right-${actions.Right}`}
                                initial={{ scale: 1.1, color: '#10b981' }}
                                animate={{ scale: 1, color: 'inherit' }}
                                className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 text-center font-mono text-xs font-bold"
                            >
                                {actions.Right}
                            </motion.div>
                        </div>
                    ))}

                    <div className="space-y-2">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Experience Log</h5>
                        <div className="space-y-1">
                            {history.map((h, i) => (
                                <div key={i} className="text-[10px] text-slate-500 font-medium flex items-center gap-2">
                                    <ChevronRight size={10} className="text-primary-500" />
                                    {h}
                                </div>
                            ))}
                            {history.length === 0 && <div className="text-[10px] text-slate-400 italic">No updates yet...</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic2_QLearningIntro() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic2_qlearningintro" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Student in the Maze" 
                subtitle="Learning from Experience, Not Maps"
                icon={<Zap className="text-blue-600" size={24} />}
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
                                "Q-Learning: where an agent stumbles around blindly until it accidentally does something smart, then writes it down."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Search size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🏫 Finding the Cafeteria
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a student in a new school trying to find the best cafeteria. They don't have a map. They try different hallways (**Actions**) from different classrooms (**States**).
                            </p>
                            <p>
                                Some paths lead to delicious snacks (**Positive Reward**), others to dead ends or detention (**Negative Reward**).
                            </p>
                            <p>
                                By keeping a notebook (the **Q-Table**) of which hallway leads to the best result from each classroom, the student eventually finds the fastest way to the cafeteria. This is the essence of **Q-Learning**: learning the "Quality" of actions through pure trial and error.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Model-Free Learning">
                            Q-Learning doesn't need to know the physics of the world. It only needs to know the **Rewards** it receives.
                        </InfoCard>
                        <InfoCard type="tip" title="The Q-Table">
                            Think of the Q-Table as a giant spreadsheet where rows are states and columns are actions.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Q-Update Equation" 
                subtitle="The Math of Temporal Difference"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="Q(s, a) \leftarrow Q(s, a) + \alpha \left[ r + \gamma \max_{a'} Q(s', a') - Q(s, a) \right]"
                        label="The Q-Learning Update Rule"
                        explanation="How the agent updates its knowledge after every step."
                        interpretation="The new Q-value is the old Q-value plus a fraction (alpha) of the 'Surprise' or 'Error' (Temporal Difference)."
                        motivation="This formula allows the agent to slowly shift its estimates toward the actual rewards it observes."
                        terms={[
                            { term: '\alpha', name: 'Learning Rate', meaning: 'How much we trust new information over old.', range: '0 \to 1', example: '0.1 = slow learning.' },
                            { term: '\gamma', name: 'Discount Factor', meaning: 'Importance of future rewards.', range: '0 \to 1', example: '0.9 = far-sighted.' },
                            { term: '\max_{a\'} Q(s\', a\')', name: 'Best Future Q', meaning: 'The estimate of the best possible reward in the next state.', range: '\mathbb{R}', example: 'Value of the best move next turn.' },
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Off-Policy Learning</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Q-Learning is "Off-Policy" because it updates its values assuming it will take the **best possible** action in the future ($\max Q$), even if the agent is currently acting randomly to explore.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Q Learning Intro Architecture"
                description="Introduction to Model-Free Temporal Difference learning."
                chart={`graph TD
    NoModel[No Transition Model Needed] --> Experience[Learn directly from (S, A, R, S')]
    Experience --> Q[Update Q-table directly]
    Q --> Optimal[Converge to Q*]`}
            />


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="Engineering the Update"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Q-Table Explorer Demo",
                            objectives: "Observe how raw rewards are transformed into long-term 'Quality' values in a table.",
                            instructions: [
                                "Open the 'Q-Table Explorer' in the Virtual Lab section.",
                                "Set Alpha (Learning Rate) to 1.0 (Full Trust). Click 'Simulate Step'.",
                                "Show how the Q-value for 'Right' jumps immediately to the reward value.",
                                "Now, reset and set Alpha to 0.1 (Slow Trust). Show how the Q-value only nudges slightly.",
                                "Explain: 'High Alpha means you forget the past quickly; Low Alpha means you are cautious.'"
                            ],
                            inputs: "Interactive QTableLab component",
                            outputs: "Live Q-value updates and TD-error visualizations.",
                            rubrics: ["Clarity of 'Learning Rate' explanation", "Demonstration of value convergence", "Student engagement"],
                            outcomes: "Students identify the Learning Rate as the dial that balances experience and new information.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Temporal Difference Math Workshop",
                            objectives: "Collaboratively solve a manual Q-update to understand the recursive logic.",
                            instructions: [
                                "Teacher presents a scenario: Current $Q(s, a) = 50$, Reward $r = 10$, Next Max $Q = 100$.",
                                "Teacher asks: 'If $\\gamma = 0.9$, what is the Target?' (Calculated: $10 + 0.9(100) = 100$).",
                                "Collaborative Calculation: 'What is the Error?' (Target 100 - Current 50 = 50).",
                                "Group Task: If $\\alpha = 0.2$, what is the New Q? (Calculated: $50 + 0.2(50) = 60$).",
                                "Reflection: 'Why didn't we jump all the way to 100?' (To avoid overreacting to outliers)."
                            ],
                            inputs: "Scenario numerical data",
                            outputs: "Step-by-step calculation on the board",
                            rubrics: ["Correct target calculation", "Error identification", "Classroom participation"],
                            outcomes: "Students master the technical application of the Q-Learning update rule.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Human Q-Table Race",
                            objectives: "Experience the collective convergence of values in a physical simulation.",
                            instructions: [
                                "Divide class into 4 teams. Provide a 2x2 grid on chart paper for each.",
                                "Each grid cell starts with Q=0. The Goal (Top Right) gives +10 reward.",
                                "Groups 'walk' a token. Every time they land in a cell, they must update its value using a fixed $\\alpha=0.5$.",
                                "Group Task: Run 10 iterations. Watch how the 'high value' flows backwards from the goal to the starting cell.",
                                "Teams compare: 'Which group found the shortest path first?'"
                            ],
                            inputs: "2x2 blank Q-grid and tokens",
                            outputs: "Filled-in 'Heatmap' of Q-values on chart paper",
                            rubrics: ["Accuracy of manual updates", "Understanding of value propagation", "Team coordination"],
                            outcomes: "Students visualize the 'Bootstrap' effect where future values inform current ones.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers", "Calculators"]
                        },
                        {
                            level: 4,
                            title: "Learning Audit: Skill Acquisition",
                            objectives: "Independently analyze a personal skill-learning process through Q-learning theory.",
                            instructions: [
                                "Task: Think of a skill you learned (e.g., playing a guitar chord, a video game trick, or a sport move).",
                                "Audit: What was your 'Q-Table' like at the start? (Empty/Zero).",
                                "Reflection: Describe one 'Negative Reward' (Mistake) that caused a large TD Error.",
                                "Analysis: How did your 'Brain' update the Q-value of that specific action? Did you stop doing it immediately (High Alpha) or slowly adjust (Low Alpha)?",
                                "Calculate: Create a hypothetical 1-step update for that specific skill moment."
                            ],
                            inputs: "Personal learning history",
                            outputs: "Individual Skill Update Report (1 page)",
                            rubrics: ["Correct mapping to RL components", "Depth of meta-cognitive reflection", "Originality"],
                            outcomes: "Students relate the abstract math of Q-Learning to the biological reality of learning.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Game AI" 
                subtitle="Learning Pac-Man with Q-Tables"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            In 2013, researchers used a version of Q-Learning (DQN) to teach an AI to play Atari games. The AI started by playing randomly, but after 24 hours of training, it discovered strategies that humans hadn't even thought of!
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Layers size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Input</div>
                            <p className="text-[8px] mt-1">Game Screen Pixels</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Brain size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Process</div>
                            <p className="text-[8px] mt-1">Q-Table Update</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Target size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Output</div>
                            <p className="text-[8px] mt-1">Optimal High Score</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Core Definitions"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What does the "Q" in Q-Learning stand for?', a: 'Q stands for Quality. It represents the quality of a state-action pair in terms of expected cumulative reward.' },
                        { q: 'Why is Q-Learning considered Model-Free?', a: 'Because it learns directly from interactions with the environment without needing an explicit transition probability matrix P(s\'|s,a).' },
                        { q: 'What is the role of the Temporal Difference (TD) error?', a: 'The TD error is the difference between the estimated value and the newly observed value. It acts as the "signal" that tells the agent how to adjust its Q-values.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Q-Table Explorer" 
                subtitle="Watch the Brain Grow"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Q-Table Explorer"
                    description="Watch Q-values grow from zero"
                    objective="Step through Q-Learning updates manually. See how the Q-table fills with meaningful values episode by episode."
                    badge="Interactive Lab"
                    tips={['Start with all zeros — the agent knows nothing',
                'Use Step mode to trace a single SARS update carefully',
                'After ~20 episodes, the table starts showing clear patterns']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        This lab simulates a small 2-state world. Every time you click **Simulate Step**, the agent takes an action, receives a reward, and updates its Q-Table using the TD error. Watch how the numbers slowly shift from zero to meaningful "Quality" scores.
                    </p>
                    <QTableLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Q-Learning Started!</h3>
                    <p className="text-primary-100">
                        You've seen the core engine of Reinforcement Learning. Ready to dive deeper into the types of policies that guide the agent?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: TYPES OF POLICY
                    </button>
                </div>
            </div>
        </div>
    );
}
