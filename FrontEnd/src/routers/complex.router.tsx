import { RouterProvider } from 'react-router-dom';
import { userRouter } from './user.router';
import guestRouter from './guest.router';
import { useContext } from 'react';
import { Context } from '../global.context';
import { observer } from 'mobx-react-lite';

function ComplexRouter() {
    const {store} = useContext(Context);

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
