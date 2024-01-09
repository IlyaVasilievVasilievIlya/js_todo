import React from 'react';
import { Category } from '../model';
import '../styles.css';

type Props = {
  category: Category
}

export const SingleCategory: React.FC<Props> = function ({category} : Props) {
  return (
    <div className="list__element__info">
      <div>
        <span className="list__element__info__name">{category.name}</span>
      </div>
      <span className="list__element__info__desc">{category.description}</span>
    </div>
  )
}