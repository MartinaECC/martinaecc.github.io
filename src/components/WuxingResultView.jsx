import { getGanWuxing, getZhiWuxing, wuxingLabels } from "../data/wuxing.js";

export default function WuxingResultView({ test, result, onRestart }) {
  const { bazi, scores, yongShen, dayun, analysis } = result;
  const { yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi } = bazi;
  const dayMasterElement = getGanWuxing(dayGan);

  const ganZhiList = [
    { title: "年柱", gan: yearGan, zhi: yearZhi },
    { title: "月柱", gan: monthGan, zhi: monthZhi },
    { title: "日柱", gan: dayGan, zhi: dayZhi, highlight: true },
    { title: "时柱", gan: hourGan, zhi: hourZhi }
  ];

  const sortedScores = [...test.typeOrder]
    .map((key) => ({ key, label: test.typeLabels[key], score: scores[key] }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="wuxing-report">
      <section className="wuxing-section-card wuxing-summary-card">
        <div className="wuxing-section-header wuxing-summary-header">
          <h2>总结</h2>
          <p>{analysis.fullSummary}</p>
        </div>
      </section>

      <section className="wuxing-hero-card wuxing-section-card">
        <div className="wuxing-hero-copy">
          <p className="eyebrow">Structured Five Elements Reading</p>
          <h1>{analysis.summaryTitle}</h1>
          <p className="lead wuxing-hero-lead">{analysis.summaryText}</p>
          <p className="wuxing-hero-note">
            本结果基于传统五行与八字理论的简化模型生成，仅供文化体验与自我观察参考。
          </p>
        </div>

        <div className="wuxing-overview-grid">
          <div className="wuxing-overview-card">
            <span className="label">日主</span>
            <strong className={`value wuxing-${dayMasterElement}`}>{dayGan}</strong>
            <p>{wuxingLabels[dayMasterElement]}日主</p>
          </div>
          <div className="wuxing-overview-card">
            <span className="label">生肖</span>
            <strong className="value">{bazi.zodiac}</strong>
            <p>{bazi.gender === "male" ? "男" : "女"}</p>
          </div>
          <div className="wuxing-overview-card">
            <span className="label">最旺五行</span>
            <strong className={`value wuxing-${yongShen.strongest}`}>{wuxingLabels[yongShen.strongest]}</strong>
            <p>当前显性优势</p>
          </div>
          <div className="wuxing-overview-card">
            <span className="label">喜用五行</span>
            <strong className={`value wuxing-${analysis.supportingElement.key}`}>{analysis.supportingElement.label}</strong>
            <p>建议重点补强</p>
          </div>
        </div>

        <div className="wuxing-meta-strip">
          <span>出生 {bazi.solar.year}-{bazi.solar.month}-{bazi.solar.day}</span>
          <span>{bazi.hour}</span>
        </div>
      </section>

      <section className="wuxing-section-card">
        <div className="wuxing-section-header">
          <h2>八字排盘</h2>
          <p>四柱是本次五行能量解读的排盘依据，日柱位置会额外强调。</p>
        </div>
        <div className="ganzhi-grid wuxing-ganzhi-grid">
          {ganZhiList.map((item) => {
            const ganWu = getGanWuxing(item.gan);
            const zhiWu = getZhiWuxing(item.zhi);

            return (
              <div className={`ganzhi-card wuxing-pillar-card${item.highlight ? " is-highlight" : ""}`} key={item.title}>
                <div className="pillar-title">{item.title}</div>
                <div className="wuxing-pillar-pair">
                  <div className={`gan wuxing-${ganWu}`}>{item.gan}</div>
                  <div className={`zhi wuxing-${zhiWu}`}>{item.zhi}</div>
                </div>
                <div className="wuxing-pillar-tags">
                  <span className={`wuxing-chip wuxing-${ganWu}`}>天干 {wuxingLabels[ganWu]}</span>
                  <span className={`wuxing-chip wuxing-${zhiWu}`}>地支 {wuxingLabels[zhiWu]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="wuxing-section-card">
        <div className="wuxing-section-header">
          <h2>五行能量分布</h2>
          <p>{analysis.distributionText}</p>
        </div>

        <div className="wuxing-score-list wuxing-score-report-list">
          {test.typeOrder.map((key) => {
            const label = test.typeLabels[key];
            const score = scores[key];
            const percent = (score / 8) * 100;

            return (
              <div className="wuxing-score-item wuxing-score-report-item" key={key}>
                <div className="wuxing-score-topline">
                  <div className={`label wuxing-${key}`}>{label}</div>
                  <div className={`score wuxing-${key}`}>{score.toFixed(1)}</div>
                </div>
                <div className="wuxing-score-bar">
                  <div
                    className="wuxing-score-bar-fill"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: `var(--wuxing-${key})`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="wuxing-ranking-list">
          {sortedScores.map((item, index) => (
            <div className="wuxing-ranking-item" key={item.key}>
              <span className="wuxing-ranking-index">0{index + 1}</span>
              <span className={`wuxing-ranking-label wuxing-${item.key}`}>{item.label}</span>
              <span className="wuxing-ranking-score">{item.score.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wuxing-section-card">
        <div className="wuxing-section-header">
          <h2>命局解读</h2>
          <p>以下内容基于日主五行、整体强弱关系和喜用方向做轻专业版解读。</p>
        </div>

        <div className="wuxing-analysis-grid">
          <article className="wuxing-analysis-card">
            <h3>{analysis.dayMasterTraits.title}</h3>
            <p>{analysis.dayMasterTraits.text}</p>
          </article>
          <article className="wuxing-analysis-card">
            <h3>{analysis.energyPattern.title}</h3>
            <p>{analysis.energyPattern.text}</p>
          </article>
          <article className="wuxing-analysis-card">
            <h3>{analysis.workStyle.title}</h3>
            <p>{analysis.workStyle.text}</p>
          </article>
        </div>
      </section>

      <section className="wuxing-section-card">
        <div className="wuxing-section-header">
          <h2>喜用方向</h2>
          <p>
            你的喜用五行是 <span className={`wuxing-inline-tag wuxing-${analysis.supportingElement.key}`}>{analysis.supportingElement.label}</span>，
            当前偏旺方向是 <span className={`wuxing-inline-tag wuxing-${analysis.cautionElement.key}`}>{analysis.cautionElement.label}</span>。
          </p>
        </div>

        <div className="wuxing-support-banner">
          <div>
            <strong>补强重点</strong>
            <p>把生活和行动慢慢调向 {analysis.supportingElement.label} 的节奏，会更有助于整体平衡。</p>
          </div>
          <div>
            <strong>避免走偏</strong>
            <p>{analysis.cautionElement.text}</p>
          </div>
        </div>

        <div className="wuxing-guidance-grid">
          {analysis.supportingElement.recommendations.map((item) => (
            <article className="wuxing-guidance-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wuxing-section-card">
        <div className="wuxing-section-header">
          <h2>发展建议</h2>
          <p>把命局倾向翻译成现实生活中的发力方向，重点看你更适合怎样调整状态与节奏。</p>
        </div>

        <div className="wuxing-life-grid">
          {analysis.lifeGuidance.map((item) => (
            <article className="wuxing-life-card" key={item.key}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wuxing-section-card">
        <div className="wuxing-section-header">
          <h2>大运参考</h2>
          <p>{analysis.dayunSummary}</p>
        </div>

        <div className="dayun-list wuxing-dayun-list">
          {dayun.map((item, index) => (
            <div className={`dayun-item wuxing-dayun-item${index === 0 ? " is-current" : ""}`} key={`${item.ganZhi}-${item.startYear}`}>
              <div className="age">{item.age}岁起</div>
              <div className={`ganzhi wuxing-${getGanWuxing(item.ganZhi[0])}`}>{item.ganZhi}</div>
              <div className="age">{item.startYear}年开始</div>
            </div>
          ))}
        </div>
      </section>

      <div className="navigation">
        <button className="btn primary-btn" onClick={onRestart}>重新测算</button>
        <a className="btn secondary-btn" href="/">返回主页</a>
      </div>

      <p className="disclaimer">
        本测试基于传统八字理论的简化五行模型，仅供娱乐与文化体验参考。
      </p>
    </div>
  );
}
