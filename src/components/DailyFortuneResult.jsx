import { Link } from "react-router-dom";

export default function DailyFortuneResult({ result, onEdit, onClear }) {
  const { dateLabel, zodiac, bazi, summary, categories } = result;

  return (
    <>
      <div className="fortune-hero-card">
        <div>
          <p className="eyebrow">{dateLabel}</p>
          <h2>今日{result.zodiac.label}运势</h2>
          <p className="lead">
            {summary.text}
          </p>
          {summary.caution && (
            <p className="note fortune-caution">
              <strong>今日提醒：</strong>{summary.caution}
            </p>
          )}
        </div>
        <div className="fortune-score-box">
          <div className="fortune-score">{summary.score}</div>
          <div className="fortune-score-level">{summary.level}</div>
        </div>
      </div>

      <div className="fortune-meta-grid">
        <div className="fortune-meta-item">
          <div className="label">星座</div>
          <div className="value">{zodiac.label} ({zodiac.element})</div>
        </div>
        <div className="fortune-meta-item">
          <div className="label">日主</div>
          <div className={`value wuxing-${bazi.dayMasterElementKey}`}>{bazi.dayMaster} ({bazi.dayMasterElement})</div>
        </div>
        <div className="fortune-meta-item">
          <div className="label">今日干支</div>
          <div className={`value wuxing-${bazi.todayGanElementKey}`}>{bazi.todayGanZhi}</div>
        </div>
        <div className="fortune-meta-item">
          <div className="label">今日五行</div>
          <div className={`value wuxing-${bazi.todayGanElementKey}`}>{bazi.todayGanElement}</div>
        </div>
      </div>

      <h2 style={{ margin: '32px 0 16px', fontFamily: 'var(--font-serif)' }}>分项运势</h2>
      <div className="fortune-grid">
        {categories.map(cat => (
          <div key={cat.key} className="fortune-card-item">
            <h3>{cat.label} <span className="fortune-score-sm">· {cat.score}</span></h3>
            <p style={{ margin: '8px 0', color: 'var(--muted)' }}>{cat.text}</p>
            <div className="fortune-keywords">
              {cat.keywords.map(kw => (
                <span key={kw}>{kw}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="navigation">
        <button className="btn secondary-btn" onClick={onEdit}>修改生日信息</button>
        <button className="btn secondary-btn" onClick={onClear}>清除本地资料</button>
        <Link className="btn primary-btn" to="/">返回主页</Link>
      </div>

      <p className="disclaimer">
        本运势仅供娱乐参考，命运掌握在你自己手中。
      </p>
    </>
  );
}
