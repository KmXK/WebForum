import React, { useContext, useEffect } from 'react';
import styles from './App.module.scss'
import GlobalContext, { Context } from './global.context';
import { observer } from 'mobx-react-lite';
import ComplexRouter from './routers/complex.router';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { ReturnUrlProvider } from './contexts/return-url.context';

const App = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        } else {
            store.setIsAuth(false);
        }
    }, []);

    return (
        <ApolloProvider client={ client }>
            <ReturnUrlProvider>
                <GlobalContext>
                    <div className={ styles.container }>
                        <ComplexRouter/>
                    </div>
                </GlobalContext>
            </ReturnUrlProvider>
        </ApolloProvider>
    );
};

export default observer(App);
