import { createBrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../screens/login.screen';
import React, { useEffect } from 'react';
import { useReturnUrl } from '../contexts/return-url.context';

const RedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {setReturnUrl} = useReturnUrl();

    useEffect(() => {
        setReturnUrl(location.pathname);
        navigate('/login', {
            replace: true
        });
    }, []);

    return <></>;
};

export const guestRouter = createBrowserRouter(
    [
        {
            path: '/login',
            element: <LoginPage/>
        },
        {
            path: '*',
            element: <RedirectPage/>
        }
    ]
)


export default guestRouter;
