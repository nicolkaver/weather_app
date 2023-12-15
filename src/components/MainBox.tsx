import React, {ReactNode} from "react";
import Box from '@mui/material/Box';

interface MainBoxProps {
    children: ReactNode;
  }

const MainBox: React.FC<MainBoxProps> = ({ children }) => {
    return (
        <Box
            component="div"
            width="60%"
            height="80%"
            padding="2rem"
            borderRadius={10}
            sx={{
                backgroundColor: '#f0f0f0',
                backgroundImage: 'url(https://st2.depositphotos.com/1162190/6186/i/450/depositphotos_61868743-stock-photo-weather-forecast-concept.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {children}
        </Box>
    );
};

export default MainBox;
