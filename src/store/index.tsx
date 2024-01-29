import { configureStore} from '@reduxjs/toolkit';
import tasksReducer from './Tasks/tasksSlice';
import categoriesReducer from './Categories/categoriesSlice';

export const store = configureStore({
    reducer : {
        tasks: tasksReducer,
        categories: categoriesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;