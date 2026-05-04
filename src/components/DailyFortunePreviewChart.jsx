export default function DailyFortunePreviewChart({ items }) {
  return (
    <div className="fortune-preview-chart" aria-label="五大运势预览">
      {items.map((item) => (
        <div key={item.key} className="fortune-preview-item">
          <div className="fortune-preview-bar-wrap">
            <div
              className={`fortune-preview-bar fortune-preview-${item.key}`}
              style={{ height: `${item.score}%` }}
            />
          </div>
          <div className="fortune-preview-score">{item.score}</div>
          <div className="fortune-preview-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
