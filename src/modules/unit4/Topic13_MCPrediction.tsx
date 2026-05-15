import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Target, Bot, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, Search, Brain, Globe, Rocket,
    Activity, Cpu, HardDrive, Briefcase,
    Shield, Move, MousePointer2, User, Layout, Map,
    TrendingUp, ArrowRight
} from 'lucide-react';

// ─── Interactive Components for Topic 13 ─────────────────────────────────────

/**
 * Value Explorer: Visualizing MC Prediction (Policy Evaluation)
 */
function PredictionLab() {
    const [policy, setPolicy] = useState<'Safe' | 'Risky'>('Safe');
    const [stats, setStats] = useState({ v: 0, count: 0 });

    const runSample = () => {
        // Safe policy: small rewards, low variance (True value ~5)
        // Risky policy: big rewards, high variance (True value ~10 but often 0)
        const sample = policy === 'Safe' 
            ? 5 + (Math.random() - 0.5) * 2 
            : Math.random() > 0.5 ? 20 : 0;
        
        setStats(prev => {
            const newCount = prev.count + 1;
            const newV = prev.v + (1 / newCount) * (sample - prev.v);
            return { v: newV, count: newCount };
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex justify-center gap-4">
                {['Safe', 'Risky'].map(p => (
                    <button
                        key={p}
                        onClick={() => { setPolicy(p as any); setStats({ v: 0, count: 0 }); }}
                        className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
                            policy === p 
                            ? 'bg-primary-600 text-white shadow-lg' 
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                        }`}
                    >
                        {p.toUpperCase()} POLICY
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">Estimated Value V(s)</span>
                        <div className="text-5xl font-black text-primary-600">
                            {stats.v.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-2 font-bold">Samples: {stats.count}</div>
                    </div>
                    <button 
                        onClick={runSample}
                        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-xs hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                    >
                        <Play size={16} /> GENERATE EPISODE SAMPLE
                    </button>
                </div>

                <div className="space-y-4">
                    <h5 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <TrendingUp size={18} className="text-emerald-500" />
                        Incremental Insight
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                        Notice how the value fluctuates wildly in the first few samples but starts to "settle" as the count increases. This is how the agent "Predicts" how good a policy is.
                    </p>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 rounded-2xl">
                        <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">
                            {policy === 'Safe' 
                                ? 'The Safe policy converges quickly because the rewards are consistent.' 
                                : 'The Risky policy takes many more samples to converge because the rewards are "All or Nothing".'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic13_MCPrediction() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Auditor's Question" 
                subtitle="How Good is My Plan?"
                icon={<Target className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Search size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🔎 Reviewing the Strategy
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In RL, **Prediction** doesn't mean telling the future. It means evaluating a specific fixed policy. It's the agent's way of asking: "If I keep doing exactly what I'm doing, how much reward should I expect to get from here?"
                            </p>
                            <p>
                                Imagine you have a rule: "Always turn left at a junction." To predict the value of this rule, you just walk through the city 100 times, always turning left, and see how much money you find.
                            </p>
                            <p>
                                You aren't trying to find the *best* way yet; you're just measuring the *current* way. Prediction is the foundation upon which Control (finding the best way) is built.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Prediction vs. Control">
                            Prediction = Policy Evaluation (Finding V). Control = Policy Improvement (Finding the best π).
                        </InfoCard>
                        <InfoCard type="tip" title="Stationary Policy">
                            In MC Prediction, the policy $\pi$ must remain the same throughout the entire simulation for the average to be meaningful.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Modelling the Update" 
                subtitle="Learning One Sample at a Time"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="V(s) \leftarrow V(s) + \frac{1}{N(s)} [G - V(s)]"
                        label="Incremental MC Update"
                        explanation="Updating the average value without storing every past return."
                        interpretation="The term [G - V(s)] is the 'Prediction Error'. We move the current estimate V(s) toward the actual return G by a small step size (1/N)."
                        motivation="This allows an agent to learn on-the-fly. It doesn't need a huge database of episodes; it just needs to remember the current average and the count."
                        terms={[
                            { term: 'G', name: 'Actual Return', meaning: 'The total reward seen in the current episode.', range: '\mathbb{R}', example: 'G = 10.' },
                            { term: 'V(s)', name: 'Estimated Value', meaning: 'The agent\'s current prediction of the reward.', range: '\mathbb{R}', example: 'V(s) = 8.' },
                            { term: '[G - V(s)]', name: 'Error', meaning: 'The difference between reality and prediction.', range: '\mathbb{R}', example: 'Error = +2 (I did better than expected!).' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Constant Alpha Update</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            In changing environments, we often replace $1/N(s)$ with a constant $\alpha$. This makes the agent "forget" old experience and prioritize recent samples.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Policy Evaluator"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Policy Value Demo",
                            objectives: "Observe how different fixed policies result in different converged state values.",
                            instructions: [
                                "Open the 'Value Explorer' in the Virtual Lab section.",
                                "Select 'Safe Policy'. Click 'Generate Episode' 10 times. Note the stable value (~5.0).",
                                "Select 'Risky Policy'. Click 'Generate' 10 times. Point out the wild swings between 0 and 20.",
                                "Explain: 'Prediction isn't about finding the best path; it's about auditing the CURRENT path.'",
                                "Ask: 'Which policy has higher variance? Which converges faster?'"
                            ],
                            inputs: "Interactive PredictionLab component",
                            outputs: "Live-updating V(s) estimate and sample counter.",
                            rubrics: ["Clarity of 'Prediction' vs 'Control' distinction", "Correct interpretation of variance", "Student engagement"],
                            outcomes: "Students identify why evaluation is necessary before improvement.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Incremental Auditor Workshop",
                            objectives: "Collaboratively perform the running average update without storing history.",
                            instructions: [
                                "Teacher sets the scene: 'Your current prediction V(s) is 100. You just finished your 5th episode ($N=5$) and got a Return $G=150$.'",
                                "Class Task: Use the incremental formula $V \leftarrow V + \frac{1}{N}[G - V]$ to find the new estimate.",
                                "Guided Design: 'What happens if the next G is only 50? Does the value drop faster or slower than before?'",
                                "Class reflects: 'Why do we use $1/N$ instead of just dividing by the total?'",
                                "Conclusion: Incremental updates save memory and represent the 'learning step'."
                            ],
                            inputs: "Numerical RL scenarios",
                            outputs: "Manual V(s) updates on the board",
                            rubrics: ["Mathematical accuracy", "Understanding of the 'Error' term [G-V]", "Classroom participation"],
                            outcomes: "Students master the core update mechanism used in production RL systems.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Fixed Policy Challenge",
                            objectives: "Experience the constraints of evaluating a strategy without changing it.",
                            instructions: [
                                "Divide class into 4 teams. Assign each a fixed policy: {Always Aggressive, Always Defensive, 50/50 Random, Copycat}.",
                                "Scenario: 'Playing a simplified game of Rock-Paper-Scissors against a bot'.",
                                "Group Task: Play 10 rounds using ONLY your assigned policy. Record the Return (G) for each.",
                                "Output: Calculate the MC Prediction for your team's policy. Compare with other teams.",
                                "Conclusion: 'Before we can change the strategy, we must know the exact value of the current one.'"
                            ],
                            inputs: "Fixed strategy definitions",
                            outputs: "Policy Evaluation posters",
                            rubrics: ["Strict adherence to the fixed policy", "Accurate data collection", "Team coordination"],
                            outcomes: "Students develop the discipline required for scientific policy evaluation.",
                            time: "20 Mins",
                            materials: ["Rock-Paper-Scissors cards", "Chart paper"]
                        },
                        {
                            level: 4,
                            title: "Habit Evaluation Audit",
                            objectives: "Independently audit a personal habit as a fixed policy evaluation task.",
                            instructions: [
                                "Task: Choose a daily habit (e.g., 'Checking social media first thing in the morning' or 'Taking a specific route to work').",
                                "Audit: Define your 'Reward' (e.g., happiness, time saved, or focus).",
                                "Reflection: Based on the last 5 days (episodes), what is your predicted 'Value' for this habit?",
                                "Analysis: If you changed your policy tomorrow, would your current MC Prediction still be valid? Why or why not?",
                                "Propose: A 'Target Value' you want to reach by the end of the month."
                            ],
                            inputs: "Personal daily habits",
                            outputs: "Individual Policy Audit Report (1 page)",
                            rubrics: ["Correct use of 'Policy' and 'Reward' terms", "Logical value estimation", "Originality"],
                            outcomes: "Students demonstrate the ability to apply RL prediction theory to improve personal decision-making.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Weather Predictor" 
                subtitle="Predicting Cycles from Experience"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Forecasting Success</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are building an AI that predicts the "Value" (Comfort level) of a specific air conditioning policy. The policy is: "Always set to 22°C." Your project is to run 30-day simulations (Episodes) and use **MC Prediction** to find the expected comfort level for different house architectures (States).
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Layers size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Input</div>
                            <p className="text-[8px] mt-1">30-day History</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Activity size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Metric</div>
                            <p className="text-[8px] mt-1">Comfort Score Sum</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <ArrowRight size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Output</div>
                            <p className="text-[8px] mt-1">Mean Prediction</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Prediction Proficiency"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the goal of "MC Prediction"?', a: 'To estimate the state-value function v(s) or action-value function q(s,a) for a given fixed policy π based on sample experience.' },
                        { q: 'How does MC Prediction handle uncertainty in the environment?', a: 'By averaging the returns from many different episodes, the random variations in environment transitions cancel out, leaving the true expected value.' },
                        { q: 'Why do we use an incremental update formula?', a: 'To save memory and computation time; it allows us to update our estimate using only the current return and the previous average, without re-calculating the sum of all past returns.' }
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
                title="6. Virtual Lab: Value Explorer" 
                subtitle="Convergence under Policy"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select a policy and generate episode samples to see how the predicted value $V(s)$ changes. Notice how different policies lead to different stable values.
                    </p>
                    <PredictionLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Prediction: Mastered!</h3>
                    <p className="text-primary-100">
                        You can measure a policy. Now, let's learn how to improve it using Monte Carlo Control.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MC CONTROL
                    </button>
                </div>
            </div>
        </div>
    );
}
