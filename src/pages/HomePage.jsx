import TestCard from "../components/TestCard.jsx";
import { tests } from "../data/tests.js";

export default function HomePage() {
    return (
        <main className="container home-shell">
            <section className="landing-hero">
                <p className="eyebrow">MartinaECC Tests</p>
                <h1>测试宇宙</h1>
                <p className="lead">性格、暴富、脑洞和自我探索测试集合。先从一个小测试开始，看看今天的你是哪种隐藏设定。</p>
            </section>

            <section className="test-grid" aria-label="测试列表">
                {tests.map((test) => (
                    <TestCard key={test.id} test={test} />
                ))}
            </section>
        </main>
    );
}
