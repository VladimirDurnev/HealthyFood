import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RecipeType } from "../type/RecipeType";
import { Status } from "../type/StatusEnum";
import { RootState } from "./store";

export const fetchSearch = createAsyncThunk(
    "data/fetchSearch",
    async ({
        mealType,
        searchInput,
        time
    }: {
        mealType: string[];
        searchInput: string;
        time?: string
    }) => {
        const { data } = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public${
                "&q=" + searchInput
            }&app_id=f5c340d8&app_key=fba58c05fd7410ca5bc1cd6cc3825eac&calories=0-150&health=alcohol-free&imageSize=LARGE&excluded=drinks${time ? '&time=' + time : '&time=5%2B'}${mealType.join(
                ""
            )}`
        );
        return data.hits.map(({ recipe }: any) => recipe) as RecipeType[];
    }
);

interface ISearch {
    data: RecipeType[];
    mealType: string[];
    time: string;
    searchInput: string;
    status: Status;
}

const initialState: ISearch = {
    data: [],
    mealType: [],
    time: "",
    searchInput: "",
    status: Status.FULFILLED,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setMealType: (state, action: PayloadAction<string>) => {
            state.mealType.push("&mealType=" + action.payload);
            console.log("add: " + state.mealType);
        },
        daleteItemMealType: (state, action: PayloadAction<string>) => {
            state.mealType = state.mealType.filter(
                (item) => item !== "&mealType=" + action.payload
            );
            console.log("delete: " + state.mealType);
        },
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload;
        },
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload
        }
    },
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
export const { setMealType, daleteItemMealType, setSearchInput, setTime } =
    searchSlice.actions;
export const selectSearch = (state: RootState) => state.searchSlice;

export default searchSlice.reducer;
