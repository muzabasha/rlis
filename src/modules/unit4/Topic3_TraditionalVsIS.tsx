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
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    GitCompare,
    Zap,
    Binary,
    Layers,
    Eye,
    ChevronRight,
    Play,
    RotateCcw,
    Search,
    Brain,
    Globe,
    Shield,
    Rocket,
    Activity,
    Settings,
    Cpu,
    HardDrive,
    Target,
    Briefcase,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Traditional Vs I S Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Traditional Vs I S Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Traditional Vs I S simulator.",
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
    "🤖 [System] Initializing Traditional Vs I S Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Traditional Vs I S\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 3 ──────────────────────────────────────

/**
 * Response Comparison Lab
 */
function ResponseLab() {
    const [scenario, setScenario] = useState<'Normal' | 'Unexpected'>('Normal');

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="flex justify-center gap-4">
                {['Normal', 'Unexpected'].map(s => (
                    <button
                        key={s}
                        onClick={() => setScenario(s as any)}
                        className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
                            scenario === s 
                            ? 'bg-primary-600 text-white shadow-lg' 
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                        }`}
                    >
                        {s.toUpperCase()} INPUT
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Traditional System */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                        <Cpu size={14} /> Traditional (Rule-Based)
                    </div>
                    <div className={`p-6 rounded-[2rem] border-2 h-40 flex flex-col justify-center transition-all ${
                        scenario === 'Normal' ? 'border-slate-200 bg-slate-50' : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    }`}>
                        <div className="text-sm font-bold text-slate-800 dark:text-white mb-2">
                            {scenario === 'Normal' ? 'Output: Success' : 'Output: CRASH / ERROR'}
                        </div>
                        <p className="text-[10px] text-slate-500 italic">
                            {scenario === 'Normal' 
                                ? 'Input matches pre-defined "IF" condition. System executes "THEN" action.' 
                                : 'Input not found in rule-base. System has no instructions for this case.'}
                        </p>
                    </div>
                </div>

                {/* Intelligent System */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary-500 font-black text-[10px] uppercase tracking-widest">
                        <Brain size={14} /> Intelligent (Learning-Based)
                    </div>
                    <div className="p-6 rounded-[2rem] border-2 border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10 h-40 flex flex-col justify-center">
                        <div className="text-sm font-bold text-primary-700 dark:text-primary-300 mb-2">
                            Output: Adaptation
                        </div>
                        <p className="text-[10px] text-primary-600 dark:text-primary-400 italic">
                            {scenario === 'Normal' 
                                ? 'Recognizes pattern. Executes optimal policy.' 
                                : 'Generalizes from previous experience. Attempts safe maneuver based on probability.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic3_TraditionalVsIS() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic3_traditionalvsis" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Brittle vs. The Brave" 
                subtitle="Rigid Logic vs. Flexible Learning"
                icon={<GitCompare className="text-blue-600" size={24} />}
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
                                "Traditional systems are like a strict math teacher. Intelligent Systems are like a jazz musician improvising."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Settings size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🛤️ On Rails vs. Off Road
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Think of a **Traditional System** like a train on tracks. It's incredibly fast and efficient as long as the tracks are there. But if there's a rock on the tracks, the train can't "decide" to go around it. It just follows its rails until it crashes.
                            </p>
                            <p>
                                An **Intelligent System** is like a mountain biker. There are no tracks. The biker has a *goal* (the bottom of the mountain) and must constantly *perceive* the terrain and *adapt* their path. If they see a rock, they use their experience to steer around it.
                            </p>
                            <p>
                                Software engineering is evolving from building "Trains" (Fixed Algorithms) to training "Bikers" (Intelligent Agents). One is easier to predict; the other is the only way to survive in the real world.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Explicit vs. Implicit">
                            Traditional systems require **Explicit Programming** (Tell me what to do). Intelligent systems use **Implicit Learning** (Tell me what the goal is).
                        </InfoCard>
                        <InfoCard type="tip" title="Predictability Trade-off">
                            Traditional systems are 100% predictable but 0% flexible. Intelligent systems are flexible but can sometimes be "black boxes."
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
                                Transitioning a spam filter system from brittle, hardcoded regular expression keywords (Traditional) to self-learning email classification models (IS).
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
                            Critical to know when to use simple, deterministic traditional programming vs. complex, statistical, self-adaptive intelligent systems.
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
                                    Saves thousands of developer hours by replacing massive nested IF-ELSE statement sets with unified learning algorithms.
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
                                    Intelligent systems are black-box networks, meaning they lack the exact deterministic trace-ability of traditional programs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Modeling Difference" 
                subtitle="Fixed Functions vs. Adaptive Approximators"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Traditional</h5>
                            <MathBlock 
                                formula="y = f(x)"
                                label="Fixed Logic"
                                explanation="Output is a direct result of input and static rules."
                                interpretation="f is hard-coded. If x is slightly outside the domain of f, the system breaks."
                                motivation="Perfect for accounting, banking, and compilers."
                                terms={[]}
                            />
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-black text-[10px] text-primary-500 uppercase tracking-widest">Intelligent</h5>
                            <MathBlock 
                                formula="\hat{y} = f(x, \theta)"
                                label="Adaptive Logic"
                                explanation="Output depends on input and learned parameters \theta."
                                interpretation="\theta is updated via experience. The system 'tunes' itself to handle new variations of x."
                                motivation="Perfect for vision, speech, and robotics."
                                terms={[]}
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Heuristic vs. Algorithmic</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Traditional systems use **Algorithms** (guaranteed steps). Intelligent systems often use **Heuristics** (best-guess based on experience) to solve problems that are too complex for direct calculation.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Traditional Vs I S Architecture"
                description="Static Programming versus Intelligent Systems."
                chart={`graph LR
    subgraph Traditional
        Data1[Data] --> Alg[Algorithm]
        Rules1[Rules] --> Alg
        Alg --> Ans1[Answers]
    end
    subgraph Intelligent System
        Data2[Data] --> ML[Machine Learning]
        Ans2[Answers] --> ML
        ML --> Rules2[Rules & Patterns]
    end`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="The System Battle"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Response Simulator Demo",
                            objectives: "Visualize the fragility of rule-based systems vs. the robustness of learners.",
                            instructions: [
                                "Open the 'Response Simulator' in the Virtual Lab section.",
                                "Select 'Normal Input'. Point out: 'Both systems succeed. Rules are fine here.'",
                                "Select 'Unexpected Input'. Show the Traditional system crashing.",
                                "Explain: 'The Intelligent system doesn't have a specific rule for this, but it generalizes from its policy.'",
                                "Ask: 'Which system is easier to debug? Which is safer for a car?'"
                            ],
                            inputs: "Interactive ResponseLab component",
                            outputs: "Visual comparison of system stability under stress.",
                            rubrics: ["Clarity of 'Brittle' vs 'Flexible' distinction", "Correct identification of the crash cause", "Student engagement"],
                            outcomes: "Students identify why rules fail in high-variance environments.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "Edge Case Brainstorming",
                            objectives: "Collaboratively identify environmental shifts that break traditional logic.",
                            instructions: [
                                "Teacher presents a 'Traditional ATM' (Rules: If card valid + PIN correct, Dispense Cash).",
                                "Guided Design: 'What happens if a user inserts a piece of cardboard shaped like a card?'",
                                "Guided Design: 'What if the user is being forced to withdraw cash at gunpoint (Stress Detection)?'",
                                "Class reflects: 'Can you write a rule for every possible \"bad\" thing that can happen at an ATM?'",
                                "Conclusion: Explicit programming cannot cover the \"Long Tail\" of reality."
                            ],
                            inputs: "Banking scenario prompts",
                            outputs: "List of 'Un-programmable' edge cases on the board",
                            rubrics: ["Creativity in edge-case identification", "Logical justification of why rules fail", "Classroom participation"],
                            outcomes: "Students master the boundary of where traditional programming ends and IS begins.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Intelligent System Swap",
                            objectives: "Experience the transition from algorithmic logic to goal-based learning.",
                            instructions: [
                                "Divide class into 4 teams. Assign each a traditional software: {Chess Computer (Minimax), Basic Calculator, Fixed-route GPS, Thermostat}.",
                                "Group Task: Re-design this as an Intelligent System. What is the Goal? What is the Reward?",
                                "Constraint: You cannot write 'IF-THEN' rules. You must define a 'Learning Mechanism'.",
                                "Output: A 'System Swap' blueprint showing the shift from 'Code' to 'Policy'.",
                                "Conclusion: 'We move from telling the machine HOW to do it, to telling it WHAT to achieve.'"
                            ],
                            inputs: "Traditional software definitions",
                            outputs: "Intelligent System Blueprints",
                            rubrics: ["Depth of re-design", "Correct use of 'Goal' vs 'Rule' logic", "Team coordination"],
                            outcomes: "Students develop the mindset of a 'Teacher' rather than just a 'Coder'.",
                            time: "20 Mins",
                            materials: ["Blueprint templates", "Chart paper"]
                        },
                        {
                            level: 4,
                            title: "Home Intelligence Audit",
                            objectives: "Independently audit household technology to identify its 'Intelligence Gap'.",
                            instructions: [
                                "Task: Choose a 'Dumb' device in your home (e.g., Microwave, Light Switch, or Washing Machine).",
                                "Audit: List 3 scenarios where the device's fixed rules are annoying or inefficient.",
                                "Reflection: If this device were 'Intelligent', how would it adapt to your specific behavior?",
                                "Analysis: Propose one 'Reward Signal' for your Smart Washing Machine (e.g., +10 for clean clothes at lowest energy).",
                                "Final Verdict: Is it worth the complexity to make this device intelligent?"
                            ],
                            inputs: "Personal household technology",
                            outputs: "Individual Home Intelligence Report (1 page)",
                            rubrics: ["Correct use of RL/IS terminology", "Logical efficiency analysis", "Originality"],
                            outcomes: "Students demonstrate the ability to evaluate the ROI of intelligence in real-world products.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Spam Filter" 
                subtitle="Upgrading from Rules to Learning"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Outsmarting the Spammers</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            In the 90s, spam filters used rules (if email contains "Win Money", move to Spam). Spammers quickly learned to write "W1n M0ney" to bypass them. Your project is to design a system that **Learns** what spam looks like by observing your "Delete" actions, so it can adapt even when spammers change their spelling.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Cpu size={24} className="mx-auto mb-2 text-slate-400" />
                            <div className="text-[10px] font-black uppercase">Phase 1</div>
                            <p className="text-[8px] mt-1">Rule Definition</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-primary-500">
                            <Activity size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Phase 2</div>
                            <p className="text-[8px] mt-1">Performance Audit</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <Brain size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase">Phase 3</div>
                            <p className="text-[8px] mt-1">Learning Integration</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Architectural Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'Why are traditional systems described as "deterministic"?', a: 'Because given the same input, they will always produce the exact same output using the exact same pre-defined steps, without any deviation or learning.' },
                        { q: 'What is "Explicit Programming"?', a: 'The process of a human coder writing down every specific instruction and rule the system must follow to solve a problem.' },
                        { q: 'In what scenarios should you choose a traditional system over an intelligent one?', a: 'When the rules are well-defined, the data is structured, and 100% predictability/traceability is required (e.g., medical billing or safety-critical logic gates).' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Response Simulator" 
                subtitle="Observe System Fragility"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Rule Engine vs ML Comparator"
                    description="Compare rigid rules vs learned patterns"
                    objective="Design rules manually vs let ML learn from data. Observe where each approach breaks down."
                    badge="Interactive Lab"
                    tips={['Rules are brittle — they fail on edge cases',
                'ML systems handle edge cases better but need training data']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        In this simulation, watch how a Traditional System handles unexpected data vs. an Intelligent System. Click **Unexpected Input** to see which one breaks!
                    </p>
                    <ResponseLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Comparison: Mastered!</h3>
                    <p className="text-primary-100">
                        You know the "What" and the "Why." Now, let's explore "Where" these intelligent systems are changing the world.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: APPLICATIONS OF IS
                    </button>
                </div>
            </div>
        </div>
    );
}
