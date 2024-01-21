import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { fetchCategoriesAsync } from '../../store/Categories/categoriesActions';
import { fetchTasksAsync } from '../../store/Tasks/tasksActions';
import { Loader } from '../../ui-kit/Loader/Loader';
import { ErrorMessage } from '../ErrorMessage';
import { Task, TaskView } from '../model';
import '../styles.css';
import { DeleteTask } from './DeleteTask';
import { EditTask } from './EditTask';
import { SingleTask } from './SingleTask';

export const TaskList: React.FC = () => {
  
  const { tasks, fetchError, loading } = useAppSelector(state => state.tasks);
  const { categories, fetchError: categoriesFetchError } = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<Task>({ id: 0, name: '', description: '', categoryId: 0 });

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTasksAsync());
    dispatch(fetchCategoriesAsync());
  }, []);

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
  
  let tasksWithCategoryName = tasks.map((task): TaskView => {
    let category = categories.find(category => category.id == task.categoryId);

    return { id: task.id, categoryName: ((category) ? category.name : ''), description: task.description, name: task.name }
  });

  let taskList = tasksWithCategoryName.map(taskElem =>
    <SingleTask task={taskElem} handleEdit={openEditModal} handleDelete={openDeleteModal} key={taskElem.id} />);

  return (
    <>
      {fetchError && <ErrorMessage error={fetchError}/>}

      {categoriesFetchError && <ErrorMessage error = {categoriesFetchError} />}
      
      {loading && <Loader />}

      {!loading && !fetchError && <div className="list">{taskList}</div>}

      {isOpenDeleteModal && <DeleteTask task={task} onDone={() => setIsOpenDeleteModal(false)}/>}

      {isOpenEditModal && <EditTask task={task} onDone={() => setIsOpenEditModal(false)} />}
    </>
  );
}