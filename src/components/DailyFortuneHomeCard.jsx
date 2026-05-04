import { Link } from "react-router-dom";
import DailyFortuneForm from "./DailyFortuneForm.jsx";
import DailyFortunePreviewChart from "./DailyFortunePreviewChart.jsx";

export default function DailyFortuneHomeCard({
  profile,
  isEditing,
  previewItems,
  homeSummary,
  onStartEdit,
  onSubmit
}) {
  return (
    <div className="daily-home-card">
      <div className="daily-home-card-body">
        <p className="eyebrow">Daily Fortune</p>
        <h2>每日运势</h2>
        {isEditing ? (
          <>
            <p className="daily-home-description">填写您的生日看看今日运势</p>
            <DailyFortuneForm
              initialProfile={profile}
              onSubmit={onSubmit}
              compact
              hideBackLink
              submitLabel="保存并查看今日运势"
            />
          </>
        ) : profile ? (
          <>
            <p className="daily-home-status">已保存生日信息</p>
            <p className="daily-home-description">
              {homeSummary}
            </p>
            <div className="daily-home-actions">
              <Link className="btn daily-fortune-cta" to="/daily-fortune">
                <span className="daily-fortune-cta-bg"></span>
                <span className="daily-fortune-cta-label">查看今日运势</span>
              </Link>
              <button className="btn secondary-btn daily-home-edit-desktop" type="button" onClick={onStartEdit}>
                修改资料 <span className="edit-arrow">→</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="daily-home-description">
              结合星座与八字五行，每天生成今日运势参考。信息仅保存在本地，不会上传。
            </p>
          </>
        )}
      </div>
      <aside className="daily-home-visual" aria-label="五大运势预览">
        <DailyFortunePreviewChart items={previewItems} />
      </aside>
      {profile && (
        <div className="daily-home-edit-action">
          <button type="button" onClick={onStartEdit}>修改资料 <span className="edit-arrow">→</span></button>
        </div>
      )}
    </div>
  );
}
