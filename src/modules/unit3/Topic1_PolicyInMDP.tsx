import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import {
    motion,
    AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock,
    SymbolTable } from '../../components/topic/MathBlock';
import { PolicyVis } from '../../components/visualizers';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Map,
    GitBranch,
    Target,
    Briefcase,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    Brain,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';

import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';
import { InlineMath } from 'react-katex';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Policy In M D P Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Policy In M D P Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Policy In M D P simulator.",
        "question": "Based on your experiment, how does this concept influence long-term state-action values under stochastic conditions?",
        "hint": "Consider factors like the discount factor (gamma), immediate rewards, and next-state expectations."
    },
    {
        "task": "Change the parameters to their minimum and maximum settings and compare results.",
        "question": "What primary edge-case did you observe when parameters were set to extreme boundary values?",
        "hint": "For example, consider what happens when exploration is completely shut off, or when rewards are purely negative."
    }
];
const logs: string[] = [
    "🤖 [System] Initializing Policy In M D P Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Policy In M D P\" model has been loaded and initialized. Ready for student interaction."
];

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
            <TopicProgressTracker topicId="unit3-topic1_policyinmdp" />
            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit3', 'Topic1_PolicyInMDP');
                        if (!data) return null;
                        return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{data.prerequisites.map((p, i) => <li key={i}>{p}</li>)}</ul>);
                    })()}
                </div>
            </SectionWrapper>

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
                    <div className="mt-2 mb-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm flex items-start gap-4 transform hover:scale-[1.02] transition-transform">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-2xl">
                            🎭
                        </div>
                        <div>
                            <h5 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                                Fun Fact / Comic Relief
                            </h5>
                            <p className="text-indigo-700 dark:text-indigo-300 font-medium italic leading-relaxed">
                                "A policy is just a giant flowchart of 'If X, do Y', except X is 'everything' and Y is 'hopefully not crash'."
                            </p>
                        </div>
                    </div>
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
                            The ultimate goal of any Reinforcement Learning algorithm is to find the **Optimal Policy** (<InlineMath math="\pi^*" />).
                        </InfoCard>
                        <InfoCard type="tip" title="State-to-Action">
                            A policy is a mapping. It takes a state as input and returns an action (or a probability distribution over actions).
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            
            {/* SECTION 2: MOTIVATION & APPLICATION CHALLENGE */}
            <SectionWrapper
                id="motivation"
                title="2. Motivation & Application Challenge"
                subtitle="Why study this topic?"
                icon={<Lightbulb className="text-amber-500" size={24} />}
                badge="Motivation"
                badgeColor="bg-amber-100 text-amber-700"
                accentColor="border-amber-500"
            >
                <div className="space-y-6">
                    {/* APPLICATION CHALLENGE CARD */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900 shadow-sm flex items-start gap-4 animate-fade-in">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-2xl">
                            🚀
                        </div>
                        <div className="space-y-2">
                            <h5 className="font-bold text-amber-900 dark:text-amber-100 text-base">
                                Application-Specific Challenge
                            </h5>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                How does a robot vacuum cleaner decide whether to spin, move forward, or dock at any given room location to clean efficiently without running out of battery?
                            </p>
                        </div>
                    </div>

                    {/* THE NEED TO STUDY */}
                    <div className="bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Target className="text-primary-500" size={16} />
                            The Need to Study this Topic
                        </h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Essential for defining the operational strategy (mapping states to actions) that controls the agent's behavior throughout an environment.
                        </p>
                    </div>

                    {/* ADVANTAGES & DISADVANTAGES */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-emerald-950 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">
                                    Advantages
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    Offers a clear mathematical mapping of behaviors; supports both probabilistic (stochastic) and exact (deterministic) decision schemes.
                                </p>
                            </div>
                        </div>

                        <div className="bg-rose-50/50 dark:bg-rose-950/10 p-5 rounded-2xl border border-rose-100 dark:border-rose-900 shadow-sm flex gap-3 hover:scale-[1.01] transition-all">
                            <AlertTriangle className="text-rose-500 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <h6 className="font-bold text-rose-900 dark:text-rose-400 text-xs uppercase tracking-wider mb-1">
                                    Disadvantages / Bottlenecks
                                </h6>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                    If the policy is represented as a direct lookup table, it becomes unsustainably massive in real-world high-dimensional spaces.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Policy Mapping" 
                subtitle="Formalizing Strategy"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock 
                        formula="\\pi(a|s) = \\mathbb{P}[A_t = a \\mid S_t = s]"
                        label="The Policy Function"
                        accent="blue"
                        explanation="The probability of taking action a given that the agent is in state s."
                        interpretation="A policy completely defines the behavior of an agent. It is stationary if it does not depend on time t."
                        motivation="By treating policy as a probability distribution, we allow the agent to explore and handle uncertainty in its own decision-making process."
                        terms={[
                            { term: '\\pi(a|s)', name: 'Policy', meaning: 'The probability of taking action a in state s.', range: '[0, 1]', example: '0.9 (90% chance).' },
                            { term: 'A_t = a', name: 'Action', meaning: 'The action taken at time t.', range: '\\mathcal{A}', example: 'Move Right.' },
                            { term: 'S_t = s', name: 'State', meaning: 'The state the agent is currently in.', range: '\\mathcal{S}', example: 'Position (1,1).' }
                        ]}
                        numericalExample={{
                            setup: 'Agent in state A can choose Left or Right.',
                            steps: [
                                'State S_t = A',
                                'Policy gives probabilities: \\pi(Left|A) = 0.2, \\pi(Right|A) = 0.8',
                                'Agent rolls a weighted die and chooses Right'
                            ],
                            result: 'Agent takes action Right with 80% probability based on policy \\pi.'
                        }}
                    />
                    <PolicyVis />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Policy In M D P Architecture"
                description="Mapping states to actions via policies."
                chart={`graph LR
    S((State Space)) --> Pi{Policy &pi;}
    Pi --> |Determines| A[Action Space]
    A --> |Executes in| E((Environment))`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
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

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: Traffic Control Policy" 
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

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
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
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Policy Navigator" 
                subtitle="Mapping Situations to Actions"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Policy Visualizer"
                    description="Display and compare stochastic policies"
                    objective="Visualize the policy as arrows on a gridworld. Switch between random, greedy, and optimal policies."
                    badge="Interactive Lab"
                    tips={['A deterministic policy has one arrow per state',
                'A stochastic policy shows multiple arrows with different opacities (probabilities)']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In this lab, you can see how an agent's policy maps different **States** to specific **Actions**. Select a state to see which action the policy recommends and what its "Confidence" (Q-Value) is.
                    </p>
                    <PolicyNavigator />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => {
                    const data = getTopicData('unit3', 'Topic1_PolicyInMDP');
                    if (!data) return null;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit3', 'Topic1_PolicyInMDP');
                if (!data) return null;
                return (<React.Fragment>
                    <SectionWrapper id="recap" title="9. Topic Recap" subtitle="Key points to remember" icon={<BookOpen className="text-emerald-600" size={24} />} badge="Recap" badgeColor="bg-emerald-100 text-emerald-700" accentColor="border-emerald-500">
                        <ul className="space-y-2">{data.recap.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>{point}
                            </li>
                        ))}</ul>
                    </SectionWrapper>
                    <SectionWrapper id="skills" title="10. Skill Mapping" subtitle="Competencies developed" icon={<Target className="text-indigo-600" size={24} />} badge="Skills" badgeColor="bg-indigo-100 text-indigo-700" accentColor="border-indigo-500">
                        <div className="grid gap-3">{data.skillMapping.map((skill, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.skill}</span>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${skill.level === 'Beginner' ? 'bg-green-100 text-green-700' : skill.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{skill.level}</span>
                            </div>
                        ))}</div>
                    </SectionWrapper>
                </React.Fragment>);
            })()}

            {/* Keep existing navigation buttons here */}
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
