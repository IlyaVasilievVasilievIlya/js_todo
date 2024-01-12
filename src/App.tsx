import React from 'react';
import './App.css';
import {HeaderElement} from "./components/HeaderElement";
import { TaskList } from './components/Tasks/TaskList';
import { CategoryList } from './components/Categories/CategoryList';
import { Route, Routes } from 'react-router-dom';
import { TasksPage } from './pages/TasksPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { navInfos } from './consts';

export const ThemeContext = React.createContext('tasks');

const App: React.FC = function () {

  const routes = navInfos.map(navInfo => <Route {...navInfo}/>)

  return (
    <div className="App">
      <Routes>
        {routes}
      </Routes>
    </div>
  );
}

export default App;