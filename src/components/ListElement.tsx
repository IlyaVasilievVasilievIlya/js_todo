import React from 'react';
import './styles.css';
import { Button } from '../ui-kit/Button/Button';

type Props = {
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
  children?: React.ReactNode
  id: number
  name: string
  description: string
}

export const ListElement: React.FC<Props> = ({ children, handleEdit, handleDelete, id, name, description }: Props) => {
  return (
    <div className="list__element">
      <div className="list__element-info">
        <div>
          <span className="list__element-info-name">{name}</span>
          {children}
        </div>
        <span className="list__element-info-desc">{description}</span>
      </div>
      <div className="list__element-actions">
        <Button className="editBtn" onClick={() => handleEdit(id)} type="button"/>
        <Button className="deleteBtn" onClick={() => handleDelete(id)} type="button"/>
      </div>
    </div>
  )
}