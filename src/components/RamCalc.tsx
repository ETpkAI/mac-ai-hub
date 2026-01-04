import React, { useState } from 'react';
import styles from './RamCalc.module.css';

interface Recommendation {
    maxModelSize: string;
    quantization: string;
    examples: string[];
    warning?: string;
}

const recommendations: Record<string, Recommendation> = {
    '8': {
        maxModelSize: '7B',
        quantization: 'Q4_K_M',
        examples: ['Llama 3.1 8B', 'Mistral 7B', 'Gemma 2B'],
        warning: 'Close other apps while running models for best performance.',
    },
    '16': {
        maxModelSize: '13B',
        quantization: 'Q4_K_M',
        examples: ['Llama 3.1 8B', 'Mistral 7B', 'Gemma 2 9B', 'Qwen 2.5 14B'],
    },
    '24': {
        maxModelSize: '20B',
        quantization: 'Q4_K_M or Q5_K_M',
        examples: ['Mixtral 8x7B (MoE)', 'Qwen 2.5 14B', 'CodeLlama 20B'],
    },
    '32': {
        maxModelSize: '30B',
        quantization: 'Q4_K_M or Q5_K_M',
        examples: ['Qwen 2.5 32B', 'DeepSeek Coder 33B', 'Mixtral 8x7B'],
    },
    '64': {
        maxModelSize: '70B',
        quantization: 'Q4_K_M',
        examples: ['Llama 3.1 70B', 'Qwen 2.5 72B', 'Mixtral 8x22B'],
    },
    '128': {
        maxModelSize: '120B+',
        quantization: 'Q4_K_M or higher',
        examples: ['Llama 3.1 70B (Q8)', 'Goliath 120B', 'Command R+ 104B'],
    },
    '192': {
        maxModelSize: '180B+',
        quantization: 'Q5_K_M or Q8_0',
        examples: ['Any model at high quantization', 'Multiple models simultaneously'],
    },
};

export default function RamCalc(): JSX.Element {
    const [selectedRam, setSelectedRam] = useState<string>('16');
    const recommendation = recommendations[selectedRam];

    return (
        <div className={styles.calculator}>
            <div className={styles.header}>
                <h3>🧮 RAM Calculator</h3>
                <p>Select your Mac's unified memory to see recommendations</p>
            </div>

            <div className={styles.selector}>
                <label htmlFor="ram-select">Your Mac's RAM:</label>
                <select
                    id="ram-select"
                    value={selectedRam}
                    onChange={(e) => setSelectedRam(e.target.value)}
                    className={styles.select}
                >
                    <option value="8">8GB (M1/M2/M3 Base)</option>
                    <option value="16">16GB (M1/M2/M3 Pro)</option>
                    <option value="24">24GB (M2/M3 Pro)</option>
                    <option value="32">32GB (M2/M3 Pro/Max)</option>
                    <option value="64">64GB (M2/M3 Max)</option>
                    <option value="128">128GB (M2/M3 Max/Ultra)</option>
                    <option value="192">192GB (M2 Ultra)</option>
                </select>
            </div>

            <div className={styles.results}>
                <div className={styles.resultCard}>
                    <div className={styles.resultLabel}>Maximum Model Size</div>
                    <div className={styles.resultValue}>{recommendation.maxModelSize}</div>
                </div>

                <div className={styles.resultCard}>
                    <div className={styles.resultLabel}>Recommended Quantization</div>
                    <div className={styles.resultValue}>{recommendation.quantization}</div>
                </div>
            </div>

            <div className={styles.examples}>
                <strong>Recommended Models:</strong>
                <ul>
                    {recommendation.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                    ))}
                </ul>
            </div>

            {recommendation.warning && (
                <div className={styles.warning}>
                    ⚠️ {recommendation.warning}
                </div>
            )}

            <div className={styles.note}>
                <strong>Note:</strong> Actual available memory is ~70-80% of total RAM after macOS system usage.
                These recommendations account for system overhead.
            </div>
        </div>
    );
}
