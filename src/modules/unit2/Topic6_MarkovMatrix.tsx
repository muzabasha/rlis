import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import { 
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb, 
    Grid3X3, ArrowRight, Zap, Target, Briefcase, Activity, CheckCircle2, XCircle
} from 'lucide-react';

// ─── Interactive Components ──────────────────────────────────────────────────

/**
 * Interactive Lab: Matrix Validator and Power Calculator
 */
function MatrixPowerLab() {
    const [matrix, setMatrix] = useState([
        [0.8, 0.2],
        [0.4, 0.6]
    ]);
    const [power, setPower] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (r: number, c: number, val: string) => {
        const num = parseFloat(val);
        const newMatrix = [...matrix];
        newMatrix[r] = [...newMatrix[r]];
        
        if (!isNaN(num)) {
            newMatrix[r][c] = num;
        }
        
        setMatrix(newMatrix);
        
        // Validate
        let hasError = false;
        for (let i = 0; i < 2; i++) {
            const sum = newMatrix[i].reduce((a, b) => a + b, 0);
            if (Math.abs(sum - 1.0) > 0.001) {
                setError(`Row ${i + 1} sum is ${sum.toFixed(2)}. It must be exactly 1.0.`);
                hasError = true;
            }
        }
        if (!hasError) setError(null);
    };

    const multiplyMatrix = (A: number[][], B: number[][]) => {
        return [
            [
                A[0][0] * B[0][0] + A[0][1] * B[1][0],
                A[0][0] * B[0][1] + A[0][1] * B[1][1]
            ],
            [
                A[1][0] * B[0][0] + A[1][1] * B[1][0],
                A[1][0] * B[0][1] + A[1][1] * B[1][1]
            ]
        ];
    };

    let resultMatrix = [...matrix];
    if (!error) {
        for (let i = 1; i < power; i++) {
            resultMatrix = multiplyMatrix(resultMatrix, matrix);
        }
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Input Matrix */}
                <div className="flex-1 space-y-4 w-full">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Transition Matrix P</h5>
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 relative">
                        <div className="absolute top-0 bottom-0 left-4 w-2 border-l-2 border-t-2 border-b-2 border-slate-300 dark:border-slate-600 rounded-l-lg" />
                        <div className="absolute top-0 bottom-0 right-4 w-2 border-r-2 border-t-2 border-b-2 border-slate-300 dark:border-slate-600 rounded-r-lg" />
                        
                        <div className="flex flex-col gap-4 px-8 relative z-10">
                            {matrix.map((row, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="text-[10px] text-slate-400 font-bold w-4 text-right">R{i+1}</div>
                                    {row.map((cell, j) => (
                                        <input 
                                            key={j}
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="1"
                                            value={cell}
                                            onChange={(e) => handleInputChange(i, j, e.target.value)}
                                            className="w-20 text-center font-mono p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    ))}
                                    <div className={`text-[10px] font-bold w-8 ${Math.abs(row.reduce((a, b) => a + b, 0) - 1.0) < 0.001 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        = {row.reduce((a, b) => a + b, 0).toFixed(1)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {error && (
                        <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-center font-bold flex items-center justify-center gap-2">
                            <XCircle size={14} /> {error}
                        </div>
                    )}
                </div>

                {/* Power Controls */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Power (n)</span>
                    <input 
                        type="range" 
                        min="1" max="50" 
                        value={power} 
                        onChange={(e) => setPower(parseInt(e.target.value))}
                        disabled={!!error}
                        className="w-32 accent-primary-600"
                    />
                    <div className="text-xl font-black text-primary-600 bg-primary-50 px-4 py-2 rounded-xl">n = {power}</div>
                </div>

                {/* Result Matrix */}
                <div className={`flex-1 space-y-4 w-full transition-opacity ${error ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Result P^{power}</h5>
                    <div className="p-6 bg-primary-50 dark:bg-primary-900/10 rounded-2xl shadow-sm border border-primary-200 dark:border-primary-900/30 relative">
                        <div className="absolute top-0 bottom-0 left-4 w-2 border-l-2 border-t-2 border-b-2 border-primary-300 dark:border-primary-600 rounded-l-lg" />
                        <div className="absolute top-0 bottom-0 right-4 w-2 border-r-2 border-t-2 border-b-2 border-primary-300 dark:border-primary-600 rounded-r-lg" />
                        
                        <div className="flex flex-col gap-4 px-8 relative z-10 text-center font-mono">
                            {resultMatrix.map((row, i) => (
                                <div key={i} className="flex gap-4 justify-center">
                                    {row.map((cell, j) => (
                                        <div key={j} className="w-20 p-2 text-primary-700 dark:text-primary-300 font-bold">
                                            {cell.toFixed(3)}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 text-sm text-slate-600 dark:text-slate-400 italic text-center">
                Increase the power (n) to see how the matrix converges to the stationary distribution. When all rows become identical, the system has reached equilibrium!
            </div>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic6_MarkovMatrix() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Transition Grid" 
                subtitle="Organizing Chaos into Rows and Columns"
                icon={<Grid3X3 className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Activity size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            📊 Taming the Probabilities
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                If you only have two states (Sunny, Rainy), drawing circles and arrows is easy. But what if you are Google, trying to map the transitions between <strong>10 billion web pages</strong>?
                            </p>
                            <p>
                                You can't draw 10 billion circles. You need a data structure. A grid. A <strong>Matrix</strong>.
                            </p>
                            <p>
                                A Markov Matrix (or Transition Matrix) is simply a spreadsheet where the rows represent "Where you are NOW" and the columns represent "Where you go NEXT". By organizing probabilities this way, we allow computers to calculate billions of futures using linear algebra in milliseconds.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Matrix Size">
                            If an environment has N states, its transition matrix will always be an N × N square.
                        </InfoCard>
                        <InfoCard type="tip" title="Rows vs Columns">
                            Row $i$, Column $j$ tells you the probability of jumping from state $i$ to state $j$.
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Stochastic Properties" 
                subtitle="The Rules of the Matrix"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                        <h5 className="text-primary-400 font-bold mb-6 flex items-center gap-2 text-xl">
                            <Grid3X3 size={20} /> The Right Stochastic Matrix
                        </h5>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <MathBlock 
                                formula="\sum_{j=1}^{n} P_{ij} = 1 \quad \forall i"
                                label="Row Sum Property"
                                explanation="The sum of probabilities in any single row must equal exactly 1.0 (100%). You must go somewhere!"
                            />
                            <MathBlock 
                                formula="P_{ij} \geq 0 \quad \forall i, j"
                                label="Non-negativity"
                                explanation="You cannot have a negative probability of transitioning to a state."
                            />
                        </div>
                    </div>

                    <SymbolTable 
                        symbols={[
                            { symbol: 'P', meaning: 'The Transition Matrix.' },
                            { symbol: 'P_{ij}', meaning: 'The entry at row i, column j (Prob of moving from i to j).' },
                            { symbol: 'n', meaning: 'The total number of states in the system.' }
                        ]}
                    />
                </div>
            </SectionWrapper>

            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: The Matrix Validator" 
                subtitle="Spot the Fake Matrix"
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
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Find the Error</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-red-200">
                                <div className="text-center font-mono text-lg mb-2 text-slate-700 dark:text-slate-300">
                                    [ 0.6 , 0.5 ]<br/>
                                    [ 0.2 , 0.8 ]
                                </div>
                                <div className="text-[10px] text-red-500 font-bold text-center">INVALID</div>
                                <p className="text-[10px] text-center mt-1 text-slate-500">Row 1 sums to 1.1! Probabilities can't exceed 100%.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-emerald-200">
                                <div className="text-center font-mono text-lg mb-2 text-slate-700 dark:text-slate-300">
                                    [ 0.3 , 0.7 ]<br/>
                                    [ 1.0 , 0.0 ]
                                </div>
                                <div className="text-[10px] text-emerald-500 font-bold text-center">VALID</div>
                                <p className="text-[10px] text-center mt-1 text-slate-500">Rows sum to 1.0. Row 2 means: "If in state 2, you ALWAYS go to state 1".</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: Traffic Light Predictor" 
                subtitle="Modeling Urban Infrastructure"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> The Mission</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            A smart city needs to predict traffic light states. A light can be Green (1), Yellow (2), or Red (3). It is broken, so it changes randomly, but follows these rules:
                            <br/><br/>
                            1. Green never goes to Red directly. It stays Green (0.4) or goes Yellow (0.6).
                            <br/>
                            2. Yellow always goes to Red (1.0).
                            <br/>
                            3. Red stays Red (0.5) or goes Green (0.5).
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center font-mono overflow-x-auto">
                        <div className="text-xs text-slate-400 mb-4 uppercase tracking-widest font-sans font-bold">The Traffic Light Matrix</div>
                        <table className="mx-auto text-sm border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-2 text-slate-400"></th>
                                    <th className="p-2 text-emerald-500">Green</th>
                                    <th className="p-2 text-amber-500">Yellow</th>
                                    <th className="p-2 text-red-500">Red</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-slate-100 dark:border-slate-700">
                                    <th className="p-3 text-emerald-500 text-left">Green</th>
                                    <td className="p-3">0.4</td>
                                    <td className="p-3 font-bold">0.6</td>
                                    <td className="p-3 text-slate-300 dark:text-slate-600">0.0</td>
                                </tr>
                                <tr className="border-t border-slate-100 dark:border-slate-700">
                                    <th className="p-3 text-amber-500 text-left">Yellow</th>
                                    <td className="p-3 text-slate-300 dark:text-slate-600">0.0</td>
                                    <td className="p-3 text-slate-300 dark:text-slate-600">0.0</td>
                                    <td className="p-3 font-bold">1.0</td>
                                </tr>
                                <tr className="border-t border-slate-100 dark:border-slate-700">
                                    <th className="p-3 text-red-500 text-left">Red</th>
                                    <td className="p-3 font-bold">0.5</td>
                                    <td className="p-3 text-slate-300 dark:text-slate-600">0.0</td>
                                    <td className="p-3">0.5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Matrix Concepts"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'What is a Right Stochastic Matrix?', a: 'A square matrix where all entries are non-negative real numbers, and each row sums to exactly 1.0. This is the standard form used for Markov Chains.' },
                        { q: 'Can a transition matrix have a column that sums to more than 1?', a: 'Yes. The row sums must equal 1 (since you must go somewhere from a given state), but column sums can be anything (many states can lead to the same destination state).' },
                        { q: 'If state A is an "absorbing state", what does its row look like in the matrix?', a: 'The entry P_{AA} will be 1.0, and all other entries in that row will be 0.0. Once you enter the state, you never leave.' }
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
                title="6. Virtual Lab: Matrix Power Calculator" 
                subtitle="Multiply to See the Future"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Edit the 2x2 transition matrix below. As long as the rows sum to 1.0, you can increase the power $n$ to see the $P^n$ matrix. Notice how, at high powers, all rows become identical—revealing the Stationary Distribution!
                    </p>
                    <MatrixPowerLab />
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Matrix Mastered!</h3>
                    <p className="text-primary-100">
                        You've unlocked the core data structure of AI. Ready to see how Machine Learning uses this matrix in the real world?
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: MATRICES IN ML
                    </button>
                </div>
            </div>
        </div>
    );
}
