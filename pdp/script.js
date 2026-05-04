const typeOrder = ["tiger", "peacock", "koala", "owl", "chameleon"];
const typeLabels = { tiger: "老虎型", peacock: "孔雀型", koala: "考拉型", owl: "猫头鹰型", chameleon: "变色龙型" };

const pages = {
    home: document.getElementById("home-page"),
    test: document.getElementById("test-page"),
    result: document.getElementById("result-page")
};
const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const currentQuestionEl = document.getElementById("current-question");
const progressFill = document.getElementById("progress-fill");
const resultType = document.getElementById("result-type");
const resultDescription = document.getElementById("result-description");
const resultDetails = document.getElementById("result-details");

let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);
let radarChart = null;

function showPage(name) {
    Object.values(pages).forEach((page) => page.classList.remove("active"));
    pages[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const selectedType = answers[currentQuestionIndex];

    currentQuestionEl.textContent = currentQuestionIndex + 1;
    progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    questionContainer.innerHTML = `
        <h2 class="question-title">${question.text}</h2>
        <div class="options">
            ${question.options.map((option, index) => `
                <label class="option ${selectedType === option.type ? "selected" : ""}">
                    <input type="radio" name="answer" value="${option.type}" ${selectedType === option.type ? "checked" : ""}>
                    <span>${String.fromCharCode(65 + index)}. ${option.text}</span>
                </label>
            `).join("")}
        </div>
    `;

    questionContainer.querySelectorAll(".option").forEach((optionEl) => {
        optionEl.addEventListener("click", () => {
            answers[currentQuestionIndex] = optionEl.querySelector("input").value;
            renderQuestion();
        });
    });

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.hidden = currentQuestionIndex === questions.length - 1;
    submitBtn.hidden = currentQuestionIndex !== questions.length - 1;
}

function calculateScores() {
    const scores = { tiger: 0, peacock: 0, koala: 0, owl: 0, chameleon: 0 };
    answers.forEach((answer) => { if (answer) scores[answer] += 1; });

    const baseValues = typeOrder.slice(0, 4).map((type) => scores[type]);
    const max = Math.max(...baseValues);
    const min = Math.min(...baseValues);
    const balanceBonus = Math.max(0, 6 - (max - min) * 2);
    scores.chameleon += balanceBonus;
    return scores;
}

function getDominantType(scores) {
    return [...typeOrder].sort((a, b) => scores[b] - scores[a])[0];
}

function ensureAllAnswered() {
    const unansweredIndex = answers.findIndex((answer) => !answer);
    if (unansweredIndex === -1) return true;

    currentQuestionIndex = unansweredIndex;
    renderQuestion();
    alert(`还有第 ${unansweredIndex + 1} 题未作答，请完成后查看结果。`);
    return false;
}

function renderResult() {
    const scores = calculateScores();
    const dominantType = getDominantType(scores);
    const profile = typeProfiles[dominantType];
    const maxScore = Math.max(...typeOrder.map((type) => scores[type]));

    resultType.innerHTML = `<div class="hero-result" style="background: linear-gradient(135deg, ${profile.color}, #3d2f29);"><h2>${profile.icon} ${profile.name}</h2><p>${profile.tagline}</p></div>`;
    resultDescription.innerHTML = `
        <div class="description-grid">
            <div class="description-card"><h3>性格概览</h3><p>${profile.summary}</p></div>
            <div class="description-card"><h3>主要优势</h3><p>${profile.strengths}</p></div>
            <div class="description-card"><h3>适合场景</h3><p>${profile.roles}</p></div>
        </div>
        <div class="description-card" style="margin-top:16px"><h3>沟通建议</h3><p>${profile.advice}</p></div>
    `;
    resultDetails.innerHTML = `<div class="score-list">${typeOrder.map((type) => {
        const item = typeProfiles[type];
        const width = maxScore === 0 ? 0 : Math.round((scores[type] / maxScore) * 100);
        return `<div class="score-card"><h3>${item.icon} ${typeLabels[type]}</h3><strong style="color:${item.color}">${scores[type]}</strong><p>${item.tagline}</p><div class="score-bar"><span style="width:${width}%;background:${item.color}"></span></div></div>`;
    }).join("")}</div>`;

    renderChart(scores);
    showPage("result");
}

function renderChart(scores) {
    if (radarChart) radarChart.destroy();
    radarChart = new Chart(document.getElementById("radar-chart"), {
        type: "radar",
        data: {
            labels: typeOrder.map((type) => typeLabels[type]),
            datasets: [{
                label: "性格维度得分",
                data: typeOrder.map((type) => scores[type]),
                backgroundColor: "rgba(207,111,59,.18)",
                borderColor: "#cf6f3b",
                pointBackgroundColor: typeOrder.map((type) => typeProfiles[type].color),
                pointBorderColor: "#fff",
                pointRadius: 5,
                borderWidth: 3
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { r: { beginAtZero: true, ticks: { stepSize: 2 }, pointLabels: { font: { size: 14, weight: "bold" } } } } }
    });
}

startBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    answers = new Array(questions.length).fill(null);
    renderQuestion();
    showPage("test");
});
prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex -= 1;
        renderQuestion();
    }
});
nextBtn.addEventListener("click", () => {
    if (!answers[currentQuestionIndex]) {
        alert("请先选择一个答案。");
        return;
    }
    currentQuestionIndex += 1;
    renderQuestion();
});
submitBtn.addEventListener("click", () => { if (ensureAllAnswered()) renderResult(); });
restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    answers = new Array(questions.length).fill(null);
    renderQuestion();
    showPage("test");
});
