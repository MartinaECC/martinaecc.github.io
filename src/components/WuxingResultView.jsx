import { getGanWuxing, getZhiWuxing, wuxingLabels } from "../data/wuxing.js";

export default function WuxingResultView({ test, result, onRestart }) {
  const { bazi, scores, yongShen, dayun } = result;
  const { yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi } = bazi;

  const ganZhiList = [
    { title: "年柱", gan: yearGan, zhi: yearZhi },
    { title: "月柱", gan: monthGan, zhi: monthZhi },
    { title: "日柱", gan: dayGan, zhi: dayZhi },
    { title: "时柱", gan: hourGan, zhi: hourZhi },
  ];

  return (
    <>
      <h1>测算结果</h1>

      {/* 基本信息 */}
      <div className="basic-info">
        <div className="info-item">
          <div className="label">生肖</div>
          <div className="value">{bazi.zodiac}</div>
        </div>
        <div className="info-item">
          <div className="label">日主</div>
          <div className={`value wuxing-${getGanWuxing(dayGan)}`}>{dayGan}</div>
        </div>
        <div className="info-item">
          <div className="label">性别</div>
          <div className="value">{bazi.gender === 'male' ? '男' : '女'}</div>
        </div>
        <div className="info-item">
          <div className="label">出生</div>
          <div className="value">{bazi.solar.year}-{bazi.solar.month}-{bazi.solar.day}</div>
        </div>
      </div>

      {/* 八字四柱展示 */}
      <h2 style={{margin: '24px 0 12px', fontFamily: 'var(--font-serif)'}}>八字排盘</h2>
      <div className="ganzhi-grid">
        {ganZhiList.map((item, idx) => {
          const ganWu = getGanWuxing(item.gan);
          const zhiWu = getZhiWuxing(item.zhi);
          return (
            <div className="ganzhi-card" key={idx}>
              <div className="pillar-title">{item.title}</div>
              <div className={`gan wuxing-${ganWu}`}>{item.gan}</div>
              <div className={`zhi wuxing-${zhiWu}`}>{item.zhi}</div>
              <div className={`wuxing-name wuxing-${ganWu}`}>
                {wuxingLabels[ganWu]}
              </div>
            </div>
          );
        })}
      </div>

      {/* 五行能量分数 */}
      <h2 style={{margin: '24px 0 12px', fontFamily: 'var(--font-serif)'}}>五行能量分布</h2>
      <div className="wuxing-score-list">
        {test.typeOrder.map((key) => {
          const label = test.typeLabels[key];
          const score = scores[key];
          const maxScore = 8;
          const percent = (score / maxScore) * 100;
          return (
            <div className="wuxing-score-item" key={key}>
              <div className={`label wuxing-${key}`} style={{fontWeight: 700}}>{label}</div>
              <div className={`score wuxing-${key}`}>{score.toFixed(1)}</div>
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

      {/* 五行喜用分析 */}
      <div className="xiyong-card">
        <div className="xiyong-title">五行喜用分析</div>
        <p style={{margin: '0 0 12px', color: 'var(--muted)'}}>
          根据八字五行能量分布，你的五行能量偏重点如下：
        </p>
        <div style={{marginBottom: 12}}>
          <strong>能量最旺：</strong>
          <span className="xiyong-tag" style={{backgroundColor: `var(--wuxing-${yongShen.strongest})`, marginLeft: 8}}>
            {wuxingLabels[yongShen.strongest]}
          </span>
        </div>
        <div>
          <strong>喜用五行：</strong>
          {yongShen.xiYong.map(key => (
            <span key={key} className="xiyong-tag" style={{backgroundColor: `var(--wuxing-${key})`, marginLeft: 8}}>
              {wuxingLabels[key]}
            </span>
          ))}
        </div>
        <p style={{marginTop: 16, marginBottom: 0, color: 'var(--muted)', fontSize: 0.9}}>
          八字命理仅供参考，命运始终掌握在你自己手中。
        </p>
      </div>

      {/* 大运展示 */}
      <h2 style={{margin: '24px 0 12px', fontFamily: 'var(--font-serif)'}}>近五步大运</h2>
      <div className="dayun-list">
        {dayun.map((item, idx) => (
          <div className="dayun-item" key={idx}>
            <div className="age">{item.age}岁起</div>
            <div className={`ganzhi wuxing-${getGanWuxing(item.ganZhi[0])}`}>{item.ganZhi}</div>
            <div className="age">{item.startYear}年开始</div>
          </div>
        ))}
      </div>

      <div className="navigation">
        <button className="btn primary-btn" onClick={onRestart}>重新测算</button>
        <a className="btn secondary-btn" href="/">返回主页</a>
      </div>

      <p className="disclaimer">
        本测试基于传统八字理论，仅供娱乐参考。
      </p>
    </>
  );
}