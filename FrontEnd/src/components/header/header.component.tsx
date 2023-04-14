import React, { useState } from 'react';
import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MainProfileMenu from './profile-menu.component';
import styled from '@emotion/styled';

const MainToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
});

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky" sx={ {zIndex: (theme) => theme.zIndex.drawer + 1} }>
            <MainToolbar>
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
                <Avatar
                    onClick={ () => setOpen(true) }
                />
            </MainToolbar>
            <MainProfileMenu open={ open } setOpen={ setOpen }/>
        </AppBar>
    );
}

export default Header;
