import React, { useState } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import QuizCard from '../../components/topic/QuizCard';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell,
    { LabChallenge,
    NotebookEntry } from '../../components/topic/VirtualLabShell';
import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Target,
    Briefcase,
    Zap,
    Binary,
    Shuffle,
    CheckCircle2,
    Play,
    AlertTriangle,
    Lightbulb
} from 'lucide-react';

import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Deterministic Stochastic Policy Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Deterministic Stochastic Policy Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Deterministic Stochastic Policy simulator.",
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
    "🤖 [System] Initializing Deterministic Stochastic Policy Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Deterministic Stochastic Policy\" model has been loaded and initialized. Ready for student interaction."
];

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
            <TopicProgressTracker topicId="unit3-topic3-deterministicstochasticpolicy" />
            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit3', 'Topic3_DeterministicStochasticPolicy');
                        if (!data) return null;
                        return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{data.prerequisites.map((p, i) => <li key={i}>{p}</li>)}</ul>);
                    })()}
                </div>
            </SectionWrapper>

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
                    <div className="mt-2 mb-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm flex items-start gap-4 transform hover:scale-[1.02] transition-transform">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-2xl">
                            🎭
                        </div>
                        <div>
                            <h5 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                                Fun Fact / Comic Relief
                            </h5>
                            <p className="text-indigo-700 dark:text-indigo-300 font-medium italic leading-relaxed">
                                "Deterministic policies are like choosing standard vanilla ice cream every single time. Stochastic policies are like letting a hyperactive monkey spin the flavor wheel."
                            </p>
                        </div>
                    </div>
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

            
            {/* SECTION 2: MOTIVATION & APPLICATION CHALLENGE */}
            <SectionWrapper
                id="motivation"
                title="2. Motivation & Application Challenge"
                subtitle="Why study this topic?"
                icon={<Lightbulb className="text-amber-500" size={24} />}
                badge="Motivation"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
            >
                <div className="space-y-6">
                    {/* APPLICATION CHALLENGE CARD */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900 shadow-sm flex items-start gap-4 animate-fade-in">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-2xl">
                            🚀
                        </div>
                        <div className="space-y-2">
                            <h5 className="font-bold text-amber-900 dark:text-amber-100 text-base">
                                Application-Specific Challenge
                            </h5>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                A Rock-Paper-Scissors bot playing against a human who can easily spot and exploit any repetitive, predictable pattern in the bot's moves.
                            </p>
                        </div>
                    </div>

                    {/* THE NEED TO STUDY */}
                    <div className="bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Target className="text-primary-500" size={16} />
                            The Need to Study this Topic
                        </h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Crucial to teach developers when to use single fixed actions (deterministic) versus random, mixed strategies (stochastic) to maximize rewards and resist exploitation.
                        </p>
                    </div>

                    {/* ADVANTAGES & DISADVANTAGES */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-emerald-950 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">
                                    Advantages
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Stochastic policies are excellent for multi-agent games and partially observable states; deterministic policies are simple and efficient.
                                </p>
                            </div>
                        </div>

                        <div className="bg-rose-50/50 dark:bg-rose-950/10 p-5 rounded-2xl border border-rose-100 dark:border-rose-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <AlertTriangle className="text-rose-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-rose-900 dark:text-rose-400 text-xs uppercase tracking-wider mb-1">
                                    Disadvantages / Bottlenecks
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Stochastic policies can be noisy and difficult to debug due to high action variance during training.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Mapping Actions" 
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
                                { term: 'a', name: 'Action', meaning: 'The single output of the policy.', range: '\\mathcal{A}', example: 'Move North' },
                            ]}
                        />

                        <MathBlock 
                            formula="\pi(a|s) \in [0, 1]"
                            label="Stochastic Policy"
                            explanation="A probability distribution over actions."
                            interpretation="You might take action A with 70% probability and action B with 30%."
                            motivation="Essential for exploration and for games where being predictable is a weakness."
                            terms={[
                                { term: '\\pi(a|s)', name: 'Prob Density', meaning: 'The likelihood of choosing a in s.', range: '0 \\to 1', example: '0.7 for Action A' },
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

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Deterministic vs Stochastic Policy Architecture"
                description="Difference between deterministic and stochastic policies."
                chart={`
graph LR
    S((State s)) --> |Deterministic &pi;(s)| A1[Action a=100%]
    S2((State s)) --> |Stochastic &pi;(a|s)| A2[Action a1=70%]
    S2 --> |Stochastic &pi;(a|s)| A3[Action a2=30%]
`.trim()}
            />

            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
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

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Epsilon-Greedy Agent" 
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

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
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
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Policy Simulator" 
                subtitle="Experience Randomness"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Policy Simulator"
                    description="Experience policy stochastics and determinism"
                    objective="Toggle between deterministic and stochastic modes. Observe the variance of selected actions."
                    badge="Interactive Lab"
                    tips={[
                        'Deterministic policies always return the exact same action for a given state.',
                        'Stochastic policies map states to probability distributions over actions.'
                    ]}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between **Deterministic** and **Stochastic** modes. In stochastic mode, adjust the probability and press **Execute Policy** multiple times. Notice how the outcome varies even though the state remains the same.
                    </p>
                    <PolicyTypeLab />
                </VirtualLabShell>
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => {
                    const data = getTopicData('unit3', 'Topic3_DeterministicStochasticPolicy');
                    if (!data) return null;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit3', 'Topic3_DeterministicStochasticPolicy');
                if (!data) return null;
                return (<React.Fragment>
                    <SectionWrapper id="recap" title="9. Topic Recap" subtitle="Key points to remember" icon={<BookOpen className="text-emerald-600" size={24} />} badge="Recap" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                        <ul className="space-y-2">{data.recap.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>{point}
                            </li>
                        ))}</ul>
                    </SectionWrapper>
                    <SectionWrapper id="skills" title="10. Skill Mapping" subtitle="Competencies developed" icon={<Target className="text-indigo-600" size={24} />} badge="Skills" badgeColor="bg-indigo-100 text-indigo-700" accentColor="border-indigo-500">
                        <div className="grid gap-3">{data.skillMapping.map((skill, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.skill}</span>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${skill.level === 'Beginner' ? 'bg-green-100 text-green-700' : skill.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{skill.level}</span>
                            </div>
                        ))}</div>
                    </SectionWrapper>
                </React.Fragment>);
            })()}

            {/* Keep existing navigation buttons here */}
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
