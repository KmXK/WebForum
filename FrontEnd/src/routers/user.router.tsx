import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import React from 'react';
import SectionListScreen from '../screens/section-list.screen';
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
                    element: <SectionListScreen/>
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
