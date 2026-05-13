import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../../components/topic/SectionWrapper';
import InfoCard from '../../../components/topic/InfoCard';
import { MathBlock } from '../../../components/topic/MathBlock';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Calculator, Lightbulb, Zap } from 'lucide-react';

const questions = [
    {
        id: 1,
        type: 'conceptual',
        marks: 2,
        question: 'Define Reinforcement Learning. How does it differ from supervised learning?',
        answer: `Reinforcement Learning (RL) is a type of machine learning where an agent learns to make optimal decisions by interacting with an environment and receiving reward signals. The agent learns a policy — a mapping from states to actions — that maximizes cumulative reward over time.

Key differences from Supervised Learning:
• Supervised Learning uses labeled input-output pairs; RL uses reward signals
• In SL, the correct answer is provided; in RL, only feedback (reward/penalty) is given
• SL learns a static mapping; RL learns a sequential decision-making strategy
• RL involves exploration; SL does not
• RL optimizes long-term cumulative reward; SL minimizes prediction error on training data`,
        keyPoints: [
            'RL = Agent + Environment + Reward + Policy',
            'No labeled data — only reward signals',
            'Sequential decision making over time',
            'Exploration vs exploitation trade-off',
        ],
        commonMistakes: [
            'Confusing reward with label — reward is feedback, not the correct answer',
            'Thinking RL always needs a simulator — real-world RL exists too',
        ],
        tips: 'Remember: In RL, the agent is the student, the environment is the teacher, and rewards are the grades.',
    },
    {
        id: 2,
        type: 'conceptual',
        marks: 2,
        question: 'Explain the PEAS framework in the context of a self-driving car as an RL agent.',
        answer: `PEAS stands for Performance measure, Environment, Actuators, and Sensors.

For a self-driving car RL agent:
• Performance Measure: Safety score, travel time, fuel efficiency, passenger comfort, number of traffic violations
• Environment: Roads, traffic, pedestrians, weather conditions, traffic signals, other vehicles
• Actuators: Steering wheel, accelerator, brakes, turn signals, horn
• Sensors: Cameras, LiDAR, GPS, radar, speedometer, accelerometer

The RL agent observes the environment through sensors (state), takes actions through actuators, and receives rewards based on the performance measure.`,
        keyPoints: [
            'P = what we want to maximize (reward function)',
            'E = everything the agent interacts with',
            'A = how the agent affects the environment',
            'S = how the agent perceives the environment',
        ],
        commonMistakes: [
            'Confusing sensors with actuators',
            'Forgetting that performance measure defines the reward function',
        ],
        tips: 'PEAS is the blueprint for designing any RL system. Always start here before coding.',
    },
    {
        id: 3,
        type: 'numerical',
        marks: 2,
        question: 'An RL agent receives rewards R₁=3, R₂=−1, R₃=4, R₄=2 over 4 time steps. Calculate the return G₁ with discount factor γ=0.8.',
        answer: `Given: R₁=3, R₂=−1, R₃=4, R₄=2, γ=0.8

Return G₁ = R₂ + γR₃ + γ²R₄
         = −1 + 0.8×4 + 0.64×2
         = −1 + 3.2 + 1.28
         = 3.48

Note: G₁ starts from R₂ because G_t uses rewards from t+1 onwards.

Alternatively using the recursive formula:
G₄ = R₄ = 2
G₃ = R₄ + γG₄ = 4 + 0.8×2 = 5.6
G₂ = R₃ + γG₃ = −1 + 0.8×5.6 = −1 + 4.48 = 3.48 ✓`,
        keyPoints: [
            'G_t = R_{t+1} + γR_{t+2} + γ²R_{t+3} + ...',
            'Recursive formula: G_t = R_{t+1} + γG_{t+1}',
            'γ=0 → only immediate reward; γ→1 → all future rewards equally valued',
        ],
        commonMistakes: [
            'Starting from R₁ instead of R₂ for G₁',
            'Forgetting to apply γ² for the third term',
            'Using γ=1 when not specified',
        ],
        tips: 'Use the recursive formula G_t = R_{t+1} + γG_{t+1} to avoid calculation errors.',
    },
    {
        id: 4,
        type: 'application',
        marks: 2,
        question: 'Identify the Agent, Environment, State, Action, and Reward for a recommendation system on an e-commerce platform.',
        answer: `For an e-commerce recommendation system:

• Agent: The recommendation algorithm (AI system)
• Environment: The e-commerce platform + user behavior
• State: User's browsing history, current page, time of day, past purchases, demographics
• Action: Which product to recommend (from catalog of N products)
• Reward: +1 if user clicks the recommendation, +5 if user purchases, −0.1 if user ignores

Policy: The mapping from user state to recommended product that maximizes long-term revenue.

The agent learns over millions of user interactions that certain recommendations in certain states lead to higher purchase rates.`,
        keyPoints: [
            'State must capture all relevant information for decision making',
            'Reward design is critical — must align with business goals',
            'Long-term reward (customer lifetime value) > short-term (single click)',
        ],
        commonMistakes: [
            'Making the state too simple (missing important features)',
            'Designing reward only for clicks, not purchases (reward hacking)',
        ],
        tips: 'Amazon, Netflix, and YouTube all use RL-based recommendation systems in production.',
    },
    {
        id: 5,
        type: 'problem-solving',
        marks: 2,
        question: 'Explain the Exploration vs Exploitation dilemma with a real-world example. Why is this a fundamental challenge in RL?',
        answer: `The Exploration vs Exploitation dilemma is one of the most fundamental challenges in RL.

Exploitation: Using the current best-known strategy to maximize immediate reward.
Exploration: Trying new, unknown actions to potentially discover better strategies.

Real-world example — Restaurant Choice:
• Exploitation: Always go to your favorite restaurant (guaranteed good meal)
• Exploration: Try a new restaurant (might be better or worse)

The dilemma: If you always exploit, you might miss a better restaurant. If you always explore, you waste time on bad restaurants.

In RL:
• Too much exploitation → agent gets stuck in local optima
• Too much exploration → agent never converges to good policy
• Solution: ε-greedy strategy — explore with probability ε, exploit with probability (1-ε)
• ε typically starts high (0.9) and decays over time as the agent learns

This is fundamental because:
1. The agent cannot know if unexplored actions are better without trying them
2. Trying suboptimal actions has a cost (negative reward)
3. The optimal balance depends on the problem and is often unknown`,
        keyPoints: [
            'Exploration = trying new things; Exploitation = using known best',
            'ε-greedy: explore with probability ε',
            'ε should decay over time as knowledge increases',
            'No free lunch — must balance both',
        ],
        commonMistakes: [
            'Thinking exploration is always random — it can be systematic',
            'Forgetting that exploitation can lead to local optima',
        ],
        tips: 'Think of it as the "multi-armed bandit" problem — which slot machine to play?',
    },
];

const typeConfig = {
    conceptual: { icon: BookOpen, color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300', label: 'Conceptual' },
    numerical: { icon: Calculator, color: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300', label: 'Numerical' },
    application: { icon: Zap, color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300', label: 'Application' },
    'problem-solving': { icon: Lightbulb, color: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300', label: 'Problem Solving' },
};

export default function QuestionsSection_T1() {
    const [openQ, setOpenQ] = useState<Record<number, boolean>>({});
    const [filter, setFilter] = useState<string>('all');

    const filtered = filter === 'all' ? questions : questions.filter(q => q.type === filter);

    return (
        <SectionWrapper
            id="questions"
            title="Section 5: Model 2-Mark Questions"
            subtitle="Conceptual, numerical, application, and problem-solving questions"
            icon={<HelpCircle size={20} className="text-cyan-600" />}
            badge="Question Bank"
            badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300"
            accentColor="border-cyan-500"
        >
            {/* Filter */}
            <div className="flex gap-2 flex-wrap mb-6">
                {['all', 'conceptual', 'numerical', 'application', 'problem-solving'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize ${filter === f
                                ? 'bg-cyan-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                    >
                        {f === 'all' ? 'All Questions' : f}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filtered.map((q, idx) => {
                    const config = typeConfig[q.type as keyof typeof typeConfig];
                    const Icon = config.icon;
                    const isOpen = openQ[q.id];

                    return (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="card overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenQ(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                                className="w-full flex items-start gap-4 p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                            >
                                <div className="flex-shrink-0 mt-0.5">
                                    <span className={`section-tag text-xs ${config.color}`}>
                                        <Icon size={12} /> {config.label}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                                        Q{q.id}. {q.question}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1">{q.marks} marks</div>
                                </div>
                                <div className="flex-shrink-0 mt-1">
                                    {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 space-y-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                                            {/* Answer */}
                                            <div>
                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Model Answer</div>
                                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                                                    {q.answer}
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {/* Key Points */}
                                                <div>
                                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Points</div>
                                                    <ul className="space-y-1">
                                                        {q.keyPoints.map(kp => (
                                                            <li key={kp} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                                <span className="text-emerald-500 flex-shrink-0">✓</span>{kp}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Common Mistakes */}
                                                <div>
                                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Common Mistakes</div>
                                                    <ul className="space-y-1">
                                                        {q.commonMistakes.map(m => (
                                                            <li key={m} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                                <span className="text-red-500 flex-shrink-0">✗</span>{m}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <InfoCard type="tip" title="Memory Tip">
                                                {q.tips}
                                            </InfoCard>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
