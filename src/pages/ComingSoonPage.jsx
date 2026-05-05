import { Link } from "react-router-dom";

export default function ComingSoonPage({ test }) {
    return (
        <main className="container">
            <section className="page active teaser-page">
                <Link className="back-link" to="/assessments">← 返回测试主页</Link>
                <p className="eyebrow">BFTI Wealth Type Indicator</p>
                <h1>{test?.title || "测试筹备中"}</h1>
                <p className="lead">BFTI 正在设计中。它会从财富动机、风险感受、行动节奏和资源整合方式出发，帮助你观察自己的财富相关行为模式。</p>

                <div className="teaser-panel">
                    <span className="status-pill soon">筹备中</span>
                    <h2>正在筹备题库与结果模型</h2>
                    <p>这个位置已经预留好，后续会补充 BFTI 的题库、计分规则和结果画像，再开放正式测试。</p>
                </div>

                <Link className="btn primary-btn" to="/assessments">返回首页</Link>
            </section>
        </main>
    );
}
