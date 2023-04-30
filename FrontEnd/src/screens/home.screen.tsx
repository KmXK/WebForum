import React, { useEffect } from 'react';
import Header from '../components/header/header.component';
import { Outlet, useNavigate } from 'react-router-dom';
import { useReturnUrl } from '../contexts/return-url.context';

const HomeScreen = () => {
    const {returnUrl} = useReturnUrl();
    const navigate = useNavigate();

    useEffect(() => {
        if (returnUrl) {
            navigate(returnUrl);
        }
    }, []);

    return (
        <div>
            <Header/>
            <div style={ {padding: 10} }>
                <Outlet/>
            </div>
        </div>
    );
};

export default HomeScreen;