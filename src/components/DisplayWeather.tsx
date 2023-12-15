import React, {useState, ChangeEvent} from "react";
import { MainWrapper } from "./weather.module";
import AirIcon from '@mui/icons-material/Air';
import { WiHumidity } from "react-icons/wi";
import MainBox from "./MainBox"
import CustomizedTextField from "./CustomizedTextField"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";

const DisplayWeather = () =>
{
    const [inputValue, setInputValue] = useState("");
    const [displayedCity, setDisplayedCity] = useState("Paris");

    const cityName = useSelector((state: RootState) => state.weather.city);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div style={{ backgroundColor: '#a6c8ff', height: '100vh', width: '100vw' }}>
            <MainWrapper>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <MainBox>
                    <CustomizedTextField inputValue={inputValue} 
                                        setInputValue={setInputValue}
                                        setDisplayedCity={setDisplayedCity} />

                    <div className="weatherArea">
                        <h1>{cityName}</h1>
                        <span>Nz</span>
                        <div className="icon">
                            icon
                        </div>
                        <h1>18C</h1>
                        <h2>cloudy</h2>

                        <div className="bottomArea">
                            <div className="humidity">
                                <WiHumidity className="humidityIcon" />
                                <div className="humidityInfo">
                                    <h1>60%</h1>
                                    <p>Humidity</p>
                                </div>
                            </div>

                            <div className="wind">
                                <AirIcon className="windIcon" />
                                <div className="windInfo">
                                    <h1>2.55 km/h</h1>
                                    <p>Wind speed</p>
                                </div>
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