import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    TrendingUp, GitMerge, Search, Target, Network, Layers, BarChart4, Play, Pause, RotateCcw, Briefcase
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from 'recharts';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Markov Chain Analysis Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Markov Chain Analysis Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Markov Chain Analysis simulator.",
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
    "🤖 [System] Initializing Markov Chain Analysis Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Markov Chain Analysis\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components ──────────────────────────────────────────────────

/**
 * Interactive Lab: Stationary Distribution Convergence
 */
function ConvergenceLab() {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Transition Matrix: 
    // P = [[0.8, 0.2], [0.4, 0.6]]
    // Initial State: [1, 0] (Start 100% Sunny)

    const [dist, setDist] = useState([1.0, 0.0]);

    const P = [
        [0.8, 0.2],
        [0.4, 0.6]
    ];

    const nextStep = () => {
        setDist(prev => {
            const next0 = prev[0] * P[0][0] + prev[1] * P[1][0];
            const next1 = prev[0] * P[0][1] + prev[1] * P[1][1];
            return [next0, next1];
        });
        setStep(s => s + 1);
    };

    const reset = () => {
        setDist([1.0, 0.0]);
        setStep(0);
        setIsPlaying(false);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying && step < 20) {
            interval = setInterval(() => {
                nextStep();
            }, 500);
        } else if (step >= 20) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, step]);

    const chartData = [
        { name: 'Sunny (State 1)', prob: parseFloat((dist[0] * 100).toFixed(1)), color: '#f59e0b' },
        { name: 'Rainy (State 2)', prob: parseFloat((dist[1] * 100).toFixed(1)), color: '#3b82f6' }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <TrendingUp size={18} className="text-primary-500" />
                        State Probability Convergence
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Watch the probabilities settle into a "Stationary Distribution".</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`p-2 rounded-xl text-xs font-bold transition-all ${isPlaying ? 'bg-amber-100 text-amber-600' : 'bg-primary-100 text-primary-600'}`}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={nextStep} disabled={isPlaying} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                        <TrendingUp size={16} />
                    </button>
                    <button onClick={reset} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <span>Time Step (t)</span>
                        <span className="text-xl text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">{step}</span>
                    </div>

                    <div className="space-y-3">
                        {chartData.map((d, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{d.name}</span>
                                    <span className="text-xs font-black" style={{ color: d.color }}>{d.prob}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={false}
                                        animate={{ width: `${d.prob}%` }}
                                        transition={{ type: 'spring', bounce: 0 }}
                                        className="h-full"
                                        style={{ backgroundColor: d.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-500 italic">
                        {step > 15 ? "Notice how the probabilities stop changing? The system has reached its Stationary Distribution (approx 66.7% Sunny, 33.3% Rainy)." : "Probabilities are shifting as time progresses..."}
                    </div>
                </div>

                <div className="h-48 w-full bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} hide />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="prob" radius={[6, 6, 0, 0]} animationDuration={500}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic4_MarkovChainAnalysis() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic4_markovchainanalysis" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. The Equilibrium Effect"
                subtitle="Where Does the Future Settle?"
                icon={<BookOpen className="text-blue-600" size={24} />}
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
                                "Analyzing a Markov Chain is like predicting the weather: mostly sunny, followed by a 30% chance of an existential crisis."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌊 A Drop of Ink in Water
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine dropping a drop of blue ink into a glass of water. At first, the ink is concentrated in one spot. It moves randomly (stochastically).
                            </p>
                            <p>
                                But if you wait long enough, the water turns a uniform light blue. The ink molecules are still moving randomly, but the <em>overall distribution</em> of color has stopped changing. It has reached an <strong>Equilibrium</strong>.
                            </p>
                            <p>
                                Analyzing a Markov Chain is exactly like this. We want to know: "If we let this system run for 1,000 steps, what is the long-term probability of being in any specific state?" This "settled" probability is called the <strong>Stationary Distribution</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Steady State">
                            In a stationary distribution, the probability of being in a state doesn't change from step $t$ to $t+1$.
                        </InfoCard>
                        <InfoCard type="tip" title="n-Step Transition">
                            To find out where we are after $n$ steps, we multiply the transition matrix by itself $n$ times ($P^n$).
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="2. The Math of Convergence"
                subtitle="n-Step Transitions & Stationary Distributions"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock
                                formula="\pi P = \pi"
                                label="Stationary Distribution Equation"
                                explanation="The distribution vector π multiplied by the transition matrix P results in the exact same distribution π."
                            />
                            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                                <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Layers size={16} /> Matrix Power (Pⁿ)</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    The $(i, j)$ entry of the matrix $P^n$ gives the probability that a process starting in state $i$ will be in state $j$ exactly $n$ steps later.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                                <h5 className="font-bold text-slate-800 dark:text-white mb-4">Requirements for Stationarity</h5>
                                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 list-disc pl-4">
                                    <li><strong>Irreducible:</strong> You can get from any state to any other state eventually.</li>
                                    <li><strong>Aperiodic:</strong> The system doesn't get trapped in a fixed cyclic loop.</li>
                                    <li>If a chain is both irreducible and aperiodic, it is called <strong>Ergodic</strong>, and it is guaranteed to have a unique stationary distribution.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <SymbolTable
                        symbols={[
                            { symbol: '\pi', meaning: 'Stationary distribution vector (a row vector of probabilities).' },
                            { symbol: 'P', meaning: 'State transition probability matrix.' },
                            { symbol: 'P^n', meaning: 'The transition matrix multiplied by itself n times.' },
                            { symbol: '\sum \pi_i = 1', meaning: 'The probabilities in the distribution must sum to 1.0.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Markov Chain Analysis Architecture"
                description="Analyzing sequence probabilities in a Markov Chain."
                chart={`graph TD
    StateA((A)) -->|0.7| StateA
    StateA -->|0.3| StateB((B))
    StateB -->|0.5| StateA
    StateB -->|0.5| StateB`}
            />


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="3. Multi-Level Activities"
                subtitle="Analyzing Long-Term Dynamics"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Convergence Simulator Demo",
                            objectives: "Observe how a distribution settles into a stationary state regardless of the initial starting point.",
                            instructions: [
                                "Open the 'Convergence Simulator' in the Virtual Lab section.",
                                "Press Play and watch the 'Sunny' probability drop from 100% to ~66.7%.",
                                "Explain that this 66.7% is the value where $\pi P = \pi$ holds.",
                                "Ask: 'What would happen if we started 100% Rainy?' (Predict convergence to the same point)."
                            ],
                            inputs: "Interactive ConvergenceLab component",
                            outputs: "Real-time probability bar charts showing equilibrium.",
                            rubrics: ["Clarity of 'Equilibrium' explanation", "Demonstration of convergence speed", "Student engagement"],
                            outcomes: "Students identify the stationary distribution as the fixed point of the system.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Ergodic Audit Workshop",
                            objectives: "Collaboratively classify Markov Chains as Ergodic or Non-Ergodic based on their topology.",
                            instructions: [
                                "Teacher draws three state-transition diagrams on the board.",
                                "Diagram A: Two disconnected groups (Irreducible check).",
                                "Diagram B: A strict A->B->A cycle (Aperiodic check).",
                                "Diagram C: A fully connected network.",
                                "Guided Discussion: 'Which one will have a unique stationary distribution?'",
                                "Students identify Diagram C as Ergodic and explain why A and B fail."
                            ],
                            inputs: "State-transition topology diagrams",
                            outputs: "Classification of 3 chains (Irreducible, Aperiodic, Ergodic)",
                            rubrics: ["Correct use of terminology", "Logical justification", "Classroom participation"],
                            outcomes: "Students master the theoretical requirements for a Markov Chain to settle down.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Mini-PageRank Simulation",
                            objectives: "Experience the fundamental logic of Google's search algorithm using a manual Markov Chain process.",
                            instructions: [
                                "Divide class into groups of 3 (Webpage A, B, and C).",
                                "A links to B. B links to A and C. C links to A.",
                                "Each group starts with 100 'Importance Points' on Page A.",
                                "Task: Perform 3 steps of point distribution. (e.g., in step 1, A gives all 100 to B).",
                                "Groups track the 'Score Distribution' after 3 steps and identify the 'Most Important' page."
                            ],
                            inputs: "3-page link topology",
                            outputs: "Score Distribution Table [A, B, C] after 3 iterations",
                            rubrics: ["Mathematical accuracy of flow", "Technical matrix mapping", "Team coordination"],
                            outcomes: "Students understand that the Stationary Distribution represents the 'Relative Importance' of states.",
                            time: "20 Mins",
                            materials: ["Large paper sheets", "Score markers"]
                        },
                        {
                            level: 4,
                            title: "The n-Step Calculation Audit",
                            objectives: "Independently calculate the exact probability of a state transition after 2 and 3 steps.",
                            instructions: [
                                "Task: Given $P = [[0.9, 0.1], [0.5, 0.5]]$.",
                                "Calculate $P^2$ manually on paper.",
                                "If starting in state 2, what is the probability of being in state 1 after 2 steps?",
                                "Estimate $P^3$ and observe if the values are moving closer together or staying the same.",
                                "Reflect: How many steps does it take for this matrix to 'forget' its starting state?"
                            ],
                            inputs: "2x2 Transition Matrix P",
                            outputs: "Individual calculation report with $P^2$ values",
                            rubrics: ["Matrix multiplication accuracy", "Correct cell interpretation", "Depth of reflection"],
                            outcomes: "Students gain technical proficiency in calculating multi-step Markovian trajectories.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="4. Project: PageRank Algorithm"
                subtitle="How Google Uses Markov Chains"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Search size={18} /> The Billion Dollar Algorithm</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Google's original <strong>PageRank</strong> algorithm is essentially finding the stationary distribution of a massive Markov Chain.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Network size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold uppercase">The States</div>
                            <p className="text-[10px] text-slate-500 mt-1">Every webpage on the internet is a state.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <GitMerge size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold uppercase">The Transitions</div>
                            <p className="text-[10px] text-slate-500 mt-1">Hyperlinks between pages define the probabilities.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Target size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold uppercase">The Stationary Dist.</div>
                            <p className="text-[10px] text-slate-500 mt-1">The final probabilities = The Page's "Importance Score".</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="5. Quick Check"
                subtitle="Analytical Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is a Stationary Distribution?', a: 'A probability distribution over states that remains unchanged as time progresses in a Markov Chain (πP = π).' },
                        { q: 'What is an Ergodic Markov Chain?', a: 'A Markov chain that is both irreducible (any state can reach any other) and aperiodic (does not get trapped in cycles). It guarantees a unique stationary distribution.' },
                        { q: 'How do you find the probability of transitioning from state i to j in 3 steps?', a: 'By raising the transition matrix P to the power of 3 (P³) and looking at the (i, j) entry.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="6. Virtual Lab: Convergence Simulator"
                subtitle="Watch the Probabilities Settle"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Chain Convergence Simulator"
                    description="Watch state probabilities reach steady state"
                    objective="Run the Markov Chain forward and observe the distribution converge to the stationary distribution."
                    badge="Interactive Lab"
                    tips={['After ~15 steps the probabilities stop changing — this is the stationary distribution',
                'Try starting from different initial states — they all converge to the same distribution']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        This system starts 100% in the Sunny state. Press play to watch how the state probabilities evolve over time. Notice that after about 10-15 steps, the probabilities stop changing—they have reached the <strong>Stationary Distribution</strong>.
                    </p>
                    <ConvergenceLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Analysis Complete!</h3>
                    <p className="text-primary-100">
                        You've unlocked the secrets of long-term predictions. Next, let's explore Markov Models in more detail.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MARKOV MODEL
                    </button>
                </div>
            </div>
        </div>
    );
}
