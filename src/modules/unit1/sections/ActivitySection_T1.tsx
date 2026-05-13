import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../../components/topic/SectionWrapper';
import InfoCard from '../../../components/topic/InfoCard';
import { Users, User, UserCheck, Monitor, Clock, Target, CheckSquare } from 'lucide-react';

const levels = [
    {
        level: 1,
        title: 'Teacher Demonstrates',
        role: 'Teacher Do',
        icon: Monitor,
        color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
        headerColor: 'bg-blue-600',
        duration: '10 min',
        objectives: [
            'Demonstrate the RL loop visually on the board',
            'Show how an agent learns from rewards using a simple grid example',
            'Introduce the 6 key terms: Agent, Environment, State, Action, Reward, Policy',
        ],
        materials: ['Whiteboard / Projector', 'Colored markers', 'Grid drawn on board (5×5)'],
        instructions: [
            'Draw a 5×5 grid on the board. Mark one cell as "Start" (S) and one as "Goal" (G).',
            'Place a stick figure (the "agent") at Start.',
            'Ask: "What should the agent do?" — take suggestions from students.',
            'Move the agent one step. Write "+1" if closer to goal, "-1" if farther.',
            'Repeat for 5 moves, showing how rewards accumulate.',
            'Ask: "What strategy did the agent develop?" — connect to the concept of Policy.',
            'Write the formal RL loop on the board: S_t → A_t → R_{t+1} → S_{t+1}',
        ],
        expectedObservations: [
            'Students will suggest random moves initially',
            'After seeing rewards, students will suggest goal-directed moves',
            'Students will naturally discover the concept of "policy" without being told',
        ],
        rubric: [],
    },
    {
        level: 2,
        title: 'Teacher + Students Together',
        role: 'Guided Collaboration',
        icon: UserCheck,
        color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
        headerColor: 'bg-emerald-600',
        duration: '15 min',
        objectives: [
            'Students experience the RL loop as active participants',
            'Understand exploration vs exploitation through guided questioning',
            'Connect the Bruno story to formal RL terminology',
        ],
        materials: ['Printed grid sheets (one per pair)', 'Dice (for random exploration)', 'Score tracking sheet'],
        instructions: [
            'Pair students. One is the "Agent", one is the "Environment".',
            'Agent closes eyes. Environment places a "treasure" on the grid.',
            'Agent says a direction (Up/Down/Left/Right). Environment says "+1" (closer) or "-1" (farther).',
            'After 10 moves, switch roles.',
            'Teacher asks: "Did you explore randomly or follow a strategy? Why?"',
            'Guided question: "What if you always went right? What if you always explored randomly?"',
            'Connect to Exploration vs Exploitation: "Sometimes you must explore to find better rewards!"',
        ],
        expectedObservations: [
            'Students will start randomly, then develop a strategy',
            'Some pairs will find the treasure faster — discuss why',
            'Natural discussion of exploration vs exploitation emerges',
        ],
        rubric: [],
    },
    {
        level: 3,
        title: 'All Students Do',
        role: 'Group Activity',
        icon: Users,
        color: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800',
        headerColor: 'bg-violet-600',
        duration: '15 min',
        objectives: [
            'Groups design their own RL problem from real life',
            'Identify Agent, Environment, State, Action, Reward for their problem',
            'Present and defend their design to the class',
        ],
        materials: ['A4 paper', 'Markers', 'Timer'],
        instructions: [
            'Form groups of 4 students.',
            'Each group picks ONE real-world scenario from the list below.',
            'Groups must identify and write: Agent, Environment, State, Action, Reward, Goal.',
            'Groups draw the RL loop diagram for their scenario.',
            'Each group presents in 2 minutes. Class votes on the best design.',
            'Teacher provides feedback on each presentation.',
        ],
        scenarios: [
            '🚗 Self-driving car navigating a city',
            '🏥 Hospital robot delivering medicines',
            '📱 Recommendation system on YouTube',
            '♟️ Chess-playing AI',
            '🌡️ Smart thermostat controlling room temperature',
            '🤖 Robot arm assembling a product',
        ],
        expectedObservations: [
            'Groups will debate what counts as "state" vs "action"',
            'Reward design will be the hardest part — good discussion point',
            'Students will realize RL applies to many everyday systems',
        ],
        rubric: [
            { criterion: 'Correct identification of all 6 components', excellent: 'All 6 correct with clear justification', good: '4-5 correct', needs_improvement: '3 or fewer correct' },
            { criterion: 'Diagram clarity', excellent: 'Clear, labeled, with arrows showing flow', good: 'Mostly clear, minor errors', needs_improvement: 'Unclear or missing' },
            { criterion: 'Presentation quality', excellent: 'Confident, clear, answers questions', good: 'Adequate, some hesitation', needs_improvement: 'Unclear or incomplete' },
        ],
    },
    {
        level: 4,
        title: 'Individual Student Does',
        role: 'Independent Work',
        icon: User,
        color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
        headerColor: 'bg-amber-600',
        duration: '10 min',
        objectives: [
            'Independently apply RL concepts to a novel scenario',
            'Reflect on personal learning from trial and error',
            'Write a mini-definition of RL in own words',
        ],
        materials: ['Notebook', 'Pen'],
        instructions: [
            'Think of ONE personal experience where you learned by trial and error (cooking, sports, gaming, etc.).',
            'Write it as an RL problem: identify Agent, Environment, State, Action, Reward.',
            'Calculate a simple return: if you got rewards of 2, -1, 3, 5 with γ=0.9, what is G₁?',
            'Write your own definition of Reinforcement Learning in 2-3 sentences.',
            'Reflection: "What would have happened if you only exploited what you knew and never explored?"',
        ],
        expectedOutput: 'A filled RL problem template + return calculation + personal definition',
        rubric: [
            { criterion: 'Personal RL problem mapping', excellent: 'All 5 components correctly identified', good: '3-4 correct', needs_improvement: '1-2 correct' },
            { criterion: 'Return calculation', excellent: 'Correct with steps shown', good: 'Minor arithmetic error', needs_improvement: 'Incorrect or missing' },
            { criterion: 'Personal definition', excellent: 'Accurate, in own words, with example', good: 'Mostly accurate', needs_improvement: 'Copied or inaccurate' },
        ],
    },
];

export default function ActivitySection_T1() {
    const [activeLevel, setActiveLevel] = useState(0);

    return (
        <SectionWrapper
            id="activity"
            title="Section 3: Activity-Based Learning"
            subtitle="4 progressive levels — from teacher demo to independent mastery"
            icon={<Users size={20} className="text-emerald-600" />}
            badge="NEP 2020 Activity"
            badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
            accentColor="border-emerald-500"
        >
            {/* Level Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {levels.map((l, idx) => {
                    const Icon = l.icon;
                    return (
                        <button
                            key={l.level}
                            onClick={() => setActiveLevel(idx)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${activeLevel === idx
                                    ? `${l.headerColor} text-white shadow-md`
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                }`}
                        >
                            <Icon size={15} />
                            Level {l.level}: {l.role}
                        </button>
                    );
                })}
            </div>

            {/* Active Level Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeLevel}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`activity-block border ${levels[activeLevel].color}`}
                >
                    {(() => {
                        const l = levels[activeLevel];
                        const Icon = l.icon;
                        return (
                            <div className="space-y-5">
                                {/* Header */}
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${l.headerColor} rounded-xl flex items-center justify-center`}>
                                        <Icon size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg text-slate-900 dark:text-white">{l.title}</div>
                                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1"><Clock size={13} /> {l.duration}</span>
                                            <span className="flex items-center gap-1"><Target size={13} /> {l.objectives.length} objectives</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Objectives */}
                                <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">🎯 Learning Objectives</h4>
                                    <ul className="space-y-1">
                                        {l.objectives.map((o, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                <CheckSquare size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Materials */}
                                {l.materials && (
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">📦 Materials Required</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {l.materials.map(m => (
                                                <span key={m} className="bg-white/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Instructions */}
                                <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">📋 Step-by-Step Instructions</h4>
                                    <ol className="space-y-2">
                                        {l.instructions.map((inst, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                                <span className="w-6 h-6 bg-white/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                    {i + 1}
                                                </span>
                                                {inst}
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                {/* Scenarios for Level 3 */}
                                {'scenarios' in l && l.scenarios && (
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">🎲 Choose Your Scenario</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {(l.scenarios as string[]).map(s => (
                                                <div key={s} className="bg-white/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-700 dark:text-slate-300">
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Expected Observations */}
                                {l.expectedObservations && (
                                    <InfoCard type="info" title="Expected Observations">
                                        <ul className="space-y-1">
                                            {l.expectedObservations.map((o, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-blue-500">→</span> {o}
                                                </li>
                                            ))}
                                        </ul>
                                    </InfoCard>
                                )}

                                {/* Rubric */}
                                {l.rubric && l.rubric.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">📊 Assessment Rubric</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-xs">
                                                <thead>
                                                    <tr className="bg-white/70 dark:bg-slate-800/50">
                                                        <th className="text-left p-2 font-semibold text-slate-700 dark:text-slate-300">Criterion</th>
                                                        <th className="text-left p-2 font-semibold text-emerald-700 dark:text-emerald-300">Excellent (3)</th>
                                                        <th className="text-left p-2 font-semibold text-amber-700 dark:text-amber-300">Good (2)</th>
                                                        <th className="text-left p-2 font-semibold text-red-700 dark:text-red-300">Needs Work (1)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {l.rubric.map((r, i) => (
                                                        <tr key={i} className="border-t border-slate-200 dark:border-slate-700">
                                                            <td className="p-2 font-medium text-slate-700 dark:text-slate-300">{r.criterion}</td>
                                                            <td className="p-2 text-slate-600 dark:text-slate-400">{r.excellent}</td>
                                                            <td className="p-2 text-slate-600 dark:text-slate-400">{r.good}</td>
                                                            <td className="p-2 text-slate-600 dark:text-slate-400">{r.needs_improvement}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </motion.div>
            </AnimatePresence>
        </SectionWrapper>
    );
}
