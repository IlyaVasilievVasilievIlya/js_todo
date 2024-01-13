import {createAsyncThunk, createSlice, PayloadAction, UnknownAction} from '@reduxjs/toolkit';
import { Task } from '../components/model';
import { API_URL } from '../public/consts';

type TasksState = {
    tasks: Task[];
    loading: boolean;
    error?: string;
} 

const initialState: TasksState = {
    tasks: [],
    loading: false
}

export const fetchTasksAsync = createAsyncThunk<Task[], undefined, { rejectValue: string}>(
    'tasks/fetchTasksAsync',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_URL}/GetTasks`);

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            let body: Task[] = await response.json();

            return body;
        } catch (e: unknown) {
            return rejectWithValue((e as Error).message);
        }
    }
);

export const addTaskAsync = createAsyncThunk<Task, Task, { rejectValue: string }> (
    'tasks/addTaskAsync',
    async function (newTask, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_URL}/AddTask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            return (await response.json()) as Task;

        } catch (e: unknown) {
            return rejectWithValue((e as Error).message);
        }
    }
);

export const editTaskAsync = createAsyncThunk<Task, Task, { rejectValue: string }>(
    'tasks/editTaskAsync',
    async function (editedTask, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_URL}/UpdateTask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(editedTask)
            });

            if (!response.ok) {
                throw new Error('Failed to edit');
            }

            return editedTask;
        } catch (e: unknown) {
            return rejectWithValue((e as Error).message);
        }
    }
);

export const deleteTaskAsync = createAsyncThunk<number, number, { rejectValue: string }>(
    'tasks/deleteTaskAsync',
    async function (id, { rejectWithValue }) {
        try {

            const response = await fetch(`${API_URL}/RemoveTask/${id}`);

            if (!response.ok) {
                throw new Error('Failed to remove task');
            }

            return id;

        } catch (e: unknown) {
            return rejectWithValue((e as Error).message)
        }
    }
);

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
                state.tasks.push(action.payload);
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