import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Zap, TrendingUp, Clock, Briefcase, Layout,
    Compass, Map, Award, Move, MousePointer2, Layers, GitBranch, Binary
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from 'recharts';

// ─── Interactive Components for Topic 2 ──────────────────────────────────────

/**
 * Interactive Transition Matrix Explorer
 */
function TransitionMatrixExplorer() {
    const [action, setAction] = useState<'Search' | 'Wait'>('Search');

    const transitionData = {
        'Search': [
            { state: 'High Energy', probability: 0.7, color: '#3b82f6' },
            { state: 'Low Energy', probability: 0.3, color: '#f59e0b' },
        ],
        'Wait': [
            { state: 'High Energy', probability: 0.2, color: '#3b82f6' },
            { state: 'Low Energy', probability: 0.8, color: '#f59e0b' },
        ]
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Binary size={18} className="text-primary-500" />
                        Transition Dynamics: P(s' | s, a)
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Observe how actions change the probability of the next state.</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    {(['Search', 'Wait'] as const).map(a => (
                        <button
                            key={a}
                            onClick={() => setAction(a)}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${action === a ? 'bg-primary-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            {a}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    {transitionData[action].map((item, i) => (
                        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-600">{item.state}</span>
                                <span className="text-xs font-black text-primary-600">{(item.probability * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.probability * 100}%` }}
                                    className="h-full bg-primary-500"
                                />
                            </div>
                        </div>
                    ))}
                    <InfoCard type="info" title="The Probability Constraint">
                        The sum of probabilities for all possible next states $s'$ must always equal 1.0.
                    </InfoCard>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={transitionData[action]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="state" tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 1]} hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="probability" radius={[10, 10, 10, 10]} animationDuration={1000}>
                                {transitionData[action].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic2_FormalMDPDefinition() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. The Inventory Manager"
                subtitle="Formalizing Business Logic"
                icon={<BookOpen className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Briefcase size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            📦 The Logic of a Warehouse
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are managing a warehouse. At the end of each week, you look at your stock (<strong>State</strong>) and decide how many items to order (<strong>Action</strong>).
                            </p>
                            <p>
                                However, you don't know exactly how many customers will buy items next week. This uncertainty—where the next state is partly random—is exactly what a <strong>Formal MDP</strong> captures.
                            </p>
                            <p>
                                By defining a "Formal MDP", we turn this messy real-world problem into a clean mathematical 4-tuple that an AI can solve perfectly.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Tuple Hierarchy">
                            Some define MDP as a 4-tuple $(S, A, P, R)$, assuming $\gamma$ is external, while others use the 5-tuple $(S, A, P, R, \gamma)$.
                        </InfoCard>
                        <InfoCard type="tip" title="State Transitions">
                            Transitions are stochastic (probabilistic), not deterministic.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="2. The Formal 4-Tuple"
                subtitle="The Mathematical Foundation"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\mathcal{P}_{ss'}^{a} = \mathbb{P}\!\left[S_{t+1}=s' \;\middle|\; S_t=s,\, A_t=a\right]"
                        label="Transition Function — Compact Notation"
                        accent="blue"
                        explanation="The superscript a and subscripts ss' compactly denote the transition probability from state s to state s' under action a. This notation is used in Sutton & Barto (2019) and most RL textbooks."
                        interpretation="This is the same transition probability P(s'|s,a) written in a more compact matrix notation. For each action a, we get a matrix P^a where entry (s,s') gives the probability of transitioning from s to s'. This matrix form is useful for analytical solutions and policy evaluation via linear algebra."
                        motivation="The matrix notation allows us to write the Bellman equation as a linear system: v = R + γP^π v, which can be solved by matrix inversion for small MDPs. This is the foundation of policy evaluation in dynamic programming."
                        terms={[
                            { term: '\\mathcal{P}_{ss\'}^{a}', name: 'Transition Matrix Entry', meaning: 'Probability of transitioning from state s to state s\' under action a. Equivalent to P(s\'|s,a).', range: '[0,1]', example: 'P^{Search}_{High,Low} = 0.3 — 30% chance of draining battery when searching.' },
                            { term: 's', name: 'Current State (row)', meaning: 'The state the agent is currently in. Indexes the row of the transition matrix.', range: '\\mathcal{S}', example: 's = High (battery level).' },
                            { term: "s'", name: 'Next State (column)', meaning: 'The state the environment transitions to. Indexes the column of the transition matrix.', range: '\\mathcal{S}', example: "s' = Low (battery drained after searching)." },
                        ]}
                        numericalExample={{
                            setup: 'Recycling robot. Transition matrix P^{Search} (rows=current state, cols=next state):',
                            steps: [
                                'P^{Search} = [[0.7, 0.3],   ← from High: 70% stay High, 30% go Low',
                                '              [0.1, 0.9]]   ← from Low:  10% go High, 90% stay Low',
                                'Row sums: 0.7+0.3=1.0 ✓, 0.1+0.9=1.0 ✓',
                                'P^{Wait}   = [[0.9, 0.1],   ← Waiting is safer (less battery drain)',
                                '              [0.0, 1.0]]   ← Low+Wait always stays Low',
                            ],
                            result: 'Two 2×2 transition matrices, one per action. Each row sums to 1. These matrices completely define the environment dynamics.',
                        }}
                    />

                    <MathBlock
                        formula="\mathcal{R}_{s}^{a} = \mathbb{E}\!\left[R_{t+1} \;\middle|\; S_t=s,\, A_t=a\right] = \sum_{s'\in\mathcal{S}}\mathcal{P}_{ss'}^{a}\cdot r(s,a,s')"
                        label="Reward Function — Expected Immediate Reward"
                        accent="emerald"
                        explanation="R^a_s is the expected immediate reward for taking action a in state s, averaged over all possible next states weighted by their transition probabilities."
                        interpretation="The reward function is the most critical design choice in RL. It defines what the agent is trying to achieve. A well-designed reward function leads to the desired behaviour; a poorly designed one leads to reward hacking. The expected form R^a_s = Σ P^a_{ss'} · r(s,a,s') shows that the reward is an average over all possible outcomes."
                        motivation="Using expected reward rather than per-transition reward simplifies the Bellman equation. It allows us to write the value function as v_π(s) = Σ_a π(a|s)[R^a_s + γ Σ_{s'} P^a_{ss'} v_π(s')], which is the standard form used in dynamic programming."
                        terms={[
                            { term: '\\mathcal{R}_s^a', name: 'Expected Reward', meaning: 'Average reward for taking action a in state s, over all possible next states.', range: '\\mathbb{R}', example: 'R^{Search}_{High} = 4.0 cans expected per search from High battery.' },
                            { term: 'r(s,a,s\')', name: 'Per-Transition Reward', meaning: 'The specific reward received for the transition from s to s\' via action a. May differ by next state.', range: '\\mathbb{R}', example: 'r(Low,Search,depleted)=−3 (penalty for running out of battery).' },
                            { term: '\\mathcal{P}_{ss\'}^a', name: 'Transition Weight', meaning: 'Probability of reaching s\', used to weight the per-transition reward.', range: '[0,1]', example: 'P^{Search}_{Low,depleted}=0.1 → contributes 0.1×(−3)=−0.3 to expected reward.' },
                        ]}
                        numericalExample={{
                            setup: 'Recycling robot. Action: Search from Low battery. Transitions: Low→High(p=0.1,r=4), Low→Low(p=0.9,r=4), Low→depleted(p=0.0,r=−3).',
                            steps: [
                                'R^{Search}_{Low} = P(High|Low,Search)×r(Low,S,High) + P(Low|Low,Search)×r(Low,S,Low)',
                                '               = 0.1×4 + 0.9×4',
                                '               = 0.4 + 3.6 = 4.0',
                                'Note: if P(depleted|Low,Search)=0.1 with r=−3: R = 0.1×4 + 0.8×4 + 0.1×(−3) = 3.3',
                            ],
                            result: 'R^{Search}_{Low} = 4.0 (or 3.3 with depletion risk). The reward function captures the expected outcome of each action.',
                        }}
                    />

                    <TransitionMatrixExplorer />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="3. Activity: Dynamics Modeler"
                subtitle="Calculating Probabilities"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    {/* Level 1 */}
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Class Challenge: The Rainy Day MDP</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            "If it is Sunny ($s$), and you take the action 'Walk' ($a$), there is a 90% chance you stay Dry ($s'$) and a 10% chance it starts Raining ($s''$). Write this as a transition probability."
                            <br /><strong>Answer:</strong> {"$P(\\text{Dry} | \\text{Sunny}, \\text{Walk}) = 0.9$"}
                        </p>
                    </div>

                    {/* Level 2 */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Interactive: Validating a Matrix</h4>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 text-center font-mono text-xs">
                            {"P = [[0.7, 0.3], [0.4, 0.6]]"}
                            <div className="mt-2 text-emerald-500 font-bold">Valid: Row sums equal 1.0</div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="4. Project: The Recycling Robot MDP"
                subtitle="Formulating a Classic Example"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><GitBranch size={18} /> The Search Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A robot searches for cans. It has two energy levels: <strong>High</strong> and <strong>Low</strong>.
                            It can <strong>Search</strong>, <strong>Wait</strong>, or <strong>Recharge</strong>.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Layers className="mx-auto text-emerald-500" size={20} />
                            <div className="text-[10px] font-bold">S</div>
                            <p className="text-[8px] text-slate-500">{'[High, Low]'}</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Zap className="mx-auto text-blue-500" size={20} />
                            <div className="text-[10px] font-bold">A</div>
                            <p className="text-[8px] text-slate-500">{'[Search, Wait, Recharge]'}</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Binary className="mx-auto text-amber-500" size={20} />
                            <div className="text-[10px] font-bold">P</div>
                            <p className="text-[8px] text-slate-500">Prob. of battery drain.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Award className="mx-auto text-purple-500" size={20} />
                            <div className="text-[10px] font-bold">R</div>
                            <p className="text-[8px] text-slate-500">Points per can found.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="5. Quick Check"
                subtitle="Essential Definitions"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Define the formal 4-tuple of an MDP.', a: 'An MDP is defined by the set (S, A, P, R), representing States, Actions, Transition Probabilities, and Reward Functions.' },
                        { q: 'What is a Transition Probability Matrix?', a: 'A matrix where each element P[i][j] represents the probability of moving from state i to state j under a specific action.' },
                        { q: 'What is the "Finite" requirement in a Finite MDP?', a: 'It means the sets S, A, and R must have a finite number of elements, allowing for exact computation.' }
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-purple-500 transition-colors">
                            <div className="font-bold text-slate-800 dark:text-white mb-2 text-sm italic">Q: {item.q}</div>
                            <div className="text-xs text-slate-500 border-l-2 border-slate-100 dark:border-slate-700 pl-4">{item.a}</div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="6. Virtual Lab: Transition Explorer"
                subtitle="Visualizing Environment Dynamics"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between actions to see how the Transition Matrix changes. Notice how <strong>Searching</strong> has a higher risk of battery drain (Low Energy) compared to <strong>Waiting</strong>.
                    </p>
                    <TransitionMatrixExplorer />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">MDP Defined!</h3>
                    <p className="text-primary-100">
                        You've mastered the 4-tuple. Ready to explore the core "Markov Property" that makes this math work?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MARKOV PROPERTY
                    </button>
                    <button className="px-10 py-4 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                        REVIEW DEFINITION
                    </button>
                </div>
            </div>
        </div>
    );
}
