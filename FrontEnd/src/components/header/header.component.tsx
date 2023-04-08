import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar title={ 'Penis' } position={ 'static' }
                sx={ {background: '#ff5353'} }>
            <Toolbar>
                <Typography variant={ 'h6' }>
                    Web Forum
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
