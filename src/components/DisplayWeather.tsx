import React, {useState, ChangeEvent, useEffect} from "react";
import { MainWrapper } from "./weather.module";
import AirIcon from '@mui/icons-material/Air';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
// import WbCloudyIcon from '@mui/icons-material/WbCloudy';
// import WaterDropIcon from '@mui/icons-material/WaterDrop';
// import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

import { MdSunny } from "react-icons/md";
import { IoIosPartlySunny, IoIosCloudy } from "react-icons/io";
import { GiSnowing, GiRaining, GiMoonBats } from "react-icons/gi";
import { IoCloudyNightSharp } from "react-icons/io5";
import { FaMoon, FaCloudMoonRain } from "react-icons/fa";

import { RiLoaderFill } from "react-icons/ri";

import MainBox from "./MainBox"
import CustomizedTextField from "./CustomizedTextField"

import axios from "axios";
import { updateWeatherAsync } from "../state/weather/weatherSlice";

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

const DisplayWeather = () =>
{
    // USE STATES
    const [inputValue, setInputValue] = useState("");
    const [displayedCity, setDisplayedCity] = useState("Paris");
    const [currentDay, setCurrentDay] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherDataTypes | null>();

    const cityName = useSelector((state: RootState) => state.weather.city);
    const dispatch = useDispatch<AppDispatch>();

    const api_key = "53939ec5aacd4bbfb0a7bb8ce3e2a852";
    const api_endpoint = "https://api.openweathermap.org/data/2.5/";

    const fetchCurrentWeather = async (lat: number, lon: number) =>
    {
        const url = `${api_endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
        const response = await axios.get(url);
        return response.data;
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            const {latitude, longitude} = position.coords;
            Promise.all([fetchCurrentWeather(latitude, longitude)])
            .then(
                ([currentWeather]) => {
                    // console.log(currentWeather);
                    dispatch(updateWeatherAsync(currentWeather));
                }
            )
        })

        const getCurrentDayAndDate = () =>
        {
            const currentDate: Date = new Date();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday",
                                "Wednesday", "Thursday",
                                "Friday", "Saturday"];
            const dayName: string = daysOfWeek[currentDate.getDay()];
            const currentDay = currentDate.getDate();
            const monthIndex: number = currentDate.getMonth();
            const months: string[] = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const currentMonth = months[monthIndex];
            return (dayName + ", " + currentDay + " " + currentMonth);
        };

        setCurrentDay(getCurrentDayAndDate());
    }, []);
    return (
        <div style={{ backgroundColor: '#a6c8ff', height: '100vh', width: '100vw' }}>
            <MainWrapper>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <MainBox>
                    <CustomizedTextField inputValue={inputValue} 
                                        setInputValue={setInputValue}
                                        setDisplayedCity={setDisplayedCity} />

                    {/* Middle part */}
                    <div>
                        <div>{currentDay}</div>
                        <div>{cityName}</div>
                        <span>Country</span>
                        <div>
                            icon
                        </div>
                        <div>18C</div>
                        <div>cloudy</div>
                        <br />
                    </div>

                    {/* Bottom part */}
                    <div>

                        <div>
                            <AirIcon />
                            <div>
                                <div>2.55 km/h</div>
                                <p>Wind speed</p>
                            </div>
                        </div>
                    </div>
                </MainBox>
                </div>
            </MainWrapper>
        </div>
    )
}

export default DisplayWeather