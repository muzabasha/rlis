import React, { useState } from 'react';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import QuestionAccordion from '../../components/topic/QuestionAccordion';
import { BookOpen, Calculator } from 'lucide-react';

export default function Topic5_OptimalPolicy() {
    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Chess Grandmaster" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">♟️ What Makes a Chess Move "Optimal"?</h3>
                    <p className="text-slate-700 dark:text-slate-300">A grandmaster doesn't just pick the move that captures the most pieces right now. They pick the move that leads to the best position 10 moves later. The optimal policy in RL works the same way — it's the strategy that maximizes long-term cumulative reward, not just immediate reward.</p>
                    <InfoCard type="definition" title="Optimal Policy">
                        A policy π* is optimal if V_π*(s) ≥ V_π(s) for all states s and all policies π. The optimal policy is greedy with respect to the optimal Q-function: π*(s) = argmax_a Q*(s,a).
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — Bellman Optimality Equations" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-5">
                    <MathBlock formula="V^*(s) = \max_a \sum_{s'} \mathcal{P}(s'|s,a)\left[\mathcal{R}(s,a,s') + \gamma V^*(s')\right]" label="Bellman Optimality Equation for V*" explanation="Optimal state value = best action's expected immediate reward + discounted optimal next state value" />
                    <MathBlock formula="Q^*(s,a) = \sum_{s'} \mathcal{P}(s'|s,a)\left[\mathcal{R}(s,a,s') + \gamma \max_{a'} Q^*(s',a')\right]" label="Bellman Optimality Equation for Q*" explanation="Optimal Q-value = expected reward + discounted best Q-value in next state" />
                    <MathBlock formula="\pi^*(s) = \arg\max_a Q^*(s,a)" label="Optimal Policy" explanation="Always take the action with highest Q* value — greedy policy" />

                    <InfoCard type="tip" title="Value Iteration Algorithm">
                        Solve Bellman optimality by iterating: {'V_{k + 1}(s) = max_a Σ P(s\'|s,a)[R + γV_k(s\')]'}. Repeat until convergence. This is guaranteed to converge to V* for finite MDPs.
                    </InfoCard>

                    <div className="card p-5">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Numerical Example: 3-State MDP</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">States: S1, S2 (goal), S3 (trap). Actions: Go, Stay. γ=0.9.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead><tr className="bg-slate-50 dark:bg-slate-800">
                                    {['State', 'Action', 'Next State', 'Reward', 'Q*(s,a)'].map(h => <th key={h} className="text-left p-2 font-semibold text-slate-700 dark:text-slate-300 text-xs">{h}</th>)}
                                </tr></thead>
                                <tbody>
                                    {[
                                        ['S1', 'Go', 'S2', '+10', '9.0'],
                                        ['S1', 'Stay', 'S1', '-1', '-2.5'],
                                        ['S2', '—', 'Terminal', '+0', '0 (terminal)'],
                                        ['S3', 'Go', 'S1', '-5', '-3.5'],
                                    ].map((row, i) => (
                                        <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                                            {row.map((cell, j) => <td key={j} className="p-2 text-slate-600 dark:text-slate-400 text-xs">{cell}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Optimal policy: π*(S1)=Go, π*(S3)=Go. Both lead toward the goal.</p>
                    </div>
                </div>
            </SectionWrapper>

            <QuestionAccordion questions={[
                { q: 'What is an optimal policy in MDP? How is it defined mathematically?', a: 'A policy π* is optimal if V_π*(s) ≥ V_π(s) for all states s and all policies π. Mathematically: π*(s) = argmax_a Q*(s,a) — always take the action with highest optimal Q-value. Key property: there always exists at least one deterministic optimal policy for finite MDPs (Bellman, 1957).' },
                { q: 'State the Bellman Optimality Equation for V*(s).', a: 'V*(s) = max_a Σ_s\' P(s\'|s,a)[R(s,a,s\') + γV*(s\')]. This says: the optimal value of state s equals the value of the best action — the one that maximizes expected immediate reward plus discounted optimal value of the next state. It\'s a system of nonlinear equations (due to max) that can be solved by value iteration.' },
                { q: 'How does value iteration find the optimal policy?', a: 'Value Iteration: (1) Initialize V_0(s)=0 for all s. (2) Update: V_{k+1}(s) = max_a Σ P(s\'|s,a)[R + γV_k(s\')]. (3) Repeat until |V_{k+1}-V_k| < ε. (4) Extract policy: π*(s) = argmax_a Σ P(s\'|s,a)[R + γV*(s\')]. Convergence guaranteed for γ<1. Complexity: O(|S|²|A|) per iteration.' },
                { q: 'What is the difference between policy evaluation and policy improvement?', a: 'Policy Evaluation: compute V_π(s) for a fixed policy π. Solve Bellman expectation equations. Policy Improvement: given V_π, find better policy π\' by acting greedily: π\'(s) = argmax_a Q_π(s,a). Policy Iteration alternates between these two steps until convergence to π*. Guaranteed to converge in finite steps for finite MDPs.' },
                { q: 'Why is the Bellman Optimality Equation nonlinear?', a: 'The Bellman equation for V_π is linear (expectation over policy). The Bellman Optimality Equation is nonlinear because of the max operator: V*(s) = max_a [...]. The max makes it a nonlinear system of equations. This is why we cannot solve it directly with linear algebra — we need iterative methods (value iteration, policy iteration) or approximation methods (Q-learning, DQN).' },
            ]} />
        </div>
    );
}
