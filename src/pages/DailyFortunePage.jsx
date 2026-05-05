import { useState } from "react";
import { Link } from "react-router-dom";
import DailyFortuneForm from "../components/DailyFortuneForm.jsx";
import DailyFortuneResult from "../components/DailyFortuneResult.jsx";
import {
  calculateDailyFortune,
  clearDailyFortuneProfile,
  loadDailyFortuneProfile,
  saveDailyFortuneProfile
} from "../data/dailyFortune.js";

export default function DailyFortunePage() {
  const [profile, setProfile] = useState(() => loadDailyFortuneProfile());
  const [isEditing, setIsEditing] = useState(() => !loadDailyFortuneProfile());

  const result = profile && !isEditing ? calculateDailyFortune(profile) : null;

  function handleSave(nextProfile) {
    saveDailyFortuneProfile(nextProfile);
    setProfile(nextProfile);
    setIsEditing(false);
  }

  function handleClear() {
    clearDailyFortuneProfile();
    setProfile(null);
    setIsEditing(true);
  }

  return (
    <main className="container">
      <section className="page active daily-fortune-page">
        <Link className="back-link" to="/assessments">← 返回测试主页</Link>
        <p className="eyebrow">Daily Fortune</p>
        <h1>每日运势</h1>
        <p className="lead">结合星座与八字五行，为你生成每天更新的五类运势参考。</p>
        <p className="note">出生信息仅保存在当前浏览器本地，不会上传。</p>

        {isEditing ? (
          <DailyFortuneForm initialProfile={profile} onSubmit={handleSave} />
        ) : (
          <DailyFortuneResult
            result={result}
            onEdit={() => setIsEditing(true)}
            onClear={handleClear}
          />
        )}
      </section>
    </main>
  );
}
