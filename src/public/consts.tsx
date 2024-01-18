import { CategoriesPage } from "../pages/CategoriesPage";
import { MissingPage } from "../pages/MissingPage";
import { TasksPage } from "../pages/TasksPage";

export const API_URL = "http://localhost:8089/api/ToDoList";

interface NavInfo {
    path: string;
    text: string;
    key: string;
}

interface RoutesInfo {
    path: string;
    element: React.ReactElement;
    key: string;
}

export const routeInfos: RoutesInfo[] = [
    {path: "/", element:<TasksPage/>, key: "/"},
    {path: "/categories", element:<CategoriesPage/>, key: "/categories"},
    {path: "/*", element:<MissingPage />, key: "/missing"}
  ];

export const navInfos: NavInfo[] = [
    {path: "/", text: "Задачи", key: "/"},
    {path: "/categories", text:"Категории", key: "/categories"}
]
