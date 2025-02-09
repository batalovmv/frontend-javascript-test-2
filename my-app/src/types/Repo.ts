export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    updated_at: string;
}
export interface ReposState {
    repos: Repo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Статус загрузки
    error: string | null; // Сообщение об ошибке
    page: number; // Номер текущей страницы для пагинации
    hasMore: boolean; // Есть ли ещё данные для загрузки
}
export interface RepoListProps {
    repos: Repo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    hasMore: boolean;
    loadMoreRepos: () => void;
}
