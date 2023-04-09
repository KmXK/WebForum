import React from 'react';
import Header from '../components/header/header.component';
import { Outlet } from 'react-router-dom';

const HomeScreen = () => {
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