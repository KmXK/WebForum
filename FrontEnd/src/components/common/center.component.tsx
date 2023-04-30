import React from 'react';
import { Box } from '@mui/material';

interface Props {
    children: React.ReactNode;
}

const Center = ({children}: Props) => {
    return (
        <Box
            sx={ {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            } }
        >
            { children }
        </Box>
    );
};

export default Center;