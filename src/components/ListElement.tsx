import React from 'react';
import { MdDelete, MdEdit} from 'react-icons/md';
import './styles.css';

type Props = {
  handleEdit: (id:number) => void
  handleDelete: (id:number) => void
  children: React.ReactNode
  id: number
}

export const ListElement: React.FC<Props> = ({children, handleEdit, handleDelete, id}: Props) => {
    return (
      <div className="list__element">
        <div>
            {children}
        </div>
        <div className="list__element-actions">
          <span className="icon" onClick={() => handleEdit(id)}>
            <MdEdit color="#3F72AF" size="24px"/>
          </span>
          <span className="icon" onClick={() => handleDelete(id)}>
            <MdDelete color="#3F72AF" size="24px"/>
          </span>
        </div>
      </div>
    )
}