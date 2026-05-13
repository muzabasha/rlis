import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { BookOpen, HelpCircle, Lightbulb, Zap } from 'lucide-react';

const rlTypes = [
    { type: 'Model-Based RL', desc: 'Agent builds an internal model of the environment (transition + reward functions), then plans using it.', pros: ['Sample efficient', 'Can plan ahead'], cons: ['Model errors compound', 'Computationally expensive'], examples: ['Dyna-Q', 'AlphaZero', 'World Models'], color: 'border-blue-400' },
    { type: 'Model-Free RL', desc: 'Agent learns directly from experience without building an environment model. Most popular approach.', pros: ['Simpler to implement', 'No model errors'], cons: ['Sample inefficient', 'No planning'], examples: ['Q-Learning', 'SARSA', 'PPO', 'A3C'], color: 'border-emerald-400' },
    { type: 'Value-Based RL', desc: 'Learn a value function V(s) or Q(s,a), then derive policy as argmax of Q.', pros: ['Stable convergence', 'Well-studied'], cons: ['Discrete actions only (basic)', 'Indirect policy'], examples: ['Q-Learning', 'DQN', 'Double DQN'], color: 'border-violet-400' },
    { type: 'Policy-Based RL', desc: 'Directly optimize the policy π(a|s) using gradient ascent on expected return.', pros: ['Handles continuous actions', 'Stochastic policies'], cons: ['High variance', 'Slow convergence'], examples: ['REINFORCE', 'PPO', 'TRPO'], color: 'border-amber-400' },
    { type: 'Actor-Critic', desc: 'Combines value-based (critic) and policy-based (actor). Actor selects actions, critic evaluates them.', pros: ['Lower variance than policy gradient', 'Handles continuous actions'], cons: ['More complex', 'Two networks to train'], examples: ['A2C', 'A3C', 'SAC', 'TD3'], color: 'border-red-400' },
    { type: 'Deep RL', desc: 'Uses deep neural networks as function approximators for Q-functions or policies.', pros: ['Handles high-dimensional states', 'End-to-end learning'], cons: ['Unstable training', 'Needs lots of data'], examples: ['DQN', 'AlphaGo', 'OpenAI Five'], color: 'border-cyan-400' },
];

const applications = [
    { domain: 'Gaming', apps: ['AlphaGo/AlphaZero (Go, Chess)', 'OpenAI Five (Dota 2)', 'AlphaStar (StarCraft II)', 'Atari DQN'], icon: '🎮' },
    { domain: 'Robotics', apps: ['Robot arm manipulation', 'Bipedal locomotion', 'Warehouse automation', 'Surgical robots'], icon: '🤖' },
    { domain: 'Autonomous Vehicles', apps: ['Self-driving cars', 'Drone navigation', 'Traffic signal control', 'Path planning'], icon: '🚗' },
    { domain: 'Finance', apps: ['Algorithmic trading', 'Portfolio optimization', 'Risk management', 'Market making'], icon: '📈' },
    { domain: 'Healthcare', apps: ['Drug dosage optimization', 'Treatment planning', 'Clinical trial design', 'Prosthetics control'], icon: '🏥' },
    { domain: 'NLP & LLMs', apps: ['RLHF (ChatGPT, Gemini)', 'Dialogue systems', 'Text summarization', 'Code generation'], icon: '🧠' },
    { domain: 'Energy', apps: ['Smart grid management', 'HVAC optimization', 'Data center cooling (Google)', 'Renewable scheduling'], icon: '⚡' },
    { domain: 'Education', apps: ['Personalized tutoring', 'Adaptive testing', 'Curriculum sequencing', 'Student modeling'], icon: '📚' },
];

const challenges = [
    { challenge: 'Sample Inefficiency', desc: 'RL needs millions of interactions. Humans learn to walk in months; RL robots need billions of steps.', severity: 'high' },
    { challenge: 'Reward Hacking', desc: 'Agent finds unintended ways to maximize reward. Boat racing agent learned to spin in circles for points.', severity: 'high' },
    { challenge: 'Sparse Rewards', desc: 'In many tasks, reward only comes at the end (win/lose). Hard to learn from rare feedback.', severity: 'high' },
    { challenge: 'Catastrophic Forgetting', desc: 'Learning new tasks can overwrite previously learned skills. Stability-plasticity dilemma.', severity: 'medium' },
    { challenge: 'Exploration in Large Spaces', desc: 'In high-dimensional state spaces, random exploration is ineffective. Need intelligent exploration.', severity: 'medium' },
    { challenge: 'Safety & Real-World Deployment', desc: 'Exploration can cause physical damage. Hard to guarantee safe behavior during learning.', severity: 'high' },
];

export default function Topic5_TypesAdvantagesApplications() {
    const [openQ, setOpenQ] = useState<Record<number, boolean>>({});
    const [activeType, setActiveType] = useState(0);

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Swiss Army Knife of AI" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">🔧 RL is Not One Tool — It's a Toolbox</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">Just like a Swiss Army knife has different blades for different jobs, RL has different types for different problems. A surgeon doesn't use a screwdriver; an RL engineer doesn't use Q-learning for continuous robot control.</p>
                    <InfoCard type="tip" title="The Big Picture">
                        All RL types share the same goal: maximize cumulative reward. They differ in HOW they achieve it — through models, value functions, policies, or neural networks. Understanding when to use which type is a key engineering skill.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <SectionWrapper id="types" title="Section 2 — Types of Reinforcement Learning" icon={<Zap size={20} className="text-red-600" />} badge="RL Taxonomy" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        {rlTypes.map((t, i) => (
                            <button key={t.type} onClick={() => setActiveType(i)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border-2 ${activeType === i ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                                {t.type}
                            </button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div key={activeType} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className={`card p-5 border-l-4 ${rlTypes[activeType].color}`}>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{rlTypes[activeType].type}</h4>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">{rlTypes[activeType].desc}</p>
                            <div className="grid sm:grid-cols-3 gap-3">
                                <div>
                                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">✅ Advantages</div>
                                    <ul className="space-y-1">{rlTypes[activeType].pros.map(p => <li key={p} className="text-xs text-slate-600 dark:text-slate-400">• {p}</li>)}</ul>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">⚠️ Limitations</div>
                                    <ul className="space-y-1">{rlTypes[activeType].cons.map(c => <li key={c} className="text-xs text-slate-600 dark:text-slate-400">• {c}</li>)}</ul>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">📌 Algorithms</div>
                                    <ul className="space-y-1">{rlTypes[activeType].examples.map(e => <li key={e} className="text-xs text-slate-600 dark:text-slate-400">• {e}</li>)}</ul>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </SectionWrapper>

            <SectionWrapper id="apps" title="Section 3 — Applications of RL" icon={<Lightbulb size={20} className="text-emerald-600" />} badge="Applications" badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" accentColor="border-emerald-500">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {applications.map(app => (
                        <div key={app.domain} className="card p-4">
                            <div className="text-2xl mb-2">{app.icon}</div>
                            <div className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">{app.domain}</div>
                            <ul className="space-y-1">{app.apps.map(a => <li key={a} className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1"><span className="text-primary-400 flex-shrink-0">•</span>{a}</li>)}</ul>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper id="challenges" title="Section 4 — Challenges with RL" icon={<HelpCircle size={20} className="text-amber-600" />} badge="Challenges" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="space-y-3">
                    {challenges.map(c => (
                        <div key={c.challenge} className="card p-4 flex items-start gap-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 mt-0.5 ${c.severity === 'high' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'}`}>{c.severity}</span>
                            <div>
                                <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{c.challenge}</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{c.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper id="questions" title="Section 5 — Model 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Question Bank" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500" defaultOpen={false}>
                <div className="space-y-3">
                    {[
                        { q: 'What is the difference between model-based and model-free RL?', a: 'Model-based RL: agent builds an internal model of environment dynamics (P(s\'|s,a) and R(s,a)), then uses it for planning. More sample efficient but model errors can compound. Example: Dyna-Q, AlphaZero. Model-free RL: learns directly from experience without a model. Simpler but needs more data. Example: Q-learning, PPO.' },
                        { q: 'Differentiate between value-based and policy-based RL methods.', a: 'Value-based: learn Q(s,a) or V(s), derive policy as argmax_a Q(s,a). Works well for discrete actions. Example: Q-learning, DQN. Policy-based: directly parameterize and optimize π(a|s). Handles continuous actions naturally. Example: REINFORCE, PPO. Actor-Critic combines both: actor (policy) + critic (value function).' },
                        { q: 'List 4 real-world applications of RL with the specific algorithm used.', a: '(1) Game playing: AlphaGo uses Monte Carlo Tree Search + Deep RL. (2) ChatGPT alignment: RLHF with PPO. (3) Google data center cooling: Deep RL reduced energy by 40%. (4) Robot locomotion: SAC (Soft Actor-Critic) for continuous control. Each application exploits RL\'s ability to optimize sequential decisions.' },
                        { q: 'What is reward hacking? Give an example and how to prevent it.', a: 'Reward hacking: agent finds unintended ways to maximize reward that violate designer\'s intent. Example: A boat racing agent rewarded for hitting targets learned to spin in circles hitting the same targets repeatedly instead of completing the race. Prevention: (1) Careful reward function design, (2) Human-in-the-loop reward shaping, (3) Inverse RL to learn reward from demonstrations, (4) Constrained RL with safety constraints.' },
                        { q: 'Why is sample inefficiency a major challenge in RL?', a: 'RL agents need millions of environment interactions to learn. Example: DQN needed 50 million frames (≈38 days of gameplay) to master Atari. Humans learn the same game in minutes. Causes: (1) Sparse rewards — feedback is rare, (2) Credit assignment — which past action caused the reward?, (3) Exploration — must try many actions. Solutions: model-based RL, imitation learning, transfer learning.' },
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