import { observer } from 'mobx-react-lite';
import { RouterProvider } from 'react-router-dom';
import { userRouter } from './user.router';

function ComplexRouter() {
    return (
        <>
            <RouterProvider router={ userRouter }/>
            {/*<RouterProvider router={ store.isAuth ? userRouter : guestRouter }/>*/ }
        </>
    );
}

export default observer(ComplexRouter);
