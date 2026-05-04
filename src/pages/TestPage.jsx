import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard.jsx";
import ResultView from "../components/ResultView.jsx";
import WuxingResultView from "../components/WuxingResultView.jsx";
import { getLiveTest } from "../data/tests.js";

export default function TestPage({ testId }) {
    const test = getLiveTest(testId);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(() => new Array(test?.questions.length || 0).fill(null));
    const [scores, setScores] = useState(null);

    // For form-based tests (like wuxing), store birth info
    const [birthInfo, setBirthInfo] = useState({
        year: new Date().getFullYear() - 20,
        month: 1,
        day: 1,
        hour: 12,
        minute: 0,
        gender: null
    });
    const [timeMode, setTimeMode] = useState('precise');

    if (!test) return <Navigate to="/" replace />;

    const question = test.questions ? test.questions[currentQuestionIndex] : null;
    const selectedType = answers[currentQuestionIndex];
    const isLastQuestion = test.questions ? (currentQuestionIndex === test.questions.length - 1) : false;
    const progress = test.questions ? ((currentQuestionIndex + 1) / test.questions.length) * 100 : 0;

    function selectAnswer(type) {
        setAnswers((currentAnswers) => {
            const nextAnswers = [...currentAnswers];
            nextAnswers[currentQuestionIndex] = type;
            return nextAnswers;
        });

        // 自动跳转到下一题（最后一题不自动跳转）
        if (!isLastQuestion) {
            setTimeout(() => {
                setCurrentQuestionIndex((index) => Math.min(index + 1, test.questions.length - 1));
            }, 180);
        }
    }

    function goNext() {
        if (!selectedType) {
            alert("请先选择一个答案。");
            return;
        }

        setCurrentQuestionIndex((index) => Math.min(index + 1, test.questions.length - 1));
    }

    function submit() {
        const unansweredIndex = answers.findIndex((answer) => !answer);

        if (unansweredIndex !== -1) {
            setCurrentQuestionIndex(unansweredIndex);
            alert(`还有第 ${unansweredIndex + 1} 题未作答，请完成后查看结果。`);
            return;
        }

        setScores(test.calculateScores(answers));
    }

    function restart() {
        setCurrentQuestionIndex(0);
        setAnswers(new Array(test.questions.length).fill(null));
        setScores(null);
    }

    // Generate year options (1900-2030)
    function generateYearOptions() {
        const years = [];
        for (let y = 1900; y <= 2030; y++) years.push(y);
        return years;
    }

    // Generate month options
    function generateMonthOptions() {
        const months = [];
        for (let m = 1; m <= 12; m++) months.push(m);
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
            alert('请选择性别。');
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
            hour: 12,
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
                            
                            <div className="wuxing-form">
                                <div className="form-row">
                                    <label>性别</label>
                                    <div className="gender-options">
                                        <button 
                                            className={`gender-btn ${birthInfo.gender === 'male' ? 'active' : ''}`}
                                            onClick={() => handleFieldChange('gender', 'male')}
                                        >男</button>
                                        <button 
                                            className={`gender-btn ${birthInfo.gender === 'female' ? 'active' : ''}`}
                                            onClick={() => handleFieldChange('gender', 'female')}
                                        >女</button>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <label htmlFor="year">出生年</label>
                                    <select 
                                        id="year" 
                                        value={birthInfo.year}
                                        onChange={(e) => handleFieldChange('year', parseInt(e.target.value))}
                                    >
                                        {generateYearOptions().map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>

                                <div className="form-row">
                                    <label htmlFor="month">出生月</label>
                                    <select 
                                        id="month" 
                                        value={birthInfo.month}
                                        onChange={(e) => handleFieldChange('month', parseInt(e.target.value))}
                                    >
                                        {generateMonthOptions().map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>

                                <div className="form-row">
                                    <label htmlFor="day">出生日</label>
                                    <select 
                                        id="day" 
                                        value={birthInfo.day}
                                        onChange={(e) => handleFieldChange('day', parseInt(e.target.value))}
                                    >
                                        {Array.from({ length: getDaysInMonth(birthInfo.year, birthInfo.month) }, (_, i) => i + 1).map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-mode-selector">
                                    <button 
                                        className={`mode-btn ${timeMode === 'precise' ? 'active' : ''}`}
                                        onClick={() => setTimeMode('precise')}
                                    >精确出生时间</button>
                                    <button 
                                        className={`mode-btn ${timeMode === 'approx' ? 'active' : ''}`}
                                        onClick={() => setTimeMode('approx')}
                                    >只知道大致时间</button>
                                </div>

                                {timeMode === 'precise' && (
                                    <div className="form-row time-row">
                                        <label htmlFor="hour">出生时</label>
                                        <select 
                                            id="hour" 
                                            value={birthInfo.hour}
                                            onChange={(e) => handleFieldChange('hour', parseInt(e.target.value))}
                                        >
                                            {Array.from({ length: 24 }, (_, i) => i).map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                        <label htmlFor="minute" className="minute-label">分</label>
                                        <select 
                                            id="minute" 
                                            value={birthInfo.minute}
                                            onChange={(e) => handleFieldChange('minute', parseInt(e.target.value))}
                                        >
                                            {Array.from({ length: 60 }, (_, i) => i).map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                    </div>
                                )}

                                <button className="btn primary-btn submit-btn" onClick={handleFormSubmit}>查看结果</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="eyebrow">{test.eyebrow}</p>
                            <h1>{test.title}</h1>
                            <p className="lead">{test.description}</p>
                            <div className="test-intro-list" aria-label="PDP五种行为风格">
                                {test.typeOrder.map((type) => {
                                    const profile = test.profiles[type];
                                    const label = test.typeLabels[type];

                                    return (
                                        <article className={`type-card ${type}`} key={type}>
                                            <span className="type-marker">{label.slice(0, 1)}</span>
                                            <h3>{label}</h3>
                                            <p>{profile?.tagline || "你的财富人格关键维度"}</p>
                                        </article>
                                    );
                                })}
                            </div>
                            <p className="note">约 {test.duration}，共 {test.questionCount} 题。请选择最接近当下真实状态的选项。</p>
                            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
                            <p className="progress-text">第 <span>{currentQuestionIndex + 1}</span>/{test.questions.length} 题</p>
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
