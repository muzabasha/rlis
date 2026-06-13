import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock,
    SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import MCPredictionLab from '../../components/labs/MCPredictionLab';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Target,
    Bot,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    Search,
    Brain,
    Globe,
    Rocket,
    Activity,
    Cpu,
    HardDrive,
    Briefcase,
    Shield,
    Move,
    MousePointer2,
    User,
    Layout,
    Map,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "M C Prediction Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "M C Prediction Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the M C Prediction simulator.",
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
    "🤖 [System] Initializing M C Prediction Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"M C Prediction\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic13_MCPrediction() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic13_mcprediction" />

            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => { const d = getTopicData('unit4', 'Topic13_MCPrediction'); if (!d) return null; return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{d.prerequisites.map((p,i) => <li key={i}>{p}</li>)}</ul>); })()}
                </div>
            </SectionWrapper>
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Auditor's Question" 
                subtitle="How Good is My Plan?"
                icon={<Target className="text-blue-600" size={24} />}
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
                                "Predicting the value of a state by just playing it out a thousand times. The ultimate 'let's see what happens' approach."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Search size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🔎 Reviewing the Strategy
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In RL, **Prediction** doesn't mean telling the future. It means evaluating a specific fixed policy. It's the agent's way of asking: "If I keep doing exactly what I'm doing, how much reward should I expect to get from here?"
                            </p>
                            <p>
                                Imagine you have a rule: "Always turn left at a junction." To predict the value of this rule, you just walk through the city 100 times, always turning left, and see how much money you find.
                            </p>
                            <p>
                                You aren't trying to find the *best* way yet; you're just measuring the *current* way. Prediction is the foundation upon which Control (finding the best way) is built.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Prediction vs. Control">
                            Prediction = Policy Evaluation (Finding V). Control = Policy Improvement (Finding the best π).
                        </InfoCard>
                        <InfoCard type="tip" title="Stationary Policy">
                            In MC Prediction, the policy $\pi$ must remain the same throughout the entire simulation for the average to be meaningful.
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
                                Correctly processing state value updates when an agent visits the exact same crossroad multiple times in a single exploration episode.
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
                            Critical to distinguish between First-Visit and Every-Visit MC to avoid mathematical estimation errors and bias.
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
                                    First-Visit MC is mathematically simple and unbiased; Every-Visit MC utilizes data more fully.
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
                                    Every-Visit MC estimates are highly correlated, which complicates analytical convergence proofs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Modelling the Update" 
                subtitle="Learning One Sample at a Time"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="V(s) \leftarrow V(s) + \frac{1}{N(s)} [G - V(s)]"
                        label="Incremental MC Update"
                        explanation="Updating the average value without storing every past return."
                        interpretation="The term [G - V(s)] is the 'Prediction Error'. We move the current estimate V(s) toward the actual return G by a small step size (1/N)."
                        motivation="This allows an agent to learn on-the-fly. It doesn't need a huge database of episodes; it just needs to remember the current average and the count."
                        terms={[
                            { term: 'G', name: 'Actual Return', meaning: 'The total reward seen in the current episode.', range: '\mathbb{R}', example: 'G = 10.' },
                            { term: 'V(s)', name: 'Estimated Value', meaning: 'The agent\'s current prediction of the reward.', range: '\mathbb{R}', example: 'V(s) = 8.' },
                            { term: '[G - V(s)]', name: 'Error', meaning: 'The difference between reality and prediction.', range: '\mathbb{R}', example: 'Error = +2 (I did better than expected!).' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Constant Alpha Update</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            In changing environments, we often replace $1/N(s)$ with a constant $\alpha$. This makes the agent "forget" old experience and prioritize recent samples.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="M C Prediction Architecture"
                description="Estimating Value Functions using MC."
                chart={`graph TD
    Generate[Generate episodes using Policy]
    Generate --> Sum[Sum returns for each state G(s)]
    Sum --> Count[Count visits N(s)]
    Count --> Divide[V(s) = G(s)/N(s)]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="The Policy Evaluator"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Policy Value Demo",
                            objectives: "Observe how different fixed policies result in different converged state values.",
                            instructions: [
                                "Open the 'Value Explorer' in the Virtual Lab section.",
                                "Select 'Safe Policy'. Click 'Generate Episode' 10 times. Note the stable value (~5.0).",
                                "Select 'Risky Policy'. Click 'Generate' 10 times. Point out the wild swings between 0 and 20.",
                                "Explain: 'Prediction isn't about finding the best path; it's about auditing the CURRENT path.'",
                                "Ask: 'Which policy has higher variance? Which converges faster?'"
                            ],
                            inputs: "Interactive PredictionLab component",
                            outputs: "Live-updating V(s) estimate and sample counter.",
                            rubrics: ["Clarity of 'Prediction' vs 'Control' distinction", "Correct interpretation of variance", "Student engagement"],
                            outcomes: "Students identify why evaluation is necessary before improvement.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Incremental Auditor Workshop",
                            objectives: "Collaboratively perform the running average update without storing history.",
                            instructions: [
                                "Teacher sets the scene: 'Your current prediction V(s) is 100. You just finished your 5th episode ($N=5$) and got a Return $G=150$.'",
                                "Class Task: Use the incremental formula $V \leftarrow V + \frac{1}{N}[G - V]$ to find the new estimate.",
                                "Guided Design: 'What happens if the next G is only 50? Does the value drop faster or slower than before?'",
                                "Class reflects: 'Why do we use $1/N$ instead of just dividing by the total?'",
                                "Conclusion: Incremental updates save memory and represent the 'learning step'."
                            ],
                            inputs: "Numerical RL scenarios",
                            outputs: "Manual V(s) updates on the board",
                            rubrics: ["Mathematical accuracy", "Understanding of the 'Error' term [G-V]", "Classroom participation"],
                            outcomes: "Students master the core update mechanism used in production RL systems.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Fixed Policy Challenge",
                            objectives: "Experience the constraints of evaluating a strategy without changing it.",
                            instructions: [
                                "Divide class into 4 teams. Assign each a fixed policy: {Always Aggressive, Always Defensive, 50/50 Random, Copycat}.",
                                "Scenario: 'Playing a simplified game of Rock-Paper-Scissors against a bot'.",
                                "Group Task: Play 10 rounds using ONLY your assigned policy. Record the Return (G) for each.",
                                "Output: Calculate the MC Prediction for your team's policy. Compare with other teams.",
                                "Conclusion: 'Before we can change the strategy, we must know the exact value of the current one.'"
                            ],
                            inputs: "Fixed strategy definitions",
                            outputs: "Policy Evaluation posters",
                            rubrics: ["Strict adherence to the fixed policy", "Accurate data collection", "Team coordination"],
                            outcomes: "Students develop the discipline required for scientific policy evaluation.",
                            time: "20 Mins",
                            materials: ["Rock-Paper-Scissors cards", "Chart paper"]
                        },
                        {
                            level: 4,
                            title: "Habit Evaluation Audit",
                            objectives: "Independently audit a personal habit as a fixed policy evaluation task.",
                            instructions: [
                                "Task: Choose a daily habit (e.g., 'Checking social media first thing in the morning' or 'Taking a specific route to work').",
                                "Audit: Define your 'Reward' (e.g., happiness, time saved, or focus).",
                                "Reflection: Based on the last 5 days (episodes), what is your predicted 'Value' for this habit?",
                                "Analysis: If you changed your policy tomorrow, would your current MC Prediction still be valid? Why or why not?",
                                "Propose: A 'Target Value' you want to reach by the end of the month."
                            ],
                            inputs: "Personal daily habits",
                            outputs: "Individual Policy Audit Report (1 page)",
                            rubrics: ["Correct use of 'Policy' and 'Reward' terms", "Logical value estimation", "Originality"],
                            outcomes: "Students demonstrate the ability to apply RL prediction theory to improve personal decision-making.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Weather Predictor" 
                subtitle="Predicting Cycles from Experience"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Forecasting Success</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building an AI that predicts the "Value" (Comfort level) of a specific air conditioning policy. The policy is: "Always set to 22°C." Your project is to run 30-day simulations (Episodes) and use **MC Prediction** to find the expected comfort level for different house architectures (States).
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Layers size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Input</div>
                            <p className="text-[8px] mt-1">30-day History</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Activity size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Metric</div>
                            <p className="text-[8px] mt-1">Comfort Score Sum</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <ArrowRight size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Output</div>
                            <p className="text-[8px] mt-1">Mean Prediction</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Prediction Proficiency"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the goal of "MC Prediction"?', a: 'To estimate the state-value function v(s) or action-value function q(s,a) for a given fixed policy π based on sample experience.' },
                        { q: 'How does MC Prediction handle uncertainty in the environment?', a: 'By averaging the returns from many different episodes, the random variations in environment transitions cancel out, leaving the true expected value.' },
                        { q: 'Why do we use an incremental update formula?', a: 'To save memory and computation time; it allows us to update our estimate using only the current return and the previous average, without re-calculating the sum of all past returns.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: MC Policy Predictor" 
                subtitle="Convergence under Policy"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Value Convergence Tracker"
                    description="Watch V(s) converge episode by episode"
                    objective="Track the estimate of V(s) for a specific state across episodes. Observe the Law of Large Numbers in action."
                    badge="Interactive Lab"
                    tips={['Convergence is noisy but guaranteed',
                'Increase the number of episodes to reduce variance',
                'Compare estimates with the true value computed by Dynamic Programming']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select a policy and generate episode samples to see how the predicted value $V(s)$ changes. Notice how **Risky** policies cause higher variance in the short term but eventually settle.
                    </p>
                    <MCPredictionLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => { const d = getTopicData('unit4', 'Topic13_MCPrediction'); if (!d) return null; return <FeedbackMCQ questions={d.mcqs} />; })()}
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                    {/* RECAP */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Topic Recap</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic13_MCPrediction'); if (!d) return null; return (
                            <ol className="text-left space-y-2 text-sm">{d.recap.map((p,i) => <li key={i} className="flex gap-2"><span className="font-bold">{i+1}.</span>{p}</li>)}</ol>
                        ); })()}
                    </div>
                    {/* SKILL MAPPING */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Skill Mapping</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic13_MCPrediction'); if (!d) return null; return (
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
                        NEXT: MC CONTROL
                    </button>
                </div>
            </div>
        </div>
    );
}
