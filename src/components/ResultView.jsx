import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function ResultView({ test, scores, onRestart }) {
    const canvasRef = useRef(null);

    const actualScores = scores.scores || scores;
    const bftiType = scores.type;
    const isBfti = Boolean(bftiType);
    const dominantType = bftiType || [...test.typeOrder].sort((a, b) => actualScores[b] - actualScores[a])[0];
    const profile = bftiType ? test.profiles[bftiType] : test.profiles[dominantType];
    const maxScore = Math.max(...test.typeOrder.map((type) => actualScores[type]));

    useEffect(() => {
        const chart = new Chart(canvasRef.current, {
            type: "radar",
            data: {
                labels: test.typeOrder.map((type) => test.typeLabels[type]),
                 datasets: [{
                 label: isBfti ? "财富维度得分" : "性格维度得分",
                 data: test.typeOrder.map((type) => actualScores[type]),
                 backgroundColor: "rgba(111, 131, 114, 0.16)",
                 borderColor: "#6f8372",
                 pointBackgroundColor: test.typeOrder.map((type) => test.profiles[type]?.color || "#6f8372"),
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
            <h1>{isBfti ? "你的暴富人格" : "你的测试结果"}</h1>
            <div className="result-layout">
                <div className="result-summary">
                    {isBfti ? (
                        profile.icon && <span className="type-icon">{profile.icon}</span>
                    ) : (
                        <span className={`type-marker ${dominantType}`}>{test.typeLabels[dominantType].slice(0, 1)}</span>
                    )}
                    <p className="eyebrow">{isBfti ? bftiType : "Primary Pattern"}</p>
                    <h2>{profile.name}</h2>
                    <p>{isBfti ? profile.nickname : profile.tagline}</p>
                    <p className="disclaimer">{isBfti ? "这个结果描述的是你当前的财富状态，未来掌握在你自己手中！" : "这个结果描述的是你在本次作答中呈现出的主要倾向，不代表固定不变的人格标签。"}</p>
                </div>
                <div className="result-chart"><canvas ref={canvasRef}></canvas></div>
            </div>

            {isBfti ? (
                <div className="description-grid">
                    <div className="description-card"><h3>扎心现状</h3><p>{profile.status}</p></div>
                    <div className="description-card"><h3>暴富预言</h3><p>{profile.prediction}</p></div>
                </div>
            ) : (
                <>
                    <div className="description-grid">
                        <div className="description-card"><h3>性格概览</h3><p>{profile.summary}</p></div>
                        <div className="description-card"><h3>主要优势</h3><p>{profile.strengths}</p></div>
                        <div className="description-card"><h3>适合场景</h3><p>{profile.roles}</p></div>
                    </div>
                    <div className="description-card advice-card"><h3>沟通建议</h3><p>{profile.advice}</p></div>
                </>
            )}

            <div className="score-list">
                {test.typeOrder.map((type) => {
                    const item = test.profiles[type];
                    const itemLabel = test.typeLabels[type];
                    const width = maxScore === 0 ? 0 : Math.round((actualScores[type] / maxScore) * 100);
                    const defaultColor = "#6f8372";
                    const color = item?.color || defaultColor;

                    return (
                        <div className="score-card" key={type}>
                            <h3>{itemLabel}</h3>
                            <strong style={{ color }}>{actualScores[type]}</strong>
                            {item?.tagline && <p>{item.tagline}</p>}
                            <div className="score-bar"><span style={{ width: `${width}%`, background: color }}></span></div>
                        </div>
                    );
                })}
            </div>

            <button className="btn primary-btn" onClick={onRestart}>重新测试</button>
        </>
    );
}
