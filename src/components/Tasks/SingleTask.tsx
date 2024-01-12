import React from 'react';
import '../styles.css';
import { ListElement } from '../ListElement';
import {ReactComponent as CategoryIcon} from '../../public/folder.svg';
import { TaskView } from '../model';

type Props = {
  task: TaskView
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
}

export const SingleTask: React.FC<Props> = ({task:{categoryName, id, name, description}, handleEdit, handleDelete} : Props) => {
  return (
    <ListElement handleDelete={handleDelete} handleEdit={handleEdit} id={id} name={name} description={description}>
        <span className="list__element-info-name">{name}</span>
        <div className="list__element-info-category">
          {categoryName && <span className="icon"><CategoryIcon/></span>}
          <span className="list__element-info-category-name">{categoryName}</span>
        </div>
    </ListElement>
  )
}