import { CategoriesPage } from "../pages/CategoriesPage";
import { TasksPage } from "../pages/TasksPage";

export const API_URL = "http://localhost:8089/api/ToDoList";

interface NavInfo {
    path: string;
    text: string;
    element: React.ReactElement;
    key: string;
}

export const navInfos: NavInfo[] = [
    {path: "/", text: "Задачи", element:<TasksPage/>, key: "/"},
    {path: "/categories", text:"Категории", element:<CategoriesPage/>, key: "/categories"}
  ];