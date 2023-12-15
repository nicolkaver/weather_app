import React, {useState, ChangeEvent, useEffect} from "react";
import { MainWrapper } from "./weather.module";
import AirIcon from '@mui/icons-material/Air';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";

import MainBox from "./MainBox"
import CustomizedTextField from "./CustomizedTextField"

const DisplayWeather = () =>
{
    // USE STATES
    const [inputValue, setInputValue] = useState("");
    const [displayedCity, setDisplayedCity] = useState("Paris");
    const [currentDay, setCurrentDay] = useState("");

    const cityName = useSelector((state: RootState) => state.weather.city);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
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