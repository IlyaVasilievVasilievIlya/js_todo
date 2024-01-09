import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { Category } from '../components/model';

type CategoriesState = {
    categories: Category[];
}

const initialState: CategoriesState = {
    categories: []
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<Category[]>){
            state.categories = action.payload;
        },
        addCategory(state, action: PayloadAction<Category>) {
            state.categories.push(action.payload);
        },
        deleteCategory(state, action: PayloadAction<number>) {
            state.categories = state.categories.filter((elem:Category) => elem.id != action.payload);
        },
        editCategory(state, action: PayloadAction<Category>) {
            state.categories = state.categories.map((elem:Category) => (elem.id == action.payload.id) ? action.payload : elem);
        }
    },
});

export const {setCategories, addCategory, deleteCategory, editCategory} = categorySlice.actions;

export default categorySlice.reducer;