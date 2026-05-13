import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import QuestionAccordion from '../../components/topic/QuestionAccordion';
import { BookOpen, Calculator, FlaskConical } from 'lucide-react';

// Gambler's Problem simulation
function gamblerStep(capital: number, p: number, stake: number) {
    const win = Math.random() < p;
    return win ? Math.min(100, capital + stake) : Math.max(0, capital - stake);
}

export default function Topic5_QLearningCaseStudies() {
    const [capital, setCapital] = useState(50);
    const [p, setP] = useState(0.4);
    const [history, setHistory] = useState<number[]>([50]);
    const [gameOver, setGameOver] = useState(false);

    const bet = (stake: number) => {
        if (gameOver) return;
        const next = gamblerStep(capital, p, stake);
        setCapital(next);
        setHistory(h => [...h, next]);
        if (next === 0 || next === 100) setGameOver(true);
    };

    const reset = () => { setCapital(50); setHistory([50]); setGameOver(false); };

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Gambler's Dilemma" icon={<BookOpen size={20} className="text-amber-600" />} badge="Case Study" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">🎰 The Gambler in a Dungeon</h3>
                    <p className="text-slate-700 dark:text-slate-300">A gambler starts with ₹50. Each round, they bet any amount. Win (prob p): gain that amount. Lose (prob 1-p): lose that amount. Goal: reach ₹100. Ruin: reach ₹0. What's the optimal betting strategy? This is the Gambler's Problem — a classic RL benchmark from Sutton & Barto.</p>
                    <InfoCard type="tip" title="Optimal Strategy (p &lt; 0.5)">
                        When p &lt; 0.5 (unfavorable odds), the optimal strategy is bold play: bet as much as possible each round. This maximizes the probability of reaching ₹100 before going broke. Counterintuitive but mathematically proven!
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="lab" title="Section 6 — Virtual Lab: Gambler's Problem" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Interactive Lab" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                <div className="lab-block space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Win Probability p = {p}</label>
                            <input type="range" min="0.1" max="0.9" step="0.05" value={p} onChange={e => { setP(parseFloat(e.target.value)); reset(); }} className="w-full accent-cyan-600" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-3xl font-black text-primary-600 dark:text-primary-400">₹{capital}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">/ ₹100 goal</div>
                        </div>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full transition-all duration-300" style={{ width: `${capital}%` }} />
                    </div>

                    {!gameOver ? (
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Choose your bet (max: ₹{Math.min(capital, 100 - capital)}):</p>
                            <div className="flex gap-2 flex-wrap">
                                {[1, 5, 10, 25, Math.min(capital, 100 - capital)].filter((v, i, a) => a.indexOf(v) === i && v > 0).map(stake => (
                                    <button key={stake} onClick={() => bet(stake)} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold">Bet ₹{stake}</button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={`text-center p-4 rounded-xl ${capital === 100 ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}>
                            <div className="text-2xl mb-1">{capital === 100 ? '🏆 Won!' : '💀 Bankrupt!'}</div>
                            <button onClick={reset} className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold mt-2">Play Again</button>
                        </div>
                    )}

                    <div className="text-xs text-slate-500 dark:text-slate-400">History: {history.join(' → ')}</div>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — Q-Learning on Gambler's Problem" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">States: capital s ∈ {"{1,...,99}"}. Actions: stake a ∈ {"{1,...,min(s,100-s)}"}. Rewards: R=+1 if reach 100, R=0 otherwise. γ=1 (episodic).</p>
                    <MathBlock formula="V^*(s) = \max_{a} \left[ p \cdot V^*(\min(s+a,100)) + (1-p) \cdot V^*(\max(s-a,0)) \right]" label="Bellman Optimality for Gambler's Problem" explanation="Optimal value = best stake's expected value (win with prob p, lose with prob 1-p)" />
                    <InfoCard type="success" title="Key Insight">
                        The optimal policy for p=0.4 is bold play: always bet min(s, 100-s). For p=0.6 (favorable), the optimal policy is timid play: always bet 1. Q-learning discovers these policies automatically through experience.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <QuestionAccordion questions={[
                { q: 'Describe the Gambler\'s Problem as an MDP.', a: 'States: S = {0,1,...,100} where 0=bankrupt, 100=goal. Actions: A(s) = {1,...,min(s,100-s)} — possible stakes. Transitions: P(s+a|s,a)=p (win), P(s-a|s,a)=1-p (lose). Rewards: R=+1 if reach 100, R=0 otherwise. γ=1 (episodic). Terminal states: 0 and 100. Goal: find policy π*(s) = optimal stake to maximize probability of reaching 100.' },
                { q: 'What is the optimal policy for the Gambler\'s Problem when p=0.4?', a: 'When p<0.5 (unfavorable odds), optimal policy = bold play: stake = min(s, 100-s). Intuition: with unfavorable odds, you need to reach 100 quickly before losing everything. Bold play maximizes the probability of reaching 100 in fewer rounds. Mathematically: V*(s) = s/100 for bold play when p=0.5. For p=0.4, V*(s) < s/100 but bold play is still optimal.' },
                { q: 'How does Q-learning solve the Gambler\'s Problem?', a: 'Initialize Q(s,a)=0 for all states and stakes. For each episode: start at random capital s. Choose stake a using ε-greedy. Flip coin: win→s\'=s+a, lose→s\'=s-a. Reward: +1 if s\'=100, else 0. Update: Q(s,a) ← Q(s,a) + α[R + γ·max_a\' Q(s\',a\') - Q(s,a)]. After many episodes, Q converges to Q* and π*(s)=argmax_a Q(s,a) gives the optimal stake.' },
                { q: 'What are real-world applications of Q-learning?', a: '(1) Game playing: Atari DQN (Q-learning + neural network), (2) Robot navigation: grid world, maze solving, (3) Traffic signal control: optimize green light timing, (4) Resource management: cloud computing resource allocation, (5) Finance: portfolio rebalancing, (6) Healthcare: treatment dosage optimization. Q-learning is the foundation of DQN, which extended it to high-dimensional state spaces using neural networks.' },
                { q: 'What is the difference between Q-learning and SARSA?', a: 'Q-learning (off-policy): Q(s,a) ← Q(s,a) + α[R + γ·max_a\' Q(s\',a\') - Q(s,a)]. Uses greedy next action for update. SARSA (on-policy): Q(s,a) ← Q(s,a) + α[R + γ·Q(s\',a\') - Q(s,a)]. Uses actual next action a\' for update. Key difference: Q-learning learns optimal policy regardless of behavior; SARSA learns the policy being followed. Q-learning is more aggressive; SARSA is safer in risky environments.' },
            ]} />
        </div>
    );
}
