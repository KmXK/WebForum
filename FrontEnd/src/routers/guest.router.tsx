import { createBrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import LoginScreen from '../screens/login.screen';
import React, { useEffect } from 'react';
import { useReturnUrl } from '../contexts/return-url.context';
import RegisterScreen from '../screens/register.screen';

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
            element: <LoginScreen/>
        },
        {
            path: '/register',
            element: <RegisterScreen/>
        },
        {
            path: '*',
            element: <RedirectPage/>
        }
    ]
)


export default guestRouter;
