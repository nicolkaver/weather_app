import React, {ReactNode, useState, ChangeEvent} from "react";
import { MainWrapper } from "./weather.module";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AirIcon from '@mui/icons-material/Air';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { WiHumidity } from "react-icons/wi";

interface ColoredAndBackgroundBoxProps {
    children: ReactNode;
  }
  

const ColoredAndBackgroundBox: React.FC<ColoredAndBackgroundBoxProps> = ({ children }) => {
    return (
        <Box
            component="div"
            width={300}
            padding={2}
            borderRadius={10}
            style={{
            backgroundColor: '#f0f0f0',
            //   backgroundImage: 'url("/path/to/your/image.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        >
            {children}
        </Box>
    );
};

const CustomizedTextField = () => {
    const [inputValue, setInputValue] = useState("");
    const changeInputValue = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () =>
    {
        setInputValue("");
        console.log("Button clicked!");
    };

    return (
        <TextField
            id="outlined-basic"
            label="Enter city"
            variant="outlined"
            size="small"
            InputProps={{
                endAdornment: (
                    <IconButton onClick={handleButtonClick}>
                        <SearchOutlinedIcon sx={{ color: 'gray' }} />
                    </IconButton>                ),
            }}
            value = {inputValue}
            onChange={changeInputValue}
        />
    );
}  

const DisplayWeather = () =>
{
    const [displayedCity, setDisplayedCity] = useState("");

    return (
        <div style={{ backgroundColor: '#a6c8ff', height: '100vh', width: '100vw' }}>
            <MainWrapper>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ColoredAndBackgroundBox>
                    <CustomizedTextField />

                    <div className="weatherArea">
                        <h1>Auckland</h1>
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
                </ColoredAndBackgroundBox>
                </div>
            </MainWrapper>
        </div>
    )
}

export default DisplayWeather