import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';

interface Props  {
  children: React.ReactNode;
}

export const HeaderElement: React.FC<Props> = ({children} : Props) => {
  
  return (
    <div className="header">
      <span className="header__text">ToDo List</span>
      <div className="header__menuGroup">
        <NavLink to="/" className={(navData) => (navData.isActive ? 'header__tasksBtn__active' : 'header__tasksBtn')}>Задачи</NavLink>
        <NavLink to="/categories" className={(navData) => (navData.isActive ? 'header__categoriesBtn__active' : 'header__categoriesBtn')}>Категории</NavLink>
      </div>
      {children}
    </div>
  );
}