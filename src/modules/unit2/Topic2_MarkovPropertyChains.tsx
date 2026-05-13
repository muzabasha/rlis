import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, HelpCircle } from 'lucide-react';

export default function Topic2_MarkovPropertyChains() {
    const [openQ, setOpenQ] = useState<Record<number, boolean>>({});
    const [step, setStep] = useState(0);
    const states = ['Sunny', 'Cloudy', 'Rainy'];
    const P = [[0.7, 0.2, 0.1], [0.3, 0.4, 0.3], [0.2, 0.3, 0.5]];
    const [dist, setDist] = useState([1, 0, 0]);

    const nextStep = () => {
        const nd = [0, 0, 0];
        for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) nd[j] += dist[i] * P[i][j];
        setDist(nd.map(v => parseFloat(v.toFixed(4))));
        setStep(s => s + 1);
    };

    const qs = [
        { q: 'State the Markov Property. Why is it important for RL?', a: 'Markov Property: P(S_{t+1}|S_t) = P(S_{t+1}|S_1,...,S_t). The future depends only on the present state, not the history. Importance for RL: (1) Simplifies computation — only need current state, not full history, (2) Enables dynamic programming solutions, (3) Guarantees that optimal policies are stationary, (4) Makes Q-learning and value iteration tractable.' },
        { q: 'What is a Markov Chain? How does it differ from an MDP?', a: 'Markov Chain: sequence of random states with Markov property. No actions, no rewards — just probabilistic state transitions. MDP = Markov Chain + Actions + Rewards. In a Markov Chain, transitions are fixed. In an MDP, transitions depend on the agent\'s actions. A Markov Chain is a special case of MDP where the agent has no control.' },
        { q: 'What is a Markov Matrix? What property must it satisfy?', a: 'Markov Matrix P where P_ij = P(S_{t+1}=j|S_t=i). Properties: (1) All entries >= 0, (2) Each row sums to 1. This is called a row-stochastic matrix. The n-step transition probability is given by P^n (matrix power).' },
        { q: 'What is the stationary distribution of a Markov Chain?', a: 'Stationary distribution pi satisfies pi·P = pi. Once reached, the chain stays there. Represents long-run fraction of time in each state. Computed by solving pi·P = pi with sum(pi_i)=1. Exists and is unique for ergodic chains.' },
        { q: 'How is the Markov Matrix used in Machine Learning?', a: 'Applications: (1) PageRank — web page importance as stationary distribution, (2) Hidden Markov Models — speech recognition, (3) Text generation — next word prediction, (4) Recommendation systems — user behavior modeling, (5) RL — MDP transition dynamics.' },
    ];

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Weather Forecaster" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">🌤️ Tomorrow's Weather Depends Only on Today</h3>
                    <p className="text-slate-700 dark:text-slate-300">A weather forecaster notices: if it's sunny today, there's a 70% chance of sun tomorrow, 20% cloudy, 10% rainy. Crucially — it doesn't matter what the weather was last week! Only TODAY matters. This is the Markov Property.</p>
                    <InfoCard type="definition" title="The Markov Property">
                        A state S_t is Markov if and only if: P(S_t+1 | S_t) = P(S_t+1 | S_1, S_2, ..., S_t). The future is independent of the past given the present. The state captures all relevant history.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="math" title="Section 2 — Markov Chains & Matrices" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-5">
                    <MathBlock formula="P_{ij} = \Pr(S_{t+1}=s_j \mid S_t=s_i)" label="Markov Transition Matrix Entry" explanation="Probability of transitioning from state i to state j" />
                    <MathBlock formula="\mathbf{P} = \begin{pmatrix} 0.7 & 0.2 & 0.1 \\ 0.3 & 0.4 & 0.3 \\ 0.2 & 0.3 & 0.5 \end{pmatrix}" label="Weather Markov Matrix (Sunny, Cloudy, Rainy)" explanation="Each row sums to 1. Row i = transition probabilities from state i." />
                    <MathBlock formula="\mu_{t+1} = \mu_t \cdot \mathbf{P}" label="State Distribution Evolution" explanation="Multiply current distribution by transition matrix to get next distribution" />

                    <div className="lab-block">
                        <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">🌦️ Markov Chain Simulator — Step through distributions</h4>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {states.map((s, i) => (
                                <div key={s} className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-3 text-center">
                                    <div className="text-lg font-black text-primary-600 dark:text-primary-400">{(dist[i] * 100).toFixed(1)}%</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{s}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={nextStep} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-semibold">Step {step} → Step {step + 1}</button>
                            <button onClick={() => { setDist([1, 0, 0]); setStep(0); }} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold">Reset</button>
                        </div>
                        <InfoCard type="success" title="Stationary Distribution">
                            After many steps, the distribution converges to the stationary distribution π where π·P = π. For this weather model: approximately Sunny=47%, Cloudy=31%, Rainy=22%.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper id="questions" title="Section 5 — Model 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Question Bank" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500" defaultOpen={false}>
                <div className="space-y-3">
                    {qs.map((item, i) => (
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