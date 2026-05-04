import TestCard from "../components/TestCard.jsx";
import { tests } from "../data/tests.js";

export default function HomePage() {
    return (
        <main className="container home-shell">
            <section className="landing-hero">
                <div className="landing-copy">
                    <p className="eyebrow">Assessment Library</p>
                    <h1>测试小宇宙</h1>
                    <p className="lead">一组温和而有结构的自我探索测试，帮助你理解性格、动机与行动模式。</p>
                    <p className="small-note">测试结果仅用于自我观察，不替代专业心理评估。</p>
                </div>
                <aside className="hero-aside" aria-label="产品说明">
                    <strong>为探索自己的人设计</strong>
                    <p>每个测试都会尽量保持清晰的题目结构、透明的结果解释，以及不过度标签化的表达。</p>
                </aside>
            </section>

            <section className="test-grid" aria-label="测试列表">
                {tests.map((test) => (
                    <TestCard key={test.id} test={test} />
                ))}
            </section>
        </main>
    );
}
