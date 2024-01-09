import React, {useState} from 'react';

import '../styles.css';
import { SingleTask} from './SingleTask';
import { Category, Task, TaskView } from '../model';
import { useTasks } from '../../hooks/tasks';
import { useCategories } from '../../hooks/categories';
import { ListElement } from '../ListElement';
import { useAppDispatch } from '../../hooks/storeHook';
import { Modal } from '../Modal';
import { EditTask } from './EditTask';
import { ErrorMessage } from '../ErrorMessage';
import { deleteTask } from '../../store/tasksSlice'
import { Loader } from '../Loader';


export const TaskList: React.FC = () => {

  const {tasks, error, loading} = useTasks();
  const {categories, error : categoriesFetchError} = useCategories();
  
  const [task, setTask] = useState<Task>({id:0, name:'', description:'', categoryId:0});
  
  const dispatch = useAppDispatch();

  const [isOnEdit, setIsOnEdit] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  

  const submitDeleteHandler = async (event: React.FormEvent) => {

    event.preventDefault();

    const response = await fetch(`http://localhost:8089/api/ToDoList/RemoveTask/${task.id}`);

    if (response.ok){
      dispatch(deleteTask(task.id));
    }

    setDeleteModal(false);
  }
  
  function openDeleteModal(id: number) {
    const selectedTask = tasks.find(el => el.id == id); 

    if (selectedTask){
      setTask(selectedTask);
      setDeleteModal(true);
    }
  }

  function openEditModal(id:number) {
    const selectedTask = tasks.find(el => el.id == id);

    if (selectedTask){
      setTask(selectedTask);
      setIsOnEdit(true);
    }
  }

  let tasksWithCategoryName = tasks.map((task) : TaskView => {
    let category = categories.find(category => category.id == task.categoryId);
    
    return { id:task.id, categoryName: ((category) ? category.name : ''), description:task.description, name: task.name}
  });

  let taskList = tasksWithCategoryName.map((taskElem, index) => 
    <ListElement handleEdit={openEditModal} handleDelete={openDeleteModal} key={index} id={taskElem.id}> 
      <SingleTask task = {taskElem} key={index} /> 
    </ListElement>);

  return (
    <>
      {!error && !categoriesFetchError && <div className="list">{taskList}</div>}
      {error && <ErrorMessage error={error}/>}

      {loading && <Loader/>}

      {categoriesFetchError && <ErrorMessage error={categoriesFetchError}/>}

      {deleteModal && task && <Modal title = "Удаление задачи" submitText = "Да"
      cancelText = "Нет" onSubmit={submitDeleteHandler} onCancel={() => setDeleteModal(false)}>
        <span>Вы уверены, что хотите удалить задачу "{task.name}"?</span>
      </Modal>}

      {isOnEdit && task && <EditTask task = {task} onDone = {() => setIsOnEdit(false)}/>}
    </>
  );
}