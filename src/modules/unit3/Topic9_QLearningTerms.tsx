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
import { SARSAQLearningVis } from '../../components/visualizers';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen,
    Calculator,
    Users,
    HelpCircle,
    FlaskConical,
    Lightbulb,
    FileText,
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
    TrendingUp,
    Search,
    Brain,
    Dna,
    Settings,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';

import FeedbackMCQ from '../../components/topic/FeedbackMCQ';
import { getTopicData } from '../../data/topicData';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Q Learning Terms Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Q Learning Terms Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Q Learning Terms simulator.",
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
    "🤖 [System] Initializing Q Learning Terms Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Q Learning Terms\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components for Topic 9 ─────────────────────────────────────

/**
 * Term Sensitivity Lab: How Alpha and Gamma affect learning
 */
function TermSensitivityLab() {
    const [alpha, setAlpha] = useState(0.5);
    const [gamma, setGamma] = useState(0.9);
    
    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* Learning Rate Alpha */}
                <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Settings size={18} className="text-primary-500" />
                            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Alpha ($\alpha$)</span>
                        </div>
                        <span className="text-xl font-black text-primary-600">{alpha.toFixed(1)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        The **Learning Rate**. How much does the robot care about the *new* surprise compared to its *old* memory?
                    </p>
                    <input 
                        type="range" min="0" max="1" step="0.1" 
                        value={alpha} 
                        onChange={(e) => setAlpha(parseFloat(e.target.value))}
                        className="w-full accent-primary-600"
                    />
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-[10px] font-bold text-center">
                        {alpha < 0.3 ? '🐢 Slow & Stable (Cautious)' : alpha > 0.7 ? '⚡ Fast & Volatile (Impulsive)' : '⚖️ Balanced Learning'}
                    </div>
                </div>

                {/* Discount Factor Gamma */}
                <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={18} className="text-indigo-500" />
                            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Gamma ($\gamma$)</span>
                        </div>
                        <span className="text-xl font-black text-indigo-600">{gamma.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        The **Discount Factor**. How much does a reward in 10 minutes matter compared to a reward *right now*?
                    </p>
                    <input 
                        type="range" min="0" max="1" step="0.05" 
                        value={gamma} 
                        onChange={(e) => setGamma(parseFloat(e.target.value))}
                        className="w-full accent-indigo-600"
                    />
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-[10px] font-bold text-center">
                        {gamma < 0.5 ? '🍗 Shortsighted (Instant Gratification)' : gamma > 0.9 ? '🔭 Farsighted (Long-term Strategy)' : '🏢 Corporate Planner'}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic9_QLearningTerms() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit3-topic9_qlearningterms" />
            {/* PREREQUISITES */}
            <SectionWrapper id="prerequisites" title="0. Prerequisites" subtitle="What you should know before starting" icon={<BookOpen className="text-sky-600" size={24} />} badge="Prerequisites" badgeColor="bg-sky-100 text-sky-700" accentColor="border-sky-500">
                <div className="space-y-3">
                    {(() => {
                        const data = getTopicData('unit3', 'Topic9_QLearningTerms');
                        if (!data) return null;
                        return (<ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">{data.prerequisites.map((p, i) => <li key={i}>{p}</li>)}</ul>);
                    })()}
                </div>
            </SectionWrapper>

            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Robot's DNA" 
                subtitle="Fine-Tuning the Learning Mind"
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
                                "Alpha, Gamma, Epsilon... sounds like a frat house, but it's actually the secret sauce to artificial intelligence."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Settings size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🧬 The Personality of an Agent
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Two agents can live in the exact same world, face the exact same problems, but come up with completely different strategies.
                            </p>
                            <p>
                                Why? Because their "Learning DNA"—their **Hyperparameters**—are different.
                            </p>
                            <p>
                                **Alpha ($\alpha$)** determines how quickly the agent trusts new experiences. **Gamma ($\gamma$)** determines if the agent is a "living for the moment" gambler or a "strategic planner" for the future. Understanding these terms is the difference between a failing agent and a world-champion AI.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Tuning Challenge">
                            Setting the right terms (Alpha, Gamma, Epsilon) is often called an "Art" in the RL community.
                        </InfoCard>
                        <InfoCard type="tip" title="Hyperparameters">
                            Unlike Q-values which the agent learns, these terms are set by **You**, the designer.
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
                                Tuning an autonomous warehouse forklift's speed so it doesn't forget past routes (high alpha) or ignore long-term goals (low gamma).
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
                            Critical because hyperparameters (Learning Rate alpha, Discount Factor Gamma, Exploration Epsilon) determine whether an agent succeeds or fails.
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
                                    Offers precise, granular control over the speed, safety, and horizon of the learning process.
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
                                    Finding the optimal set of hyperparameters requires extensive, frustrating, and expensive trial-and-error tuning.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. The Notation Key" 
                subtitle="Cracking the Q-Learning Code"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="Q(s, a) \\leftarrow Q(s, a) + \\alpha \\underbrace{[r + \\gamma \\max_{a'} Q(s', a') - Q(s, a)]}_{\\text{TD Error}}"
                        label="The Q-Update Notation"
                        explanation="Breaking down every symbol in the learning rule."
                        interpretation="The equation is essentially: New = Old + Change. The TD Error is the 'Magnitude' of change needed."
                        motivation="By standardizing these symbols, researchers can apply Q-learning to robots, video games, and even financial markets using the same math."
                        terms={[
                            { term: 's, a', name: 'State/Action', meaning: 'The input situation and the output choice.', range: '\\mathcal{S}, \\mathcal{A}', example: 'Room #5, Go Left.' },
                            { term: 's\', a\'', name: 'Successor', meaning: 'The situation and choice at the next time step.', range: '\\mathcal{S}, \\mathcal{A}', example: 'The landing position.' },
                        ]}
                    />
                    <SARSAQLearningVis />

                    <SymbolTable symbols={[
                        { symbol: '\\alpha', meaning: 'Learning Rate — weights new vs old knowledge.', unit: '0 to 1' },
                        { symbol: '\\gamma', meaning: 'Discount Factor — weights future vs immediate rewards.', unit: '0 to 1' },
                        { symbol: '\\epsilon', meaning: 'Exploration Rate — chance of taking a random action.', unit: '0 to 1' },
                    ]} />
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Q Learning Terms Architecture"
                description="Hyperparameters in Q-Learning."
                chart={`graph TD
    Params[Q-Learning Hyperparameters]
    Params --> Alpha[Learning Rate &alpha;: How fast to replace old values]
    Params --> Gamma[Discount &gamma;: Importance of future rewards]
    Params --> Epsilon[Exploration &epsilon;: Randomness]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="The Dial of Intelligence"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Personality Sandbox Demo",
                            objectives: "Observe how tuning Alpha and Gamma fundamentally changes the agent's behavior profile.",
                            instructions: [
                                "Open the 'Personality Sandbox' in the Virtual Lab section.",
                                "Move Alpha to 1.0. Explain: 'This robot has no memory; it only believes the last thing it saw.'",
                                "Move Gamma to 0.0. Explain: 'This robot is a gambler; it only cares about what it can get right now.'",
                                "Show the 'Balanced' setting (Alpha=0.1, Gamma=0.9). Explain: 'This is the profile of a stable, long-term learner.'",
                                "Ask: 'Which setting would you use for a robot in a constantly changing environment?'"
                            ],
                            inputs: "Interactive TermSensitivityLab component",
                            outputs: "Behavioral labels (e.g., 'Impulsive', 'Shortsighted') and slider feedback.",
                            rubrics: ["Clarity of 'Personality' analogy", "Demonstration of extreme settings", "Student engagement"],
                            outcomes: "Students identify hyperparameters as the 'DNA' that controls an agent's learning style.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Parameter Conflict Workshop",
                            objectives: "Collaboratively analyze the interaction between different hyperparameter settings.",
                            instructions: [
                                "Teacher presents two conflicting scenarios.",
                                "Scenario A: High $\\alpha$ (0.9) and High $\\gamma$ (0.9). 'The Nervous Planner'.",
                                "Scenario B: Low $\\alpha$ (0.1) and Low $\\gamma$ (0.1). 'The Cautious Gambler'.",
                                "Class reflects: 'Which agent will fail if the rewards are noisy (random)?' (Scenario A, because it reacts too strongly to one lucky event).",
                                "Conclusion: Parameters must be balanced together, not just set individually."
                            ],
                            inputs: "Parameter pairing scenarios",
                            outputs: "Risk/Reward assessment on the board",
                            rubrics: ["Correct interpretation of $\\alpha$ vs $\\gamma$ interaction", "Logical justification of failure cases", "Classroom participation"],
                            outcomes: "Students master the conceptual dependency between learning rate and discount factor.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Personality Draft",
                            objectives: "Experience the application of RL terms to biological and social archetypes.",
                            instructions: [
                                "Divide class into 4 teams. Provide a list of archetypes: {Chess Grandmaster, Squirrel, Wall Street Trader, Student during Finals}.",
                                "Group Task: Assign a numerical Alpha and Gamma to each archetype.",
                                "Constraint: Justify your choice. (e.g., 'A squirrel has High Alpha because if it sees a predator once, it must learn instantly or die').",
                                "Teams present their 'Agent Profiles' and debate why a Chess AI needs a higher Gamma than a Trading Bot."
                            ],
                            inputs: "Archetype list and parameter definitions",
                            outputs: "Numerical Profile Cards for each archetype",
                            rubrics: ["Logical alignment of math with behavior", "Creativity of justification", "Team coordination"],
                            outcomes: "Students generalize RL terms beyond code into general systems of behavior.",
                            time: "20 Mins",
                            materials: ["Chart paper", "Markers"]
                        },
                        {
                            level: 4,
                            title: "Personal Gamma Audit",
                            objectives: "Independently audit a personal life decision to identify your internal discount factor.",
                            instructions: [
                                "Task: Choose a recent major decision (e.g., Buying a gadget vs Saving money, Studying vs Gaming).",
                                "Audit: What was the 'Immediate Reward' ($r$)? What was the 'Future Value' ($V'$)?",
                                "Reflection: Solve for your 'Personal Gamma'. Did you pick the long-term path ($\\gamma \\to 1$) or the short-term one ($\\gamma \\to 0$)?",
                                "Analysis: If you had a 'Learning Rate' $\\alpha$ of 1.0, how would one bad grade change your entire career plan?",
                                "Propose: How can you 'tune' your own parameters to be a more optimal learner?"
                            ],
                            inputs: "Personal decision history",
                            outputs: "Individual Decision Parameter Report (1 page)",
                            rubrics: ["Correct use of RL terminology", "Introspective depth", "Originality"],
                            outcomes: "Students bridge the gap between classroom hyperparameters and human psychology.",
                            time: "15 Mins",
                            materials: ["Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: The Parameter Grid" 
                subtitle="Optimization via Search"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Hyperparameter Tuning</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            In professional RL engineering, we don't just pick one Alpha. We run 100 simulations with different Alpha/Gamma combinations (a **Grid Search**) to find which "personality" wins the most reward in a specific environment.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Settings size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Step 1</div>
                            <p className="text-[8px] mt-1">Set Alpha/Gamma</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center">
                            <Play size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Step 2</div>
                            <p className="text-[8px] mt-1">Train for 1000 Episodes</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-center text-emerald-600">
                            <CheckCircle2 size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-bold uppercase">Step 3</div>
                            <p className="text-[8px] mt-1">Deploy the Winner</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="Term Verification"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What happens if Gamma (\u03B3) is exactly 0?', a: 'The agent becomes completely "myopic" (shortsighted). It only cares about the immediate reward and ignores all future consequences.' },
                        { q: 'Why do we usually set Alpha (\u03B1) to a small value (e.g., 0.1)?', a: 'A small Alpha ensures that the agent\'s estimates change slowly and stably. If Alpha is too high, one lucky or unlucky experience can ruin the entire Q-table.' },
                        { q: 'What is the "TD Target" in the update rule?', a: 'The TD Target is the term [r + \u03B3 max Q(s\', a\')]. It represents the "new estimate" of what the action is worth.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Personality Sandbox" 
                subtitle="Tune the Robot"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Hyperparameter Tuner"
                    description="Observe the effect of α, γ, ε on learning"
                    objective="Adjust learning rate (α), discount factor (γ), and exploration rate (ε). Observe convergence speed and final policy quality."
                    badge="Interactive Lab"
                    tips={['High α = fast but unstable learning',
                'High γ = agent values long-term rewards more',
                'Decay ε to transition from exploration to exploitation']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Adjust the sliders for **Alpha** and **Gamma** to see how they change the "Personality" of the agent. Notice the tooltips that describe the behavior profile of each setting.
                    </p>
                    <TermSensitivityLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* MCQ KNOWLEDGE CHECK */}
            <SectionWrapper id="mcq" title="8. Knowledge Check" subtitle="10 Feedback-Based MCQs" icon={<HelpCircle className="text-purple-600" size={24} />} badge="MCQ Quiz" badgeColor="bg-purple-100 text-purple-700" accentColor="border-purple-500">
                {(() => {
                    const data = getTopicData('unit3', 'Topic9_QLearningTerms');
                    if (!data) return null;
                    return <FeedbackMCQ questions={data.mcqs} />;
                })()}
            </SectionWrapper>

            {/* RECAP & SKILL MAPPING */}
            {(() => {
                const data = getTopicData('unit3', 'Topic9_QLearningTerms');
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
                    <h3 className="text-3xl font-black italic">Terms & Notations: Mastered!</h3>
                    <p className="text-primary-100">
                        You've learned the variables of learning. Ready to see the step-by-step "Working" of the entire algorithm?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: WORKING OF Q-LEARNING
                    </button>
                </div>
            </div>
        </div>
    );
}
