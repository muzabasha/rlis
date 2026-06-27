import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import React, { useState, useEffect } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock,
    SymbolTable } from '../../components/topic/MathBlock';
import { SoftmaxVis, DiscountCurveVis, ValueDistributionVis, BellmanConvergenceVis, TransitionProbVis } from '../../components/visualizers';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Box,
    GitMerge,
    ChefHat,
    Star,
    AlertCircle,
    TrendingUp,
    Zap,
    Target,
    Clock,
    Briefcase,
    ShieldAlert,
    Users2,
    Layout,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell,
    BarChart, Bar, Legend
} from 'recharts';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Elements Of R L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Elements Of R L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Elements Of R L simulator.",
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
    "🤖 [System] Initializing Elements Of R L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Elements Of R L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 4 ──────────────────────────────────────

/**
 * Interactive Slider for Discount Factor (Gamma)
 */
function GammaExplorer() {
    const [gamma, setGamma] = useState(0.9);
    const rewards = [1, 2, 5, 10, 20]; // Future rewards

    const calculateDiscountedReturn = (g: number) => {
        return rewards.reduce((acc, r, i) => acc + r * Math.pow(g, i), 0).toFixed(2);
    };

    const chartData = rewards.map((r, i) => ({
        step: `T+${i + 1}`,
        raw: r,
        discounted: parseFloat((r * Math.pow(gamma, i)).toFixed(2))
    }));

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <TrendingUp size={18} className="text-primary-500" />
                    The Visionary Agent: Exploring γ (Gamma)
                </h4>
                <div className="px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold">
                    Interactive
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Discount Factor (γ): <span className="text-primary-600 font-bold">{gamma}</span></span>
                        <span className="text-xs text-slate-400 italic">
                            {gamma === 0 ? "Myopic (Only now)" : gamma === 1 ? "Infinite (All futures equal)" : gamma < 0.5 ? "Short-sighted" : "Far-sighted"}
                        </span>
                    </div>
                    <input
                        type="range" min="0" max="1" step="0.01" value={gamma}
                        onChange={(e) => setGamma(parseFloat(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-primary-600"
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Discounted Return (Gₜ)</div>
                            <div className="text-3xl font-black text-primary-600">
                                {calculateDiscountedReturn(gamma)}
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Watch how the <span className="text-primary-600 font-bold">Total Return</span> changes as you adjust gamma. High gamma makes the agent value distant future rewards more.
                        </p>
                    </div>

                    <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="step" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="discounted" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Value to Agent" />
                                <Bar dataKey="raw" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Raw Reward" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Virtual Lab: Element Organ Simulator
 */
function ElementLab() {
    const [activeElements, setActiveElements] = useState({
        policy: true,
        reward: true,
        value: true,
        model: true
    });

    const [performance, setPerformance] = useState(100);
    const [logs, setLogs] = useState<string[]>(["System initialized. All organs active."]);

    const toggleElement = (el: keyof typeof activeElements) => {
        const newState = { ...activeElements, [el]: !activeElements[el] };
        setActiveElements(newState);

        let p = 100;
        if (!newState.policy) p -= 60;
        if (!newState.reward) p -= 30;
        if (!newState.value) p -= 15;
        if (!newState.model) p -= 10;
        setPerformance(Math.max(0, p));

        const messages = {
            policy: newState.policy ? "Policy restored. Agent knows how to act." : "CRITICAL: Policy lost! Agent is acting randomly.",
            reward: newState.reward ? "Reward signal active. Agent can feel pain/pleasure." : "WARNING: Reward signal cut. Agent is 'blind' to goals.",
            value: newState.value ? "Value function active. Agent can plan long-term." : "INFO: Value function disabled. Agent is now short-sighted.",
            model: newState.model ? "Model active. Agent can predict environment." : "INFO: Model disabled. Agent is now model-free."
        };
        setLogs(prev => [messages[el], ...prev.slice(0, 4)]);
    };

    return (
        <div className="lab-block space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h4 className="font-bold text-lg text-slate-800 dark:text-white">Agent Organ Simulator</h4>
                    <p className="text-sm text-slate-500">Toggle the internal elements of an RL agent to see the impact on performance.</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-xs font-bold text-slate-400 uppercase px-2">Health</div>
                    <div className="w-32 h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${performance}%` }}
                            className={`h-full ${performance > 70 ? 'bg-emerald-500' : performance > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                        />
                    </div>
                    <div className="text-sm font-black w-8 text-right">{performance}%</div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(Object.keys(activeElements) as Array<keyof typeof activeElements>).map(el => (
                    <button
                        key={el}
                        onClick={() => toggleElement(el)}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${activeElements[el]
                                ? 'bg-white dark:bg-slate-800 border-primary-500 shadow-lg shadow-primary-500/10'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 opacity-60 grayscale'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeElements[el] ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'bg-slate-200 text-slate-400'}`}>
                            {el === 'policy' && <GitMerge size={20} />}
                            {el === 'reward' && <Zap size={20} />}
                            {el === 'value' && <Target size={20} />}
                            {el === 'model' && <Box size={20} />}
                        </div>
                        <div className="font-bold text-xs uppercase tracking-widest">{el}</div>
                        <div className={`text-[10px] font-bold ${activeElements[el] ? 'text-emerald-500' : 'text-red-500'}`}>
                            {activeElements[el] ? 'ACTIVE' : 'OFF'}
                        </div>
                    </button>
                ))}
            </div>

            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-emerald-400 h-32 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/50 pointer-events-none" />
                {logs.map((log, i) => (
                    <div key={i} className={i === 0 ? "animate-pulse" : "opacity-60"}>
                        {`> ${log}`}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Main Topic Component ───────────────────────────────────────────────────

export default function Topic4_ElementsOfRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit1-topic4_elementsofrl" />
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
                        const data = getTopicData('unit1', 'Topic4_ElementsOfRL');
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
                title="1. The Chaos Kitchen"
                subtitle="A Funny Analogy for RL Elements"
                icon={<ChefHat className="text-amber-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
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
                                "An agent, an environment, and a reward signal walk into a bar. The agent tries to maximise the drinks, the environment throws the agent out, and the reward is -100."
                            </p>
                        </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-800">
                        <h4 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                            👨‍🍳 Meet Boulot, the Robot Chef
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                            <p>
                                Imagine a robot named <strong>Boulot</strong> who has been hired as a chef. There's one problem: Boulot has <em>never</em> seen a kitchen before and has <em>no</em> recipes.
                            </p>
                            <p>
                                Every morning, the Head Chef (the Environment) shouts a dish name like "Tomato Soup!". Boulot has to scramble around. On Day 1, he tries boiling <strong>chocolate and pickles</strong>. The Head Chef throws a wooden spoon at him (<em>Ouch! That's a Negative Reward</em>).
                            </p>
                            <p>
                                On Day 2, he tries <strong>tomatoes and basil</strong>. The Head Chef gives him a gold star (<em>Yay! Positive Reward</em>).
                            </p>
                            <p>
                                Slowly, Boulot starts creating a mental rulebook: "If order is Soup, use Tomatoes." This is his <strong>Policy</strong>. He also starts guessing: "Even before I finish, I feel like this pot smells like a gold star." This is his <strong>Value Function</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="question" title="Reflective Question">
                            What would happen if the Head Chef only gave a reward once a week instead of every dish? How would Boulot know which specific dish was good?
                        </InfoCard>
                        <InfoCard type="insight" title="The Connection">
                            In RL, we don't give the machine a "recipe" (Supervised Data). We give it a "kitchen" and "stars" (Reward), and it must build its own "rulebook" (Policy).
                        </InfoCard>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <h5 className="font-bold text-slate-800 dark:text-white mb-4">Technical Breakdown</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { name: 'Policy', icon: '📜', desc: 'The "Recipe Book" — mapping from situation to action.' },
                                { name: 'Reward', icon: '⭐', desc: 'The "Gold Star" — immediate feedback of success.' },
                                { name: 'Value', icon: '💎', desc: 'The "Hunch" — long-term prediction of future stars.' },
                                { name: 'Model', icon: '🗺️', desc: 'The "Map" — internal simulation of the kitchen.' }
                            ].map(item => (
                                <div key={item.name} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center hover:scale-105 transition-transform">
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">{item.name}</div>
                                    <div className="text-[10px] text-slate-500 leading-tight">{item.desc}</div>
                                </div>
                            ))}
                        </div>
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
                                In an automated drone delivery system, we need to balance immediate wind feedback, the battery's value state, path policies, and weather models to ensure a safe flight.
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
                            Essential for understanding how the core sub-components (Policy, Value, Reward, Model) interact to produce coherent learning behaviors.
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
                                    Highly modular framework; allows independent tuning and debugging of policy and value components.
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
                                    High architectural complexity; failure in a single component (e.g., biased rewards) breaks the entire system's learning loop.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. Mathematical Foundations"
                subtitle="Formalizing the Internal Organs"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Words like "hunch" and "recipe" are great for stories, but computers need numbers. Here we formalise the four core elements of RL — Policy, Return, Value Function, and Model — as precise mathematical objects.
                    </p>

                    <MathBlock
                        formula="\\pi(a \\mid s) = \\Pr(A_t = a \\mid S_t = s)"
                        label="Policy — The Agent's Strategy"
                        accent="blue"
                        explanation="The policy maps states to probabilities of selecting each action."
                        interpretation="The strategy of the agent, defining the probability distribution over actions given the current state."
                        motivation="Allows modeling both deterministic choices and exploratory stochastic behaviors mathematically."
                        terms={[
                            { term: '\\pi(a \\mid s)', name: 'Policy Probability', meaning: 'The probability of selecting action a given state s.', range: '[0, 1]', example: '0.8 probability.' },
                            { term: 'A_t', name: 'Action Variable', meaning: 'The action chosen at step t.', range: 'Action Space \\mathcal{A}', example: 'Move right.' },
                            { term: 'S_t', name: 'State Variable', meaning: 'The state at step t.', range: 'State Space \\mathcal{S}', example: 'Grid cell position.' }
                        ]}
                        numericalExample={{
                            setup: 'A grid state with 4 actions where the agent has a high preference to move right.',
                            steps: [
                                '\\pi(right \\mid s) = 0.8',
                                '\\pi(left \\mid s) = 0.067',
                                '\\pi(up \\mid s) = 0.067',
                                '\\pi(down \\mid s) = 0.067'
                            ],
                            result: 'Valid probability distribution summing to 1.0.'
                        }}
                    />
                    <SoftmaxVis formula="\\pi(a \\mid s) = \\Pr(A_t = a \\mid S_t = s)" label="Policy — The Agent's Strategy" accent="blue" />

                    <MathBlock
                        formula="G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1} = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots"
                        label="Return — Total Discounted Reward"
                        accent="violet"
                        explanation="The sum of future discounted rewards starting from time step t."
                        interpretation="Measures the long-term utility of the sequence of future rewards received by the agent."
                        motivation="Essential for formulating sequential optimization goals over infinite or long time horizons."
                        terms={[
                            { term: 'G_t', name: 'Discounted Return', meaning: 'The total discounted return from step t onwards.', range: '\\mathbb{R}', example: '5.61' },
                            { term: '\\gamma', name: 'Discount Factor', meaning: 'Determines weight of future rewards relative to immediate ones.', range: '[0, 1]', example: '0.95' },
                            { term: 'R_{t+k+1}', name: 'Future Reward', meaning: 'Immediate reward received at step t+k+1.', range: '\\mathbb{R}', example: '3' }
                        ]}
                        numericalExample={{
                            setup: 'Let discount factor \\gamma = 0.95, rewards are R_{t+1} = 1, R_{t+2} = 2, R_{t+3} = 3.',
                            steps: [
                                'R_{t+1} = 1.0',
                                '\\gamma R_{t+2} = 0.95 \\times 2 = 1.9',
                                '\\gamma^2 R_{t+3} = 0.9025 \\times 3 = 2.7075'
                            ],
                            result: 'G_t = 1 + 1.9 + 2.7075 = 5.6075'
                        }}
                    />
                    <DiscountCurveVis />

                    <MathBlock
                        formula="v_\\pi(s) = \\mathbb{E}_\\pi\\!\\left[G_t \\mid S_t = s\\right] = \\mathbb{E}_\\pi\\!\\left[\\sum_{k=0}^{\\infty}\\gamma^k R_{t+k+1} \\;\\middle|\\; S_t=s\\right]"
                        label="State-Value Function — The Agent's Hunch"
                        accent="violet"
                        explanation="Expected return when starting in state s and following policy \\pi thereafter."
                        interpretation="Measures the expected long-term value or quality of a state under the current policy."
                        motivation="Allows evaluating and comparing states to guide policy improvements."
                        terms={[
                            { term: 'v_\\pi(s)', name: 'State Value', meaning: 'Expected long-term return starting from state s.', range: '\\mathbb{R}', example: '15' },
                            { term: '\\mathbb{E}_\\pi', name: 'Expected Value', meaning: 'Expected value under policy dynamics.', range: 'Operator', example: 'Weighted average of returns.' },
                            { term: 'G_t', name: 'Discounted Return', meaning: 'Discounted cumulative reward variable.', range: '\\mathbb{R}', example: 'trajectory return.' }
                        ]}
                        numericalExample={{
                            setup: 'Starting state s = A. Expected returns under policy are 10 (50% probability) or 20 (50% probability).',
                            steps: [
                                'Outcome 1: Return = 10, Prob = 0.5',
                                'Outcome 2: Return = 20, Prob = 0.5',
                                'Expected Return = 0.5 \\times 10 + 0.5 \\times 20 = 15'
                            ],
                            result: 'v_\\pi(A) = 15'
                        }}
                    />
                    <ValueDistributionVis />

                    <BellmanConvergenceVis formula="v_\\pi(s) = \\mathbb{E}_\\pi[G_t|S_t=s]" label="Value Function Overview" accent="violet" />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Elements Of R L Architecture"
                description="The fundamental tuple of Reinforcement Learning."
                chart={`graph LR
    A((Agent)) -->|Action| E[Environment]
    E -->|Reward| A
    E -->|Next State| A
    style A fill:#c7d2fe,stroke:#4f46e5
    style E fill:#e2e8f0,stroke:#64748b`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Interacting with the Core Elements"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Gamma & Element Live Demo",
                            objectives: "Demonstrate how the internal 'organs' (Policy, Reward, Value, Model) and the Discount Factor (Gamma) drive agent behavior.",
                            instructions: [
                                "Open the 'Gamma Explorer' in the Math section.",
                                "Set γ = 0 and show that the agent only values T+1 (Raw reward).",
                                "Set γ = 0.99 and show the 'Total Return' increase as future rewards are included.",
                                "Open the 'Agent Organ Simulator' in the Virtual Lab section.",
                                "Toggle the 'Policy' off and show the 60% drop in performance (Agent acts randomly).",
                                "Toggle 'Reward' off and show how the agent loses its 'Health' over time."
                            ],
                            inputs: "Interactive Gamma Slider and Organ Simulator",
                            outputs: "Performance Health Bar and Discounted Return Charts",
                            rubrics: ["Clarity of Gamma interpretation", "Demonstration of organ dependencies", "Student engagement"],
                            outcomes: "Students identify the critical role of each element and the impact of the time horizon (γ).",
                            time: "10 Mins",
                            materials: ["Interactive Components", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Smart Thermostat Workshop",
                            objectives: "Collaboratively design a full RL tuple (S, A, R) for a simple IoT device.",
                            instructions: [
                                "Scenario: A Smart Thermostat wants to save energy while keeping the user comfortable.",
                                "Teacher asks: 'What is the State?' (Current Temp, Time, Occupancy).",
                                "Teacher asks: 'What is the Action?' (Heat ON, Cool ON, IDLE).",
                                "Collaborative Reward Design: If temp is 22°C (Goal), Reward = +10. If energy used, Reward = -2.",
                                "Students calculate the Return (G) for a 3-step sequence on the board."
                            ],
                            inputs: "Thermostat scenario constraints",
                            outputs: "Drafted RL Tuple and Reward Function on the board",
                            rubrics: ["Correct state definition", "Logical reward scaling", "Team participation"],
                            outcomes: "Students learn to translate physical sensing/control into RL mathematical elements.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Blind Navigator Game",
                            objectives: "Simulate the interaction between Policy (instructions) and Reward (feedback) in a physical space.",
                            instructions: [
                                "Divide class into teams of 3: The Agent (Blindfolded), The Policy (Gives directions), The Reward (Claps).",
                                "The Agent must navigate a small obstacle course.",
                                "Challenge: The Policy can only speak *before* the move. The Reward only claps *after* the move.",
                                "Groups switch roles and discuss: 'Which was more helpful — the direction or the feedback?'"
                            ],
                            inputs: "Obstacle course in classroom",
                            outputs: "Successful navigation without hitting obstacles",
                            rubrics: ["Policy clarity", "Reward timing", "Team coordination"],
                            outcomes: "Students internalize the difference between the 'Strategy' (Policy) and the 'Feedback' (Reward).",
                            time: "20 Mins",
                            materials: ["Blindfolds", "Classroom chairs (obstacles)"]
                        },
                        {
                            level: 4,
                            title: "Personal Value Function Mapping",
                            objectives: "Independently apply RL concepts to personal goal setting and long-term planning.",
                            instructions: [
                                "Task: Think of your goal for the next 5 years (e.g., Graduating with Honors).",
                                "Define your 'Reward' (Passing an exam = +10) vs your 'Value' (The cumulative benefit of the degree).",
                                "Explain your 'Discount Factor' (γ): Do you value short-term fun (low γ) or long-term career (high γ)?",
                                "Identify one 'Model' of your environment: What do you predict will happen if you study 5 hours extra per week?"
                            ],
                            inputs: "Self-reflection on personal goals",
                            outputs: "Individual RL-Life Map (1 page)",
                            rubrics: ["Depth of insight", "Correct use of RL terminology", "Originality"],
                            outcomes: "Students develop a personal connection to abstract RL elements through self-evaluation.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Smart Warehouse Agent"
                subtitle="Applying Elements to Industry"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-8">
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="card p-4 space-y-2">
                            <h5 className="font-bold text-xs uppercase text-slate-400">Objective</h5>
                            <p className="text-sm font-semibold">Build an agent that sorts packages with zero collisions.</p>
                        </div>
                        <div className="card p-4 space-y-2">
                            <h5 className="font-bold text-xs uppercase text-slate-400">TRL Level</h5>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="w-1/3 h-full bg-indigo-500" />
                                </div>
                                <span className="text-xs font-bold">Level 3</span>
                            </div>
                        </div>
                        <div className="card p-4 space-y-2">
                            <h5 className="font-bold text-xs uppercase text-slate-400">Budget</h5>
                            <p className="text-sm font-bold text-emerald-600">$500 (Prototyping)</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Clock size={16} className="text-indigo-500" />
                            Implementation Timeline (Gantt)
                        </h5>
                        <div className="space-y-2">
                            {[
                                { task: 'Environment Setup (Unity/Gym)', duration: '2 Weeks', progress: 100 },
                                { task: 'Reward Function Design', duration: '1 Week', progress: 50 },
                                { task: 'Agent Training (Q-Learning)', duration: '3 Weeks', progress: 10 },
                                { task: 'Deployment & Testing', duration: '1 Week', progress: 0 }
                            ].map(t => (
                                <div key={t.task} className="flex items-center gap-4">
                                    <div className="text-[10px] w-40 font-medium text-slate-500 truncate">{t.task}</div>
                                    <div className="flex-1 h-6 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative border border-slate-200 dark:border-slate-700">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${t.progress}%` }}
                                            className="h-full bg-indigo-500/30 border-r-2 border-indigo-500"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-slate-600 dark:text-slate-300">
                                            {t.duration}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h5 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <ShieldAlert size={16} className="text-red-500" />
                                Risk Management
                            </h5>
                            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-600 dark:text-slate-400">Reward Hacking</span>
                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-bold">High</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-600 dark:text-slate-400">Sparse Rewards</span>
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-bold">Medium</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h5 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Users2 size={16} className="text-emerald-500" />
                                Team Responsibility Matrix
                            </h5>
                            <div className="card p-4 text-[10px]">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <th className="text-left pb-2">Role</th>
                                            <th className="text-left pb-2">Task</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-500">
                                        <tr><td className="py-2 font-bold text-slate-700 dark:text-slate-300">RL Engineer</td><td>Algorithm & Policy</td></tr>
                                        <tr><td className="py-2 font-bold text-slate-700 dark:text-slate-300">Unity Dev</td><td>Environment Design</td></tr>
                                        <tr><td className="py-2 font-bold text-slate-700 dark:text-slate-300">UX Designer</td><td>Control Dashboard</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Model 2 Mark Questions"
                subtitle="Test Your Conceptual Strength"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Assessment"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        {
                            type: 'Conceptual',
                            q: 'Differentiate between Reward and Value function.',
                            a: 'Reward is the immediate scalar signal from the environment after an action. Value function is the estimated long-term total reward starting from a particular state.'
                        },
                        {
                            type: 'Numerical',
                            q: 'Calculate Return Gₜ if γ = 0.5 and the next three rewards are 10, 20, and 30.',
                            a: 'Gₜ = 10 + (0.5 * 20) + (0.5² * 30) = 10 + 10 + 7.5 = 27.5'
                        },
                        {
                            type: 'Application',
                            q: 'Give an example of a "Sparse Reward" environment.',
                            a: 'A robot learning to walk where reward is 0 for every step and +100 only when it reaches the finish line 1km away.'
                        },
                        {
                            type: 'Problem Solving',
                            q: 'What happens to the agent if γ is set to 0?',
                            a: 'The agent becomes "myopic" or short-sighted. It only cares about the immediate next reward (Rₜ₊₁) and ignores all future consequences.'
                        }
                    ].map((item, i) => (
                        <div key={i} className="group p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-primary-500 transition-all cursor-pointer shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                                    {item.type}
                                </span>
                            </div>
                            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                                {item.q}
                            </h5>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-xs text-slate-500 dark:text-slate-400 italic">
                                <strong>Answer:</strong> {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: The Element Explorer"
                subtitle="Interactive Simulation of Agent Organs"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <ElementLab />
            </SectionWrapper>

            {/* TOPIC SUMMARY / INSIGHTS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-12 border-t border-slate-200 dark:border-slate-700">
                {[
                    { label: 'Key Insight', val: 'Elements work together like organs in a body.', icon: <Lightbulb size={16} /> },
                    { label: 'Advantage', val: 'Allows agent to learn from sparse feedback.', icon: <TrendingUp size={16} /> },
                    { label: 'Career Relevance', val: 'Critical for robotics and finance AI.', icon: <Briefcase size={16} /> },
                    { label: 'Future Scope', val: 'Multi-agent coordination using shared values.', icon: <Zap size={16} /> }
                ].map(stat => (
                    <div key={stat.label} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center space-y-1">
                        <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center mx-auto mb-2 text-primary-500">
                            {stat.icon}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{stat.val}</div>
                    </div>
                ))}
            </div>

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
                    const data = getTopicData('unit1', 'Topic4_ElementsOfRL');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit1', 'Topic4_ElementsOfRL');
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
                        <div className="bg-primary-600 rounded-3xl p-8 text-center text-white space-y-6 shadow-xl shadow-primary-500/20">
                            <div className="max-w-md mx-auto space-y-2">
                                <h3 className="text-2xl font-black italic">Topic 4: Complete!</h3>
                                <p className="text-primary-100 text-sm">
                                    You've mastered the internal elements of RL. Ready to see the environments where these agents live?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-8 py-3 bg-white text-primary-600 font-black rounded-2xl hover:bg-primary-50 transition-colors shadow-lg">
                                    APPROVE TOPIC
                                </button>
                                <button className="px-8 py-3 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                                    REQUEST REVISION
                                </button>
                            </div>
                            <div className="text-[10px] text-primary-200 uppercase tracking-[0.2em] font-bold pt-4">
                                Recursive Content Generation Loop Active
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

