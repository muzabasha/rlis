import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    GitBranch, Box, Target, Zap, TrendingUp, 
    Clock, Briefcase, Users2, Layout,
    Compass, Map, Award, Move, MousePointer2, Layers
} from 'lucide-react';

// ─── Interactive Components for Topic 1 ──────────────────────────────────────

/**
 * Interactive Gridworld Component for Section 6
 */
function GridworldExplorer() {
    const [selectedCell, setSelectedCell] = useState<{ x: number, y: number } | null>(null);
    const size = 4;
    
    const grid = Array.from({ length: size }, (_, y) => 
        Array.from({ length: size }, (_, x) => ({ x, y, id: y * size + x }))
    );

    const getCellInfo = (x: number, y: number) => {
        if (x === 3 && y === 3) return { type: 'Goal', reward: '+100', color: 'bg-emerald-500' };
        if (x === 1 && y === 1) return { type: 'Obstacle', reward: '-50', color: 'bg-red-500' };
        return { type: 'State', reward: '-1', color: 'bg-white dark:bg-slate-800' };
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* The Grid */}
                <div className="grid grid-cols-4 gap-2 p-4 bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-inner">
                    {grid.map(row => row.map(cell => {
                        const info = getCellInfo(cell.x, cell.y);
                        const isSelected = selectedCell?.x === cell.x && selectedCell?.y === cell.y;
                        return (
                            <motion.button
                                key={`${cell.x}-${cell.y}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCell(cell)}
                                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm flex items-center justify-center transition-all border-2 
                                    ${isSelected ? 'border-primary-500 ring-4 ring-primary-500/20' : 'border-transparent'} 
                                    ${info.color}`}
                            >
                                <span className={`text-[10px] font-bold ${info.type !== 'State' ? 'text-white' : 'text-slate-400'}`}>
                                    S{cell.id}
                                </span>
                            </motion.button>
                        );
                    }))}
                </div>

                {/* Info Panel */}
                <div className="flex-1 space-y-4 w-full">
                    <AnimatePresence mode="wait">
                        {selectedCell ? (
                            <motion.div 
                                key="info"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-4"
                            >
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <h5 className="font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                                        <Box size={16} className="text-primary-500" />
                                        State: S{selectedCell.y * size + selectedCell.x}
                                    </h5>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Type</span>
                                            <p className="text-sm font-bold">{getCellInfo(selectedCell.x, selectedCell.y).type}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Reward (R)</span>
                                            <p className="text-sm font-bold text-emerald-500">{getCellInfo(selectedCell.x, selectedCell.y).reward}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Possible Actions (A)</span>
                                        <div className="flex gap-2">
                                            {['↑', '↓', '←', '→'].map(a => (
                                                <div key={a} className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold">{a}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center text-slate-400">
                                <p className="text-sm italic">Click on a grid cell to inspect its MDP components</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic1_MDPKeyComponents() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Gridworld Navigator" 
                subtitle="Life as a Sequential Decision Process"
                icon={<Compass className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Map size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🏰 The Quest for the Treasure
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine a robot in a dusty warehouse. It needs to find a treasure chest (The Goal). Every position in the warehouse is a <strong>State</strong>. The robot's choices—moving forward, turning, or grabbing—are <strong>Actions</strong>.
                            </p>
                            <p>
                                But the floor is slippery! Sometimes, when the robot tries to move forward, it slides to the left. This uncertainty is captured by <strong>Transition Probabilities</strong>.
                            </p>
                            <p>
                                <strong>The MDP Magic:</strong> A Markov Decision Process (MDP) is just a fancy way of mapping this journey. It's a mathematical framework that helps the robot decide exactly what to do in every single state to maximize its <strong>Reward</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Markov Property">
                            In an MDP, the future depends only on where you are <em>now</em> (current state), not on how you got there.
                        </InfoCard>
                        <InfoCard type="tip" title="The 5-Tuple">
                            Remember the acronym <strong>S.A.P.R.G</strong>: States, Actions, Probabilities, Rewards, and Gamma.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The 5-Tuple Formalization" 
                subtitle="The Heart of MDP"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                        <h5 className="text-primary-400 font-bold mb-6 flex items-center gap-2 text-xl">
                            <Layers size={20} /> The MDP Tuple: (S, A, P, R, γ)
                        </h5>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <MathBlock 
                                formula="P(s' | s, a) = \text{Pr}\{S_{t+1}=s' | S_t=s, A_t=a\}"
                                label="Transition Probability"
                                explanation="The chance of landing in state s' given we took action a in state s."
                            />
                            <MathBlock 
                                formula="R(s, a) = \mathbb{E}[R_{t+1} | S_t=s, A_t=a]"
                                label="Reward Function"
                                explanation="The immediate reward received after performing action a in state s."
                            />
                        </div>
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: 'S', meaning: 'The finite set of all possible states in the environment.' },
                            { symbol: 'A', meaning: 'The finite set of all possible actions the agent can take.' },
                            { symbol: 'P', meaning: 'State transition probability matrix.' },
                            { symbol: 'R', meaning: 'Reward function (Immediate feedback).' },
                            { symbol: '\gamma', meaning: 'Discount factor (Values between 0 and 1).' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Define the MDP" 
                subtitle="Mapping Real Systems"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Class Challenge: Snake & Ladders</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            "In Snake & Ladders, what are the <strong>States</strong>? (The squares 1-100). What is the <strong>Action</strong>? (Rolling a die). What is the <strong>Reward</strong>? (Winning at 100). Is it an MDP? Why?"
                        </p>
                    </div>

                    {/* Level 2 */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Interactive: The Self-Driving MDP</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200">
                                <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Scenario</span>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">A car approaching a red light.</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200">
                                <span className="text-[10px] font-bold text-emerald-500 block mb-1 uppercase">Define Actions</span>
                                <p className="text-xs font-bold text-emerald-600">{'[Brake, Accelerate, Idle]'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Lunar Lander MDP" 
                subtitle="Defining Mission Components"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Zap size={18} /> Landing on the Moon</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Your task is to define the MDP for a Lunar Lander. You need to land safely on a designated spot using as little fuel as possible.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Award className="mx-auto text-emerald-500" size={20} />
                            <div className="text-[10px] font-bold">REWARD</div>
                            <p className="text-[8px] text-slate-500">+100 for landing, -100 for crash.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Move className="mx-auto text-blue-500" size={20} />
                            <div className="text-[10px] font-bold">STATE</div>
                            <p className="text-[8px] text-slate-500">Altitude, Velocity, Tilt Angle.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <MousePointer2 className="mx-auto text-amber-500" size={20} />
                            <div className="text-[10px] font-bold">ACTION</div>
                            <p className="text-[8px] text-slate-500">Fire Left, Fire Right, Fire Main.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center space-y-2">
                            <Clock className="mx-auto text-purple-500" size={20} />
                            <div className="text-[10px] font-bold">GAMMA</div>
                            <p className="text-[8px] text-slate-500">0.99 (Plan for long descent).</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Essential MDP Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Define Markov Decision Process (MDP).', a: 'A mathematical framework for modeling decision-making where outcomes are partly random and partly under the control of a decision-maker.' },
                        { q: 'What is the "Tuple" used to define an MDP?', a: 'An MDP is defined by the 5-tuple (S, A, P, R, γ), representing States, Actions, Transitions, Rewards, and Discount Factor.' },
                        { q: 'Explain the role of Transition Probability P.', a: 'It defines the dynamics of the environment by specifying the probability of moving from state s to state s\' after taking action a.' }
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
                title="6. Virtual Lab: The Gridworld Explorer" 
                subtitle="Interactive MDP Inspection"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Click on the grid cells to see how each position in a "Gridworld" is defined as a <strong>State</strong> with specific rewards and available <strong>Actions</strong>.
                    </p>
                    <GridworldExplorer />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">MDP Components: Decoded!</h3>
                    <p className="text-primary-100">
                        You've identified the building blocks of sequential decisions. Ready to see the formal mathematical definitions?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: FORMAL DEFINITION
                    </button>
                    <button className="px-10 py-4 bg-primary-700 text-white font-black rounded-2xl hover:bg-primary-800 transition-colors">
                        REVIEW COMPONENTS
                    </button>
                </div>
            </div>
        </div>
    );
}

