import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    GitBranch, Box, Target, Zap, TrendingUp,
    Clock, Briefcase, Users2, Layout,
    Compass, Map, Award, Move, MousePointer2, Layers
} from 'lucide-react';

// ─── Interactive Components for Topic 1 ──────────────────────────────────────

/**
 * Interactive Gridworld Component for Section 6
 */
function GridworldExplorer() {
    const [selectedCell, setSelectedCell] = useState<{ x: number, y: number } | null>(null);
    const size = 4;

    const grid = Array.from({ length: size }, (_, y) =>
        Array.from({ length: size }, (_, x) => ({ x, y, id: y * size + x }))
    );

    const getCellInfo = (x: number, y: number) => {
        if (x === 3 && y === 3) return { type: 'Goal', reward: '+100', color: 'bg-emerald-500' };
        if (x === 1 && y === 1) return { type: 'Obstacle', reward: '-50', color: 'bg-red-500' };
        return { type: 'State', reward: '-1', color: 'bg-white dark:bg-slate-800' };
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* The Grid */}
                <div className="grid grid-cols-4 gap-2 p-4 bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-inner">
                    {grid.map(row => row.map(cell => {
                        const info = getCellInfo(cell.x, cell.y);
                        const isSelected = selectedCell?.x === cell.x && selectedCell?.y === cell.y;
                        return (
                            <motion.button
                                key={`${cell.x}-${cell.y}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCell(cell)}
                                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm flex items-center justify-center transition-all border-2 
                                    ${isSelected ? 'border-primary-500 ring-4 ring-primary-500/20' : 'border-transparent'} 
                                    ${info.color}`}
                            >
                                <span className={`text-[10px] font-bold ${info.type !== 'State' ? 'text-white' : 'text-slate-400'}`}>
                                    S{cell.id}
                                </span>
                            </motion.button>
                        );
                    }))}
                </div>

                {/* Info Panel */}
                <div className="flex-1 space-y-4 w-full">
                    <AnimatePresence mode="wait">
                        {selectedCell ? (
                            <motion.div
                                key="info"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-4"
                            >
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <h5 className="font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                                        <Box size={16} className="text-primary-500" />
                                        State: S{selectedCell.y * size + selectedCell.x}
                                    </h5>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Type</span>
                                            <p className="text-sm font-bold">{getCellInfo(selectedCell.x, selectedCell.y).type}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Reward (R)</span>
                                            <p className="text-sm font-bold text-emerald-500">{getCellInfo(selectedCell.x, selectedCell.y).reward}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Possible Actions (A)</span>
                                        <div className="flex gap-2">
                                            {['↑', '↓', '←', '→'].map(a => (
                                                <div key={a} className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold">{a}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center text-slate-400">
                                <p className="text-sm italic">Click on a grid cell to inspect its MDP components</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic1_MDPKeyComponents() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. The Gridworld Navigator"
                subtitle="Life as a Sequential Decision Process"
                icon={<Compass className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Map size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🏰 The Quest for the Treasure
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a robot in a dusty warehouse. It needs to find a treasure chest (The Goal). Every position in the warehouse is a <strong>State</strong>. The robot's choices—moving forward, turning, or grabbing—are <strong>Actions</strong>.
                            </p>
                            <p>
                                But the floor is slippery! Sometimes, when the robot tries to move forward, it slides to the left. This uncertainty is captured by <strong>Transition Probabilities</strong>.
                            </p>
                            <p>
                                <strong>The MDP Magic:</strong> A Markov Decision Process (MDP) is just a fancy way of mapping this journey. It's a mathematical framework that helps the robot decide exactly what to do in every single state to maximize its <strong>Reward</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Markov Property">
                            In an MDP, the future depends only on where you are <em>now</em> (current state), not on how you got there.
                        </InfoCard>
                        <InfoCard type="tip" title="The 5-Tuple">
                            Remember the acronym <strong>S.A.P.R.G</strong>: States, Actions, Probabilities, Rewards, and Gamma.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="2. The 5-Tuple Formalization"
                subtitle="The Heart of MDP"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\text{MDP} = \langle \mathcal{S},\;\mathcal{A},\;\mathcal{P},\;\mathcal{R},\;\gamma \rangle"
                        label="MDP — The 5-Tuple Definition"
                        accent="blue"
                        explanation="A Markov Decision Process is completely specified by these five components. Every RL problem — from game playing to robot control — is an instance of this tuple."
                        interpretation="The 5-tuple is the 'blueprint' of any RL problem. Once you define all five components, you have a complete mathematical specification that any RL algorithm can solve. The power of this formulation is its generality — the same algorithms (Q-learning, policy gradient) work for any MDP regardless of the domain."
                        motivation="Without this formal definition, we cannot prove properties like the existence of an optimal policy, convergence of algorithms, or the Bellman optimality principle. The 5-tuple is the foundation on which all of RL theory is built."
                        terms={[
                            { term: '\\mathcal{S}', name: 'State Space', meaning: 'The complete set of all possible situations the environment can be in. Must be defined so that the Markov property holds — the current state contains all information needed for future decisions.', range: 'Finite or \\mathbb{R}^n', example: 'Grid world: 𝒮={0,...,24} (25 cells). Robot arm: 𝒮=ℝ⁶ (joint angles and velocities).' },
                            { term: '\\mathcal{A}', name: 'Action Space', meaning: 'The complete set of decisions the agent can make. May depend on the current state (e.g., cannot move through walls).', range: 'Finite or \\mathbb{R}^m', example: 'Grid: 𝒜={up,down,left,right}. Continuous control: 𝒜=ℝ² (force vector).' },
                            { term: '\\mathcal{P}', name: 'Transition Dynamics', meaning: 'The function P(s\'|s,a) giving the probability of transitioning to state s\' when taking action a in state s. Completely defines how the environment responds to actions.', range: '[0,1]', example: 'P(right|(2,3),right)=0.8, P(up|(2,3),right)=0.1, P(down|(2,3),right)=0.1.' },
                            { term: '\\mathcal{R}', name: 'Reward Function', meaning: 'R(s,a) or R(s,a,s\') — the immediate scalar feedback the agent receives. The most critical design choice in any RL application.', range: '\\mathbb{R}', example: 'R(goal_state,any)=+100, R(obstacle,any)=−50, R(other,any)=−1.' },
                            { term: '\\gamma', name: 'Discount Factor', meaning: 'Controls the time horizon of the agent\'s planning. γ close to 1 = long-term planning; γ close to 0 = myopic. Must be < 1 for infinite-horizon MDPs to ensure finite returns.', range: '[0,1)', example: 'γ=0.99 for energy management (plan months ahead). γ=0.9 for game playing.' },
                        ]}
                        numericalExample={{
                            setup: 'Lunar Lander MDP. Define the 5-tuple:',
                            steps: [
                                '𝒮 = [x, y, vx, vy, angle, angular_vel, leg1_contact, leg2_contact] ∈ ℝ⁸',
                                '𝒜 = {do_nothing, fire_left, fire_main, fire_right} — 4 discrete actions',
                                'P: physics simulation (deterministic in OpenAI Gym)',
                                'R: +100 to +140 for landing, −100 for crash, −0.3 per fuel unit used',
                                'γ = 0.99 (need to plan the entire descent trajectory)',
                            ],
                            result: 'Complete MDP specification. Any RL algorithm (PPO, DQN, SAC) can now be applied to find the optimal landing policy.',
                        }}
                    />

                    <MathBlock
                        formula="\mathcal{P}(s' \mid s, a) = \Pr(S_{t+1}=s' \mid S_t=s,\, A_t=a), \quad \sum_{s'\in\mathcal{S}}\mathcal{P}(s'\mid s,a) = 1"
                        label="Transition Probability — Stochastic Dynamics"
                        accent="violet"
                        explanation="P(s'|s,a) is the probability of the environment transitioning to state s' when the agent takes action a in state s. The sum over all possible next states must equal 1 (probability axiom)."
                        interpretation="This function is the 'physics engine' of the MDP. In a deterministic environment, P=1 for exactly one s' and 0 for all others. In a stochastic environment (slippery floor, noisy sensors), the probability is spread across multiple next states. Model-based RL algorithms learn this function; model-free algorithms bypass it by learning directly from samples."
                        motivation="The transition function determines how hard the RL problem is. Deterministic environments are easier (no uncertainty). Stochastic environments require the agent to reason about expected values, making the problem harder but more realistic."
                        terms={[
                            { term: "\\mathcal{P}(s'\\mid s,a)", name: 'Transition Probability', meaning: 'Probability of landing in state s\' after taking action a in state s.', range: '[0,1]', example: 'P(right|(2,3),right)=0.8 — 80% chance of moving right as intended.' },
                            { term: '\\sum_{s\'} \\mathcal{P}(s\'\\mid s,a)=1', name: 'Probability Axiom', meaning: 'The probabilities over all possible next states must sum to 1. This is a hard constraint — the environment must transition to SOME state.', range: '\\{1\\}', example: '0.8+0.1+0.1=1.0 ✓ for the slippery floor example.' },
                        ]}
                        numericalExample={{
                            setup: 'Recycling robot. State: High battery. Action: Search. Transition probabilities:',
                            steps: [
                                'P(High | High, Search) = 0.7  → stays at high battery',
                                'P(Low  | High, Search) = 0.3  → battery drains',
                                'Sum = 0.7 + 0.3 = 1.0 ✓',
                                'Expected reward: E[R|High,Search] = 0.7×4 + 0.3×4 = 4.0 cans',
                            ],
                            result: 'Searching from High battery: 70% chance of staying High, 30% chance of draining to Low. Expected reward = 4 cans regardless of outcome.',
                        }}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="3. Multi-Level Activities"
                subtitle="From Observation to Formulation"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Gridworld Live Inspection",
                            objectives: "Identify and explain the discrete components of an MDP in a visual grid environment.",
                            instructions: [
                                "Open the 'Gridworld Explorer' in the Virtual Lab section.",
                                "Click on cell S0 and identify its available Actions (↑, ↓, ←, →).",
                                "Click on the Obstacle (S5) and point out the Negative Reward (-50).",
                                "Click on the Goal (S15) and explain the Terminal State reward (+100).",
                                "Show how moving from S0 to S1 represents a State Transition."
                            ],
                            inputs: "Gridworld Explorer UI",
                            outputs: "Verbal identification of S, A, and R for 3 different cells.",
                            rubrics: ["Accuracy of identification", "Clarity of mapping to MDP terms", "Demonstration flow"],
                            outcomes: "Students can map physical grid elements to formal MDP variables.",
                            time: "10 Mins",
                            materials: ["Interactive Gridworld Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Slippery Floor Workshop",
                            objectives: "Collaboratively define transition probabilities for a stochastic environment.",
                            instructions: [
                                "Teacher draws a 2x2 grid on the board.",
                                "Scenario: The robot is at (0,0) and wants to move Right to (0,1).",
                                "Teacher asks: 'If the floor is 20% slippery, what is the probability of success?'",
                                "Guided Calculation: P(Success) = 0.8; P(Slide Left) = 0.1; P(Slide Right) = 0.1.",
                                "Students fill in the Transition Matrix row for this state-action pair."
                            ],
                            inputs: "Slippery floor scenario parameters",
                            outputs: "Partial Transition Matrix on the board",
                            rubrics: ["Correct probability summing (to 1.0)", "Participation", "Logic consistency"],
                            outcomes: "Students understand that Transitions are probabilistic distributions, not fixed paths.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "Robot Restaurant Design",
                            objectives: "Design a complete MDP tuple for a specialized service robot in a group setting.",
                            instructions: [
                                "Divide students into teams of 4.",
                                "Task: Design an MDP for a 'Coffee Delivery Robot' in a crowded office.",
                                "Group Task: List 5 States (e.g., At Kitchen, At Desk 1, Low Battery).",
                                "Group Task: List 3 Actions and 3 Rewards (e.g., +5 for Delivery, -10 for Spilling).",
                                "Each team presents their Reward Function rationale."
                            ],
                            inputs: "Office environment constraints",
                            outputs: "Draft MDP Specification (States, Actions, Rewards)",
                            rubrics: ["Completeness of tuple", "Realistic Reward design", "Team collaboration"],
                            outcomes: "Students learn to apply MDP theory to complex, multi-state real-world environments.",
                            time: "20 Mins",
                            materials: ["Large paper sheets", "Post-it notes"]
                        },
                        {
                            level: 4,
                            title: "Snake & Ladders MDP Analysis",
                            objectives: "Independently analyze a familiar game as a formal Markov Decision Process.",
                            instructions: [
                                "Task: Write down the MDP tuple for 'Snakes & Ladders'.",
                                "Define the State Space (Squares 1-100).",
                                "Identify the Action Space (Rolling a 1-6 die).",
                                "Explain the Transition Dynamics: If I am on square 98 and roll a 2, where do I land? Is there any choice involved?",
                                "Reflect: Is this a Decision Process or just a Markov Chain? Justify."
                            ],
                            inputs: "Standard game rules",
                            outputs: "Individual analysis report (1 page)",
                            rubrics: ["Correct state space definition", "Depth of reflection on 'Decision'", "Technical accuracy"],
                            outcomes: "Students realize the difference between a Markov Chain (random) and an MDP (strategic choice).",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="4. Project: The Lunar Lander MDP"
                subtitle="Defining Mission Components"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Zap size={18} /> Landing on the Moon</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Your task is to define the MDP for a Lunar Lander. You need to land safely on a designated spot using as little fuel as possible.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Award className="mx-auto text-emerald-500" size={20} />
                            <div className="text-[10px] font-bold">REWARD</div>
                            <p className="text-[8px] text-slate-500">+100 for landing, -100 for crash.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Move className="mx-auto text-blue-500" size={20} />
                            <div className="text-[10px] font-bold">STATE</div>
                            <p className="text-[8px] text-slate-500">Altitude, Velocity, Tilt Angle.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <MousePointer2 className="mx-auto text-amber-500" size={20} />
                            <div className="text-[10px] font-bold">ACTION</div>
                            <p className="text-[8px] text-slate-500">Fire Left, Fire Right, Fire Main.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Clock className="mx-auto text-purple-500" size={20} />
                            <div className="text-[10px] font-bold">GAMMA</div>
                            <p className="text-[8px] text-slate-500">0.99 (Plan for long descent).</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="5. Quick Check"
                subtitle="Essential MDP Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Define Markov Decision Process (MDP).', a: 'A mathematical framework for modeling decision-making where outcomes are partly random and partly under the control of a decision-maker.' },
                        { q: 'What is the "Tuple" used to define an MDP?', a: 'An MDP is defined by the 5-tuple (S, A, P, R, γ), representing States, Actions, Transitions, Rewards, and Discount Factor.' },
                        { q: 'Explain the role of Transition Probability P.', a: 'It defines the dynamics of the environment by specifying the probability of moving from state s to state s\' after taking action a.' }
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
                title="6. Virtual Lab: The Gridworld Explorer"
                subtitle="Interactive MDP Inspection"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Click on the grid cells to see how each position in a "Gridworld" is defined as a <strong>State</strong> with specific rewards and available <strong>Actions</strong>.
                    </p>
                    <GridworldExplorer />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">MDP Components: Decoded!</h3>
                    <p className="text-primary-100">
                        You've identified the building blocks of sequential decisions. Ready to see the formal mathematical definitions?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: FORMAL DEFINITION
                    </button>
                    <button className="px-10 py-4 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                        REVIEW COMPONENTS
                    </button>
                </div>
            </div>
        </div>
    );
}

