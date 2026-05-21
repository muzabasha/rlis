import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, ChevronUp, BookOpen, Presentation, Layers,
    ChevronLeft, ChevronRight, HelpCircle, Lightbulb
} from 'lucide-react';

interface SectionWrapperProps {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    accentColor?: string;
}

// Bloom's taxonomy flashcard item definition
interface FlashcardItem {
    domain: string;
    question: string;
    answer: string;
}

// Custom flip-card sub-component
function BloomFlashcard({ domain, question, answer }: FlashcardItem) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div 
            onClick={() => setFlipped(!flipped)}
            className="flip-card-container cursor-pointer w-full max-w-sm mx-auto select-none my-3"
        >
            <div className={`flip-card-inner ${flipped ? 'flip-card-flipped' : ''}`}>
                {/* Front Side */}
                <div className="flip-card-front bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-850 border border-slate-200/60 dark:border-slate-700 shadow-md">
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary-600 dark:text-sky-400 bg-primary-50 dark:bg-slate-700/50 px-2.5 py-0.5 rounded-full mb-3 flex items-center gap-1">
                        <Lightbulb size={10} />
                        Bloom's: {domain}
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 text-center px-4 leading-snug">
                        {question}
                    </p>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-4 flex items-center gap-1 animate-pulse">
                        Click to Reveal 🔄
                    </span>
                </div>
                {/* Back Side */}
                <div className="flip-card-back bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-slate-900 border border-emerald-100 dark:border-emerald-900/40 shadow-md">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-450 bg-emerald-100/40 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full mb-3 flex items-center gap-1">
                        <HelpCircle size={10} />
                        Active Recall Answer
                    </span>
                    <p className="text-xs font-bold text-slate-750 dark:text-slate-300 text-center px-4 leading-relaxed overflow-y-auto max-h-[110px] scrollbar-thin">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

// Smart contextual flashcard generator
const generateFlashcards = (sectionId: string, sectionTitle: string): FlashcardItem[] => {
    switch (sectionId) {
        case 'story':
            return [
                {
                    domain: 'Remember (Recall)',
                    question: `What real-world motivation or analogy initiates the discussion on "${sectionTitle}"?`,
                    answer: 'It connects complex reinforcement learning concepts to intuitive human or animal behaviors, establishing real-world stakes and environmental bottlenecks.'
                },
                {
                    domain: 'Understand (Explain)',
                    question: `Why is starting with a story context crucial for analyzing "${sectionTitle}"?`,
                    answer: 'It grounds abstract MDP structures (states, actions, rewards) into tangible physical scenarios, preventing purely theoretical confusion.'
                },
                {
                    domain: 'Apply (Scenario)',
                    question: `How does the historical context of "${sectionTitle}" apply to modern production-grade intelligent systems?`,
                    answer: 'By understanding prior algorithmic limitations, developers can avoid common design failures when formulating industrial reward functions.'
                }
            ];
        case 'math':
            return [
                {
                    domain: 'Remember (Recall)',
                    question: `What are the core mathematical equations or variables defined in "${sectionTitle}"?`,
                    answer: 'Variables typically include States (S), Actions (A), Probability Transitions (P), Discount Factors (gamma), and rewards (R) defining value equations.'
                },
                {
                    domain: 'Understand (Explain)',
                    question: `What is the physical interpretation of the Bellman expectation in "${sectionTitle}"?`,
                    answer: 'It asserts that the value of the current state equals the expected immediate reward plus the discounted value of the subsequent state.'
                },
                {
                    domain: 'Apply (Scenario)',
                    question: `When implementing "${sectionTitle}", how does changing the discount factor impact agent convergence?`,
                    answer: 'A low discount factor makes the agent short-sighted (valuing immediate rewards), while a high discount factor makes it far-sighted (planning long-term).'
                }
            ];
        case 'activity':
            return [
                {
                    domain: 'Remember (Recall)',
                    question: `What is the primary target or win-condition in the interactive simulation for "${sectionTitle}"?`,
                    answer: 'To observe how parameter tweaks (e.g., learning rate, epsilon, reward values) modify the agent trajectory and policy convergence.'
                },
                {
                    domain: 'Understand (Explain)',
                    question: `Explain how the visualization curves react when the learning rate is set too high.`,
                    answer: 'The policy oscillates wildly or diverges, as updates overshoot optimal values rather than converging smoothly.'
                },
                {
                    domain: 'Apply (Scenario)',
                    question: `How would you verify that your policy has reached optimal status during this activity?`,
                    answer: 'The policy remains stable, the total accumulated reward per episode reaches a maximum plateau, and value contours match state values.'
                }
            ];
        case 'project':
            return [
                {
                    domain: 'Remember (Recall)',
                    question: `What are the key standard dependencies or libraries used in "${sectionTitle}"?`,
                    answer: 'Typically Python or TypeScript libraries, including NumPy or custom agent classes, matrix definitions, and environment wrappers.'
                },
                {
                    domain: 'Understand (Explain)',
                    question: `Explain the structural division of code between the Agent class and the Environment class.`,
                    answer: 'The Environment governs physics, dynamics, and rewards. The Agent receives states and implements policy/action updates.'
                },
                {
                    domain: 'Apply (Scenario)',
                    question: `How would you extend this project's code structure to support an episodic gridworld task?`,
                    answer: 'Implement reset() and step() methods in the Environment, returning (next_state, reward, done) tuples on every action tick.'
                }
            ];
        case 'questions':
            return [
                {
                    domain: 'Remember (Recall)',
                    question: `What is the most common pitfall when answering exam questions about "${sectionTitle}"?`,
                    answer: 'Forgetting the Markov property assumption or incorrectly formulating transition matrices (e.g., rows not summing to 1.0).'
                },
                {
                    domain: 'Understand (Explain)',
                    question: `How do Bloom's higher cognitive levels (Evaluate/Create) differ from simple recall in reinforcement learning?`,
                    answer: 'Recall is stating the Bellman equation; Evaluation is deciding whether Monte Carlo or Temporal Difference is optimal for a sparse-reward gridworld.'
                },
                {
                    domain: 'Apply (Scenario)',
                    question: `Formulate a sample exam question testing the application of "${sectionTitle}".`,
                    answer: 'Draft an environmental transition diagram and calculate the single-step state-value update given a specific deterministic policy.'
                }
            ];
        case 'lab':
            return [
                {
                    domain: 'Remember (Recall)',
                    question: `What is the core interface and telemetry tracked inside the Virtual Lab for "${sectionTitle}"?`,
                    answer: 'Tracks cumulative rewards, state-value matrices, episodes elapsed, exploration rates, and running action logs.'
                },
                {
                    domain: 'Understand (Explain)',
                    question: `Explain the transition of the value table from random initial values to a stable gradient.`,
                    answer: 'As rewards propagate back from goal states via Bellman backups, cell values increase representing expected future returns.'
                },
                {
                    domain: 'Apply (Scenario)',
                    question: `How does activating Projector Washout protection modify the laboratory's telemetry readability?`,
                    answer: 'It thickens simulation grid lines, forces high-contrast pure solid black backgrounds, and makes active nodes neon bright for presentation.'
                }
            ];
        default:
            return [
                {
                    domain: 'Remember (Recall)',
                    question: `What is the foundational definition of "${sectionTitle}"?`,
                    answer: 'It represents a key pedagogical milestone in reinforcement learning, combining theoretical frameworks with hands-on practice.'
                },
                {
                    domain: 'Understand (Explain)',
                    question: `Why is "${sectionTitle}" vital to the intelligent systems course curriculum?`,
                    answer: 'It maps directly to core student outcomes (COs), linking analytical planning with computer science problem-solving capabilities.'
                },
                {
                    domain: 'Apply (Scenario)',
                    question: `Describe a real-world scenario where you would utilize "${sectionTitle}" tools.`,
                    answer: 'Deploying adaptive control systems, gaming AI engines, or autonomous robotics routing schemes.'
                }
            ];
    }
};

type ViewMode = 'standard' | 'slides' | 'flashcard';

export default function SectionWrapper({
    id, title, subtitle, icon, badge, badgeColor = 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    children, defaultOpen = true, accentColor = 'border-primary-500'
}: SectionWrapperProps) {
    const [open, setOpen] = useState(defaultOpen);
    const [viewMode, setViewMode] = useState<ViewMode>('standard');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Group direct children into chunks of 2 for slide pagination
    const childrenArray = React.Children.toArray(children);
    const slideChunks: React.ReactNode[][] = [];
    for (let i = 0; i < childrenArray.length; i += 2) {
        slideChunks.push(childrenArray.slice(i, i + 2));
    }

    const totalSlides = slideChunks.length;
    const flashcards = generateFlashcards(id, title);

    const handleNextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const handlePrevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`card mb-6 overflow-hidden border-l-4 ${accentColor} relative`}
        >
            {/* Header Control Panel */}
            <div
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700/35 transition-colors cursor-pointer select-none"
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        {icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                            {badge && (
                                <span className={`section-tag text-xs ${badgeColor}`}>{badge}</span>
                            )}
                        </div>
                        {subtitle && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
                        )}
                    </div>
                </div>

                {/* View Toggles (Click is stopped from collapsing card) */}
                {open && (
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50 mr-4"
                    >
                        {(['standard', 'slides', 'flashcard'] as const).map((mode) => {
                            const active = viewMode === mode;
                            const Icon = mode === 'standard' ? BookOpen : mode === 'slides' ? Presentation : Layers;
                            const label = mode === 'standard' ? 'Standard' : mode === 'slides' ? 'Presenter Slides' : "Bloom's Cards";
                            return (
                                <button
                                    key={mode}
                                    onClick={() => {
                                        setViewMode(mode);
                                        setCurrentSlide(0);
                                    }}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold rounded-lg transition-all ${
                                        active 
                                        ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-sky-400 shadow-sm' 
                                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-250'
                                    }`}
                                >
                                    <Icon size={12} />
                                    <span>{label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                <div className="flex-shrink-0 ml-2">
                    {open ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        {/* Mobile View Toggles */}
                        <div className="sm:hidden px-6 pb-3 flex justify-center">
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-850 p-1 rounded-xl border border-slate-200/40 dark:border-slate-800">
                                {(['standard', 'slides', 'flashcard'] as const).map((mode) => {
                                    const active = viewMode === mode;
                                    const Icon = mode === 'standard' ? BookOpen : mode === 'slides' ? Presentation : Layers;
                                    return (
                                        <button
                                            key={mode}
                                            onClick={() => {
                                                setViewMode(mode);
                                                setCurrentSlide(0);
                                            }}
                                            className={`p-2 rounded-lg transition-all ${
                                                active 
                                                ? 'bg-white dark:bg-slate-750 text-primary-600 dark:text-sky-400 shadow-sm' 
                                                : 'text-slate-500 dark:text-slate-400'
                                            }`}
                                        >
                                            <Icon size={14} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            {/* Standard View */}
                            {viewMode === 'standard' && (
                                <motion.div
                                    key="standard"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="prose prose-slate dark:prose-invert max-w-none"
                                >
                                    {children}
                                </motion.div>
                            )}

                            {/* Presenter Slides View */}
                            {viewMode === 'slides' && (
                                <motion.div
                                    key="slides"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="glass-premium dark:bg-slate-950/30 p-6 sm:p-8 rounded-2xl border border-primary-500/25 dark:border-slate-800 min-h-[220px] flex flex-col justify-center relative">
                                        {/* Slide Content */}
                                        <div className="text-lg sm:text-xl font-bold leading-relaxed text-slate-800 dark:text-slate-200 select-none space-y-4">
                                            {slideChunks[currentSlide]}
                                        </div>
                                    </div>

                                    {/* Slide Controls */}
                                    <div className="flex items-center justify-between mt-2 px-1">
                                        <button
                                            onClick={handlePrevSlide}
                                            disabled={currentSlide === 0}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                                                currentSlide === 0 
                                                ? 'opacity-40 cursor-not-allowed text-slate-450 bg-slate-100 dark:bg-slate-800/40' 
                                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-250 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 active:scale-95'
                                            }`}
                                        >
                                            <ChevronLeft size={14} />
                                            <span>Previous</span>
                                        </button>

                                        <span className="text-[11px] font-black text-slate-450 uppercase tracking-wider">
                                            Slide {currentSlide + 1} of {totalSlides}
                                        </span>

                                        <button
                                            onClick={handleNextSlide}
                                            disabled={currentSlide === totalSlides - 1}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                                                currentSlide === totalSlides - 1 
                                                ? 'opacity-40 cursor-not-allowed text-slate-450 bg-slate-100 dark:bg-slate-800/40' 
                                                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm active:scale-95'
                                            }`}
                                        >
                                            <span>Next</span>
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Bloom's Flashcards View */}
                            {viewMode === 'flashcard' && (
                                <motion.div
                                    key="flashcard"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <div className="text-center max-w-md mb-2">
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                            Assess your active recall matching <span className="text-primary-600 dark:text-sky-400">Bloom's Cognitive Taxonomy</span> levels.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full justify-items-center">
                                        {flashcards.map((card, i) => (
                                            <BloomFlashcard 
                                                key={i} 
                                                domain={card.domain} 
                                                question={card.question} 
                                                answer={card.answer} 
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
