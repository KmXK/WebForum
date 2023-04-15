import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import SectionListScreen from '../screens/section-list.screen';
import HomeScreen from '../screens/home.screen';
import SectionScreen from '../screens/section.screen';
import TopicScreen from '../screens/topic.screen';

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
                    index: true,
                    path: '/sections',
                    element: <SectionListScreen/>
                },
                {
                    path: '/sections/:sectionId',
                    element: <SectionScreen/>
                },
                {
                    path: '/topics/:topicId',
                    element: <TopicScreen/>
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to={ '/' }/>
        }
    ]
)
