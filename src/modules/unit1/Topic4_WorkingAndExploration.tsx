import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, FlaskConical, HelpCircle, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function EpsilonGreedySimulator() {
    const [epsilon, setEpsilon] = useState(0.3);
    const [episodes, setEpisodes] = useState(200);
    const [running, setRunning] = useState(false);
    const [data, setData] = useState<{ ep: number; reward: number; cumAvg: number }[]>([]);
    const runRef = useRef(false);

    // 5-armed bandit: true means [2.1, 1.5, 3.0, 0.8, 2.5]
    const trueRewards = [2.1, 1.5, 3.0, 0.8, 2.5];

    const simulate = async () => {
        runRef.current = true;
        setRunning(true);
        setData([]);
        const Q = [0, 0, 0, 0, 0];
        const N = [0, 0, 0, 0, 0];
        let cumSum = 0;
        const results: typeof data = [];

        for (let ep = 1; ep <= episodes; ep++) {
            if (!runRef.current) break;
            let action: number;
            if (Math.random() < epsilon) {
                action = Math.floor(Math.random() * 5);
            } else {
                action = Q.indexOf(Math.max(...Q));
            }
            const reward = trueRewards[action] + (Math.random() - 0.5) * 1.5;
            N[action]++;
            Q[action] += (reward - Q[action]) / N[action];
            cumSum += reward;
            results.push({ ep, reward: parseFloat(reward.toFixed(2)), cumAvg: parseFloat((cumSum / ep).toFixed(3)) });
            if (ep % 10 === 0) {
                setData([...results]);
                await new Promise(r => setTimeout(r, 20));
            }
        }
        setData([...results]);
        setRunning(false);
    };

    return (
        <div className="lab-block space-y-4">
            <h4 className="font-bold text-cyan-900 dark:text-cyan-100">🎰 Multi-Armed Bandit: ε-Greedy Simulator</h4>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Epsilon ε = {epsilon} (exploration rate)</label>
                    <input type="range" min="0" max="1" step="0.05" value={epsilon} onChange={e => setEpsilon(parseFloat(e.target.value))} className="w-full accent-cyan-600" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0 (pure exploit)</span><span>1 (pure explore)</span></div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Episodes = {episodes}</label>
                    <input type="range" min="50" max="500" step="50" value={episodes} onChange={e => setEpisodes(parseInt(e.target.value))} className="w-full accent-cyan-600" />
                </div>
            </div>
            <button onClick={simulate} disabled={running} className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${running ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}`}>
                {running ? '⏳ Simulating...' : '▶ Run Simulation'}
            </button>
            {data.length > 0 && (
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="ep" label={{ value: 'Episode', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }} />
                        <Legend />
                        <Line type="monotone" dataKey="reward" stroke="#94a3b8" name="Episode Reward" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="cumAvg" stroke="#10b981" name="Cumulative Avg" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            )}
            <InfoCard type="success" title="What to Observe">
                With ε=0 (pure exploit): fast convergence but may get stuck on suboptimal arm. With ε=1 (pure explore): never converges. Optimal ε ≈ 0.1–0.3 balances both. The best arm has true reward = 3.0 (arm 3).
            </InfoCard>
        </div>
    );
}

export default function Topic4_WorkingAndExploration() {
    const [openQ, setOpenQ] = useState<Record<number, boolean>>({});

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Gold Miner's Dilemma" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">⛏️ You're a Gold Miner with 5 Mines</h3>
                    <p className="text-slate-700 dark:text-slate-300">You have 5 mines. Mine 1 gave you 2kg gold yesterday. You don't know the others. Do you go back to Mine 1 (exploit) or try Mine 2 (explore)?</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
                            <div className="font-bold text-amber-800 dark:text-amber-200 mb-2">🎯 Pure Exploitation</div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Always go to Mine 1. Safe — guaranteed 2kg. But Mine 3 might have 10kg! You'll never know.</p>
                            <div className="mt-2 text-xs bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-2 rounded-lg">Risk: Stuck in local optimum</div>
                        </div>
                        <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
                            <div className="font-bold text-amber-800 dark:text-amber-200 mb-2">🔍 Pure Exploration</div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Try a different mine every day. You'll eventually find Mine 3 (10kg) but waste days on Mine 4 (0.5kg).</p>
                            <div className="mt-2 text-xs bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-2 rounded-lg">Risk: Never converges to best</div>
                        </div>
                    </div>
                    <InfoCard type="success" title="The ε-Greedy Solution">
                        With probability ε (e.g., 0.1): explore randomly. With probability (1-ε): exploit the best known mine. Start with high ε (explore more early), decay ε over time (exploit more as you learn). This is the foundation of most RL exploration strategies.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — RL Working & Exploration Math" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">The RL Working Loop</h4>
                        <MathBlock formula="S_t \xrightarrow{\pi(a|s)} A_t \xrightarrow{\mathcal{P}} S_{t+1}, R_{t+1} \xrightarrow{\text{update}} \pi" label="RL Interaction Cycle" explanation="Observe state → select action via policy → receive reward and new state → update policy" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">ε-Greedy Action Selection</h4>
                        <MathBlock formula="A_t = \begin{cases} \arg\max_a Q(S_t, a) & \text{with probability } 1-\varepsilon \\ \text{random action} & \text{with probability } \varepsilon \end{cases}" label="ε-Greedy Policy" explanation="Exploit best known action with prob (1-ε), explore randomly with prob ε" />
                        <SymbolTable symbols={[
                            { symbol: '\\varepsilon', meaning: 'Exploration rate — probability of random action', unit: '[0,1]' },
                            { symbol: 'Q(S_t, a)', meaning: 'Estimated action-value for state S_t, action a', unit: 'ℝ' },
                            { symbol: '\\arg\\max_a', meaning: 'Action that maximizes Q-value (greedy choice)', unit: 'Action' },
                        ]} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Epsilon Decay Schedule</h4>
                        <MathBlock formula="\varepsilon_t = \varepsilon_{\min} + (\varepsilon_{\max} - \varepsilon_{\min}) \cdot e^{-\lambda t}" label="Exponential Epsilon Decay" explanation="ε starts high (explore) and decays exponentially toward ε_min (exploit)" />
                        <InfoCard type="tip" title="Typical Values">
                            ε_max = 1.0, ε_min = 0.01, λ = 0.001. After 1000 steps: ε ≈ 0.38. After 5000 steps: ε ≈ 0.01. The agent transitions from explorer to exploiter.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper id="lab" title="Section 6 — Virtual Lab: ε-Greedy Bandit" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Interactive Lab" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                <EpsilonGreedySimulator />
            </SectionWrapper>

            <SectionWrapper id="questions" title="Section 5 — Model 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Question Bank" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500" defaultOpen={false}>
                <div className="space-y-3">
                    {[
                        { q: 'Explain the Exploration vs Exploitation trade-off in RL.', a: 'Exploitation: use current best-known action to maximize immediate reward. Exploration: try unknown actions to potentially discover better strategies. Too much exploitation → local optima. Too much exploration → never converges. The ε-greedy strategy balances both: explore with probability ε, exploit with probability (1-ε). ε is typically decayed over time.' },
                        { q: 'What is the ε-greedy strategy? Write its mathematical formulation.', a: 'ε-greedy selects the greedy (best known) action with probability (1-ε) and a random action with probability ε. Mathematically: A_t = argmax_a Q(S_t,a) with prob (1-ε), random action with prob ε. This ensures the agent always has some probability of exploring, preventing permanent convergence to suboptimal policies.' },
                        { q: 'Describe the working of RL in 4 steps.', a: '(1) Observe: agent observes current state S_t from environment. (2) Act: agent selects action A_t using policy π (ε-greedy or other). (3) Receive: environment returns reward R_{t+1} and new state S_{t+1}. (4) Update: agent updates its policy/value function based on (S_t, A_t, R_{t+1}, S_{t+1}). This cycle repeats until convergence or episode end.' },
                        { q: 'What is the multi-armed bandit problem? How does it relate to RL?', a: 'Multi-armed bandit: k slot machines (arms), each with unknown reward distribution. Goal: maximize total reward over T pulls. It\'s a simplified RL problem with no state transitions — just action selection and reward. It isolates the exploration-exploitation trade-off. Solutions (ε-greedy, UCB, Thompson Sampling) directly apply to full RL.' },
                        { q: 'Why does epsilon need to decay over time in RL?', a: 'Early in training: agent knows little, so high ε (explore more) is beneficial to discover the environment. Late in training: agent has learned good estimates, so low ε (exploit more) maximizes reward. Decaying ε implements this: start with ε=1 (fully random), decay to ε=0.01 (mostly greedy). Without decay, the agent keeps making random mistakes even after learning.' },
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