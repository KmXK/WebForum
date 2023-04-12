import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position={ 'static' }
                sx={ {background: '#ff5c5c'} }>
            <Toolbar>
                <Typography variant={ 'h6' }>
                    <Link
                        to={ '/' }
                        style={ {
                            textDecoration: 'none',
                            color: 'white'
                        } }
                    >
                        Web Forum
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
