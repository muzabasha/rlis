import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import { BookOpen, HelpCircle, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const comparison = [
    { name: 'ML', full: 'Machine Learning', def: 'Systems that learn patterns from data to make predictions or decisions without being explicitly programmed.', subset: 'Parent field', examples: ['Linear Regression', 'Decision Trees', 'SVM', 'Neural Networks'], focus: 'Pattern recognition from data', data: 'Labeled or unlabeled datasets', color: '#3b82f6' },
    { name: 'DL', full: 'Deep Learning', def: 'ML using deep neural networks (many layers) to automatically learn hierarchical feature representations.', subset: 'Subset of ML', examples: ['CNNs (image)', 'RNNs (sequence)', 'Transformers (NLP)', 'GANs (generation)'], focus: 'Automatic feature extraction', data: 'Large labeled datasets', color: '#8b5cf6' },
    { name: 'RL', full: 'Reinforcement Learning', def: 'ML where an agent learns optimal behavior through trial-and-error interaction with an environment using reward signals.', subset: 'Subset of ML', examples: ['Q-Learning', 'PPO', 'AlphaGo', 'RLHF'], focus: 'Sequential decision making', data: 'Environment interaction', color: '#10b981' },
    { name: 'Deep RL', full: 'Deep Reinforcement Learning', def: 'Combines Deep Learning (neural network function approximators) with RL (reward-based learning). Best of both worlds.', subset: 'Intersection of DL + RL', examples: ['DQN', 'A3C', 'AlphaZero', 'ChatGPT (RLHF)'], focus: 'Complex sequential decisions', data: 'Environment + neural networks', color: '#f59e0b' },
];

const capabilityData = [
    { capability: 'Image Recognition', ML: 70, DL: 98, RL: 30, DeepRL: 85 },
    { capability: 'Game Playing', ML: 40, DL: 50, RL: 90, DeepRL: 99 },
    { capability: 'NLP Tasks', ML: 60, DL: 95, RL: 40, DeepRL: 97 },
    { capability: 'Robot Control', ML: 30, DL: 40, RL: 85, DeepRL: 95 },
    { capability: 'Anomaly Detection', ML: 80, DL: 85, RL: 50, DeepRL: 70 },
];

export default function Topic6_RLvsDLvsML() {
    const [active, setActive] = useState(0);
    const [openQ, setOpenQ] = useState<Record<number, boolean>>({});

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The AI Family Tree" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">🌳 AI is a Family — ML, DL, and RL are Siblings</h3>
                    <p className="text-slate-700 dark:text-slate-300">Imagine AI as a family. The grandparent is AI (broad concept). The parent is Machine Learning (learn from data). The children are Deep Learning (learn features automatically) and Reinforcement Learning (learn from rewards). Deep RL is the grandchild — combining DL's perception with RL's decision-making.</p>
                    <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
                        <div className="text-center space-y-2 font-mono text-sm">
                            <div className="text-slate-700 dark:text-slate-300">🤖 Artificial Intelligence</div>
                            <div className="text-slate-400">│</div>
                            <div className="text-blue-600 dark:text-blue-400">📊 Machine Learning (learn from data)</div>
                            <div className="text-slate-400">├──────────────────┤</div>
                            <div className="flex justify-center gap-8">
                                <div className="text-violet-600 dark:text-violet-400">🧠 Deep Learning</div>
                                <div className="text-emerald-600 dark:text-emerald-400">🎮 Reinforcement Learning</div>
                            </div>
                            <div className="text-slate-400">└──────────┘</div>
                            <div className="text-amber-600 dark:text-amber-400">⚡ Deep Reinforcement Learning</div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper id="comparison" title="Section 2 — Detailed Comparison" icon={<Lightbulb size={20} className="text-red-600" />} badge="Comparison" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        {comparison.map((c, i) => (
                            <button key={c.name} onClick={() => setActive(i)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${active === i ? 'text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                                style={active === i ? { backgroundColor: c.color } : {}}>
                                {c.name}
                            </button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="card p-5 border-l-4" style={{ borderColor: comparison[active].color }}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: comparison[active].color }}>{comparison[active].name}</div>
                                <div>
                                    <div className="font-bold text-lg text-slate-900 dark:text-white">{comparison[active].full}</div>
                                    <div className="text-xs text-slate-400">{comparison[active].subset}</div>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">{comparison[active].def}</p>
                            <div className="grid sm:grid-cols-3 gap-3 text-sm">
                                <div><div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Focus</div><p className="text-slate-500 dark:text-slate-400">{comparison[active].focus}</p></div>
                                <div><div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Data</div><p className="text-slate-500 dark:text-slate-400">{comparison[active].data}</p></div>
                                <div><div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Examples</div><ul className="space-y-0.5">{comparison[active].examples.map(e => <li key={e} className="text-slate-500 dark:text-slate-400 text-xs">• {e}</li>)}</ul></div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Capability Comparison by Task</h4>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={capabilityData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                                <YAxis dataKey="capability" type="category" tick={{ fontSize: 11 }} width={120} />
                                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }} />
                                <Bar dataKey="ML" fill="#3b82f6" name="ML" />
                                <Bar dataKey="DL" fill="#8b5cf6" name="Deep Learning" />
                                <Bar dataKey="RL" fill="#10b981" name="RL" />
                                <Bar dataKey="DeepRL" fill="#f59e0b" name="Deep RL" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper id="questions" title="Section 5 — Model 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Question Bank" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500" defaultOpen={false}>
                <div className="space-y-3">
                    {[
                        { q: 'How does Deep Learning differ from traditional Machine Learning?', a: 'Traditional ML: requires manual feature engineering (domain experts extract features). Deep Learning: automatically learns hierarchical features from raw data using multiple layers. DL excels at unstructured data (images, text, audio). Traditional ML works better with small, structured datasets. DL needs large datasets and GPUs; traditional ML is more interpretable.' },
                        { q: 'What is Deep Reinforcement Learning? Give a landmark example.', a: 'Deep RL combines Deep Learning (neural networks as function approximators) with Reinforcement Learning (reward-based optimization). Instead of a Q-table, a neural network approximates Q(s,a). Landmark example: DQN (2013) — DeepMind\'s agent learned to play 49 Atari games from raw pixels, achieving superhuman performance on 29 games using only pixel input and game score as reward.' },
                        { q: 'When would you choose RL over Deep Learning for a problem?', a: 'Choose RL when: (1) Problem involves sequential decisions (each action affects future states), (2) No labeled data available but reward signal exists, (3) Need to optimize long-term objectives, (4) Environment is interactive (agent can take actions). Choose DL when: (1) Large labeled dataset available, (2) Single-step prediction task, (3) Need interpretable features, (4) Computational resources are limited.' },
                        { q: 'What is RLHF and why is it important for modern AI?', a: 'RLHF (Reinforcement Learning from Human Feedback): train a reward model from human preference comparisons, then use RL (PPO) to optimize the language model against this reward. Importance: (1) Aligns AI behavior with human values, (2) Reduces harmful outputs, (3) Improves instruction following. Used in: ChatGPT, Claude, Gemini. Without RLHF, LLMs generate plausible but potentially harmful/unhelpful text.' },
                        { q: 'Compare the data requirements of ML, DL, and RL.', a: 'ML: needs labeled (X,Y) pairs. Typically 1K-100K examples. Works with structured tabular data. DL: needs large labeled datasets. Typically 100K-10M examples. Requires GPUs. Works with unstructured data (images, text). RL: needs environment interaction, not pre-collected data. Generates its own data through exploration. Can need millions of episodes. Data quality depends on exploration strategy.' },
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