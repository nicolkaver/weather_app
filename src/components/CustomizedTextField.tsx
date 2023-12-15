import React, {ChangeEvent} from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch } from "react-redux";
import { changeCity } from "../state/weather/weatherSlice";
import { AppDispatch } from "../state/store";

type CustomizedTextFieldProps = {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    setDisplayedCity: React.Dispatch<React.SetStateAction<string>>;
};

const CustomizedTextField = (props: CustomizedTextFieldProps) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const changeInputValue = (event: ChangeEvent<HTMLInputElement>) =>
    {
        props.setInputValue(event.target.value);
    };

    const handleButtonClick = () =>
    {
        dispatch(changeCity(props.inputValue));
        props.setInputValue("");
    };

    const handleEnter = (event: React.KeyboardEvent) =>
    {
        if (event.key === "Enter")
        {
            dispatch(changeCity(props.inputValue));
            props.setInputValue("");
        }
    };

    return (
        <TextField
            id="filled-basic"
            label="Enter city"
            variant="filled"
            size="small"
            color="secondary"
            InputProps={{
                endAdornment: (
                    <IconButton onClick={handleButtonClick}>
                        <SearchOutlinedIcon sx={{ color: 'black' }} />
                    </IconButton> ),
            }}
            value={props.inputValue}
            onChange={changeInputValue}
            onKeyDown={handleEnter}
        />
    );
};

export default CustomizedTextField;
