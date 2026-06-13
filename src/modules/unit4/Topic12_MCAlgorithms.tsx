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
import MCAlgoComparisonLab from '../../components/labs/MCAlgoComparisonLab';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    GitBranch,
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
    Target,
    Briefcase,
    Clock,
    Shield,
    Move,
    MousePointer2,
    User,
    Layout,
    Map,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "M C Algorithms Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "M C Algorithms Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the M C Algorithms simulator.",
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
    "🤖 [System] Initializing M C Algorithms Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"M C Algorithms\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic12_MCAlgorithms() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic12_mcalgorithms" />

            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => { const d = getTopicData('unit4', 'Topic12_MCAlgorithms'); if (!d) return null; return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{d.prerequisites.map((p,i) => <li key={i}>{p}</li>)}</ul>); })()}
                </div>
            </SectionWrapper>
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Accountant's Choice" 
                subtitle="First-Visit vs. Every-Visit"
                icon={<GitBranch className="text-blue-600" size={24} />}
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
                                "The algorithm for the patient agent: 'I'll just wait until I reach the end to see if my life choices were optimal.'"
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Layers size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            📊 To Count or Not to Count?
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Suppose you are learning to navigate a park. You walk in a circle and pass the same fountain three times before leaving. At the end of the day, you found 10 coins.
                            </p>
                            <p>
                                **First-Visit MC** says: "The fountain was the start of the journey that led to 10 coins. I'll record that." It ignores the second and third times you passed the fountain.
                            </p>
                            <p>
                                **Every-Visit MC** says: "Every time I was at the fountain, I was on a path that eventually resulted in coins. I'll record all three instances."
                            </p>
                            <p>
                                Which one is better? Both work! But they reflect different mathematical philosophies about how much we can learn from a single "loop" in experience.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Statistical Advantage">
                            Every-Visit MC provides more data points per episode, which can lead to faster learning in environments where you visit the same state often.
                        </InfoCard>
                        <InfoCard type="tip" title="Independence">
                            First-Visit MC has simpler statistical properties because each sample is technically independent within the episode.
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
                                Designing an automated valuation engine for options trading using simulated random trajectory rollouts.
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
                            Master the mathematical implementation of Monte Carlo prediction to accurately estimate value functions from raw data.
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
                                    Highly robust and guaranteed to converge asymptotically to true values via the Law of Large Numbers.
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
                                    Extreme sample requirements; requires thousands of complete episode rollouts to achieve low variance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Modelling the Algorithms" 
                subtitle="The Logic of Averaging"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="font-black text-[10px] text-primary-500 uppercase tracking-widest">First-Visit Rule</h5>
                            <MathBlock 
                                formula="N(s) \leftarrow N(s) + 1 \text{ if } t = \min\{k : S_k = s\}"
                                label="Initialization Check"
                                explanation="Only update N(s) if this is the first time state s appears in the episode."
                                interpretation="If we have seen S1 before in this sequence, we skip the math for this step. We only care about the very first time the agent entered S1."
                                motivation="Ensures each update is based on a 'fresh' look at the return from that state."
                                terms={[]}
                            />
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-black text-[10px] text-emerald-500 uppercase tracking-widest">Every-Visit Rule</h5>
                            <MathBlock 
                                formula="N(S_t) \leftarrow N(S_t) + 1 \quad \forall t"
                                label="Universal Update"
                                explanation="Update N(s) for every single time step where the state was s."
                                interpretation="No checks needed. If you are in S1, you update S1. Simple, aggressive, and data-efficient."
                                motivation="Maximizes the amount of learning done from every second of experience."
                                terms={[]}
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Convergence Reality</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            As the number of episodes $k \to \infty$, both methods are guaranteed to converge to $v_\pi(s)$. In modern deep RL, variations of Every-Visit are the most common.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="M C Algorithms Architecture"
                description="First-visit vs Every-visit Monte Carlo."
                chart={`graph TD
    State[State S visited]
    State --> Check{First visit in episode?}
    Check -- Yes --> First[First-Visit MC Update]
    Check -- No --> Every[Every-Visit MC Update]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="The Accountant's Choice"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Algorithm Auditor Demo",
                            objectives: "Differentiate between First-Visit and Every-Visit counting in a looping trajectory.",
                            instructions: [
                                "Open the 'MC Algorithm Auditor' in the Virtual Lab section.",
                                "Select 'First-Visit' and Step Forward. Point out: 'The second time we enter S1, it says Ignored.'",
                                "Select 'Every-Visit' and Step Forward. Show how all S1 entries are 'Counted'.",
                                "Explain: 'First-Visit treats each episode as one data point for a state. Every-Visit treats every visit as one.'",
                                "Ask: 'Which method uses more of the agent's memory?'"
                            ],
                            inputs: "Interactive MCAlgoComparisonLab component",
                            outputs: "Visual highlight shift and visit count tracking.",
                            rubrics: ["Clarity of 'First' vs 'Every' counting logic", "Identification of the Accounting panel differences", "Student engagement"],
                            outcomes: "Students identify the core algorithmic trade-offs in MC state updates.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Loop Auditor Workshop",
                            objectives: "Collaboratively calculate visit counts for complex state sequences.",
                            instructions: [
                                "Teacher draws a path on the board: $S_0 \to S_1 \to S_2 \to S_1 \to S_3 \to S_1 \to \text{Goal}$.",
                                "Class Task: Calculate $N(S_1)$ for First-Visit and Every-Visit.",
                                "Group Task: If the reward at the Goal is +100, calculate the total sum of returns added to $V(S_1)$ for both methods.",
                                "Class reflects: 'Does Every-Visit bias the value because it adds the same +100 three times?'",
                                "Conclusion: Both converge to the same value, but via different paths."
                            ],
                            inputs: "State sequence strings",
                            outputs: "Manual N(s) and Sum(G) calculations",
                            rubrics: ["Arithmetic accuracy", "Correct logic for ignoring subsequent visits", "Classroom participation"],
                            outcomes: "Students master the numerical implementation of both algorithms.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Data Efficiency Debate",
                            objectives: "Experience the trade-off between statistical purity and sample speed.",
                            instructions: [
                                "Divide class into 2 teams: Team Purity (First-Visit) and Team Speed (Every-Visit).",
                                "Scenario: 'A robot learning to fold clothes'. It often repeats the same motion (state) within one episode.",
                                "Team Purity: Argue why counting only the first visit prevents 'over-weighting' a single episode.",
                                "Team Speed: Argue why ignoring 90% of your experience is a waste of expensive robot time.",
                                "Output: A 'Pros vs. Cons' chart for both methods.",
                                "Conclusion: 'Use Every-Visit when data is expensive; use First-Visit for theoretical simplicity.'"
                            ],
                            inputs: "Robot folding scenario",
                            outputs: "Comparison matrix",
                            rubrics: ["Understanding of 'Independence' vs 'Variance'", "Logical arguments", "Team coordination"],
                            outcomes: "Students develop a nuanced engineering perspective on algorithm selection.",
                            time: "20 Mins",
                            materials: ["None"]
                        },
                        {
                            level: 4,
                            title: "Gaming Loop Audit",
                            objectives: "Independently audit a gameplay loop to determine the best update strategy.",
                            instructions: [
                                "Task: Choose a game with frequent backtracking (e.g., 'Pac-Man' or 'Metroid').",
                                "Audit: Identify a state (location) you visit multiple times in one 'life' (episode).",
                                "Reflection: If you were an RL agent, would you learn better by counting every pass or just the first?",
                                "Analysis: If you use Every-Visit in Pac-Man, does the 'Power Pellet' reward get over-counted? Why or why not?",
                                "Propose: The best MC method for your chosen game."
                            ],
                            inputs: "Personal gaming experience",
                            outputs: "Individual Algorithm Suitability Report (1 page)",
                            rubrics: ["Correct use of 'Independence' and 'Efficiency' terms", "Logical game-loop analysis", "Originality"],
                            outcomes: "Students demonstrate the ability to map algorithmic choices to complex environmental dynamics.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Gridworld Scientist" 
                subtitle="Comparing Algorithm Convergence"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Efficiency Duel</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are tasked with comparing First-Visit and Every-Visit MC in a windy gridworld. Because the wind blows the agent back frequently, it visits the same states many times. Your project is to plot the **Root Mean Square Error (RMSE)** of both methods over 1,000 episodes to see which one reaches the true value faster.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Clock size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Data</div>
                            <p className="text-[8px] mt-1">Episode Trajectories</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Binary size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Compute</div>
                            <p className="text-[8px] mt-1">Incremental Averaging</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Activity size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Analysis</div>
                            <p className="text-[8px] mt-1">Convergence Curve</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Algorithmic Mastery"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Explain the difference between First-Visit and Every-Visit MC.', a: 'First-Visit MC only uses the first occurrence of a state in an episode to update its value estimate; Every-Visit MC uses every occurrence of the state in that episode.' },
                        { q: 'Which method is more data-efficient?', a: 'Every-Visit MC is generally more data-efficient because it extracts multiple value samples from a single episode if states are revisited.' },
                        { q: 'Do both methods converge to the same value?', a: 'Yes, both methods are statistically guaranteed to converge to the true value function as the number of episodes approaches infinity.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: MC Algorithm Auditor" 
                subtitle="The Accountant's Choice"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="First-Visit vs Every-Visit Lab"
                    description="Compare MC estimation methods"
                    objective="Run both First-Visit and Every-Visit MC on the same MRP. Compare the resulting value estimates."
                    badge="Interactive Lab"
                    tips={['Both converge to V(s) asymptotically',
                'Every-Visit uses more data but has correlated samples']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between **First-Visit** and **Every-Visit** to see how the "Accounting" changes when an agent visits the same state multiple times in one episode.
                    </p>
                    <MCAlgoComparisonLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => { const d = getTopicData('unit4', 'Topic12_MCAlgorithms'); if (!d) return null; return <FeedbackMCQ questions={d.mcqs} />; })()}
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                    {/* RECAP */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Topic Recap</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic12_MCAlgorithms'); if (!d) return null; return (
                            <ol className="text-left space-y-2 text-sm">{d.recap.map((p,i) => <li key={i} className="flex gap-2"><span className="font-bold">{i+1}.</span>{p}</li>)}</ol>
                        ); })()}
                    </div>
                    {/* SKILL MAPPING */}
                    <div className="max-w-xl mx-auto mb-6">
                        <h4 className="text-xl font-bold mb-3">Skill Mapping</h4>
                        {(() => { const d = getTopicData('unit4', 'Topic12_MCAlgorithms'); if (!d) return null; return (
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
                        NEXT: MC PREDICTION
                    </button>
                </div>
            </div>
        </div>
    );
}
