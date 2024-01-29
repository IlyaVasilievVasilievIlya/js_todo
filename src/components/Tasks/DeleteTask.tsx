import React, { useState } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/storeHook';
import { deleteTaskAsync } from '../../store/Tasks/tasksActions';
import { Loader } from '../../ui-kit/Loader/Loader';
import { Task } from '../model';
import '../styles.css';
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';

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
    <ConfirmModal
      isOpened={true}
      onClose={closeDeleteForm}
      title="Удаление задачи"
      onSubmit={deleteTask}
      error={error}
      submitText={loading ? <Loader className='buttonLoading' /> : `Да`}
      cancelText='Нет'>
      <span className="modal__delete-message">Вы уверены, что хотите удалить задачу "{task.name}"?</span>
    </ConfirmModal>
  );
}