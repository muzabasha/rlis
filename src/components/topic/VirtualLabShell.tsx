import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Pause, RotateCcw, ChevronRight, Gauge, Settings2,
    Info, Download, TrendingUp, Cpu, X, BookOpen, Terminal, Trophy,
    FileSpreadsheet, Sparkles, CheckCircle, HelpCircle, Send, Award, Crown, CheckSquare, Presentation
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface LabTelemetry {
    label: string;
    value: string | number;
    unit?: string;
    color?: string;
    highlight?: boolean;
}

export interface LabChallenge {
    id: string;
    quest: string;
    target: string;
    isCompleted: boolean;
}

export interface NotebookEntry {
    task: string;
    question: string;
    hint?: string;
}

interface VirtualLabShellProps {
    title: string;
    description: string;
    objective: string;
    controls?: React.ReactNode;
    telemetry?: LabTelemetry[];
    children: React.ReactNode;
    onReset?: () => void;
    onStep?: () => void;
    onToggleRun?: () => void;
    isRunning?: boolean;
    speed?: number;
    onSpeedChange?: (v: number) => void;
    showStepBtn?: boolean;
    tips?: string[];
    badge?: string;
    
    // NEW EXPERIENTIAL PROPS
    challenges?: LabChallenge[];
    logs?: string[];
    notebook?: NotebookEntry[];
    onDownloadReport?: () => void;

    // NEP 2020 ALIGNMENT OVERRIDES
    co?: string;
    cognitiveLevel?: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';
}

// ─── NEP 2020 Course Outcome & Bloom's Taxonomy Dynamic Detector ───────────────
function detectUnitAndCO(title: string, customCO?: string, customLevel?: string) {
    if (customCO && customLevel) {
        return {
            unit: 0,
            co: customCO,
            coDesc: 'Accredited custom course outcome mapped to this module.',
            cognitiveLevel: customLevel
        };
    }

    const titleLower = title.toLowerCase();
    
    // Check Unit 4 Monte Carlo and Intelligent Systems
    if (
        titleLower.includes('monte carlo') || 
        titleLower.includes('glie') || 
        titleLower.includes('first-visit') || 
        titleLower.includes('turing') || 
        titleLower.includes('peas') || 
        titleLower.includes('reflex agent') ||
        titleLower.includes('agent architecture') || 
        titleLower.includes('complexity ladder') ||
        titleLower.includes('evolution timeline') ||
        titleLower.includes('smart system') ||
        titleLower.includes('rule engine') ||
        titleLower.includes('probability balancer')
    ) {
        return {
            unit: 4,
            co: 'CO5',
            coDesc: 'Evaluate and implement Monte Carlo sampling, prediction, and control strategies in episodic environments.',
            cognitiveLevel: 'Evaluate'
        };
    }
    
    // Check Unit 3 Bellman & Q-Learning
    if (
        titleLower.includes('q-learning') || 
        titleLower.includes('bellman') || 
        titleLower.includes('q-table') || 
        titleLower.includes('policy sampler') || 
        titleLower.includes('robot command') || 
        titleLower.includes('backup tree') || 
        titleLower.includes('tuner') || 
        titleLower.includes('td error') || 
        titleLower.includes('gambler') ||
        titleLower.includes('case study')
    ) {
        return {
            unit: 3,
            co: 'CO4',
            coDesc: 'Analyze and formulate temporal difference and tabular Q-learning frameworks for optimal control.',
            cognitiveLevel: 'Apply'
        };
    }
    
    // Check Unit 2 MDPs & Markov Chains
    if (
        titleLower.includes('mdp') || 
        titleLower.includes('markov') || 
        titleLower.includes('transition matrix') || 
        titleLower.includes('steady state') || 
        titleLower.includes('pagerank') || 
        titleLower.includes('return calculator') || 
        titleLower.includes('mrp') || 
        titleLower.includes('value function') || 
        titleLower.includes('policy optimizer') ||
        titleLower.includes('gridworld')
    ) {
        return {
            unit: 2,
            co: 'CO3',
            coDesc: 'Model and solve sequential decision problems under uncertainty using Markov Decision Processes.',
            cognitiveLevel: 'Analyze'
        };
    }
    
    // Unit 1 (Default or early topics)
    return {
        unit: 1,
        co: 'CO1',
        coDesc: 'Understand fundamental Reinforcement Learning paradigms and balance the exploration-exploitation trade-off.',
        cognitiveLevel: 'Understand'
    };
}

function getDiscussionPoints(title: string): string[] {
    const titleLower = title.toLowerCase();
    const genericPoints = [
        `How does the fundamental mathematical formulation of "${title}" differ when applied to continuous action spaces versus discrete state representations? Let's analyze the curse of dimensionality.`,
        `Under what environmental conditions (stochastic, deterministic, partially observable) does "${title}" experience the highest variance in convergence rates? Debate the stability trade-offs.`,
        `How does changing the exploration rate (e.g., epsilon or temperature parameters) affect the propagation of value updates in "${title}"? Invite students to map the trajectory propagation.`,
        `Discuss how the Markov property is preserved or violated when designing the state spaces for "${title}" in real-world engineering systems.`,
        `What are the computational and memory complexity bounds when scaling "${title}" to multi-agent cooperative environments? Contrast centralized training vs decentralized execution.`,
        `Analyze the reward function structure for "${title}". How does reward shaping impact the agent's behavior, and what are the risks of reward hacking or sub-optimal loop convergence?`,
        `How does the discount factor (gamma) influence the convergence and horizon planning under "${title}"? Debate the consequences of setting gamma to 0 vs 0.999.`,
        `Compare the sample efficiency of "${title}" against purely supervised deep learning baselines in highly non-stationary environments.`,
        `What diagnostic metrics (e.g., temporal difference error, value function bellman residual) should be monitored on our telemetry dashboard to verify correct learning convergence in "${title}"?`,
        `How do human cognitive learning patterns (like Thorndike's Law of Effect or operant conditioning) align with the mathematical updates of "${title}"? Discuss biological plausibility.`
    ];

    if (titleLower.includes('root') || titleLower.includes('history') || titleLower.includes('origins')) {
        return [
            "How does Thorndike's biological Law of Effect map directly to modern Bellman update equations? Compare animal stimulus-response to Q-tables.",
            "Compare classical conditioning (Pavlovian reflex) with operant conditioning (instrumental learning) in terms of computational reinforcement pathways.",
            "Why was Arthur Samuel's self-play checkers program (1959) considered the ancestor of modern Deep RL self-play (e.g., AlphaGo)? Let's analyze value approximations.",
            "What are the mathematical limitations of early trial-and-error learning algorithms prior to Bellman's Dynamic Programming formalization?",
            "How does the concept of temporal difference learning draw inspiration from biological reward prediction errors in dopamine neurons?",
            "In early roots, why did research transition from tabular behavior mappings to functional state evaluation in checkers?",
            "Analyze the transition from early heuristic game search engines to learning-based search trees. What was the core conceptual breakthrough?",
            "Why is reward-biased reinforcement computationally superior to pure brute-force state search in high-dimensional puzzles?",
            "Debate how biological constraints (e.g., fatigue, sensory limits) in animal puzzle boxes correspond to hardware limits in simulated RL.",
            "How does the convergence of animal learning speed (exponential escape decay) mirror the mathematical convergence of modern loss functions?"
        ];
    }

    if (titleLower.includes('exploration') || titleLower.includes('exploitation') || titleLower.includes('bandit') || titleLower.includes('trade-off')) {
        return [
            "What is the mathematical formulation of the Exploration-Exploitation trade-off in Multi-Armed Bandits? Discuss the regret bounds.",
            "Compare Epsilon-Greedy, UCB1 (Upper Confidence Bound), and Thompson Sampling. Which offers the tightest theoretical regret guarantees?",
            "How does non-stationarity in the environment's reward distribution break UCB1, and how can we modify it (e.g., sliding-window UCB)?",
            "Discuss the concept of 'optimism in the face of uncertainty'. Why is this a mathematically sound heuristic for exploration?",
            "How does Thompson Sampling leverage Bayesian posteriors to balance exploration? Let's discuss conjugate priors.",
            "What are the computational costs of tracking action-value uncertainty in UCB vs simple heuristic epsilon-decay?",
            "Analyze the effect of the temperature parameter in Softmax (Boltzmann) exploration. How does it smoothly transition from exploration to exploitation?",
            "In deep RL, how do we encourage exploration without manual epsilon-decay? Discuss entropy regularization in policy gradients.",
            "What is 'deep exploration' (learning policies to explore multi-step trajectories) versus 'shallow exploration' (dithering actions)?",
            "Debate a real-world scenario (e.g., clinical trials or ad placements) where excessive exploration has severe ethical or financial penalties."
        ];
    }

    if (titleLower.includes('markov') || titleLower.includes('mdp') || titleLower.includes('mrp') || titleLower.includes('decision process')) {
        return [
            "Define the Markov Property formally. What does it mean for 'the future to be independent of the past, given the present'?",
            "How does partially observable state space (POMDP) break the standard Bellman equations, and how do belief states restore the Markov property?",
            "Contrast a Markov Chain, a Markov Reward Process (MRP), and a Markov Decision Process (MDP). Draw their state transition equations.",
            "How does the state transition probability tensor P(s'|s,a) capture stochasticity in MDPs? Debate model-based vs model-free assumptions.",
            "Discuss the Bellman expectation equations for MRPs. How do they express the state value as a linear system of equations?",
            "When solving an MRP, when is direct matrix inversion (analytical solution) computationally viable, and when must we use iterative methods?",
            "How does the addition of an action space (A) transform an MRP into an MDP? Discuss the policy concept π(a|s).",
            "What is the mathematical definition of a 'stationary policy'? Why is it sufficient to search only for stationary optimal policies in MDPs?",
            "How does reward shaping alter the optimal policy in an MDP? Let's discuss Ng's potential-based reward shaping theorem.",
            "Can we model human life decisions as an MDP? Discuss states, actions, transitions, and the limits of the reward hypothesis."
        ];
    }

    if (titleLower.includes('bellman') || titleLower.includes('value function') || titleLower.includes('optim')) {
        return [
            "Derive the Bellman Expectation Equation for V(s) and Q(s,a). How do they relate to each other?",
            "What is the core difference between the Bellman Expectation Equation and the Bellman Optimality Equation?",
            "Why is the Bellman Optimality Equation non-linear, and how does this non-linearity prevent direct analytical solutions?",
            "Explain the concept of 'bootstrapping' in Bellman equations. How does it enable an agent to update estimates using other estimates?",
            "Under what conditions is the Bellman operator guaranteed to be a contraction mapping (Banach Fixed-Point Theorem)? Discuss the role of gamma.",
            "How does Value Iteration directly leverage the Bellman Optimality operator to converge to the optimal value function V*(s)?",
            "Contrast Policy Evaluation and Policy Improvement. How does Policy Iteration alternate between these two to find π*(s)?",
            "What is the computational complexity per iteration of Policy Iteration versus Value Iteration in large discrete MDPs?",
            "How do we represent value functions when the state space is infinite (e.g., continuous)? Discuss parametric function approximation.",
            "Debate: Does a universal optimal value function V*(s) exist for all cooperative multi-agent environments?"
        ];
    }

    if (titleLower.includes('q-learning') || titleLower.includes('q-table') || titleLower.includes('sarsa') || titleLower.includes('temporal difference')) {
        return [
            "Explain the difference between On-Policy learning (SARSA) and Off-Policy learning (Q-learning). How does the target policy differ?",
            "Write down the temporal difference (TD) target for SARSA and Q-learning. Highlight the action selection step.",
            "Why is Q-learning susceptible to overestimation bias? Explain how Double Q-learning resolves this by decoupling action selection and evaluation.",
            "How does the TD error, δ_t = R_{t+1} + γ max Q(S_{t+1}, a) - Q(S_t, A_t), serve as a learning signal? Compare it to the Bellman residual.",
            "Under what conditions are tabular Q-learning and SARSA guaranteed to converge mathematically to the optimal Q*(s,a)?",
            "Why does SARSA learn a safer policy than Q-learning in environments with dangerous states (e.g., the Cliff Walking environment)?",
            "What is the difference between TD(0) (one-step prediction) and TD(lambda) (using eligibility traces)? Discuss the bias-variance trade-off.",
            "How do we initialize Q-tables, and how does optimistic initialization encourage systematic exploration early in training?",
            "What happens when the Q-table grows too large to fit in memory (curse of dimensionality)? Introduce Deep Q-Networks (DQN).",
            "Debate how eligibility traces in TD learning map to biological synaptic plasticity and eligibility in biological brains."
        ];
    }

    if (titleLower.includes('monte carlo') || titleLower.includes('sampling')) {
        return [
            "What makes Monte Carlo (MC) methods 'model-free'? How do they learn optimal policies without knowing transition probabilities P(s'|s,a)?",
            "Contrast First-Visit Monte Carlo and Every-Visit Monte Carlo prediction. Which is unbiased, and which has lower mean-squared error?",
            "Why does Monte Carlo learning suffer from high variance compared to Temporal Difference (TD) learning? Explain using sample trajectory returns.",
            "Why must Monte Carlo methods wait until the absolute end of an episode to perform value updates? Discuss the impact on online learning.",
            "What is the 'exploring starts' assumption in Monte Carlo control? Why is it mathematically necessary, and how does ε-greedy relax it?",
            "Explain Off-Policy Monte Carlo control. How does Importance Sampling allow us to learn from a behavior policy different from the target policy?",
            "Contrast ordinary importance sampling and weighted importance sampling in terms of bias, variance, and convergence limits.",
            "Explain the GLIE property (Greedy in the Limit with Infinite Exploration). What are the requirements on exploration rates over time?",
            "Under what environment types is Monte Carlo learning computationally superior to Dynamic Programming?",
            "How do we apply Monte Carlo methods to non-episodic, infinite-horizon tasks without infinite delay?"
        ];
    }

    if (titleLower.includes('agent') || titleLower.includes('architecture') || titleLower.includes('peas') || titleLower.includes('turing')) {
        return [
            "What is the PEAS framework for AI agent design? Define Performance Measure, Environment, Actuators, and Sensors with examples.",
            "Contrast a Simple Reflex Agent, a Model-Based Reflex Agent, a Goal-Based Agent, and a Utility-Based Agent in terms of internal state and decision loops.",
            "Discuss the Turing Test. What are its technological and philosophical limitations as a metric for intelligent systems?",
            "What makes a system 'intelligent' versus a standard automated rule-based system? Debate the boundaries of autonomy.",
            "Explain the difference between episodic and sequential environments, and how it alters the complexity of the agent's architecture.",
            "Analyze the role of a learning element and a critic inside a general learning agent architecture as described by Russell & Norvig.",
            "How does physical symbol systems hypothesis relate to the symbol grounding problem in modern neural AI agents?",
            "What are the engineering challenges in deploying physical actuators vs virtual software actuators in real-time control loops?",
            "Explain the 'complexity ladder' of agent architectures. How does deep RL serve as a bridge between simple reflex and high-level goal reasoning?",
            "Debate the ethical and societal implications of autonomous utility-maximizing agents in public safety and infrastructure."
        ];
    }

    return genericPoints;
}

export default function VirtualLabShell({
    title, description, objective, controls, telemetry = [],
    children, onReset, onStep, onToggleRun, isRunning = false,
    speed = 1, onSpeedChange, showStepBtn = true, tips = [], badge,
    challenges = [], logs = [], notebook = [], onDownloadReport,
    co, cognitiveLevel
}: VirtualLabShellProps) {
    const storageKey = `rlis_lab_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const detectedCO = detectUnitAndCO(title, co, cognitiveLevel);
    const { projectorMode, toggleProjectorMode } = useApp();

    const [activeTab, setActiveTab] = useState<'simulation' | 'notebook' | 'terminal' | 'quests' | 'discussion'>('simulation');
    const [showTips, setShowTips] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    
    // ─── Persistent States ───────────────────────────────────────────────────
    const [answers, setAnswers] = useState<Record<number, string>>(() => {
        try {
            const saved = localStorage.getItem(`${storageKey}_answers`);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    const [validated, setValidated] = useState<Record<number, boolean>>(() => {
        try {
            const saved = localStorage.getItem(`${storageKey}_validated`);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    const [localChallenges, setLocalChallenges] = useState<LabChallenge[]>(() => {
        try {
            const saved = localStorage.getItem(`${storageKey}_challenges`);
            if (saved) {
                const parsed = JSON.parse(saved) as LabChallenge[];
                // Merge loaded state with current props to ensure compatibility
                return challenges.map(c => {
                    const found = parsed.find(p => p.id === c.id);
                    return found ? { ...c, isCompleted: found.isCompleted } : c;
                });
            }
        } catch {}
        return challenges;
    });

    const [localLogs, setLocalLogs] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem(`${storageKey}_logs`);
            if (saved) return JSON.parse(saved);
        } catch {}
        return logs.length > 0 ? logs : [
            `🤖 [System] Initializing ${title} Experiential Simulator...`,
            `📡 [Telemetry] Connecting active variables... Connected.`,
            `💡 [Pedagogy] Mapped to NEP 2020 Syllabus Alignment: ${detectedCO.co}. Ready for student interaction.`
        ];
    });

    const consoleEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom of terminal
    useEffect(() => {
        if (activeTab === 'terminal' && consoleEndRef.current) {
            consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [localLogs, activeTab]);

    // Sync parent logs if they update
    useEffect(() => {
        if (logs && logs.length > 0) {
            setLocalLogs(prev => {
                const uniqueNewLogs = logs.filter(l => !prev.includes(l));
                if (uniqueNewLogs.length === 0) return prev;
                const updated = [...prev, ...uniqueNewLogs].slice(-100);
                localStorage.setItem(`${storageKey}_logs`, JSON.stringify(updated));
                return updated;
            });
        }
    }, [logs, storageKey]);

    // ─── Helper Functions ────────────────────────────────────────────────────
    const addLog = useCallback((msg: string) => {
        const timestamp = new Date().toLocaleTimeString();
        const formattedMsg = `[${timestamp}] ${msg}`;
        setLocalLogs(prev => {
            const updated = [...prev, formattedMsg].slice(-100);
            localStorage.setItem(`${storageKey}_logs`, JSON.stringify(updated));
            return updated;
        });
    }, [storageKey]);

    const completeChallenge = useCallback((id: string) => {
        setLocalChallenges(prev => {
            if (prev.some(c => c.id === id && c.isCompleted)) return prev;
            
            const updated = prev.map(c => c.id === id ? { ...c, isCompleted: true } : c);
            localStorage.setItem(`${storageKey}_challenges`, JSON.stringify(updated));
            
            const challenge = prev.find(c => c.id === id);
            if (challenge) {
                addLog(`🏆 [Quest Unlocked] "${challenge.quest}" achievement completed!`);
            }
            
            return updated;
        });
    }, [storageKey, addLog]);

    // ─── Interactive lifecycle hooks ──────────────────────────────────────────
    const handleToggleProjector = () => {
        toggleProjectorMode();
        addLog(!projectorMode
            ? "📺 [Projector Mode Enabled] Text scaling increased to 125%, contrast heightened, and borders thickened globally for classroom projection." 
            : "📺 [Projector Mode Disabled] Restored default layout scale."
        );
    };

    const handleToggleRun = () => {
        if (onToggleRun) {
            onToggleRun();
            addLog(isRunning ? "⏸️ Simulation paused by student." : "▶️ Simulation running in live execution loop.");
            completeChallenge("concept_explore");
        }
    };

    const handleStep = () => {
        if (onStep) {
            onStep();
            addLog("⏭️ Executed single step telemetry transition.");
            completeChallenge("concept_explore");
        }
    };

    const handleSpeedChange = (newSpeed: number) => {
        if (onSpeedChange) {
            onSpeedChange(newSpeed);
            addLog(`⚡ Adjusted simulation execution frequency to ${newSpeed}x speed.`);
            completeChallenge("concept_explore");
        }
    };

    const handleReset = () => {
        if (onReset) {
            onReset();
            addLog("🔄 Resetting simulation state parameters...");
        } else {
            addLog("🔄 Resetting simulation state parameters...");
        }
        // Reset local states too
        setAnswers({});
        setValidated({});
        setLocalChallenges(challenges.map(c => ({ ...c, isCompleted: false })));
        setLocalLogs([
            `🤖 [System] Simulation state cleared. Re-initializing...`,
            `📡 [Telemetry] Re-connecting variables... Connected.`,
            `💡 [Pedagogy] Mapped to NEP 2020 Syllabus Alignment: ${detectedCO.co}. Ready for student interaction.`
        ]);
        
        localStorage.removeItem(`${storageKey}_answers`);
        localStorage.removeItem(`${storageKey}_validated`);
        localStorage.removeItem(`${storageKey}_challenges`);
        localStorage.removeItem(`${storageKey}_logs`);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = { ...answers, [index]: value };
        setAnswers(newAnswers);
        localStorage.setItem(`${storageKey}_answers`, JSON.stringify(newAnswers));
    };

    const handleValidate = (index: number) => {
        if (!answers[index]?.trim()) return;
        
        const newValidated = { ...validated, [index]: true };
        setValidated(newValidated);
        localStorage.setItem(`${storageKey}_validated`, JSON.stringify(newValidated));
        
        addLog(`📝 Recorded observation response & validated Task ${index + 1}.`);

        // Check if ALL questions are now validated
        const allCompleted = notebook.length > 0 && notebook.every((_, i) => newValidated[i]);
        if (allCompleted) {
            completeChallenge("worksheet_complete");
        }
    };

    const triggerReportDownload = (format: 'txt' | 'json' = 'txt') => {
        if (onDownloadReport) {
            onDownloadReport();
            return;
        }

        const reportData = {
            labTitle: title,
            date: new Date().toLocaleString(),
            objective,
            telemetry: telemetry.map(t => ({ label: t.label, value: t.value, unit: t.unit })),
            worksheet: notebook.map((n, i) => ({
                task: n.task,
                question: n.question,
                answer: answers[i] || 'No response recorded.',
                validated: !!validated[i]
            })),
            quests: localChallenges.map(c => ({
                quest: c.quest,
                target: c.target,
                isCompleted: c.isCompleted
            })),
            nepAlignment: {
                co: detectedCO.co,
                description: detectedCO.coDesc,
                cognitiveLevel: detectedCO.cognitiveLevel
            }
        };

        if (format === 'json') {
            const blob = new Blob([JSON.stringify(reportData, null, 4)], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_lab_report.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            addLog("📥 Exported Lab Report in JSON format.");
            return;
        }

        // Default export lab report in TXT format
        const reportContent = `
=========================================
🔬 VIRTUAL LAB REPORT: ${title.toUpperCase()}
=========================================
Date: ${new Date().toLocaleString()}
Objective: ${objective}

-----------------------------------------
🎓 NEP 2020 COMPETENCY MAPPING
-----------------------------------------
Course Outcome (CO): ${detectedCO.co} - ${detectedCO.coDesc}
Bloom's Cognitive Level: ${detectedCO.cognitiveLevel}
Accreditation: NEP 2020 Experiential & Competency Mapped

-----------------------------------------
📊 EXPERIMENT TELEMETRY
-----------------------------------------
${telemetry.map(t => `${t.label}: ${t.value} ${t.unit || ''}`).join('\n')}

-----------------------------------------
📓 GUIDED WORKSHEET ANSWERS
-----------------------------------------
${notebook.length > 0 ? notebook.map((n, i) => `
Task ${i + 1}: ${n.task}
Question: ${n.question}
Student Observation: ${answers[i] || 'No response recorded.'}
Validated: ${validated[i] ? 'Yes' : 'No'}
`).join('\n') : 'No guided notebook was configured for this lab.'}

-----------------------------------------
🏆 CHALLENGES COMPLETED
-----------------------------------------
${localChallenges.length > 0 ? localChallenges.map(c => `[${c.isCompleted ? '✓' : ' '}] ${c.quest} (${c.target})`).join('\n') : 'No challenges configured.'}

=========================================
Generated by RLIS Experiential Learning platform.
=========================================
        `.trim();

        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_lab_report.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addLog("📥 Exported Lab Report in TXT format.");
    };

    // Calculate quest progress
    const completedQuests = localChallenges.filter(c => c.isCompleted).length;
    const totalQuests = localChallenges.length;
    const progressPercent = totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

    return (
        <div className={`rounded-3xl border-2 transition-all shadow-2xl overflow-hidden ${
            projectorMode 
                ? 'projector-mode border-cyan-500 bg-white dark:bg-slate-950 shadow-cyan-500/10' 
                : 'border-cyan-200 dark:border-cyan-900/50 bg-gradient-to-br from-slate-50 to-slate-100/90 dark:from-slate-900 dark:to-slate-950'
        }`}>
            
            {/* Lab Header Bar */}
            <div className="bg-slate-950 px-6 py-4 flex items-center justify-between gap-4 flex-wrap border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-lg shadow-rose-500/20" />
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/20" />
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white font-black text-sm tracking-wide flex items-center gap-1.5">
                                <Sparkles size={16} className="text-cyan-400" />
                                {title}
                            </span>
                            {badge && (
                                <span className="px-2.5 py-0.5 text-[8px] font-black bg-cyan-500/10 text-cyan-400 rounded-full uppercase tracking-widest border border-cyan-500/30">
                                    {badge}
                                </span>
                            )}
                            <span className="px-2 py-0.5 text-[8px] font-bold bg-slate-900 text-slate-500 rounded-full flex items-center gap-1 border border-slate-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Portfolio Saved
                            </span>
                        </div>
                        <span className="text-slate-400 text-[10px] font-medium">{description}</span>
                    </div>
                </div>

                {/* Header Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleToggleProjector}
                        className={`p-2 px-3.5 rounded-xl transition-all border flex items-center gap-2 text-[10px] font-black uppercase tracking-wider ${
                            projectorMode 
                                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/30 animate-pulse' 
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-cyan-400'
                        }`}
                        title="Toggle Projector Mode (High Visibility for Last Bench Students)"
                    >
                        <Presentation size={14} />
                        <span>Projector Mode</span>
                    </button>
                    
                    {tips.length > 0 && (
                        <button
                            onClick={() => setShowTips(t => !t)}
                            className={`p-2.5 rounded-xl transition-all border ${showTips ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-400'}`}
                            title="Lab Tips"
                        >
                            <Info size={14} />
                        </button>
                    )}
                    {onSpeedChange && (
                        <button
                            onClick={() => setShowSettings(s => !s)}
                            className={`p-2.5 rounded-xl transition-all border ${showSettings ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-indigo-400'}`}
                            title="Settings"
                        >
                            <Settings2 size={14} />
                        </button>
                    )}
                    
                    {/* Export button group */}
                    <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                        <span className="pl-3 pr-1 text-slate-500 text-[9px] font-black uppercase tracking-wider hidden md:inline">Export</span>
                        <button
                            onClick={() => triggerReportDownload('txt')}
                            className="p-2 px-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-[10px] font-black uppercase tracking-wider border-r border-slate-800"
                            title="Download TXT Report"
                        >
                            TXT
                        </button>
                        <button
                            onClick={() => triggerReportDownload('json')}
                            className="p-2 px-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-[10px] font-black uppercase tracking-wider"
                            title="Download JSON Report"
                        >
                            JSON
                        </button>
                    </div>

                    {onReset && (
                        <button
                            onClick={handleReset}
                            className="p-2.5 bg-slate-900 text-slate-400 border border-slate-800 rounded-xl hover:text-rose-400 hover:border-rose-500/30 transition-all"
                            title="Reset Lab"
                        >
                            <RotateCcw size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-950/80 backdrop-blur-md px-6 py-2 border-b border-slate-900/50 gap-2 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('simulation')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${activeTab === 'simulation' ? 'bg-slate-800 text-cyan-400 shadow-md border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-900'}`}
                >
                    <Cpu size={14} />
                    Simulation Sandbox
                </button>
                <button
                    onClick={() => setActiveTab('notebook')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${activeTab === 'notebook' ? 'bg-slate-800 text-cyan-400 shadow-md border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-900'}`}
                >
                    <BookOpen size={14} />
                    Guided Notebook
                    {notebook.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 font-black rounded-full flex items-center justify-center text-[8px]">
                            {notebook.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${activeTab === 'terminal' ? 'bg-slate-800 text-cyan-400 shadow-md border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-900'}`}
                >
                    <Terminal size={14} />
                    Lab Console
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </button>
                <button
                    onClick={() => setActiveTab('quests')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${activeTab === 'quests' ? 'bg-slate-800 text-cyan-400 shadow-md border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-900'}`}
                >
                    <Trophy size={14} />
                    Quest Board
                    {totalQuests > 0 && (
                        <span className="px-1.5 py-0.5 text-[8px] bg-amber-500 text-slate-950 font-black rounded-full leading-none">
                            {completedQuests}/{totalQuests}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('discussion')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${activeTab === 'discussion' ? 'bg-slate-800 text-cyan-400 shadow-md border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-900'}`}
                >
                    <Presentation size={14} />
                    Class Discussion
                    <span className="px-1.5 py-0.5 text-[8px] bg-indigo-500 text-white font-black rounded-full leading-none animate-pulse">
                        10 Pts
                    </span>
                </button>
            </div>

            {/* Tips Panel */}
            <AnimatePresence>
                {showTips && tips.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/30 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex items-start gap-3">
                            <Info size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                            <div className="space-y-1">
                                <p className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest">Lab Tips & Observations</p>
                                <ul className="space-y-1">
                                    {tips.map((tip, i) => (
                                        <li key={i} className="text-xs text-amber-700 dark:text-amber-400 flex gap-2">
                                            <span className="text-amber-500 font-bold">→</span> {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => setShowTips(false)} className="ml-auto p-1 text-amber-400 hover:text-amber-600 rounded-lg">
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && onSpeedChange && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-indigo-50 dark:bg-indigo-950/20 border-b border-indigo-100 dark:border-indigo-900/30 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex items-center gap-6 flex-wrap">
                            <div className="flex items-center gap-3">
                                <Gauge size={16} className="text-indigo-500" />
                                <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300">Simulation Speed</span>
                                <input
                                    type="range" min={0.5} max={5} step={0.5} value={speed}
                                    onChange={e => handleSpeedChange(parseFloat(e.target.value))}
                                    className="w-28 accent-indigo-600"
                                />
                                <span className="text-xs font-black text-indigo-600 w-8">{speed}×</span>
                            </div>
                            {controls}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Objective Banner */}
            <div className="px-6 py-3.5 bg-cyan-900/5 dark:bg-cyan-950/20 border-b border-cyan-100 dark:border-cyan-950/30">
                <div className="flex items-center gap-2.5">
                    <TrendingUp size={14} className="text-cyan-500 flex-shrink-0" />
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        <span className="font-black text-cyan-700 dark:text-cyan-400 uppercase tracking-wider text-[10px] mr-1.5">Objective</span>
                        {objective}
                    </p>
                </div>
            </div>

            {/* Main Tabs Canvas Area */}
            <div className="p-6">
                <AnimatePresence mode="wait">
                    {activeTab === 'simulation' && (
                        <motion.div
                            key="simulation"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {children}
                        </motion.div>
                    )}

                    {activeTab === 'notebook' && (
                        <motion.div
                            key="notebook"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="text-cyan-500" size={18} />
                                    <h4 className="font-bold text-slate-800 dark:text-white">Guided Experiment Workbook</h4>
                                </div>
                                <span className="px-2.5 py-0.5 text-[9px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full flex items-center gap-1">
                                    <CheckSquare size={10} /> Active Portfolio Worksheet
                                </span>
                            </div>
                            
                            {notebook.length > 0 ? (
                                <div className="space-y-4">
                                    {notebook.map((entry, index) => (
                                        <div key={index} className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 shadow-sm space-y-4">
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="space-y-1">
                                                    <span className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 text-[10px] font-black rounded-lg uppercase tracking-wider">
                                                        Task {index + 1}
                                                    </span>
                                                    <p className="text-xs font-black text-slate-850 dark:text-slate-200">{entry.task}</p>
                                                </div>
                                                {validated[index] && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                                                        <CheckCircle size={14} />
                                                        Validated
                                                    </span>
                                                )}
                                            </div>

                                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80">
                                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium italic">
                                                    ❓ <span className="font-bold text-cyan-600 dark:text-cyan-400">Observation Question: </span>{entry.question}
                                                </p>
                                            </div>

                                            {entry.hint && (
                                                <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-bold">
                                                    <HelpCircle size={12} />
                                                    <span>Hint: {entry.hint}</span>
                                                </div>
                                            )}

                                            <div className="flex gap-2">
                                                <textarea
                                                    disabled={validated[index]}
                                                    value={answers[index] || ''}
                                                    onChange={e => handleAnswerChange(index, e.target.value)}
                                                    placeholder="Record your observations here based on the simulation run..."
                                                    className="flex-1 p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 disabled:opacity-60 resize-none h-20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600"
                                                />
                                                <button
                                                    disabled={validated[index] || !answers[index]?.trim()}
                                                    onClick={() => handleValidate(index)}
                                                    className="self-end px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-xl font-black text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 active:scale-95 shadow-md shadow-cyan-500/15"
                                                >
                                                    <Send size={12} />
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                                    <BookOpen size={36} className="mx-auto text-slate-350 dark:text-slate-655" />
                                    <p className="text-xs text-slate-550 dark:text-slate-450 font-bold">No guided exercises configured for this lab.</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'terminal' && (
                        <motion.div
                            key="terminal"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                    <Terminal className="text-cyan-500" size={18} />
                                    <h4 className="font-bold text-slate-850 dark:text-white">Lab Console Log</h4>
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest animate-pulse">● Live Telemetry Stream</span>
                            </div>

                            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs text-cyan-400 overflow-y-auto h-72 space-y-2 shadow-inner">
                                {localLogs.length > 0 ? (
                                    localLogs.map((log, i) => (
                                        <div key={i} className="flex gap-2 items-start hover:bg-slate-900/50 py-0.5 px-1 rounded transition-colors">
                                            <span className="text-slate-600 select-none">[{i + 1}]</span>
                                            <span className="text-slate-400 select-none">&gt;</span>
                                            <span className="leading-relaxed whitespace-pre-wrap text-cyan-300">{log}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-slate-500 text-center py-20 flex flex-col items-center justify-center gap-2">
                                        <Terminal size={24} className="animate-pulse" />
                                        <span>Console is empty. Start the simulation to stream logs...</span>
                                    </div>
                                )}
                                <div ref={consoleEndRef} />
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'quests' && (
                        <motion.div
                            key="quests"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <Trophy className="text-amber-500" size={18} />
                                    <h4 className="font-bold text-slate-850 dark:text-white">Active Achievements & Quests</h4>
                                </div>
                                <span className="text-xs font-black text-amber-500 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full">🏆 {completedQuests} / {totalQuests} Complete</span>
                            </div>

                            {totalQuests > 0 && (
                                <div className="space-y-2 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500">
                                        <span>Accreditation Completion Progress</span>
                                        <span>{progressPercent.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-350/20">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-amber-400 to-yellow-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercent}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* NEP 2020 Competency Mapping Card */}
                            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/90 to-slate-950/95 border border-indigo-500/20 shadow-xl space-y-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <Award size={18} />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-black text-white uppercase tracking-wider">NEP 2020 Competency Accreditation</h5>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Module Fully Mapped & Certified
                                        </p>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4 pt-3 border-t border-indigo-500/10">
                                    <div className="space-y-1">
                                        <span className="text-[9px] text-slate-500 font-black uppercase">Course Outcome</span>
                                        <div>
                                            <span className="px-2.5 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 rounded-md text-[10px] font-black uppercase tracking-wider block w-fit">
                                                {detectedCO.co}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-1 sm:col-span-2">
                                        <span className="text-[9px] text-slate-500 font-black uppercase">Outcome Target Description</span>
                                        <p className="text-[11px] font-semibold text-slate-300 leading-normal">{detectedCO.coDesc}</p>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4 pt-3 border-t border-indigo-500/10">
                                    <div className="space-y-1">
                                        <span className="text-[9px] text-slate-500 font-black uppercase">Cognitive Domain</span>
                                        <span className="px-2.5 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded-md text-[10px] font-black uppercase tracking-wider block w-fit">
                                            {detectedCO.cognitiveLevel}
                                        </span>
                                    </div>
                                    <div className="space-y-1 sm:col-span-2">
                                        <span className="text-[9px] text-slate-500 font-black uppercase">NEP 2020 Pedagogy Standard</span>
                                        <p className="text-[11px] font-semibold text-slate-350 leading-normal">
                                            Experiential Sandbox with active telemetry, logs, and self-guided workspace.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {localChallenges.length > 0 ? (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {localChallenges.map((c) => (
                                        <div
                                            key={c.id}
                                            className={`p-5 rounded-2xl border transition-all flex items-start gap-4 shadow-sm ${c.isCompleted ? 'bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-300/40 dark:border-emerald-900/30' : 'bg-white dark:bg-slate-850 border-slate-200/50 dark:border-slate-800'}`}
                                        >
                                            <div className={`p-2.5 rounded-xl ${c.isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                                <Trophy size={18} className={c.isCompleted ? 'animate-bounce' : ''} />
                                            </div>
                                            <div className="space-y-1">
                                                <h5 className={`text-xs font-black ${c.isCompleted ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>{c.quest}</h5>
                                                <span className="text-[10px] text-slate-400 font-bold block">Target: {c.target}</span>
                                            </div>
                                            {c.isCompleted && (
                                                <span className="ml-auto px-2 py-0.5 bg-emerald-500 text-slate-950 text-[9px] font-black rounded-lg uppercase tracking-wider flex items-center gap-0.5">
                                                    <CheckCircle size={10} />
                                                    Unlocked
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white dark:bg-slate-850 rounded-3xl border border-slate-200/50 dark:border-slate-800 space-y-3">
                                    <Trophy size={36} className="mx-auto text-slate-300" />
                                    <p className="text-xs text-slate-550 font-bold">No quests configured for this lab.</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'discussion' && (
                        <motion.div
                            key="discussion"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <Presentation className="text-indigo-500" size={18} />
                                    <h4 className="font-bold text-slate-850 dark:text-white">Classroom Discussion Board</h4>
                                </div>
                                <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    10 Core Debate Points
                                </span>
                            </div>

                            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900/50 dark:to-slate-900/30 border border-indigo-100 dark:border-indigo-950/30 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-2xl">
                                        🎓
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">Interactive Classroom Handling Guide</h5>
                                        <p className="text-xs font-semibold text-slate-650 dark:text-slate-400 leading-normal text-balance">
                                            Teachers, project this screen in class to initiate dynamic brainstorming! Invite students to argue their standpoints on these 10 rigorous architectural and mathematical challenges. Encourage active questioning, peer debate, and real-world system design mapping.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 10 Technical Discussion Points List */}
                            <div className="grid gap-4 sm:grid-cols-1">
                                {getDiscussionPoints(title).map((point, index) => (
                                    <div
                                        key={index}
                                        className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-900/40 transition-all flex gap-4 items-start shadow-sm"
                                    >
                                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 text-xs font-black">
                                            {index + 1}
                                        </span>
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                                                {point}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-[8px] font-black text-indigo-650 dark:text-indigo-400 uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                Interactive Debate Trigger
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Telemetry Bar */}
            {telemetry.length > 0 && (
                <div className="px-6 py-4 bg-slate-950 border-t border-slate-900 flex gap-6 flex-wrap items-center">
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <Cpu size={12} className="text-cyan-400 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Telemetry</span>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        {telemetry.map((t, i) => {
                            const numValue = typeof t.value === 'number' ? t.value : parseFloat(String(t.value));
                            const isNumeric = !isNaN(numValue) && isFinite(numValue);
                            
                            return (
                                <div key={i} className="flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-900 rounded-xl border border-slate-800 shadow-inner">
                                    <span className="text-[10px] text-slate-500 font-bold">{t.label}:</span>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-xs font-black font-mono tracking-wide ${t.highlight ? 'text-emerald-400' : t.color || 'text-slate-100'}`}
                                        >
                                            {typeof t.value === 'number' ? t.value.toFixed(2) : t.value}
                                            {t.unit && <span className="text-slate-500 text-[9px] ml-0.5 font-sans font-bold">{t.unit}</span>}
                                        </span>
                                        {isNumeric && numValue > 0 && numValue <= 100 && (
                                            <div className="w-8 h-1 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                                                <div 
                                                    className="h-full bg-cyan-400" 
                                                    style={{ width: `${Math.min(100, numValue * (String(t.value).includes('%') || numValue > 1 ? 1 : 100))}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Action Footer */}
            {(onToggleRun || onStep) && (
                <div className="px-6 py-4 bg-slate-950 border-t border-slate-900 flex items-center gap-3">
                    {onToggleRun && (
                        <button
                            onClick={handleToggleRun}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
                                isRunning
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 shadow-red-500/5'
                                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/10'
                            }`}
                        >
                            {isRunning ? <><Pause size={14} /> Pause Simulation</> : <><Play size={14} /> Run Simulation</>}
                        </button>
                    )}
                    {showStepBtn && onStep && !isRunning && (
                        <button
                            onClick={handleStep}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-slate-800 text-slate-200 border border-slate-750 hover:bg-slate-700 transition-all active:scale-95"
                        >
                            <ChevronRight size={14} /> Step
                        </button>
                    )}
                    {onReset && (
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs bg-slate-900 text-slate-400 border border-slate-800 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95 ml-auto"
                        >
                            <RotateCcw size={12} /> Reset
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
