import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock } from '../../components/topic/MathBlock';
import QuestionAccordion from '../../components/topic/QuestionAccordion';
import { BookOpen, Calculator, FlaskConical } from 'lucide-react';

// Recycling Robot MDP (from Sutton & Barto)
const states = ['High Battery', 'Low Battery'];
const actions = { 'High Battery': ['Search', 'Wait'], 'Low Battery': ['Search', 'Wait', 'Recharge'] };
const transitions: Record<string, Record<string, { next: string; prob: number; reward: number }[]>> = {
    'High Battery': {
        'Search': [{ next: 'High Battery', prob: 0.7, reward: 4 }, { next: 'Low Battery', prob: 0.3, reward: 4 }],
        'Wait': [{ next: 'High Battery', prob: 1.0, reward: 1 }],
    },
    'Low Battery': {
        'Search': [{ next: 'High Battery', prob: 0.1, reward: -3 }, { next: 'Low Battery', prob: 0.9, reward: 4 }],
        'Wait': [{ next: 'Low Battery', prob: 1.0, reward: 1 }],
        'Recharge': [{ next: 'High Battery', prob: 1.0, reward: 0 }],
    },
};

export default function Topic3_RecyclingRobot() {
    const [selectedState, setSelectedState] = useState('High Battery');
    const [selectedAction, setSelectedAction] = useState('Search');
    const [gamma, setGamma] = useState(0.9);

    const trans = transitions[selectedState]?.[selectedAction] || [];
    const expectedR = trans.reduce((s, t) => s + t.prob * t.reward, 0);

    return (
        <div className="space-y-6">
            <SectionWrapper id="story" title="Section 1 — The Recycling Robot" icon={<BookOpen size={20} className="text-amber-600" />} badge="Case Study" badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" accentColor="border-amber-500">
                <div className="story-block space-y-4">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">🤖 A Robot That Collects Cans — And Manages Its Battery</h3>
                    <p className="text-slate-700 dark:text-slate-300">This classic example from Sutton & Barto (2019) perfectly illustrates MDP. A mobile robot collects empty cans. It has two battery states: High and Low. It can Search (find cans, uses battery), Wait (conserve battery, fewer cans), or Recharge (when low). Each action has probabilistic outcomes and rewards.</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                        {[
                            { action: '🔍 Search', desc: 'Actively look for cans. High reward (+4) but drains battery. Risk of running out!', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
                            { action: '⏳ Wait', desc: 'Stay put, collect nearby cans. Low reward (+1) but conserves battery safely.', color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' },
                            { action: '🔋 Recharge', desc: 'Go to charging station. No reward (0) but restores to High battery.', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' },
                        ].map(a => (
                            <div key={a.action} className={`border rounded-xl p-3 ${a.color}`}>
                                <div className="font-bold text-sm mb-1">{a.action}</div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper id="lab" title="Section 6 — Interactive MDP Explorer" icon={<FlaskConical size={20} className="text-cyan-600" />} badge="Virtual Lab" badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" accentColor="border-cyan-500">
                <div className="lab-block space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Current State</label>
                            <div className="flex gap-2">
                                {states.map(s => (
                                    <button key={s} onClick={() => { setSelectedState(s); setSelectedAction(Object.keys(transitions[s])[0]); }}
                                        className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${selectedState === s ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                                        {s === 'High Battery' ? '🔋 High' : '🪫 Low'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Action</label>
                            <div className="flex gap-2 flex-wrap">
                                {(actions[selectedState as keyof typeof actions] || []).map(a => (
                                    <button key={a} onClick={() => setSelectedAction(a)}
                                        className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${selectedAction === a ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Transition Outcomes</h4>
                        <div className="space-y-2">
                            {trans.map((t, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/70 dark:bg-slate-800/50 rounded-xl p-3">
                                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-300 font-black text-sm">{(t.prob * 100).toFixed(0)}%</div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">→ {t.next}</div>
                                        <div className={`text-xs font-semibold ${t.reward >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>Reward: {t.reward >= 0 ? '+' : ''}{t.reward}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 bg-white/70 dark:bg-slate-800/50 rounded-xl p-3 text-center">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Expected Reward E[R]</div>
                            <div className="text-2xl font-black text-primary-600 dark:text-primary-400">{expectedR.toFixed(2)}</div>
                        </div>
                    </div>

                    <InfoCard type="tip" title="Backup Diagram">
                        A backup diagram for this MDP shows: state node (circle) → action node (filled circle) → next state nodes (circles). The value "backs up" from next states through the action node to the current state. This is the visual representation of the Bellman equation.
                    </InfoCard>
                </div>
            </SectionWrapper>

            <QuestionAccordion questions={[
                { q: 'Describe the Recycling Robot MDP. What are its states, actions, and rewards?', a: 'States: S = {High, Low} (battery level). Actions: A(High) = {Search, Wait}, A(Low) = {Search, Wait, Recharge}. Rewards: Search=+4 (cans collected), Wait=+1, Recharge=0, Search-when-Low-runs-out=-3. Transitions: Search from High → High(0.7), Low(0.3). Search from Low → Low(0.9), High(0.1). This models the trade-off between collecting cans and managing battery life.' },
                { q: 'What is a backup diagram? Draw one for the Recycling Robot.', a: 'A backup diagram shows how value is "backed up" from successor states to the current state. For V_π(High): circle (High) → branches for Search and Wait → filled circles (action nodes) → circles for next states (High, Low). Each branch is weighted by π(a|s) and P(s\'|s,a). The value of High = Σ_a π(a|High) Σ_s\' P(s\'|High,a)[R + γV(s\')].' },
                { q: 'Calculate the expected reward for Search from High Battery state.', a: 'E[R|High,Search] = P(High|High,Search)×R_search + P(Low|High,Search)×R_search = 0.7×4 + 0.3×4 = 2.8 + 1.2 = 4. Note: reward for Search is always +4 regardless of next state. Expected reward = 4. Compare with Wait: E[R|High,Wait] = 1×1 = 1. Search has higher expected reward but risks battery depletion.' },
                { q: 'What is the optimal policy for the Recycling Robot?', a: 'Optimal policy depends on γ. For γ=0.9: π*(High)=Search (high reward, manageable risk), π*(Low)=Recharge (avoid -3 penalty from running out). Intuition: when battery is high, search aggressively. When low, recharge to avoid catastrophic failure. The exact optimal policy is found by solving the Bellman optimality equations for this 2-state MDP.' },
                { q: 'How does the Recycling Robot illustrate the exploration-exploitation trade-off?', a: 'Search = exploitation (collect cans now) + exploration risk (might drain battery). Wait = safe exploitation (guaranteed +1). Recharge = investment (no reward now, but enables future searching). The robot must balance: (1) Immediate reward (Search gives +4), (2) Long-term sustainability (avoid running out of battery = -3). This is the core RL trade-off: maximize long-term return, not just immediate reward.' },
            ]} />
        </div>
    );
}