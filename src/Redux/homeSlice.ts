import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";
import type { RecipeType } from "../type/RecipeType";
import { Status } from "../type/StatusEnum";
export const fetchRandom = createAsyncThunk("data/fetchRandom", async () => {
    const { data } = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=f5c340d8&app_key=fba58c05fd7410ca5bc1cd6cc3825eac&calories=0-150&health=alcohol-free&random=true&imageSize=LARGE&excluded=drinks&time=5%2B`
    );

    return data.hits.map(({ recipe }: any) => recipe) as RecipeType[];
});

interface IHome {
    data: RecipeType[];
    statusHeader: 'big' | 'small'
    status: Status;
}

const initialState: IHome = {
    data: [],
    statusHeader: 'big',
    status: Status.PENDING,
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setStatusHeader: (state, action: PayloadAction<'big' | 'small'>) => {
            state.statusHeader = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRandom.pending, (state) => {
            state.status = Status.PENDING;
        });
        builder.addCase(
            fetchRandom.fulfilled,
            (state, action: PayloadAction<RecipeType[]>) => {
                state.data = action.payload;
                state.status = Status.FULFILLED;
            }
        );
        builder.addCase(fetchRandom.rejected, (state) => {
            state.status = Status.REJECTED;
        });
        
    },
});
export const {setStatusHeader} = homeSlice.actions
export const selectHome = (state: RootState) => state.homeSlice;

export default homeSlice.reducer;
