import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import searchSlice from './searchSlice'
import recipesByCategorySlice from './recipesByCategorySlice'
export const store = configureStore({
    reducer: {
        homeSlice,
        searchSlice,
        recipesByCategorySlice
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
