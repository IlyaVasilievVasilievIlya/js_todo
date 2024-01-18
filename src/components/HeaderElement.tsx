import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import { navInfos } from '../public/consts';

interface HeaderElementProps  {
  children?: React.ReactNode;
}

export const HeaderElement: React.FC<HeaderElementProps> = ({children} : HeaderElementProps) => {

  const navMenu = navInfos.map( link => 
      <NavLink to={link.path} className={(navData) => (navData.isActive ? 'header__nav-link_active' : 'header__nav-link')} key={link.path}>
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