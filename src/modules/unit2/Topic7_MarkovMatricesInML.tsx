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
    MessageSquare,
    Type,
    Search,
    Network,
    Brain,
    Activity,
    Zap,
    CheckCircle2,
    AlertTriangle,
    Target
} from 'lucide-react';


// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = [
    {
        "id": "concept_explore",
        "quest": "Markov Matrices In M L Discovery",
        "target": "Interact with the visualizer and observe transition steps",
        "isCompleted": false
    },
    {
        "id": "worksheet_complete",
        "quest": "Markov Matrices In M L Workbook",
        "target": "Submit answers to all guided worksheet reflection questions",
        "isCompleted": false
    }
];
const notebook: NotebookEntry[] = [
    {
        "task": "Perform 5 separate step cycles on the Markov Matrices In M L simulator.",
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
    "🤖 [System] Initializing Markov Matrices In M L Experiential Simulator...",
    "📡 [Telemetry] Connecting data streams... Connected.",
    "💡 [Pedagogy] Concept: \"Markov Matrices In M L\" model has been loaded and initialized. Ready for student interaction."
];

// ─── Interactive Components ──────────────────────────────────────────────────

function TextGeneratorLab() {
    const [generatedText, setGeneratedText] = useState<string[]>(['I']);
    const [isGenerating, setIsGenerating] = useState(false);

    // Simple Markov Bigram Transition Matrix
    const transitions: Record<string, { words: string[], probs: number[] }> = {
        'I': { words: ['am', 'love', 'think'], probs: [0.5, 0.3, 0.2] },
        'am': { words: ['learning', 'a', 'happy'], probs: [0.6, 0.3, 0.1] },
        'love': { words: ['machine', 'to', 'this'], probs: [0.4, 0.4, 0.2] },
        'think': { words: ['therefore', 'that', 'we'], probs: [0.5, 0.3, 0.2] },
        'learning': { words: ['about', 'how', 'fast'], probs: [0.5, 0.3, 0.2] },
        'a': { words: ['machine', 'robot', 'student'], probs: [0.4, 0.3, 0.3] },
        'machine': { words: ['learning', 'that', '.'], probs: [0.6, 0.2, 0.2] },
        'to': { words: ['code', 'build', 'learn'], probs: [0.4, 0.3, 0.3] },
        'code': { words: ['Python', 'AI', '.'], probs: [0.4, 0.4, 0.2] },
        'about': { words: ['Markov', 'matrices', 'AI'], probs: [0.4, 0.3, 0.3] },
        'Markov': { words: ['Chains', 'Matrices', 'Models'], probs: [0.4, 0.3, 0.3] },
        'Chains': { words: ['are', 'can', '.'], probs: [0.5, 0.3, 0.2] }
    };

    const generateNextWord = () => {
        const lastWord = generatedText[generatedText.length - 1];
        const options = transitions[lastWord];
        
        if (!options) {
            setGeneratedText(prev => [...prev, '.']);
            setIsGenerating(false);
            return;
        }

        const rand = Math.random();
        let cumulativeProb = 0;
        let nextWord = options.words[0];

        for (let i = 0; i < options.probs.length; i++) {
            cumulativeProb += options.probs[i];
            if (rand < cumulativeProb) {
                nextWord = options.words[i];
                break;
            }
        }

        setGeneratedText(prev => [...prev, nextWord]);
        if (nextWord === '.') setIsGenerating(false);
    };

    const handleGenerate = () => {
        if (generatedText[generatedText.length - 1] === '.') {
            setGeneratedText(['I']);
        }
        setIsGenerating(true);
    };

    // Auto-generate if isGenerating is true
    React.useEffect(() => {
        if (isGenerating) {
            const timer = setTimeout(() => {
                generateNextWord();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isGenerating, generatedText]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Type size={18} className="text-primary-500" />
                        Bigram Text Generator
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Watch a Markov Chain construct sentences word by word.</p>
                </div>
                <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                    {isGenerating ? 'Generating...' : 'Start / Restart'}
                </button>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 min-h-[120px] flex flex-wrap gap-2 items-start content-start shadow-inner">
                <AnimatePresence>
                    {generatedText.map((word, i) => (
                        <motion.span 
                            key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm ${
                                word === '.' 
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                                : 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                            }`}
                        >
                            {word}
                        </motion.span>
                    ))}
                    {isGenerating && (
                        <motion.span 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="px-3 py-1.5 flex items-center gap-1"
                        >
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Current State</span>
                    <p className="text-lg font-black text-slate-700 dark:text-slate-300 mt-1">"{generatedText[generatedText.length - 1]}"</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Transitions (Matrix Row)</span>
                    <div className="flex gap-2 mt-2">
                        {transitions[generatedText[generatedText.length - 1]] ? (
                            transitions[generatedText[generatedText.length - 1]].words.map((w, i) => (
                                <div key={i} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                                    <span className="font-bold text-slate-600 dark:text-slate-300">{w}</span>
                                    <span className="text-primary-500 ml-1">{(transitions[generatedText[generatedText.length - 1]].probs[i] * 100)}%</span>
                                </div>
                            ))
                        ) : (
                            <span className="text-xs text-slate-400">Absorbing state. End of sentence.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic7_MarkovMatricesInML() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit2-topic7_markovmatricesinml" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. Predicting the Next Move" 
                subtitle="How ML Uses Markov Matrices"
                icon={<Brain className="text-blue-600" size={24} />}
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
                                "Because regular matrices weren't confusing enough, we made them probabilistic."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <MessageSquare size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            📱 The Keyboard that Reads Your Mind
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                Have you ever noticed how your smartphone keyboard tries to guess the next word you are going to type? If you type "Happy", it suggests "Birthday". If you type "I am", it suggests "going" or "here".
                            </p>
                            <p>
                                How does it know? It uses <strong>Machine Learning</strong> built on top of Markov Matrices!
                            </p>
                            <p>
                                By analyzing millions of text messages, the phone builds a massive Transition Matrix. The matrix knows that the probability of transitioning from the state "Happy" to the state "Birthday" is extremely high. In Natural Language Processing, this is known as an <strong>N-Gram Model</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="Data is the Matrix">
                            In ML, we don't manually write the matrix. The algorithm <em>learns</em> the matrix by counting frequencies in large datasets.
                        </InfoCard>
                        <InfoCard type="tip" title="Beyond Text">
                            This same math is used in Bioinformatics (DNA sequencing), Finance (stock price states), and user behavior modeling.
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
                                Sorting millions of web pages by importance based solely on link connections (PageRank).
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
                            Critical for applying linear algebra transition concepts to solve web-scale indexing and NLP sequence modeling tasks.
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
                                    Uniquely robust algorithms that resist local noise and scale gracefully.
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
                                    Extremely high memory footprint for large non-sparse transition matrices.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

{/* SECTION 3: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="3. Sequence Probability" 
                subtitle="Calculating the Likelihood of Data"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <MathBlock 
                                formula="\mathbb{P}(w_1 w_2 \dots w_n) \approx \prod_{i=1}^{n} \mathbb{P}(w_i | w_{i-1})"
                                label="Markov Approximation (Bigram)"
                                explanation="The probability of an entire sentence is approximated by multiplying the transition probabilities between adjacent words."
                            />
                            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                                <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Network size={16} /> Learning the Matrix</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    {"To find $P_{ij}$ (Prob of word $j$ following word $i$), the ML model simply divides the count of the pair $(i, j)$ by the total occurrences of word $i$."}
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <MathBlock 
                                formula="P_{ij} = \frac{\text{Count}(i \rightarrow j)}{\sum_k \text{Count}(i \rightarrow k)}"
                                label="Maximum Likelihood Estimation"
                                explanation="This is how the machine 'learns'. It counts occurrences in the training data to build the transition matrix."
                            />
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="Markov Matrices In M L Architecture"
                description="Applying transition matrices in algorithms like PageRank."
                chart={`graph TD
    Data[Sequential Data] --> T[Transition Matrix]
    T --> E[Eigenvector Calculation]
    E --> Steady[Steady State Probabilities]`}
            />


            {/* SECTION 4: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="4. Multi-Level Activities" 
                subtitle="Becoming the Bigram Model"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <ActivityLevels 
                    levels={[
                        {
                            level: 1,
                            title: "Bigram Predictor Demo",
                            objectives: "Observe how a transition matrix generates coherent (but simple) language structures.",
                            instructions: [
                                "Open the 'Bigram Text Generator' in the Virtual Lab section.",
                                "Press 'Start' and watch the current word state change.",
                                "Trace a specific transition: if current is 'love', show how the next is sampled from {machine, to, this}.",
                                "Explain that ML 'learned' these percentages by reading millions of sentences."
                            ],
                            inputs: "Interactive TextGeneratorLab component",
                            outputs: "Generated sentences and real-time state tracking.",
                            rubrics: ["Clarity of 'Next-Word' logic", "Demonstration of probability sampling", "Student engagement"],
                            outcomes: "Students understand that 'Autocomplete' is just a Markov Chain sampling from a transition matrix.",
                            time: "10 Mins",
                            materials: ["Interactive Component", "Projector"]
                        },
                        {
                            level: 2,
                            title: "The Data Learning Workshop",
                            objectives: "Collaboratively calculate transition probabilities from a raw sample of text.",
                            instructions: [
                                "Teacher provides a sample sentence: 'The cat sat. The cat ate. The dog sat.'",
                                "Task: Build a transition matrix for the word 'The'.",
                                "Guided Calculation: 'The' is followed by 'cat' 2 times and 'dog' 1 time.",
                                "Class calculates: $P(\\text{cat} | \\text{The}) = 2/3$ and $P(\\text{dog} | \\text{The}) = 1/3$.",
                                "Students fill in the 'The' row of the matrix on the board."
                            ],
                            inputs: "Sample repetitive text phrases",
                            outputs: "Partial 1st-order Transition Matrix",
                            rubrics: ["Mathematical accuracy of counts", "Probability normalization", "Classroom participation"],
                            outcomes: "Students master the fundamental method machines use to 'learn' Markovian dynamics.",
                            time: "15 Mins",
                            materials: ["Whiteboard", "Markers"]
                        },
                        {
                            level: 3,
                            title: "The Class Chain Story",
                            objectives: "Experience the generation of a stochastic process through a live human Markov Chain simulation.",
                            instructions: [
                                "Teacher starts with a word: 'Once'.",
                                "Rule: Each student adds exactly ONE word.",
                                "Constraint: You must only look at the VERY LAST word spoken, not the whole story so far.",
                                "Example: If 'Once' -> 'upon' -> 'a' -> 'time' -> 'is' -> 'up'.",
                                "Groups record the generated story and identify where the 'Markovian' memory makes the story go off track."
                            ],
                            inputs: "Starting seed word",
                            outputs: "Transcribed Class Chain Story",
                            rubrics: ["Strict adherence to 1st-order memory", "Participation", "Team coordination"],
                            outcomes: "Students visually and audibly grasp the 'short-term memory' limitation of 1st-order Markov models.",
                            time: "20 Mins",
                            materials: ["Notebooks", "Pens"]
                        },
                        {
                            level: 4,
                            title: "Smart Keyboard Audit",
                            objectives: "Independently analyze the predictive behavior of a personal smartphone keyboard.",
                            instructions: [
                                "Task: Open your phone's messaging app.",
                                "Type the word 'I' and record the 3 suggested words.",
                                "Select one suggestion and record the next 3.",
                                "Repeat for 'Happy', 'Machine', and 'The'.",
                                "Reflect: Do the suggestions change if you delete the history? Is your phone using a 1st-order or higher-order Markov model?"
                            ],
                            inputs: "Personal smartphone keyboard",
                            outputs: "Individual Auto-Complete Analysis Chart",
                            rubrics: ["Depth of technical reflection", "Data collection accuracy", "Originality"],
                            outcomes: "Students realize that everyday tools are living implementations of Markovian probability matrices.",
                            time: "15 Mins",
                            materials: ["Smartphone", "Student Workbook"]
                        }
                    ]}
                />
            </SectionWrapper>

            {/* SECTION 5: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="5. Project: DNA Sequence Analysis" 
                subtitle="Finding Genetic Anomalies"
                icon={<Zap className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 bg-indigo-50/30 dark:bg-indigo-900/10 border-none">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Activity size={18} /> Bioinformatics and Markov Models</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            DNA is a sequence of 4 states: A, C, G, and T. Biologists use ML to build Markov Matrices of healthy DNA sequences.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Healthy Matrix</span>
                            <p className="text-sm mt-1">Shows that after a 'C', the probability of a 'G' is 30%.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Anomaly Detection</span>
                            <p className="text-sm mt-1">If a patient's DNA has C -&gt; G with a 90% probability, the ML algorithm flags it as an anomaly or potential mutation!</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 6: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="6. Quick Check" 
                subtitle="ML Integration"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'How does an ML model "learn" a transition matrix?', a: 'By counting the frequencies of state transitions in a large training dataset and normalizing them into probabilities (Maximum Likelihood Estimation).' },
                        { q: 'What is a Bigram model in NLP?', a: 'A 1st-order Markov model where the probability of a word depends entirely and exclusively on the single word that came immediately before it.' },
                        { q: 'Why are Markov Matrices useful for anomaly detection?', a: 'Because they establish a baseline of "normal" transition probabilities. Sequences that have highly improbable transitions according to the matrix can be flagged as anomalies.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 7: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="7. Virtual Lab: Text Generator" 
                subtitle="Watch the Matrix Create Sentences"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="PageRank Simulator"
                    description="Apply Markov matrices to real ML algorithms"
                    objective="Build a small web graph and watch PageRank iterate to a stable page importance ranking."
                    badge="Interactive Lab"
                    tips={['PageRank is literally a Markov chain — each page is a state',
                'The "Random Surfer" model: with probability d, the surfer follows a link; with 1-d, they jump randomly']}
                 challenges={challenges} notebook={notebook} logs={logs}>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        This lab runs a small Markov Matrix trained on computer science text. When you press Start, it will use the probabilities defined in the matrix rows to sample the next word, chaining them together to form a sentence.
                    </p>
                    <TextGeneratorLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">The Machine Learns!</h3>
                    <p className="text-primary-100">
                        You've seen how simple matrices power massive ML algorithms. Now, let's step fully into Reinforcement Learning by adding the concept of "Rewards".
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: REWARDS AND RETURNS
                    </button>
                </div>
            </div>
        </div>
    );
}
