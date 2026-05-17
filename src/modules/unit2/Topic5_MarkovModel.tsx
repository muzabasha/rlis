import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    Network, Eye, EyeOff, Gamepad2, Settings2, GitBranch, ShieldAlert, Zap
} from 'lucide-react';

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

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Expanding the Tuple" 
                subtitle="How Math Changes with Observability"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="\langle S, P \rangle"
                                label="Markov Chain"
                                explanation="Just States (S) and Transition Probabilities (P). Autonomous and visible."
                            />
                            <MathBlock 
                                formula="\langle S, P, Y, O \rangle"
                                label="Hidden Markov Model (HMM)"
                                explanation="Y = Set of Observations. O = Observation Probabilities (Emission matrix)."
                            />
                        </div>
                        <div className="space-y-6">
                            <MathBlock 
                                formula="\langle S, A, P, R \rangle"
                                label="Markov Decision Process"
                                explanation="We add Actions (A) and Rewards (R) to give the agent control and goals."
                            />
                            <MathBlock 
                                formula="\langle S, A, P, R, \Omega, O \rangle"
                                label="POMDP"
                                explanation="The most complex. We have Actions, Rewards, plus Observations (\Omega) and Observation Probabilities (O)."
                            />
                        </div>
                    </div>
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


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
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

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Speech Recognition" 
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

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
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

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Taxonomy Explorer" 
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
                >
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Adjust the parameters of <strong>Control</strong> and <strong>Observability</strong> to discover which mathematical framework is required to model your system.
                    </p>
                    <ModelTaxonomyLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
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
}
