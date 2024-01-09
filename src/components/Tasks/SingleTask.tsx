import React from 'react';
import { TaskView } from '../model';
import { MdFolder} from 'react-icons/md';
import '../styles.css';

type Props = {
  task: TaskView
}

export const SingleTask: React.FC<Props> = function ({task} : Props) {
  return (
    <div className="list__element__info">
      <div>
        <span className="list__element__info__name">{task.name}</span>
        <div className="list__element__info__category">
          {task.categoryName && <span className="icon"><MdFolder color="#3F72AF" size="24px"/></span>}
          <span className="list__element__info__category__name">{task.categoryName}</span>
        </div>
      </div>
      <span className="list__element__info__desc">{task.description}</span>
    </div>
  )
}