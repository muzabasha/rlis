import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    MessageSquare, Type, Search, Network, Brain, Activity, Zap
} from 'lucide-react';

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

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. Sequence Probability" 
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

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Human Auto-Complete" 
                subtitle="Acting as a Bigram Model"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    {/* Level 1 */}
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Class Chain Story</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            The teacher says a starting word: "The".
                            <br/><br/>
                            Each student must rapidly add exactly <strong>one</strong> word that makes sense based <em>only</em> on the previous student's word.
                            <br/><br/>
                            Teacher: "The" <br/>
                            Student 1: "Quick" <br/>
                            Student 2: "Brown" <br/>
                            Student 3: "Fox" <br/>
                            <br/>
                            This perfectly simulates a human 1st-order Markov Chain!
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: DNA Sequence Analysis" 
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

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
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
                title="6. Virtual Lab: Text Generator" 
                subtitle="Watch the Matrix Create Sentences"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        This lab runs a small Markov Matrix trained on computer science text. When you press Start, it will use the probabilities defined in the matrix rows to sample the next word, chaining them together to form a sentence.
                    </p>
                    <TextGeneratorLab />
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
