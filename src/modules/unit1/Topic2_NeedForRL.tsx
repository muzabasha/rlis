import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    Target, Zap, TrendingUp, Clock, Briefcase, Users2, Layout,
    Compass, Map, Award, Move, MousePointer2, AlertTriangle, Play, RotateCcw
} from 'lucide-react';

// ─── Interactive Components for Topic 2 ──────────────────────────────────────

/**
 * Interactive Discovery Maze Visualizer
 */
function DiscoveryMaze() {
    const [position, setPosition] = useState(0);
    const [history, setHistory] = useState<number[]>([]);
    const [message, setMessage] = useState("Click 'Move' to discover the path!");
    
    const mazeSize = 5;
    const goal = 4;
    const traps = [1, 3];

    const handleMove = () => {
        if (position >= goal) return;

        const nextPos = position + 1;
        setPosition(nextPos);
        setHistory([...history, nextPos]);

        if (traps.includes(nextPos)) {
            setMessage("💥 Ouch! A trap! Learning to avoid this next time...");
            setTimeout(() => {
                setPosition(0);
                setMessage("Restarting... But now you know where the traps are!");
            }, 1000);
        } else if (nextPos === goal) {
            setMessage("🎉 Goal reached! Total experience gained.");
        } else {
            setMessage("Safe move. Keep exploring!");
        }
    };

    const reset = () => {
        setPosition(0);
        setHistory([]);
        setMessage("Click 'Move' to discover the path!");
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Compass size={18} className="text-primary-500" />
                        The Discovery Maze
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Why RL is needed: Learning without a map.</p>
                </div>
                <button onClick={reset} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                    <RotateCcw size={16} />
                </button>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                {Array.from({ length: mazeSize }).map((_, i) => (
                    <React.Fragment key={i}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs shadow-sm transition-all border-2
                            ${position === i ? 'bg-primary-500 text-white scale-110 border-primary-400 shadow-primary-500/20' : 
                              traps.includes(i) && history.includes(i) ? 'bg-red-100 text-red-600 border-red-200' :
                              i === goal ? 'bg-emerald-100 text-emerald-600 border-emerald-200' :
                              'bg-slate-50 dark:bg-slate-900 text-slate-300 border-slate-100 dark:border-slate-800'}`}>
                            {i === goal ? '🎁' : traps.includes(i) && history.includes(i) ? '💀' : position === i ? '🤖' : i}
                        </div>
                        {i < mazeSize - 1 && <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800" />}
                    </React.Fragment>
                ))}
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className={`text-xs font-bold text-center px-4 py-2 rounded-full ${message.includes('Ouch') ? 'bg-red-50 text-red-600' : message.includes('Goal') ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50 text-primary-600'}`}>
                    {message}
                </p>
                <button 
                    disabled={position >= goal || message.includes('Restarting')}
                    onClick={handleMove}
                    className="group relative px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                    <span className="flex items-center gap-2">
                        <Play size={16} fill="currentColor" /> Move Forward
                    </span>
                </button>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic2_NeedForRL() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Mars Explorer" 
                subtitle="Why Pre-programming Fails"
                icon={<Zap className="text-amber-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
            >
                <div className="space-y-6">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Target size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                            🚀 The Case for Autonomy
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are a scientist at NASA. You just landed a rover on Mars. You want it to find rare minerals, but you don't have a map of the terrain.
                            </p>
                            <p>
                                <strong>Supervised Learning</strong> won't work because you don't have a dataset of "Mars Rocks" with labels. 
                                <strong>Unsupervised Learning</strong> won't work because grouping rocks isn't the same as <em>finding</em> them.
                            </p>
                            <p>
                                <strong>The Solution:</strong> You give the rover a goal and a reward system. "+10 points for finding minerals, -5 points for bumping into a crater." The rover must explore, fail, and learn the best path by itself.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Dynamic Environments">
                            RL is needed when the world changes constantly (e.g., Stock Markets, Traffic).
                        </InfoCard>
                        <InfoCard type="warning" title="The Discovery Gap">
                            RL excels when the "Correct Answer" isn't known beforehand.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Optimization Objective" 
                subtitle="The Math of Long-Term Success"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots"
                                label="The Cumulative Return"
                                explanation="We don't just want a reward now; we want to maximize the total reward over the entire journey."
                            />
                            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                                <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><TrendingUp size={16} /> Why Discount (γ)?</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    $\gamma$ (Gamma) ensures the agent prioritizes immediate rewards over distant ones, reflecting real-world uncertainty.
                                </p>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <div className="text-4xl font-black text-primary-600 tracking-tighter">MAXimize</div>
                                <div className="text-sm font-bold text-slate-400">The Expected Return</div>
                                <div className="flex justify-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                                    <div className="w-8 h-8 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/20" />
                                    <div className="w-8 h-8 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/20" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: 'G_t', meaning: 'Total Return (Sum of all future rewards).' },
                            { symbol: 'R_t', meaning: 'Immediate Reward at time t.' },
                            { symbol: '\gamma', meaning: 'Discount Factor (usually 0.9 to 0.99).' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Training the Robot Dog" 
                subtitle="NEP 2020 Hands-on Discovery"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Teacher Demo: The Invisible Map</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Teacher puts a hidden object in the classroom. One student tries to find it. The class only claps ("Reward") when they get closer. This mimics how RL discovers the "Goal" without being told where it is.
                        </p>
                    </div>

                    {/* Level 2 */}
                    <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/10 border-2 border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">L2</div>
                            <h4 className="font-bold text-primary-900 dark:text-primary-100">Interactive: Assigning Rewards</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                { task: 'Sits', reward: '+10' },
                                { task: 'Barks', reward: '-5' },
                                { task: 'Jumps', reward: '+5' },
                                { task: 'Bites', reward: '-100' },
                                { task: 'Sleeps', reward: '0' },
                                { task: 'Fetches', reward: '+50' }
                            ].map(item => (
                                <div key={item.task} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
                                    <span className="text-[10px] font-bold text-slate-500">{item.task}</span>
                                    <span className={`text-xs font-black ${item.reward.includes('+') ? 'text-emerald-500' : 'text-red-500'}`}>{item.reward}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Autonomous Warehouse Drone" 
                subtitle="Applying the Need for RL"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Map size={18} /> The Navigation Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A drone must deliver parcels in a crowded warehouse where shelves are moved daily. 
                            <strong>Task:</strong> Explain why a pre-programmed path (Traditional Coding) will fail and how RL provides the "Need" for adaptability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                            <h6 className="font-bold text-xs mb-2 flex items-center gap-2 text-red-500"><AlertTriangle size={14} /> Traditional Failure</h6>
                            <p className="text-[10px] text-slate-500">Fixed paths crash when a shelf is moved. Hard-coded rules are too brittle.</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                            <h6 className="font-bold text-xs mb-2 flex items-center gap-2 text-emerald-500"><Award size={14} /> RL Success</h6>
                            <p className="text-[10px] text-slate-500">The drone explores and updates its "Value Function" as the environment changes.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Essential Review"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'State the need for Reinforcement Learning.', a: 'RL is needed for complex, dynamic environments where an explicit dataset of "Correct Answers" is not available.' },
                        { q: 'Why is Supervised Learning not suitable for a robot walking in a forest?', a: 'Supervised learning needs a pre-labeled dataset of every possible obstacle, which is impossible to create for a random forest.' },
                        { q: 'What is the "Credit Assignment Problem" in RL?', a: 'It refers to the difficulty of knowing which specific action in a long sequence was responsible for an eventually received reward.' }
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
                title="6. Virtual Lab: The Discovery Maze" 
                subtitle="Visualize Learning Without a Map"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Help the robot reach the goal! You don't know where the traps are. Every time you hit a trap, the agent learns and restarts. This is how RL "discovers" the safe path.
                    </p>
                    <DiscoveryMaze />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-amber-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-amber-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Need for RL: Established!</h3>
                    <p className="text-amber-100">
                        You've seen why traditional AI fails in dynamic worlds. Now, let's see how RL stacks up against Supervised and Unsupervised Learning.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-amber-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: RL vs SL vs UL
                    </button>
                    <button className="px-10 py-4 bg-amber-700 text-white font-black rounded-2xl hover:bg-amber-800 transition-colors">
                        REVIEW NEED
                    </button>
                </div>
            </div>
        </div>
    );
}

