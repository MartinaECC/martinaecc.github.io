import { useState } from "react";
import { Link } from "react-router-dom";
import DailyFortuneHomeCard from "../components/DailyFortuneHomeCard.jsx";
import TestCard from "../components/TestCard.jsx";
import { tests } from "../data/tests.js";
import {
  getDailyFortuneHomeSummary,
  getDailyFortunePreview,
  loadDailyFortuneProfile,
  saveDailyFortuneProfile
} from "../data/dailyFortune.js";
import { AppShell } from "./AppPrototypePage.jsx";

export default function AssessmentsAppPage() {
  const [profile, setProfile] = useState(() => loadDailyFortuneProfile());
  const [isEditingDaily, setIsEditingDaily] = useState(() => !loadDailyFortuneProfile());
  const previewItems = getDailyFortunePreview(profile);
  const homeSummary = getDailyFortuneHomeSummary(profile);

  function handleDailyFortuneSave(nextProfile) {
    saveDailyFortuneProfile(nextProfile);
    setProfile(nextProfile);
    setIsEditingDaily(false);
  }

  return (
    <AppShell activeTab="home" screenClassName="assessments-app-screen">
      <div className="app-tab-page assessments-app-page">
        <header className="assessments-app-header">
          <Link className="assessments-back" to="/">返回</Link>
          <div>
            <p>Assessment Library</p>
            <h1>优测小宇宙</h1>
            <span>为探索自己的人设计</span>
          </div>
        </header>

        <section className="assessment-orbit-card">
          <div className="assessment-orbit-visual" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>一组温和而有结构的自我探索测试，帮助你理解性格、动机与行动模式。</p>
          <small>测试结果仅用于自我观察，不替代专业心理评估。</small>
        </section>

        <section className="assessments-app-module">
          <DailyFortuneHomeCard
            profile={profile}
            isEditing={isEditingDaily}
            previewItems={previewItems}
            homeSummary={homeSummary}
            onStartEdit={() => setIsEditingDaily(true)}
            onSubmit={handleDailyFortuneSave}
          />
        </section>

        <section className="assessments-app-module">
          <div className="assessments-module-heading">
            <div>
              <p>Assessments</p>
              <h2>个性测试</h2>
            </div>
            <span>从不同主题开始观察自己</span>
          </div>

          <div className="assessments-app-grid">
            {tests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
