import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../components/model';
import { API_URL } from '../../public/consts';

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