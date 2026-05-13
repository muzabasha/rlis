import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../../components/topic/SectionWrapper';
import InfoCard from '../../../components/topic/InfoCard';
import { BookOpen, MessageCircle, Lightbulb, ChevronRight, Brain, Star } from 'lucide-react';

const storySteps = [
    {
        id: 1,
        emoji: '🐕',
        title: 'Meet Bruno — The World\'s Most Stubborn Dog',
        content: `Imagine you just adopted a puppy named Bruno. Bruno has absolutely no idea what "sit", "stay", or "fetch" means. He's not dumb — he just hasn't learned yet.

On Day 1, you try to teach Bruno to sit. You say "Sit!" — Bruno stares at you blankly and then chases his tail. You give him a treat anyway (bad idea!). Next day, Bruno chases his tail every time you say "Sit!" — because he learned that tail-chasing = treat!

You realize: Bruno is learning from consequences. Every action he takes gets a response from you — a treat (reward) or a firm "No!" (penalty). Over days, Bruno figures out which actions lead to treats and which lead to scolding.`,
        question: 'What is Bruno actually doing here? Is he following instructions? Is he memorizing examples?',
        insight: 'Bruno is not following a rulebook. He is not memorizing examples. He is EXPLORING actions and LEARNING from the feedback he receives. This is the core idea of Reinforcement Learning!',
    },
    {
        id: 2,
        emoji: '🎮',
        title: 'Now Imagine Bruno Playing a Video Game',
        content: `Fast forward — Bruno somehow gets hold of a video game controller (don't ask how). The game is simple: move left, move right, jump, duck. Bruno has no idea what the goal is.

He randomly presses buttons. Sometimes he falls into a pit (−10 points). Sometimes he collects a coin (+5 points). Sometimes he defeats an enemy (+20 points). Bruno doesn't read the manual. He doesn't watch tutorials.

But after 1000 random button presses, something magical happens: Bruno starts pressing buttons that consistently give him more points. He's learned a STRATEGY — not from instructions, but from trial and error with rewards and penalties.`,
        question: 'How did Bruno learn without anyone teaching him the rules? What was his "teacher"?',
        insight: 'The ENVIRONMENT was his teacher! The game gave him feedback (rewards/penalties) for every action. Bruno learned by interacting with the environment — this is exactly how Reinforcement Learning works!',
    },
    {
        id: 3,
        emoji: '🧠',
        title: 'From Bruno to Algorithms',
        content: `Now replace Bruno with a computer program. Replace the video game with a real-world problem — like controlling a robot arm, managing stock portfolios, or driving a car.

The program (called an AGENT) takes ACTIONS in an ENVIRONMENT. The environment gives back a STATE (what the world looks like now) and a REWARD (how good or bad the action was).

The agent's goal: maximize total reward over time. Not just immediate reward — but long-term cumulative reward. Just like Bruno learned that sometimes it's better to skip a small treat now to get a bigger treat later!`,
        question: 'Can you think of a real-world situation where you learned something purely by trial and error — without anyone teaching you?',
        insight: 'Learning to ride a bicycle, learning to cook, learning to play chess — all involve trial, error, feedback, and improvement. Reinforcement Learning is the mathematical formalization of this natural learning process!',
    },
];

const timeline = [
    { year: '1950s', event: 'Alan Turing proposes the "learning machine" concept', icon: '🤖' },
    { year: '1954', event: 'Minsky & Clark build the first neural network learning machine (SNARC)', icon: '⚡' },
    { year: '1959', event: 'Samuel\'s Checkers program — first self-learning game AI', icon: '♟️' },
    { year: '1960s', event: 'Temporal Difference (TD) learning concepts emerge', icon: '📐' },
    { year: '1972', event: 'Michie & Chambers develop BOXES — pole balancing controller', icon: '🎯' },
    { year: '1988', event: 'Sutton formalizes TD learning — foundation of modern RL', icon: '📚' },
    { year: '1992', event: 'Watkins & Dayan publish Q-learning algorithm', icon: '🔬' },
    { year: '2013', event: 'DeepMind\'s DQN plays Atari games at superhuman level', icon: '🎮' },
    { year: '2016', event: 'AlphaGo defeats world champion Lee Sedol in Go', icon: '🏆' },
    { year: '2022+', event: 'RLHF powers ChatGPT, Gemini, and modern LLMs', icon: '🚀' },
];

export default function StorySection_T1() {
    const [activeStep, setActiveStep] = useState(0);
    const [showInsight, setShowInsight] = useState<Record<number, boolean>>({});
    const [showTimeline, setShowTimeline] = useState(false);

    const toggleInsight = (id: number) => {
        setShowInsight(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <SectionWrapper
            id="story"
            title="Section 1: The Story — How Bruno Taught Us Reinforcement Learning"
            subtitle="Start here — no prior knowledge needed"
            icon={<BookOpen size={20} className="text-amber-600" />}
            badge="Storytelling + Analogy"
            badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
            accentColor="border-amber-500"
        >
            {/* Story Steps */}
            <div className="space-y-6">
                {storySteps.map((step, idx) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="story-block"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl flex-shrink-0">{step.emoji}</div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">
                                    {step.title}
                                </h3>
                                <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-4">
                                    {step.content}
                                </div>

                                {/* Reflective Question */}
                                <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 mb-3 border border-amber-200 dark:border-amber-700">
                                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold mb-2">
                                        <MessageCircle size={16} />
                                        <span>Think About This:</span>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 italic">{step.question}</p>
                                </div>

                                {/* Reveal Insight */}
                                <button
                                    onClick={() => toggleInsight(step.id)}
                                    className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
                                >
                                    <Lightbulb size={16} />
                                    {showInsight[step.id] ? 'Hide Insight' : 'Reveal the Connection →'}
                                </button>

                                <AnimatePresence>
                                    {showInsight[step.id] && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 rounded-xl p-4"
                                        >
                                            <div className="flex items-start gap-2">
                                                <Star size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-amber-900 dark:text-amber-100 font-medium">{step.insight}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Formal Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="card p-6 border-l-4 border-primary-500"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Brain size={24} className="text-primary-600 dark:text-primary-400" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Now Let's Get Technical: What is Reinforcement Learning?
                        </h3>
                    </div>

                    <InfoCard type="definition" title="Reinforcement Learning — Formal Definition">
                        Reinforcement Learning (RL) is a type of machine learning where an <strong>agent</strong> learns to make
                        decisions by interacting with an <strong>environment</strong>. The agent receives <strong>rewards</strong> or
                        <strong> penalties</strong> based on its actions and learns a <strong>policy</strong> — a strategy that
                        maximizes cumulative reward over time. (Sutton & Barto, 2019)
                    </InfoCard>

                    <div className="grid sm:grid-cols-3 gap-4 mt-4">
                        {[
                            { term: 'Agent', desc: 'The learner/decision-maker (Bruno, the program)', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' },
                            { term: 'Environment', desc: 'Everything the agent interacts with (the game, the world)', color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300' },
                            { term: 'Reward', desc: 'Feedback signal — positive or negative (treat or scolding)', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300' },
                            { term: 'State', desc: 'Current situation/observation of the environment', color: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300' },
                            { term: 'Action', desc: 'What the agent does in a given state', color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300' },
                            { term: 'Policy', desc: 'The strategy: which action to take in each state', color: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300' },
                        ].map(item => (
                            <div key={item.term} className={`border rounded-xl p-3 ${item.color}`}>
                                <div className="font-bold text-sm mb-1">{item.term}</div>
                                <div className="text-xs opacity-80">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Why RL is Needed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="card p-6"
                >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <ChevronRight size={20} className="text-primary-600" />
                        Why Do We Need Reinforcement Learning?
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            {
                                title: 'When Rules Are Unknown',
                                desc: 'In chess, Go, or robotics — we cannot write explicit rules for every situation. RL discovers rules automatically.',
                                icon: '🎯',
                            },
                            {
                                title: 'When Data Labels Are Expensive',
                                desc: 'Supervised learning needs labeled data. RL only needs a reward signal — much cheaper and more scalable.',
                                icon: '💰',
                            },
                            {
                                title: 'When Decisions Are Sequential',
                                desc: 'Real-world decisions have long-term consequences. RL optimizes for cumulative reward, not just immediate gain.',
                                icon: '⏳',
                            },
                            {
                                title: 'When Environments Are Dynamic',
                                desc: 'RL agents adapt to changing environments — unlike fixed rule-based systems that break when conditions change.',
                                icon: '🔄',
                            },
                        ].map(item => (
                            <div key={item.title} className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                <div>
                                    <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{item.title}</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Historical Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="card p-6"
                >
                    <button
                        onClick={() => setShowTimeline(v => !v)}
                        className="w-full flex items-center justify-between text-left"
                    >
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>📅</span> Early Roots: The History of Reinforcement Learning
                        </h3>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                            {showTimeline ? 'Collapse' : 'Expand Timeline'}
                        </span>
                    </button>

                    <AnimatePresence>
                        {showTimeline && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 overflow-hidden"
                            >
                                <div className="relative">
                                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                                    <div className="space-y-4">
                                        {timeline.map((item, idx) => (
                                            <motion.div
                                                key={item.year}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.08 }}
                                                className="flex items-start gap-4 pl-4"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-primary-500 border-2 border-white dark:border-slate-800 flex-shrink-0 mt-1 z-10" />
                                                <div className="flex-1 pb-2">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-lg">{item.icon}</span>
                                                        <span className="font-bold text-primary-600 dark:text-primary-400 text-sm">{item.year}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.event}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <InfoCard type="tip" title="Key Insight from History">
                                    RL has two parallel roots: (1) <strong>Trial-and-error learning</strong> from animal psychology
                                    (Pavlov, Thorndike), and (2) <strong>Optimal control theory</strong> from mathematics and engineering.
                                    Sutton & Barto unified these in their landmark 1998/2019 textbook — the foundation of this course.
                                </InfoCard>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Life Skills Connection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-6"
                >
                    <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100 mb-4">
                        🌟 How This Topic Improves Your Life Skills
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { skill: 'Decision Making', desc: 'RL teaches you to think about long-term consequences, not just immediate gains — a critical life skill.' },
                            { skill: 'Resilience', desc: 'RL agents learn from failure. Every mistake is data. This mindset transforms how you approach challenges.' },
                            { skill: 'Systems Thinking', desc: 'Understanding agent-environment interaction builds your ability to analyze complex real-world systems.' },
                        ].map(item => (
                            <div key={item.skill} className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-4">
                                <div className="font-bold text-primary-700 dark:text-primary-300 mb-2">{item.skill}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
