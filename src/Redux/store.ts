import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import searchSlice from './searchSlice'

export const store = configureStore({
    reducer: {
        homeSlice,
        searchSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
