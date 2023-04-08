import React from 'react';
import styles from './app.module.scss'
import { RouterProvider } from 'react-router-dom';
import { userRouter } from './routers/user.router';

const App = () => {
    return (
        <div className={ styles.container }>
            <RouterProvider router={ userRouter }/>
        </div>
    );
};

export default App;
