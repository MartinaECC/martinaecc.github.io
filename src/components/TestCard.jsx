import { Link } from "react-router-dom";

const statusLabel = {
    live: "已上线",
    "coming-soon": "即将上线",
    placeholder: "预留位置"
};

export default function TestCard({ test }) {
    const isLive = test.status === "live";
    const isComingSoon = test.status === "coming-soon";
    const statusClass = isLive ? "live" : "soon";

    return (
        <article className={`test-card ${test.cardClass || ""} ${isComingSoon ? "coming-soon" : ""}`}>
            <div className="card-topline">
                <span className="test-icon">{test.icon}</span>
                <span className={`status-pill ${statusClass}`}>{statusLabel[test.status]}</span>
            </div>
            <h2>{test.title}</h2>
            <p>{test.description}</p>
            <div className="tag-row">
                {test.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                ))}
            </div>
            {test.path && (
                <Link className={`btn ${isLive ? "primary-btn" : "secondary-btn"} card-action`} to={test.path}>
                    {isLive ? "开始测试" : "查看预告"}
                </Link>
            )}
        </article>
    );
}
