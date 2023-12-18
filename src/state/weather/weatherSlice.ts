import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface WeatherState {
    city: string,
    temp: number,
    humidity: number,
    feels_like: number,
    country: string,
    weather: {
        main: string,
    }[],
    windSpeed: number,
}

interface WeatherDataTypes {
    name: string,
    main: {
        temp: number,
        humidity: number,
        feels_like: number,
    },
    sys: {
        country: string,
    },
    weather: {
        main: string,
    }[],
    wind: {
        speed: number,
    },
}

const initialState: WeatherState = {
    city: "",
    temp: 0,
    humidity: 0,
    feels_like: 0,
    country: "",
    weather: [{
        main: "",
    }],
    windSpeed: 0,
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
        builder
        .addCase(changeCityAsync.fulfilled,
        (state, action: PayloadAction<string>) =>{
            state.city = action.payload;
        })
        .addCase(updateWeatherAsync.fulfilled,
        (state, action: PayloadAction<WeatherDataTypes>) =>
        {
            state.city = action.payload.name;
            state.temp = action.payload.main.temp;
            state.humidity = action.payload.main.humidity;
            state.feels_like = action.payload.main.feels_like;
            state.country = action.payload.sys.country;
            state.weather = action.payload.weather;
            state.windSpeed = action.payload.wind.speed;
        });
    },
});

export const changeCityAsync = createAsyncThunk(
    "weather/changeCityAsync",
    async (city: string) => {
        // this is just a simulation, later on it can await for example
        // fetching data from an API
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        return city;
    }
);

export const updateWeatherAsync = createAsyncThunk(
    "weather/updateWeatherAsync",
    async (obj: WeatherDataTypes) => {
        // this is just a simulation, later on it can await for example
        // fetching data from an API
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        return obj;
    }
);

export const { changeCity } = weatherSlice.actions;

export default weatherSlice.reducer;