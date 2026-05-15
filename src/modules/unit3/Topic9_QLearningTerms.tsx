import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import ActivityLevels from '../../components/topic/ActivityLevels';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    FileText, GitBranch, Target, Briefcase, Zap, Binary, Layers,
    Eye, ChevronRight, Play, RotateCcw, TrendingUp, Search, Brain,
    Dna, Settings, CheckCircle2
} from 'lucide-react';

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

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Notation Key" 
                subtitle="Cracking the Q-Learning Code"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="Q(s, a) \leftarrow Q(s, a) + \alpha \underbrace{[r + \gamma \max_{a'} Q(s', a') - Q(s, a)]}_{\text{TD Error}}"
                        label="The Q-Update Notation"
                        explanation="Breaking down every symbol in the learning rule."
                        interpretation="The equation is essentially: New = Old + Change. The TD Error is the 'Magnitude' of change needed."
                        motivation="By standardizing these symbols, researchers can apply Q-learning to robots, video games, and even financial markets using the same math."
                        terms={[
                            { term: 's, a', name: 'State/Action', meaning: 'The input situation and the output choice.', range: '\mathcal{S}, \mathcal{A}', example: 'Room #5, Go Left.' },
                            { term: 's\', a\'', name: 'Successor', meaning: 'The situation and choice at the next time step.', range: '\mathcal{S}, \mathcal{A}', example: 'The landing position.' },
                        ]}
                    />

                    <SymbolTable symbols={[
                        { symbol: '\\alpha', meaning: 'Learning Rate — weights new vs old knowledge.', unit: '0 to 1' },
                        { symbol: '\\gamma', meaning: 'Discount Factor — weights future vs immediate rewards.', unit: '0 to 1' },
                        { symbol: '\\epsilon', meaning: 'Exploration Rate — chance of taking a random action.', unit: '0 to 1' },
                    ]} />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Multi-Level Activities" 
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

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Parameter Grid" 
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

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
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
                title="6. Virtual Lab: Personality Sandbox" 
                subtitle="Tune the Robot"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Adjust the sliders for **Alpha** and **Gamma** to see how they change the "Personality" of the agent. Notice the tooltips that describe the behavior profile of each setting.
                    </p>
                    <TermSensitivityLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
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
