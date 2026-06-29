import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock,
    SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    TrendingUp,
    ShieldCheck,
    Zap,
    Target,
    Brain,
    Clock,
    Briefcase,
    ShieldAlert,
    Users2,
    Layout,
    CheckCircle2,
    AlertCircle,
    Rocket,
    Gauge,
    Sparkles,
    AlertTriangle
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, Legend
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { DiscountCurveVis, AdvantageVis } from '../../components/visualizers';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Advantages Of R L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Advantages Of R L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Advantages Of R L simulator.",
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
    "🤖 [System] Initializing Advantages Of R L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Advantages Of R L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 10 ─────────────────────────────────────

/**
 * Interactive Benefit Comparison Chart
 */
function BenefitComparisonChart() {
    const data = [
        { name: 'Adaptability', RL: 95, Classical: 40 },
        { name: 'Complexity', RL: 90, Classical: 30 },
        { name: 'Discovery', RL: 85, Classical: 10 },
        { name: 'Robustness', RL: 80, Classical: 60 },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <TrendingUp size={18} className="text-primary-500" />
                    RL vs Classical Control
                </h4>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-primary-500"><div className="w-2 h-2 bg-primary-500 rounded-full" /> RL</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 bg-slate-400 rounded-full" /> Classical</span>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="RL" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Classical" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                    <span className="text-[10px] font-bold text-blue-600 block mb-1">RL Power</span>
                    <p className="text-[10px] text-slate-500 leading-tight">Can discover strategies humans haven't thought of.</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/20 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">Classical Limit</span>
                    <p className="text-[10px] text-slate-500 leading-tight">Limited by the mathematical model provided by the engineer.</p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic10_AdvantagesOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic10_advantagesofrl" />
            {/* SECTION 0: PREREQUISITES */}
            <SectionWrapper
                id="prerequisites"
                title="0. Prerequisites"
                subtitle="What you should know before starting"
                icon={<BookOpen className="text-sky-600" size={24} />}
                badge="Prerequisites"
                badgeColor="bg-sky-100 text-sky-700"
                accentColor="border-sky-500"
            >
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit1', 'Topic10_AdvantagesOfRL');
                        if (!data) return <p className="text-sm text-slate-500">No prerequisites listed.</p>;
                        return (
                            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                {data.prerequisites.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        );
                    })()}
                </div>
            </SectionWrapper>

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. The Self-Tuning Thermostat"
                subtitle="The Advantage of Autonomy"
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
                                "Advantage: it learns by itself! Disadvantage: it might learn to pause the game so it never loses."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Gauge size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌡️ The Smart Building Mystery
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a massive server room. Traditional engineers use a fixed rule: "If temperature &gt; 22°C, turn on AC."
                            </p>
                            <p>
                                But a Reinforcement Learning agent discovers something else. It learns that if it cools the room <em>pre-emptively</em> at 2 AM when electricity is cheap, it can save 40% on bills while keeping the servers safe.
                            </p>
                            <p>
                                <strong>The Advantage?</strong> The RL agent didn't wait for instructions. It analyzed the cost (Reward), the time (State), and found a strategy no human had scripted.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Beyond Scripting">
                            RL excels when the solution is too complex to write as a set of "If-Then" rules.
                        </InfoCard>
                        <InfoCard type="tip" title="Discovery Machine">
                            RL is a discovery engine—it finds the "How" when we only know the "What" (Goal).
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL GAIN */}
            
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
                                A server farm cooling system must find optimal settings. Traditional hand-crafted rules cannot adapt to seasonal shifts or hardware aging, but RL thrives under these changes.
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
                            Helps articulate why and when RL should be chosen over classic control theory or traditional software.
                        </p>
                    </div>

                    {/* ADVANTAGES & DISADVANTAGES */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-emerald-900 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">
                                    Advantages
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Unprecedented adaptability; solves problems where human expertise or analytical solutions do not exist.
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
                                    Very high compute requirements and unpredictable training behaviors.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

<SectionWrapper
                id="math"
                title="3. The Optimization Edge"
                subtitle="Why RL Wins the Math Battle"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\\pi^* = \\arg\\max_{\\pi}\\;\\mathbb{E}_\\pi\\!\\left[\\sum_{t=0}^{\\infty}\\gamma^t R_{t+1}\\;\\middle|\\;S_0=s_0\\right]"
                        label="RL's Core Advantage — Global Long-Term Optimisation"
                        accent="blue"
                        explanation="Searching for the policy mapping states to actions that yields the highest expected discounted return."
                        interpretation="The central optimization problem in RL: finding a policy \\pi^* that maximizes the expected sum of discounted future rewards, starting from an initial state s_0."
                        motivation="Formalizes why RL can discover novel behaviors without explicit human instructions or correct labels."
                        terms={[
                            { term: '\\pi^*', name: 'Optimal Policy', meaning: 'The best possible action-selection policy.', range: 'Policy Space', example: 'Optimal navigation path.' },
                            { term: '\\arg\\max_\\pi', name: 'Argmax Policy', meaning: 'Identifies the policy maximizing the expectation argument.', range: 'Operator', example: 'Extracting the optimal policy.' },
                            { term: '\\mathbb{E}_\\pi', name: 'Expectation', meaning: 'Expected value over environmental transitions.', range: 'Operator', example: 'Average trajectory return.' },
                            { term: '\\gamma', name: 'Discount Factor', meaning: 'Determines the present value of future rewards.', range: '[0, 1)', example: '0.99' },
                            { term: 'R_{t+1}', name: 'Reward', meaning: 'Immediate scalar feedback from the environment.', range: '\\mathbb{R}', example: '+10 reward.' }
                        ]}
                        numericalExample={{
                            setup: 'Comparing expected returns starting from cell $S_0 = A$. Policy 1 gives return of 90; Policy 2 gives 98.',
                            steps: [
                                '$\\text{Expected Return}(\\pi_1) = 90$',
                                '$\\text{Expected Return}(\\pi_2) = 98$',
                                'Comparing values: $98 > 90$'
                            ],
                            result: '$\\pi^* = \\pi_2$'
                        }}
                    />

                    <AdvantageVis />

                    

                    <DiscountCurveVis />

                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Advantages Of R L Architecture"
                description="Why RL excels in dynamic environments."
                chart={`graph TD
    RL[RL Strengths] --> A[No Labels Required]
    RL --> B[Handles Sequential Data]
    RL --> C[Discovers Novel Solutions]
    RL --> D[Adapts to Changing Environments]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="The Power of Autonomy"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Efficiency Benchmarking Demo",
                            objectives: "Demonstrate how RL agents find superior strategies compared to fixed classical rules.",
                            instructions: [
                                "Open the 'RL vs Classical Control' chart in the Virtual Lab section.",
                                "Compare 'Discovery' score: Point out why RL is 85% while Classical is 10%.",
                                "Explain that Classical systems can't 'discover'—they only follow what the engineer knew.",
                                "Highlight the 'Adaptability' bar and explain how RL handles sensor noise better than fixed PID loops."
                            ],
                            inputs: "Interactive Benefit Comparison Chart",
                            outputs: "Comparative performance bars for Adaptability, Complexity, and Discovery.",
                            rubrics: ["Clarity of comparison", "Explanation of 'Scripting' limits", "Student engagement"],
                            outcomes: "Students observe the objective superiority of RL in high-complexity discovery tasks.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Strategy Decoder Workshop",
                            objectives: "Collaboratively identify which specific RL advantage applies to famous AI milestones.",
                            instructions: [
                                "Teacher presents 3 cases: AlphaGo's 'Move 37', OpenAI Five playing DOTA 2, and Tesla Autopilot.",
                                "Class classifies each into: Novel Strategy, Adaptability, or Scalability.",
                                "Guided Discussion: 'Why was Move 37 considered a novel strategy?' (It was a move no human pro had ever made).",
                                "Discussion: 'How does Autopilot show Adaptability?' (Handling rain/construction)."
                            ],
                            inputs: "Brief case studies of AI successes",
                            outputs: "Categorized Advantage Table on the whiteboard",
                            rubrics: ["Conceptual accuracy", "Logical reasoning", "Classroom participation"],
                            outcomes: "Students master the taxonomy of RL benefits in real-world engineering.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Smart Grid Architect",
                            objectives: "Experience the advantage of RL in solving multi-objective optimization problems.",
                            instructions: [
                                "Divide class into 4 groups: The Profit Maximizers, The Carbon Reducers, The Battery Preservers, The RL Integration Team.",
                                "Scenario: Managing a city's solar grid. Groups 1-3 propose a fixed rule (e.g., 'Sell all power at noon').",
                                "The RL Team must explain how an RL agent would balance ALL THREE objectives simultaneously by looking at long-term battery health vs immediate profit.",
                                "Compare the 'Fixed Rules' vs the 'RL Policy'. Who wins in a year-long simulation?"
                            ],
                            inputs: "Energy grid constraints (Price, Sunlight, Battery life)",
                            outputs: "Proposed 'Rule-Based' vs 'RL-Based' management plans",
                            rubrics: ["Multi-objective balancing", "Innovation", "Team coordination"],
                            outcomes: "Students internalize the 'Delayed Gratification' advantage of RL (saving battery for later).",
                            time: "20 Mins",
                            materials: ["Planning sheets", "Post-its"]
                        },
                        {
                            level: 4,
                            title: "Life-Advantage Audit",
                            objectives: "Independently identify an RL-style advantage in a personal skill acquisition process.",
                            instructions: [
                                "Task: Think of a skill you learned where 'Rules' weren't enough (e.g., Riding a bike, Playing an instrument, or a Video Game).",
                                "Write 3 sentences: 1. Why couldn't a book teach you the exact 'Rule' to win? 2. What 'Novel Strategy' did you discover through trial and error? 3. How did you 'Adapt' to a changing situation?",
                                "Self-Evaluation: Is your brain's 'RL Engine' more focused on short-term fun or long-term mastery?"
                            ],
                            inputs: "Personal memories of learning",
                            outputs: "Personal 'Human RL' Audit Report",
                            rubrics: ["Depth of reflection", "Application of RL terminology", "Originality"],
                            outcomes: "Students bridge the gap between abstract machine learning theory and their own cognitive advantages.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: The Green Grid"
                subtitle="Optimizing Sustainable Energy"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Rocket size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Design an RL agent to manage a city's energy grid. It must decide when to store energy from solar panels and when to sell it to the grid to maximize profit and minimize carbon footprint.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Advantages to Highlight</h6>
                            <ul className="text-[10px] space-y-1 list-disc pl-4 text-slate-500">
                                <li>Handles fluctuating weather (Uncertainty).</li>
                                <li>Balances long-term battery life vs short-term profit.</li>
                                <li>Scales to thousands of homes.</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Success Metric</h6>
                            <div className="text-2xl font-black text-slate-800 dark:text-white">30% CO2 Reduction</div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Examination Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is RL better than rule-based systems for robotics?', a: 'Because real-world environments are too complex to script every possible situation. RL allows the robot to learn and adapt to noise and physical changes.' },
                        { q: 'Explain the "Self-Improving" nature of RL.', a: 'As the agent interacts more, its experience grows, allowing it to refine its policy and achieve better rewards over time without human intervention.' },
                        { q: 'What is the role of "Delayed Gratification" in RL?', a: 'RL agents are designed to sacrifice small immediate rewards if it leads to a much larger cumulative reward in the long run.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: The Advantage Sandbox"
                subtitle="Quantifying RL Superiority"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="RL Advantage Demonstrator"
                    description="Show RL superiority in dynamic tasks"
                    objective="Run RL vs rule-based agent on a changing environment. Watch RL adapt while the rule-based system fails."
                    badge="Interactive Lab"
                    tips={['Change the environment mid-run to see RL adapt',
                'Rule-based agents cannot handle environment shifts']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Interact with the comparison chart to see how RL outperforms classical methods as the environment complexity increases.
                    </p>
                    <BenefitComparisonChart />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper
                id="mcq"
                title="8. Knowledge Check"
                subtitle="10 Feedback-Based MCQs"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="MCQ Quiz"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                {(() => {
                    const data = getTopicData('unit1', 'Topic10_AdvantagesOfRL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic10_AdvantagesOfRL');
                if (!data) return null;
                return (
                    <div className="space-y-6">
                        {/* Recap Section */}
                        <SectionWrapper
                            id="recap"
                            title="9. Topic Recap"
                            subtitle="Key points to remember"
                            icon={<BookOpen className="text-emerald-600" size={24} />}
                            badge="Recap"
                            badgeColor="bg-emerald-100 text-emerald-700"
                            accentColor="border-emerald-500"
                        >
                            <ul className="space-y-2">
                                {data.recap.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </SectionWrapper>

                        {/* Skill Mapping Section */}
                        <SectionWrapper
                            id="skills"
                            title="10. Skill Mapping"
                            subtitle="Competencies developed"
                            icon={<Target className="text-indigo-600" size={24} />}
                            badge="Skills"
                            badgeColor="bg-indigo-100 text-indigo-700"
                            accentColor="border-indigo-500"
                        >
                            <div className="grid gap-3">
                                {data.skillMapping.map((skill, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.skill}</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                            skill.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            skill.level === 'Intermediate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>

                        {/* Original Mastered navigation */}
                        <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Advantages: Decoded!</h3>
                                <p className="text-primary-100">
                                    You've seen why RL is the future of intelligent systems. Ready to see where it's being used today?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: APPLICATIONS
                                </button>
                                <button className="px-10 py-4 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                                    REVIEW ADVANTAGES
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

