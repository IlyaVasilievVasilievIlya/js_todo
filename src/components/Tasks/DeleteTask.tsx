import React, { useState } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/storeHook';
import { deleteTaskAsync } from '../../store/Tasks/tasksActions';
import { Button } from '../../ui-kit/Button/Button';
import { Loader } from '../../ui-kit/Loader/Loader';
import { ModalActions } from '../../ui-kit/Modal/ModalActions/ModalActions';
import { ModalContainer } from '../../ui-kit/Modal/ModalContainer/ModalContainer';
import { ModalHeader } from '../../ui-kit/Modal/ModalHeader/ModalHeader';
import { OverlayingModal } from '../../ui-kit/Modal/OverlayingModal/OverlayingModal';
import { Task } from '../model';
import '../styles.css';

interface DeleteTaskProps {
  task: Task
  onDone: () => void
}

export const DeleteTask: React.FC<DeleteTaskProps> = ({ task, onDone }: DeleteTaskProps) => {

  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);

  const deleteTask = () => {
    setLoading(true);
    dispatch(deleteTaskAsync(task.id))
      .then(unwrapResult)
      .then(_ => closeDeleteForm(),
        rejected => { setLoading(false); setError(rejected); });
  }

  const closeDeleteForm = () => {
    setLoading(false);
    setError(undefined);
    onDone();
  }

  return (
    <OverlayingModal isOpened={true} onClose={closeDeleteForm}>
      <ModalContainer>
        <ModalHeader title="Удаление задачи" onClose={closeDeleteForm} />
        <span className="modal__delete-message">Вы уверены, что хотите удалить задачу "{task.name}"?</span>
        <ModalActions errorMessage={error}>
          <Button type="submit" className="primaryBtn" onClick={deleteTask}>{loading ? <Loader className='buttonLoading' /> : `Да`}</Button>
          <Button type="button" className="secondaryBtn" onClick={closeDeleteForm}>Нет</Button>
        </ModalActions>
      </ModalContainer>
    </OverlayingModal>
  );
}