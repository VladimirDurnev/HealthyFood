import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";

const apikey: string = "c8564049";
export const fetchData = createAsyncThunk("data/fetchData", async () => {
    const response = await axios.get(
        `http://www.omdbapi.com/?s=live&type=movie&apikey=${apikey}`
    );
    return response.data.Search;
});
type dataItem = Record<string, string>
// 

interface CounterState {
  
    data: dataItem[];
}

// Define the initial state using that type
const initialState: CounterState = {

    data: [],
};

export const counterSlice = createSlice({
    name: "counter",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.sliceHome.data;

export default counterSlice.reducer;
