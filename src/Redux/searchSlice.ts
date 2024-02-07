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
        dishType,
        time,
    }: {
        mealType: string[];
        searchInput: string;
        dishType: string[];
        time?: string;
    }) => {
        const { data } = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public${
                "&q=" + searchInput
            }&app_id=f5c340d8&app_key=fba58c05fd7410ca5bc1cd6cc3825eac&calories=0-150&health=alcohol-free&imageSize=LARGE&excluded=drinks${
                time ? "&time=" + time : "&time=5%2B"
            }${mealType.join("")}${dishType.join("")}`
        );
        return data.hits.map(({ recipe }: any) => recipe) as RecipeType[];
    }
);

interface ISearch {
    data: RecipeType[];
    mealType: string[];
    dishType: string[];
    diet: string[];
    time: string;
    searchInput: string;
    clearStatus: boolean;
    status: Status;
    [key: string]: any;
}

const initialState: ISearch = {
    data: [],
    mealType: [],
    dishType: [],
    diet: [],
    time: "",
    searchInput: "",
    clearStatus: false,
    status: Status.PENDING,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateArray: (
            state,
            action: PayloadAction<{
                key: string;
                value: string;
                operation: "add" | "remove";
            }>
        ) => {
            const { key, value, operation } = action.payload;

            if (operation === "add") {
                state[key] = [...state[key], `&${key}=${value.toLowerCase()}`];
            } else if (operation === "remove") {
                state[key] = state[key].filter(
                    (item: string) => item !== `&${key}=${value.toLowerCase()}`
                );
            }
        },

        setSearchInput: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload;
        },
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
        clearAll: (state) => {
            state.mealType = [];
            state.searchInput = "";
            state.time = "";
            state.clearStatus = true;
        },
        setClearStatus: (state, action: PayloadAction<boolean>) => {
            state.clearStatus = action.payload;
        },
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
export const {
    setSearchInput,
    setTime,
    clearAll,
    setClearStatus,
    updateArray,
} = searchSlice.actions;
export const selectSearch = (state: RootState) => state.searchSlice;

export default searchSlice.reducer;
