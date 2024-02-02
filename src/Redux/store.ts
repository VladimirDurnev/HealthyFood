import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import recipeSlice from "./recipeSlice";
export const store = configureStore({
    reducer: {
        homeSlice,
        recipeSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
