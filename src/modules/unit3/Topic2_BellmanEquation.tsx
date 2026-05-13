import React, { useState } from 'react';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import QuestionAccordion from '../../components/topic/QuestionAccordion';
import { BookOpen, Calculator } from 'lucide-react';

export default function Topic2_BellmanEquation() {
    const [gamma, setGamma] = useState(0.9);
    const [r, setR] = useState(5);
    const [vNext, setVNext] = useState(10);
    const bellmanV = parseFloat((r + gamma * vNext).toFixed(3));

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Recursive Recipe" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">🍲 A Recipe That References Itself</h3>
                    <p className="text-slate-700 dark:text-slate-300">Imagine a recipe that says: "The quality of today's dish = today's ingredients + 90% of tomorrow's dish quality." This self-referential definition is exactly the Bellman Equation — the value of a state depends on the value of future states. Richard Bellman discovered this in 1957, and it became the foundation of all RL algorithms.</p>
                    <InfoCard type="definition" title="Bellman Equation — The Core of RL">
                        The Bellman equation expresses the value of a state as a function of the values of successor states. It's a recursive decomposition of the return G_t = R_t+1 + γG_t+1.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — Bellman Equations (Expectation & Optimality)" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-5">
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Bellman Expectation Equation for V_π</h4>
                        <MathBlock formula="V_\pi(s) = \sum_a \pi(a|s) \sum_{s'} \mathcal{P}(s'|s,a)\left[\mathcal{R}(s,a,s') + \gamma V_\pi(s')\right]" label="Bellman Expectation — V_π" explanation="Value of state s = expected immediate reward + discounted value of next state, averaged over policy and transitions" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Bellman Expectation Equation for Q_π</h4>
                        <MathBlock formula="Q_\pi(s,a) = \sum_{s'} \mathcal{P}(s'|s,a)\left[\mathcal{R}(s,a,s') + \gamma \sum_{a'} \pi(a'|s') Q_\pi(s',a')\right]" label="Bellman Expectation — Q_π" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Bellman Optimality Equations</h4>
                        <MathBlock formula="V^*(s) = \max_a \sum_{s'} \mathcal{P}(s'|s,a)\left[\mathcal{R}(s,a,s') + \gamma V^*(s')\right]" label="Bellman Optimality — V*" />
                        <MathBlock formula="Q^*(s,a) = \sum_{s'} \mathcal{P}(s'|s,a)\left[\mathcal{R}(s,a,s') + \gamma \max_{a'} Q^*(s',a')\right]" label="Bellman Optimality — Q*" />
                    </div>

                    <SymbolTable symbols={[
                        { symbol: 'V_\\pi(s)', meaning: 'Value of state s under policy π', unit: 'ℝ' },
                        { symbol: 'Q_\\pi(s,a)', meaning: 'Value of (state s, action a) under policy π', unit: 'ℝ' },
                        { symbol: '\\mathcal{P}(s\'|s,a)', meaning: 'Transition probability', unit: '[0,1]' },
                        { symbol: '\\mathcal{R}(s,a,s\')', meaning: 'Reward for transition', unit: 'ℝ' },
                    ]} />

                    <div className="lab-block">
                        <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">🧮 Bellman Calculator</h4>
                        <div className="grid sm:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Reward R = {r}</label>
                                <input type="range" min="-10" max="10" step="0.5" value={r} onChange={e => setR(parseFloat(e.target.value))} className="w-full accent-cyan-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">V(s') = {vNext}</label>
                                <input type="range" min="0" max="20" step="0.5" value={vNext} onChange={e => setVNext(parseFloat(e.target.value))} className="w-full accent-cyan-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">γ = {gamma}</label>
                                <input type="range" min="0" max="0.99" step="0.01" value={gamma} onChange={e => setGamma(parseFloat(e.target.value))} className="w-full accent-cyan-600" />
                            </div>
                        </div>
                        <div className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-4 text-center">
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">V(s) = R + γ·V(s') = {r} + {gamma}×{vNext}</div>
                            <div className="text-3xl font-black text-primary-600 dark:text-primary-400">{bellmanV}</div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            <QuestionAccordion questions={[
                { q: 'State the Bellman Expectation Equation for V_π(s).', a: 'V_π(s) = Σ_a π(a|s) Σ_s\' P(s\'|s,a)[R(s,a,s\') + γV_π(s\')]. This says: value of state s = expected (over policy and transitions) immediate reward + discounted value of next state. It\'s a linear system of |S| equations in |S| unknowns — solvable by matrix inversion or iterative methods.' },
                { q: 'What is the difference between Bellman Expectation and Bellman Optimality equations?', a: 'Bellman Expectation: evaluates a specific policy π. Linear equations (expectation over π). Solved by policy evaluation. Bellman Optimality: finds the best policy. Nonlinear equations (max over actions). Solved by value iteration or policy iteration. The optimality equations have a unique solution V* for γ<1.' },
                { q: 'How is the Bellman equation used in Q-learning?', a: 'Q-learning uses the Bellman optimality equation for Q*: Q*(s,a) = Σ P(s\'|s,a)[R + γ max_a\' Q*(s\',a\')]. The update rule: Q(s,a) ← Q(s,a) + α[R + γ max_a\' Q(s\',a\') - Q(s,a)]. The term [R + γ max_a\' Q(s\',a\')] is the Bellman target. Q-learning converges to Q* without needing the transition model P.' },
                { q: 'Solve the Bellman equation for a 2-state MDP: V(s1)=R1+γV(s2), V(s2)=R2+γV(s1) with R1=2, R2=3, γ=0.5.', a: 'V(s1) = 2 + 0.5V(s2) ... (1). V(s2) = 3 + 0.5V(s1) ... (2). Substitute (2) into (1): V(s1) = 2 + 0.5(3 + 0.5V(s1)) = 2 + 1.5 + 0.25V(s1). 0.75V(s1) = 3.5. V(s1) = 4.67. V(s2) = 3 + 0.5×4.67 = 5.33.' },
                { q: 'What is the backup diagram for the Bellman equation?', a: 'A backup diagram shows the relationship between a state\'s value and its successors. For V_π(s): root node = state s, branches = actions (weighted by π), leaf nodes = next states s\' (weighted by P). The value "backs up" from leaves to root. For Q_π(s,a): root = (s,a) pair, branches = next states, leaves = next (s\',a\') pairs. Backup diagrams visualize the recursive structure of Bellman equations.' },
            ]} />
        </div>
    );
}
