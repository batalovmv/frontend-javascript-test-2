


import { configureStore } from '@reduxjs/toolkit';
import reposReducer from '../features/reposSlice';
import userReducer from '../features/userSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        repos: reposReducer,
    },
});

// ✅ Типизация для useAppDispatch и useAppSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;