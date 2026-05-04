import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard.jsx";
import ResultView from "../components/ResultView.jsx";
import WuxingResultView from "../components/WuxingResultView.jsx";
import { getLiveTest } from "../data/tests.js";

export default function TestPage({ testId }) {
    const test = getLiveTest(testId);
    const questions = test?.questions || [];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(() => new Array(questions.length).fill(null));
    const [scores, setScores] = useState(null);

    // For form-based tests (like wuxing), store birth info
    const [birthInfo, setBirthInfo] = useState({
        year: new Date().getFullYear() - 20,
        month: 1,
        day: 1,
        hour: 11,
        minute: 0,
        gender: null
    });
    if (!test) return <Navigate to="/" replace />;

    const question = questions[currentQuestionIndex] || null;
    const selectedType = answers[currentQuestionIndex];
    const isLastQuestion = questions.length ? (currentQuestionIndex === questions.length - 1) : false;
    const progress = questions.length ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

    function selectAnswer(type) {
        setAnswers((currentAnswers) => {
            const nextAnswers = [...currentAnswers];
            nextAnswers[currentQuestionIndex] = type;
            return nextAnswers;
        });

        // 自动跳转到下一题（最后一题不自动跳转）
        if (!isLastQuestion) {
            setTimeout(() => {
                setCurrentQuestionIndex((index) => Math.min(index + 1, questions.length - 1));
            }, 180);
        }
    }

    function goNext() {
        if (!selectedType) {
            alert("请先选择一个答案。");
            return;
        }

        setCurrentQuestionIndex((index) => Math.min(index + 1, questions.length - 1));
    }

    function submit() {
        const unansweredIndex = answers.findIndex((answer) => !answer);

        if (unansweredIndex !== -1) {
            setCurrentQuestionIndex(unansweredIndex);
            alert(`还有 ${unansweredIndex + 1} 题未作答，请完成后查看结果。`);
            return;
        }

        setScores(test.calculateScores(answers));
    }

    function restart() {
        setCurrentQuestionIndex(0);
        setAnswers(new Array(questions.length).fill(null));
        setScores(null);
    }

    // Generate year options (1900-2030)
    function generateYearOptions() {
        const years = [];
        for (let y = 1900; y <= 2030; y++){
            years.push(y);
        }
        return years;
    }

    // Generate month options
    function generateMonthOptions() {
        const months = [];
        for (let m = 1; m <= 12; m++){
            months.push(m);
        }
        return months;
    }

    // Get number of days in month
    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    // Handle form field change
    function handleFieldChange(field, value) {
        setBirthInfo(prev => ({ ...prev, [field]: value }));
    }

    // Submit form for calculation
    function handleFormSubmit() {
        if (!birthInfo.gender) {
            alert("请选择性别。");
            return;
        }
        const result = test.calculateScores(birthInfo);
        setScores(result);
    }

    // Restart form
    function restartForm() {
        setBirthInfo({
            year: new Date().getFullYear() - 20,
            month: 1,
            day: 1,
            hour: 11,
            minute: 0,
            gender: null
        });
        setScores(null);
    }

    return (
        <main className="container">
            <section className="page active">
                <Link className="back-link" to="/">← 返回测试主页</Link>
                {!scores ? (
                    test.hasForm ? (
                        <>
                            <p className="eyebrow">{test.eyebrow}</p>
                            <h1>{test.title}</h1>
                            <p className="lead">{test.description}</p>
                            <p className="note">请正确填写出生公历时间，系统将为你排盘计算八字五行能量分布。</p>

                            <div className="wuxing-form-container">
                                <form className="birth-form" onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
                                    {/* 年份选择 */}
                                    <div className="birth-form-group">
                                        <label>年份</label>
                                        <select value={birthInfo.year} onChange={(e) => handleFieldChange('year', parseInt(e.target.value))}>
                                            {generateYearOptions().map(y => <option key={y} value={y}>{y}年</option>)}
                                        </select>
                                    </div>

                                    {/* 月份选择 */}
                                    <div className="birth-form-group">
                                        <label>月份</label>
                                        <select value={birthInfo.month} onChange={(e) => handleFieldChange('month', parseInt(e.target.value))}>
                                            {generateMonthOptions().map(m => <option key={m} value={m}>{m}月</option>)}
                                        </select>
                                    </div>

                                    {/* 日期选择 */}
                                    <div className="birth-form-group">
                                        <label>日期</label>
                                        <select value={birthInfo.day} onChange={(e) => handleFieldChange('day', parseInt(e.target.value))}>
                                            {Array.from({length: getDaysInMonth(birthInfo.year, birthInfo.month)}, (_, i) => i + 1).map(d =>
                                                <option key={d} value={d}>{d}日</option>
                                            )}
                                        </select>
                                    </div>

                                    {/* 时辰选择 */}
                                    <div className="birth-form-group full-width">
                                        <label>时辰</label>
                                        <select value={birthInfo.hour} onChange={(e) => {
                                            const hour = parseInt(e.target.value);
                                            handleFieldChange('hour', hour);
                                            handleFieldChange('minute', 0);
                                        }}>
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

                                    {/* 性别选择 */}
                                    <div className="birth-form-group">
                                        <div className="gender-group">
                                            <button
                                                type="button"
                                                className={"gender-btn " + (birthInfo.gender === 'male' ? 'selected' : '')}
                                                onClick={() => handleFieldChange('gender', 'male')}
                                            >男</button>
                                            <button
                                                type="button"
                                                className={"gender-btn " + (birthInfo.gender === 'female' ? 'selected' : '')}
                                                onClick={() => handleFieldChange('gender', 'female')}
                                            >女</button>
                                        </div>
                                    </div>

                                    <div className="navigation navigation-full-width">
                                        <Link className="btn secondary-btn" to="/">返回主页</Link>
                                        <button type="submit" className="btn primary-btn">开始测算</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                         <>
                            <p className="eyebrow">{test.eyebrow}</p>
                            <h1>{test.title}</h1>
                            <p className="lead">{test.description}</p>
                            <div className="decor-divider"><span></span></div>
                            <p className="note">💡 小贴士：约 {test.duration}，共 {test.questionCount} 题，请选择最接近当下真实状态的选项。结果没有对错，只是帮你更了解自己。</p>
                            <div className="progress-bar"><div className="progress-fill" style={{ width: progress + "%" }}></div></div>
                            <p className="progress-text">第 <span>{currentQuestionIndex + 1}</span>/{questions.length} 题</p>
                            <div className="question-slide">
                                <QuestionCard
                                    question={question}
                                    questionIndex={currentQuestionIndex}
                                    selectedType={selectedType}
                                    onSelect={selectAnswer}
                                />
                            </div>
                            <div className="navigation">
                                <button className="btn secondary-btn" disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex((index) => index - 1)}>上一题</button>
                                {!isLastQuestion ? (
                                    <button className="btn primary-btn" onClick={goNext}>下一题</button>
                                ) : (
                                    <button className="btn primary-btn" onClick={submit}>查看结果</button>
                                )}
                            </div>
                        </>
                    )
                ) : (
                    test.hasForm ? (
                        <WuxingResultView test={test} result={scores} onRestart={restartForm} />
                    ) : (
                        <ResultView test={test} scores={scores} onRestart={restart} />
                    )
                )}
            </section>
        </main>
    );
}
