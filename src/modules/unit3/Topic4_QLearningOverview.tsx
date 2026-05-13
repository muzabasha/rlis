import React, { useState, useEffect, useRef } from 'react';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import QuestionAccordion from '../../components/topic/QuestionAccordion';
import { BookOpen, Calculator, FlaskConical } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simple 4-state Q-learning demo
const STATES = 4; const GOAL = 3;
function qLearnStep(Q: number[][], s: number, eps: number, alpha: number, gamma: number) {
    const a = Math.random() < eps ? Math.floor(Math.random() * 2) : (Q[s][0] >= Q[s][1] ? 0 : 1);
    const ns = Math.min(STATES - 1, s + (a === 0 ? 1 : -1));
    const r = ns === GOAL ? 10 : -0.1;
    const done = ns === GOAL;
    const target = r + gamma * Math.max(...Q[ns]);
    const newQ = Q.map(row => [...row]);
    newQ[s][a] += alpha * (target - Q[s][a]);
    return { newQ, ns: done ? 0 : ns, r, done };
}

export default function Topic4_QLearningOverview() {
    const [Q, setQ] = useState<number[][]>(Array.from({ length: STATES }, () => [0, 0]));
    const [pos, setPos] = useState(0);
    const [ep, setEp] = useState(0);
    const [eps, setEps] = useState(0.3);
    const [alpha, setAlpha] = useState(0.1);
    const [gamma, setGamma] = useState(0.9);
    const [running, setRunning] = useState(false);
    const [history, setHistory] = useState<{ ep: number; reward: number }[]>([]);
    const runRef = useRef(false);
    const stateRef = useRef({ Q, pos, ep, eps, alpha, gamma });
    stateRef.current = { Q, pos, ep, eps, alpha, gamma };

    useEffect(() => {
        if (!running) { runRef.current = false; return; }
        runRef.current = true;
        let localQ = [...Q.map(r => [...r])], localPos = pos, localEp = ep, cumR = 0, steps = 0;
        const interval = setInterval(() => {
            if (!runRef.current) { clearInterval(interval); return; }
            const { newQ, ns, r, done } = qLearnStep(localQ, localPos, stateRef.current.eps, stateRef.current.alpha, stateRef.current.gamma);
            localQ = newQ; localPos = ns; cumR += r; steps++;
            if (done || steps >= 20) {
                localEp++;
                setHistory(h => [...h.slice(-49), { ep: localEp, reward: parseFloat(cumR.toFixed(2)) }]);
                setEp(localEp); setQ(localQ); setPos(0); localPos = 0; cumR = 0; steps = 0;
            } else { setQ(localQ); setPos(localPos); }
        }, 200);
        return () => clearInterval(interval);
    }, [running]);

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Treasure Hunter" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">💎 Learning the Value of Every Move</h3>
                    <p className="text-slate-700 dark:text-slate-300">A treasure hunter explores a dungeon. They don't know where the treasure is. After each move, they note: "From room 3, going right gave me +10 gold." They build a table of (room, direction) → expected gold. After many explorations, they know the best direction from every room. This table is the Q-table — the heart of Q-learning!</p>
                    <InfoCard type="definition" title="Q-Learning (Watkins, 1989)">
                        Q-learning is a model-free, off-policy RL algorithm that learns the optimal action-value function Q*(s,a) directly from experience, without needing the environment model P(s'|s,a).
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — Q-Learning Algorithm" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-5">
                    <MathBlock formula="Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[R_{t+1} + \gamma \max_{a'} Q(S_{t+1}, a') - Q(S_t, A_t)\right]" label="Q-Learning Update Rule" explanation="Update Q-value toward the Bellman target: immediate reward + discounted best future Q-value" />
                    <SymbolTable symbols={[
                        { symbol: 'Q(S_t,A_t)', meaning: 'Current Q-value estimate for (state, action)', unit: 'ℝ' },
                        { symbol: '\\alpha', meaning: 'Learning rate — how fast to update Q-values', unit: '(0,1]' },
                        { symbol: 'R_{t+1}', meaning: 'Immediate reward received', unit: 'ℝ' },
                        { symbol: '\\gamma', meaning: 'Discount factor', unit: '[0,1)' },
                        { symbol: '\\max_{a\'} Q(S_{t+1},a\')', meaning: 'Best Q-value in next state (greedy)', unit: 'ℝ' },
                        { symbol: 'TD\\ Error', meaning: 'R_{t+1} + γ max Q(s\',a\') - Q(s,a) — the update signal', unit: 'ℝ' },
                    ]} />

                    <div className="card p-5">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Q-Learning Algorithm (Pseudocode)</h4>
                        <pre className="bg-slate-900 text-emerald-400 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed">{`Initialize Q(s,a) = 0 for all s, a
For each episode:
  Initialize S (start state)
  For each step t:
    Choose A from S using ε-greedy policy
    Take action A, observe R, S'
    Q(S,A) ← Q(S,A) + α[R + γ·max_a' Q(S',a') - Q(S,A)]
    S ← S'
  Until S is terminal`}</pre>
                    </div>

                    <InfoCard type="tip" title="Why Off-Policy?">
                        Q-learning is off-policy because the update uses max_a' Q(s',a') — the greedy action — regardless of what action the agent actually took (which might be random due to ε-greedy). The behavior policy (ε-greedy) differs from the target policy (greedy). This allows learning from any experience, including demonstrations.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="lab" title="Section 6 — Virtual Lab: Q-Learning on 4-State Chain" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Interactive Lab" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                <div className="lab-block space-y-4">
                    <div className="grid sm:grid-cols-3 gap-3 mb-2">
                        {[{ label: 'ε', val: eps, set: setEps, min: 0, max: 1, step: 0.05 }, { label: 'α', val: alpha, set: setAlpha, min: 0.01, max: 1, step: 0.01 }, { label: 'γ', val: gamma, set: setGamma, min: 0.1, max: 0.99, step: 0.01 }].map(p => (
                            <div key={p.label}>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{p.label} = {p.val}</label>
                                <input type="range" min={p.min} max={p.max} step={p.step} value={p.val} onChange={e => p.set(parseFloat(e.target.value))} className="w-full accent-cyan-600" />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setRunning(r => !r)} className={`px-4 py-2 rounded-xl text-sm font-semibold ${running ? 'bg-amber-500 text-white' : 'bg-cyan-600 text-white'}`}>{running ? '⏸ Pause' : '▶ Train'}</button>
                        <button onClick={() => { setRunning(false); setQ(Array.from({ length: STATES }, () => [0, 0])); setPos(0); setEp(0); setHistory([]); }} className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">↺ Reset</button>
                    </div>
                    <div className="flex gap-2 items-center">
                        {Array.from({ length: STATES }, (_, i) => (
                            <React.Fragment key={i}>
                                <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center text-xs font-bold border-2 transition-all ${pos === i ? 'border-primary-500 bg-primary-100 dark:bg-primary-900/40' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                                    {i === GOAL ? '🏆' : i === 0 ? 'S' : i}
                                    <div className="text-xs text-slate-400 mt-0.5">{Q[i][0].toFixed(1)}</div>
                                </div>
                                {i < STATES - 1 && <div className="text-slate-400">→</div>}
                            </React.Fragment>
                        ))}
                        <div className="ml-2 text-xs text-slate-500 dark:text-slate-400">Ep: {ep}</div>
                    </div>
                    {history.length > 1 && (
                        <ResponsiveContainer width="100%" height={160}>
                            <LineChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="ep" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} />
                                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9', fontSize: '11px' }} />
                                <Line type="monotone" dataKey="reward" stroke="#10b981" name="Episode Reward" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </SectionWrapper>

            <QuestionAccordion questions={[
                { q: 'What is Q-learning? State its update rule.', a: 'Q-learning (Watkins, 1989) is a model-free, off-policy RL algorithm that learns Q*(s,a) directly from experience. Update rule: Q(S,A) ← Q(S,A) + α[R + γ·max_a\' Q(S\',a\') - Q(S,A)]. The term [R + γ·max Q(S\',a\')] is the Bellman target. The difference [target - Q(S,A)] is the TD error. Q-learning converges to Q* for any ε-greedy behavior policy with sufficient exploration.' },
                { q: 'What is the TD error in Q-learning? What does it represent?', a: 'TD error δ = R_{t+1} + γ·max_a\' Q(S_{t+1},a\') - Q(S_t,A_t). It represents the difference between the current Q-value estimate and the Bellman target. Positive δ: current Q underestimates — increase Q. Negative δ: current Q overestimates — decrease Q. The learning rate α controls how much to adjust: Q ← Q + α·δ. TD error is also used in neuroscience as a model of dopamine signals.' },
                { q: 'Why is Q-learning called "off-policy"?', a: 'Off-policy: the policy used to generate experience (behavior policy) differs from the policy being learned (target policy). In Q-learning: behavior policy = ε-greedy (explores randomly). Target policy = greedy (max_a Q). The update uses max_a\' Q(s\',a\') — the greedy action — regardless of what was actually done. This allows learning from any data, including demonstrations or old experience (experience replay).' },
                { q: 'What are the hyperparameters of Q-learning? How do they affect learning?', a: '(1) α (learning rate): high α = fast but unstable; low α = slow but stable. Typical: 0.1-0.5. (2) γ (discount): high γ = far-sighted; low γ = myopic. Typical: 0.9-0.99. (3) ε (exploration): high ε = more exploration; low ε = more exploitation. Decay ε over time. (4) Q-table initialization: optimistic initialization (high values) encourages exploration.' },
                { q: 'Under what conditions does Q-learning converge to Q*?', a: 'Q-learning converges to Q* if: (1) All (s,a) pairs are visited infinitely often (sufficient exploration), (2) Learning rate satisfies Robbins-Monro conditions: Σα_t = ∞ and Σα_t² < ∞ (e.g., α_t = 1/t), (3) Rewards are bounded, (4) γ < 1. In practice: use ε-greedy with decaying ε, constant small α (e.g., 0.1), and sufficient training episodes.' },
            ]} />
        </div>
    );
}
