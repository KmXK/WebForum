import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import SectionListScreen from '../screens/section-list.screen';
import HomeScreen from '../screens/home.screen';
import SectionScreen from '../screens/section.screen';
import TopicScreen from '../screens/topic.screen';
import NewTopicScreen from '../screens/new-topic.screen';
import UserProfileScreen from '../screens/user-profile.screen';

export const userRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <HomeScreen/>,
            children: [
                {
                    path: '/',
                    element: <Navigate
                        to={ '/sections' }
                        replace={ true }
                    />
                },
                {
                    path: '/sections',
                    element: <SectionListScreen/>
                },
                {
                    path: '/sections/:sectionId',
                    element: <SectionScreen/>
                }, {
                    path: '/sections/:sectionId/new',
                    element: <NewTopicScreen/>
                },
                {
                    path: '/topics/:topicId',
                    element: <TopicScreen/>
                },
                {
                    path: '/profile',
                    element: <UserProfileScreen/>
                },
                {
                    path: '/profile/:userId',
                    element: <UserProfileScreen/>
                }
            ]
        },
        {
            path: '*',
            element: <Navigate
                to={ '/sections' }
                replace={ false }
            />
        }
    ]
)
