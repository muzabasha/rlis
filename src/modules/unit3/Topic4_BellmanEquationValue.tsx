import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    RefreshCw, TrendingUp, Target, Briefcase, Zap, Binary, Layers,
    Eye, ChevronRight, Play, RotateCcw, Brain, Activity
} from 'lucide-react';

// ─── Interactive Components for Topic 4 ─────────────────────────────────────

/**
 * Bellman Backup Visualizer: One-step propagation
 */
function BellmanBackupLab() {
    const [gamma, setGamma] = useState(0.9);
    const [nextValues, setNextValues] = useState([10, 20, 5]); // V(s') for 3 possible next states
    
    // Probabilities P(s'|s,a) for 3 next states
    const probs = [0.4, 0.4, 0.2];
    const reward = 2;

    const calculateCurrentV = () => {
        const expectedNextV = nextValues.reduce((sum, v, i) => sum + probs[i] * v, 0);
        return (reward + gamma * expectedNextV).toFixed(2);
    };

    const handleValueChange = (index: number, val: string) => {
        const n = parseFloat(val);
        if (!isNaN(n)) {
            const newValues = [...nextValues];
            newValues[index] = n;
            setNextValues(newValues);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Successor States */}
                <div className="w-full md:w-1/2 space-y-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Successor States $V(s')$</h5>
                    <div className="space-y-3">
                        {nextValues.map((v, i) => (
                            <div key={i} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                    s'{i+1}
                                </div>
                                <div className="flex-1 text-[10px] font-bold text-slate-400">P = {probs[i]}</div>
                                <input 
                                    type="number" 
                                    value={v} 
                                    onChange={(e) => handleValueChange(i, e.target.value)}
                                    className="w-20 bg-white dark:bg-slate-800 border border-slate-200 rounded-lg p-2 text-right font-mono text-xs font-bold"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* The "Backup" Animation */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <RefreshCw size={180} className="animate-spin-slow" />
                    </div>

                    <div className="text-center space-y-1 z-10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Current Value</span>
                        <motion.div 
                            key={calculateCurrentV()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl font-black text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-8 py-4 rounded-3xl border-2 border-primary-100"
                        >
                            $V(s) = {calculateCurrentV()}$
                        </motion.div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl text-white text-[10px] font-mono space-y-1 z-10">
                        <div className="text-primary-400"># The Equation:</div>
                        <div>$V(s) = R + \gamma \sum P(s')V(s')$</div>
                        <div>$V(s) = {reward} + {gamma} \times ({probs[0]} \cdot {nextValues[0]} + {probs[1]} \cdot {nextValues[1]} + {probs[2]} \cdot {nextValues[2]})$</div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                    <span>Discount Factor ($\gamma$)</span>
                    <span className="text-primary-600 font-black">{gamma.toFixed(2)}</span>
                </div>
                <input 
                    type="range" min="0" max="1" step="0.05" 
                    value={gamma} 
                    onChange={(e) => setGamma(parseFloat(e.target.value))}
                    className="w-full accent-primary-600"
                />
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic4_BellmanEquationValue() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Recursive Secret" 
                subtitle="Breaking Down the Future"
                icon={<RefreshCw className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🔄 The Value of a State
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In 1957, Richard Bellman discovered a fundamental truth about decision-making: the value of your current situation depends <em>exactly</em> on the value of what happens next.
                            </p>
                            <p>
                                Imagine you are one step away from a treasure chest. The **Value** of your current square is almost as high as the chest itself—just minus a small "discount" for the effort of taking that last step.
                            </p>
                            <p>
                                This recursive relationship—where the present value is defined by the future value—is the <strong>Bellman Equation</strong>. It is the mathematical bridge that allows an AI to "look ahead" without actually simulating every possible future until the end of time.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Consistency Condition">
                            The Bellman Equation isn't just a calculation; it's a consistency check. If the equation holds for every state, you've found the correct value function.
                        </InfoCard>
                        <InfoCard type="tip" title="Dynamic Programming">
                            This equation is the heart of Dynamic Programming, allowing us to solve complex problems by solving smaller, overlapping sub-problems.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Bellman Expectation Equation" 
                subtitle="The Equation of State Value"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="v_\pi(s) = \sum_a \pi(a|s) \sum_{s', r} p(s', r | s, a) \left[ r + \gamma v_\pi(s') \right]"
                        label="Bellman Expectation Equation for v_\pi"
                        explanation="The value of state s under policy π is the expected reward plus the discounted value of the next state."
                        interpretation="This is an averaging process. We look at all actions you might take (π), all states you might land in (p), and average their values."
                        motivation="This allows us to compute the value function for any fixed policy π without simulating paths."
                        terms={[
                            { term: 'r + \gamma v_\pi(s\')', name: 'Estimated Return', meaning: 'The immediate reward plus the discounted value of where you end up.', range: '\mathbb{R}', example: 'Getting 5 points + 0.9 * (Value of next room).' },
                            { term: '\sum \dots', name: 'Expected Value', meaning: 'The weighted average over all possibilities.', range: '\mathbb{R}', example: 'Averaging the luck of the dice.' },
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Linear System</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            For a finite MDP with N states, this equation is actually a system of **N linear equations** with N unknowns. We can solve it exactly using matrix inversion:
                            <br/><br/>
                            <span className="text-sm font-mono text-white">v = (I - \gamma P_\pi)^{-1} R_\pi</span>
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Flow of Future Value"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Bellman Backup Demo",
                            objectives: "Observe how current state values are mathematically anchored to successor states.",
                            instructions: [
                                "Open the 'Backup Calculator' in the Virtual Lab section.",
                                "Set $\\gamma = 1.0$ (No discount). Show how $V(s)$ is the exact average of $V(s')$.",
                                "Now, lower $\\gamma$ to 0.5. Notice how $V(s)$ shrinks even if the future values stay high.",
                                "Explain: 'The Bellman Equation is a bridge. If the future changes, the present must update instantly to remain consistent.'",
                                "Ask: 'What happens to the current value if one successor state becomes a trap (V=-100)?'"
                            ],
                            inputs: "Interactive BellmanBackupLab component",
                            outputs: "Real-time value backup and equation breakdown.",
                            rubrics: ["Clarity of 'Value Anchoring' explanation", "Demonstration of discounting effects", "Student engagement"],
                            outcomes: "Students identify the recursive dependency of the value function.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Treasure Map Workshop",
                            objectives: "Collaboratively calculate the value of a 3-step path with rewards and discounting.",
                            instructions: [
                                "Teacher draws a 3-node path on the board: A -> B -> Goal.",
                                "Goal Value = +100. Step Reward = -2 (Effort). $\\gamma = 0.9$.",
                                "Guided Calculation: Step 1 (Backwards): $V(B) = -2 + 0.9(100) = 88$.",
                                "Guided Calculation: Step 2: $V(A) = -2 + 0.9(88) = 77.2$.",
                                "Class reflects: 'Why is A worth less than B?' (It is further from the reward, and every step costs energy)."
                            ],
                            inputs: "3-step node diagram and parameters",
                            outputs: "Full value propagation calculation on the board",
                            rubrics: ["Correct use of $R + \\gamma V$ formula", "Reverse-order logic application", "Classroom participation"],
                            outcomes: "Students master the technical execution of a manual Bellman backup.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Value Propagation Race",
                            objectives: "Experience the iterative nature of the Bellman Equation in a grid setting.",
                            instructions: [
                                "Divide class into 4 teams. Provide a 3x3 grid on chart paper.",
                                "Place a 'Goal' (+10) in the corner. All other cells start at 0.",
                                "Rule: Every minute, teams update every cell using the average value of its neighbors (Bellman iteration).",
                                "Group Task: Watch how the 'high value' slowly spreads from the goal to the opposite corner.",
                                "Teams race to identify when the center cell reaches a value > 5."
                            ],
                            inputs: "3x3 blank grid and parameters",
                            outputs: "Heatmap of values across iterations",
                            rubrics: ["Accuracy of averaging calculations", "Understanding of 'Information Spread'", "Team coordination"],
                            outcomes: "Students visualize how the Bellman Equation ensures global consistency across a state space.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers", "Calculators"]
                        },
                        {
                            level: 4,
                            title: "Life Degree Audit",
                            objectives: "Independently model a long-term personal decision using Bellman's recursive logic.",
                            instructions: [
                                "Task: Choose a goal (e.g., Earning a Degree, Learning a Language).",
                                "Audit: Define the 'Future Value' $V(s')$ (e.g., Career opportunities).",
                                "Audit: Define the 'Immediate Reward' (e.g., -5 effort for studying, +2 for learning a cool fact).",
                                "Reflection: Use the Bellman Equation to justify your current 'Value' (motivation level).",
                                "Analysis: If the 'Discount Factor' $\\gamma$ is too low, does your current value become zero? (The 'Short-termism' trap)."
                            ],
                            inputs: "Personal long-term goals",
                            outputs: "Individual Recursive Value Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Logical justification of 'Motivation' as Value", "Originality"],
                            outcomes: "Students bridge mathematical recursion with biological and professional planning.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Maze Solver" 
                subtitle="Visualizing Global Consistency"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building a pathfinding AI for a delivery drone. Instead of searching every path, you initialize all values to zero and repeatedly apply the Bellman Equation to every square. 
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <div className="text-[10px] font-bold text-indigo-500 uppercase">Iteration 1</div>
                            <p className="text-xs mt-1 text-slate-500">Only the squares next to the goal get a value.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <div className="text-[10px] font-bold text-indigo-500 uppercase">Iteration 50</div>
                            <p className="text-xs mt-1 text-slate-500">Value has spread throughout the maze, forming a "Gradient" that points toward the goal.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Bellman's Logic"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'State the Bellman Expectation Equation in words.', a: 'The value of the current state is equal to the expected immediate reward plus the discounted expected value of the next state.' },
                        { q: 'What is a "Backup" diagram?', a: 'A graphical representation of the Bellman Equation, showing how value flows from successor states (leaves) back to the current state (root).' },
                        { q: 'Can we solve the Bellman Equation for infinite states?', a: 'Exactly solving it with matrix inversion is impossible for infinite states; instead, we use iterative methods like Value Iteration or function approximation (Deep RL).' }
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
                title="6. Virtual Lab: The Backup Calculator" 
                subtitle="Manually Update a State"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In this lab, you act as the Bellman Equation. You have one current state and three possible successor states ($s'_1, s'_2, s'_3$). Change the values of the next states or the discount factor to see how the "Current Value" updates automatically.
                    </p>
                    <BellmanBackupLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Bellman Equation: Mastered!</h3>
                    <p className="text-primary-100">
                        You've unlocked the recursive secret of RL. Ready to apply this to a real robot case study?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: RECYCLING ROBOT CASE
                    </button>
                </div>
            </div>
        </div>
    );
}
