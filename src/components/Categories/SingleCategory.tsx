import React from 'react';
import { Category } from '../model';
import '../styles.css';
import { ListElement } from '../ListElement';

type Props = {
  category: Category
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
}

export const SingleCategory: React.FC<Props> = ({category: {id, name,  description}, handleDelete, handleEdit} : Props) => {
  return (
    <ListElement handleDelete={handleDelete} handleEdit={handleEdit} id={id} name={name} description={description}/>
  )
}