import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DailyFortuneForm({
  initialProfile,
  onSubmit,
  compact = false,
  hideBackLink = false,
  submitLabel = "保存并查看运势"
}) {
  const defaultYear = new Date().getFullYear() - 20;
  const [form, setForm] = useState({
    year: initialProfile?.year || defaultYear,
    month: initialProfile?.month || 1,
    day: initialProfile?.day || 1,
    hour: initialProfile?.hour || 11,
    minute: initialProfile?.minute || 0,
    gender: initialProfile?.gender || null
  });

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  const daysCount = getDaysInMonth(form.year, form.month);

  useEffect(() => {
    if (form.day > daysCount) {
      setForm(prev => ({ ...prev, day: daysCount }));
    }
  }, [form.year, form.month, form.day, daysCount]);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function generateYearOptions() {
    const years = [];
    for (let y = 1900; y <= 2030; y++) {
      years.push(y);
    }
    return years;
  }

  function generateMonthOptions() {
    const months = [];
    for (let m = 1; m <= 12; m++) {
      months.push(m);
    }
    return months;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.gender) {
      alert("请选择性别。");
      return;
    }
    onSubmit({ ...form });
  }

  return (
    <div className="wuxing-form-container">
      <form className={`birth-form ${compact ? "birth-form-compact" : ""}`} onSubmit={handleSubmit}>
        <div className="birth-form-group">
          <label>年份</label>
          <select value={form.year} onChange={(e) => handleChange('year', parseInt(e.target.value))}>
            {generateYearOptions().map(y => <option key={y} value={y}>{y}年</option>)}
          </select>
        </div>

        <div className="birth-form-group">
          <label>月份</label>
          <select value={form.month} onChange={(e) => handleChange('month', parseInt(e.target.value))}>
            {generateMonthOptions().map(m => <option key={m} value={m}>{m}月</option>)}
          </select>
        </div>

        <div className="birth-form-group">
          <label>日期</label>
          <select value={form.day} onChange={(e) => handleChange('day', parseInt(e.target.value))}>
            {Array.from({ length: daysCount }, (_, i) => i + 1).map(d =>
              <option key={d} value={d}>{d}日</option>
            )}
          </select>
        </div>

        <div className="birth-form-group">
          <label>时辰</label>
          <select
            value={form.hour}
            onChange={(e) => {
              const hour = parseInt(e.target.value);
              handleChange('hour', hour);
              handleChange('minute', 0);
            }}
          >
            <option value={23}>子时 (23:00-01:00)</option>
            <option value={1}>丑时 (01:00-03:00)</option>
            <option value={3}>寅时 (03:00-05:00)</option>
            <option value={5}>卯时 (05:00-07:00)</option>
            <option value={7}>辰时 (07:00-09:00)</option>
            <option value={9}>巳时 (09:00-11:00)</option>
            <option value={11}>午时 (11:00-13:00)</option>
            <option value={13}>未时 (13:00-15:00)</option>
            <option value={15}>申时 (15:00-17:00)</option>
            <option value={17}>酉时 (17:00-19:00)</option>
            <option value={19}>戌时 (19:00-21:00)</option>
            <option value={21}>亥时 (21:00-23:00)</option>
          </select>
        </div>

        <div className="birth-form-group full-width">
          <div className="gender-group">
            <button
              type="button"
              className={"gender-btn " + (form.gender === 'male' ? 'selected' : '')}
              onClick={() => handleChange('gender', 'male')}
            >男</button>
            <button
              type="button"
              className={"gender-btn " + (form.gender === 'female' ? 'selected' : '')}
              onClick={() => handleChange('gender', 'female')}
            >女</button>
          </div>
        </div>

        <div className="navigation navigation-full-width">
          {!hideBackLink ? (
            <Link className="btn secondary-btn" to="/assessments">返回主页</Link>
          ) : null}
          <button type="submit" className="btn primary-btn">{submitLabel}</button>
        </div>
      </form>
    </div>
  );
}
