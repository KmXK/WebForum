import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar position={ 'static' }
                sx={ {background: '#ff5c5c'} }>
            <Toolbar>
                <Typography variant={ 'h6' }>
                    Web Forum
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
