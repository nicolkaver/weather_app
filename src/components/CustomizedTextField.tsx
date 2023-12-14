import React, {ChangeEvent} from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type CustomizedTextFieldProps = {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    setDisplayedCity: React.Dispatch<React.SetStateAction<string>>;
};

const CustomizedTextField = (props: CustomizedTextFieldProps) => {
    const changeInputValue = (event: ChangeEvent<HTMLInputElement>) =>
    {
        props.setInputValue(event.target.value);
    };

    const handleButtonClick = () =>
    {
        props.setDisplayedCity(props.inputValue);
        props.setInputValue("");
    };

    const handleEnter = (event: React.KeyboardEvent) =>
    {
        if (event.key === "Enter")
        {
            props.setDisplayedCity(props.inputValue);
            props.setInputValue("");
        }
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
                    </IconButton> ),
            }}
            value={props.inputValue}
            onChange={changeInputValue}
            onKeyDown={handleEnter}
        />
    );
};

export default CustomizedTextField;
