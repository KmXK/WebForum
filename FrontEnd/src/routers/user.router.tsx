import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import React from 'react';
import SectionScreen from '../screens/section.screen';
import HomeScreen from '../screens/home.screen';

export const userRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <HomeScreen/>,
            children: [
                {
                    path: '/',
                    element: <Navigate to="/sections" replace={ false }/>,
                },
                {
                    path: '/sections',
                    element: <SectionScreen/>
                }
            ]
        },
        {
            path: '*',
            loader: () => {
                throw redirect('/sections')
            }
        }
    ]
)
