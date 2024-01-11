import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';

interface Props  {
  children: React.ReactNode;
}

interface NavInfo {
  to: string;
  text: string;
}

export const HeaderElement: React.FC<Props> = ({children} : Props) => {

  const links: NavInfo[] = [
    {to: "/", text: "Задачи"},
    {to: "/categories", text:"Категории"}
  ];

  const navMenu = links.map( link => 
      <NavLink to={link.to} className={(navData) => (navData.isActive ? 'header__nav-link_active' : 'header__nav-link')} key={link.to}>
        {link.text}
      </NavLink>);

  return (
    <div className="header">
      <span className="header__text">ToDo List</span>
      <div className="header__menuGroup">
        {navMenu}
      </div>
      {children}
    </div>
  );
}