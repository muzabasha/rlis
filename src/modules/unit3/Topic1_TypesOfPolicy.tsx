import React, { useState } from 'react';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import QuestionAccordion from '../../components/topic/QuestionAccordion';
import { BookOpen, Calculator } from 'lucide-react';

export default function Topic1_TypesOfPolicy() {
    const [pA, setPA] = useState(0.7);
    const pB = parseFloat((1 - pA).toFixed(2));

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Decisive vs Indecisive Manager" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">👔 Two Managers, Two Decision Styles</h3>
                    <p className="text-slate-700 dark:text-slate-300">Manager A always assigns Project X to Engineer 1 — no exceptions. This is a <strong>deterministic policy</strong>. Manager B assigns Project X to Engineer 1 with 70% probability and Engineer 2 with 30% — based on workload. This is a <strong>stochastic policy</strong>. Both are valid strategies. RL uses both!</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="definition" title="Deterministic Policy">
                            π(s) = a — maps each state to exactly one action. No randomness. Used in Q-learning (greedy policy). Simpler but can get stuck in local optima.
                        </InfoCard>
                        <InfoCard type="info" title="Stochastic Policy">
                            π(a|s) = probability of taking action a in state s. Σ_a π(a|s) = 1. Used in policy gradient methods. Enables exploration naturally.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — Policy Mathematics" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-5">
                    <MathBlock formula="\pi: \mathcal{S} \rightarrow \mathcal{A} \quad \text{(Deterministic)}" label="Deterministic Policy" explanation="Maps each state directly to one action" />
                    <MathBlock formula="\pi: \mathcal{S} \times \mathcal{A} \rightarrow [0,1] \quad \text{s.t.} \sum_a \pi(a|s) = 1 \quad \text{(Stochastic)}" label="Stochastic Policy" explanation="Maps each (state, action) pair to a probability. Must sum to 1 over actions." />
                    <MathBlock formula="\pi_\theta(a|s) = \frac{e^{\theta_a \cdot \phi(s)}}{\sum_{a'} e^{\theta_{a'} \cdot \phi(s)}}" label="Softmax Policy (Parameterized)" explanation="Common parameterization for stochastic policies using softmax over action preferences" />

                    <div className="lab-block">
                        <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">🎲 Interactive Stochastic Policy</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Adjust probability of Action A. Action B gets the remainder.</p>
                        <div className="mb-3">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">π(A|s) = {pA} | π(B|s) = {pB}</label>
                            <input type="range" min="0" max="1" step="0.05" value={pA} onChange={e => setPA(parseFloat(e.target.value))} className="w-full accent-cyan-600" />
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 bg-blue-100 dark:bg-blue-900/40 rounded-xl p-3 text-center">
                                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{(pA * 100).toFixed(0)}%</div>
                                <div className="text-xs text-slate-500">Action A</div>
                            </div>
                            <div className="flex-1 bg-violet-100 dark:bg-violet-900/40 rounded-xl p-3 text-center">
                                <div className="text-2xl font-black text-violet-600 dark:text-violet-400">{(pB * 100).toFixed(0)}%</div>
                                <div className="text-xs text-slate-500">Action B</div>
                            </div>
                        </div>
                        <InfoCard type="tip" title="When to Use Each">
                            Deterministic: Q-learning, value-based methods, exploitation phase. Stochastic: policy gradient, actor-critic, exploration, games with mixed strategies (poker). Optimal policy for MDPs is always deterministic. Stochastic policies are needed for POMDPs and multi-agent games.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            <QuestionAccordion questions={[
                { q: 'What is the difference between a deterministic and stochastic policy?', a: 'Deterministic policy π(s)=a: maps each state to exactly one action. No randomness. Example: always go right when goal is to the right. Stochastic policy π(a|s): maps each state to a probability distribution over actions. Example: go right with 80%, explore left with 20%. Deterministic policies are simpler; stochastic policies enable exploration and are needed for POMDPs and game theory.' },
                { q: 'Why might a stochastic policy be preferred over a deterministic one?', a: '(1) Exploration: stochastic policies naturally explore by sometimes taking non-greedy actions. (2) POMDPs: when state is partially observed, randomization can be optimal. (3) Game theory: in adversarial settings (poker), deterministic policies are exploitable — mixed strategies are optimal. (4) Policy gradient methods: require differentiable, stochastic policies for gradient computation.' },
                { q: 'What is a parameterized policy? Give an example.', a: 'A parameterized policy π_θ(a|s) is a policy represented by parameters θ (e.g., neural network weights). Example: softmax policy π_θ(a|s) = exp(θ_a·φ(s)) / Σ exp(θ_a\'·φ(s)). Parameters θ are optimized using policy gradient methods (REINFORCE, PPO). This enables learning complex policies for high-dimensional state/action spaces.' },
                { q: 'What is the greedy policy with respect to Q-values?', a: 'Greedy policy: π(s) = argmax_a Q(s,a) — always take the action with highest Q-value. It\'s deterministic. Used in Q-learning after training (exploitation). During training, ε-greedy is used: greedy with prob (1-ε), random with prob ε. The optimal policy π* is greedy with respect to Q*: π*(s) = argmax_a Q*(s,a).' },
                { q: 'How does policy improvement work in policy iteration?', a: 'Policy Improvement Theorem: given policy π, define π\'(s) = argmax_a Q_π(s,a). Then V_π\'(s) ≥ V_π(s) for all s. Proof: V_π\'(s) = Q_π(s,π\'(s)) = max_a Q_π(s,a) ≥ Q_π(s,π(s)) = V_π(s). Policy iteration: (1) Evaluate π to get V_π, (2) Improve: π\'(s)=argmax_a Q_π(s,a), (3) Repeat until π\'=π (convergence to π*).' },
            ]} />
        </div>
    );
}
