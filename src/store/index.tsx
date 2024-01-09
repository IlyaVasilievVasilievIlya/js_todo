import {configureStore} from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import categoriesReducer from './categoriesSlice';

export const store = configureStore({
    reducer : {
        tasks: tasksReducer,
        categories: categoriesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;