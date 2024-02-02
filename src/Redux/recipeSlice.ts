import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface recipeState {
    recipe: object;
}

const initialState: recipeState = {
    recipe: {},
};

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        setRecipe: (state, action) => {
            state.recipe = action.payload;
        },
    },
});

export const selectRecipe = (state: RootState) => state.recipeSlice.recipe;
export const { setRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
