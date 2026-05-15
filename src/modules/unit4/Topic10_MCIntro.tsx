import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import MCSamplingLab from '../../components/labs/MCSamplingLab';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Target, Zap, TrendingUp, Sparkles, Binary, Focus,
    Activity, Cpu, HardDrive, Briefcase,
    Shield, Move, MousePointer2, User, Play, Pause, RotateCcw, Layout, Dice5, History, Calculator as CalcIcon, Map
} from 'lucide-react';

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic10_MCIntro() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Learning from the Finish Line" 
                subtitle="The Experience-Based Approach"
                icon={<Dice5 className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <History size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🎲 Gambling on Knowledge
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you want to know the probability of winning a game of Solitaire. You don't know the math of all possible deck combinations (The Model). 
                            </p>
                            <p>
                                What do you do? You play 1,000 games and count how many you win. That simple "Averaging of Experience" is the heart of <strong>Monte Carlo (MC) Methods</strong>.
                            </p>
                            <p>
                                Named after the famous casino in Monaco, MC methods don't guess during the journey. They wait until the very end of an episode, look at the final score (The Return), and then update their knowledge.
                            </p>
                            <p>
                                It is the ultimate "Trial and Error" technique—unbiased, simple, and powerful.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The No-Model Edge">
                            MC doesn't need to know how the environment works (No $p(s',r|s,a)$). It only needs to observe the results.
                        </InfoCard>
                        <InfoCard type="tip" title="Episode Completion">
                            Unlike TD learning, MC <strong>must</strong> wait until the episode is over before it can learn anything.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Return Average" 
                subtitle="The Math of Aggregated Experience"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots + \gamma^{T-t-1} R_T"
                        label="The Cumulative Return"
                        accent="blue"
                        explanation="The total discounted reward from time t until the end of the episode at time T."
                        interpretation="MC methods rely on the fact that G_t is a sample of the true value v(s). By collecting many such samples, the average will eventually converge to the true expected value."
                        motivation="This is the raw data used for learning in MC. Because it uses the actual rewards from the entire episode, it is an unbiased estimate of the value."
                        terms={[
                            { term: 'G_t', name: 'Return', meaning: 'Total reward from step t to terminal step T.', range: '\\mathbb{R}', example: 'G = 0 + 0 + 10 = 10 (at the end).' },
                            { term: 'T', name: 'Terminal Time', meaning: 'The step at which the episode ends.', range: '\\mathbb{Z}^+', example: 'Game over at step 50.' },
                        ]}
                    />

                    <MathBlock 
                        formula="V(s) \approx \frac{1}{N(s)} \sum_{i=1}^{N(s)} G_i(s)"
                        label="The MC Estimation Rule"
                        accent="violet"
                        explanation="Estimating the value of a state by averaging all the returns observed after visiting that state."
                        interpretation="As the number of visits N(s) goes to infinity, the average of the observed returns is guaranteed to converge to the true value v_\pi(s). This is the Law of Large Numbers in action."
                        motivation="This allows us to learn without a model. We just keep a running count of visits and a running sum of returns."
                        terms={[
                            { term: 'V(s)', name: 'Estimated Value', meaning: 'The current average of all returns seen from state s.', range: '\\mathbb{R}', example: 'V(room) = 8.5 after 10 visits.' },
                            { term: 'N(s)', name: 'Visit Count', meaning: 'The total number of times state s has been visited across all episodes.', range: '\\mathbb{Z}^+', example: 'If we have played 100 games and hit this state in 20 of them, N(s)=20.' },
                            { term: 'G_i(s)', name: 'Sample Return', meaning: 'The return received after the i-th visit to state s.', range: '\\mathbb{R}', example: 'On visit 3, the agent eventually got a total reward of 12.' },
                        ]}
                        numericalExample={{
                            setup: 'State s visited in 3 episodes. Episode 1 Return: 10. Episode 2 Return: 15. Episode 3 Return: 8.',
                            steps: [
                                'N(s) = 3',
                                'Sum of G = 10 + 15 + 8 = 33',
                                'V(s) = 33 / 3 = 11'
                            ],
                            result: 'The MC estimate for state s is 11.',
                        }}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Sparkles size={16} /> Bias-Variance Trade-off</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            MC is <strong>Unbiased</strong> because it uses the actual return G_t. However, it has <strong>High Variance</strong> because G_t depends on many random actions and environment transitions throughout the entire episode.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Experience Average"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "The Sampling Engine Demo",
                            objectives: "Visualize how complete episode trajectories are required before calculating an average.",
                            instructions: [
                                "Open the 'MC Sampling Engine' in the Virtual Lab section.",
                                "Click 'Start'. Point out: 'The agent must reach the target (🏁) before any value update occurs.'",
                                "Watch the 'Estimated V(start)' counter. Explain: 'The estimate only changes at the end of the episode.'",
                                "Explain: 'This is the fundamental difference from Dynamic Programming or TD learning.'",
                                "Ask: 'What happens to the estimate if we increase the number of episodes?'"
                            ],
                            inputs: "Interactive MCSamplingLab component",
                            outputs: "Live-updating area chart and value counter.",
                            rubrics: ["Clarity of 'Episode completion' concept", "Correct identification of the MC update rule", "Student engagement"],
                            outcomes: "Students identify the statistical foundation of Monte Carlo estimation.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Blackjack Scorekeeper Workshop",
                            objectives: "Collaboratively calculate state values from sample episode outcomes.",
                            instructions: [
                                "Teacher draws a scenario: 'Player has 20, Dealer shows 5'.",
                                "Groups play 3 rounds with real cards (or simulator). Round 1: Win (+1), Round 2: Draw (0), Round 3: Win (+1).",
                                "Class Task: Calculate the MC estimate $V(20 \text{ vs } 5)$ manually.",
                                "Class reflects: 'Does this estimate change if we use a 0.9 discount factor?'",
                                "Conclusion: MC is just accounting for RL."
                            ],
                            inputs: "Blackjack card deck (or sim)",
                            outputs: "Manual calculation of average return",
                            rubrics: ["Arithmetic accuracy", "Correct interpretation of the result", "Classroom participation"],
                            outcomes: "Students master the core update logic of MC prediction.",
                            time: "15 Mins",
                            materials: ["Deck of cards", "Whiteboard"]
                        },
                        {
                            level: 3,
                            title: "The MC vs. DP Debate",
                            objectives: "Critically compare 'Model-Free' learning with 'Model-Based' planning.",
                            instructions: [
                                "Divide class into 2 teams: Team MC and Team DP.",
                                "Scenario: 'Solving a maze in the dark'.",
                                "Team DP: Must explain why they need a map (Transition probabilities) before they can start.",
                                "Team MC: Must explain why they can just walk and learn from the bruises (Experience).",
                                "Debate: Which team finishes faster if the maze is small? Which finishes if the maze changes every day?",
                                "Conclusion: MC is better for complex, unknown environments."
                            ],
                            inputs: "Maze solving scenario",
                            outputs: "Comparison matrix on the board",
                            rubrics: ["Understanding of 'Model-free' vs 'Model-based'", "Logical arguments", "Team coordination"],
                            outcomes: "Students develop the ability to select the right tool for specific environmental constraints.",
                            time: "20 Mins",
                            materials: ["None"]
                        },
                        {
                            level: 4,
                            title: "Trial and Error Audit",
                            objectives: "Independently identify Monte Carlo-like learning in daily skill acquisition.",
                            instructions: [
                                "Task: Choose a skill you learned through pure repetition (e.g., 'Flipping a pancake' or 'Shooting a basketball').",
                                "Audit: Did you have a 'Model' (physics equations) or did you just average your successes?",
                                "Reflection: How many 'Episodes' did it take before your internal $V(s)$ stabilized?",
                                "Analysis: Identify the 'Terminal State' of your chosen task. Why is MC better for this than learning mid-way?",
                                "Propose: A 'Reward Signal' that would have made you learn faster."
                            ],
                            inputs: "Personal skill-learning history",
                            outputs: "Individual MC Learning Report (1 page)",
                            rubrics: ["Correct use of 'Episode' and 'Terminal' terminology", "Logical link to MC theory", "Originality"],
                            outcomes: "Students demonstrate the ability to map abstract RL theory to intuitive human learning processes.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Blackjack Bot" 
                subtitle="Mastering the Casino with Samples"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Solution Architecture</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            How do you build a Blackjack bot using MC?
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Step 1: Simulation</h6>
                            <p className="text-[10px] text-slate-500">Play 1,000,000 games of Blackjack using a random policy.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <h6 className="font-bold text-xs mb-2 text-indigo-600 uppercase">Step 2: Estimation</h6>
                            <p className="text-[10px] text-slate-500">For every hand configuration, average the outcomes (Wins/Losses).</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="MC Foundations"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is Monte Carlo considered "Model-Free"?', a: 'Because it doesn\'t need to know the transition probabilities p(s\'|s,a) or the reward function. It only needs sample sequences of states, actions, and rewards.' },
                        { q: 'What is the main drawback of Monte Carlo methods?', a: 'They can only be applied to episodic tasks (tasks that eventually end). They cannot learn from continuing tasks because they must wait for the end of an episode to calculate the return.' },
                        { q: 'Compare MC and Dynamic Programming (DP) regarding state updates.', a: 'DP updates the value of a state based on the values of its neighbors (One-step lookahead). MC updates the value of a state based on the actual return from the rest of the episode.' }
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
                title="6. Virtual Lab: MC Sampling Engine" 
                subtitle="From Episodes to Estimates"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Watch the agent complete full trajectories before any learning occurs. This is the defining characteristic of Monte Carlo: **learning from experience averages**.
                    </p>
                    <MCSamplingLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Monte Carlo: Initiated!</h3>
                    <p className="text-primary-100">
                        You've seen how to estimate value from pure experience. Ready to see how we visualize these episodes using Backup Diagrams?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: BACKUP DIAGRAMS
                    </button>
                </div>
            </div>
        </div>
    );
}
