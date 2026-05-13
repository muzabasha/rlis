import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, FlaskConical, HelpCircle } from 'lucide-react';

export default function Topic1_MDPComponents() {
    const [openQ, setOpenQ] = useState<Record<number, boolean>>({});
    const [activeState, setActiveState] = useState<string | null>(null);

    const mdpStates = [
        { id: 's1', label: 'Office', x: 80, y: 60, reward: -0.1 },
        { id: 's2', label: 'Corridor', x: 220, y: 60, reward: -0.1 },
        { id: 's3', label: 'Cafeteria', x: 360, y: 60, reward: +5 },
        { id: 's4', label: 'Stairs', x: 80, y: 160, reward: -1 },
        { id: 's5', label: 'Exit', x: 360, y: 160, reward: +10 },
    ];

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Office Navigation Story" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">🏢 You're a New Employee — Lost in the Office</h3>
                    <p className="text-slate-700 dark:text-slate-300">It's your first day. You need to reach the cafeteria. You're in the office. You can go left (corridor), right (stairs), or forward (exit). Each room is a <strong>state</strong>. Each movement is an <strong>action</strong>. Finding food gives you +5 reward. Taking stairs is tiring: -1. Each step costs -0.1 (time). This is a Markov Decision Process!</p>
                    <InfoCard type="definition" title="MDP — Formal Definition (Sutton & Barto, 2019)">
                        A Markov Decision Process is a tuple ⟨S, A, P, R, γ⟩ that provides a mathematical framework for modeling sequential decision-making problems where outcomes are partly random and partly under the control of a decision-maker.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — MDP: Key Components & Formal Definition" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-6">
                    <MathBlock formula="\text{MDP} = \langle \mathcal{S}, \mathcal{A}, \mathcal{P}, \mathcal{R}, \gamma \rangle" label="MDP 5-Tuple" explanation="A complete MDP is defined by these 5 components" />
                    <SymbolTable symbols={[
                        { symbol: '\\mathcal{S}', meaning: 'State space — finite or infinite set of all possible states', unit: 'Set' },
                        { symbol: '\\mathcal{A}', meaning: 'Action space — set of all actions available to the agent', unit: 'Set' },
                        { symbol: '\\mathcal{P}(s\'|s,a)', meaning: 'Transition probability — P(S_{t+1}=s\' | S_t=s, A_t=a)', unit: '[0,1]' },
                        { symbol: '\\mathcal{R}(s,a,s\')', meaning: 'Reward function — expected reward for transition (s,a,s\')', unit: 'ℝ' },
                        { symbol: '\\gamma', meaning: 'Discount factor — how much future rewards are valued', unit: '[0,1)' },
                    ]} />

                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Transition Probability (Dynamics)</h4>
                        <MathBlock formula="\mathcal{P}(s'|s,a) = \Pr(S_{t+1}=s' \mid S_t=s, A_t=a)" label="State Transition Probability" explanation="Probability of reaching state s' when taking action a in state s" />
                        <InfoCard type="info" title="Stochastic vs Deterministic">
                            Deterministic: P(s'|s,a) = 1 for exactly one s'. Stochastic: probability distributed over multiple next states. Example: slippery floor — intended action "right" might result in "right" (0.8), "up" (0.1), "down" (0.1).
                        </InfoCard>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Reward Function</h4>
                        <MathBlock formula="\mathcal{R}(s,a) = \mathbb{E}[R_{t+1} \mid S_t=s, A_t=a] = \sum_{s'} \mathcal{P}(s'|s,a) \cdot r(s,a,s')" label="Expected Reward" explanation="Expected immediate reward for taking action a in state s" />
                    </div>

                    {/* Interactive MDP Diagram */}
                    <div className="lab-block">
                        <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">🗺️ Interactive MDP: Office Navigation</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Click a state to see its reward value.</p>
                        <div className="relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden" style={{ height: 220 }}>
                            <svg width="100%" height="220" viewBox="0 0 440 220">
                                {/* Edges */}
                                {[['s1', 's2'], ['s2', 's3'], ['s1', 's4'], ['s4', 's5'], ['s2', 's5']].map(([a, b]) => {
                                    const from = mdpStates.find(s => s.id === a)!;
                                    const to = mdpStates.find(s => s.id === b)!;
                                    return <line key={a + b} x1={from.x + 40} y1={from.y + 20} x2={to.x + 40} y2={to.y + 20} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />;
                                })}
                                <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" /></marker></defs>
                                {/* Nodes */}
                                {mdpStates.map(s => (
                                    <g key={s.id} onClick={() => setActiveState(activeState === s.id ? null : s.id)} style={{ cursor: 'pointer' }}>
                                        <rect x={s.x} y={s.y} width={80} height={40} rx={8} fill={activeState === s.id ? '#3b82f6' : s.reward > 0 ? '#d1fae5' : '#fee2e2'} stroke={activeState === s.id ? '#1d4ed8' : '#94a3b8'} strokeWidth="2" />
                                        <text x={s.x + 40} y={s.y + 16} textAnchor="middle" fontSize="11" fontWeight="600" fill={activeState === s.id ? 'white' : '#374151'}>{s.label}</text>
                                        <text x={s.x + 40} y={s.y + 30} textAnchor="middle" fontSize="10" fill={s.reward > 0 ? '#059669' : '#dc2626'}>R={s.reward}</text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                        {activeState && (
                            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Selected: <strong>{mdpStates.find(s => s.id === activeState)?.label}</strong> — Reward: <strong>{mdpStates.find(s => s.id === activeState)?.reward}</strong>
                            </div>
                        )}
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper id="questions" title="Section 5 — Model 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Question Bank" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500" defaultOpen={false}>
                <div className="space-y-3">
                    {[
                        { q: 'Define MDP. What are its 5 key components?', a: 'MDP (Markov Decision Process) is a mathematical framework for sequential decision-making. 5 components: (1) S — State space: all possible situations, (2) A — Action space: all possible choices, (3) P(s\'|s,a) — Transition probability: dynamics of environment, (4) R(s,a) — Reward function: immediate feedback, (5) γ — Discount factor: importance of future rewards.' },
                        { q: 'What is the transition probability function P(s\'|s,a)? Give an example.', a: 'P(s\'|s,a) = Pr(S_{t+1}=s\' | S_t=s, A_t=a) — probability of reaching state s\' when taking action a in state s. Example: Robot on slippery floor. Action "move right": P(right|current,right)=0.8, P(up|current,right)=0.1, P(down|current,right)=0.1. Sum = 1.0. This captures environment stochasticity.' },
                        { q: 'How does MDP differ from a simple optimization problem?', a: 'Simple optimization: find x that maximizes f(x) — single decision, no time dimension. MDP: sequence of decisions over time, each affecting future states. Key differences: (1) State transitions — actions change the world, (2) Delayed rewards — consequences unfold over time, (3) Uncertainty — stochastic transitions, (4) Policy — must decide for every possible state, not just one.' },
                        { q: 'What is the role of the discount factor γ in MDP?', a: 'γ ∈ [0,1) controls how much future rewards are valued. γ=0: myopic — only immediate reward matters. γ→1: far-sighted — all future rewards equally valued. Mathematical role: ensures infinite-horizon returns are finite (geometric series). Practical role: models time preference (reward now > reward later). Typical value: γ=0.9 to 0.99.' },
                        { q: 'Formulate the office navigation problem as an MDP.', a: 'S = {Office, Corridor, Cafeteria, Stairs, Exit}. A = {Left, Right, Forward, Back}. P: deterministic (P=1 for intended transition). R: R(Cafeteria)=+5, R(Exit)=+10, R(Stairs)=-1, R(others)=-0.1 per step. γ=0.9. Goal: find policy π that maximizes expected return G_t = Σ γᵏ R_{t+k+1}.' },
                    ].map((item, i) => (
                        <div key={i} className="card overflow-hidden">
                            <button onClick={() => setOpenQ(p => ({ ...p, [i]: !p[i] }))} className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">Q{i + 1}</span>
                                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm flex-1">{item.q}</span>
                            </button>
                            <AnimatePresence>
                                {openQ[i] && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                        <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700 pt-3">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}