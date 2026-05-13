import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import QuestionAccordion from '../../components/topic/QuestionAccordion';
import { BookOpen, Calculator } from 'lucide-react';

const GRID = 4;
// Simple value function for a 4x4 grid (goal at bottom-right)
function computeValues(gamma: number) {
    const V: number[][] = Array.from({ length: GRID }, (_, r) => Array.from({ length: GRID }, (_, c) => {
        const dist = (GRID - 1 - r) + (GRID - 1 - c);
        return parseFloat((10 * Math.pow(gamma, dist)).toFixed(2));
    }));
    return V;
}

export default function Topic4_ValueFunctions() {
    const [gamma, setGamma] = useState(0.9);
    const V = computeValues(gamma);

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Real Estate Agent" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">🏠 How Much is This Location Worth?</h3>
                    <p className="text-slate-700 dark:text-slate-300">A real estate agent doesn't just look at today's rent — they estimate the total future income from a property. A house near a new metro station is worth more because of future appreciation. This "total future value" is exactly what the Value Function computes for each state in RL.</p>
                    <InfoCard type="definition" title="Value Function — Intuition">
                        V(s) answers: "If I'm in state s and follow policy π, how much total reward will I accumulate?" It's the expected return from state s. High V(s) = good state to be in. Low V(s) = bad state.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — State Value & Action Value Functions" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-5">
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">State Value Function V_π(s)</h4>
                        <MathBlock formula="V_\pi(s) = \mathbb{E}_\pi[G_t \mid S_t=s] = \mathbb{E}_\pi\left[\sum_{k=0}^{\infty}\gamma^k R_{t+k+1} \mid S_t=s\right]" label="State Value Function" explanation="Expected return starting from state s, following policy π" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Action Value Function Q_π(s,a)</h4>
                        <MathBlock formula="Q_\pi(s,a) = \mathbb{E}_\pi[G_t \mid S_t=s, A_t=a]" label="Action Value (Q) Function" explanation="Expected return starting from state s, taking action a, then following policy π" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Relationship Between V and Q</h4>
                        <MathBlock formula="V_\pi(s) = \sum_a \pi(a|s)\, Q_\pi(s,a)" label="V from Q" explanation="State value = weighted average of Q-values over all actions under policy π" />
                        <MathBlock formula="Q_\pi(s,a) = \sum_{s'} \mathcal{P}(s'|s,a)\left[\mathcal{R}(s,a,s') + \gamma V_\pi(s')\right]" label="Q from V" explanation="Q-value = expected immediate reward + discounted value of next state" />
                    </div>

                    <SymbolTable symbols={[
                        { symbol: 'V_\\pi(s)', meaning: 'State value — expected return from state s under policy π', unit: 'ℝ' },
                        { symbol: 'Q_\\pi(s,a)', meaning: 'Action value — expected return from (s,a) under policy π', unit: 'ℝ' },
                        { symbol: '\\pi(a|s)', meaning: 'Policy — probability of taking action a in state s', unit: '[0,1]' },
                    ]} />

                    <div className="lab-block">
                        <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">🗺️ Value Function Heatmap (4×4 Grid, Goal=bottom-right)</h4>
                        <div className="mb-3">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">γ = {gamma}</label>
                            <input type="range" min="0.1" max="0.99" step="0.01" value={gamma} onChange={e => setGamma(parseFloat(e.target.value))} className="w-full accent-cyan-600" />
                        </div>
                        <div className="inline-block">
                            {V.map((row, r) => (
                                <div key={r} className="flex gap-1 mb-1">
                                    {row.map((v, c) => {
                                        const intensity = v / 10;
                                        return (
                                            <div key={c} className="w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs font-bold border"
                                                style={{ backgroundColor: `rgba(59,130,246,${intensity})`, borderColor: `rgba(59,130,246,${intensity + 0.2})`, color: intensity > 0.5 ? 'white' : '#1e293b' }}>
                                                {r === GRID - 1 && c === GRID - 1 ? '🏆' : v}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Darker blue = higher value. Adjust γ to see how discount affects value propagation.</p>
                    </div>
                </div>
            </SectionWrapper>

            <QuestionAccordion questions={[
                { q: 'Define state value function V_π(s) and action value function Q_π(s,a).', a: 'V_π(s) = E_π[G_t | S_t=s] — expected return from state s following policy π. Q_π(s,a) = E_π[G_t | S_t=s, A_t=a] — expected return from state s, taking action a, then following π. Key difference: V_π averages over all actions; Q_π conditions on a specific action. Q_π is more useful for policy improvement since it tells us which action is best.' },
                { q: 'What is the relationship between V_π(s) and Q_π(s,a)?', a: 'V_π(s) = Σ_a π(a|s) Q_π(s,a) — state value is the policy-weighted average of Q-values. Q_π(s,a) = Σ_s\' P(s\'|s,a)[R(s,a,s\') + γV_π(s\')] — Q-value is expected immediate reward plus discounted next state value. These relationships form the basis of the Bellman equations.' },
                { q: 'Why is Q_π(s,a) more useful than V_π(s) for policy improvement?', a: 'V_π(s) tells us how good a state is, but not which action to take. To improve the policy using V_π, we need the transition model P(s\'|s,a). Q_π(s,a) directly tells us how good each action is in each state — no model needed. Policy improvement: π\'(s) = argmax_a Q_π(s,a). This is why Q-learning (model-free) uses Q-values, not V-values.' },
                { q: 'Calculate V_π(s) if Q_π(s,a1)=5, Q_π(s,a2)=3 and π(a1|s)=0.6, π(a2|s)=0.4.', a: 'V_π(s) = Σ_a π(a|s)Q_π(s,a) = π(a1|s)×Q(s,a1) + π(a2|s)×Q(s,a2) = 0.6×5 + 0.4×3 = 3.0 + 1.2 = 4.2. This is the expected Q-value under the current policy. If we switch to greedy policy (always take a1): V_π\'(s) = Q(s,a1) = 5 > 4.2, confirming policy improvement.' },
                { q: 'What is the optimal value function V*(s)?', a: 'V*(s) = max_π V_π(s) — the maximum expected return achievable from state s over all possible policies. Similarly, Q*(s,a) = max_π Q_π(s,a). The optimal policy π* satisfies: π*(s) = argmax_a Q*(s,a). Finding V* or Q* is the goal of RL. Once Q* is known, the optimal policy is simply greedy with respect to Q*.' },
            ]} />
        </div>
    );
}
