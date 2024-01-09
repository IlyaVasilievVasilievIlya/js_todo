import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Task } from '../components/model';

type TasksState = {
    tasks: Task[];
} 

const initialState: TasksState = {
    tasks: []
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>){
            state.tasks = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        deleteTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter((elem:Task) => elem.id != action.payload);
        },
        editTask(state, action: PayloadAction<Task>) {
            state.tasks = state.tasks.map((elem:Task) => (elem.id == action.payload.id) ? action.payload : elem);
        }
    },
});

export const {setTasks, addTask, deleteTask, editTask} = tasksSlice.actions;

export default tasksSlice.reducer;