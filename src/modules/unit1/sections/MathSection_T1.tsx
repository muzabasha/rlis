import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../../components/topic/SectionWrapper';
import InfoCard from '../../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../../components/topic/MathBlock';
import { Calculator, TrendingUp, BarChart2 } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';

function generateRewardData(alpha: number, gamma: number, steps: number) {
    const data = [];
    let G = 0;
    for (let t = 0; t < steps; t++) {
        const r = Math.sin(t * 0.3) * 5 + Math.random() * 3 + 2;
        G = r + gamma * G;
        const V = G * (1 - Math.pow(gamma, t + 1)) / (1 - gamma + 0.001);
        data.push({
            step: t,
            reward: parseFloat(r.toFixed(2)),
            return: parseFloat(G.toFixed(2)),
            value: parseFloat((V * alpha).toFixed(2)),
        });
    }
    return data;
}

export default function MathSection_T1() {
    const [gamma, setGamma] = useState(0.9);
    const [alpha, setAlpha] = useState(0.1);
    const [steps, setSteps] = useState(20);

    const data = generateRewardData(alpha, gamma, steps);

    return (
        <SectionWrapper
            id="math"
            title="Section 2: Mathematical Modelling"
            subtitle="Equations, symbols, and interactive visualizations"
            icon={<Calculator size={20} className="text-red-600" />}
            badge="Math + Equations"
            badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
            accentColor="border-red-500"
        >
            <div className="space-y-8">

                {/* 1. Need & Motivation */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-7 h-7 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                        Need for Mathematical Formalization
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                        Bruno's trial-and-error learning is intuitive, but to build algorithms, we need precise mathematics.
                        The core question: <strong>How do we quantify "learning from rewards"?</strong>
                    </p>
                    <InfoCard type="info" title="Real-World Challenge">
                        In a robot navigation task, the robot takes thousands of actions per second. Without a mathematical
                        framework, we cannot define "good behavior", measure progress, or guarantee convergence to an optimal strategy.
                    </InfoCard>
                </div>

                {/* 2. The RL Loop Equation */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-7 h-7 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                        The Agent-Environment Interaction
                    </h3>

                    <MathBlock
                        formula="S_t, A_t \xrightarrow{\text{environment}} R_{t+1}, S_{t+1}"
                        label="RL Interaction Loop"
                        explanation="At time t, the agent observes state S_t, takes action A_t, and receives reward R_{t+1} and new state S_{t+1}"
                    />

                    <SymbolTable symbols={[
                        { symbol: 'S_t', meaning: 'State at time step t — the agent\'s observation of the environment', unit: 'Set S' },
                        { symbol: 'A_t', meaning: 'Action taken by the agent at time step t', unit: 'Set A' },
                        { symbol: 'R_{t+1}', meaning: 'Reward received after taking action A_t in state S_t', unit: 'ℝ (real number)' },
                        { symbol: 'S_{t+1}', meaning: 'New state after the action is executed', unit: 'Set S' },
                        { symbol: 't', meaning: 'Discrete time step index', unit: 'ℤ⁺ (positive integer)' },
                    ]} />
                </div>

                {/* 3. Return / Cumulative Reward */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-7 h-7 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                        The Return: Cumulative Discounted Reward
                    </h3>

                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                        The agent doesn't just care about immediate reward — it wants to maximize <em>total</em> reward over time.
                        But future rewards are less certain, so we discount them:
                    </p>

                    <MathBlock
                        formula="G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}"
                        label="Return (Discounted Cumulative Reward)"
                        explanation="G_t is the total discounted reward from time t onwards. γ (gamma) is the discount factor."
                    />

                    <SymbolTable symbols={[
                        { symbol: 'G_t', meaning: 'Return — total discounted reward from time step t', unit: 'ℝ' },
                        { symbol: '\\gamma', meaning: 'Discount factor — how much future rewards are valued (0 ≤ γ < 1)', unit: '[0, 1)' },
                        { symbol: 'R_{t+k+1}', meaning: 'Reward received k steps in the future', unit: 'ℝ' },
                        { symbol: 'k', meaning: 'Number of steps into the future', unit: 'ℤ⁺' },
                    ]} />

                    <InfoCard type="tip" title="Why Discount?">
                        <strong>γ = 0:</strong> Agent is completely myopic — only cares about immediate reward.<br />
                        <strong>γ = 1:</strong> Agent values all future rewards equally (only valid for finite episodes).<br />
                        <strong>γ = 0.9:</strong> A reward 10 steps away is worth 0.9¹⁰ ≈ 0.35 of its face value.<br />
                        <em>Real-world analogy: ₹100 today is worth more than ₹100 next year (time value of money!)</em>
                    </InfoCard>
                </div>

                {/* 4. Interactive Simulation */}
                <div className="lab-block">
                    <h3 className="text-xl font-bold text-cyan-900 dark:text-cyan-100 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} />
                        Interactive: Explore Discount Factor γ
                    </h3>

                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                Discount Factor γ = {gamma}
                            </label>
                            <input
                                type="range" min="0.1" max="0.99" step="0.01"
                                value={gamma}
                                onChange={e => setGamma(parseFloat(e.target.value))}
                                className="w-full accent-primary-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>0.1 (myopic)</span><span>0.99 (far-sighted)</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                Learning Rate α = {alpha}
                            </label>
                            <input
                                type="range" min="0.01" max="1.0" step="0.01"
                                value={alpha}
                                onChange={e => setAlpha(parseFloat(e.target.value))}
                                className="w-full accent-primary-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>0.01 (slow)</span><span>1.0 (fast)</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                Time Steps = {steps}
                            </label>
                            <input
                                type="range" min="5" max="50" step="1"
                                value={steps}
                                onChange={e => setSteps(parseInt(e.target.value))}
                                className="w-full accent-primary-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>5</span><span>50</span>
                            </div>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="rewardGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="returnGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="step" label={{ value: 'Time Step (t)', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="reward" stroke="#3b82f6" fill="url(#rewardGrad)" name="Reward R_t" strokeWidth={2} />
                            <Area type="monotone" dataKey="return" stroke="#8b5cf6" fill="url(#returnGrad)" name="Return G_t" strokeWidth={2} />
                            <Line type="monotone" dataKey="value" stroke="#10b981" name="Value V(s)" strokeWidth={2} dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>

                    <div className="mt-4 grid sm:grid-cols-3 gap-3">
                        <div className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                                {data.length > 0 ? data[data.length - 1].reward.toFixed(1) : '—'}
                            </div>
                            <div className="text-xs text-slate-500">Final Reward</div>
                        </div>
                        <div className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-black text-violet-600 dark:text-violet-400">
                                {data.length > 0 ? data[data.length - 1].return.toFixed(1) : '—'}
                            </div>
                            <div className="text-xs text-slate-500">Cumulative Return</div>
                        </div>
                        <div className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-3 text-center">
                            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                {(Math.pow(gamma, steps)).toFixed(3)}
                            </div>
                            <div className="text-xs text-slate-500">γ^T (discount at T)</div>
                        </div>
                    </div>
                </div>

                {/* 5. Numerical Example */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-7 h-7 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                        Numerical Example: Bruno's Treat Calculation
                    </h3>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                            Bruno receives rewards: R₁ = 1 (small treat), R₂ = 0 (nothing), R₃ = 5 (big treat), R₄ = 2 (medium treat).
                            With γ = 0.9, what is the return G₁?
                        </p>

                        <MathBlock
                            formula="G_1 = R_2 + \gamma R_3 + \gamma^2 R_4 = 0 + 0.9 \times 5 + 0.81 \times 2 = 0 + 4.5 + 1.62 = 6.12"
                            label="Step-by-step calculation"
                        />

                        <InfoCard type="success" title="Interpretation">
                            Even though R₂ = 0 (no immediate reward), Bruno's return G₁ = 6.12 because he anticipates
                            the big treat at step 3. This is why RL agents can sacrifice short-term rewards for long-term gain!
                        </InfoCard>
                    </div>
                </div>

                {/* 6. Advantages & Limitations */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="card p-5">
                        <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
                            <span>✅</span> Advantages of RL
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            {[
                                'No need for labeled training data',
                                'Can solve problems with no known optimal solution',
                                'Adapts to dynamic, changing environments',
                                'Discovers novel strategies beyond human intuition',
                                'Applicable to sequential decision problems',
                            ].map(a => <li key={a} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>{a}</li>)}
                        </ul>
                    </div>
                    <div className="card p-5">
                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
                            <span>⚠️</span> Limitations of RL
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            {[
                                'Requires massive amounts of interaction data',
                                'Reward function design is non-trivial',
                                'Can be unstable or diverge during training',
                                'Exploration can be dangerous in real systems',
                                'Computationally expensive for large state spaces',
                            ].map(a => <li key={a} className="flex items-start gap-2"><span className="text-red-500 mt-0.5">•</span>{a}</li>)}
                        </ul>
                    </div>
                </div>

            </div>
        </SectionWrapper>
    );
}
