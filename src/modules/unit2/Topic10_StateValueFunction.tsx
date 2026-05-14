import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    Target, LayoutGrid, Brain, Swords, Focus, CheckCircle2, XCircle
} from 'lucide-react';

// ─── Interactive Components ──────────────────────────────────────────────────

function GridworldValueLab() {
    const [policy, setPolicy] = useState<'Random' | 'Optimal'>('Random');
    
    // 3x3 Gridworld
    // Values vary based on the policy chosen.
    // Goal is top-right (index 2). Trap is middle-right (index 5).
    
    const randomValues = [
        0.1,  0.5,  10.0,
        -0.2, -0.8, -10.0,
        -0.5, -0.6, -0.9
    ];

    const optimalValues = [
        8.1,  9.0,  10.0,
        7.2,  8.1, -10.0,
        6.4,  7.2,  6.4
    ];

    const currentValues = policy === 'Random' ? randomValues : optimalValues;

    const getColor = (val: number, isGoal: boolean, isTrap: boolean) => {
        if (isGoal) return 'bg-emerald-500 text-white';
        if (isTrap) return 'bg-red-500 text-white';
        
        // Heatmap logic for regular states
        if (val > 8) return 'bg-emerald-300 text-emerald-900';
        if (val > 5) return 'bg-emerald-100 text-emerald-900';
        if (val > 0) return 'bg-slate-100 text-slate-800';
        if (val > -1) return 'bg-red-100 text-red-900';
        return 'bg-red-200 text-red-900';
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <LayoutGrid size={18} className="text-primary-500" />
                        Gridworld Value Heatmap
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">How policy changes the value of states.</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setPolicy('Random')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${policy === 'Random' ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                        Random Policy
                    </button>
                    <button 
                        onClick={() => setPolicy('Optimal')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${policy === 'Optimal' ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                        Optimal Policy
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Grid */}
                <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100">
                    {currentValues.map((val, i) => {
                        const isGoal = i === 2;
                        const isTrap = i === 5;
                        return (
                            <motion.div 
                                key={i}
                                layout
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className={`aspect-square rounded-xl flex flex-col items-center justify-center font-bold text-lg shadow-inner ${getColor(val, isGoal, isTrap)}`}
                            >
                                {isGoal ? '🏆' : isTrap ? '🔥' : val.toFixed(1)}
                                <div className="text-[8px] opacity-70 mt-1 uppercase font-black tracking-widest">{isGoal ? 'Goal' : isTrap ? 'Trap' : `V(s${i})`}</div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Explanation */}
                <div className="space-y-4">
                    <div className={`p-6 rounded-2xl border ${policy === 'Optimal' ? 'bg-primary-50/50 border-primary-100 dark:bg-primary-900/10 dark:border-primary-900/30' : 'bg-slate-100/50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                        <h5 className="font-bold mb-2 flex items-center gap-2 text-sm">
                            {policy === 'Optimal' ? <CheckCircle2 className="text-primary-500" size={16} /> : <XCircle className="text-slate-500" size={16} />}
                            {policy} Policy Selected
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {policy === 'Random' 
                                ? "Under a Random Policy, the agent moves blindly. Even if it starts right next to the goal (V(s1)), it might randomly walk into the fire. Thus, the value of almost every state is very low or negative."
                                : "Under an Optimal Policy, the agent knows exactly where the goal is. It moves directly towards it and avoids the fire. Thus, the states close to the goal become highly valuable!"
                            }
                        </p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-200 font-medium italic">
                        Crucial Insight: The physical state (grid square) didn't change. But its <strong>Value</strong> changed dramatically because the agent's <strong>behavior</strong> changed.
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic10_StateValueFunction() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Evaluating the Board" 
                subtitle="How Good is This Position?"
                icon={<Target className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Swords size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            ♟️ The Grandmaster's Eye
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                If you pause a chess game in the middle, who is winning? A novice might just count the pieces. But a Grandmaster looks at the board and instantly "feels" the value of the position. 
                            </p>
                            <p>
                                They might be down a knight, but they know that from this exact <strong>State</strong>, they have a forced checkmate in 5 moves. Therefore, the <strong>Value</strong> of that specific state is extremely high.
                            </p>
                            <p>
                                In an MDP, the <strong>State Value Function $v_\pi(s)$</strong> is the mathematical equivalent of the Grandmaster's intuition. It tells the agent exactly how much total reward it can expect to collect from now on, starting from state $s$.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Subject to Behavior">
                            The value of a chess position is only high if you actually know how to play the winning moves. The value depends entirely on your <strong>Policy ($\pi$)</strong>.
                        </InfoCard>
                        <InfoCard type="tip" title="The Subscript">
                            This is why it is written as $v_\pi(s)$. The $\pi$ subscript reminds us: "The value of state $s$ <em>assuming we follow policy $\pi$</em>."
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Value Equation" 
                subtitle="The Core Equation of RL"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="v_\pi(s) = \mathbb{E}_\pi [G_t | S_t = s]"
                                label="State-Value Definition"
                                explanation="The expected Return (G_t), given that we start in state s, and follow policy π."
                            />
                            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                                <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Focus size={16} /> Expanding Bellman</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Just like in MRPs, we can break this down recursively. The value of a state is the immediate reward we get, plus the discounted value of the next state we land in.
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <MathBlock 
                                formula="v_\pi(s) = \sum_{a} \pi(a|s) \sum_{s', r} p(s', r | s, a) [r + \gamma v_\pi(s')]"
                                label="Bellman Expectation Equation for V(s)"
                                explanation="We sum over all actions our policy might take, and then sum over all next states the environment might drop us into."
                            />
                        </div>
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: 'v_\pi(s)', meaning: 'The state-value function under policy \u03C0.' },
                            { symbol: '\pi(a|s)', meaning: 'The policy: probability of taking action a in state s.' },
                            { symbol: 'p(s\', r | s, a)', meaning: 'The environment dynamics: probability of next state and reward.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Value of Tic-Tac-Toe" 
                subtitle="Assigning Values to States"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Board Evaluation</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Let's say Win = +1, Loss = -1, Draw = 0. $\gamma = 1.0$. Assume you play perfectly (Optimal Policy).
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                                <div className="font-mono text-xl mb-2 text-slate-700 dark:text-slate-300">
                                    [X] [X] [ ]<br/>[O] [O] [ ]<br/>[ ] [ ] [ ]
                                </div>
                                <div className="text-[10px] font-bold text-primary-600 uppercase">State S1</div>
                                <div className="mt-2 text-xs font-bold">V(S1) = +1</div>
                                <p className="text-[10px] text-slate-500 text-center mt-1">You are X. It's your turn. You can immediately win.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                                <div className="font-mono text-xl mb-2 text-slate-700 dark:text-slate-300">
                                    [X] [O] [ ]<br/>[O] [X] [ ]<br/>[ ] [ ] [ ]
                                </div>
                                <div className="text-[10px] font-bold text-primary-600 uppercase">State S2</div>
                                <div className="mt-2 text-xs font-bold">V(S2) = 0</div>
                                <p className="text-[10px] text-slate-500 text-center mt-1">Early game. Assuming perfect opponent play, it will be a draw.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Chess AI Evaluation" 
                subtitle="How Engines See the Board"
                icon={<Brain className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Swords size={18} /> Stockfish vs AlphaZero</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Traditional chess engines (like early Stockfish) used hand-crafted heuristics to calculate $V(s)$. They assigned static points (Queen = 9, Pawn = 1) and added them up.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            <strong>AlphaZero</strong> revolutionized AI by using Reinforcement Learning to learn $V(s)$ from scratch through self-play. It uses a Deep Neural Network to output a single scalar value between -1 and 1 representing $v_\pi(s)$.
                        </p>
                        <div className="p-4 bg-slate-900 rounded-xl text-center">
                            <span className="font-mono text-emerald-400 font-bold text-lg">Value Output: +0.87</span>
                            <p className="text-xs text-slate-400 mt-2">"Based on my internal policy, if I am in this state, I have an 87% chance of eventually forcing a win."</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Value Function Theory"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why does the state-value function V(s) have a subscript \u03C0?', a: 'Because the value of a state depends entirely on the actions the agent takes from that point forward. The subscript \u03C0 denotes that the value is conditioned on following policy \u03C0.' },
                        { q: 'In the Bellman Expectation Equation, why do we sum over both actions (a) and next states (s\')?', a: 'Because we are calculating the Expected (average) return. We must average over all the actions our policy might choose, and also average over all the next states the environment might randomly transition us into.' },
                        { q: 'If two different policies are evaluated on the exact same state, will the state have the same Value?', a: 'No. An optimal policy will yield a high value for a state near a goal, while a suicidal policy will yield a negative value for that exact same state.' }
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
                title="6. Virtual Lab: Value Heatmap" 
                subtitle="See How Policy Dictates Value"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Explore a 3x3 Gridworld. The top right is a Goal (+10). The middle right is a Fire Trap (-10). Toggle the policy to see how the mathematical <strong>Value</strong> of the physical grid spaces changes drastically based on how the agent behaves.
                    </p>
                    <GridworldValueLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">State Value Secured!</h3>
                    <p className="text-primary-100">
                        You've learned how to evaluate the goodness of states. But what if the agent needs to know how good a specific ACTION is from that state?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: ACTION VALUE FUNCTION
                    </button>
                </div>
            </div>
        </div>
    );
}
