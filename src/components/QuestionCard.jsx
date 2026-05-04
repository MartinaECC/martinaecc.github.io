export default function QuestionCard({ question, questionIndex, selectedType, onSelect }) {
    return (
        <div className="question-container">
            <h2 className="question-title">{question.text}</h2>
            <div className="options">
                {question.options.map((option, index) => {
                    const answerValue = option.type ?? option;
                    const isSelected = selectedType === answerValue;

                    return (
                        <label className={`option ${isSelected ? "selected" : ""}`} key={`${questionIndex}-${option.type ?? index}`}>
                            <input
                                type="radio"
                                name="answer"
                                value={option.type ?? index}
                                checked={isSelected}
                                onChange={() => onSelect(answerValue)}
                            />
                            <span>{String.fromCharCode(65 + index)}. {option.text}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
