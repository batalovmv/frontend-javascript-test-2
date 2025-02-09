import React from "react";
import "./RepoCard.css";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    updated_at: string;
}

interface RepoCardProps {
    repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
    return (
        <div className="repo-card">
            <h2 className="repo-title">{repo.name}</h2>
            {repo.description && <p className="repo-description">{repo.description}</p>}

            <div className="repo-footer">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
                    🔗 Перейти
                </a>
                <span className="repo-stars">⭐ {repo.stargazers_count}</span>
            </div>

            <p className="repo-update">📅 Обновлено: {new Date(repo.updated_at).toLocaleDateString()}</p>
        </div>
    );
};

export default RepoCard;