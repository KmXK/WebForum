import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <div style={ {display: 'flex', justifyContent: 'center'} }>
            <CircularProgress/>
        </div>
    )
};

export default Loader;