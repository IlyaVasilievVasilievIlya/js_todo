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
  
  function enableDelete(id:number) {
    const selectedTask = tasks.find(el => el.id == id); 

    if (selectedTask){
      setTask(selectedTask);
      setDeleteModal(true);
    }
  }

  function enableEdit(id:number) {
    const selectedTask = tasks.find(el => el.id == id);

    if (selectedTask){
      setTask(selectedTask);
      setIsOnEdit(true);
    }
  }

  let tasksWithCategoryName = tasks.map((elem) : TaskView => {
    let category = categories.find(el => el.id == elem.categoryId);
    
    return { id:elem.id, categoryName: ((category) ? category.name : ''), description:elem.description, name: elem.name}
  });

  let taskList = tasksWithCategoryName.map((elem, index) => 
    <ListElement handleEdit={enableEdit} handleDelete={enableDelete} key={index} id={elem.id}> 
      <SingleTask task = {elem} key={index} /> 
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