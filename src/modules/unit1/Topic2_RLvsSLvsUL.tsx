import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { BookOpen, Calculator, Users, FolderOpen, HelpCircle, FlaskConical, Lightbulb } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const comparisonData = [
    { aspect: 'Labeled Data', RL: 20, SL: 100, UL: 0 },
    { aspect: 'Feedback Type', RL: 70, SL: 100, UL: 30 },
    { aspect: 'Sequential Decisions', RL: 100, SL: 10, UL: 20 },
    { aspect: 'Exploration', RL: 90, SL: 0, UL: 50 },
    { aspect: 'Adaptability', RL: 95, SL: 40, UL: 60 },
    { aspect: 'Interpretability', RL: 30, SL: 70, UL: 50 },
];

const questions = [
    { q: 'A spam filter trained on 10,000 labeled emails', answer: 'SL', reason: 'Labeled input-output pairs (email → spam/not spam)' },
    { q: 'A robot learning to walk by trying movements', answer: 'RL', reason: 'Trial-and-error with reward (stable walking = +reward)' },
    { q: 'Grouping customers by purchase behavior', answer: 'UL', reason: 'No labels — finding hidden patterns in data' },
    { q: 'AlphaGo playing chess against itself', answer: 'RL', reason: 'Sequential decisions, reward = win/lose' },
    { q: 'Detecting anomalies in network traffic', answer: 'UL', reason: 'No labeled anomalies — clustering/density estimation' },
    { q: 'Predicting house prices from features', answer: 'SL', reason: 'Labeled training data (features → price)' },
];

export default function Topic2_RLvsSLvsUL() {
    const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [activeTab, setActiveTab] = useState<'story' | 'math' | 'activity' | 'questions' | 'lab' | 'insights'>('story');

    const tabs = [
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'activity', label: 'Activity', icon: Users },
        { id: 'questions', label: 'Questions', icon: HelpCircle },
        { id: 'lab', label: 'Virtual Lab', icon: FlaskConical },
        { id: 'insights', label: 'Insights', icon: Lightbulb },
    ] as const;

    return (
        <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map(t => {
                    const Icon = t.icon;
                    return (
                        <button key={t.id} onClick={() => setActiveTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === t.id ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                            <Icon size={14} />{t.label}
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                    {/* ── STORY ── */}
                    {activeTab === 'story' && (
                        <SectionWrapper id="story" title="Section 1 — The Three Teachers" subtitle="A classroom analogy for RL vs SL vs UL" icon={<BookOpen size={20} className="text-amber-600" />} badge="Storytelling" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                            <div className="space-y-5">
                                <div className="story-block">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">🏫 Imagine Three Different Classrooms</h3>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {[
                                            { emoji: '📖', title: 'Classroom A — Supervised', desc: 'The teacher gives you every question AND the correct answer. You study the pattern. On the exam, you predict answers for new questions. This is Supervised Learning — learn from labeled examples.', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
                                            { emoji: '🔍', title: 'Classroom B — Unsupervised', desc: 'The teacher gives you 1000 student photos and says "find groups." No labels. You discover that some students wear glasses, some don\'t; some are tall, some short. You find hidden structure. This is Unsupervised Learning.', color: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800' },
                                            { emoji: '🎮', title: 'Classroom C — Reinforcement', desc: 'The teacher gives you a video game and says "score as high as possible." No instructions. You try buttons, get points or lose lives, and gradually learn the optimal strategy. This is Reinforcement Learning.', color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' },
                                        ].map(c => (
                                            <div key={c.title} className={`border rounded-xl p-4 ${c.color}`}>
                                                <div className="text-3xl mb-2">{c.emoji}</div>
                                                <div className="font-bold text-sm mb-2">{c.title}</div>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{c.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <InfoCard type="definition" title="Formal Definitions">
                                    <div className="space-y-2">
                                        <p><strong>Supervised Learning (SL):</strong> Learn a mapping f: X → Y from labeled pairs (xᵢ, yᵢ). Goal: minimize prediction error on unseen data.</p>
                                        <p><strong>Unsupervised Learning (UL):</strong> Discover hidden structure in unlabeled data X. Goal: find clusters, distributions, or compressed representations.</p>
                                        <p><strong>Reinforcement Learning (RL):</strong> Learn a policy π: S → A through interaction with an environment. Goal: maximize cumulative reward G_t.</p>
                                    </div>
                                </InfoCard>

                                <div className="card p-5">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">🔑 The Key Differences at a Glance</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead><tr className="bg-slate-50 dark:bg-slate-800">
                                                {['Aspect', 'Supervised', 'Unsupervised', 'Reinforcement'].map(h => <th key={h} className="text-left p-3 font-semibold text-slate-700 dark:text-slate-300">{h}</th>)}
                                            </tr></thead>
                                            <tbody>
                                                {[
                                                    ['Input', 'Labeled (X,Y) pairs', 'Unlabeled X', 'States, actions, rewards'],
                                                    ['Feedback', 'Correct answer provided', 'No feedback', 'Reward signal (delayed)'],
                                                    ['Goal', 'Minimize loss', 'Find structure', 'Maximize return G_t'],
                                                    ['Data', 'Static dataset', 'Static dataset', 'Generated by interaction'],
                                                    ['Time', 'Single-step prediction', 'Single-step', 'Sequential decisions'],
                                                    ['Examples', 'Image classification', 'Customer clustering', 'Game playing, robotics'],
                                                ].map((row, i) => (
                                                    <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                                                        {row.map((cell, j) => <td key={j} className={`p-3 ${j === 0 ? 'font-semibold text-slate-700 dark:text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>{cell}</td>)}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── MATH ── */}
                    {activeTab === 'math' && (
                        <SectionWrapper id="math" title="Section 2 — Mathematical Formulations" icon={<Calculator size={20} className="text-red-600" />} badge="Math" badgeColor="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" accentColor="border-red-500">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Supervised Learning — Loss Minimization</h4>
                                    <MathBlock formula="\hat{\theta} = \arg\min_{\theta} \frac{1}{n}\sum_{i=1}^{n} \mathcal{L}(f_\theta(x_i), y_i)" label="Empirical Risk Minimization" explanation="Find parameters θ that minimize average loss over n labeled training examples" />
                                    <SymbolTable symbols={[
                                        { symbol: '\\theta', meaning: 'Model parameters (weights)', unit: 'ℝᵈ' },
                                        { symbol: 'f_\\theta(x_i)', meaning: 'Model prediction for input xᵢ', unit: 'ℝ' },
                                        { symbol: 'y_i', meaning: 'True label for example i', unit: 'ℝ' },
                                        { symbol: '\\mathcal{L}', meaning: 'Loss function (e.g., MSE, cross-entropy)', unit: 'ℝ⁺' },
                                    ]} />
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Unsupervised Learning — K-Means Objective</h4>
                                    <MathBlock formula="\min_{C_1,...,C_k} \sum_{j=1}^{k} \sum_{x \in C_j} \|x - \mu_j\|^2" label="K-Means Clustering Objective" explanation="Minimize total within-cluster variance across k clusters" />
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Reinforcement Learning — Policy Objective</h4>
                                    <MathBlock formula="J(\pi) = \mathbb{E}_\pi\left[\sum_{t=0}^{T} \gamma^t R_{t+1}\right] = \mathbb{E}_\pi[G_0]" label="RL Objective: Maximize Expected Return" explanation="Find policy π that maximizes expected discounted cumulative reward" />
                                    <InfoCard type="tip" title="Key Insight">
                                        SL minimizes a loss. UL minimizes a reconstruction/clustering error. RL <em>maximizes</em> expected return. This sign flip — from minimization to maximization — reflects the fundamental difference: RL is about achieving goals, not fitting data.
                                    </InfoCard>
                                </div>

                                <div className="lab-block">
                                    <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-4">📊 Capability Comparison Radar</h4>
                                    <ResponsiveContainer width="100%" height={280}>
                                        <RadarChart data={comparisonData}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="aspect" tick={{ fontSize: 11 }} />
                                            <Radar name="RL" dataKey="RL" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={2} />
                                            <Radar name="Supervised" dataKey="SL" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                                            <Radar name="Unsupervised" dataKey="UL" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
                                            <Legend />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── ACTIVITY ── */}
                    {activeTab === 'activity' && (
                        <SectionWrapper id="activity" title="Section 3 — Activity: Classify the Learning Paradigm" icon={<Users size={20} className="text-emerald-600" />} badge="Activity" badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" accentColor="border-emerald-500">
                            <div className="space-y-5">
                                <InfoCard type="info" title="Level 3 Group Activity — 15 minutes">
                                    Groups of 4. Each group gets 6 scenarios. Classify each as RL, SL, or UL. Justify your answer. Present to class.
                                </InfoCard>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {[
                                        { scenario: 'Netflix recommending movies based on watch history', answer: 'RL/SL', hint: 'Could be collaborative filtering (UL) or RLHF (RL)' },
                                        { scenario: 'Diagnosing cancer from labeled X-ray images', answer: 'SL', hint: 'Labeled data: image → diagnosis' },
                                        { scenario: 'A thermostat learning optimal temperature schedules', answer: 'RL', hint: 'Sequential decisions, reward = comfort + energy savings' },
                                        { scenario: 'Grouping news articles by topic without labels', answer: 'UL', hint: 'No labels — topic modeling / clustering' },
                                        { scenario: 'Training a chatbot using human feedback ratings', answer: 'RL', hint: 'RLHF — reward from human preference' },
                                        { scenario: 'Predicting tomorrow\'s stock price from historical data', answer: 'SL', hint: 'Labeled time-series regression' },
                                    ].map((item, i) => (
                                        <div key={i} className="card p-4">
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Scenario {i + 1}: {item.scenario}</p>
                                            <div className="flex gap-2 mb-2">
                                                {['RL', 'SL', 'UL'].map(opt => (
                                                    <button key={opt} onClick={() => setQuizAnswers(p => ({ ...p, [i]: opt }))}
                                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${quizAnswers[i] === opt ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                            {showResults && (
                                                <div className={`text-xs p-2 rounded-lg ${quizAnswers[i] === item.answer.split('/')[0] ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
                                                    <strong>Answer: {item.answer}</strong> — {item.hint}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => setShowResults(true)} className="btn-primary">Check Answers</button>
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── QUESTIONS ── */}
                    {activeTab === 'questions' && (
                        <SectionWrapper id="questions" title="Section 5 — Model 2-Mark Questions" icon={<HelpCircle size={20} className="text-cyan-600" />} badge="Question Bank" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-4">
                                {[
                                    { q: 'What is the fundamental difference between RL and Supervised Learning?', a: 'In SL, the correct output is provided for every input (labeled data). In RL, only a reward signal is given after taking an action — the agent must discover which actions lead to high rewards through trial and error. SL learns a static mapping; RL learns a sequential decision-making policy.' },
                                    { q: 'Give two real-world applications each for RL, SL, and UL.', a: 'RL: (1) Game playing (AlphaGo), (2) Robot navigation. SL: (1) Email spam detection, (2) Medical image diagnosis. UL: (1) Customer segmentation, (2) Anomaly detection in networks.' },
                                    { q: 'Why can\'t supervised learning be directly applied to game playing?', a: 'Game playing requires sequential decisions where each action affects future states. SL needs labeled (state → optimal action) pairs for every possible game state — computationally infeasible. Also, the "correct" action depends on long-term consequences, not just immediate feedback. RL handles this naturally through the return G_t.' },
                                    { q: 'What is the role of the reward signal in RL compared to labels in SL?', a: 'In SL, labels provide the exact correct output — direct supervision. In RL, rewards provide evaluative feedback — they indicate how good an action was, but not what the correct action should have been. Rewards can be delayed (sparse), making RL harder than SL. The agent must infer which past actions caused the reward.' },
                                    { q: 'Can RL and SL be combined? Give an example.', a: 'Yes — RLHF (Reinforcement Learning from Human Feedback) combines both. In ChatGPT training: (1) SL phase: fine-tune on human-written demonstrations, (2) RL phase: train a reward model from human preference comparisons, then use PPO (RL algorithm) to optimize the language model against this reward. This combines SL\'s data efficiency with RL\'s optimization power.' },
                                ].map((item, i) => {
                                    const [open, setOpen] = useState(false);
                                    return (
                                        <div key={i} className="card overflow-hidden">
                                            <button onClick={() => setOpen(o => !o)} className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                                <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">Q{i + 1}</span>
                                                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm flex-1">{item.q}</span>
                                            </button>
                                            <AnimatePresence>
                                                {open && (
                                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                                        <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-700">
                                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">{item.a}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── LAB ── */}
                    {activeTab === 'lab' && (
                        <SectionWrapper id="lab" title="Section 6 — Virtual Lab: Decision Framework" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Interactive Lab" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                            <div className="space-y-5">
                                <InfoCard type="info" title="Lab Objective">
                                    Use this decision framework to determine which ML paradigm fits a given problem. Answer the questions to get a recommendation.
                                </InfoCard>
                                <DecisionFramework />
                            </div>
                        </SectionWrapper>
                    )}

                    {/* ── INSIGHTS ── */}
                    {activeTab === 'insights' && (
                        <SectionWrapper id="insights" title="Section 7 — Key Insights" icon={<Lightbulb size={20} className="text-amber-600" />} badge="Insights" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500" defaultOpen={false}>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'No Free Lunch', desc: 'No single paradigm wins on all problems. RL excels at sequential decisions; SL at pattern recognition; UL at discovery.' },
                                    { title: 'Data Requirements', desc: 'SL needs labeled data (expensive). UL needs raw data (cheap). RL needs environment interaction (can be dangerous).' },
                                    { title: 'Modern Hybrid', desc: 'State-of-the-art AI (GPT-4, Gemini) uses all three: SL for pretraining, UL for representation, RL for alignment.' },
                                    { title: 'Industry Impact', desc: 'SL dominates production ML. RL is growing fast in robotics, games, and LLM alignment. UL powers recommendation systems.' },
                                ].map(item => (
                                    <div key={item.title} className="card p-4">
                                        <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">{item.title}</div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>
                    )}

                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function DecisionFramework() {
    const [step, setStep] = useState(0);
    const [path, setPath] = useState<string[]>([]);

    const tree: Record<number, { q: string; yes: number | string; no: number | string }> = {
        0: { q: 'Do you have labeled training data (input-output pairs)?', yes: 1, no: 2 },
        1: { q: 'Are decisions sequential (each action affects future states)?', yes: 'RL + SL (RLHF)', no: 'Supervised Learning ✅' },
        2: { q: 'Is there a reward signal from the environment?', yes: 'Reinforcement Learning ✅', no: 'Unsupervised Learning ✅' },
    };

    const current = tree[step];
    const isResult = typeof current?.yes === 'string' || typeof current?.no === 'string';

    const choose = (choice: 'yes' | 'no') => {
        const next = current[choice];
        setPath(p => [...p, `${current.q} → ${choice.toUpperCase()}`]);
        if (typeof next === 'string') {
            setPath(p => [...p, `Result: ${next}`]);
            setStep(-1);
        } else {
            setStep(next);
        }
    };

    return (
        <div className="card p-6">
            {step === -1 ? (
                <div className="text-center space-y-4">
                    <div className="text-4xl">🎯</div>
                    <div className="font-bold text-xl text-slate-800 dark:text-slate-200">{path[path.length - 1]}</div>
                    <div className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
                        {path.slice(0, -1).map((p, i) => <div key={i}>{p}</div>)}
                    </div>
                    <button onClick={() => { setStep(0); setPath([]); }} className="btn-secondary text-sm">Start Over</button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Step {step + 1} of 2</div>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{current?.q}</p>
                    <div className="flex gap-3">
                        <button onClick={() => choose('yes')} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all">✅ Yes</button>
                        <button onClick={() => choose('no')} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all">❌ No</button>
                    </div>
                    {path.length > 0 && (
                        <div className="text-xs text-slate-400 space-y-0.5">
                            {path.map((p, i) => <div key={i}>→ {p}</div>)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}