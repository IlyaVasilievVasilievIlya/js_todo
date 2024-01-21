import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../components/model';
import { addCategoryAsync, deleteCategoryAsync, editCategoryAsync, fetchCategoriesAsync } from './categoriesActions';

type CategoriesState = {
    categories: Category[];
    loading: boolean;
    fetchError?: string;
    actionError?: string;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.loading = true;
                state.fetchError = undefined;
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(addCategoryAsync.pending, (state) => {
                state.actionError = undefined;
            })
            .addCase(addCategoryAsync.fulfilled, (state, action) => {
                state.categories.unshift(action.payload);
            })
            .addCase(deleteCategoryAsync.pending, (state) => {
                state.actionError = undefined;
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.categories = state.categories.filter((elem: Category) => elem.id != action.payload);
            })
            .addCase(editCategoryAsync.pending, (state) => {
                state.actionError = undefined;
            })
            .addCase(editCategoryAsync.fulfilled, (state, action) => {
                state.categories = state.categories.map((elem: Category) => (
                    elem.id == action.payload.id) ? action.payload : elem);
            })
            .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                state.fetchError = action.payload;
                state.loading = false;
            })
            .addCase(addCategoryAsync.rejected, (state, action) => {
                state.actionError = action.payload;
            })
            .addCase(editCategoryAsync.rejected, (state, action) => {
                state.actionError = action.payload;
            })
            .addCase(deleteCategoryAsync.rejected, (state, action) => {
                state.actionError = action.payload;
            })
            ;
    }
});


export default categorySlice.reducer;