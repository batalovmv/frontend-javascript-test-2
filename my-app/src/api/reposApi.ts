import { Repo } from "../types/Repo";
import { RootState } from "../store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchRepos = createAsyncThunk<
    Repo[],
    undefined, // Тип аргумента функции (мы получим данные из состояния)
    { state: RootState; rejectValue: string } 
>(
    'repos/fetchRepos',
    async (_, { getState, rejectWithValue }) => {
        const { user, repos } = getState();
        const { username } = user;
        const { page } = repos;

        try {
            const response = await axios.get<Repo[]>(
                `https://api.github.com/users/${username}/repos`,
                {
                    params: {
                        per_page: 20,
                        page,
                        sort: 'updated',
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 404) {
                    return rejectWithValue('Пользователь не найден.');
                }
            }
            return rejectWithValue('Ошибка при загрузке данных.');
        }
    }
);