import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import MCAlgoComparisonLab from '../../components/labs/MCAlgoComparisonLab';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    GitBranch, Bot, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, Search, Brain, Globe, Rocket,
    Activity, Cpu, HardDrive, Target, Briefcase, Clock,
    Shield, Move, MousePointer2, User, Layout, Map, CheckCircle2
} from 'lucide-react';

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic12_MCAlgorithms() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Accountant's Choice" 
                subtitle="First-Visit vs. Every-Visit"
                icon={<GitBranch className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Layers size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            📊 To Count or Not to Count?
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Suppose you are learning to navigate a park. You walk in a circle and pass the same fountain three times before leaving. At the end of the day, you found 10 coins.
                            </p>
                            <p>
                                **First-Visit MC** says: "The fountain was the start of the journey that led to 10 coins. I'll record that." It ignores the second and third times you passed the fountain.
                            </p>
                            <p>
                                **Every-Visit MC** says: "Every time I was at the fountain, I was on a path that eventually resulted in coins. I'll record all three instances."
                            </p>
                            <p>
                                Which one is better? Both work! But they reflect different mathematical philosophies about how much we can learn from a single "loop" in experience.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Statistical Advantage">
                            Every-Visit MC provides more data points per episode, which can lead to faster learning in environments where you visit the same state often.
                        </InfoCard>
                        <InfoCard type="tip" title="Independence">
                            First-Visit MC has simpler statistical properties because each sample is technically independent within the episode.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Modelling the Algorithms" 
                subtitle="The Logic of Averaging"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="font-black text-[10px] text-primary-500 uppercase tracking-widest">First-Visit Rule</h5>
                            <MathBlock 
                                formula="N(s) \leftarrow N(s) + 1 \text{ if } t = \min\{k : S_k = s\}"
                                label="Initialization Check"
                                explanation="Only update N(s) if this is the first time state s appears in the episode."
                                interpretation="If we have seen S1 before in this sequence, we skip the math for this step. We only care about the very first time the agent entered S1."
                                motivation="Ensures each update is based on a 'fresh' look at the return from that state."
                                terms={[]}
                            />
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-black text-[10px] text-emerald-500 uppercase tracking-widest">Every-Visit Rule</h5>
                            <MathBlock 
                                formula="N(S_t) \leftarrow N(S_t) + 1 \quad \forall t"
                                label="Universal Update"
                                explanation="Update N(s) for every single time step where the state was s."
                                interpretation="No checks needed. If you are in S1, you update S1. Simple, aggressive, and data-efficient."
                                motivation="Maximizes the amount of learning done from every second of experience."
                                terms={[]}
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Convergence Reality</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            As the number of episodes $k \to \infty$, both methods are guaranteed to converge to $v_\pi(s)$. In modern deep RL, variations of Every-Visit are the most common.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Accountant's Choice"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Algorithm Auditor Demo",
                            objectives: "Differentiate between First-Visit and Every-Visit counting in a looping trajectory.",
                            instructions: [
                                "Open the 'MC Algorithm Auditor' in the Virtual Lab section.",
                                "Select 'First-Visit' and Step Forward. Point out: 'The second time we enter S1, it says Ignored.'",
                                "Select 'Every-Visit' and Step Forward. Show how all S1 entries are 'Counted'.",
                                "Explain: 'First-Visit treats each episode as one data point for a state. Every-Visit treats every visit as one.'",
                                "Ask: 'Which method uses more of the agent's memory?'"
                            ],
                            inputs: "Interactive MCAlgoComparisonLab component",
                            outputs: "Visual highlight shift and visit count tracking.",
                            rubrics: ["Clarity of 'First' vs 'Every' counting logic", "Identification of the Accounting panel differences", "Student engagement"],
                            outcomes: "Students identify the core algorithmic trade-offs in MC state updates.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Loop Auditor Workshop",
                            objectives: "Collaboratively calculate visit counts for complex state sequences.",
                            instructions: [
                                "Teacher draws a path on the board: $S_0 \to S_1 \to S_2 \to S_1 \to S_3 \to S_1 \to \text{Goal}$.",
                                "Class Task: Calculate $N(S_1)$ for First-Visit and Every-Visit.",
                                "Group Task: If the reward at the Goal is +100, calculate the total sum of returns added to $V(S_1)$ for both methods.",
                                "Class reflects: 'Does Every-Visit bias the value because it adds the same +100 three times?'",
                                "Conclusion: Both converge to the same value, but via different paths."
                            ],
                            inputs: "State sequence strings",
                            outputs: "Manual N(s) and Sum(G) calculations",
                            rubrics: ["Arithmetic accuracy", "Correct logic for ignoring subsequent visits", "Classroom participation"],
                            outcomes: "Students master the numerical implementation of both algorithms.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Data Efficiency Debate",
                            objectives: "Experience the trade-off between statistical purity and sample speed.",
                            instructions: [
                                "Divide class into 2 teams: Team Purity (First-Visit) and Team Speed (Every-Visit).",
                                "Scenario: 'A robot learning to fold clothes'. It often repeats the same motion (state) within one episode.",
                                "Team Purity: Argue why counting only the first visit prevents 'over-weighting' a single episode.",
                                "Team Speed: Argue why ignoring 90% of your experience is a waste of expensive robot time.",
                                "Output: A 'Pros vs. Cons' chart for both methods.",
                                "Conclusion: 'Use Every-Visit when data is expensive; use First-Visit for theoretical simplicity.'"
                            ],
                            inputs: "Robot folding scenario",
                            outputs: "Comparison matrix",
                            rubrics: ["Understanding of 'Independence' vs 'Variance'", "Logical arguments", "Team coordination"],
                            outcomes: "Students develop a nuanced engineering perspective on algorithm selection.",
                            time: "20 Mins",
                            materials: ["None"]
                        },
                        {
                            level: 4,
                            title: "Gaming Loop Audit",
                            objectives: "Independently audit a gameplay loop to determine the best update strategy.",
                            instructions: [
                                "Task: Choose a game with frequent backtracking (e.g., 'Pac-Man' or 'Metroid').",
                                "Audit: Identify a state (location) you visit multiple times in one 'life' (episode).",
                                "Reflection: If you were an RL agent, would you learn better by counting every pass or just the first?",
                                "Analysis: If you use Every-Visit in Pac-Man, does the 'Power Pellet' reward get over-counted? Why or why not?",
                                "Propose: The best MC method for your chosen game."
                            ],
                            inputs: "Personal gaming experience",
                            outputs: "Individual Algorithm Suitability Report (1 page)",
                            rubrics: ["Correct use of 'Independence' and 'Efficiency' terms", "Logical game-loop analysis", "Originality"],
                            outcomes: "Students demonstrate the ability to map algorithmic choices to complex environmental dynamics.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Gridworld Scientist" 
                subtitle="Comparing Algorithm Convergence"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Efficiency Duel</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are tasked with comparing First-Visit and Every-Visit MC in a windy gridworld. Because the wind blows the agent back frequently, it visits the same states many times. Your project is to plot the **Root Mean Square Error (RMSE)** of both methods over 1,000 episodes to see which one reaches the true value faster.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Clock size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Data</div>
                            <p className="text-[8px] mt-1">Episode Trajectories</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Binary size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Compute</div>
                            <p className="text-[8px] mt-1">Incremental Averaging</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Activity size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Analysis</div>
                            <p className="text-[8px] mt-1">Convergence Curve</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Algorithmic Mastery"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Explain the difference between First-Visit and Every-Visit MC.', a: 'First-Visit MC only uses the first occurrence of a state in an episode to update its value estimate; Every-Visit MC uses every occurrence of the state in that episode.' },
                        { q: 'Which method is more data-efficient?', a: 'Every-Visit MC is generally more data-efficient because it extracts multiple value samples from a single episode if states are revisited.' },
                        { q: 'Do both methods converge to the same value?', a: 'Yes, both methods are statistically guaranteed to converge to the true value function as the number of episodes approaches infinity.' }
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
                title="6. Virtual Lab: MC Algorithm Auditor" 
                subtitle="The Accountant's Choice"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toggle between **First-Visit** and **Every-Visit** to see how the "Accounting" changes when an agent visits the same state multiple times in one episode.
                    </p>
                    <MCAlgoComparisonLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Algorithms: Mastered!</h3>
                    <p className="text-primary-100">
                        You know how to count. Now, let's look at how we use these counts for the two main tasks of RL: Prediction and Control.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MC PREDICTION
                    </button>
                </div>
            </div>
        </div>
    );
}
