import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";

export const fetchRandom = createAsyncThunk("data/fetchRandom", async () => {
    const { data } = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=f5c340d8&app_key=fba58c05fd7410ca5bc1cd6cc3825eac&calories=0-150&health=alcohol-free&random=true&imageSize=REGULAR&excluded=drinks`
    );
    // `https://65a6851e74cf4207b4f0442f.mockapi.io/Test`
    return data.hits;
});


interface homeState {
    data: any[];
    random: boolean;
}

const initialState: homeState = {
    data: [],
    random: true,
};

export const homeSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRandom.fulfilled, (state, action) => {
            state.data = action.payload;
            // const newData = data.map(({ recipe }: any) => recipe);
            state.data = state.data.map(({recipe}) =>  recipe)
        });
    },
});

export const selectCount = (state: RootState) => state.homeSlice.data;

export default homeSlice.reducer;
