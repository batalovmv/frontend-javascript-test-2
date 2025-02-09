import React, { useEffect } from "react";
import { incrementPage } from "../features/reposSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import RepoList from "../components/RepoList/RepoList";
import { fetchRepos } from "../api/reposApi";

const RepoListContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { repos, status, error, hasMore } = useAppSelector(
        (state) => state.repos
    );
    const username = useAppSelector((state) => state.user.username);

    useEffect(() => {
        if (username && repos.length === 0) {
            dispatch(fetchRepos());
        }
    }, [dispatch, username]);

    const loadMoreRepos = () => {
        if (hasMore && status !== "loading") {
            dispatch(incrementPage());
            dispatch(fetchRepos());
        }
    };

    return (
        <RepoList
            repos={repos}
            status={status}
            error={error}
            hasMore={hasMore}
            loadMoreRepos={loadMoreRepos}
        />
    );
};

export default RepoListContainer;