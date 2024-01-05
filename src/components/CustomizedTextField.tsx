import React, {ChangeEvent, useState, useRef, useEffect} from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch } from "react-redux";
import { changeCity } from "../state/weather/weatherSlice";
import { AppDispatch } from "../state/store";

type CustomizedTextFieldProps = {
    setDisplayedCity: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (city: string) => void;
};

const CustomizedTextField = (props: CustomizedTextFieldProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [tmpValue, setTmpValue] = useState("");

    const changeInputValue = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setTmpValue(event.target.value);
    };

    const handleButtonClick = () =>
    {
        props.handleSearch(tmpValue);
        setTmpValue("");
    };

    const handleEnter = (event: React.KeyboardEvent) =>
    {
        if (event.key === "Enter")
        {
            props.handleSearch(tmpValue);
            setTmpValue("");
        }
    };

    return (
        <TextField
            id="filled-basic"
            label="Enter city"
            variant="filled"
            size="small"
            color="secondary"
            sx={{
                '@media (max-width: 768px)': {
                  width: '50%', // Adjust width for smaller screens
                  fontSize: '12px', // Adjust font size for smaller screens
                  // Add other responsive styles as needed
                },
              }}
            InputProps={{
                endAdornment: (
                    <IconButton onClick={handleButtonClick}>
                        <SearchOutlinedIcon sx={{ color: 'black' }} />
                    </IconButton> ),
            }}
            value={tmpValue}
            onChange={changeInputValue}
            onKeyDown={handleEnter}
        />
    );
};

export default CustomizedTextField;
