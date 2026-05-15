import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Target, Briefcase, Zap, Binary, Layers,
    Eye, ChevronRight, Shuffle, CheckCircle2, AlertCircle, Play
} from 'lucide-react';

// ─── Interactive Components for Topic 3 ─────────────────────────────────────

/**
 * Policy Type Visualizer: Deterministic vs Stochastic
 */
function PolicyTypeLab() {
    const [mode, setMode] = useState<'Deterministic' | 'Stochastic'>('Deterministic');
    const [prob, setProb] = useState(0.8);
    const [lastAction, setLastAction] = useState<string | null>(null);

    const runAction = () => {
        if (mode === 'Deterministic') {
            setLastAction('Action A');
        } else {
            const rand = Math.random();
            setLastAction(rand < prob ? 'Action A' : 'Action B');
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Control Panel */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="flex bg-slate-50 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                        {(['Deterministic', 'Stochastic'] as const).map(m => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                                    mode === m 
                                    ? 'bg-primary-600 text-white shadow-lg' 
                                    : 'text-slate-400 hover:bg-slate-100'
                                }`}
                            >
                                {m === 'Deterministic' ? <CheckCircle2 size={14} /> : <Shuffle size={14} />}
                                {m}
                            </button>
                        ))}
                    </div>

                    {mode === 'Stochastic' && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 space-y-4"
                        >
                            <div className="flex justify-between items-center text-[10px] font-bold text-primary-600 uppercase">
                                <span>P(Action A)</span>
                                <span>{(prob * 100).toFixed(0)}%</span>
                            </div>
                            <input 
                                type="range" min="0" max="1" step="0.1" 
                                value={prob} 
                                onChange={(e) => setProb(parseFloat(e.target.value))}
                                className="w-full accent-primary-600"
                            />
                        </motion.div>
                    )}

                    <button 
                        onClick={runAction}
                        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black shadow-lg shadow-primary-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        <Play size={18} /> EXECUTE POLICY
                    </button>
                </div>

                {/* Simulation Output */}
                <div className="flex-1 flex flex-col justify-center items-center gap-6 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                    <div className="text-center space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Policy Outcome</span>
                        <AnimatePresence mode="wait">
                            {lastAction ? (
                                <motion.div
                                    key={lastAction}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className={`text-2xl font-black ${lastAction === 'Action A' ? 'text-primary-600' : 'text-amber-500'}`}
                                >
                                    {lastAction}
                                </motion.div>
                            ) : (
                                <div className="text-2xl font-black text-slate-300">Standing By...</div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="w-full max-w-xs space-y-3">
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                            <motion.div 
                                animate={{ width: mode === 'Deterministic' ? '100%' : `${prob * 100}%` }}
                                className="h-full bg-primary-500" 
                            />
                            {mode === 'Stochastic' && (
                                <motion.div 
                                    animate={{ width: `${(1 - prob) * 100}%` }}
                                    className="h-full bg-amber-400" 
                                />
                            )}
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                            <span>Action A</span>
                            <span>{mode === 'Deterministic' ? '0%' : 'Action B'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic3_DeterministicStochasticPolicy() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Robot and the Narrow Bridge" 
                subtitle="Decisive vs Cautious Decisions"
                icon={<BookOpen className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Shuffle size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌉 Crossing the Gap
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a robot crossing a narrow bridge.
                            </p>
                            <p>
                                A **Deterministic Policy** says: "Always walk perfectly straight." If the robot is calibrated perfectly, it succeeds every time. But if there is a sudden gust of wind, it might fall.
                            </p>
                            <p>
                                A **Stochastic Policy** says: "Walk straight 90% of the time, but occasionally step slightly to the left or right to re-balance."
                            </p>
                            <p>
                                In RL, deterministic policies are simple and efficient for stable worlds, while stochastic policies are powerful tools for **Exploration** and handling noisy environments.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Optimal Truth">
                            For any Markov Decision Process, there always exists at least one **Deterministic Optimal Policy**.
                        </InfoCard>
                        <InfoCard type="tip" title="Exploration">
                            We often use stochastic policies (like $\epsilon$-greedy) during training to discover better paths.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Mapping Actions" 
                subtitle="Functions vs Distributions"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <MathBlock 
                            formula="a = \pi(s)"
                            label="Deterministic Policy"
                            explanation="A direct mapping from state to action."
                            interpretation="There is zero randomness. If you are in state s, you will ALWAYS take action a."
                            motivation="Simplifies computation and is the goal of most 'exploitation' phases."
                            terms={[
                                { term: 'a', name: 'Action', meaning: 'The single output of the policy.', range: '\mathcal{A}', example: 'Move North' },
                            ]}
                        />

                        <MathBlock 
                            formula="\pi(a|s) \in [0, 1]"
                            label="Stochastic Policy"
                            explanation="A probability distribution over actions."
                            interpretation="You might take action A with 70% probability and action B with 30%."
                            motivation="Essential for exploration and for games where being predictable is a weakness."
                            terms={[
                                { term: '\pi(a|s)', name: 'Prob Density', meaning: 'The likelihood of choosing a in s.', range: '0 \to 1', example: '0.7 for Action A' },
                            ]}
                        />
                    </div>

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Convergence Property</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Most RL algorithms start with a highly **Stochastic** policy (to explore everything) and gradually "narrow down" to a **Deterministic** policy as they gain confidence in the best action.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Spectrum of Certainty"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Policy Simulator Demo",
                            objectives: "Observe the behavioral difference between fixed mappings and probabilistic distributions.",
                            instructions: [
                                "Open the 'Policy Simulator' in the Virtual Lab section.",
                                "Select 'Deterministic'. Execute 5 times. Notice Action A is picked every single time.",
                                "Select 'Stochastic'. Set P(Action A) to 0.7. Execute 5 times.",
                                "Show the students that even with 70%, sometimes Action B is picked. This is 'Exploration'.",
                                "Ask: 'If Action B leads to a giant gold chest we didn't know about, which policy was better?'"
                            ],
                            inputs: "Interactive PolicyTypeLab component",
                            outputs: "Repeated action execution logs and probability bars.",
                            rubrics: ["Clarity of 'Predictability' explanation", "Demonstration of sample variance", "Student engagement"],
                            outcomes: "Students differentiate between the function $a = \\pi(s)$ and the distribution $\\pi(a|s)$.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Narrow Bridge Workshop",
                            objectives: "Collaboratively calculate the long-term survival probability of two policy types.",
                            instructions: [
                                "Teacher presents scenario: A 10-step bridge. Walking straight (Deterministic) has a 99% success rate per step.",
                                "Stochastic Policy: Walk straight (99%) but if you sense wind, step left (95% success).",
                                "Teacher asks: 'What is the chance of survival for the Deterministic policy?' ($0.99^{10} \\approx 0.90$).",
                                "Class reflects: 'If the stochastic policy only uses the safer step when needed, it can reach ~95% total survival.'",
                                "Conclusion: Stochasticity is often a safety mechanism for high-variance environments."
                            ],
                            inputs: "Bridge scenario success rates",
                            outputs: "Survival probability comparison on the board",
                            rubrics: ["Mathematical accuracy", "Logic of risk mitigation", "Classroom participation"],
                            outcomes: "Students master the technical reasoning behind choosing stochasticity in noisy worlds.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Unexploitable Guard Design",
                            objectives: "Experience the tactical necessity of randomness in adversarial settings.",
                            instructions: [
                                "Divide class into 4 teams. Scenario: 'Stealth Game AI Guard'.",
                                "Condition: If the guard follows a fixed path (Deterministic), the player can time their move perfectly.",
                                "Group Task: Design a 'Stochastic Patrol Route'. At the intersection, define probabilities for {Turn Left, Turn Right, Wait}.",
                                "Teams 'test' their guard against another team (the 'Player').",
                                "Discuss: 'Which guard was harder to sneak past?'"
                            ],
                            inputs: "Stealth game guard-player dynamics",
                            outputs: "Stochastic Guard Policy Chart (Probability Table)",
                            rubrics: ["Effectiveness of the randomized path", "Proper use of probability sums (Total = 1.0)", "Team coordination"],
                            outcomes: "Students identify that deterministic policies are exploitable by intelligent adversaries.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Life Policy Audit",
                            objectives: "Independently audit personal decision-making patterns through the lens of policy types.",
                            instructions: [
                                "Task: Identify two decisions you make daily—one that is Deterministic and one that is Stochastic.",
                                "Deterministic Example: 'I always take the same route to work/college because it is the shortest path.' (Exploitation).",
                                "Stochastic Example: 'I try a different restaurant every Friday even if I have a favorite.' (Exploration).",
                                "Analysis: Why do you keep the stochastic behavior for the second example? What 'reward' are you searching for?",
                                "Reflect: What would happen if you became 100% deterministic in all aspects of your life?"
                            ],
                            inputs: "Personal daily habits",
                            outputs: "Individual Decision Audit Report (1 page)",
                            rubrics: ["Correct application of 'Exploration vs Exploitation' concepts", "Logical justification of policy choices", "Originality"],
                            outcomes: "Students apply RL theory to understand the balance of stability and curiosity in human behavior.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Epsilon-Greedy Agent" 
                subtitle="Balancing the Best with the New"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building a robot to sort trash. Most of the time, it should use the "Best" strategy it knows (Deterministic). But 5% of the time ($\epsilon$), it should try a random move (Stochastic) to see if there's a faster way to sort.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 text-center font-mono text-xs">
                        <span className="text-primary-500">if (random() &lt; epsilon)</span> {' { take_random_action() } '}<br/>
                        <span className="text-primary-500">else</span> {' { take_best_action() } '}
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Policy Taxonomy"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is a deterministic policy?', a: 'A deterministic policy maps each state directly to a single action. There is no uncertainty in the choice made.' },
                        { q: 'What is a stochastic policy?', a: 'A stochastic policy defines a probability distribution over actions for each state. The agent samples an action from this distribution.' },
                        { q: 'When is a stochastic policy absolutely necessary?', a: 'In multi-agent adversarial games (like Poker or Rock-Paper-Scissors) and in certain partially observable environments (POMDPs).' }
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
                title="6. Virtual Lab: Policy Simulator" 
                subtitle="Experience Randomness"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between **Deterministic** and **Stochastic** modes. In stochastic mode, adjust the probability and press **Execute Policy** multiple times. Notice how the outcome varies even though the state remains the same.
                    </p>
                    <PolicyTypeLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Policy Types Mastered!</h3>
                    <p className="text-primary-100">
                        You know how agents decide. Now, let's look at the mathematical "Glue" that binds rewards and values together: The Bellman Equation.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: BELLMAN EQUATIONS
                    </button>
                </div>
            </div>
        </div>
    );
}
