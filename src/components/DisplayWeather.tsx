import React, {useState, useEffect} from "react";
import { MainWrapper } from "./weather.module";
import AirIcon from '@mui/icons-material/Air';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";

import { MdSunny } from "react-icons/md";
import { IoIosPartlySunny, IoIosCloudy, IoIosThunderstorm } from "react-icons/io";
import { GiSnowing, GiRaining, GiMoonBats, GiFog, GiSnowman } from "react-icons/gi";
import { IoCloudyNightSharp } from "react-icons/io5";
import { FaMoon, FaCloudMoonRain } from "react-icons/fa";
import { RiLoaderFill, RiDrizzleFill } from "react-icons/ri";

import MainBox from "./MainBox";
import CustomizedTextField from "./CustomizedTextField";
import ErrorAlert from "./ErrorAlert";
import { Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';

import axios, { AxiosError } from "axios";
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

const useStyles = makeStyles({
    errorAlert: {
        // '& .MuiPaper-root': {
        //     backgroundColor: '#FFC0CB',
        // },
        backgroundColor: '#FFC0CB',
        margin: '0.5em',
        padding: '1em',
    },
    cancelIcon: {
        color: "black",
        cursor: "pointer",
        // '&:hover': {
        //     textDecoration: 'underline',
        // },
    },
});

const DisplayWeather = () =>
{
    // USE STATES
    const [displayedCity, setDisplayedCity] = useState("Paris");
    const [currentDay, setCurrentDay] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const cityName = useSelector((state: RootState) => state.weather.city);
    const countryName = useSelector((state: RootState) => state.weather.country);
    const temperature = useSelector((state: RootState) => state.weather.temp);
    const weatherState = useSelector((state: RootState) => state.weather.weather[0].main);
    const windSpeed = useSelector((state: RootState) => state.weather.windSpeed);

    const dispatch = useDispatch<AppDispatch>();

    const classes = useStyles();

    const apiKey: string = (process.env.REACT_APP_API_KEY as string);
    const apiEndpoint: string = (process.env.REACT_APP_API_ENDPOINT as string);

    // weather from the city of my current location
    const fetchCurrentWeather = async (lat: number, lon: number) =>
    {
        const url = `${apiEndpoint}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        const response = await axios.get(url);
        return response.data;
    }

    // weather from the city that we entered in the input
    const fetchWeatherByCity = async(city: string) =>
    {
        try
        {
            const url = `${apiEndpoint}weather?q=${city}&appid=${apiKey}&units=metric`;
            const searchResponse = await axios.get(url);
            const currentSearchResults: WeatherDataTypes = searchResponse.data; 
            return {currentSearchResults};
        } 
        catch (error: unknown)
        {
            if (axios.isAxiosError(error))
            {
                if (error.response && error.response.status === 404)
                {
                    handleCityNotFound();
                }
            }
            throw error;
        }
    };

    const handleCityNotFound = () =>
    {
        handleErrorAlert("City not found :(");
    };

    const handleErrorAlert = (message: string) =>
    {
        setErrorMessage(message);
        setShowErrorAlert(true);
    };

    const handleCloseErrorAlert = () =>
    {
        setShowErrorAlert(false);
        setErrorMessage("");
    };

    const handleSearch = async (city: string) =>
    {
        if (city.trim() === "")
        {
            console.log("Error: The input was empty");
            return;
        }

        try
        {
            const {currentSearchResults} = await fetchWeatherByCity(city);
            dispatch(updateWeatherAsync(currentSearchResults));
        }
        catch (_error)
        {
        }
    };

    const iconChanger = (weather: string) =>
    {
        let iconElement: React.ReactNode;
        const iconColor = "black";

        switch(weather) {
            case "Rain":
                iconElement = <GiRaining />
                break ;
            case "Clear":
                iconElement = <MdSunny />
                break ;
            case "Clouds":
                iconElement = <IoIosCloudy />
                break ;
            case "Mist":
                iconElement = <GiFog />
                break ;
            case "Drizzle":
                iconElement = <RiDrizzleFill />
                break ;
            case "Thunderstorm":
                iconElement = <IoIosThunderstorm />
                break ;
            case "Snow":
                iconElement = <GiSnowman />
                break ;
            default:
                iconElement = <IoIosPartlySunny />
        }
        return (iconElement);
    };


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            const {latitude, longitude} = position.coords;
            Promise.all([fetchCurrentWeather(latitude, longitude)])
            .then(
                ([currentWeather]) => {
                    setIsLoading(true);
                    dispatch(updateWeatherAsync(currentWeather));
                }
            )
        });

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
                        <CustomizedTextField handleSearch={handleSearch} />
                        <ErrorAlert errorMessage={errorMessage} 
                                    classes={classes}
                                    showErrorAlert={showErrorAlert}
                                    handleCloseErrorAlert={handleCloseErrorAlert}
                                     />
                        {/* Middle part */}
                        {isLoading ? (
                            <>
                            <div>
                                <Grid>
                                    <div>{currentDay}</div>
                                    <div>{cityName}</div>
                                    <span>{countryName}</span>
                                </Grid>
                                <br />
                                <Grid>
                                    <div>
                                        {iconChanger(weatherState)}
                                    </div>
                                    <div>{temperature}°C</div>
                                    <div>{weatherState}</div>
                                </Grid>
                                <br />
                            </div>

                            {/* Bottom part */}
                            <div>

                                <div>
                                    <AirIcon />
                                    <div>
                                        <div>{windSpeed}</div>
                                        <p>Wind speed</p>
                                    </div>
                                </div>
                            </div>
                            </>) : (
                            <div>
                               <RiLoaderFill />
                               <p>Loading</p> 
                            </div>
                        )}
                    </MainBox>
                </div>
            </MainWrapper>
        </div>
    )
}

export default DisplayWeather