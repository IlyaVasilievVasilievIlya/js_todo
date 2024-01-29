export interface Task {
    id: number;
    name: string;
    description: string;
    categoryId: number;
}

export type AddTaskRequest = Omit<Task, "id">

export interface TaskView {
    id: number;
    name: string;
    description: string;
    categoryName?: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export type AddCategoryRequest = Omit<Category, "id">

export interface IOption {
    value: number;
    label: string;
}