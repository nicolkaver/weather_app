import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface WeatherState {
    city: string;
}

const initialState: WeatherState = {
    city: "Paris",
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        changeCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(changeCityAsync.fulfilled,
        (state, action: PayloadAction<string>) =>{
            state.city = action.payload;
        });
    },
});

export const changeCityAsync = createAsyncThunk(
    "weather/changeCityAsync",
    async (city: string) => {
        // this is just a simulation, later on it can await for example
        // fetching data from an API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return city;
    }
)

export const { changeCity } = weatherSlice.actions;

export default weatherSlice.reducer;