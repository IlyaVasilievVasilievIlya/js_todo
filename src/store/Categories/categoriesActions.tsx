import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../components/model';
import { API_URL } from '../../public/consts';

export const fetchCategoriesAsync = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
    'categories/fetchCategoriesAsync',
    async function (_, { rejectWithValue }) {
        try {
            
            const response = await fetch(`${API_URL}/GetCategories`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            
            let body: Category[] = await response.json();
            
            return body;
        } catch (e: unknown) {
            return rejectWithValue((e as Error).message);
        }
    }
);

export const addCategoryAsync = createAsyncThunk<Category, Category, { rejectValue: string }>(
    'categories/addCategoryAsync',
    async function (newCategory, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_URL}/AddCategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newCategory)
            });

            if (!response.ok) {
                throw new Error('Failed to add category');
            }

            return (await response.json()) as Category;

        } catch (e: unknown) {
            return rejectWithValue((e as Error).message);
        }
    }
);

export const editCategoryAsync = createAsyncThunk<Category, Category, { rejectValue: string }>(
    'categories/editCategoryAsync',
    async function (editedCategory, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_URL}/UpdateCategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(editedCategory)
            });

            if (!response.ok) {
                throw new Error('Failed to edit');
            }

            return editedCategory;
        } catch (e: unknown) {
            return rejectWithValue((e as Error).message);
        }
    }
)


export const deleteCategoryAsync = createAsyncThunk<number, number, { rejectValue: string }>(
    'categories/deleteCategoryAsync',
    async function (id, { rejectWithValue }) {
        try {

            const response = await fetch(`${API_URL}/RemoveCategory/${id}`);

            if (!response.ok) {
                throw new Error('Failed to remove category');
            }

            return id;

        } catch (e: unknown) {
            return rejectWithValue((e as Error).message)
        }
    }
);