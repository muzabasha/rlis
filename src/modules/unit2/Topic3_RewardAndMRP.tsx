import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import QuestionAccordion from '../../components/topic/QuestionAccordion';
import { BookOpen, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function generateReturnData(gamma: number) {
    const rewards = [1, 3, -1, 5, 2, 4, -2, 3];
    const data = [];
    let G = 0;
    for (let t = rewards.length - 1; t >= 0; t--) {
        G = rewards[t] + gamma * G;
        data.unshift({ t, reward: rewards[t], G: parseFloat(G.toFixed(3)) });
    }
    return data;
}

export default function Topic3_RewardAndMRP() {
    const [gamma, setGamma] = useState(0.9);
    const data = generateReturnData(gamma);

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Salary vs Bonus Story" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">💰 Salary Today vs Pension Tomorrow</h3>
                    <p className="text-slate-700 dark:text-slate-300">You're offered two jobs: Job A pays ₹50,000/month now. Job B pays ₹30,000/month now but ₹1,00,000/month after 5 years. Which is better? It depends on how much you value future money — your personal discount factor γ! This is exactly what the Return G_t captures in RL.</p>
                    <InfoCard type="definition" title="Reward vs Return">
                        Reward R_t+1: immediate feedback for one action. Return G_t: total discounted future reward from time t. G_t = R_t+1 + γR_t+2 + γ²R_t+3 + ... The agent optimizes G_t, not just R_t+1.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — Reward, Returns & Markov Reward Process" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-5">
                    <MathBlock formula="G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} = R_{t+1} + \gamma G_{t+1}" label="Return — Recursive Definition" explanation="The return at time t equals immediate reward plus discounted future return" />
                    <SymbolTable symbols={[
                        { symbol: 'G_t', meaning: 'Return — total discounted reward from time t', unit: 'ℝ' },
                        { symbol: 'R_{t+k+1}', meaning: 'Reward received k steps in the future', unit: 'ℝ' },
                        { symbol: '\\gamma^k', meaning: 'Discount applied to reward k steps ahead', unit: '[0,1]' },
                    ]} />

                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Markov Reward Process (MRP)</h4>
                        <MathBlock formula="\text{MRP} = \langle \mathcal{S}, \mathcal{P}, \mathcal{R}, \gamma \rangle" label="MRP — MDP without Actions" explanation="An MRP is an MDP where the policy is fixed — no action selection needed" />
                        <InfoCard type="info" title="MRP vs MDP">
                            MRP = MDP with a fixed policy. Useful for evaluating a specific policy. Once we fix π in an MDP, it becomes an MRP. The value function of an MRP is the expected return from each state.
                        </InfoCard>
                    </div>

                    <div className="lab-block">
                        <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">📊 Interactive Return Calculator</h4>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Discount Factor γ = {gamma}</label>
                            <input type="range" min="0" max="0.99" step="0.01" value={gamma} onChange={e => setGamma(parseFloat(e.target.value))} className="w-full accent-cyan-600" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Rewards: [1, 3, -1, 5, 2, 4, -2, 3] | G_0 = {data[0]?.G}</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="t" label={{ value: 'Time Step', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }} />
                                <Line type="monotone" dataKey="reward" stroke="#94a3b8" name="Reward" strokeWidth={1} dot />
                                <Line type="monotone" dataKey="G" stroke="#10b981" name="Return G_t" strokeWidth={2} dot />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </SectionWrapper>

            <QuestionAccordion questions={[
                { q: 'What is the difference between reward and return in RL?', a: 'Reward R_t+1: immediate scalar feedback for one action at time t. Return G_t: total discounted cumulative reward from time t onwards. G_t = R_t+1 + γR_t+2 + γ²R_t+3 + ... The agent maximizes expected return E[G_t], not just immediate reward. This distinction is crucial — optimizing only for immediate reward leads to myopic, suboptimal behavior.' },
                { q: 'Derive the recursive formula for return G_t.', a: 'G_t = R_t+1 + γR_t+2 + γ²R_t+3 + ... = R_t+1 + γ(R_t+2 + γR_t+3 + ...) = R_t+1 + γG_t+1. This recursive form is fundamental — it allows dynamic programming. The return at time t equals immediate reward plus discounted return at t+1. This is the basis of the Bellman equation.' },
                { q: 'What is a Markov Reward Process? How does it relate to MDP?', a: 'MRP = ⟨S, P, R, γ⟩ — an MDP without actions. In an MRP, transitions happen automatically (no agent control). An MDP becomes an MRP when we fix a policy π. The value function V_π(s) of an MRP gives the expected return from state s under policy π. MRP analysis is used to evaluate a given policy before improving it.' },
                { q: 'Calculate G_0 for rewards [2, 3, 1] with γ=0.9.', a: 'G_2 = R_3 = 1. G_1 = R_2 + γG_2 = 3 + 0.9×1 = 3.9. G_0 = R_1 + γG_1 = 2 + 0.9×3.9 = 2 + 3.51 = 5.51. Alternatively: G_0 = 2 + 0.9×3 + 0.81×1 = 2 + 2.7 + 0.81 = 5.51.' },
                { q: 'Why is the discount factor γ strictly less than 1 for continuing tasks?', a: 'For continuing tasks (infinite horizon), if γ=1, the return G_t = Σ R_t+k+1 may be infinite (diverges). With γ<1, the geometric series converges: G_t ≤ R_max/(1-γ). This ensures finite, well-defined returns. Also, γ<1 models the practical preference for immediate rewards over distant future rewards (time value of money analogy).' },
            ]} />
        </div>
    );
}