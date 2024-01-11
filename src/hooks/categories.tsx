import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from './storeHook';
import {setCategories} from '../store/categoriesSlice'
import { API_URL } from '../consts';

export function useCategories() {

  const categories = useAppSelector(state => state.categories.categories);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function fetchCategories() {
    try {

      setLoading(true);

      let response = await fetch(`${API_URL}/GetCategories`);
      
      let body = await response.json();
    
      dispatch(setCategories(body));
      
    } catch (e: unknown) {
        setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return {categories, error, loading};
}
