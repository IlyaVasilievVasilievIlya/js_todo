import React, { useState, useEffect } from 'react';

import '../styles.css';
import { SingleTask } from './SingleTask';
import { Task, TaskView } from '../model';
import { fetchCategoriesAsync } from '../../store/categoriesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { ConfirmModal } from '../../ui-kit/Modal/ConfirmModal/ConfirmModal';
import { EditTask } from './EditTask';
import { ErrorMessage } from '../ErrorMessage';
import { Loader } from '../../ui-kit/Loader/Loader';
import { deleteTaskAsync, fetchTasksAsync } from '../../store/tasksSlice';

export const TaskList: React.FC = () => {
  
  const { tasks, error, loading } = useAppSelector(state => state.tasks);
  const { categories, error: categoriesError } = useAppSelector(state => state.categories);

  const [task, setTask] = useState<Task>({ id: 0, name: '', description: '', categoryId: 0 });

  const dispatch = useAppDispatch();

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);


  const deleteTask =  () => {

      dispatch(deleteTaskAsync(task.id));

      setIsOpenDeleteModal(false);
  }

  function openDeleteModal(id: number) {
    const selectedTask = tasks.find(el => el.id == id);

    if (selectedTask) {
      setTask(selectedTask);
      setIsOpenDeleteModal(true);
    }
  }

  function openEditModal(id: number) {
    const selectedTask = tasks.find(el => el.id == id);

    if (selectedTask) {
      setTask(selectedTask);
      setIsOpenEditModal(true);
    }
  }
  
  useEffect(() => {
    dispatch(fetchTasksAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);
  
  let tasksWithCategoryName = tasks.map((task): TaskView => {
    let category = categories.find(category => category.id == task.categoryId);

    return { id: task.id, categoryName: ((category) ? category.name : ''), description: task.description, name: task.name }
  });

  let taskList = tasksWithCategoryName.map(taskElem =>
    <SingleTask task={taskElem} handleEdit={openEditModal} handleDelete={openDeleteModal} key={taskElem.id} />);

  return (
    <>
      {error && <ErrorMessage error={error}/>}

      {categoriesError && <ErrorMessage error = {categoriesError} />}
      
      {loading && <Loader />}

      <div className="list">{taskList}</div>

      <ConfirmModal isOpened={isOpenDeleteModal}
        title="Удаление задачи"
        submitText="Да"
        cancelText="Нет"
        onSubmit={() => deleteTask()}
        onClose={() => setIsOpenDeleteModal(false)}>
        <span>Вы уверены, что хотите удалить задачу "{task.name}"?</span>
      </ConfirmModal>

      {isOpenEditModal && <EditTask task={task} onDone={() => setIsOpenEditModal(false)} />}
    </>
  );
}