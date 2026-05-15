import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Map, GitBranch, Target, Briefcase, Zap, Binary, Layers,
    Eye, ChevronRight, Play, RotateCcw, Brain
} from 'lucide-react';

// ─── Interactive Components for Topic 1 ─────────────────────────────────────

/**
 * Policy Navigator: Visualizing State-Action Mapping
 */
function PolicyNavigator() {
    const [selectedState, setSelectedState] = useState<'A' | 'B' | 'C'>('A');
    
    const policy = {
        'A': { action: 'Go Right', prob: 0.9, qValue: 8.5 },
        'B': { action: 'Go Up', prob: 0.7, qValue: 6.2 },
        'C': { action: 'Stay', prob: 1.0, qValue: 9.8 }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* State Selector */}
                <div className="w-full md:w-1/3 space-y-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select State</h5>
                    <div className="flex flex-col gap-2">
                        {(['A', 'B', 'C'] as const).map(s => (
                            <button
                                key={s}
                                onClick={() => setSelectedState(s)}
                                className={`p-4 rounded-2xl border-2 transition-all flex justify-between items-center ${
                                    selectedState === s 
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                                    : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                                }`}
                            >
                                <span className={`font-black ${selectedState === s ? 'text-primary-600' : 'text-slate-400'}`}>State {s}</span>
                                {selectedState === s && <ChevronRight size={16} className="text-primary-500" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mapping Display */}
                <div className="flex-1 flex flex-col justify-center items-center gap-6 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Map size={120} />
                    </div>
                    
                    <div className="flex items-center gap-6 z-10">
                        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-2 border-slate-200 flex items-center justify-center text-2xl font-black text-slate-700 dark:text-slate-200">
                            {selectedState}
                        </div>
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-primary-500"
                        >
                            <ChevronRight size={32} />
                        </motion.div>
                        <div className="w-40 h-20 bg-primary-600 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white p-4">
                            <span className="text-[10px] font-bold uppercase opacity-80">Action</span>
                            <span className="text-lg font-black">{policy[selectedState].action}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs z-10">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-center border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Probability</span>
                            <p className="text-lg font-black text-emerald-500">{policy[selectedState].prob * 100}%</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-center border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Q-Value</span>
                            <p className="text-lg font-black text-blue-500">{policy[selectedState].qValue}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic1_PolicyInMDP() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The GPS for Agents" 
                subtitle="Defining Behavior in Uncertainty"
                icon={<BookOpen className="text-blue-600" size={24} />}
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
                            🗺️ The Strategy Guide
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Imagine you are playing a complex board game. For every possible position of the pieces (**State**), you have a rulebook that tells you which move to make (**Action**).
                            </p>
                            <p>
                                This rulebook is your <strong>Policy</strong>. It doesn't care how you got to the current state; it only cares about what you should do <em>now</em> to win eventually.
                            </p>
                            <p>
                                In RL, the policy is the "Soul" of the agent. While Value Functions tell us how good a state is, the Policy is the actual decision-making engine that drives the agent through the environment.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Goal of RL">
                            The ultimate goal of any Reinforcement Learning algorithm is to find the **Optimal Policy** ($\pi^*$).
                        </InfoCard>
                        <InfoCard type="tip" title="State-to-Action">
                            A policy is a mapping. It takes a state as input and returns an action (or a probability distribution over actions).
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Policy Mapping" 
                subtitle="Formalizing Strategy"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="\pi(a|s) = \mathbb{P}[A_t = a \mid S_t = s]"
                        label="The Policy Function"
                        explanation="The probability of taking action a given that the agent is in state s."
                        interpretation="A policy completely defines the behavior of an agent. It is stationary if it does not depend on time t."
                        motivation="By treating policy as a probability distribution, we allow the agent to explore and handle uncertainty in its own decision-making process."
                        terms={[
                            { term: '\pi', name: 'Policy', meaning: 'The mapping function from States to Actions.', range: '\mathcal{S} \to \mathcal{A}', example: 'A lookup table or a neural network.' },
                            { term: 'a|s', name: 'Conditional Action', meaning: 'Taking action a given the current state is s.', range: '\mathcal{A}', example: 'Picking "Jump" given state "Obstacle".' },
                        ]}
                    />

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="p-6 bg-slate-900 rounded-3xl text-white">
                            <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Deterministic Policy</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                A special case where there is no randomness. For every state, there is exactly one action with probability 1.0.
                                <br/><br/>
                                <span className="text-sm font-mono text-white">a = \pi(s)</span>
                            </p>
                        </div>
                        <div className="p-6 bg-slate-900 rounded-3xl text-white">
                            <h5 className="font-bold text-indigo-400 mb-2 flex items-center gap-2"><Zap size={16} /> Stochastic Policy</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                The agent chooses actions based on probabilities. This is essential for exploration and for games where being predictable is a disadvantage.
                            </p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
                subtitle="The Strategy Blueprint"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Policy Navigator Demo",
                            objectives: "Observe how a policy acts as a deterministic or stochastic look-up table for actions.",
                            instructions: [
                                "Open the 'Policy Navigator' in the Virtual Lab section.",
                                "Switch between State A, B, and C.",
                                "Explain: 'When I am in State A, the rulebook (Policy) says Go Right with 90% confidence.'",
                                "Demonstrate how the 'Confidence' (Q-Value) dictates why the policy prefers one action over others.",
                                "Ask: 'What happens if we make the policy 100% deterministic?' (It becomes a fixed rule)."
                            ],
                            inputs: "Interactive PolicyNavigator component",
                            outputs: "State-to-Action mapping visuals and probability scores.",
                            rubrics: ["Clarity of 'Rulebook' analogy", "Demonstration of mapping logic", "Student engagement"],
                            outcomes: "Students define a policy as the mathematical 'Brain' that maps states to actions.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Exam Week Policy Workshop",
                            objectives: "Collaboratively design a state-action mapping for a multi-stage process.",
                            instructions: [
                                "Teacher presents 3 states: {Prepared, Overwhelmed, Exhausted}.",
                                "Group Task: For each state, define the best action: {Study, Review, Sleep}.",
                                "Teacher asks: 'In the Overwhelmed state, should we review or sleep?'",
                                "Collaborative Mapping: Fill in a table on the board. State -> Action.",
                                "Reflection: 'Is this policy optimal? How would we know?' (Wait for reward feedback)."
                            ],
                            inputs: "Relatable student scenarios",
                            outputs: "Hand-drawn Policy Table (Rulebook)",
                            rubrics: ["Logical consistency of the mapping", "Justification of choices", "Classroom participation"],
                            outcomes: "Students master the skill of creating formal mappings for non-numerical states.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Rock-Paper-Scissors Stochastic Challenge",
                            objectives: "Experience why stochastic (randomized) policies are necessary for competitive environments.",
                            instructions: [
                                "Divide class into 4 teams. Each team is an 'Agent'.",
                                "Task: Create a 'Policy distribution' for playing Rock-Paper-Scissors.",
                                "Condition: If you always pick Rock (Deterministic), the opponent will always pick Paper (Optimal Response).",
                                "Group Task: Design a Stochastic Policy (e.g., 33% each) to ensure you are unexploitable.",
                                "Teams 'play' their distribution against each other. Discuss: 'Does randomness make the policy stronger?'"
                            ],
                            inputs: "Game theory basics",
                            outputs: "Probability distribution charts",
                            rubrics: ["Understanding of randomness utility", "Data representation accuracy", "Team coordination"],
                            outcomes: "Students identify the core advantage of stochastic policies in adversarial settings.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Video Game AI Audit",
                            objectives: "Independently audit a commercial game to identify the underlying policy of an NPC.",
                            instructions: [
                                "Task: Choose a simple game enemy (e.g., Ghosts in Pac-Man, Goombas in Mario, or Guards in a stealth game).",
                                "Audit: What is their 'State' (Player position, patrol route)?",
                                "Audit: What is their 'Action' (Chase, Flee, Patrol)?",
                                "Reflection: Is their policy 'Static' (Hardcoded) or 'Dynamic' (Changes with rewards)?",
                                "Propose: If you were the developer, how would you change their policy to make the game more challenging?"
                            ],
                            inputs: "Personal gaming experiences",
                            outputs: "Individual AI Policy Audit Report (1 page)",
                            rubrics: ["Identification of state/action variables", "Critical thinking on 'Optimality'", "Originality"],
                            outcomes: "Students bridge the gap between academic RL and industry game design.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Traffic Control Policy" 
                subtitle="Optimizing Urban Flow"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            You are designing the "Policy" for a smart traffic light. The states are the number of cars waiting at each side. The actions are Green Light North-South or Green Light East-West.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Fixed Policy">
                            Changing lights every 60 seconds regardless of traffic. (Inefficient but simple).
                        </InfoCard>
                        <InfoCard type="tip" title="Reactive Policy">
                            Switching lights based on sensor data. (An RL Policy).
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Conceptual Foundations"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is a Policy in the context of MDP?', a: 'A policy is a strategy or mapping that an agent follows to determine the next action based on the current state of the environment.' },
                        { q: 'Is a policy dependent on the history of states?', a: 'No, due to the Markov Property, a policy depends only on the current state, not on the sequence of states that preceded it.' },
                        { q: 'What is an "Optimal Policy"?', a: 'An optimal policy is one that maximizes the expected return (cumulative discounted reward) from every state.' }
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
                title="6. Virtual Lab: Policy Navigator" 
                subtitle="Mapping Situations to Actions"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In this lab, you can see how an agent's policy maps different **States** to specific **Actions**. Select a state to see which action the policy recommends and what its "Confidence" (Q-Value) is.
                    </p>
                    <PolicyNavigator />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Policy Understood!</h3>
                    <p className="text-primary-100">
                        You've learned how agents make decisions. Ready to see how we learn the *best* policy from scratch using Q-Learning?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: Q-LEARNING INTRO
                    </button>
                </div>
            </div>
        </div>
    );
}
