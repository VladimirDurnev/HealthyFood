import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";
import { stat } from "fs";

export const fetchData = createAsyncThunk(
    "data/fetchData",
    async () => {
        const { data } = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&app_id=f5c340d8&app_key=fba58c05fd7410ca5bc1cd6cc3825eac&calories=0-150&health=alcohol-free&random=true`
        );
        // `https://65a6851e74cf4207b4f0442f.mockapi.io/Test`
        return data.hits;
    }
);

type dataItem = Record<string, string>;

interface SearchState {
    data: any;
    random: boolean;
}

const initialState: SearchState = {
    data: [],
    random: true,
};

export const searchSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export const selectCount = (state: RootState) => state.searchSlice.data;

export default searchSlice.reducer;
