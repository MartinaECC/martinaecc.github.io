export default function QuestionCard({ question, questionIndex, selectedType, onSelect }) {
    return (
        <div className="question-container">
            <h2 className="question-title">{question.text}</h2>
            <div className="options">
                {question.options.map((option, index) => (
                    <label className={`option ${selectedType === option.type ? "selected" : ""}`} key={`${questionIndex}-${option.type}-${index}`}>
                        <input
                            type="radio"
                            name="answer"
                            value={option.type}
                            checked={selectedType === option.type}
                            onChange={() => onSelect(option.type)}
                        />
                        <span>{String.fromCharCode(65 + index)}. {option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
