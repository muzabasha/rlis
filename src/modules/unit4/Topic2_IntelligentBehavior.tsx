import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Brain, Target, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, Search, Globe, Shield, Rocket,
    Activity, MessageSquare, Fingerprint, Settings, Briefcase
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

// ─── Interactive Components for Topic 2 ──────────────────────────────────────

/**
 * Intelligent Behavior Radar
 */
function BehaviorLab() {
    const [selectedBot, setSelectedBot] = useState(0);

    const bots = [
        {
            name: 'Thermostat',
            desc: 'A simple reflex agent.',
            data: [
                { subject: 'Learning', A: 10, full: 100 },
                { subject: 'Perception', A: 90, full: 100 },
                { subject: 'Reasoning', A: 5, full: 100 },
                { subject: 'Adaptability', A: 5, full: 100 },
                { subject: 'Autonomy', A: 100, full: 100 },
            ],
            color: '#94a3b8'
        },
        {
            name: 'AlphaGo',
            desc: 'A master of reasoning and learning.',
            data: [
                { subject: 'Learning', A: 100, full: 100 },
                { subject: 'Perception', A: 40, full: 100 },
                { subject: 'Reasoning', A: 100, full: 100 },
                { subject: 'Adaptability', A: 20, full: 100 },
                { subject: 'Autonomy', A: 90, full: 100 },
            ],
            color: '#3b82f6'
        },
        {
            name: 'Self-Driving Car',
            desc: 'A balanced intelligent system.',
            data: [
                { subject: 'Learning', A: 80, full: 100 },
                { subject: 'Perception', A: 100, full: 100 },
                { subject: 'Reasoning', A: 70, full: 100 },
                { subject: 'Adaptability', A: 90, full: 100 },
                { subject: 'Autonomy', A: 80, full: 100 },
            ],
            color: '#10b981'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Bot Selector */}
                <div className="w-full md:w-1/3 space-y-3">
                    {bots.map((bot, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedBot(i)}
                            className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                                selectedBot === i 
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                            }`}
                        >
                            <div className="text-sm font-black text-slate-800 dark:text-white">{bot.name}</div>
                            <div className="text-[10px] text-slate-500 font-medium">{bot.desc}</div>
                        </button>
                    ))}
                </div>

                {/* Radar Chart */}
                <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-center min-h-[350px]">
                    <div className="w-full h-full max-w-[300px]">
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={bots[selectedBot].data}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                                <Radar
                                    name={bots[selectedBot].name}
                                    dataKey="A"
                                    stroke={bots[selectedBot].color}
                                    fill={bots[selectedBot].color}
                                    fillOpacity={0.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
                            Intelligence Profile: {bots[selectedBot].name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic2_IntelligentBehavior() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Anatomy of Intelligence" 
                subtitle="Deconstructing the Mind"
                icon={<Brain className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Activity size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🧠 Beyond Raw Calculations
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                What makes a cat "smarter" than a calculator? A calculator can do math faster, but a cat can navigate a room, learn where its food is kept, and adapt if you move the bowl.
                            </p>
                            <p>
                                **Intelligent Behavior** is a cocktail of traits: Learning from mistakes, Reasoning about the future, Perceiving the world through sensors, and adapting when rules change.
                            </p>
                            <p>
                                In synthetic systems, we don't just want speed; we want **Resilience**. An intelligent agent doesn't just execute a script; it *understands* (mathematically) how its actions influence its goals.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Perception Gap">
                            A system is only as intelligent as its sensors. Without good **Perception**, the best reasoning engine is blind.
                        </InfoCard>
                        <InfoCard type="tip" title="Self-Correction">
                            The hallmark of intelligence is the ability to recognize a "bad" state and change strategy to avoid it in the future.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Performance Measure" 
                subtitle="Quantifying Success"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="P(A, E) = \mathbb{E} \left[ \sum_{t=0}^{T} R(s_t, a_t) \right]"
                        label="Performance Measure (P)"
                        explanation="The expected cumulative reward of an agent A in environment E."
                        interpretation="Intelligent behavior is measured by the agent's ability to maximize this sum. If P is high, the agent is exhibiting 'effective' intelligence for that specific goal."
                        motivation="This formula grounds the abstract concept of 'Intelligence' into a concrete number we can optimize using algorithms like Q-Learning."
                        terms={[
                            { term: 'P', name: 'Performance', meaning: 'The total score/utility achieved by the agent.', range: '\mathbb{R}', example: 'Average score in an Atari game.' },
                            { term: '\mathbb{E}', name: 'Expectation', meaning: 'The average result across many runs (accounting for randomness).', range: '-', example: 'Mean return over 100 episodes.' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Rationality vs. Intelligence</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            A **Rational Agent** always picks the action that maximizes its expected performance measure, given its perception history.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Intelligence Radar"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Profile Comparison Demo",
                            objectives: "Observe how different 'Intelligent' systems prioritize different traits.",
                            instructions: [
                                "Open the 'Behavioral Radar' in the Virtual Lab section.",
                                "Select 'Thermostat'. Explain: 'It has 100% Autonomy but 0% Learning. It's a simple reflex.'",
                                "Select 'Self-Driving Car'. Show the balance between Perception, Adaptability, and Reasoning.",
                                "Explain: 'Intelligence isn't one number; it's a shape on this chart.'",
                                "Ask: 'If you gave a Thermostat the ability to learn, which axis would move?'"
                            ],
                            inputs: "Interactive BehaviorLab component",
                            outputs: "Radar chart overlays for 3 distinct AI architectures.",
                            rubrics: ["Clarity of axis definitions", "Comparison of 'Reflex' vs 'Deliberative' agents", "Student engagement"],
                            outcomes: "Students identify the multi-dimensional nature of synthetic intelligence.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Intelligence Tuning Workshop",
                            objectives: "Collaboratively modify a system's behavioral profile to meet new goals.",
                            instructions: [
                                "Teacher presents a 'Dumb' device: A standard Toaster.",
                                "Guided Design: 'If we want a Smart Toaster, what do we add to the Perception axis?' (e.g., Image sensors for bread color).",
                                "Guided Design: 'What goes in Learning?' (e.g., Remembering user preference for sourdough vs. white bread).",
                                "Class reflects: 'Does adding reasoning make it a better toaster, or just a more expensive one?'",
                                "Conclusion: Intelligence must be 'Fit for Purpose'."
                            ],
                            inputs: "Consumer appliance prompts",
                            outputs: "Modified Radar profiles on the board",
                            rubrics: ["Logical addition of sensors/memory", "Cost-benefit analysis of 'Smart' features", "Classroom participation"],
                            outcomes: "Students master the practical application of intelligence traits to product design.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "Biological vs. Synthetic Audit",
                            objectives: "Experience the comparison of natural and artificial intelligence traits.",
                            instructions: [
                                "Divide class into 4 teams. Assign each an animal: {Honeybee, Octopus, Crow, Golden Retriever}.",
                                "Group Task: Map that animal's 'Intelligence Radar' on paper.",
                                "Constraint: Must justify the 'Octopus' high score in 'Adaptability' or the 'Bee' high score in 'Autonomy'.",
                                "Teams present their 'Bio-Radar' and compare it to the 'Self-Driving Car' profile from Level 1.",
                                "Conclusion: 'Nature is the ultimate architect of multi-dimensional intelligence.'"
                            ],
                            inputs: "Animal behavioral data snippets",
                            outputs: "Biological Intelligence Radar posters",
                            rubrics: ["Biological accuracy", "Correct mapping to the 5 axes", "Team coordination"],
                            outcomes: "Students develop a cross-disciplinary understanding of behavioral traits.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Colored markers"]
                        },
                        {
                            level: 4,
                            title: "Smart App Reverse Engineering",
                            objectives: "Independently audit a daily app to identify its behavioral intelligence components.",
                            instructions: [
                                "Task: Choose a 'Smart' app (e.g., Spotify, Google Maps, or a Language Translator).",
                                "Audit: List 1 specific example of 'Perception' (e.g., GPS data) and 'Learning' (e.g., Past song skips).",
                                "Reflection: Is the app 'Rational'? Does it always pick the best action to maximize your reward?",
                                "Analysis: If the 'Reasoning' axis was set to 0, how would the app behave? (e.g., Spotify only plays the top 40).",
                                "Propose: One trait to improve in the app to make it 'Smarter'."
                            ],
                            inputs: "Personal smartphone apps",
                            outputs: "Individual Application Intelligence Audit (1 page)",
                            rubrics: ["Correct use of Behavioral terminology", "Logical trait identification", "Originality"],
                            outcomes: "Students demonstrate the ability to deconstruct complex software into its core intelligent traits.",
                            time: "15 Mins",
                            materials: ["Student Workbook", "Smartphone"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Defining an Intelligent Vacuum" 
                subtitle="Behavior Specification"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Intelligent Roomba</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            How do you make a vacuum "Intelligent"? It shouldn't just move randomly. It should **Learn** which rooms get dirty fastest, **Perceive** obstacles, and **Reason** about the most efficient path to cover the entire floor before its battery (Constraint) runs out.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Settings size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase">Learning</div>
                            <p className="text-[8px] mt-1">Dirt Pattern Mapping</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Target size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Reasoning</div>
                            <p className="text-[8px] mt-1">Path Optimization</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Zap size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Adaptability</div>
                            <p className="text-[8px] mt-1">Avoiding Obstacles</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Behavioral Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'List four core characteristics of intelligent behavior.', a: 'Learning (improving from experience), Reasoning (solving problems logically), Perception (interpreting sensor data), and Adaptability (changing behavior in new environments).' },
                        { q: 'What is the role of "Autonomy" in an intelligent system?', a: 'Autonomy allows a system to make decisions based on its own experience and perception, rather than relying solely on pre-programmed knowledge from its creator.' },
                        { q: 'Can a system be intelligent without learning?', a: 'Yes (e.g., Expert Systems), but it will be brittle. Modern intelligence almost always requires learning to handle real-world uncertainty.' }
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
                title="6. Virtual Lab: Behavioral Radar" 
                subtitle="Profile Different Systems"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Compare different systems by their "Intelligence Profile." Notice how a specialized agent like AlphaGo scores perfectly in Reasoning but low in Adaptability compared to a general agent.
                    </p>
                    <BehaviorLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Behavior: Decoded!</h3>
                    <p className="text-primary-100">
                        You've seen what makes a system "Intelligent." Now, let's see how they compare to traditional, hard-coded software.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: TRADITIONAL VS. INTELLIGENT
                    </button>
                </div>
            </div>
        </div>
    );
}
