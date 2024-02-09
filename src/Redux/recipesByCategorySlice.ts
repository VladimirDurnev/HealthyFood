import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { app_id, app_key } from "../static/StaticData";
import { RecipeType } from "../type/RecipeType";
import { Status } from "../type/StatusEnum";
import { RootState } from "./store";

export const fetchRecipesByCategory = createAsyncThunk(
    "data/fetchRecipesByCategory",
    async ({ category }: { category: string }) => {
        const { data } =
            await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=
    ${app_key}&calories=0-150&health=alcohol-free&random=true&imageSize=LARGE&excluded=drinks&time=5%2B${category}`);
        return data.hits.map(({ recipe }: any) => recipe) as RecipeType[];
    }
);

interface IRecipesByCategorySlice {
    data: RecipeType[];
    status: Status;
    open: boolean;
}

const initialState: IRecipesByCategorySlice = {
    data: [],
    status: Status.PENDING,
    open: false,
    
};

const recipesByCategorySlice = createSlice({
    name: "RecipesByCategory",
    initialState,
    reducers: {
        setOpen: (state) => {
            state.open = !state.open;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecipesByCategory.pending, (state) => {
            state.status = Status.PENDING;
        });
        builder.addCase(
            fetchRecipesByCategory.fulfilled,
            (state, action: PayloadAction<RecipeType[]>) => {
                state.data = action.payload;
                state.status = Status.FULFILLED;
            }
        );
        builder.addCase(fetchRecipesByCategory.rejected, (state) => {
            state.status = Status.REJECTED;
        });
    },
});
export const { setOpen } = recipesByCategorySlice.actions;
export const selectRecipesByCategory = (state: RootState) =>
    state.recipesByCategorySlice;
export default recipesByCategorySlice.reducer;
