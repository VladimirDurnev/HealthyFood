import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
    const { data } = await axios.get(
        `https://65a6851e74cf4207b4f0442f.mockapi.io/Test`
    );
    return data;
});

type dataItem = Record<string, string>;

interface SearchState {
    data: any;
}

const initialState: SearchState = {
    data: [],
};

export const searchSlice = createSlice({
    name: "counter",

    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload;
            //
        });
    },
});

export const selectCount = (state: RootState) => state.searchSlice.data;

export default searchSlice.reducer;
