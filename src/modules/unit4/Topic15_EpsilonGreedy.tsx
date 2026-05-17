import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Compass, Target, Zap, TrendingUp, Activity, Cpu, HardDrive, Briefcase,
    Shield, Move, MousePointer2, User, Layout, Map,
    Dice6, Sparkles, Binary, Focus, Play, Pause, RotateCcw
} from 'lucide-react';

// ─── Interactive Components for Topic 15 ─────────────────────────────────────

/**
 * Epsilon-Greedy Probability Visualizer
 */
function EpsilonProbabilityVisualizer() {
    const [epsilon, setEpsilon] = useState(0.2);
    const numActions = 4;
    
    // Probabilities
    const probExplore = epsilon / numActions;
    const probGreedy = (1 - epsilon) + probExplore;

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Compass size={18} className="text-primary-500" />
                                Exploration Rate (\u03B5)
                            </h4>
                            <span className="text-2xl font-black text-primary-600">{(epsilon * 100).toFixed(0)}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.01" value={epsilon} 
                            onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            <span>Pure Greedy (\u03B5=0)</span>
                            <span>Pure Random (\u03B5=1)</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Probability Distribution</h5>
                        <div className="space-y-3">
                            {/* Best Action */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-emerald-600">Best Action (a*)</span>
                                    <span>{(probGreedy * 100).toFixed(1)}%</span>
                                </div>
                                <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-emerald-500"
                                        animate={{ width: `${probGreedy * 100}%` }}
                                    />
                                </div>
                            </div>
                            {/* Other Actions */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="space-y-1 opacity-60">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-slate-500">Other Action {i}</span>
                                        <span>{(probExplore * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-amber-500"
                                            animate={{ width: `${probExplore * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                    <div className="text-center space-y-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm inline-block">
                            <Dice6 size={48} className="text-primary-500 mx-auto" />
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-800 dark:text-white">The "Soft" Policy</h5>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto mt-2">
                                Because \u03B5 &gt; 0, every action has a <strong>non-zero</strong> chance of being picked. This is critical for Monte Carlo Control to ensure all states are visited!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic15_EpsilonGreedy() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic15_epsilongreedy" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Curiosity Insurance" 
                subtitle="Ensuring Every Path is Explored"
                icon={<Sparkles className="text-blue-600" size={24} />}
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
                                "Epsilon-greedy: spending 90% of your time being smart, and 10% of your time doing something completely random just in case."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Compass size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🎭 The Actor's Dilemma
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are a restaurant critic. You found a place that serves a great 8/10 pizza. You could eat there every night (Exploitation). 
                            </p>
                            <p>
                                But what if there's a 10/10 sushi place around the corner that you haven't tried? If you only eat pizza, you will <strong>never</strong> discover it.
                            </p>
                            <p>
                                <strong>$\epsilon$-Greedy</strong> is like saying: "90% of the time, I'll go to my favorite pizza place. But 10% of the time, I'll roll a die and try somewhere completely random."
                            </p>
                            <p>
                                In Monte Carlo methods, this is vital. Since MC learns from complete episodes, if your policy is too "greedy," it might never explore certain areas of the map, and your value estimates will be forever wrong.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Always a Chance">
                            {"In an \u03B5-greedy policy, every possible action has a probability $\\geq \\frac{\\epsilon}{|\\mathcal{A}|}$. No action is ever completely ignored."}
                        </InfoCard>
                        <InfoCard type="tip" title="Policy Improvement">
                            Moving from a random policy to an \u03B5-greedy policy is the first step in <strong>Control</strong>—learning how to actually behave better.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Probabilistic Selection" 
                subtitle="The Math of Soft Policies"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula={"\\pi(a|s) = \\begin{cases} 1 - \\epsilon + \\frac{\\epsilon}{|\\mathcal{A}(s)|} & \\text{if } a = a^* \\\\ \\frac{\\epsilon}{|\\mathcal{A}(s)|} & \\text{if } a \\neq a^* \\end{cases}"}
                        label="Epsilon-Greedy Probability Distribution"
                        accent="blue"
                        explanation="The formula used to calculate the probability of selecting an action under the \u03B5-greedy policy."
                        interpretation="The 'best' action a* gets the lion's share of probability (1-\u03B5), plus its fair share of the exploration budget. All other actions share the remaining \u03B5 probability equally. This ensures the agent mostly exploits but occasionally explores."
                        motivation="Without this mathematical guarantee of exploration, Monte Carlo Control fails because it cannot satisfy the 'Assumption of Continual Exploration'. It might get stuck in a suboptimal loop forever."
                        terms={[
                            { term: '\u03B5', name: 'Exploration Parameter', meaning: 'The probability of choosing a random action.', range: '[0, 1]', example: '\u03B5=0.1 means 10% exploration.' },
                            { term: '|\\mathcal{A}(s)|', name: 'Action Space Size', meaning: 'The number of possible actions in state s.', range: '\\mathbb{Z}^+', example: 'If you can move Up, Down, Left, Right, |\\mathcal{A}|=4.' },
                            { term: 'a^*', name: 'Greedy Action', meaning: 'The action that currently has the highest estimated Q-value.', range: '\\mathcal{A}', example: 'a^* = \\arg\\max_a Q(s, a).' },
                        ]}
                        numericalExample={{
                            setup: 'Agent has 4 actions (U, D, L, R). Q-values: Q(U)=10, Q(D)=2, Q(L)=5, Q(R)=1. \u03B5=0.2.',
                            steps: [
                                'Greedy action a* is "Up" (Q=10).',
                                'Prob(Up) = (1 - 0.2) + (0.2 / 4) = 0.8 + 0.05 = 0.85 (85%)',
                                'Prob(Down) = 0.2 / 4 = 0.05 (5%)',
                                'Prob(Left) = 0.2 / 4 = 0.05 (5%)',
                                'Prob(Right) = 0.2 / 4 = 0.05 (5%)'
                            ],
                            result: 'The agent will pick "Up" 85% of the time, but will try other directions 15% of the time.',
                        }}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><TrendingUp size={16} /> Epsilon Decay</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            In practice, we often start with a high $\epsilon$ (e.g., 1.0) to explore everything, and then gradually <strong>decay</strong> it towards a small value (e.g., 0.01) as the agent becomes more confident in its estimates.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Epsilon Greedy Architecture"
                description="Soft Policies for guaranteed exploration."
                chart={`graph LR
    S[State] --> Choice{Roll Die (0 to 1)}
    Choice -- "< Epsilon" --> Random[Pick Random Action]
    Choice -- "> Epsilon" --> Greedy[Pick Best Action max Q]
    Random --> Execute
    Greedy --> Execute`}
            />


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Curiosity Budget"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Exploration Logic Demo",
                            objectives: "Visualize how epsilon acts as a budget for curiosity.",
                            instructions: [
                                "Open the 'Probability Balancer' in the Virtual Lab section.",
                                "Set $\epsilon = 0.2$. Point out: 'The best action still has 85% probability, not 80%.'",
                                "Explain: 'Because the best action is ALSO part of the random exploration budget (20%/4 = 5%).'",
                                "Slide $\epsilon$ to 1.0. Show how all actions become equal (Pure Random).",
                                "Slide $\epsilon$ to 0.0. Show how one action takes 100% (Pure Greedy)."
                            ],
                            inputs: "Interactive EpsilonProbabilityVisualizer component",
                            outputs: "Live probability bars shifting with the slider.",
                            rubrics: ["Understanding of the 'Soft Policy' concept", "Correct identification of the 1.0 limit", "Student engagement"],
                            outcomes: "Students identify the mathematical mechanics of epsilon-greedy selection.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Dice Roller Workshop",
                            objectives: "Collaboratively calculate action probabilities for complex state spaces.",
                            instructions: [
                                "Teacher Scenario: 'Agent has 5 actions. $\epsilon = 0.1$. Action 3 has the highest Q-value.'",
                                "Class Task: Calculate the exact probability of picking Action 3.",
                                "Step 1: Calculate exploration probability per action (0.1 / 5 = 0.02).",
                                "Step 2: Calculate exploitation probability (1 - 0.1 = 0.9).",
                                "Step 3: Sum them for Action 3 (0.9 + 0.02 = 0.92 or 92%).",
                                "Class reflects: 'Is it possible for a non-greedy action to have 0% probability?'"
                            ],
                            inputs: "Action-value scenarios",
                            outputs: "Manual probability distributions on the board",
                            rubrics: ["Arithmetic accuracy", "Correct handling of the greedy action's bonus", "Classroom participation"],
                            outcomes: "Students master the probabilistic calculation used in epsilon-greedy policies.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Exploration Budget Challenge",
                            objectives: "Experience the trade-off between risk and reward in unknown environments.",
                            instructions: [
                                "Divide class into 2 teams: Team Conservative ($\epsilon=0.01$) and Team Explorer ($\epsilon=0.5$).",
                                "Scenario: 'A robot searching for gold in a vast, dangerous cave system'.",
                                "Team Conservative: Argue why sticking to known paths is safer for the robot's battery.",
                                "Team Explorer: Argue why high exploration is necessary to find the largest gold deposits.",
                                "Output: A 'Dynamic Epsilon' proposal - when should the robot switch from Explorer to Conservative?",
                                "Conclusion: 'Explore early, exploit late' (Epsilon Decay)."
                            ],
                            inputs: "Robot cave exploration scenario",
                            outputs: "Epsilon-Decay Schedule graph",
                            rubrics: ["Understanding of the exploration/exploitation trade-off", "Logical arguments for decay", "Team coordination"],
                            outcomes: "Students develop engineering intuition for hyperparameter tuning.",
                            time: "20 Mins",
                            materials: ["Graph paper", "Colored markers"]
                        },
                        {
                            level: 4,
                            title: "Personal Routine Audit",
                            objectives: "Independently audit daily habits to identify personal exploration rates.",
                            instructions: [
                                "Task: Choose a routine (e.g., 'What I eat for lunch' or 'My route to the university').",
                                "Audit: Over the last 10 days, how many times did you 'Exploit' (did the usual) vs. 'Explore' (tried something new)?",
                                "Calculate: Your personal $\epsilon$ for this routine.",
                                "Analysis: If your personal $\epsilon$ is 0, are you stuck in a 'local optimum'? What 'Sushi place' might you be missing?",
                                "Propose: A 10% exploration goal for next week."
                            ],
                            inputs: "Personal daily behavior data",
                            outputs: "Individual 'Curiosity Audit' Report (1 page)",
                            rubrics: ["Correct application of $\epsilon$ calculation", "Personal insight and reflection", "Originality"],
                            outcomes: "Students demonstrate the ability to map RL abstractions to real-world behavioral optimization.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: E-Commerce Personalization" 
                subtitle="Avoiding the Filter Bubble"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold flex items-center gap-2"><Target size={18} /> The Recommendation Problem</h5>
                            <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full">PROJECT #52</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            An online store uses RL to recommend products. If it only recommends things you've bought before (Exploitation), you'll never see new categories. 
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm">
                        <h6 className="font-bold text-xs mb-3 text-indigo-600 uppercase">The \u03B5-Greedy Solution:</h6>
                        <ul className="text-xs space-y-2 text-slate-500 list-disc pl-4">
                            <li>80% of recommendations are based on your history.</li>
                            <li>20% are random "wildcards" to see if your interests have changed.</li>
                            <li>This prevents the "Filter Bubble" and allows the system to discover new trends!</li>
                            <li className="text-primary-600 font-bold mt-2">See "Project Bank" for full Python implementation using Contextual Bandits.</li>
                        </ul>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Exploration Theory"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is a "Soft Policy"?', a: 'A policy where every action has a non-zero probability of being selected in every state. \u03B5-greedy is a prime example.' },
                        { q: 'Why is \u03B5-greedy necessary for Monte Carlo Control?', a: 'Because Monte Carlo Control requires that all state-action pairs are visited infinitely often to guarantee convergence. A pure greedy policy might stop exploring and miss the optimal strategy.' },
                        { q: 'What happens to the policy as \u03B5 approaches 0?', a: 'The policy becomes increasingly "Greedy," eventually only choosing the action with the highest estimated value.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Probability Balancer" 
                subtitle="Visualizing the Exploration Budget"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Probability Balancer"
                    description="Visualize ε-greedy probability distribution"
                    objective="Adjust ε and the number of actions. See how probability mass is distributed between exploitation and exploration."
                    badge="Interactive Lab"
                    tips={['Every action always has probability ≥ ε/|A|',
                'At ε=0, all probability goes to the best action',
                'At ε=1, all actions are equally likely']}
                >
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Adjust the $\epsilon$ slider to see how the mathematical probability is distributed across actions. Watch how the "Exploration Budget" grows and shrinks.
                    </p>
                    <EpsilonProbabilityVisualizer />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-blue-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Exploration Guaranteed!</h3>
                    <p className="text-blue-100">
                        You've mastered the standard method for balancing greed and curiosity. Now you're ready to tackle the most complex RL environments.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-blue-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        FINISH UNIT 4
                    </button>
                </div>
            </div>
        </div>
    );
}
