import React from 'react';
import './App.css';
import {HeaderElement} from "./components/HeaderElement";
import { TaskList } from './components/Tasks/TaskList';
import { CategoryList } from './components/Categories/CategoryList';
import { Route, Routes } from 'react-router-dom';
import { TasksPage } from './pages/TasksPage';
import { CategoriesPage } from './pages/CategoriesPage';

export const ThemeContext = React.createContext('tasks');

const App: React.FC = function () {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <TasksPage/>}/>
        <Route path="/categories" element={ <CategoriesPage/>} />
      </Routes>
    </div>
  );
}

export default App;