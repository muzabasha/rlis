import React, { useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, RotateCcw } from 'lucide-react';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface LearningUpdateVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
}

type FeedbackType = 'positive' | 'negative' | 'mixed';

const FEEDBACK_COLORS: Record<FeedbackType, string> = {
    positive: 'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40',
    negative: 'text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40',
    mixed: 'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40',
};

const FEEDBACK_ACTIVE_COLORS: Record<FeedbackType, string> = {
    positive: 'bg-emerald-500 text-white border-emerald-500',
    negative: 'bg-red-500 text-white border-red-500',
    mixed: 'bg-amber-500 text-white border-amber-500',
};

export default function LearningUpdateVis({
    formula = "\\theta_{t+1} = \\theta_t + \\alpha \\cdot \\text{Feedback}(P_t, \\text{Critic})",
    label = 'Learning Update Simulation',
    accent = 'blue'
}: LearningUpdateVisProps) {
    const [learningRate, setLearningRate] = useState(0.1);
    const [initialTheta, setInitialTheta] = useState(0);
    const [feedbackType, setFeedbackType] = useState<FeedbackType>('positive');
    const [thetaHistory, setThetaHistory] = useState<{ step: number; theta: number }[]>([{ step: 0, theta: 0 }]);

    const reset = useCallback(() => {
        setThetaHistory([{ step: 0, theta: initialTheta }]);
    }, [initialTheta]);

    const applyStep = useCallback((currentTheta: number) => {
        const magnitude = 0.5 + Math.random() * 1.5;
        let delta: number;
        if (feedbackType === 'positive') {
            delta = learningRate * magnitude;
        } else if (feedbackType === 'negative') {
            delta = -learningRate * magnitude;
        } else {
            delta = (Math.random() > 0.5 ? 1 : -1) * learningRate * magnitude;
        }
        return parseFloat((currentTheta + delta).toFixed(4));
    }, [learningRate, feedbackType]);

    const stepOnce = useCallback(() => {
        const last = thetaHistory[thetaHistory.length - 1];
        const newTheta = applyStep(last.theta);
        const newStep = last.step + 1;
        setThetaHistory(prev => [...prev, { step: newStep, theta: newTheta }]);
    }, [thetaHistory, applyStep]);

    const runTenSteps = useCallback(() => {
        let current = thetaHistory[thetaHistory.length - 1];
        const newEntries: { step: number; theta: number }[] = [];
        let stepNum = current.step;
        for (let i = 0; i < 10; i++) {
            stepNum++;
            const newTheta = applyStep(current.theta);
            newEntries.push({ step: stepNum, theta: newTheta });
            current = { step: stepNum, theta: newTheta };
        }
        setThetaHistory(prev => [...prev, ...newEntries]);
    }, [thetaHistory, applyStep]);

    const currentTheta = useMemo(() => {
        return thetaHistory[thetaHistory.length - 1]?.theta ?? initialTheta;
    }, [thetaHistory, initialTheta]);

    const deltaSinceStart = useMemo(() => {
        return parseFloat((currentTheta - initialTheta).toFixed(4));
    }, [currentTheta, initialTheta]);

    const accentColor = useMemo(() => {
        const map: Record<string, string> = {
            blue: '#3b82f6',
            violet: '#8b5cf6',
            emerald: '#10b981',
            red: '#ef4444',
            amber: '#f59e0b',
        };
        return map[accent] ?? '#3b82f6';
    }, [accent]);

    const handleSliderChange = useCallback((name: string, v: number) => {
        if (name === 'lr') setLearningRate(v);
        if (name === 'initialTheta') setInitialTheta(v);
        reset();
    }, [reset]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'lr', label: 'Learning Rate α', min: 0.01, max: 1.0, step: 0.01, default: 0.1 },
                { name: 'initialTheta', label: 'Initial θ', min: -5, max: 5, step: 0.5, default: 0 },
            ]}
            values={{ lr: learningRate, initialTheta }}
            onSliderChange={handleSliderChange}
        >
            <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                    <div className="flex gap-1">
                        {(Object.keys(FEEDBACK_COLORS) as FeedbackType[]).map(ft => (
                            <button
                                key={ft}
                                onClick={() => { setFeedbackType(ft); reset(); }}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors capitalize ${
                                    feedbackType === ft
                                        ? FEEDBACK_ACTIVE_COLORS[ft]
                                        : FEEDBACK_COLORS[ft]
                                }`}
                            >
                                {ft}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={stepOnce}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        <Play className="w-3 h-3" /> Step
                    </button>
                    <button
                        onClick={runTenSteps}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        Run 10 Steps
                    </button>
                    <button
                        onClick={reset}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                </div>
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        <InlineMath math="\\alpha" /> = {learningRate.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        <InlineMath math="\\theta_0" /> = {initialTheta.toFixed(1)}
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        <InlineMath math="\\theta_t" /> = {currentTheta.toFixed(3)}
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Δ = {deltaSinceStart >= 0 ? '+' : ''}{deltaSinceStart.toFixed(3)}
                    </span>
                </div>
                <div className="flex items-center justify-center gap-4 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500">
                        <InlineMath math="\\theta_{t+1}" /> = <span className="text-slate-700 dark:text-slate-300">{currentTheta.toFixed(3)}</span>
                        {' + '}
                        <span className="text-blue-500">{learningRate.toFixed(2)}</span>
                        {' × '}
                        <span className={`${feedbackType === 'positive' ? 'text-emerald-500' : feedbackType === 'negative' ? 'text-red-500' : 'text-amber-500'}`}>
                            {feedbackType === 'positive' ? '+' : feedbackType === 'negative' ? '−' : '±'}
                            {feedbackType}
                        </span>
                        {' = '}
                        <strong className="text-sm text-slate-800 dark:text-slate-200">
                            {parseFloat((currentTheta + learningRate * (feedbackType === 'positive' ? 1 : feedbackType === 'negative' ? -1 : Math.random() > 0.5 ? 1 : -1)).toFixed(3))}
                        </strong>
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={thetaHistory} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="step" tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Step t', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'θ(t)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} domain={['auto', 'auto']} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="theta" stroke={accentColor} strokeWidth={2} dot={false} name="θ(t)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </EquationGraph>
    );
}
