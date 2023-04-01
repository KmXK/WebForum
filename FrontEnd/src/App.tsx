import React, { useEffect, useState } from 'react';
import { getHelloString } from './services/api.service';

const App = () => {
    const [value, setValue] = useState('');

    useEffect(() => {
        getHelloString()
            .then(x => setValue(x));
    }, []);

    return (
        <div>
            { value || 'No value read yet.' }
        </div>
    );
};

export default App;