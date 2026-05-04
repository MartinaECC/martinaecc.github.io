import { useState } from "react";
import TestCard from "../components/TestCard.jsx";
import DailyFortuneHomeCard from "../components/DailyFortuneHomeCard.jsx";
import { tests } from "../data/tests.js";
import {
  getDailyFortuneHomeSummary,
  getDailyFortunePreview,
  loadDailyFortuneProfile,
  saveDailyFortuneProfile
} from "../data/dailyFortune.js";

export default function HomePage() {
    const [profile, setProfile] = useState(() => loadDailyFortuneProfile());
    const [isEditingDaily, setIsEditingDaily] = useState(() => !loadDailyFortuneProfile());
    const previewItems = getDailyFortunePreview(profile);
    const homeSummary = getDailyFortuneHomeSummary(profile);

    function handleDailyFortuneSave(nextProfile) {
      saveDailyFortuneProfile(nextProfile);
      setProfile(nextProfile);
      setIsEditingDaily(false);
    }

    function handleDailyFortuneEdit() {
      setIsEditingDaily(true);
    }

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

            <section className="home-feature-section" aria-label="每日运势模块">
                <DailyFortuneHomeCard
                  profile={profile}
                  isEditing={isEditingDaily}
                  previewItems={previewItems}
                  homeSummary={homeSummary}
                  onStartEdit={handleDailyFortuneEdit}
                  onSubmit={handleDailyFortuneSave}
                />
            </section>

            <section className="section-heading test-section-heading" aria-label="测试模块">
                <p className="eyebrow">Assessments</p>
                <h2>测试</h2>
                <p className="lead">从不同主题开始观察自己</p>
            </section>

            <section className="test-grid" aria-label="测试列表">
                {tests.map((test) => (
                    <TestCard key={test.id} test={test} />
                ))}
            </section>
        </main>
    );
}
