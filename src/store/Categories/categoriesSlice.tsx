import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../components/model';
import { addCategoryAsync, deleteCategoryAsync, editCategoryAsync, fetchCategoriesAsync } from './categoriesActions';

type CategoriesState = {
    categories: Category[];
    loading: boolean;
    error?: string;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false
}

function isError(action: UnknownAction) {
    return action.type.endsWith('rejected');
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
                state.error = undefined;
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(addCategoryAsync.pending, (state) => {
                state.error = undefined;
            })
            .addCase(addCategoryAsync.fulfilled, (state, action) => {
                state.categories.unshift(action.payload);
            })
            .addCase(deleteCategoryAsync.pending, (state) => {
                state.error = undefined;
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.categories = state.categories.filter((elem: Category) => elem.id != action.payload);
            })
            .addCase(editCategoryAsync.pending, (state) => {
                state.error = undefined;
            })
            .addCase(editCategoryAsync.fulfilled, (state, action) => {
                state.categories = state.categories.map((elem: Category) => (
                    elem.id == action.payload.id) ? action.payload : elem);
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            })
            ;
    }
});


export default categorySlice.reducer;