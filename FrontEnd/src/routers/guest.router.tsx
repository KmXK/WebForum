import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../screens/login.screen';
import React from 'react';

export const guestRouter = createBrowserRouter(
    [
        {
            path: '/login',
            element: <LoginPage/>
        },
        {
            path: '*',
            element: <Navigate to="/login" replace={ false }/>
        }
    ]
)


export default guestRouter;
