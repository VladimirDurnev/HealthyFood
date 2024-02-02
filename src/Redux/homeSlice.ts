import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";
import { error } from "console";

export const fetchRandom = createAsyncThunk("data/fetchRandom", async () => {
    const { data } = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=f5c340d8&app_key=fba58c05fd7410ca5bc1cd6cc3825eac&calories=0-150&health=alcohol-free&random=true&imageSize=LARGE&excluded=drinks`
    );

    return data.hits;
});

interface homeState {
    data: any[];
    status: string;
}

const initialState: homeState = {
    data: [],
    status: "string",
};

export enum Status {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected",
}

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRandom.pending, (state) => {
            state.status = Status.PENDING;
        });
        builder.addCase(fetchRandom.fulfilled, (state, action) => {
            state.data = action.payload.map(({ recipe }: any) => recipe);
            state.status = Status.FULFILLED;
        });
        builder.addCase(fetchRandom.rejected, (state) => {
            state.status = Status.REJECTED;
        });
    },
});

export const selectHome = (state: RootState) => state.homeSlice.data;

export default homeSlice.reducer;
