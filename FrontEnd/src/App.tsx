import React, { useEffect, useState } from 'react';
import { getHelloString } from './services/api.service';
import styles from './App.module.scss'

const App = () => {
    const [value, setValue] = useState('');

    useEffect(() => {
        getHelloString()
            .then(x => setValue(x));
    }, []);

    return (
        <div className={ styles.container }>
            { value || 'No value read yet.' }
        </div>
    );
};

export default App;