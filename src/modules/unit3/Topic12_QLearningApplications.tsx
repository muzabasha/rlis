import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Rocket, Network, Briefcase, Zap, Binary, Layers, Eye,
    ChevronRight, Play, RotateCcw, TrendingUp, Search, Brain,
    Car, ShoppingCart, Activity, ShieldCheck, Server, Target
} from 'lucide-react';

// ─── Interactive Components for Topic 12 ─────────────────────────────────────

/**
 * Industry Application Selector: How RL fits in different sectors
 */
function ApplicationLab() {
    const [selectedApp, setSelectedApp] = useState(0);

    const apps = [
        { 
            title: 'Traffic Management', 
            icon: Car, 
            state: 'Vehicle density / wait times', 
            action: 'Change signal timing', 
            reward: 'Reduced average delay',
            desc: 'Cities use Q-Learning to dynamically adjust green lights, preventing traffic jams before they happen.'
        },
        { 
            title: 'Dynamic Pricing', 
            icon: ShoppingCart, 
            state: 'Demand / Inventory / Time', 
            action: 'Increase or decrease price', 
            reward: 'Total revenue / sales volume',
            desc: 'Airlines and e-commerce sites use RL to find the perfect price point that maximizes profit while keeping seats full.'
        },
        { 
            title: 'Energy Grid Optimization', 
            icon: Server, 
            state: 'Current load / solar output', 
            action: 'Route power to storage/grid', 
            reward: 'Cost reduction / grid stability',
            desc: 'Smart grids use RL to decide when to store energy in batteries and when to release it to avoid blackouts.'
        },
        { 
            title: 'Recommendation Systems', 
            icon: Search, 
            state: 'User history / current time', 
            action: 'Show specific product/video', 
            reward: 'Click-through / Watch time',
            desc: 'Streaming services use RL to learn which content will keep you engaged for the longest time.'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Application Menu */}
                <div className="w-full md:w-1/3 space-y-2">
                    {apps.map((app, i) => {
                        const Icon = app.icon;
                        return (
                            <button
                                key={i}
                                onClick={() => setSelectedApp(i)}
                                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 text-left ${
                                    selectedApp === i 
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                    : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                                }`}
                            >
                                <div className={`p-2 rounded-lg ${selectedApp === i ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                    <Icon size={18} />
                                </div>
                                <span className={`text-xs font-bold ${selectedApp === i ? 'text-primary-600' : 'text-slate-500'}`}>{app.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Details Panel */}
                <div className="flex-1 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedApp}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-primary-500">
                                    {React.createElement(apps[selectedApp].icon, { size: 32 })}
                                </div>
                                <h4 className="text-xl font-black text-slate-800 dark:text-white">{apps[selectedApp].title}</h4>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                "{apps[selectedApp].desc}"
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-primary-500 uppercase mb-1">State (S)</div>
                                    <div className="text-[10px] text-slate-500 font-medium">{apps[selectedApp].state}</div>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-indigo-500 uppercase mb-1">Action (A)</div>
                                    <div className="text-[10px] text-slate-500 font-medium">{apps[selectedApp].action}</div>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-emerald-500 uppercase mb-1">Reward (R)</div>
                                    <div className="text-[10px] text-slate-500 font-medium">{apps[selectedApp].reward}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic12_QLearningApplications() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Beyond the Game Console" 
                subtitle="Q-Learning in the Real World"
                icon={<Rocket className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Network size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌍 Global Optimization
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Q-Learning is famous for mastering Atari games and chess, but its most impactful work happens in the shadows of our modern infrastructure.
                            </p>
                            <p>
                                From managing the **Electricity Grid** of entire nations to deciding the **Price of your Flight**, Q-Learning agents are working behind the scenes to optimize efficiency and minimize waste.
                            </p>
                            <p>
                                Any problem that involves a **Sequence of Decisions** with **Delayed Consequences** is a perfect candidate for Q-Learning. It turns complex, multi-variable environments into a simple game of maximizing cumulative reward.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Resource Saver">
                            Q-Learning is a powerful tool for sustainability, helping reduce fuel consumption in logistics and energy waste in data centers.
                        </InfoCard>
                        <InfoCard type="tip" title="Industry Standard">
                            While newer algorithms exist, Q-Learning remains a foundational "First Choice" for industrial control due to its simplicity and theoretical stability.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Modelling the Industry MDP" 
                subtitle="Translating Business into Math"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\mathcal{R}_{\text{Business}} = \text{Revenue} - \text{Cost} - \text{Penalty}"
                        label="The Business Reward Function"
                        explanation="How we translate company goals into a reward signal."
                        interpretation="The agent doesn't understand 'Brand Loyalty' or 'Efficiency'; it only understands numbers. We must carefully design R so that maximizing it achieves the actual business goal."
                        motivation="Design errors in the reward function (Reward Hacking) can lead to agents that achieve high scores but destroy the system."
                        terms={[
                            { term: '\text{Penalty}', name: 'Risk Mitigation', meaning: 'Negative reward for unsafe or illegal actions.', range: '\mathbb{R}^-', example: '-1000 for server crash.' },
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Convergence in Practice</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            In real-world applications, we rarely use a simple table. Instead, we use **Function Approximators** (Neural Networks) to map complex states to Q-values:
                            <br/><br/>
                            <span className="text-sm font-mono text-white">Q(s, a; \theta) \approx Q^*(s, a)</span>
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Consultant's Workshop"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Sector Explorer Demo",
                            objectives: "Observe how abstract RL components (S, A, R) adapt to vastly different industries.",
                            instructions: [
                                "Open the 'Industry Sector Explorer' in the Virtual Lab section.",
                                "Select 'Traffic Management'. Explain: 'State is sensory data; Action is a mechanical control.'",
                                "Select 'Dynamic Pricing'. Explain: 'State is market data; Action is a financial decision.'",
                                "Show how the 'Reward' always represents the primary business KPI (Key Performance Indicator).",
                                "Ask: 'Which sector has the most unpredictable Next State (s')?'"
                            ],
                            inputs: "Interactive ApplicationLab component",
                            outputs: "Visual mapping of 4 distinct industrial MDPs.",
                            rubrics: ["Clarity of 'Translation' logic", "Comparison of different sectors", "Student engagement"],
                            outcomes: "Students identify Q-Learning as a universal framework for sequence-based optimization.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Corporate Reward Workshop",
                            objectives: "Collaboratively design a balanced reward function for a complex ethical/financial task.",
                            instructions: [
                                "Teacher presents a scenario: 'Designing an RL agent for a Bank Loan Approval Bot'.",
                                "Guided Design: 'What is a +R?' (Loan repaid with interest). 'What is a -R?' (Loan default).",
                                "Add Complexity: 'How do we penalize Bias or Unfairness?'",
                                "Class reflects: 'If we only reward Profit, will the agent stop giving loans to low-income students?'",
                                "Conclusion: Professional reward design must balance efficiency with ethics and risk."
                            ],
                            inputs: "Financial and ethical constraint list",
                            outputs: "A multi-weighted Reward Equation on the board",
                            rubrics: ["Inclusion of 'Risk' vs 'Profit'", "Addressing ethical constraints", "Classroom participation"],
                            outcomes: "Students master the skill of multi-objective reward engineering.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The RL Consultant Pitch",
                            objectives: "Experience the creative application of RL to local, relatable business problems.",
                            instructions: [
                                "Divide class into 4 teams. Assign each team a 'Local Business' (e.g., The School Canteen, The Gym, The Library).",
                                "Group Task: Design a Q-Learning system to 'Optimize' that business.",
                                "Output: Define the State (e.g., Inventory levels), Action (e.g., Discount price), and Reward (e.g., Zero food waste).",
                                "Teams pitch their 'Smart Solution' to the class, explaining how 'Delayed Reward' works in their scenario.",
                                "Conclusion: 'Anything that can be measured can be optimized by RL.'"
                            ],
                            inputs: "Local business prompts",
                            outputs: "Consultancy posters showing the MDP architecture",
                            rubrics: ["Logical consistency of the MDP", "Relevance of the chosen reward", "Team coordination"],
                            outcomes: "Students bridge the gap between classroom algorithms and entrepreneurship.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Smart Device Audit",
                            objectives: "Independently audit a commercial device or app to predict its internal RL logic.",
                            instructions: [
                                "Task: Choose a device/app you use daily (e.g., Netflix, Instagram, Google Maps, or a Smart Thermostat).",
                                "Audit: What is the 'Action' the app takes to keep you engaged? (The recommendation).",
                                "Reflection: Predict a 'Reward Hacking' failure. (e.g., 'Instagram shows me shocking news because it gets a high reward for my click, even if I hate the content').",
                                "Analysis: If the 'Discount Factor' $\\gamma$ was 0, how would the app's behavior change?",
                                "Propose: A 'User-Centric' reward function that prioritizes mental health over clicks."
                            ],
                            inputs: "Personal smartphone/apps",
                            outputs: "Individual Application Audit Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Critical thinking on 'Reward Hacking'", "Originality"],
                            outcomes: "Students develop a critical, engineering-based perspective on modern AI consumer products.",
                            time: "15 Mins",
                            materials: ["Student Workbook", "Personal device"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Smart Thermostat" 
                subtitle="Energy Efficiency at Scale"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Consumer Electronics</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Google Nest and other smart thermostats use RL to learn your habits. State: [Current Temp, Time, Occupancy]. Action: [Heat, Cool, Idle]. Reward: [User Comfort - Energy Cost]. Over one week, the Q-learning agent finds the optimal policy to keep you warm while saving 15% on your bill.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Layers size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Input</div>
                            <p className="text-[8px] mt-1">Room Sensors</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Brain size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">Learning</div>
                            <p className="text-[8px] mt-1">User Schedule</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <ShieldCheck size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">Outcome</div>
                            <p className="text-[8px] mt-1">Low Energy Bill</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Applied Theory"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why is Q-Learning suitable for traffic light control?', a: 'Because traffic flow is a sequence of states with delayed consequences. An action taken now (Green light) affects vehicle density minutes later in different parts of the city.' },
                        { q: 'What is "Reward Hacking"?', a: 'When an agent finds a way to get a high reward without actually solving the intended problem (e.g., a cleaner robot moving dirt in circles because it gets a reward for every "cleaning action").' },
                        { q: 'Can Q-Learning be used for stock trading?', a: 'Yes. State: [Price history, Volume]. Action: [Buy, Sell, Hold]. Reward: [Profit/Loss]. However, the market is highly non-stationary, making it a difficult MDP.' }
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
                title="6. Virtual Lab: Industry Sector Explorer" 
                subtitle="Apply Q-Learning Everywhere"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select an industry sector on the left to see how the abstract concepts of **States, Actions, and Rewards** translate into real business logic and physical control.
                    </p>
                    <ApplicationLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Applications Mastered!</h3>
                    <p className="text-primary-100">
                        You've seen the power of RL in the real world. Now, let's look at the most famous Case Studies that put Q-Learning on the map.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: Q-LEARNING CASE STUDIES
                    </button>
                </div>
            </div>
        </div>
    );
}
