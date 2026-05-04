import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function ResultView({ test, scores, onRestart }) {
    const canvasRef = useRef(null);
    const dominantType = [...test.typeOrder].sort((a, b) => scores[b] - scores[a])[0];
    const profile = test.profiles[dominantType];
    const maxScore = Math.max(...test.typeOrder.map((type) => scores[type]));

    useEffect(() => {
        const chart = new Chart(canvasRef.current, {
            type: "radar",
            data: {
                labels: test.typeOrder.map((type) => test.typeLabels[type]),
                datasets: [{
                    label: "性格维度得分",
                    data: test.typeOrder.map((type) => scores[type]),
                    backgroundColor: "rgba(207,111,59,.18)",
                    borderColor: "#cf6f3b",
                    pointBackgroundColor: test.typeOrder.map((type) => test.profiles[type].color),
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
            <h1>你的测试结果</h1>
            <div className="result-chart"><canvas ref={canvasRef}></canvas></div>
            <div className="hero-result" style={{ background: `linear-gradient(135deg, ${profile.color}, #3d2f29)` }}>
                <h2>{profile.icon} {profile.name}</h2>
                <p>{profile.tagline}</p>
            </div>

            <div className="description-grid">
                <div className="description-card"><h3>性格概览</h3><p>{profile.summary}</p></div>
                <div className="description-card"><h3>主要优势</h3><p>{profile.strengths}</p></div>
                <div className="description-card"><h3>适合场景</h3><p>{profile.roles}</p></div>
            </div>
            <div className="description-card advice-card"><h3>沟通建议</h3><p>{profile.advice}</p></div>

            <div className="score-list">
                {test.typeOrder.map((type) => {
                    const item = test.profiles[type];
                    const width = maxScore === 0 ? 0 : Math.round((scores[type] / maxScore) * 100);

                    return (
                        <div className="score-card" key={type}>
                            <h3>{item.icon} {test.typeLabels[type]}</h3>
                            <strong style={{ color: item.color }}>{scores[type]}</strong>
                            <p>{item.tagline}</p>
                            <div className="score-bar"><span style={{ width: `${width}%`, background: item.color }}></span></div>
                        </div>
                    );
                })}
            </div>

            <button className="btn primary-btn" onClick={onRestart}>重新测试</button>
        </>
    );
}
