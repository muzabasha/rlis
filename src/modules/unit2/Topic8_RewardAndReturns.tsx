import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    Coins, Gift, TrendingDown, Target, Briefcase, Rocket
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';

// ─── Interactive Components ──────────────────────────────────────────────────

function ReturnCalculatorLab() {
    const [gamma, setGamma] = useState(0.9);
    
    // Future rewards: time t+1, t+2, t+3, t+4, t+5
    const rewards = [10, 20, 50, 100, 500];
    
    // Calculate discounted rewards
    const chartData = rewards.map((r, i) => {
        const discount = Math.pow(gamma, i);
        return {
            timeStep: `t+${i+1}`,
            originalReward: r,
            discount: parseFloat(discount.toFixed(3)),
            discountedReward: parseFloat((r * discount).toFixed(1)),
            color: '#8b5cf6'
        };
    });

    const totalReturn = chartData.reduce((acc, curr) => acc + curr.discountedReward, 0);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Controls and Stats */}
                <div className="flex-1 space-y-6">
                    <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Coins size={18} className="text-primary-500" />
                            Discounted Return Calculator
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">Adjust gamma to see how future rewards lose value.</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold text-slate-400 uppercase">Discount Factor (γ)</span>
                                <span className="text-2xl font-black text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">{gamma.toFixed(2)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05"
                                value={gamma} 
                                onChange={(e) => setGamma(parseFloat(e.target.value))}
                                className="w-full accent-primary-600"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                <span>0 (Myopic / Greedy)</span>
                                <span>1.0 (Far-sighted)</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                            <span className="text-xs font-bold text-slate-400 uppercase">Total Return (G_t)</span>
                            <div className="text-4xl font-black text-slate-800 dark:text-white mt-2">
                                {totalReturn.toFixed(1)}
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2">
                                Without discounting (γ=1), the return would be {rewards.reduce((a,b)=>a+b,0)}.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chart Display */}
                <div className="flex-[2] h-64 w-full bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="timeStep" tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                formatter={(value: number, name: string) => [value, name === 'discountedReward' ? 'Present Value' : 'Original Reward']}
                            />
                            <Bar dataKey="discountedReward" name="Present Value" radius={[6, 6, 0, 0]} fill="#8b5cf6">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fillOpacity={0.4 + (entry.discount * 0.6)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* Value Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-[10px] text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 rounded-t-lg">
                        <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Time Step</th>
                            <th className="px-4 py-3">Original Reward ($R$)</th>
                            <th className="px-4 py-3">Discount ($\gamma^k$)</th>
                            <th className="px-4 py-3 rounded-tr-lg">Present Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartData.map((d, i) => (
                            <tr key={i} className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 last:border-0">
                                <td className="px-4 py-3 font-bold text-slate-500">{d.timeStep}</td>
                                <td className="px-4 py-3 font-mono">{d.originalReward}</td>
                                <td className="px-4 py-3 font-mono text-slate-400">{gamma}<sup>{i}</sup> = {d.discount}</td>
                                <td className="px-4 py-3 font-mono text-primary-600 font-bold">{d.discountedReward}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic8_RewardAndReturns() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Marshmallow Test" 
                subtitle="Immediate vs. Delayed Gratification"
                icon={<Gift className="text-amber-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
            >
                <div className="space-y-6">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Coins size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                            🕰️ The Time Value of Reward
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                In a famous psychological experiment, a child is offered a choice: eat one marshmallow right now, or wait 15 minutes and get two marshmallows.
                            </p>
                            <p>
                                This is the core dilemma of Reinforcement Learning. If an agent only cares about the <strong>Immediate Reward</strong> ({"$R_{t+1}$"}), it might make greedy choices that ruin its long-term success. It might eat the one marshmallow now.
                            </p>
                            <p>
                                To fix this, we don't just optimize for the immediate reward. We optimize for the <strong>Return</strong> ({"$G_t$"})—the total sum of all rewards the agent expects to collect from now until the end of the game.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Reward = Instant">
                            The Reward is the scalar feedback signal received at a single specific time step.
                        </InfoCard>
                        <InfoCard type="tip" title="Return = Cumulative">
                            The Return is the accumulation of all future rewards. It is the true goal of the RL agent.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Return Equation" 
                subtitle="Discounting the Future"
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
                                label="Discounted Return"
                                explanation="The total return at time t. Future rewards are multiplied by a discount factor gamma."
                            />
                            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                                <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><TrendingDown size={16} /> Why Discount?</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    If a task goes on forever (infinite horizon), the sum of rewards could reach infinity, breaking the math. Discounting ensures the sum converges to a finite number, and gives the agent a sense of urgency.
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <MathBlock 
                                formula="G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}"
                                label="Compact Notation"
                                explanation="The mathematical summation form of the Discounted Return equation."
                            />
                            <MathBlock 
                                formula="G_t = R_{t+1} + \gamma G_{t+1}"
                                label="Recursive Return"
                                explanation="A crucial property: The return right now is just the immediate reward plus the discounted return of the NEXT step."
                            />
                        </div>
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: 'G_t', meaning: 'The Return (Goal) at time step t.' },
                            { symbol: 'R_{t+1}', meaning: 'The immediate reward received after taking an action at time t.' },
                            { symbol: '\gamma', meaning: 'Gamma. The Discount Factor (0 \u2264 \u03B3 \u2264 1).' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Calculate the Return" 
                subtitle="Pen and Paper Discounting"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Student Task: Discounted Sequence</h4>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200">
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                An agent receives the following sequence of rewards: $R_1=10$, $R_2=10$, $R_3=10$, $R_4=10$.
                                <br/>The discount factor $\gamma = 0.5$. Calculate $G_0$.
                            </p>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg font-mono text-sm">
                                $G_0 = 10 + (0.5 \times 10) + (0.25 \times 10) + (0.125 \times 10)$
                                <br/>$G_0 = 10 + 5 + 2.5 + 1.25 = 18.75$
                            </div>
                            <p className="text-[10px] text-slate-500 italic mt-2">Even though the agent collects 40 total points, the "present value" of those points is only 18.75 because of the steep discount factor.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Financial Returns" 
                subtitle="RL Math in Economics"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Net Present Value (NPV)</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            The RL equation for Return ($G_t$) is mathematically identical to the economic concept of <strong>Net Present Value</strong> used in finance.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            If someone offers you $100 today or $100 in ten years, you take it today. Due to inflation and investment opportunities, money in the future is worth less than money now.
                        </p>
                        <div className="flex items-center gap-4 text-sm font-bold">
                            <div className="flex-1 p-3 bg-red-50 text-red-600 rounded-lg text-center border border-red-100">
                                $100 in 10 years (with 5% inflation) = $61 Today
                            </div>
                            <div className="flex-1 p-3 bg-emerald-50 text-emerald-600 rounded-lg text-center border border-emerald-100">
                                {"RL Translation: $R_{t+10} = 100$, $\\gamma = 0.95$"}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Reward Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the difference between a Reward and a Return?', a: 'A Reward is the immediate numerical feedback received at a single time step. The Return is the cumulative sum of all future rewards.' },
                        { q: 'What happens if Gamma (\u03B3) is set to 0?', a: 'The agent becomes "myopic" or entirely greedy. It will only care about maximizing the immediate reward for the very next step, ignoring all long-term consequences.' },
                        { q: 'What happens if Gamma (\u03B3) is set to 1?', a: 'The agent becomes "far-sighted". It treats a reward received 100 steps from now as equally valuable as a reward received right now. (Can cause infinite sums if the task never ends).' }
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
                title="6. Virtual Lab: Discount Calculator" 
                subtitle="Visualize the Future Decay"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        A massive treasure of 500 points awaits the agent 5 steps into the future. Adjust the discount factor ($\gamma$) to see how much that distant treasure is "worth" to the agent right now at $t=0$.
                    </p>
                    <ReturnCalculatorLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">The Goal is Clear!</h3>
                    <p className="text-primary-100">
                        You've learned that RL agents optimize for the Return, not the immediate reward. Now, let's look at how we package all these concepts together into a Markov Reward Process.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MARKOV REWARD PROCESS
                    </button>
                </div>
            </div>
        </div>
    );
}
