import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Pause, RotateCcw, ChevronRight, Gauge, Settings2,
    Info, Download, TrendingUp, Cpu, X, BookOpen, Terminal,
    Sparkles, CheckCircle, HelpCircle, Send, CheckSquare, Presentation,
    Zap, Contrast, Keyboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatMathText } from './MathBlock';

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
    return [
        `What problem does "${title}" solve better than a fixed rule-based approach?`,
        `Which states, actions, rewards, and constraints define this problem most clearly?`,
        `What assumptions does "${title}" make about the environment or available data?`,
        `How would stochastic transitions change the expected outcome of this method?`,
        `Which telemetry signal best indicates that learning is improving rather than oscillating?`,
        `What failure mode could result from a poorly designed reward function?`,
        `How would the result change with a shorter or longer planning horizon?`,
        `What trade-off exists between exploration, computation cost, and solution quality?`,
        `How could this approach be evaluated fairly against a simpler baseline?`,
        `Where would safety, ethics, or human oversight matter in a real deployment?`,
    ];
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
    const { 
        projectorMode, 
        toggleProjectorMode,
        projectorScale,
        setProjectorScale,
        laserPointerEnabled,
        toggleLaserPointer,
        washoutProtection,
        toggleWashoutProtection
    } = useApp();

    type LabTab = 'simulation' | 'notebook' | 'terminal' | 'quests' | 'discussion';
    const [activeTab, setActiveTab] = useState<LabTab>('simulation');
    const [showTips, setShowTips] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);

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

    const [localLogs, setLocalLogs] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem(`${storageKey}_logs`);
            if (saved) return JSON.parse(saved);
        } catch {
            // Ignore malformed local state and initialize a fresh console.
        }
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
        }
    };

    const handleStep = () => {
        if (onStep) {
            onStep();
            addLog("⏭️ Executed single step telemetry transition.");
        }
    };

    const handleSpeedChange = (newSpeed: number) => {
        if (onSpeedChange) {
            onSpeedChange(newSpeed);
            addLog(`⚡ Adjusted simulation execution frequency to ${newSpeed}x speed.`);
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
        setLocalLogs([
            `🤖 [System] Simulation state cleared. Re-initializing...`,
            `📡 [Telemetry] Re-connecting variables... Connected.`,
            `💡 [Pedagogy] Mapped to NEP 2020 Syllabus Alignment: ${detectedCO.co}. Ready for student interaction.`
        ]);
        
        localStorage.removeItem(`${storageKey}_answers`);
        localStorage.removeItem(`${storageKey}_validated`);
        localStorage.removeItem(`${storageKey}_logs`);
    };

    // Keyboard presenter remote listener
    useEffect(() => {
        if (!projectorMode) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Guard: Ignore shortcuts when focused in inputs/textareas (e.g. Guided Notebook inputs)
            const activeEl = document.activeElement;
            const isTyping = activeEl && (
                activeEl.tagName === 'INPUT' || 
                activeEl.tagName === 'TEXTAREA' || 
                activeEl.getAttribute('contenteditable') === 'true'
            );
            if (isTyping) return;

            const key = e.key.toLowerCase();

            // Tab Swapping: 1 - 3
            if (key === '1') {
                setActiveTab('simulation');
                addLog("📋 Presenter Hotkey: Switched view to Simulation Sandbox.");
            } else if (key === '2') {
                setActiveTab('notebook');
                addLog("📋 Presenter Hotkey: Switched view to Guided Workbook.");
            } else if (key === '3') {
                setActiveTab('terminal');
                addLog("📋 Presenter Hotkey: Switched view to Lab Console.");
            }
            // Tab Cycle: ArrowRight / ArrowLeft (or PageDown / PageUp)
            else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                const tabs: LabTab[] = [
                    'simulation', 'notebook', 'terminal', 'quests', 'discussion'
                ];
                const currentIdx = tabs.indexOf(activeTab);
                const nextIdx = (currentIdx + 1) % tabs.length;
                setActiveTab(tabs[nextIdx]);
                addLog(`📋 Presenter Hotkey: Swapped to next view (${tabs[nextIdx]}).`);
                e.preventDefault();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                const tabs: LabTab[] = [
                    'simulation', 'notebook', 'terminal', 'quests', 'discussion'
                ];
                const currentIdx = tabs.indexOf(activeTab);
                const prevIdx = (currentIdx - 1 + tabs.length) % tabs.length;
                setActiveTab(tabs[prevIdx]);
                addLog(`📋 Presenter Hotkey: Swapped to previous view (${tabs[prevIdx]}).`);
                e.preventDefault();
            }
            // Sim Controls: Space to Run/Pause
            else if (e.key === ' ') {
                if (onToggleRun) {
                    handleToggleRun();
                    e.preventDefault();
                }
            }
            // Sim Controls: S to Step
            else if (key === 's') {
                if (onStep && !isRunning) {
                    handleStep();
                }
            }
            // Sim Controls: R to Reset
            else if (key === 'r') {
                if (onReset) {
                    handleReset();
                }
            }
            // Laser Pointer: L
            else if (key === 'l') {
                toggleLaserPointer();
                addLog(`📋 Presenter Hotkey: Glow Laser Pointer turned ${!laserPointerEnabled ? 'ON' : 'OFF'}.`);
            }
            // Washout Shield: W
            else if (key === 'w') {
                toggleWashoutProtection();
                addLog(`📋 Presenter Hotkey: Washout Contrast Shield turned ${!washoutProtection ? 'ON' : 'OFF'}.`);
            }
            // Projector Scale: [ and ]
            else if (e.key === '[') {
                const scales: ('normal' | 'large' | 'huge')[] = ['normal', 'large', 'huge'];
                const currentIdx = scales.indexOf(projectorScale || 'large');
                const prevIdx = Math.max(0, currentIdx - 1);
                setProjectorScale(scales[prevIdx]);
                addLog(`📋 Presenter Hotkey: Decreased Pedagogical Text Scale to ${scales[prevIdx].toUpperCase()}.`);
            } else if (e.key === ']') {
                const scales: ('normal' | 'large' | 'huge')[] = ['normal', 'large', 'huge'];
                const currentIdx = scales.indexOf(projectorScale || 'large');
                const nextIdx = Math.min(scales.length - 1, currentIdx + 1);
                setProjectorScale(scales[nextIdx]);
                addLog(`📋 Presenter Hotkey: Increased Pedagogical Text Scale to ${scales[nextIdx].toUpperCase()}.`);
            }
            // Help Modal: ?
            else if (e.key === '?' || e.key === '/') {
                setShowHelpModal(prev => !prev);
            }
            // Exit Projector Mode: Esc
            else if (e.key === 'Escape') {
                toggleProjectorMode();
                addLog("📋 Presenter Hotkey: Exiting Projector Mode.");
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        projectorMode, activeTab, isRunning, onToggleRun, onStep, onReset, 
        laserPointerEnabled, washoutProtection, projectorScale, 
        toggleLaserPointer, toggleWashoutProtection, setProjectorScale, toggleProjectorMode, addLog
    ]);

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
                        <span className="text-slate-400 text-[10px] font-medium">{formatMathText(description)}</span>
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
                                            <span className="text-amber-500 font-bold">→</span> {formatMathText(tip)}
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
                                    className="w-28 h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-600 accent-indigo-600"
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
                                                    <p className="text-xs font-black text-slate-850 dark:text-slate-200">{formatMathText(entry.task)}</p>
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
                                                    ❓ <span className="font-bold text-cyan-600 dark:text-cyan-400">Observation Question: </span>{formatMathText(entry.question)}
                                                </p>
                                            </div>

                                            {entry.hint && (
                                                <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-bold">
                                                    <HelpCircle size={12} />
                                                    <span>Hint: {formatMathText(entry.hint)}</span>
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
                                    <span className="text-[10px] text-slate-500 font-bold">{formatMathText(t.label)}:</span>
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

            {/* Projector Mode Unified Presenter Floating Deck & Telemetry Pill */}
            <AnimatePresence>
                {projectorMode && (
                    <motion.div
                        initial={{ y: 150, x: '-50%', opacity: 0 }}
                        animate={{ y: 0, x: '-50%', opacity: 1 }}
                        exit={{ y: 150, x: '-50%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9995] flex flex-col items-center gap-3 w-[90%] max-w-4xl pointer-events-auto"
                    >
                        {/* 1. Floating Telemetry Strip Pill */}
                        {telemetry.length > 0 && (
                            <div className="glass border border-primary-500/20 dark:border-cyan-400/25 rounded-2xl py-1.5 px-4 flex gap-4 overflow-x-auto max-w-full shadow-lg items-center text-slate-950 dark:text-cyan-400 select-none">
                                <div className="flex items-center gap-1.5 flex-shrink-0 text-primary-600 dark:text-cyan-400">
                                    <Cpu size={12} className="animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Presenter Telemetry</span>
                                </div>
                                <div className="flex gap-3 text-[10px] font-bold">
                                    {telemetry.map((t, idx) => (
                                        <div key={idx} className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-900/60 px-2.5 py-0.5 rounded-lg border border-slate-300/30 dark:border-slate-800">
                                            <span className="text-slate-500 dark:text-slate-400">{formatMathText(t.label)}:</span>
                                            <span className={t.highlight ? 'text-emerald-500 font-extrabold' : t.color || 'text-slate-800 dark:text-white font-mono'}>
                                                {typeof t.value === 'number' ? t.value.toFixed(2) : t.value}
                                                {t.unit && <span className="text-slate-400 dark:text-slate-500 text-[8px] font-sans font-bold ml-0.5">{t.unit}</span>}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. Main Presenter Remote Deck */}
                        <div className="glass border-2 border-cyan-400/30 dark:border-cyan-400/35 rounded-3xl p-3 flex items-center justify-between gap-5 w-full shadow-2xl presenter-remote-glow text-slate-900 dark:text-white select-none">
                            {/* A. VISUAL TOOLS */}
                            <div className="flex items-center gap-1.5 bg-slate-200/40 dark:bg-slate-900/45 p-1 rounded-2xl border border-slate-300/20 dark:border-slate-800">
                                {/* Scaling Indicator */}
                                <button
                                    onClick={() => {
                                        const scales: ('normal' | 'large' | 'huge')[] = ['normal', 'large', 'huge'];
                                        const currentIdx = scales.indexOf(projectorScale || 'large');
                                        const nextIdx = (currentIdx + 1) % scales.length;
                                        setProjectorScale(scales[nextIdx]);
                                        addLog(`📺 Pedagogical Text Scale set to ${scales[nextIdx].toUpperCase()}.`);
                                    }}
                                    className="p-2 rounded-xl text-[10px] font-black uppercase tracking-wider bg-white dark:bg-slate-850 border border-slate-300/40 dark:border-slate-700 hover:text-cyan-400 transition-colors flex items-center gap-1 min-w-[70px] justify-center"
                                    title="Cycle Text Scaling Factors ([ or ])"
                                >
                                    <span>Scale:</span>
                                    <span className="text-cyan-500 font-extrabold">{projectorScale === 'normal' ? '1x' : projectorScale === 'large' ? '1.35x' : '1.55x'}</span>
                                </button>

                                {/* Laser pointer toggle */}
                                <button
                                    onClick={toggleLaserPointer}
                                    className={`p-2 rounded-xl border transition-all ${
                                        laserPointerEnabled
                                            ? 'bg-rose-500 text-white border-rose-400'
                                            : 'bg-white dark:bg-slate-850 border-slate-350/40 dark:border-slate-700 text-slate-500 hover:text-rose-400'
                                    }`}
                                    title="Toggle Laser Pointer (L)"
                                >
                                    <Zap size={14} className={laserPointerEnabled ? 'animate-bounce text-white' : ''} />
                                </button>

                                {/* Washout protect toggle */}
                                <button
                                    onClick={toggleWashoutProtection}
                                    className={`p-2 rounded-xl border transition-all ${
                                        washoutProtection
                                            ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                                            : 'bg-white dark:bg-slate-850 border-slate-350/40 dark:border-slate-700 text-slate-500 hover:text-cyan-400'
                                    }`}
                                    title="Toggle Washout Protection (W)"
                                >
                                    <Contrast size={14} className={washoutProtection ? 'animate-spin text-slate-950' : ''} style={{ animationDuration: '4s' }} />
                                </button>
                            </div>

                            {/* B. TAB SWAPPER / NAVIGATION SLIDES */}
                            <div className="flex items-center gap-1 bg-slate-200/40 dark:bg-slate-900/45 p-1 rounded-2xl border border-slate-300/20 dark:border-slate-800 flex-1 justify-center max-w-lg">
                                {([
                                    { id: 'simulation', icon: <Cpu size={14} />, label: 'Sandbox', hotkey: '1' },
                                    { id: 'notebook', icon: <BookOpen size={14} />, label: 'Workbook', hotkey: '2' },
                                    { id: 'terminal', icon: <Terminal size={14} />, label: 'Console', hotkey: '3' }
                                ] as const).map((tab) => {
                                    const active = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                addLog(`📺 Presenter Remote: Switched view to ${tab.label}.`);
                                            }}
                                            className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                                                active
                                                    ? 'bg-cyan-500 text-slate-950 border border-cyan-400 shadow-md shadow-cyan-500/20'
                                                    : 'text-slate-550 dark:text-slate-450 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-250 dark:hover:bg-slate-800/40'
                                            }`}
                                            title={`Switch to ${tab.label} slide (${tab.hotkey})`}
                                        >
                                            {tab.icon}
                                            <span className="hidden sm:inline">{tab.label}</span>
                                            <span className={`keycap hidden md:inline-flex ${active ? 'keycap-light border-slate-300' : 'opacity-65'}`}>{tab.hotkey}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* C. SIMULATION CONTROLS */}
                            <div className="flex items-center gap-1.5 bg-slate-200/40 dark:bg-slate-900/45 p-1 rounded-2xl border border-slate-300/20 dark:border-slate-800">
                                {onToggleRun && (
                                    <button
                                        onClick={handleToggleRun}
                                        className={`p-2 px-3 rounded-xl border transition-all text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                                            isRunning
                                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                                : 'bg-emerald-500 text-slate-950 border-emerald-400 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                                        }`}
                                        title="Play/Pause Simulation (Space)"
                                    >
                                        {isRunning ? <Pause size={12} className="animate-pulse" /> : <Play size={12} />}
                                        <span className="hidden md:inline">{isRunning ? 'Pause' : 'Run'}</span>
                                        <span className={`keycap ${isRunning ? '' : 'keycap-light'}`}>Space</span>
                                    </button>
                                )}

                                {showStepBtn && onStep && !isRunning && (
                                    <button
                                        onClick={handleStep}
                                        className="p-2 px-2.5 bg-white dark:bg-slate-850 border border-slate-300/40 dark:border-slate-700 hover:text-cyan-400 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors"
                                        title="Step Telemetry Single Tick (S)"
                                    >
                                        <ChevronRight size={12} />
                                        <span className="hidden md:inline">Step</span>
                                        <span className="keycap">S</span>
                                    </button>
                                )}

                                {onReset && (
                                    <button
                                        onClick={handleReset}
                                        className="p-2 bg-white dark:bg-slate-850 border border-slate-350/40 dark:border-slate-700 hover:text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
                                        title="Reset Sandbox Parameters (R)"
                                    >
                                        <RotateCcw size={12} />
                                    </button>
                                )}
                            </div>

                            {/* D. HELP CHEAT SHEET BUTTON & EXIT */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setShowHelpModal(true)}
                                    className="p-2 bg-slate-200/50 dark:bg-slate-900 text-slate-500 hover:text-cyan-400 rounded-xl border border-slate-300/30 dark:border-slate-800"
                                    title="Keyboard Shortcuts Cheatsheet (?)"
                                >
                                    <Keyboard size={14} />
                                </button>
                                <button
                                    onClick={handleToggleProjector}
                                    className="p-2 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 rounded-xl font-black text-[10px] uppercase tracking-wider"
                                    title="Exit Projector Mode (Esc)"
                                >
                                    Exit
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Keyboard shortcuts Cheatsheet Modal Overlay */}
            <AnimatePresence>
                {showHelpModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
                        onClick={() => setShowHelpModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-slate-900 border-2 border-cyan-400/40 dark:border-cyan-400/35 rounded-3xl p-6 max-w-md w-full shadow-2xl text-slate-900 dark:text-white space-y-4"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                                <div className="flex items-center gap-2">
                                    <Keyboard className="text-cyan-500" size={20} />
                                    <h4 className="font-black text-sm tracking-wide uppercase">Presenter Remote Keyboard Guides</h4>
                                </div>
                                <button onClick={() => setShowHelpModal(false)} className="text-slate-400 hover:text-slate-100 p-1">
                                    <X size={18} />
                                </button>
                            </div>

                            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                                Drive your interactive reinforcement learning classroom lectures without ever using a mouse! These high-fidelity keyboard hotkeys are bound globally while Projector Mode is enabled.
                            </p>

                            <div className="space-y-2.5 pt-2">
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-850">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Swap Views / Tab Slides</span>
                                    <div className="flex gap-1">
                                        <span className="keycap keycap-light">1</span>
                                        <span className="text-slate-400">-</span>
                                        <span className="keycap keycap-light">3</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-850">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Cycle Tab Slides</span>
                                    <div className="flex gap-1.5 items-center">
                                        <span className="keycap">←</span>
                                        <span className="text-[10px] text-slate-400 font-black">/</span>
                                        <span className="keycap">→</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-850">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Play / Pause Simulation</span>
                                    <span className="keycap keycap-light px-3">Space</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-850">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Single telemetric step</span>
                                    <span className="keycap">S</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-850">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Reset simulation parameters</span>
                                    <span className="keycap">R</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-850">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Toggle Glow Laser pointer</span>
                                    <span className="keycap">L</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-850">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Toggle Washout Contrast protection</span>
                                    <span className="keycap">W</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-850">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Increase / Decrease text size</span>
                                    <div className="flex gap-1.5 items-center">
                                        <span className="keycap">[</span>
                                        <span className="text-[10px] text-slate-400 font-black">/</span>
                                        <span className="keycap">]</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5">
                                    <span className="font-bold text-slate-650 dark:text-slate-350">Exit Projector Mode</span>
                                    <span className="keycap px-2">Esc</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowHelpModal(false)}
                                className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-colors shadow-md shadow-cyan-500/10 active:scale-95"
                            >
                                Got it, let's present!
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
