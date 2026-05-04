import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function ResultView({ test, scores, onRestart }) {
    const canvasRef = useRef(null);
    
    // Handle BFTI format: scores is { scores, type }
    const actualScores = scores.scores || scores;
    const bftiType = scores.type;
    const dominantType = bftiType || [...test.typeOrder].sort((a, b) => actualScores[b] - actualScores[a])[0];
    const profile = bftiType ? test.profiles[bftiType] : test.profiles[dominantType];
    const maxScore = Math.max(...test.typeOrder.map((type) => actualScores[type]));

    useEffect(() => {
        const chart = new Chart(canvasRef.current, {
            type: "radar",
            data: {
                labels: test.typeOrder.map((type) => test.typeLabels[type]),
                 datasets: [{
                 label: "财富维度得分",
                 data: test.typeOrder.map((type) => actualScores[type]),
                 backgroundColor: "rgba(111, 131, 114, 0.16)",
                 borderColor: "#6f8372",
                 pointBackgroundColor: test.typeOrder.map((type) => {
                     // For BFTI, dimensions don't have colors, use default
                     return test.profiles[type]?.color || "#6f8372";
                 }),
                 pointBorderColor: "#fff",
                 pointRadius: 5,
                 borderWidth: 3
             }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: { stepSize: 2 },
                        pointLabels: { font: { size: 14, weight: "bold" } }
                    }
                }
            }
        });

        return () => chart.destroy();
    }, [scores, test]);

    return (
        <>
            <h1>你的暴富人格</h1>
            <div className="result-layout">
                <div className="result-summary">
                    {profile.icon && <span className="type-icon">{profile.icon}</span>}
                    <p className="eyebrow">{bftiType || 'BFTI Type'}</p>
                    <h2>{profile.name}</h2>
                    {profile.nickname && <p className="nickname">{profile.nickname}</p>}
                    <p className="disclaimer">这个结果描述的是你当前的财富状态，未来掌握在你自己手中！</p>
                </div>
                <div className="result-chart"><canvas ref={canvasRef}></canvas></div>
            </div>

            <div className="description-grid">
                <div className="description-card">
                    <h3>💔 现状</h3>
                    <p>{profile.status || profile.summary}</p>
                </div>
                <div className="description-card">
                    <h3>🔮 暴富预言</h3>
                    <p>{profile.prediction || profile.strengths}</p>
                </div>
            </div>

            <div className="score-list">
                {test.typeOrder.map((type) => {
                    const itemLabel = test.typeLabels[type];
                    const width = maxScore === 0 ? 0 : Math.round((actualScores[type] / maxScore) * 100);
                    const defaultColor = "#6f8372";
                    const color = test.profiles[type]?.color || defaultColor;

                    return (
                        <div className="score-card" key={type}>
                            <h3>{itemLabel}</h3>
                            <strong style={{ color }}>{actualScores[type]}</strong>
                            <div className="score-bar"><span style={{ width: `${width}%`, background: color }}></span></div>
                        </div>
                    );
                })}
            </div>

            <button className="btn primary-btn" onClick={onRestart}>重新测试</button>
        </>
    );
}
