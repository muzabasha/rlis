import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Coins, Rocket, Waypoints, Search, Play, Pause, RotateCcw, TrendingUp
} from 'lucide-react';

// ─── Interactive Components ──────────────────────────────────────────────────

function MRPSimulatorLab() {
    // 3 states: Class (0), Facebook (1), Sleep (2 - Absorbing)
    const [currentState, setCurrentState] = useState(0);
    const [totalReward, setTotalReward] = useState(0);
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const gamma = 0.9;

    const states = [
        { id: 0, name: 'Class', reward: -2, icon: '📚', color: 'blue' },
        { id: 1, name: 'Facebook', reward: -1, icon: '📱', color: 'red' },
        { id: 2, name: 'Sleep', reward: 0, icon: '😴', color: 'emerald' }
    ];

    // Transition Matrix
    const P = [
        [0.4, 0.4, 0.2], // From Class -> Class, Facebook, Sleep
        [0.2, 0.8, 0.0], // From Facebook -> Class, Facebook, Sleep
        [0.0, 0.0, 1.0]  // From Sleep -> Sleep (Absorbing)
    ];

    const nextStep = () => {
        if (currentState === 2) {
            setIsPlaying(false);
            return;
        }

        const rand = Math.random();
        const probs = P[currentState];
        let nextState = 0;

        if (rand < probs[0]) nextState = 0;
        else if (rand < probs[0] + probs[1]) nextState = 1;
        else nextState = 2;

        const currentReward = states[currentState].reward;
        const discountedReward = currentReward * Math.pow(gamma, step);

        setTotalReward(prev => prev + discountedReward);
        setCurrentState(nextState);
        setStep(s => s + 1);
    };

    const reset = () => {
        setCurrentState(0);
        setTotalReward(0);
        setStep(0);
        setIsPlaying(false);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying && currentState !== 2) {
            interval = setInterval(nextStep, 1000);
        } else if (currentState === 2) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentState, step]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Waypoints size={18} className="text-primary-500" />
                        Student MRP Simulator
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Watch the agent transition through states and accumulate discounted rewards.</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <button onClick={() => setIsPlaying(!isPlaying)} disabled={currentState === 2} className={`p-2 rounded-xl text-xs font-bold transition-all ${isPlaying ? 'bg-amber-100 text-amber-600' : 'bg-primary-100 text-primary-600'} disabled:opacity-50`}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={reset} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* State Visualization */}
                <div className="relative h-48 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-around p-4 overflow-hidden">
                    {states.map((s, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: currentState === i ? 1.2 : 1,
                                opacity: currentState === i ? 1 : 0.4,
                                y: currentState === i ? -10 : 0
                            }}
                            className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl ${currentState === i ? `bg-${s.color}-100 text-${s.color}-600 shadow-lg shadow-${s.color}-500/20` : 'bg-slate-50 text-slate-400'}`}
                        >
                            <span className="text-3xl mb-1">{s.icon}</span>
                            <span className="text-[10px] font-bold uppercase">{s.name}</span>
                            <span className="text-[10px] font-mono bg-white/50 px-2 rounded-md mt-1 border border-black/5">R: {s.reward}</span>
                        </motion.div>
                    ))}

                    {currentState === 2 && (
                        <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="bg-white px-4 py-2 rounded-full font-bold text-sm shadow-xl text-slate-800">Episode Terminated</span>
                        </div>
                    )}
                </div>

                {/* Metrics Dashboard */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Time Step (t)</span>
                            <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">{step}</div>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Return (G)</span>
                            <div className="text-2xl font-black text-primary-600 mt-1">{totalReward.toFixed(2)}</div>
                        </div>
                    </div>

                    <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-900/30">
                        <div className="flex justify-between text-xs font-bold mb-2">
                            <span className="text-slate-600 dark:text-slate-400">Current Math</span>
                            <span className="text-primary-600">γ = 0.9</span>
                        </div>
                        <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
                            Reward: {states[currentState].reward} <br />
                            Discount: 0.9^{step} = {Math.pow(gamma, step).toFixed(2)} <br />
                            <div className="h-px bg-primary-200 dark:bg-primary-800 my-2" />
                            Added to Return: {(states[currentState].reward * Math.pow(gamma, step)).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic9_MarkovRewardProcess() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. Adding Value to the Chain"
                subtitle="From Observer to Evaluator"
                icon={<Coins className="text-emerald-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Waypoints size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
                            🗺️ The Treasure Map
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                A Markov Chain is like watching a leaf blow in the wind. You know where it is, and you know the probabilities of where it will go next. But you don't really care.
                            </p>
                            <p>
                                A <strong>Markov Reward Process (MRP)</strong> changes that. It adds a "Reward" to every state. Suddenly, moving through the chain has a score.
                            </p>
                            <p>
                                In an MRP, you are still a passive observer—you have no control over where the leaf blows. But now, every time the leaf lands on a specific spot, you either gain a gold coin or lose one. Your goal is to evaluate exactly how much gold you expect to have by the end of the journey.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The MRP Tuple">
                            An MRP is defined by 4 elements: ⟨S, P, R, γ⟩ (States, Transitions, Rewards, Discount).
                        </InfoCard>
                        <InfoCard type="tip" title="No Actions Yet">
                            Notice there is no 'A' (Actions) in the tuple. We cannot control the transitions yet.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="2. The Bellman Equation for MRPs"
                subtitle="The Mathematical Heart of Evaluation"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                        <h5 className="text-primary-400 font-bold mb-6 flex items-center gap-2 text-xl">
                            <TrendingUp size={20} /> The Value Function
                        </h5>
                        <div className="space-y-6">
                            <MathBlock
                                formula="V(s) = \mathbb{E} [G_t | S_t = s]"
                                label="Definition of State Value"
                                explanation="The Value of state 's' is the expected return (sum of discounted rewards) starting from state 's'."
                            />
                            <div className="h-px bg-slate-800 my-4" />
                            <MathBlock
                                formula="V(s) = \mathcal{R}_s + \gamma \sum_{s' \in \mathcal{S}} \mathcal{P}_{ss'} V(s')"
                                label="Bellman Equation for MRPs"
                                explanation="The value of the current state equals the immediate reward PLUS the discounted value of all possible next states, weighted by their transition probabilities."
                            />
                        </div>
                    </div>

                    <SymbolTable
                        symbols={[
                            { symbol: 'V(s)', meaning: 'The Value Function of state s.' },
                            { symbol: '\mathbb{E}', meaning: 'Expected value (average over all possible random paths).' },
                            { symbol: '\mathcal{R}_s', meaning: 'The immediate reward received upon leaving state s.' },
                            { symbol: '\mathcal{P}_{ss\'}', meaning: 'The probability of transitioning from state s to state s\'.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="3. Activity: The Student Markov Process"
                subtitle="Calculating Values Manually"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Class Task: Calculate the Bellman Update</h4>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 text-sm">
                            <p className="mb-2"><strong>State:</strong> Class ($R = -2$)</p>
                            <p className="mb-2"><strong>Next State Probabilities:</strong> 50% to Facebook ($V = -1$), 50% to Pass ($V = +10$). $\gamma = 1$.</p>
                            <p className="font-bold text-primary-600 mb-2">Calculate V(Class):</p>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 font-mono rounded text-xs">
                                V(Class) = -2 + 1.0 * [ (0.5 * -1) + (0.5 * 10) ]
                                <br />V(Class) = -2 + [ -0.5 + 5.0 ]
                                <br />V(Class) = -2 + 4.5 = 2.5
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="4. Project: PageRank with Taxation"
                subtitle="Google's Secret MRP"
                icon={<Rocket className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Search size={18} /> The Teleportation Fix</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Google's PageRank algorithm is famous for using a Markov Chain. But early on, users figured out how to build "link farms" (cyclic traps) to trick the algorithm and trap the Markov chain in an infinite loop.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-sm text-slate-600 dark:text-slate-400">
                        <p className="mb-4">
                            Google fixed this by introducing a <strong>Discount Factor ($\gamma = 0.85$)</strong>.
                        </p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>At any given step, the web surfer has an 85% chance of following a link ($\gamma$).</li>
                            <li>They have a 15% chance of getting bored and "teleporting" to a completely random page ($1 - \gamma$).</li>
                        </ul>
                        <p className="mt-4 italic font-bold text-indigo-500">
                            By adding $\gamma$, Google transformed the internet from a standard Markov Chain into a Markov Reward Process!
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="5. Quick Check"
                subtitle="MRP Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the key difference between a Markov Chain and a Markov Reward Process?', a: 'An MRP introduces Rewards (\u211C) and a Discount Factor (\u03B3) to evaluate the "value" of being in different states, whereas a Markov Chain only models the transition probabilities.' },
                        { q: 'Explain the Bellman Equation for an MRP in plain English.', a: 'The value of a state is equal to the immediate reward you get for being there, plus the average of the discounted values of all the places you might end up next.' },
                        { q: 'Can an agent choose its actions in an MRP?', a: 'No. An MRP models autonomous environments. The agent is a passive observer along for the ride.' }
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
                title="6. Virtual Lab: Student MRP Simulator"
                subtitle="Watch Rewards Accumulate"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Hit Play to watch a passive agent transition through the "Student" MRP. Notice how negative rewards (Class, Facebook) reduce the total return until the agent hits the "Sleep" absorbing state, ending the episode.
                    </p>
                    <MRPSimulatorLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Evaluation Complete!</h3>
                    <p className="text-primary-100">
                        You know how to evaluate the value of states when you have no control. Now, what happens when we give the agent the power to CHOOSE actions?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: STATE VALUE FUNCTION (MDP)
                    </button>
                </div>
            </div>
        </div>
    );
}
