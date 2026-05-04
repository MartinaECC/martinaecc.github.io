import { Link } from "react-router-dom";

export default function ComingSoonPage({ test }) {
    return (
        <main className="container">
            <section className="page active teaser-page">
                <Link className="back-link" to="/">← 返回测试主页</Link>
                <p className="eyebrow">BFTI Wealth Type Indicator</p>
                <h1>{test?.title || "测试筹备中"}</h1>
                <p className="lead">暴富TI正在筹备中。未来这里会测试你的暴富人格、财富直觉、搞钱姿势和风险偏好。</p>

                <div className="teaser-panel">
                    <span className="test-icon">{test?.icon || "✨"}</span>
                    <h2>即将上线</h2>
                    <p>这个位置已经预留好，后续只需要补充题库、计分规则和结果画像。</p>
                </div>

                <Link className="btn primary-btn" to="/">返回首页</Link>
            </section>
        </main>
    );
}
