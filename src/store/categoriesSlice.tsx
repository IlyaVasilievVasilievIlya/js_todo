import { PayloadAction, createSlice, createAsyncThunk, UnknownAction } from '@reduxjs/toolkit';
import { Category } from '../components/model';
import { API_URL } from '../public/consts';

type CategoriesState = {
    categories: Category[];
    loading: boolean;
    error?: string;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false
}

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
                state.categories.push(action.payload);
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