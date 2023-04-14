import React, { useContext, useEffect } from 'react';
import styles from './App.module.scss'
import GlobalContext, { Context } from './global.context';
import { observer } from 'mobx-react-lite';
import ComplexRouter from './routers/complex.router';

const App = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    return (
        <GlobalContext>
            <div className={ styles.container }>
                <ComplexRouter/>
            </div>
        </GlobalContext>
    );
};

export default observer(App);
