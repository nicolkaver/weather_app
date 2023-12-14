import React, {ReactNode} from "react";
import Box from '@mui/material/Box';

interface MainBoxProps {
    children: ReactNode;
  }

const MainBox: React.FC<MainBoxProps> = ({ children }) => {
    return (
        <Box
            component="div"
            width="70%"
            height="80%"
            padding="2rem"
            borderRadius={10}
            style={{
                backgroundColor: '#f0f0f0',
                //   backgroundImage: 'url("/path/to/your/image.jpg")',
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
