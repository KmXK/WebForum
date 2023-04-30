import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../screens/login.screen';
import React from 'react';

export const guestRouter = createBrowserRouter(
    [
        {
            path: '*',
            element: <LoginPage/>
        }
    ]
)


export default guestRouter;
