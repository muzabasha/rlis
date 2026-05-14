import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Box, GitMerge, ChefHat, Star, AlertCircle, TrendingUp,
    Zap, Target, Clock, Briefcase, ShieldAlert, Users2, Layout
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell,
    BarChart, Bar, Legend
} from 'recharts';

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
                        className="w-full accent-primary-600"
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

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="2. Mathematical Foundations"
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
                        formula="\pi(a \mid s) = \Pr(A_t = a \mid S_t = s)"
                        label="Policy — The Agent's Strategy"
                        accent="blue"
                        explanation="The policy π maps every state s to a probability distribution over actions. It is the complete specification of the agent's behaviour."
                        interpretation="The policy is the brain of the agent. A deterministic policy always picks the same action in a given state: π(s)=a. A stochastic policy assigns probabilities to actions, enabling exploration. The goal of RL is to find the optimal policy π* that maximises expected return."
                        motivation="Without a formal policy, we cannot write algorithms. Every RL update rule — Q-learning, REINFORCE, PPO — is ultimately computing a better policy from experience."
                        terms={[
                            { term: '\\pi(a\\mid s)', name: 'Policy', meaning: 'Probability of taking action a when in state s. Sums to 1 over all actions.', range: '[0,1]', example: 'π(right|(2,3))=0.8, π(up|(2,3))=0.2 — mostly go right, sometimes explore up.' },
                            { term: 'A_t', name: 'Action random variable', meaning: 'The action chosen at time t, sampled from π(·|S_t).', range: '\\mathcal{A}', example: 'A_t = "move right"' },
                            { term: 'S_t', name: 'State random variable', meaning: 'The state observed at time t.', range: '\\mathcal{S}', example: 'S_t = (row=2, col=3)' },
                        ]}
                        numericalExample={{
                            setup: 'Stochastic policy in a 2-action world: π(left|s)=0.3, π(right|s)=0.7.',
                            steps: [
                                'Sample uniform U ~ Uniform(0,1).',
                                'If U < 0.3 → take action "left".',
                                'If U ≥ 0.3 → take action "right".',
                                'Over 1000 steps: ~300 left, ~700 right.',
                            ],
                            result: 'The stochastic policy ensures the agent explores "left" 30% of the time, preventing it from getting stuck in a local optimum.',
                        }}
                    />

                    <MathBlock
                        formula="G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots"
                        label="Return — Total Discounted Reward"
                        accent="violet"
                        explanation="G_t is the total discounted reward from time t onwards. This is the quantity the agent maximises — not just the next reward, but the entire future."
                        interpretation="The return G_t is the 'score' the agent accumulates from time t to the end of the episode. The discount factor γ ensures that rewards far in the future contribute less than immediate rewards, reflecting uncertainty and the time value of reward."
                        motivation="Without G_t, we cannot define what 'good behaviour' means over time. A greedy agent maximising only R_{t+1} will sacrifice long-term success for short-term gain."
                        terms={[
                            { term: 'G_t', name: 'Return', meaning: 'Total discounted reward from step t to end of episode. The primary quantity RL maximises.', range: '\\mathbb{R}', example: 'G₀=7.86 means the agent expects to accumulate 7.86 total reward from the start.' },
                            { term: '\\gamma^k', name: 'Discount at step k', meaning: 'Exponential decay applied to reward k steps in the future. Ensures G_t is finite for infinite horizons.', range: '(0,1]', example: 'γ=0.9, k=5: γ⁵=0.59. A reward of 10 five steps away is worth 5.9 now.' },
                            { term: 'R_{t+k+1}', name: 'Future Reward', meaning: 'Reward received k+1 steps after time t.', range: '\\mathbb{R}', example: 'R_{t+3} is the reward 3 steps from now.' },
                        ]}
                        numericalExample={{
                            setup: 'Rewards: R₁=2, R₂=0, R₃=5, R₄=1. γ=0.9. Compute G₁.',
                            steps: [
                                'G₁ = R₂ + γ·R₃ + γ²·R₄',
                                '   = 0 + 0.9×5 + 0.81×1',
                                '   = 0 + 4.5 + 0.81',
                                '   = 5.31',
                            ],
                            result: 'G₁ = 5.31. Even with R₂=0, the agent has high return because it anticipates the +5 reward at step 3.',
                        }}
                    />

                    <MathBlock
                        formula="v_\pi(s) = \mathbb{E}_\pi\!\left[G_t \mid S_t = s\right] = \mathbb{E}_\pi\!\left[\sum_{k=0}^{\infty}\gamma^k R_{t+k+1} \;\middle|\; S_t=s\right]"
                        label="State-Value Function — The Agent's Hunch"
                        accent="emerald"
                        explanation="v_π(s) is the expected return when starting in state s and following policy π. It answers: 'How good is it to be in this state?'"
                        interpretation="The value function is the agent's long-term intuition. A high v_π(s) means state s is a good place to be — the agent expects to accumulate a lot of reward from here. A low v_π(s) means the state is bad. The agent uses value functions to compare states and improve its policy."
                        motivation="Without v_π(s), the agent cannot plan. It would have to re-evaluate every possible future from scratch at each step. The value function compresses all future information into a single number per state."
                        terms={[
                            { term: 'v_\\pi(s)', name: 'State-Value Function', meaning: 'Expected total discounted reward starting from state s, following policy π forever.', range: '\\mathbb{R}', example: 'v_π(near_goal)=9.5, v_π(start)=3.2 — being near the goal is much better.' },
                            { term: '\\mathbb{E}_\\pi', name: 'Expectation under π', meaning: 'Average over all trajectories the agent might experience when following policy π from state s.', range: '\\mathbb{R}', example: 'If 60% of trajectories give G=10 and 40% give G=5: E[G]=0.6×10+0.4×5=8.' },
                            { term: 'S_t = s', name: 'Conditioning on state', meaning: 'We fix the starting state to s. The expectation averages over all future randomness (stochastic transitions and stochastic policy).', range: '\\mathcal{S}', example: 'v_π((2,3)) = expected return when starting at grid position (2,3).' },
                        ]}
                        numericalExample={{
                            setup: '3-state chain: s₁→s₂→s₃(goal). Rewards: r(s₁→s₂)=0, r(s₂→s₃)=+10. γ=0.9. Deterministic policy: always move right.',
                            steps: [
                                'v_π(s₃) = 0  (terminal state, no future rewards)',
                                'v_π(s₂) = r(s₂→s₃) + γ·v_π(s₃) = 10 + 0.9×0 = 10',
                                'v_π(s₁) = r(s₁→s₂) + γ·v_π(s₂) = 0 + 0.9×10 = 9',
                            ],
                            result: 'v_π(s₁)=9, v_π(s₂)=10, v_π(s₃)=0. The value propagates backwards from the goal.',
                        }}
                    />

                    <div className="grid lg:grid-cols-2 gap-6">
                        <GammaExplorer />
                        <div className="space-y-4">
                            <div className="bg-slate-900 rounded-2xl p-5 text-white">
                                <h5 className="font-bold text-amber-400 mb-3 flex items-center gap-2"><Lightbulb size={16} /> The Four Elements Summary</h5>
                                <div className="space-y-3 text-xs">
                                    {[
                                        { sym: '\\pi(a|s)', name: 'Policy', desc: 'What to do in each state' },
                                        { sym: 'G_t', name: 'Return', desc: 'Total future reward' },
                                        { sym: 'v_\\pi(s)', name: 'Value Function', desc: 'Expected return from state s' },
                                        { sym: '\\mathcal{P}(s\'|s,a)', name: 'Model', desc: 'Predicts next state (optional)' },
                                    ].map(e => (
                                        <div key={e.name} className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-2">
                                            <span className="font-mono text-primary-400 w-24 shrink-0 text-xs overflow-hidden">
                                                <MathBlock formula={e.sym} inline />
                                            </span>
                                            <div>
                                                <span className="font-bold text-white">{e.name}</span>
                                                <span className="text-slate-400 ml-2">{e.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="3. Activity Based Learning"
                subtitle="Mastery through Doing"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="NEP 2020"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    {/* Level 1: Teacher Do */}
                    <div className="p-6 rounded-2xl border-2 border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-900/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">L1</div>
                            <h4 className="font-bold text-emerald-800 dark:text-emerald-200">Teacher Demonstration: The Maze Runner</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc pl-5">
                            <li>Teacher draws a 3x3 grid on the board.</li>
                            <li>Teacher defines a +10 reward at (3,3) and -10 reward at (2,2).</li>
                            <li>Teacher demonstrates two different **Policies**: "Always go Right then Down" vs "Explore randomly".</li>
                            <li>Expected observation: Students see how policy affects the final Return (G).</li>
                        </ul>
                    </div>

                    {/* Level 2: Teacher + Student Together */}
                    <div className="p-6 rounded-2xl border-2 border-primary-100 dark:border-primary-900/30 bg-primary-50/30 dark:bg-primary-900/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xs">L2</div>
                            <h4 className="font-bold text-primary-800 dark:text-primary-200">Guided Collaborative Activity: Reward Designer</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Let's design the **Reward Signal** for an Autonomous School Bus.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-primary-100 dark:border-primary-800">
                                <div className="text-xs font-bold text-emerald-500">Positive Rewards (+)</div>
                                <input placeholder="e.g., Reaching stop on time" className="mt-2 w-full bg-slate-50 dark:bg-slate-900 text-[11px] p-2 rounded border-none outline-none" />
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-red-100 dark:border-red-800">
                                <div className="text-xs font-bold text-red-500">Negative Rewards (-)</div>
                                <input placeholder="e.g., Sudden braking" className="mt-2 w-full bg-slate-50 dark:bg-slate-900 text-[11px] p-2 rounded border-none outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* Level 3: All Students Do */}
                    <div className="p-6 rounded-2xl border-2 border-amber-100 dark:border-amber-900/30 bg-amber-50/30 dark:bg-amber-900/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">L3</div>
                            <h4 className="font-bold text-amber-800 dark:text-amber-200">Group Task: Be the Reward Signal</h4>
                        </div>
                        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <p>Divide the class into groups of 3:</p>
                            <div className="flex gap-4 items-center">
                                <div className="flex-1 p-2 bg-white dark:bg-slate-800 rounded border border-amber-200 text-center text-xs">Student A: The Agent (Blindfolded)</div>
                                <div className="flex-1 p-2 bg-white dark:bg-slate-800 rounded border border-amber-200 text-center text-xs">Student B: The Environment (Voice Only)</div>
                                <div className="flex-1 p-2 bg-white dark:bg-slate-800 rounded border border-amber-200 text-center text-xs">Student C: The Reward Recorder</div>
                            </div>
                            <p className="italic text-xs">Task: Student A must find a hidden object only by hearing Student B say "Warm" or "Cold" (Rewards).</p>
                        </div>
                    </div>

                    {/* Level 4: Individual Student Do */}
                    <div className="p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-slate-600 text-white flex items-center justify-center font-bold text-xs">L4</div>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200">Individual Reflection: My Life's Value Function</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                            "Think of your career. Getting an 'A' in this course is a Reward. Being a successful engineer is the Value. How do you adjust your current Policy to maximize that Value?"
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="4. Project: Smart Warehouse Agent"
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

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="5. Model 2 Mark Questions"
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

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="6. Virtual Lab: The Element Explorer"
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

            {/* FEEDBACK SECTION */}
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
}

