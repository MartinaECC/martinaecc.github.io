import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard.jsx";
import ResultView from "../components/ResultView.jsx";
import { getLiveTest } from "../data/tests.js";

export default function TestPage({ testId }) {
    const test = getLiveTest(testId);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(() => new Array(test?.questions.length || 0).fill(null));
    const [scores, setScores] = useState(null);

    if (!test) return <Navigate to="/" replace />;

    const question = test.questions[currentQuestionIndex];
    const selectedType = answers[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === test.questions.length - 1;
    const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

    function selectAnswer(type) {
        setAnswers((currentAnswers) => {
            const nextAnswers = [...currentAnswers];
            nextAnswers[currentQuestionIndex] = type;
            return nextAnswers;
        });
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

    return (
        <main className="container">
            <section className="page active">
                <Link className="back-link" to="/">← 返回测试主页</Link>
                {!scores ? (
                    <>
                        <p className="eyebrow">{test.eyebrow}</p>
                        <h1>{test.title}</h1>
                        <p className="lead">{test.description}</p>
                        <div className="test-intro-list" aria-label="PDP五种行为风格">
                            {test.typeOrder.map((type) => {
                                const profile = test.profiles[type];

                                return (
                                    <article className={`type-card ${type}`} key={type}>
                                        <span className="type-marker">{test.typeLabels[type].slice(0, 1)}</span>
                                        <h3>{test.typeLabels[type]}</h3>
                                        <p>{profile.tagline}</p>
                                    </article>
                                );
                            })}
                        </div>
                        <p className="note">约 {test.duration}，共 {test.questionCount} 题。请选择最接近当下真实状态的选项。</p>
                        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
                        <p className="progress-text">第 <span>{currentQuestionIndex + 1}</span>/{test.questions.length} 题</p>
                        <QuestionCard
                            question={question}
                            questionIndex={currentQuestionIndex}
                            selectedType={selectedType}
                            onSelect={selectAnswer}
                        />
                        <div className="navigation">
                            <button className="btn secondary-btn" disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex((index) => index - 1)}>上一题</button>
                            {!isLastQuestion ? (
                                <button className="btn primary-btn" onClick={goNext}>下一题</button>
                            ) : (
                                <button className="btn primary-btn" onClick={submit}>查看结果</button>
                            )}
                        </div>
                    </>
                ) : (
                    <ResultView test={test} scores={scores} onRestart={restart} />
                )}
            </section>
        </main>
    );
}
