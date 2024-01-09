import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from './storeHook';
import {setCategories} from '../store/categoriesSlice'

export function useCategories() {

  const categories = useAppSelector(state => state.categories.categories);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function fetchCategories() {
    try {

      setLoading(true);

      let response = await fetch("http://localhost:8089/api/ToDoList/GetCategories");
      
      let body = await response.json();
    
      dispatch(setCategories(body));
    } catch (e: unknown){
        setError((e as Error).message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return {categories, error, loading};
}
