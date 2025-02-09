import React from 'react';
import RepoCard from '../RepoCard/RepoCard';
import { ClipLoader } from 'react-spinners';
import './RepoList.css';
import { RepoListProps } from '../../types/Repo';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'; 


const RepoList: React.FC<RepoListProps> = ({
    repos,
    status,
    error,
    hasMore,
    loadMoreRepos,
}) => {
    const [setLastElement] = useInfiniteScroll(
        () => {
            if (hasMore && status !== 'loading') {
                loadMoreRepos();
            }
        },
        {
            threshold: 1.0,
        }
    );

    return (
        <div className="repo-list">
            {status === 'idle' && (
                <p className="info-text">🔍 Введите имя пользователя GitHub</p>
            )}

            {status === 'loading' && repos.length === 0 && (
                <div className="loading-container">
                    <ClipLoader color="#36d7b7" size={50} />
                </div>
            )}

            {status === 'failed' && <p className="error-text">❌ Ошибка: {error}</p>}

            {status === 'succeeded' && repos.length === 0 && (
                <p className="info-text">😕 Репозитории не найдены.</p>
            )}

            {repos.map((repo, index) => {
                if (repos.length === index + 1) {
                    return (
                        <div ref={setLastElement} key={repo.id}>
                            <RepoCard repo={repo} />
                        </div>
                    );
                } else {
                    return (
                        <div key={repo.id}>
                            <RepoCard repo={repo} />
                        </div>
                    );
                }
            })}

            {status === 'loading' && repos.length > 0 && (
                <div className="loading-container">
                    <ClipLoader color="#36d7b7" size={30} />
                </div>
            )}

            {!hasMore && repos.length > 0 && (
                <p className="end-text">✅ Все репозитории загружены</p>
            )}
        </div>
    );
};

export default RepoList;