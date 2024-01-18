import { createSlice, PayloadAction, UnknownAction } from '@reduxjs/toolkit';
import { Task } from '../../components/model';
import { addTaskAsync, deleteTaskAsync, editTaskAsync, fetchTasksAsync } from './tasksActions';

type TasksState = {
    tasks: Task[];
    loading: boolean;
    error?: string;
} 

const initialState: TasksState = {
    tasks: [],
    loading: false
}

function isError(action: UnknownAction) {
    return action.type.endsWith('rejected');
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(addTaskAsync.pending, (state) => {
                state.error = undefined;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
            })
            .addCase(deleteTaskAsync.pending, (state) => {
                state.error = undefined;
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((elem: Task) => elem.id != action.payload);
            })
            .addCase(editTaskAsync.pending, (state) => {
                state.error = undefined;
            })
            .addCase(editTaskAsync.fulfilled, (state, action) => {
                state.tasks = state.tasks.map((elem: Task) => (
                    elem.id == action.payload.id) ? action.payload : elem);
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            })
            ;
    }
});

export default tasksSlice.reducer;