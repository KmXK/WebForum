import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import SectionScreen from '../screens/section.screen';

export const userRouter = createBrowserRouter([{
    path: '/',
    element: <SectionScreen/>
}])
