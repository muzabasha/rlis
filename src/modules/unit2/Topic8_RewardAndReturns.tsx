import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState, useEffect } from 'react';
import {
    motion } from 'framer-motion';
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
    Coins,
    Gift,
    TrendingDown,
    Target,
    Briefcase,
    Rocket,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Reward And Returns Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Reward And Returns Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Reward And Returns simulator.",
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
    "🤖 [System] Initializing Reward And Returns Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Reward And Returns\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components ──────────────────────────────────────────────────

function ReturnCalculatorLab() {
    const [gamma, setGamma] = useState(0.9);
    
    // Future rewards: time t+1, t+2, t+3, t+4, t+5
    const rewards = [10, 20, 50, 100, 500];
    
    // Calculate discounted rewards
    const chartData = rewards.map((r, i) => {
        const discount = Math.pow(gamma, i);
        return {
            timeStep: `t+${i+1}`,
            originalReward: r,
            discount: parseFloat(discount.toFixed(3)),
            discountedReward: parseFloat((r * discount).toFixed(1)),
            color: '#8b5cf6'
        };
    });

    const totalReturn = chartData.reduce((acc, curr) => acc + curr.discountedReward, 0);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Controls and Stats */}
                <div className="flex-1 space-y-6">
                    <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Coins size={18} className="text-primary-500" />
                            Discounted Return Calculator
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">Adjust gamma to see how future rewards lose value.</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold text-slate-400 uppercase">Discount Factor (γ)</span>
                                <span className="text-2xl font-black text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">{gamma.toFixed(2)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05"
                                value={gamma} 
                                onChange={(e) => setGamma(parseFloat(e.target.value))}
                                className="w-full accent-primary-600"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                <span>0 (Myopic / Greedy)</span>
                                <span>1.0 (Far-sighted)</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                            <span className="text-xs font-bold text-slate-400 uppercase">Total Return (G_t)</span>
                            <div className="text-4xl font-black text-slate-800 dark:text-white mt-2">
                                {totalReturn.toFixed(1)}
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2">
                                Without discounting (γ=1), the return would be {rewards.reduce((a,b)=>a+b,0)}.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chart Display */}
                <div className="flex-[2] h-64 w-full bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="timeStep" tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                formatter={(value: number, name: string) => [value, name === 'discountedReward' ? 'Present Value' : 'Original Reward']}
                            />
                            <Bar dataKey="discountedReward" name="Present Value" radius={[6, 6, 0, 0]} fill="#8b5cf6">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fillOpacity={0.4 + (entry.discount * 0.6)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* Value Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-[10px] text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 rounded-t-lg">
                        <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Time Step</th>
                            <th className="px-4 py-3">Original Reward ($R$)</th>
                            <th className="px-4 py-3">Discount ($\gamma^k$)</th>
                            <th className="px-4 py-3 rounded-tr-lg">Present Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartData.map((d, i) => (
                            <tr key={i} className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 last:border-0">
                                <td className="px-4 py-3 font-bold text-slate-500">{d.timeStep}</td>
                                <td className="px-4 py-3 font-mono">{d.originalReward}</td>
                                <td className="px-4 py-3 font-mono text-slate-400">{gamma}<sup>{i}</sup> = {d.discount}</td>
                                <td className="px-4 py-3 font-mono text-primary-600 font-bold">{d.discountedReward}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic8_RewardAndReturns() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic8_rewardandreturns" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Marshmallow Test" 
                subtitle="Immediate vs. Delayed Gratification"
                icon={<Gift className="text-amber-600" size={24} />}
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
                                "Returns are just delayed gratification. It's like eating broccoli now so you get dessert later."
                            </p>
                        </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Coins size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                            🕰️ The Time Value of Reward
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In a famous psychological experiment, a child is offered a choice: eat one marshmallow right now, or wait 15 minutes and get two marshmallows.
                            </p>
                            <p>
                                This is the core dilemma of Reinforcement Learning. If an agent only cares about the <strong>Immediate Reward</strong> ({"$R_{t+1}$"}), it might make greedy choices that ruin its long-term success. It might eat the one marshmallow now.
                            </p>
                            <p>
                                To fix this, we don't just optimize for the immediate reward. We optimize for the <strong>Return</strong> ({"$G_t$"})—the total sum of all rewards the agent expects to collect from now until the end of the game.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Reward = Instant">
                            The Reward is the scalar feedback signal received at a single specific time step.
                        </InfoCard>
                        <InfoCard type="tip" title="Return = Cumulative">
                            The Return is the accumulation of all future rewards. It is the true goal of the RL agent.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            
            {/* SECTION 2: MOTIVATION & APPLICATION CHALLENGE */}
            <SectionWrapper
                id="motivation"
                title="7. Motivation & Application Challenge"
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
                                Devising a financial portfolio trading bot that balances immediate daily earnings with long-term retirement security.
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
                            Vital to teach the agent to value long-term gains over short-term gratification using a discount factor.
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
                                    Provides a unified framework to optimize both immediate feedback and far-sighted strategies.
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
                                    High sensitivity to the discount factor (Gamma); minor changes can make an agent completely myopic or chaotic.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="7. The Return Equation" 
                subtitle="Discounting the Future"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots"
                                label="Discounted Return"
                                explanation="The total return at time t. Future rewards are multiplied by a discount factor gamma."
                            />
                            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                                <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><TrendingDown size={16} /> Why Discount?</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    If a task goes on forever (infinite horizon), the sum of rewards could reach infinity, breaking the math. Discounting ensures the sum converges to a finite number, and gives the agent a sense of urgency.
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <MathBlock 
                                formula="G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}"
                                label="Compact Notation"
                                explanation="The mathematical summation form of the Discounted Return equation."
                            />
                            <MathBlock 
                                formula="G_t = R_{t+1} + \gamma G_{t+1}"
                                label="Recursive Return"
                                explanation="A crucial property: The return right now is just the immediate reward plus the discounted return of the NEXT step."
                            />
                        </div>
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: 'G_t', meaning: 'The Return (Goal) at time step t.' },
                            { symbol: 'R_{t+1}', meaning: 'The immediate reward received after taking an action at time t.' },
                            { symbol: '\gamma', meaning: 'Gamma. The Discount Factor (0 \u2264 \u03B3 \u2264 1).' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Reward And Returns Architecture"
                description="The concept of cumulative discounted returns."
                chart={`graph LR
    R1[R_{t+1}] --> Sum[Return G_t]
    R2[R_{t+2} * &gamma;] --> Sum
    R3[R_{t+3} * &gamma;^2] --> Sum
    R4[... * &gamma;^n] --> Sum`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="7. Multi-Level Activities" 
                subtitle="Calculating Cumulative Value"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Return Decay Demo",
                            objectives: "Visualize how the discount factor gamma $(\\gamma)$ shrinks the perceived value of future rewards.",
                            instructions: [
                                "Open the 'Discounted Return Calculator' in the Virtual Lab section.",
                                "Set $\\gamma = 1.0$ and observe the total return is just the simple sum.",
                                "Slide $\\gamma$ down to 0.5 and watch the distant bars (t+5) vanish.",
                                "Ask: 'If the agent is greedy, which reward does it care about most?' (The first one)."
                            ],
                            inputs: "Interactive ReturnCalculatorLab component",
                            outputs: "Dynamic bar charts showing reward value over time.",
                            rubrics: ["Clarity of 'Time Value' explanation", "Demonstration of Gamma sensitivity", "Student engagement"],
                            outcomes: "Students identify the difference between 'Immediate Reward' and 'Discounted Return'.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The 3-Step Return Workshop",
                            objectives: "Collaboratively calculate the exact numerical return for a short sequence of rewards.",
                            instructions: [
                                "Teacher writes a sequence on the board: $R_{t+1}=100, R_{t+2}=50, R_{t+3}=200$.",
                                "Set $\\gamma = 0.9$.",
                                "Guided Calculation Step 1: $100$.",
                                "Step 2: $0.9 \\times 50 = 45$.",
                                "Step 3: $0.9^2 \\times 200 = 0.81 \\times 200 = 162$.",
                                "Sum the results: $100 + 45 + 162 = 307$."
                            ],
                            inputs: "Reward sequence data",
                            outputs: "Calculated Total Return $G_t$ on the board",
                            rubrics: ["Mathematical accuracy", "Logic of exponentiation", "Classroom participation"],
                            outcomes: "Students master the technical execution of the return formula.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Marshmallow Simulation",
                            objectives: "Experience the impact of different discount factors on strategy and behavior.",
                            instructions: [
                                "Divide class into 'Myopic' ($\\gamma=0.1$) and 'Far-Sighted' ($\\gamma=0.99$) teams.",
                                "Task: A player is offered 10 points now OR 100 points if they complete a 5-step difficult path.",
                                "Myopic Team: Calculates perceived value. (Answer: 10 vs very low). They choose the 10 points.",
                                "Far-Sighted Team: Calculates perceived value. (Answer: 10 vs ~95). They choose the difficult path.",
                                "Teams present why their 'Gamma' forced their decision."
                            ],
                            inputs: "Binary decision scenario (Small/Fast vs Large/Slow)",
                            outputs: "Team Strategy Reports",
                            rubrics: ["Depth of insight on 'Long-term thinking'", "Correct application of formula", "Team coordination"],
                            outcomes: "Students internalize that an RL agent's behavior is a direct result of its discount factor.",
                            time: "20 Mins",
                            materials: ["Paper sheets", "Calculators"]
                        },
                        {
                            level: 4,
                            title: "Life Choice Audit",
                            objectives: "Independently model a real-life high-stakes decision as a discounted return problem.",
                            instructions: [
                                "Task: Choose a long-term goal (e.g., getting a Degree, starting a Gym habit, saving for a Car).",
                                "Audit: List the immediate 'Costs' (Negative rewards) and future 'Benefits' (Positive rewards).",
                                "Reflect: If you had a very low $\\gamma$, would you still pursue this goal? Why do humans often fail at these tasks (low $\\gamma$ behavior)?",
                                "Calculate: Estimate the 'Present Value' of your goal using $\\gamma=0.9$."
                            ],
                            inputs: "Personal life scenarios",
                            outputs: "Individual Return Analysis Note (1 page)",
                            rubrics: ["Correct use of negative/positive rewards", "Mathematical logic", "Depth of self-reflection"],
                            outcomes: "Students bridge RL mathematics with real-world human behavior and economics.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="7. Project: Financial Returns" 
                subtitle="RL Math in Economics"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Net Present Value (NPV)</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            The RL equation for Return ($G_t$) is mathematically identical to the economic concept of <strong>Net Present Value</strong> used in finance.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            If someone offers you $100 today or $100 in ten years, you take it today. Due to inflation and investment opportunities, money in the future is worth less than money now.
                        </p>
                        <div className="flex items-center gap-4 text-sm font-bold">
                            <div className="flex-1 p-3 bg-red-50 text-red-600 rounded-lg text-center border border-red-100">
                                $100 in 10 years (with 5% inflation) = $61 Today
                            </div>
                            <div className="flex-1 p-3 bg-emerald-50 text-emerald-600 rounded-lg text-center border border-emerald-100">
                                {"RL Translation: $R_{t+10} = 100$, $\\gamma = 0.95$"}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="7. Quick Check" 
                subtitle="Reward Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the difference between a Reward and a Return?', a: 'A Reward is the immediate numerical feedback received at a single time step. The Return is the cumulative sum of all future rewards.' },
                        { q: 'What happens if Gamma (\u03B3) is set to 0?', a: 'The agent becomes "myopic" or entirely greedy. It will only care about maximizing the immediate reward for the very next step, ignoring all long-term consequences.' },
                        { q: 'What happens if Gamma (\u03B3) is set to 1?', a: 'The agent becomes "far-sighted". It treats a reward received 100 steps from now as equally valuable as a reward received right now. (Can cause infinite sums if the task never ends).' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Discount Calculator" 
                subtitle="Visualize the Future Decay"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Return Calculator"
                    description="Compute discounted returns for reward sequences"
                    objective="Input a sequence of rewards and γ value. See how the discounted return G_t changes with different discount factors."
                    badge="Interactive Lab"
                    tips={['γ=0.99 makes the agent very far-sighted — it values future rewards almost as much as immediate ones',
                'γ=0.1 makes the agent myopic — it mostly cares about the next step']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        A massive treasure of 500 points awaits the agent 5 steps into the future. Adjust the discount factor ($\gamma$) to see how much that distant treasure is "worth" to the agent right now at $t=0$.
                    </p>
                    <ReturnCalculatorLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">The Goal is Clear!</h3>
                    <p className="text-primary-100">
                        You've learned that RL agents optimize for the Return, not the immediate reward. Now, let's look at how we package all these concepts together into a Markov Reward Process.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MARKOV REWARD PROCESS
                    </button>
                </div>
            </div>
        </div>
    );
}
