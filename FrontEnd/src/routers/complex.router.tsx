import { RouterProvider } from 'react-router-dom';
import { userRouter } from './user.router';
import guestRouter from './guest.router';
import React, { useContext } from 'react';
import { Context } from '../global.context';
import { observer } from 'mobx-react-lite';
import Loader from '../components/common/loader.component';
import { Box } from '@mui/material';

function ComplexRouter() {
    const {store} = useContext(Context);

    if (store.isAuth === undefined) {
        return <Box
            sx={ {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            } }
        >
            <Loader/>
        </Box>;
    }

    return (
        <RouterProvider
            router={
                store.isAuth
                    ? userRouter
                    : guestRouter }
        />
    );
}

export default observer(ComplexRouter);
