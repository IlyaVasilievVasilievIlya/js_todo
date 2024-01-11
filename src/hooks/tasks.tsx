import {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from './storeHook';
import {setTasks} from '../store/tasksSlice'
import { API_URL } from '../consts';


export function useTasks(){
  
  const tasks = useAppSelector(state => state.tasks.tasks);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function fetchTasks(){
    try {

      setLoading(true);

      let response = await fetch(`${API_URL}/GetTasks`);
      let body = await response.json();
      
      dispatch(setTasks(body));

    } catch (e: unknown) {
        setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
    
  useEffect(() => {
    fetchTasks();
  }, []);

  return {tasks, error, loading};
}