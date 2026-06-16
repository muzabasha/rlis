import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EquationGraph from './EquationGraph';
import { InlineMath } from 'react-katex';

interface LossCurveVisProps {
    formula?: string;
    label?: string;
    accent?: 'blue' | 'violet' | 'emerald' | 'red' | 'amber';
    type?: 'mse' | 'dqn';
}

export default function LossCurveVis({
    formula = "\\mathcal{L}(\\theta) = \\frac{1}{N}\\sum_{i=1}^N (y_i - f_\\theta(x_i))^2",
    label = 'Loss Function',
    accent = 'blue',
    type = 'mse'
}: LossCurveVisProps) {
    const [learningRate, setLearningRate] = useState(0.01);
    const [noise, setNoise] = useState(0.1);

    const lossData = useMemo(() => {
        const data: { epoch: number; trainLoss: number; valLoss: number }[] = [];
        let train = 2.0;
        let val = 2.1;
        for (let epoch = 0; epoch < 100; epoch++) {
            train -= learningRate * (train + noise * (Math.random() - 0.5));
            val = train + 0.3 + 0.5 * Math.sin(epoch * 0.1) * noise;
            if (train < 0.01) train = 0.01;
            if (val < 0.01) val = 0.01;
            data.push({ epoch, trainLoss: parseFloat(train.toFixed(4)), valLoss: parseFloat(val.toFixed(4)) });
        }
        return data;
    }, [learningRate, noise]);

    return (
        <EquationGraph
            formula={formula}
            label={label}
            accent={accent}
            sliders={[
                { name: 'lr', label: 'Learning Rate', min: 0.001, max: 0.1, step: 0.001, default: 0.01 },
                { name: 'noise', label: 'Noise Level', min: 0, max: 0.5, step: 0.01, default: 0.1 },
            ]}
            values={{ lr: learningRate, noise }}
            onSliderChange={(name, v) => {
                if (name === 'lr') setLearningRate(v);
                if (name === 'noise') setNoise(v);
            }}
        >
            <div className="space-y-3">
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        LR = {learningRate}
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50">
                        Final Train Loss ≈ {lossData[lossData.length - 1]?.trainLoss.toFixed(3)}
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lossData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="epoch" tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Epoch', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} label={{ value: 'Loss', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" strokeWidth={2} dot={false} name="Training Loss" />
                        <Line type="monotone" dataKey="valLoss" stroke="#f59e0b" strokeWidth={2} dot={false} name="Validation Loss" strokeDasharray="4 4" />
                    </LineChart>
                </ResponsiveContainer>
                {type === 'dqn' && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        DQN Loss: <InlineMath math="\\mathcal{L}(\\theta) = \\mathbb{E}[(r + \\gamma \\max Q(s',a';\\theta^-) - Q(s,a;\\theta))^2]" />
                        — the TD error squared. Lower LR = more stable but slower convergence.
                    </p>
                )}
                {type === 'mse' && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        MSE Loss: <InlineMath math="\\frac{1}{N}\\sum(y_i - \\hat{y}_i)^2" /> — penalizes large errors quadratically.
                        High LR = fast initial drop but may oscillate.
                    </p>
                )}
            </div>
        </EquationGraph>
    );
}
