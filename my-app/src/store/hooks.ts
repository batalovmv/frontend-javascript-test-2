import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';  // Импорт типов

// ✅ Типизированный useDispatch (исправляет ошибку AsyncThunk)
export const useAppDispatch: () => AppDispatch = useDispatch;

// ✅ Типизированный useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;