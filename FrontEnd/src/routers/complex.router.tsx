import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../global.context';
import { RouterProvider } from 'react-router-dom';
import { userRouter } from './user.router';
import { guestRouter } from './guest.router';

function ComplexRouter() {
    const {store} = useContext(Context);

    return (
        <>
            <RouterProvider router={ store.isAuth ? userRouter : guestRouter }/>
        </>
    );
}

export default observer(ComplexRouter);
