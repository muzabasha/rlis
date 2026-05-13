import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../../components/topic/SectionWrapper';
import InfoCard from '../../../components/topic/InfoCard';
import { Lightbulb, TrendingUp, AlertTriangle, Rocket, Building2, Microscope, Briefcase, CheckCircle2 } from 'lucide-react';

export default function InsightsSection_T1() {
    return (
        <SectionWrapper
            id="insights"
            title="Section 7: Key Insights & Beyond"
            subtitle="Advantages, limitations, applications, and future scope"
            icon={<Lightbulb size={20} className="text-amber-600" />}
            badge="Insights"
            badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
            accentColor="border-amber-500"
            defaultOpen={false}
        >
            <div className="space-y-6">

                {/* Key Insights */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Lightbulb size={20} className="text-amber-500" /> Key Insights from This Topic
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {[
                            'RL is the only ML paradigm that learns from interaction — not from pre-collected data',
                            'The discount factor γ encodes the agent\'s "patience" — how much it values future rewards',
                            'Exploration vs exploitation is not just an RL problem — it\'s a fundamental life challenge',
                            'RL has two historical roots: animal psychology (Pavlov) and optimal control theory',
                            'The reward function is the most critical design choice in any RL system',
                            'Modern LLMs (ChatGPT, Gemini) use RLHF — RL from Human Feedback — for alignment',
                        ].map((insight, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3"
                            >
                                <CheckCircle2 size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-700 dark:text-slate-300">{insight}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Advantages vs Disadvantages */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="card p-5">
                        <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
                            <TrendingUp size={18} /> Advantages
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            {[
                                'No labeled data required — learns from experience',
                                'Can discover superhuman strategies (AlphaGo, AlphaStar)',
                                'Naturally handles sequential decision problems',
                                'Adapts to changing environments dynamically',
                                'Applicable to any problem with a reward signal',
                                'Can optimize for long-term objectives',
                            ].map(a => <li key={a} className="flex items-start gap-2"><span className="text-emerald-500">+</span>{a}</li>)}
                        </ul>
                    </div>
                    <div className="card p-5">
                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
                            <AlertTriangle size={18} /> Disadvantages
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            {[
                                'Requires millions of interactions to learn',
                                'Reward function design is difficult and critical',
                                'Can be unstable — training may diverge',
                                'Exploration can be dangerous in real systems',
                                'Hard to interpret what the agent has learned',
                                'Computationally expensive for large state spaces',
                            ].map(a => <li key={a} className="flex items-start gap-2"><span className="text-red-500">−</span>{a}</li>)}
                        </ul>
                    </div>
                </div>

                {/* Industrial Applications */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Building2 size={20} className="text-blue-500" /> Industrial Applications
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                        {[
                            { domain: 'Gaming & Entertainment', apps: ['AlphaGo / AlphaZero', 'OpenAI Five (Dota 2)', 'Game NPC behavior'], icon: '🎮' },
                            { domain: 'Robotics', apps: ['Robot arm control', 'Autonomous navigation', 'Warehouse automation'], icon: '🤖' },
                            { domain: 'Finance', apps: ['Algorithmic trading', 'Portfolio optimization', 'Risk management'], icon: '📈' },
                            { domain: 'Healthcare', apps: ['Drug dosage optimization', 'Treatment planning', 'Surgical robotics'], icon: '🏥' },
                            { domain: 'Transportation', apps: ['Self-driving cars', 'Traffic signal control', 'Drone navigation'], icon: '🚗' },
                            { domain: 'NLP & AI', apps: ['RLHF for LLMs', 'Dialogue systems', 'Text summarization'], icon: '🧠' },
                        ].map(item => (
                            <div key={item.domain} className="card p-4">
                                <div className="text-2xl mb-2">{item.icon}</div>
                                <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-2">{item.domain}</div>
                                <ul className="space-y-1">
                                    {item.apps.map(a => (
                                        <li key={a} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            <span className="w-1 h-1 bg-primary-400 rounded-full flex-shrink-0" />{a}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Future Scope */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Rocket size={20} className="text-violet-500" /> Future Scope & Research Opportunities
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { title: 'Safe RL', desc: 'Developing RL agents that can learn without causing harm in real-world deployments', area: 'Research' },
                            { title: 'Multi-Agent RL', desc: 'Multiple agents learning simultaneously — applications in autonomous vehicles, smart grids', area: 'Research' },
                            { title: 'Offline RL', desc: 'Learning from pre-collected datasets without environment interaction — critical for healthcare', area: 'Applied' },
                            { title: 'RL + LLMs', desc: 'Using language models as world models for RL agents — next frontier in AI', area: 'Emerging' },
                        ].map(item => (
                            <div key={item.title} className="card p-4 flex gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                                        <span className="text-xs bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full">{item.area}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Career Relevance */}
                <div className="bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100 mb-4 flex items-center gap-2">
                        <Briefcase size={20} /> Career Relevance
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { role: 'ML Engineer', skills: 'RL algorithms, Python, TensorFlow/PyTorch', salary: '₹8-25 LPA' },
                            { role: 'AI Researcher', skills: 'Deep RL, publications, novel algorithms', salary: '₹15-50 LPA' },
                            { role: 'Robotics Engineer', skills: 'RL for control, ROS, simulation', salary: '₹10-30 LPA' },
                        ].map(c => (
                            <div key={c.role} className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-4">
                                <div className="font-bold text-primary-700 dark:text-primary-300 mb-1">{c.role}</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">{c.skills}</div>
                                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{c.salary}</div>
                            </div>
                        ))}
                    </div>
                    <InfoCard type="tip" title="Industry Insight">
                        RL skills are among the most sought-after in AI/ML. Companies like Google DeepMind, OpenAI,
                        Meta AI, and Amazon Robotics actively hire RL specialists. This course gives you the foundation
                        to enter this high-demand field.
                    </InfoCard>
                </div>

                {/* Next Topic Preview */}
                <div className="card p-5 border-l-4 border-primary-500">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">→</span>
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Coming Up Next: Topic 2</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        <strong>RL vs Supervised vs Unsupervised Learning</strong> — We'll do a deep comparative analysis
                        of all three paradigms, with mathematical formulations, use-case mapping, and a decision framework
                        for choosing the right approach for any problem.
                    </p>
                </div>

            </div>
        </SectionWrapper>
    );
}
