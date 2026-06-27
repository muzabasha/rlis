import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect, useCallback } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock,
    SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import MCSamplingLab from '../../components/labs/MCSamplingLab';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Target,
    Zap,
    TrendingUp,
    Sparkles,
    Binary,
    Focus,
    Activity,
    Cpu,
    HardDrive,
    Briefcase,
    Shield,
    Move,
    MousePointer2,
    User,
    Play,
    Pause,
    RotateCcw,
    Layout,
    Dice5,
    History,
    Calculator as CalcIcon,
    Map,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { RecursiveReturnVis, ValueDistributionVis } from '../../components/visualizers';
import { InlineMath } from 'react-katex';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "M C Intro Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "M C Intro Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the M C Intro simulator.",
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
    "🤖 [System] Initializing M C Intro Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"M C Intro\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic10_MCIntro() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic10_mcintro" />

            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => { const d = getTopicData('unit4', 'Topic10_MCIntro'); if (!d) return null; return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{d.prerequisites.map((p,i) => <li key={i}>{p}</li>)}</ul>); })()}
                </div>
            </SectionWrapper>
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Learning from the Finish Line" 
                subtitle="The Experience-Based Approach"
                icon={<Dice5 className="text-blue-600" size={24} />}
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
                                "Monte Carlo methods: named after the casino, because it's literally just taking a bunch of random guesses and hoping for the best."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <History size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🎲 Gambling on Knowledge
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you want to know the probability of winning a game of Solitaire. You don't know the math of all possible deck combinations (The Model). 
                            </p>
                            <p>
                                What do you do? You play 1,000 games and count how many you win. That simple "Averaging of Experience" is the heart of <strong>Monte Carlo (MC) Methods</strong>.
                            </p>
                            <p>
                                Named after the famous casino in Monaco, MC methods don't guess during the journey. They wait until the very end of an episode, look at the final score (The Return), and then update their knowledge.
                            </p>
                            <p>
                                It is the ultimate "Trial and Error" technique—unbiased, simple, and powerful.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The No-Model Edge">
                            MC doesn't need to know how the environment works (No <InlineMath math="p(s',r|s,a)" />). It only needs to observe the results.
                        </InfoCard>
                        <InfoCard type="tip" title="Episode Completion">
                            Unlike TD learning, MC <strong>must</strong> wait until the episode is over before it can learn anything.
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
                                Evaluating blackjack strategies through trial-and-error card dealing, without mathematically analyzing the massive recursive probability trees.
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
                            Introduces the crucial Monte Carlo paradigm of learning values directly from complete, experienced episodes without needing a transition model.
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
                                    Extremely simple concept; requires no prior knowledge of environment transition dynamics.
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
                                    Only works on episodic tasks; requires waiting until the absolute end of an episode to perform a single learning update.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Return Average" 
                subtitle="The Math of Aggregated Experience"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock 
                        formula="G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots + \\gamma^{T-t-1} R_T"
                        label="The Cumulative Return"
                        accent="blue"
                        explanation="The total discounted reward from time t until the end of the episode at time T."
                        interpretation="MC methods rely on the fact that G_t is a sample of the true value v(s). By collecting many such samples, the average will eventually converge to the true expected value."
                        motivation="This is the raw data used for learning in MC. Because it uses the actual rewards from the entire episode, it is an unbiased estimate of the value."
                        terms={[
                            { term: 'G_t', name: 'Return', meaning: 'Total reward from step t to terminal step T.', range: '\\mathbb{R}', example: 'G = 0 + 0 + 10 = 10 (at the end).' },
                            { term: 'T', name: 'Terminal Time', meaning: 'The step at which the episode ends.', range: '\\mathbb{Z}^+', example: 'Game over at step 50.' },
                        ]}
                    />
                    <RecursiveReturnVis />

                    <MathBlock 
                        formula="V(s) \\approx \\frac{1}{N(s)} \\sum_{i=1}^{N(s)} G_i(s)"
                        label="The MC Estimation Rule"
                        accent="violet"
                        explanation="Estimating the value of a state by averaging all the returns observed after visiting that state."
                        interpretation="As the number of visits N(s) goes to infinity, the average of the observed returns is guaranteed to converge to the true value v_\\pi(s). This is the Law of Large Numbers in action."
                        motivation="This allows us to learn without a model. We just keep a running count of visits and a running sum of returns."
                        terms={[
                            { term: 'V(s)', name: 'Estimated Value', meaning: 'The current average of all returns seen from state s.', range: '\\mathbb{R}', example: 'V(room) = 8.5 after 10 visits.' },
                            { term: 'N(s)', name: 'Visit Count', meaning: 'The total number of times state s has been visited across all episodes.', range: '\\mathbb{Z}^+', example: 'If we have played 100 games and hit this state in 20 of them, N(s)=20.' },
                            { term: 'G_i(s)', name: 'Sample Return', meaning: 'The return received after the i-th visit to state s.', range: '\\mathbb{R}', example: 'On visit 3, the agent eventually got a total reward of 12.' },
                        ]}
                        numericalExample={{
                            setup: 'State s visited in 3 episodes. Episode 1 Return: 10. Episode 2 Return: 15. Episode 3 Return: 8.',
                            steps: [
                                'N(s) = 3',
                                'Sum of G = 10 + 15 + 8 = 33',
                                'V(s) = 33 / 3 = 11'
                            ],
                            result: 'The MC estimate for state s is 11.',
                        }}
                    />
                    <ValueDistributionVis />

                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="M C Intro Architecture"
                description="Introduction to Monte Carlo methods."
                chart={`graph LR
    Start[Start Episode] --> End[Terminal State]
    End --> |Calculate Return G| Update[Update State Values]
    Update --> |Average Returns| Estimate[V(s) or Q(s,a)]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="The Experience Average"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "The Sampling Engine Demo",
                            objectives: "Visualize how complete episode trajectories are required before calculating an average.",
                            instructions: [
                                "Open the 'MC Sampling Engine' in the Virtual Lab section.",
                                "Click 'Start'. Point out: 'The agent must reach the target (🏁) before any value update occurs.'",
                                "Watch the 'Estimated V(start)' counter. Explain: 'The estimate only changes at the end of the episode.'",
                                "Explain: 'This is the fundamental difference from Dynamic Programming or TD learning.'",
                                "Ask: 'What happens to the estimate if we increase the number of episodes?'"
                            ],
                            inputs: "Interactive MCSamplingLab component",
                            outputs: "Live-updating area chart and value counter.",
                            rubrics: ["Clarity of 'Episode completion' concept", "Correct identification of the MC update rule", "Student engagement"],
                            outcomes: "Students identify the statistical foundation of Monte Carlo estimation.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Blackjack Scorekeeper Workshop",
                            objectives: "Collaboratively calculate state values from sample episode outcomes.",
                            instructions: [
                                "Teacher draws a scenario: 'Player has 20, Dealer shows 5'.",
                                "Groups play 3 rounds with real cards (or simulator). Round 1: Win (+1), Round 2: Draw (0), Round 3: Win (+1).",
                                "Class Task: Calculate the MC estimate $V(20 \text{ vs } 5)$ manually.",
                                "Class reflects: 'Does this estimate change if we use a 0.9 discount factor?'",
                                "Conclusion: MC is just accounting for RL."
                            ],
                            inputs: "Blackjack card deck (or sim)",
                            outputs: "Manual calculation of average return",
                            rubrics: ["Arithmetic accuracy", "Correct interpretation of the result", "Classroom participation"],
                            outcomes: "Students master the core update logic of MC prediction.",
                            time: "15 Mins",
                            materials: ["Deck of cards", "Whiteboard"]
                        },
                        {
                            level: 3,
                            title: "The MC vs. DP Debate",
                            objectives: "Critically compare 'Model-Free' learning with 'Model-Based' planning.",
                            instructions: [
                                "Divide class into 2 teams: Team MC and Team DP.",
                                "Scenario: 'Solving a maze in the dark'.",
                                "Team DP: Must explain why they need a map (Transition probabilities) before they can start.",
                                "Team MC: Must explain why they can just walk and learn from the bruises (Experience).",
                                "Debate: Which team finishes faster if the maze is small? Which finishes if the maze changes every day?",
                                "Conclusion: MC is better for complex, unknown environments."
                            ],
                            inputs: "Maze solving scenario",
                            outputs: "Comparison matrix on the board",
                            rubrics: ["Understanding of 'Model-free' vs 'Model-based'", "Logical arguments", "Team coordination"],
                            outcomes: "Students develop the ability to select the right tool for specific environmental constraints.",
                            time: "20 Mins",
                            materials: ["None"]
                        },
                        {
                            level: 4,
                            title: "Trial and Error Audit",
                            objectives: "Independently identify Monte Carlo-like learning in daily skill acquisition.",
                            instructions: [
                                "Task: Choose a skill you learned through pure repetition (e.g., 'Flipping a pancake' or 'Shooting a basketball').",
                                "Audit: Did you have a 'Model' (physics equations) or did you just average your successes?",
                                "Reflection: How many 'Episodes' did it take before your internal $V(s)$ stabilized?",
                                "Analysis: Identify the 'Terminal State' of your chosen task. Why is MC better for this than learning mid-way?",
                                "Propose: A 'Reward Signal' that would have made you learn faster."
                            ],
                            inputs: "Personal skill-learning history",
                            outputs: "Individual MC Learning Report (1 page)",
                            rubrics: ["Correct use of 'Episode' and 'Terminal' terminology", "Logical link to MC theory", "Originality"],
                            outcomes: "Students demonstrate the ability to map abstract RL theory to intuitive human learning processes.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Blackjack Bot" 
                subtitle="Mastering the Casino with Samples"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Solution Architecture</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            How do you build a Blackjack bot using MC?
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Step 1: Simulation</h6>
                            <p className="text-[10px] text-slate-500">Play 1,000,000 games of Blackjack using a random policy.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Step 2: Estimation</h6>
                            <p className="text-[10px] text-slate-500">For every hand configuration, average the outcomes (Wins/Losses).</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="MC Foundations"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is Monte Carlo considered "Model-Free"?', a: 'Because it doesn\'t need to know the transition probabilities p(s\'|s,a) or the reward function. It only needs sample sequences of states, actions, and rewards.' },
                        { q: 'What is the main drawback of Monte Carlo methods?', a: 'They can only be applied to episodic tasks (tasks that eventually end). They cannot learn from continuing tasks because they must wait for the end of an episode to calculate the return.' },
                        { q: 'Compare MC and Dynamic Programming (DP) regarding state updates.', a: 'DP updates the value of a state based on the values of its neighbors (One-step lookahead). MC updates the value of a state based on the actual return from the rest of the episode.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: MC Sampling Engine" 
                subtitle="From Episodes to Estimates"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="MC Sampling Engine"
                    description="Learn from complete episodes"
                    objective="Generate episodes and observe how value estimates improve with more samples. Compare to the true values."
                    badge="Interactive Lab"
                    tips={['MC requires complete episodes — no updates until episode end',
                'High variance early on — estimates stabilize after ~50 episodes',
                'Compare First-Visit vs Every-Visit update rules']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Watch the agent complete full trajectories before any learning occurs. This is the defining characteristic of Monte Carlo: **learning from experience averages**.
                    </p>
                    <MCSamplingLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => { const d = getTopicData('unit4', 'Topic10_MCIntro'); if (!d) return null; return <FeedbackMCQ questions={d.mcqs} />; })()}
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                    {/* RECAP */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Topic Recap</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic10_MCIntro'); if (!d) return null; return (
                            <ol className="text-left space-y-2 text-sm">{d.recap.map((p,i) => <li key={i} className="flex gap-2"><span className="font-bold">{i+1}.</span>{p}</li>)}</ol>
                        ); })()}
                    </div>
                    {/* SKILL MAPPING */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Skill Mapping</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic10_MCIntro'); if (!d) return null; return (
                            <div className="grid gap-2">{d.skillMapping.map((s,i) => (
                                <div key={i} className="flex justify-between bg-white/10 rounded-xl p-3 text-sm">
                                    <span>{s.skill}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${s.level === 'Beginner' ? 'bg-green-500/20 text-green-200' : s.level === 'Intermediate' ? 'bg-amber-500/20 text-amber-200' : 'bg-red-500/20 text-red-200'}`}>{s.level}</span>
                                </div>
                            ))}</div>
                        ); })()}
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
