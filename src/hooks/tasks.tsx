import {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from './storeHook';
import {setTasks} from '../store/tasksSlice'


export function useTasks(){
  
  const tasks = useAppSelector(state => state.tasks.tasks);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function fetchTasks(){
    try {

      setLoading(true);

      let response = await fetch("http://localhost:8089/api/ToDoList/GetTasks");
      let body = await response.json();
      
      dispatch(setTasks(body));

      } catch (e: unknown){
          setError((e as Error).message);
      }
      setLoading(false);
  }
    
  useEffect(() => {
    fetchTasks();
  }, []);

  return {tasks, error, loading};
}