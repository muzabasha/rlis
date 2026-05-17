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
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Trophy, Target, Briefcase, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, TrendingUp, Search, Brain
} from 'lucide-react';

// ─── Interactive Components for Topic 6 ─────────────────────────────────────

/**
 * Optimality Explorer: Comparing V_pi vs V_star
 */
function OptimalityLab() {
    const [policyType, setPolicyType] = useState<'Suboptimal' | 'Optimal'>('Suboptimal');
    
    // Grid values for suboptimal vs optimal
    const grid = {
        'Suboptimal': [10, 15, 20, 25, 30],
        'Optimal': [50, 60, 75, 90, 100]
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Switcher */}
                <div className="w-full md:w-1/3 space-y-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Toggle Policy</h5>
                    <div className="flex flex-col gap-2">
                        {(['Suboptimal', 'Optimal'] as const).map(p => (
                            <button
                                key={p}
                                onClick={() => setPolicyType(p)}
                                className={`p-4 rounded-2xl border-2 transition-all flex justify-between items-center ${
                                    policyType === p 
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                                    : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                                }`}
                            >
                                <span className={`font-black ${policyType === p ? 'text-primary-600' : 'text-slate-400'}`}>
                                    {p === 'Optimal' ? 'π*' : 'π_random'}
                                </span>
                                {policyType === p && <Trophy size={16} className="text-primary-500" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Visualizer */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                    <div className="flex gap-2">
                        {grid[policyType].map((v, i) => (
                            <motion.div
                                key={`${policyType}-${i}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center border-2 shadow-sm font-black text-xs"
                                style={{ 
                                    backgroundColor: `rgba(59, 130, 246, ${v / 100})`,
                                    borderColor: policyType === 'Optimal' ? '#3b82f6' : '#cbd5e1',
                                    color: v > 50 ? 'white' : '#64748b'
                                }}
                            >
                                {v}
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">State Values $V(s)$</span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {policyType === 'Optimal' 
                                ? 'The highest possible values for every state.' 
                                : 'A weaker policy results in lower expected returns.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic6_OptimalPolicyValue() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic6_optimalpolicyvalue" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Chess Grandmaster's Vision" 
                subtitle="Perfect Decisions from any Position"
                icon={<Trophy className="text-amber-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
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
                                "The math behind making the absolute best choices, which we humans almost never do."
                            </p>
                        </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Target size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                            🏆 Reaching the Peak
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Every chess move has a value. A novice sees only the next capture. A Grandmaster, however, can see which move leads to the highest probability of a win 50 moves later.
                            </p>
                            <p>
                                In Reinforcement Learning, the **Optimal Policy** ($\pi^*$) is that Grandmaster's vision. It is the strategy that ensures the highest possible reward from <em>every single state</em> in the environment.
                            </p>
                            <p>
                                When an agent finds the **Optimal Value Function** ($v^*$), it has essentially "solved" the environment. It no longer needs to worry about the future because it already knows the absolute best possible outcome it can achieve.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Universal Goal">
                            The purpose of every RL algorithm—from Q-Learning to PPO—is to approximate the Optimal Value Function as closely as possible.
                        </InfoCard>
                        <InfoCard type="tip" title="Greedy is Good">
                            If you have the optimal action-value function ($q^*$), the optimal policy is simple: just pick the action with the highest $q^*$ value.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Bellman Optimality Equations" 
                subtitle="The Math of Perfection"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="v_*(s) = \max_{a} \sum_{s', r} p(s', r | s, a) [r + \gamma v_*(s')]"
                        label="Bellman Optimality Equation for v*"
                        explanation="The optimal value of a state is the value of the best possible action from that state."
                        interpretation="Unlike the expectation equation (which averages over actions), the optimality equation uses the MAX operator. It assumes you will always make the perfect choice."
                        motivation="This equation defines the 'Upper Bound' of what is achievable in an MDP."
                        terms={[
                            { term: '\max_{a}', name: 'The Optimizer', meaning: 'Picking the action that results in the highest expected return.', range: '\mathcal{A}', example: 'Choosing the path with most gold.' },
                            { term: 'v_*(s)', name: 'Optimal State Value', meaning: 'The maximum possible value achievable from state s.', range: '\mathbb{R}', example: 'A perfect score.' },
                        ]}
                    />

                    <MathBlock 
                        formula="q_*(s, a) = \sum_{s', r} p(s', r | s, a) [r + \gamma \max_{a'} q_*(s', a')]"
                        label="Bellman Optimality Equation for q*"
                        explanation="The optimal value of taking action a in state s."
                        interpretation="This is the foundation of Q-Learning. It says the value of an action is the reward plus the best possible value of the next state."
                        motivation="If we know q*, we know which action to take without any extra calculation."
                        terms={[
                            { term: '\max_{a\'} q_*(s\', a\')', name: 'Best Future Action', meaning: 'Assuming we take the best move next.', range: '\mathbb{R}', example: 'Calculating based on perfect future play.' },
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Optimal Policy Value Architecture"
                description="Bellman Optimality Equations."
                chart={`graph TD
    V_star[V*(s)] --> |Max over a| Q_star[Q*(s,a)]
    Q_star --> |R + &gamma; &Sigma; P * V*(s')| Next[Next State Values]
    Next --> V_star`}
            />


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Architecture of Perfection"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Optimality Explorer Demo",
                            objectives: "Visualize the gap between a random behavior and the theoretical limit of perfection.",
                            instructions: [
                                "Open the 'Optimality Explorer' in the Virtual Lab section.",
                                "Select 'Suboptimal'. Show how the values are low (e.g., V=10, 15).",
                                "Switch to 'Optimal'. Notice how EVERY state value jumps to its maximum (e.g., V=100).",
                                "Explain: 'A policy is optimal ONLY if it is better than every other possible policy for every single state.'",
                                "Demonstrate that $v_*(s) \\geq v_\\pi(s)$ is a universal law in RL."
                            ],
                            inputs: "Interactive OptimalityLab component",
                            outputs: "Comparative value grids and policy status indicators.",
                            rubrics: ["Clarity of 'Upper Bound' explanation", "Demonstration of value dominance", "Student engagement"],
                            outcomes: "Students define the Optimal Value Function as the ceiling of all possible performance.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Greedy Choice Workshop",
                            objectives: "Collaboratively derive the optimal policy $\\pi^*$ from the action-value function $q^*$.",
                            instructions: [
                                "Teacher presents a state with 3 actions: {A, B, C}.",
                                "Given: $q_*(s, A) = 45$, $q_*(s, B) = 82$, $q_*(s, C) = 12$.",
                                "Teacher asks: 'If we want to be optimal, which action MUST we take?' (Action B).",
                                "Class reflects: 'What is the value of the state $v_*(s)$?' (It is equal to the best action, 82).",
                                "Conclusion: Knowing $q^*$ makes decision-making effortless (just pick the Max)."
                            ],
                            inputs: "Action-Value numerical sets",
                            outputs: "Policy mapping on the board (State -> Max Action)",
                            rubrics: ["Correct identification of $v_*$ from $q_*$", "Logic of greedy selection", "Classroom participation"],
                            outcomes: "Students master the technical link between $q$-values and optimal strategy.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Grandmaster Search Challenge",
                            objectives: "Experience the design of a 'perfect' decision tree for a small-scale problem.",
                            instructions: [
                                "Divide class into 4 teams. Scenario: 'The 3-Step Maze'.",
                                "Group Task: Draw a decision tree for the maze.",
                                "Label every leaf node with a reward. Work backwards to find the 'Optimal Path'.",
                                "Constraint: Every team must find a state where two actions have the same $q_*$ value. What does the optimal policy do then? (It can pick either).",
                                "Teams present their 'Solved Maze' diagrams."
                            ],
                            inputs: "Small maze parameters",
                            outputs: "Fully labeled Decision Trees on chart paper",
                            rubrics: ["Accuracy of backward value propagation", "Correct use of Max operator", "Team coordination"],
                            outcomes: "Students understand that solving an MDP means finding the 'best path' through a tree of possibilities.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Expert Systems Audit",
                            objectives: "Independently audit a high-stakes AI (e.g., Stock Trading, Chess AI) for its definition of 'Optimal'.",
                            instructions: [
                                "Task: Choose a professional AI domain (e.g., Algorithmic Trading or Hospital Resource Allocation).",
                                "Audit: What is the 'Optimal Reward' for this AI? (e.g., Max Profit, Min Mortality).",
                                "Reflection: Why is it harder to find the 'Optimal Policy' here than in a grid-world? (Noisy data, infinite states).",
                                "Analysis: If the AI makes a mistake, was the policy suboptimal, or was the world unpredictable? (Policy vs Dynamics).",
                                "Propose: One way to 'verify' if an AI is truly approaching optimality."
                            ],
                            inputs: "Case studies of industrial AI",
                            outputs: "Individual Optimality Audit Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Critical thinking on 'Convergence'", "Originality"],
                            outcomes: "Students bridge theoretical optimality with the engineering challenges of real-world deployment.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: AlphaGo's Search" 
                subtitle="Approximating the Impossible"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Deep RL Context</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            The game of Go has $10^{170}$ states. It is physically impossible to solve the Bellman Optimality Equation exactly for this game. AI like AlphaGo use **Deep Neural Networks** to estimate the optimal value function $v^*$, allowing them to defeat world champions.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Binary size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Exact Math</div>
                            <p className="text-[8px] mt-1">Small MDPs (Matrix Solvers)</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <TrendingUp size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Iterative</div>
                            <p className="text-[8px] mt-1">Q-Learning (Estimation)</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Brain size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Deep Learning</div>
                            <p className="text-[8px] mt-1">Complex Worlds (Neural Nets)</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Theory of Optimality"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'How does the Bellman Optimality Equation differ from the Expectation Equation?', a: 'The expectation equation averages over actions using the policy \u03C0, while the optimality equation uses the MAX operator over actions to find the best possible return.' },
                        { q: 'Can there be multiple optimal policies?', a: 'Yes. Multiple different policies can lead to the same optimal value function v* if several actions lead to the same maximum return.' },
                        { q: 'If you have v*(s), how do you find the optimal policy?', a: 'To find the optimal policy from v*(s), you need the transition model p(s\'|s,a). If you have q*(s,a), you don\'t need the model; the optimal policy is just \u03C0*(s) = argmax_a q*(s,a).' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: The Optimality Explorer" 
                subtitle="Compare pi vs pi*"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Bellman Optimality Solver"
                    description="Solve for V* and π* via value iteration"
                    objective="Run Value Iteration and watch V*(s) converge. Extract the greedy policy and verify it is optimal."
                    badge="Interactive Lab"
                    tips={['Value Iteration sweeps all states, updating values using the Bellman Optimality Equation',
                'Convergence is guaranteed when max|V_new - V_old| < threshold']}
                >
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Observe the difference between a "Suboptimal" policy and an "Optimal" policy. Notice how the state values ($V(s)$) are significantly higher when the agent makes perfect choices. 
                    </p>
                    <OptimalityLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">The Peak Reached!</h3>
                    <p className="text-primary-100">
                        You've mastered the theoretical limit of RL. Ready to visualize how these values "Backup" in complex diagrams?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: BACKUP DIAGRAMS
                    </button>
                </div>
            </div>
        </div>
    );
}
