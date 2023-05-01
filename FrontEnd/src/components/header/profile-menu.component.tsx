import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { MouseEvent, useContext, useState } from 'react';
import { Context } from '../../global.context';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser.hook';

function MainProfileMenu() {
    const user = useUser();
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={ {display: 'flex', alignItems: 'center', textAlign: 'center'} }>
                <Tooltip title="Account settings">
                    <>
                        { user?.login }
                        <IconButton
                            onClick={ handleClick }
                            size="small"
                            sx={ {ml: 2} }
                            aria-controls={ open ? 'account-menu' : undefined }
                            aria-haspopup="true"
                            aria-expanded={ open ? 'true' : undefined }
                        >
                            <Avatar sx={ {width: 32, height: 32} }></Avatar>
                        </IconButton>
                    </>
                </Tooltip>
            </Box>
            <Menu
                disableScrollLock={ true }
                anchorEl={ anchorEl }
                id="account-menu"
                open={ open }
                onClose={ handleClose }
                onClick={ handleClose }
                PaperProps={ {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                } }
                transformOrigin={ {horizontal: 'right', vertical: 'top'} }
                anchorOrigin={ {horizontal: 'right', vertical: 'bottom'} }
            >
                <MenuItem
                    onClick={ () => {
                        navigate('/profile');
                        handleClose();
                    } }
                >
                    <Avatar/> Profile
                </MenuItem>
                <Divider/>
                <MenuItem onClick={ () => store.logout() }>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default MainProfileMenu;
