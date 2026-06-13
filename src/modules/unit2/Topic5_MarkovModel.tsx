import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import {
    motion,
    AnimatePresence
} from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import {
    MathBlock,
    SymbolTable
} from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    Network,
    Eye,
    EyeOff,
    Gamepad2,
    Settings2,
    GitBranch,
    ShieldAlert,
    Zap,
    CheckCircle2,
    AlertTriangle,
    Target
} from 'lucide-react';
import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Markov Model Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Markov Model Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Markov Model simulator.",
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
    "🤖 [System] Initializing Markov Model Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Markov Model\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components ──────────────────────────────────────────────────

function ModelTaxonomyLab() {
    const [control, setControl] = useState<'Autonomous' | 'Controlled'>('Autonomous');
    const [observability, setObservability] = useState<'Fully Observable' | 'Partially Observable'>('Fully Observable');

    const getModel = () => {
        if (control === 'Autonomous' && observability === 'Fully Observable') return 'Markov Chain (MC)';
        if (control === 'Autonomous' && observability === 'Partially Observable') return 'Hidden Markov Model (HMM)';
        if (control === 'Controlled' && observability === 'Fully Observable') return 'Markov Decision Process (MDP)';
        if (control === 'Controlled' && observability === 'Partially Observable') return 'Partially Observable MDP (POMDP)';
        return '';
    };

    const modelDetails = {
        'Markov Chain (MC)': {
            icon: <Network size={32} className="text-emerald-500" />,
            desc: "The system runs on its own, and you can see exactly what state it's in. Examples: Simple weather patterns, board games with no hidden cards.",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
            border: "border-emerald-200 dark:border-emerald-800",
            color: "text-emerald-600"
        },
        'Hidden Markov Model (HMM)': {
            icon: <EyeOff size={32} className="text-purple-500" />,
            desc: "The system runs on its own, but you can only see indirect 'emissions' (clues) about the state. Examples: Speech recognition, DNA sequence analysis.",
            bg: "bg-purple-50 dark:bg-purple-900/20",
            border: "border-purple-200 dark:border-purple-800",
            color: "text-purple-600"
        },
        'Markov Decision Process (MDP)': {
            icon: <Gamepad2 size={32} className="text-blue-500" />,
            desc: "You can control the transitions via actions, and you know exactly what state you are in. Examples: Chess, solving a Rubik's cube.",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            border: "border-blue-200 dark:border-blue-800",
            color: "text-blue-600"
        },
        'Partially Observable MDP (POMDP)': {
            icon: <ShieldAlert size={32} className="text-amber-500" />,
            desc: "You can take actions, but you aren't exactly sure what state you're in. Examples: Poker, autonomous driving with noisy sensors.",
            bg: "bg-amber-50 dark:bg-amber-900/20",
            border: "border-amber-200 dark:border-amber-800",
            color: "text-amber-600"
        }
    };

    const currentModel = getModel();
    const details = modelDetails[currentModel as keyof typeof modelDetails];

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Control Panel */}
                <div className="space-y-6 flex-1">
                    <div>
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">1. System Control</h5>
                        <div className="flex gap-2">
                            {(['Autonomous', 'Controlled'] as const).map(c => (
                                <button key={c} onClick={() => setControl(c)}
                                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${control === c ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/20' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                                    {c}
                                    <div className="text-[10px] font-normal opacity-70 mt-1">{c === 'Autonomous' ? 'No Actions' : 'Actions Available'}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">2. System Observability</h5>
                        <div className="flex gap-2">
                            {(['Fully Observable', 'Partially Observable'] as const).map(o => (
                                <button key={o} onClick={() => setObservability(o)}
                                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border flex flex-col items-center ${observability === o ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                                    {o === 'Fully Observable' ? <Eye size={16} className="mb-1" /> : <EyeOff size={16} className="mb-1" />}
                                    {o}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Result Display */}
                <div className={`flex-1 p-8 rounded-3xl border-2 flex flex-col items-center justify-center text-center transition-colors duration-500 ${details.bg} ${details.border}`}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentModel}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                                {details.icon}
                            </div>
                            <h3 className={`text-2xl font-black ${details.color}`}>{currentModel}</h3>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-sm">
                                {details.desc}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic5_MarkovModel() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic5_markovmodel" />
            {/* SECTION 0: PREREQUISITES */}
            <SectionWrapper
                id="prerequisites"
                title="0. Prerequisites"
                subtitle="What you should know before starting"
                icon={<BookOpen className="text-sky-600" size={24} />}
                badge="Prerequisites"
                badgeColor="bg-sky-100 text-sky-700"
                accentColor="border-sky-500"
            >
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit2', 'Topic5_MarkovModel');
                        if (!data) return <p className="text-sm text-slate-500">No prerequisites listed.</p>;
                        return (
                            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                {data.prerequisites.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        );
                    })()}
                </div>
            </SectionWrapper>

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper
                id="story"
                title="1. The Four Kingdoms of Markov"
                subtitle="Classifying Stochastic Systems"
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
                                "It's just state machines with gambling added."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <GitBranch size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🏰 The Taxonomy of Systems
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Not all systems are created equal. When scientists try to model random real-world environments, they ask themselves two critical questions:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Do we have control?</strong> Are we just watching the weather, or are we driving a car?</li>
                                <li><strong>Can we see everything?</strong> Are we looking at a clear chessboard, or playing poker where cards are hidden?</li>
                            </ul>
                            <p>
                                By answering these two questions, we divide the universe of random systems into <strong>Four Markov Models</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Umbrella Term">
                            "Markov Model" is an umbrella term for models that rely on the Markov Property (the future depends only on the present).
                        </InfoCard>
                        <InfoCard type="tip" title="RL's Home">
                            Reinforcement Learning almost exclusively lives in the "Controlled" side of the taxonomy (MDPs and POMDPs).
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
                                Designing an automated spellchecker that predicts the next typed character using state transition probabilities.
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
                            Essential for constructing probabilistic predictive systems for sequential processes.
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
                                    Highly intuitive and easily visualizable model architecture; perfect for small sequence domains.
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
                                    Scales extremely poorly as state spaces grow, creating the 'curse of dimensionality'.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper
                id="math"
                title="3. Expanding the Tuple"
                subtitle="How Math Changes with Observability"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-6">
                    <MathBlock
                        formula="\text{MC} = \langle \mathcal{S},\,\mathbf{P} \rangle \;\xrightarrow{+\text{Actions}}\; \text{MDP} = \langle \mathcal{S},\mathcal{A},\mathbf{P},\mathcal{R},\gamma \rangle \;\xrightarrow{+\text{Hidden}}\; \text{POMDP}"
                        label="The Markov Model Taxonomy — Tuple Evolution"
                        accent="blue"
                        explanation="Each Markov model is an extension of the previous one. Adding actions gives control (MDP). Adding hidden states gives partial observability (POMDP). The tuple grows with complexity."
                        interpretation="This progression shows how the mathematical formalism scales with real-world complexity. A simple weather model needs only ⟨S,P⟩. A chess-playing agent needs ⟨S,A,P,R,γ⟩. A self-driving car with noisy sensors needs the full POMDP tuple. Understanding this hierarchy helps you choose the right model for any problem."
                        motivation="Knowing which tuple to use determines which algorithms are applicable. MC → analytical solutions. MDP → dynamic programming, Q-learning. POMDP → belief-state methods, particle filters. Choosing the wrong model leads to either over-engineering or under-performance."
                        terms={[
                            { term: '\\mathcal{S}', name: 'State Space', meaning: 'Set of all possible states. Present in all four models.', range: 'Finite or \\mathbb{R}^n', example: 'Weather: {Sunny, Rainy}. Chess: all board configurations.' },
                            { term: '\\mathbf{P}', name: 'Transition Matrix', meaning: 'Probability of state transitions. Present in all four models.', range: '[0,1]^{|S|\\times|S|}', example: 'P(Rainy|Sunny)=0.2.' },
                            { term: '\\mathcal{A}', name: 'Action Space', meaning: 'Set of decisions the agent can make. Added in MDP and POMDP.', range: 'Finite or \\mathbb{R}^m', example: 'Robot: {move_left, move_right, stop}.' },
                            { term: '\\mathcal{R}', name: 'Reward Function', meaning: 'Scalar feedback signal. Added in MDP and POMDP to define the objective.', range: '\\mathbb{R}', example: 'R(goal_state)=+100, R(obstacle)=−50.' },
                            { term: '\\Omega,\\,O', name: 'Observations & Emission', meaning: 'In POMDP: Ω is the set of possible observations; O(o|s,a) is the probability of observing o in state s after action a.', range: '[0,1]', example: 'Noisy sensor: O(see_wall|near_wall,move)=0.9.' },
                        ]}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                        <MathBlock
                            formula="\langle \mathcal{S},\,\mathbf{P},\,\mathcal{Y},\,\mathbf{O} \rangle"
                            label="Hidden Markov Model (HMM)"
                            accent="violet"
                            explanation="Y = set of observable emissions. O = emission probability matrix O(y|s). The true state s is hidden; only observation y is visible."
                            interpretation="In an HMM, the system evolves through hidden states (e.g., the actual word being spoken) but we only observe noisy emissions (e.g., audio waveforms). The Viterbi algorithm finds the most likely hidden state sequence given the observations."
                            terms={[
                                { term: '\\mathcal{Y}', name: 'Observation Set', meaning: 'All possible observable outputs (emissions) from the hidden states.', range: 'Finite', example: 'Speech: Y = {phoneme_1, ..., phoneme_44}.' },
                                { term: '\\mathbf{O}', name: 'Emission Matrix', meaning: 'O(y|s) = probability of observing y when in hidden state s.', range: '[0,1]', example: 'O(audio_A|state_A)=0.8.' },
                            ]}
                        />
                        <MathBlock
                            formula="\langle \mathcal{S},\mathcal{A},\mathbf{P},\mathcal{R},\boldsymbol{\Omega},\mathbf{O} \rangle"
                            label="POMDP — Partially Observable MDP"
                            accent="amber"
                            explanation="The most general model. Adds observations Ω and emission probabilities O to the MDP tuple. The agent maintains a belief state b(s) = P(true state = s | history)."
                            interpretation="In a POMDP, the agent cannot directly observe the true state. Instead, it maintains a belief state — a probability distribution over all possible states. Actions update both the true state (via P) and the belief state (via Bayes' rule and O). Most real-world AI problems are POMDPs."
                            terms={[
                                { term: '\\boldsymbol{\\Omega}', name: 'Observation Space', meaning: 'Set of all possible observations the agent can receive.', range: 'Finite or \\mathbb{R}^k', example: 'Robot: Ω = {wall_detected, open_space, goal_visible}.' },
                                { term: 'b(s)', name: 'Belief State', meaning: 'Probability distribution over true states, updated after each observation using Bayes\' rule.', range: '[0,1]^{|S|}', example: 'b = [0.3, 0.5, 0.2] — 30% chance in state 1, 50% in state 2, 20% in state 3.' },
                            ]}
                        />
                    </div>

                    <ModelTaxonomyLab />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram
                title="Markov Model Architecture"
                description="Generic Markov Model architecture."
                chart={`graph LR
    Init((Start)) --> S1((State 1))
    Init --> S2((State 2))
    S1 -->|prob p| S2
    S2 -->|prob q| S1`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper
                id="activity"
                title="4. Multi-Level Activities"
                subtitle="Classifying Complex Environments"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels
                    levels={[
                        {
                            level: 1,
                            title: "Taxonomy Explorer Demo",
                            objectives: "Identify the four major Markov models based on the criteria of control and observability.",
                            instructions: [
                                "Open the 'Taxonomy Explorer' in the Virtual Lab section.",
                                "Toggle 'Control' to show the shift from MC/HMM to MDP/POMDP.",
                                "Toggle 'Observability' to show how 'Hidden' states transform the model complexity.",
                                "Explain that RL practitioners usually work in the 'Controlled' domain."
                            ],
                            inputs: "Interactive ModelTaxonomyLab component",
                            outputs: "Visual classification of 4 models with specific use cases.",
                            rubrics: ["Clarity of taxonomy boundaries", "Demonstration of observability impact", "Student engagement"],
                            outcomes: "Students categorize any random system into one of the four Markov quadrants.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Tuple Expansion Workshop",
                            objectives: "Collaboratively map real-world scenarios to their formal mathematical tuple representation.",
                            instructions: [
                                "Teacher presents a scenario: 'A weather-sensing satellite that cannot see through clouds but can move its camera.'",
                                "Guided Discussion: 'Is it controlled? (Yes). Is it fully observable? (No)'.",
                                "Class identifies it as a POMDP.",
                                "Teacher asks: 'What symbols must we add to the basic $\\langle S, P \\rangle$ tuple?'",
                                "Students list: $A$ (Actions), $R$ (Rewards), $\\Omega$ (Observations), and $O$ (Emission probabilities)."
                            ],
                            inputs: "Scenario descriptions",
                            outputs: "Formal Tuple mapping on the board (e.g., $\\langle S, A, P, R, \\Omega, O \\rangle$)",
                            rubrics: ["Correct model identification", "Technical symbol accuracy", "Classroom participation"],
                            outcomes: "Students understand that increasing environment complexity requires expanding the mathematical definition.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Blindfolded Maze Simulation",
                            objectives: "Experience the fundamental difference between an MDP and a POMDP through physical simulation.",
                            instructions: [
                                "Divide class into 4 teams. Team 1/2 are 'MDP Teams', Team 3/4 are 'POMDP Teams'.",
                                "MDP Team: One student directs a 'Robot' through a floor-maze with eyes open (Full Observability).",
                                "POMDP Team: Same task, but the 'Robot' is blindfolded and can only ask: 'Am I touching a wall?' (Partial Observability).",
                                "Groups compare the number of steps and 'Reward' (speed/accuracy) between the two models."
                            ],
                            inputs: "Classroom floor maze",
                            outputs: "Comparison Table: Steps vs Accuracy for MDP vs POMDP",
                            rubrics: ["Depth of insight on 'Uncertainty'", "Technical observation reporting", "Team coordination"],
                            outcomes: "Students internalize the difficulty of decision-making under partial observability.",
                            time: "20 Mins",
                            materials: ["Tape for floor maze", "Blindfolds"]
                        },
                        {
                            level: 4,
                            title: "Smart Device Audit",
                            objectives: "Independently analyze an everyday smart device as a formal Markovian system.",
                            instructions: [
                                "Task: Choose one device (e.g., Smart Thermostat, Noise-Cancelling Headphones, Netflix Recommendation Engine).",
                                "Audit: Does it have 'Control' (Actions) or is it just 'Monitoring'?",
                                "Audit: Does it see the 'True State' (e.g., user's exact body temperature) or just an 'Observation' (e.g., room air temperature)?",
                                "Report: Classify your device as an MC, HMM, MDP, or POMDP and justify why."
                            ],
                            inputs: "Everyday smart technology examples",
                            outputs: "Individual System Classification Report (1 page)",
                            rubrics: ["Correct model selection", "Logical justification of observability/control", "Originality"],
                            outcomes: "Students realize that most 'Intelligent' systems are actually POMDPs in disguise.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper
                id="project"
                title="5. Project: Speech Recognition"
                subtitle="The Power of HMMs"
                icon={<BookOpen className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Zap size={18} /> Siri's Ancestors</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Before deep neural networks, early speech recognition systems (like early Siri/Dragon Dictation) were built entirely on <strong>Hidden Markov Models</strong>.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h5 className="font-bold mb-4">How it works:</h5>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-indigo-500 shrink-0">1</span>
                                <div>
                                    <strong className="text-slate-800 dark:text-slate-200">The Hidden State:</strong> The actual word the person intended to say (e.g., "Apple"). We can't see their brain, so it's hidden!
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-indigo-500 shrink-0">2</span>
                                <div>
                                    <strong className="text-slate-800 dark:text-slate-200">The Emission (Observation):</strong> The audio waves recorded by the microphone. This is what we <em>can</em> see.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-indigo-500 shrink-0">3</span>
                                <div>
                                    <strong className="text-slate-800 dark:text-slate-200">The Goal:</strong> Use the Viterbi Algorithm to find the most likely sequence of hidden states (words) that produced those audio waves.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper
                id="questions"
                title="6. Quick Check"
                subtitle="Taxonomy Definitions"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is the main difference between a Markov Chain and an MDP?', a: 'A Markov Chain is autonomous (transitions happen on their own), whereas an MDP adds "Actions" allowing an agent to control the transitions to maximize "Rewards".' },
                        { q: 'What does "Hidden" mean in a Hidden Markov Model (HMM)?', a: 'It means the true state of the system cannot be observed directly; it can only be inferred through noisy observations or emissions.' },
                        { q: 'Give a real-world example of a POMDP.', a: 'Self-driving cars. The car can take actions (steer, brake), but its sensors (cameras, LiDAR) are noisy, so it never has perfect knowledge of its exact state relative to everything else.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper
                id="lab"
                title="7. Virtual Lab: Taxonomy Explorer"
                subtitle="Identify the Right Model"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <VirtualLabShell
                        title="Markov Model Builder"
                        description="Construct and simulate custom Markov models"
                        objective="Set transition probabilities between states and observe long-run behaviour patterns."
                        badge="Interactive Lab"
                        tips={['Absorbing states (probability 1 self-loop) represent terminal conditions',
                            'Ergodic chains visit all states — check if yours is ergodic']}
                        challenges={challenges} notebook={notebook} logs={logs}>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Adjust the parameters of <strong>Control</strong> and <strong>Observability</strong> to discover which mathematical framework is required to model your system.
                        </p>
                        <ModelTaxonomyLab />
                    </VirtualLabShell>

                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper
                id="mcq"
                title="8. Knowledge Check"
                subtitle="10 Feedback-Based MCQs"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="MCQ Quiz"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                {(() => {
                    const data = getTopicData('unit2', 'Topic5_MarkovModel');
                    if (!data) return <p className="text-sm text-slate-500">MCQs not available.</p>;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit2', 'Topic5_MarkovModel');
                if (!data) return null;
                return (
                    <div className="space-y-6">
                        {/* Recap Section */}
                        <SectionWrapper
                            id="recap"
                            title="9. Topic Recap"
                            subtitle="Key points to remember"
                            icon={<BookOpen className="text-emerald-600" size={24} />}
                            badge="Recap"
                            badgeColor="bg-emerald-100 text-emerald-700"
                            accentColor="border-emerald-500"
                        >
                            <ul className="space-y-2">
                                {data.recap.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </SectionWrapper>

                        {/* Skill Mapping Section */}
                        <SectionWrapper
                            id="skills"
                            title="10. Skill Mapping"
                            subtitle="Competencies developed"
                            icon={<Target className="text-indigo-600" size={24} />}
                            badge="Skills"
                            badgeColor="bg-indigo-100 text-indigo-700"
                            accentColor="border-indigo-500"
                        >
                            <div className="grid gap-3">
                                {data.skillMapping.map((skill, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.skill}</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                            skill.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            skill.level === 'Intermediate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </SectionWrapper>

                        {/* Original Mastered navigation */}
                        <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                            <div className="max-w-xl mx-auto space-y-2">
                                <h3 className="text-3xl font-black italic">Taxonomy Mastered!</h3>
                                <p className="text-primary-100">
                                    You know the difference between MC, HMM, MDP, and POMDP. Ready to look under the hood at the engine driving these models: The Markov Matrix?
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                    NEXT: MARKOV MATRIX
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
