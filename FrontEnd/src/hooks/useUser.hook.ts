import { useContext } from 'react';
import { Context } from '../global.context';

const useUser = () => {
    const {store} = useContext(Context);

    return store.user;
};

export default useUser;