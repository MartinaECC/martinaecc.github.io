import TestCard from "../components/TestCard.jsx";
import { tests } from "../data/tests.js";

export default function HomePage() {
    return (
        <main className="container home-shell">
            <section className="landing-hero">
                <div className="landing-copy">
                    <p className="eyebrow">Assessment Library</p>
                    <h1>优测小宇宙</h1>
                    <p className="lead">一组温和而有结构的自我探索测试，帮助你理解性格、动机与行动模式。</p>
                    <p className="small-note">测试结果仅用于自我观察，不替代专业心理评估。</p>
                </div>
                <aside className="hero-illustration" aria-label="自我探索插画">
                    <div className="orbit-map">
                        <span className="orbit orbit-one"></span>
                        <span className="orbit orbit-two"></span>
                        <span className="orbit orbit-three"></span>
                        <span className="core-dot"></span>
                        <span className="signal signal-a"></span>
                        <span className="signal signal-b"></span>
                        <span className="signal signal-c"></span>
                    </div>
                    <div className="reflection-card">
                        <span className="reflection-line long"></span>
                        <span className="reflection-line medium"></span>
                        <span className="reflection-line short"></span>
                    </div>
                    <div className="hero-aside">
                        <strong>为探索自己的人设计</strong>
                        <p>每个测试都会尽量保持清晰的题目结构、透明的结果解释，以及不过度标签化的表达。</p>
                    </div>
                </aside>
            </section>

            <section className="section-heading" aria-label="测试目录说明">
                <p className="eyebrow">Available Assessments</p>
                <h2>从一个主题开始观察自己</h2>
            </section>

            <section className="test-grid" aria-label="测试列表">
                {tests.map((test) => (
                    <TestCard key={test.id} test={test} />
                ))}
            </section>
        </main>
    );
}
