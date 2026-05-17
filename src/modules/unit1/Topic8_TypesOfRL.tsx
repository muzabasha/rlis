import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Share2, GitBranch, Target, Zap, TrendingUp,
    Clock, Briefcase, ShieldAlert, Users2, Layout,
    Network, Layers, Binary, ChevronRight, Info
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, Legend, BarChart, Bar
} from 'recharts';

// ─── Interactive Components for Topic 8 ──────────────────────────────────────

/**
 * Interactive Hierarchy of RL
 */
function RLHierarchy() {
    const [selected, setSelected] = useState<string | null>(null);

    const categories = [
        {
            id: 'modality',
            label: 'Environment Model',
            types: [
                { name: 'Model-Free', desc: 'Learns directly from experience. (DQN, PPO)', icon: <Binary size={14} /> },
                { name: 'Model-Based', desc: 'Builds a world model first. (Dyna-Q, AlphaZero)', icon: <Network size={14} /> }
            ]
        },
        {
            id: 'policy',
            label: 'Policy Update',
            types: [
                { name: 'On-Policy', desc: 'Learns while following the policy. (SARSA)', icon: <Target size={14} /> },
                { name: 'Off-Policy', desc: 'Learns from any data/expert. (Q-Learning)', icon: <Share2 size={14} /> }
            ]
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="text-center space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-white">The RL Taxonomy</h4>
                <p className="text-xs text-slate-500">Click a category to explore the branches.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {categories.map(cat => (
                    <div key={cat.id} className="space-y-4">
                        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-primary-600 text-center uppercase tracking-widest shadow-sm">
                            {cat.label}
                        </div>
                        <div className="grid gap-3">
                            {cat.types.map(type => (
                                <motion.button
                                    key={type.name}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelected(type.name)}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all ${selected === type.name ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm'}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${selected === type.name ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                                            {type.icon}
                                        </div>
                                        <span className="font-bold text-sm text-slate-800 dark:text-white">{type.name}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">{type.desc}</p>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-primary-600 rounded-2xl text-white flex items-center justify-between shadow-xl shadow-primary-500/20"
                    >
                        <div className="flex items-center gap-3">
                            <Info size={18} />
                            <span className="text-xs font-bold uppercase tracking-tight">Key Algorithm: {selected === 'Model-Free' ? 'Q-Learning' : selected === 'Model-Based' ? 'Dyna-Q' : selected === 'On-Policy' ? 'SARSA' : 'Deep Q-Network'}</span>
                        </div>
                        <ChevronRight size={18} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic8_TypesOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic8_typesofrl" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. The Family Reunion"
                subtitle="Understanding the RL Taxonomy"
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
                                "Model-free is like driving without a map and just turning where the road looks nice."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <Network size={200} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌲 The RL Family Tree
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are learning to play <strong>Tennis</strong>. There are two very different ways to get better:
                            </p>
                            <p>
                                <strong>The Practice Path:</strong> You go onto the court and hit thousands of balls. You don't try to calculate physics; you just feel what works. This is <strong>Model-Free</strong> learning.
                            </p>
                            <p>
                                <strong>The Video Path:</strong> You watch a pro player's video. You analyze their swing, their footwork, and you try to <em>copy</em> them, even if you are just sitting on your couch. This is <strong>Off-Policy</strong> learning.
                            </p>
                            <p>
                                Reinforcement Learning isn't just one algorithm; it's a diverse family of methods, each suited for different sports (problems).
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Taxonomy Rule">
                            Most algorithms aren't just one type—they are combinations! For example, DQN is <strong>Model-Free</strong> AND <strong>Off-Policy</strong>.
                        </InfoCard>
                        <InfoCard type="warning" title="Naming Confusion">
                            Don't confuse "Offline RL" with "Off-Policy RL". Offline RL means learning from a fixed dataset without any environment interaction.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="2. On-Policy vs Off-Policy Math"
                subtitle="The Logic of Update Rules"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="Q(S_t,A_t) \leftarrow Q(S_t,A_t) + \alpha\!\underbrace{\bigl[R_{t+1} + \gamma\, Q(S_{t+1},A_{t+1}) - Q(S_t,A_t)\bigr]}_{\delta_t^{\text{SARSA}}}"
                        label="SARSA — On-Policy TD Update"
                        accent="emerald"
                        explanation="SARSA updates Q(S_t,A_t) using the actual next action A_{t+1} that the agent took. The update target uses the Q-value of the action actually chosen by the current policy."
                        interpretation="SARSA stands for State-Action-Reward-State-Action — the five quantities used in each update. Because it uses the actual next action A_{t+1} (which may be exploratory), SARSA learns the value of the policy being followed, including its exploration behaviour. This makes it conservative near dangerous states."
                        motivation="SARSA is the correct choice when exploration itself has consequences — for example, a robot near a cliff. If the agent sometimes explores toward the cliff edge, SARSA learns to stay away from it. Q-learning would ignore this risk."
                        terms={[
                            { term: 'Q(S_t,A_t)', name: 'Current Q-estimate', meaning: 'Our current estimate of the expected return for taking action A_t in state S_t.', range: '\\mathbb{R}', example: 'Q((2,3),right) = 5.2 before update.' },
                            { term: '\\alpha', name: 'Learning Rate', meaning: 'Controls how much the new experience overwrites the old estimate. α=1 means fully trust new data; α→0 means barely update.', range: '(0,1]', example: 'α=0.1: new estimate = 0.9×old + 0.1×new_target.' },
                            { term: 'R_{t+1}', name: 'Immediate Reward', meaning: 'The reward received after taking action A_t in state S_t.', range: '\\mathbb{R}', example: 'R_{t+1} = −0.1 (step cost).' },
                            { term: '\\gamma\\,Q(S_{t+1},A_{t+1})', name: 'Discounted Next Q', meaning: 'The discounted Q-value of the ACTUAL next action A_{t+1} chosen by the current policy. This is what makes SARSA on-policy.', range: '\\mathbb{R}', example: 'γ=0.9, Q(S_{t+1},A_{t+1})=6.0 → 0.9×6.0=5.4.' },
                            { term: '\\delta_t^{\\text{SARSA}}', name: 'TD Error (SARSA)', meaning: 'The difference between the target [R+γQ(s\',a\')] and the current estimate Q(s,a). Drives the update — positive δ increases Q, negative δ decreases it.', range: '\\mathbb{R}', example: 'δ = (−0.1 + 5.4) − 5.2 = 0.1 → Q increases slightly.' },
                        ]}
                        numericalExample={{
                            setup: 'State s=(2,3), action a=right. Q(s,a)=5.2. After action: r=−0.1, s\'=(2,4), a\'=down (chosen by ε-greedy). Q(s\',a\')=6.0. α=0.1, γ=0.9.',
                            steps: [
                                'TD target = R + γ·Q(s\',a\') = −0.1 + 0.9×6.0 = 5.3',
                                'TD error δ = 5.3 − 5.2 = 0.1',
                                'Q(s,a) ← 5.2 + 0.1×0.1 = 5.21',
                            ],
                            result: 'Q((2,3),right) updated from 5.2 → 5.21. Small positive update because the actual next action was decent.',
                        }}
                    />

                    <MathBlock
                        formula="Q(S_t,A_t) \leftarrow Q(S_t,A_t) + \alpha\!\underbrace{\bigl[R_{t+1} + \gamma\max_{a'}Q(S_{t+1},a') - Q(S_t,A_t)\bigr]}_{\delta_t^{\text{Q-learning}}}"
                        label="Q-Learning — Off-Policy TD Update"
                        accent="blue"
                        explanation="Q-learning updates using the MAXIMUM Q-value over all possible next actions, regardless of which action the agent actually took. This makes it off-policy — it learns the optimal policy even while following an exploratory behaviour policy."
                        interpretation="The key difference from SARSA is max_a' Q(s',a') instead of Q(s',a'). Q-learning always assumes the agent will act optimally in the future, even if it is currently exploring randomly. This makes Q-learning more aggressive and allows it to learn from any experience, including demonstrations."
                        motivation="Q-learning is the foundation of DQN and most modern deep RL. Its off-policy nature allows experience replay — storing past transitions and reusing them for multiple updates, dramatically improving sample efficiency."
                        terms={[
                            { term: '\\max_{a\'} Q(S_{t+1},a\')', name: 'Greedy Next Q', meaning: 'The highest Q-value achievable in the next state, over ALL possible actions. This is the off-policy target — it assumes optimal future behaviour.', range: '\\mathbb{R}', example: 'Q(s\',left)=4.0, Q(s\',right)=7.5, Q(s\',up)=3.2 → max=7.5.' },
                            { term: '\\delta_t^{\\text{Q-learning}}', name: 'TD Error (Q-learning)', meaning: 'Difference between the optimal target [R+γ·max Q(s\',a\')] and current estimate. Larger than SARSA\'s δ when the greedy action is better than the chosen action.', range: '\\mathbb{R}', example: 'δ = (−0.1 + 0.9×7.5) − 5.2 = 1.45 → large positive update.' },
                        ]}
                        numericalExample={{
                            setup: 'Same state as before: s=(2,3), a=right, r=−0.1, s\'=(2,4). Q-values at s\': left=4.0, right=7.5, up=3.2. Q(s,a)=5.2. α=0.1, γ=0.9.',
                            steps: [
                                'max_a\' Q(s\',a\') = max(4.0, 7.5, 3.2) = 7.5',
                                'TD target = −0.1 + 0.9×7.5 = 6.65',
                                'TD error δ = 6.65 − 5.2 = 1.45',
                                'Q(s,a) ← 5.2 + 0.1×1.45 = 5.345',
                            ],
                            result: 'Q((2,3),right) updated from 5.2 → 5.345. Larger update than SARSA because Q-learning assumes optimal future behaviour (right=7.5 vs actual down=6.0).',
                        }}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Types Of R L Architecture"
                description="Model-Free versus Model-Based architectures."
                chart={`graph LR
    RL[RL Architectures] --> MB[Model-Based]
    RL --> MF[Model-Free]
    MB --> |Learns Transition Dynamics| Plan[Planning]
    MF --> |Learns purely from experience| React[Direct Policy/Value]`}
            />


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="3. Multi-Level Activities"
                subtitle="Classifying the RL Universe"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Taxonomy Explorer Demo",
                            objectives: "Demonstrate the structural differences between Environment Models and Policy Update styles.",
                            instructions: [
                                "Open the 'RL Taxonomy' explorer in the Virtual Lab section.",
                                "Select 'Model-Free' and explain why it relies on 'Hitting the ball' (Direct experience).",
                                "Select 'Off-Policy' and explain why it allows 'Learning from videos' (Expert logs).",
                                "Show the 'Key Algorithm' badge for each selection to link theory to practice (e.g., DQN, PPO).",
                                "Point out that most real-world deep RL is Model-Free and Off-Policy."
                            ],
                            inputs: "Interactive RLHierarchy component",
                            outputs: "Hierarchical category badges and descriptive tooltips.",
                            rubrics: ["Clarity of taxonomy mapping", "Explanation of key algorithms", "Student engagement"],
                            outcomes: "Students identify the high-level categories of RL and their representative algorithms.",
                            time: "10 Mins",
                            materials: ["Interactive Lab", "Digital Screen"]
                        },
                        {
                            level: 2,
                            title: "The SARSA vs Q-Learning Duel",
                            objectives: "Collaboratively calculate the Q-value update for On-policy and Off-policy methods.",
                            instructions: [
                                "Teacher draws a 2-state chain on the board: S1 -> S2.",
                                "Setup: Q(S1, right) = 5.0. Actual next action taken (exploratory) is 'Down' with Q(S2, down) = 2.0.",
                                "However, the BEST action in S2 is 'Right' with Q(S2, right) = 8.0.",
                                "Guided Calculation: Step 1 (SARSA) uses 2.0. Step 2 (Q-Learning) uses 8.0.",
                                "Discuss: 'Why did Q-Learning update more aggressively?'"
                            ],
                            inputs: "Q-table values and α/γ hyperparameters",
                            outputs: "Parallel Q-update calculations on the board",
                            rubrics: ["Numerical accuracy", "Explanation of 'max' vs 'actual'", "Classroom participation"],
                            outcomes: "Students master the fundamental mathematical difference between On-policy and Off-policy logic.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Cliff Walker Simulation",
                            objectives: "Analyze the behavior of different RL types in a high-risk environment.",
                            instructions: [
                                "Divide class into two teams: Team On-Policy (SARSA) and Team Off-Policy (Q-Learning).",
                                "Scenario: Navigating a narrow path next to a deep cliff.",
                                "Team On-Policy must explain why they take the 'Long, Safe Path' away from the edge.",
                                "Team Off-Policy must explain why they take the 'Short, Risky Path' right on the edge.",
                                "Debrief: 'If this was a real million-dollar robot, which team would you hire?'"
                            ],
                            inputs: "Cliff-Walking scenario diagram",
                            outputs: "Position statements on 'Safety' vs 'Efficiency'",
                            rubrics: ["Understanding of risk modeling", "Logical persuasion", "Team coordination"],
                            outcomes: "Students realize that 'optimal' path (Off-policy) isn't always 'safe' path (On-policy).",
                            time: "20 Mins",
                            materials: ["Cliff-Walking Diagram", "Posters"]
                        },
                        {
                            level: 4,
                            title: "Hobby Taxonomy Audit",
                            objectives: "Independently map a personal hobby to the RL classification framework.",
                            instructions: [
                                "Task: Choose a hobby (e.g., Playing a musical instrument, Gaming, Cooking).",
                                "Identify: Is your learning style mostly Model-Free (just doing it) or Model-Based (reading theory first)?",
                                "Identify: Do you learn mostly On-Policy (learning from your own current mistakes) or Off-Policy (watching YouTube tutorials)?",
                                "Write a 3-sentence summary of your 'Hybrid RL Profile'."
                            ],
                            inputs: "Self-reflection on learning habits",
                            outputs: "Individual 'Personal RL Profile' Note",
                            rubrics: ["Correct use of taxonomy terms", "Depth of self-analysis", "Originality"],
                            outcomes: "Students internalize abstract RL categories by applying them to their own learning behaviors.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="4. Project: The Cliff Walker"
                subtitle="On-Policy vs Off-Policy Duel"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>
                        In the <strong>CliffWalking</strong> environment, the agent must reach a goal without falling off a cliff.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="card p-6 border-l-4 border-emerald-500">
                            <h5 className="font-bold text-slate-800 dark:text-white mb-2">Team SARSA (On-Policy)</h5>
                            <p className="text-xs">It will take a long, safe path far from the cliff because it learns that its own "Exploration" (random moves) could make it fall.</p>
                        </div>
                        <div className="card p-6 border-l-4 border-blue-500">
                            <h5 className="font-bold text-slate-800 dark:text-white mb-2">Team Q-Learning (Off-Policy)</h5>
                            <p className="text-xs">It will learn the optimal path right along the cliff edge, ignoring the risk that its own exploration might cause a fall.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="5. Quick Check"
                subtitle="Exam-Ready Definitions"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the primary advantage of Off-Policy RL?', a: 'It can learn from expert demonstrations, historical data, or even a different policy, making it more sample-efficient.' },
                        { q: 'Why is SARSA called "On-Policy"?', a: 'Because it evaluates and improves the same policy that it uses to make decisions during learning.' },
                        { q: 'Define a "Model" in Model-Based RL.', a: 'A model is any function that mimics the environment dynamics, specifically predicting the next state and reward given a current state and action.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="6. Virtual Lab: The Taxonomy Explorer"
                subtitle="Navigating the RL Landscape"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Model-Free vs Model-Based"
                    description="Observe the planning advantage"
                    objective="Compare a model-free agent (trial-and-error) vs a model-based agent (plans ahead) on the same navigation task."
                    badge="Interactive Lab"
                    tips={['Model-based agents learn faster but fail when the model is wrong',
                'Model-free agents are slower but more robust to environment changes']}
                >
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore the different categories of Reinforcement Learning. Notice how modern algorithms like <strong>PPO</strong> or <strong>SAC</strong> fit into multiple branches of this tree.
                    </p>
                    <RLHierarchy />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-emerald-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Family Tree: Explored!</h3>
                    <p className="text-emerald-100">
                        You've mapped the entire RL landscape. Ready to tackle the biggest challenge in all of AI?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-emerald-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: EXPLORATION
                    </button>
                    <button className="px-10 py-4 bg-emerald-700 text-white font-black rounded-2xl hover:bg-emerald-800 transition-colors">
                        REVIEW TYPES
                    </button>
                </div>
            </div>
        </div>
    );
}

