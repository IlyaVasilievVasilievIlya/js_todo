export interface Task {
    id: number;
    name: string;
    description: string;
    categoryId: number;
}

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

export interface IOption {
    value: number;
    label: string;
}