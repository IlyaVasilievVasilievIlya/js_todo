import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../components/model';
import { addTaskAsync, deleteTaskAsync, editTaskAsync, fetchTasksAsync } from './tasksActions';

type TasksState = {
    tasks: Task[];
    loading: boolean;
    fetchError?: string;
    actionError?: string;
} 

const initialState: TasksState = {
    tasks: [],
    loading: false
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
                state.fetchError = undefined;
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(addTaskAsync.pending, (state) => {
                state.actionError = undefined;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
            })
            .addCase(deleteTaskAsync.pending, (state) => {
                state.actionError = undefined;
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((elem: Task) => elem.id != action.payload);
            })
            .addCase(editTaskAsync.pending, (state) => {
                state.actionError = undefined;
            })
            .addCase(editTaskAsync.fulfilled, (state, action) => {
                state.tasks = state.tasks.map((elem: Task) => (
                    elem.id == action.payload.id) ? action.payload : elem);
            })
            .addCase(fetchTasksAsync.rejected, (state, action) => {
                state.fetchError = action.payload;
                state.loading = false;
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.actionError = action.payload;
            })
            .addCase(editTaskAsync.rejected, (state, action) => {
                state.actionError = action.payload;
            })
            .addCase(deleteTaskAsync.rejected, (state, action) => {
                state.actionError = action.payload;
            })
            ;
    }
});

export default tasksSlice.reducer;