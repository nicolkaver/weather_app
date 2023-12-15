import React, {ReactNode} from "react";
import Box from '@mui/material/Box';

interface MainBoxProps {
    children: ReactNode;
  }

const MainBox: React.FC<MainBoxProps> = ({ children }) => {
    return (
        <Box
            component="div"
            width="400px"
            height="600px"
            padding="2rem"
            borderRadius={10}
            sx={{
                backgroundColor: '#f0f0f0',
                // backgroundImage: 'url(https://st2.depositphotos.com/1162190/6186/i/450/depositphotos_61868743-stock-photo-weather-forecast-concept.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // maxWidth: '1200px',
                // padding: '1rem',
                // margin: '0 auto',
                // '@media (max-width: 768px)': {
                //     width: '90%', // Adjust width for smaller screens
                //     height: 'auto', // Allow height to adjust based on content
                //     padding: '1rem', // Adjust padding for smaller screens
                // },
            }}
        >
            {children}
        </Box>
    );
};

export default MainBox;
