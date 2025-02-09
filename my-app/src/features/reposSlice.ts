import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRepos } from '../api/reposApi';
import { Repo, ReposState } from '../types/Repo';

const initialState: ReposState = {
    repos: [],
    status: 'idle',
    error: null,
    page: 1,
    hasMore: true,
}

export const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        resetRepos(state) {
            state.repos = [];
            state.status = 'idle';
            state.error = null;
            state.page = 1;
            state.hasMore = true;
        },
        incrementPage(state) {
            state.page += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<Repo[]>) => {
                state.status = 'succeeded';
                state.repos = [...state.repos, ...action.payload];
                if (action.payload.length < 20) {
                    state.hasMore = false; // Больше нет данных для загрузки
                }
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                state.hasMore = false;
            });
    },
});

export const { resetRepos, incrementPage } = reposSlice.actions;

export default reposSlice.reducer;