import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { app_id, app_key } from "../static/StaticData";
import { RecipeType } from "../type/RecipeType";
import { Status } from "../type/StatusEnum";
import { RootState } from "./store";

export const fetchRecipesByCategory = createAsyncThunk(
    "data/fetchRecipesByCategory",
    async ({ category, _cont }: { category?: string; _cont?: string }) => {
        const { data } =
            await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=
    ${app_key}${
                "&" + _cont
            }&calories=0-150&health=alcohol-free&imageSize=LARGE&excluded=drinks&time=5%2B${
                category && category
            }`);
        return data;
    }
);

interface IRecipesByCategorySlice {
    data: RecipeType[];
    status: Status;
    open: boolean;
    category: string;
    _cont: string;
}

const initialState: IRecipesByCategorySlice = {
    data: [],
    status: Status.PENDING,
    open: false,
    category: "",
    _cont: "",
};

const recipesByCategorySlice = createSlice({
    name: "RecipesByCategory",
    initialState,
    reducers: {
        setOpen: (state) => {
            state.open = !state.open;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecipesByCategory.pending, (state) => {
            state.status = Status.PENDING;
        });
        builder.addCase(
            fetchRecipesByCategory.fulfilled,
            (
                state,
                action: PayloadAction<{
                    hits: RecipeType[];
                    _links: { next: { href: string } };
                }>
            ) => {
                state.data = action.payload.hits.map(
                    ({ recipe }: any) => recipe
                ) as RecipeType[];
                state.status = Status.FULFILLED;
                state._cont = action.payload._links.next?.href.slice(
                    action.payload._links.next.href.indexOf("_cont"),
                    action.payload._links.next.href.indexOf("&health")
                );
            }
        );
        builder.addCase(fetchRecipesByCategory.rejected, (state) => {
            state.status = Status.REJECTED;
        });
    },
});
export const { setOpen, setCategory } = recipesByCategorySlice.actions;
export const selectRecipesByCategory = (state: RootState) =>
    state.recipesByCategorySlice;
export default recipesByCategorySlice.reducer;
