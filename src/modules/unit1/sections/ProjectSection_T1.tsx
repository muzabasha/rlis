import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../../components/topic/SectionWrapper';
import InfoCard from '../../../components/topic/InfoCard';
import { FolderOpen, Calendar, Users, DollarSign, AlertTriangle, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ganttData = [
    { phase: 'Literature Review', start: 0, duration: 1, color: '#3b82f6' },
    { phase: 'Problem Definition', start: 1, duration: 1, color: '#8b5cf6' },
    { phase: 'Environment Setup', start: 2, duration: 2, color: '#10b981' },
    { phase: 'Agent Implementation', start: 3, duration: 3, color: '#f59e0b' },
    { phase: 'Training & Testing', start: 5, duration: 2, color: '#ef4444' },
    { phase: 'Documentation', start: 6, duration: 1, color: '#06b6d4' },
    { phase: 'Presentation', start: 7, duration: 1, color: '#84cc16' },
];

const risks = [
    { risk: 'Slow convergence', probability: 'medium', impact: 'high', mitigation: 'Use simpler environment, reduce state space' },
    { risk: 'Reward hacking', probability: 'low', impact: 'high', mitigation: 'Careful reward function design, human review' },
    { risk: 'Team coordination', probability: 'medium', impact: 'medium', mitigation: 'Weekly sync meetings, shared GitHub repo' },
    { risk: 'Computational limits', probability: 'high', impact: 'medium', mitigation: 'Use Google Colab, limit training episodes' },
];

const riskColor = { low: 'bg-emerald-100 text-emerald-700', medium: 'bg-amber-100 text-amber-700', high: 'bg-red-100 text-red-700' };

export default function ProjectSection_T1() {
    const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'team' | 'budget' | 'risks'>('overview');

    return (
        <SectionWrapper
            id="project"
            title="Section 4: Project-Based Learning"
            subtitle="Build a Grid World RL Agent — TRL Level 3 Demonstration"
            icon={<FolderOpen size={20} className="text-violet-600" />}
            badge="Project Work"
            badgeColor="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
            accentColor="border-violet-500"
        >
            <div className="space-y-6">
                {/* Project Title Card */}
                <div className="project-block">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">🤖</div>
                        <div>
                            <h3 className="text-xl font-bold text-violet-900 dark:text-violet-100 mb-2">
                                Project: "Bruno's Grid World" — A Simple RL Agent
                            </h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-3">
                                Build a reinforcement learning agent that navigates a 5×5 grid world to find a goal,
                                avoiding obstacles. The agent learns purely from reward signals — no pre-programmed rules.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Python / JavaScript', 'NumPy', 'Matplotlib', 'Grid Environment', 'Q-Table'].map(t => (
                                    <span key={t} className="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full text-xs font-semibold">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {[
                        { id: 'overview', label: 'Overview', icon: Target },
                        { id: 'timeline', label: 'Timeline', icon: Calendar },
                        { id: 'team', label: 'Team Roles', icon: Users },
                        { id: 'budget', label: 'Budget', icon: DollarSign },
                        { id: 'risks', label: 'Risk Analysis', icon: AlertTriangle },
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id
                                        ? 'bg-violet-600 text-white shadow-md'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                            >
                                <Icon size={14} /> {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="card p-4">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">📋 Project Scope</h4>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    {[
                                        'Design a 5×5 grid world environment',
                                        'Implement a random-walk agent as baseline',
                                        'Implement a reward-based learning agent',
                                        'Compare performance: random vs learned policy',
                                        'Visualize the learned policy as arrows on the grid',
                                        'Document findings in a 2-page report',
                                    ].map(s => <li key={s} className="flex items-start gap-2"><span className="text-violet-500">→</span>{s}</li>)}
                                </ul>
                            </div>
                            <div className="card p-4">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">🎯 Learning Outcomes</h4>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    {[
                                        'Understand the RL loop through implementation',
                                        'Experience reward function design challenges',
                                        'Observe convergence of a learning agent',
                                        'Develop debugging skills for RL systems',
                                        'Practice technical documentation',
                                        'CO1, CO2 mapped outcomes achieved',
                                    ].map(s => <li key={s} className="flex items-start gap-2"><span className="text-emerald-500">✓</span>{s}</li>)}
                                </ul>
                            </div>
                        </div>

                        <InfoCard type="tip" title="TRL Level 3 — Proof of Concept">
                            This project demonstrates Technology Readiness Level 3: analytical and experimental critical function
                            proof of concept. The agent successfully navigates the grid, proving the RL concept works in a
                            controlled environment.
                        </InfoCard>

                        <div className="card p-4">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">📖 User Manual (Simplified)</h4>
                            <ol className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                {[
                                    'Clone the repository: git clone [repo-url]',
                                    'Install dependencies: pip install numpy matplotlib',
                                    'Run the environment: python grid_world.py',
                                    'Observe the agent exploring randomly for first 100 episodes',
                                    'After 500 episodes, observe the agent following an optimal path',
                                    'View the policy visualization: python visualize_policy.py',
                                ].map((s, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-5 h-5 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                                        <code className="text-xs">{s}</code>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'timeline' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">📅 Project Timeline (8 Weeks)</h4>
                        <div className="space-y-2">
                            {ganttData.map((item, idx) => (
                                <div key={item.phase} className="flex items-center gap-3">
                                    <div className="w-36 text-xs text-slate-600 dark:text-slate-400 text-right flex-shrink-0">{item.phase}</div>
                                    <div className="flex-1 h-7 bg-slate-100 dark:bg-slate-700 rounded-lg relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.duration / 8) * 100}%` }}
                                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                                            style={{
                                                left: `${(item.start / 8) * 100}%`,
                                                backgroundColor: item.color,
                                            }}
                                            className="absolute top-0 bottom-0 rounded-lg flex items-center px-2"
                                        >
                                            <span className="text-white text-xs font-semibold whitespace-nowrap">W{item.start + 1}{item.duration > 1 ? `-W${item.start + item.duration}` : ''}</span>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 flex-wrap mt-2">
                            {ganttData.map(item => (
                                <div key={item.phase} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                                    {item.phase}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'team' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">👥 Team Roles & Responsibilities</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { role: 'Project Lead', count: 1, color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300', responsibilities: ['Coordinate team activities', 'Manage timeline', 'Final presentation', 'GitHub repository management'] },
                                { role: 'Environment Designer', count: 1, color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300', responsibilities: ['Design grid world', 'Implement state/action space', 'Define reward function', 'Test edge cases'] },
                                { role: 'Agent Developer', count: 1, color: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300', responsibilities: ['Implement learning algorithm', 'Tune hyperparameters', 'Run training experiments', 'Analyze convergence'] },
                                { role: 'Documentation & Viz', count: 1, color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300', responsibilities: ['Write project report', 'Create visualizations', 'Prepare presentation slides', 'User manual'] },
                            ].map(r => (
                                <div key={r.role} className={`border rounded-xl p-4 ${r.color}`}>
                                    <div className="font-bold mb-2">{r.role} ({r.count} person)</div>
                                    <ul className="space-y-1">
                                        {r.responsibilities.map(resp => (
                                            <li key={resp} className="text-xs flex items-start gap-1.5">
                                                <span>•</span>{resp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'budget' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">💰 Budget Estimation</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800">
                                        <th className="text-left p-3 font-semibold text-slate-700 dark:text-slate-300">Category</th>
                                        <th className="text-left p-3 font-semibold text-slate-700 dark:text-slate-300">Item</th>
                                        <th className="text-right p-3 font-semibold text-slate-700 dark:text-slate-300">Cost (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { cat: 'Software', item: 'Python, NumPy, Matplotlib (Free/Open Source)', cost: 0 },
                                        { cat: 'Compute', item: 'Google Colab (Free tier)', cost: 0 },
                                        { cat: 'Documentation', item: 'Printing & binding (2 copies)', cost: 200 },
                                        { cat: 'Presentation', item: 'Poster printing (A1 size)', cost: 300 },
                                        { cat: 'Contingency', item: '10% buffer', cost: 50 },
                                    ].map(r => (
                                        <tr key={r.item} className="border-t border-slate-200 dark:border-slate-700">
                                            <td className="p-3 text-slate-600 dark:text-slate-400">{r.cat}</td>
                                            <td className="p-3 text-slate-600 dark:text-slate-400">{r.item}</td>
                                            <td className="p-3 text-right font-semibold text-slate-800 dark:text-slate-200">₹{r.cost}</td>
                                        </tr>
                                    ))}
                                    <tr className="border-t-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
                                        <td className="p-3 font-bold text-slate-800 dark:text-slate-200" colSpan={2}>Total</td>
                                        <td className="p-3 text-right font-black text-primary-600 dark:text-primary-400">₹550</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <InfoCard type="success" title="Cost-Effective Project">
                            This project uses entirely free, open-source tools. The only costs are physical documentation.
                            All computation runs on Google Colab's free GPU tier.
                        </InfoCard>
                    </motion.div>
                )}

                {activeTab === 'risks' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">⚠️ Risk Analysis</h4>
                        <div className="space-y-3">
                            {risks.map(r => (
                                <div key={r.risk} className="card p-4 flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{r.risk}</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            <strong>Mitigation:</strong> {r.mitigation}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 flex-shrink-0">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${riskColor[r.probability as keyof typeof riskColor]}`}>
                                            P: {r.probability}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${riskColor[r.impact as keyof typeof riskColor]}`}>
                                            I: {r.impact}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </SectionWrapper>
    );
}
