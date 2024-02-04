import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RecipeType } from "../type/RecipeType";
import { Status } from "../type/StatusEnum";
import { RootState } from "./store";
const mealType: string = "Breakfast";

export const fetchSearch = createAsyncThunk("data/fetchSearch", async () => {
    const { data } = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=f5c340d8&app_key=fba58c05fd7410ca5bc1cd6cc3825eac&calories=0-150&health=alcohol-free&imageSize=LARGE&excluded=drinks&time=5%2B&mealType=Breakfast`
    );
    return data.hits.map(({ recipe }: any) => recipe) as RecipeType[];
});

interface ISearch {
    data: RecipeType[];
    status: Status;
}

const initialState: ISearch = {
    data: [],
    status: Status.FULFILLED,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSearch.pending, (state) => {
            state.status = Status.PENDING;
        });
        builder.addCase(
            fetchSearch.fulfilled,
            (state, action: PayloadAction<RecipeType[]>) => {
                state.data = action.payload;
                state.status = Status.FULFILLED;
            }
        );
        builder.addCase(fetchSearch.rejected, (state) => {
            state.status = Status.REJECTED;
        });
    },
});
export const selectSearch = (state: RootState) => state.searchSlice;

export default searchSlice.reducer;
