import { useAuthContext } from '../global.context';
import { useLocalStorage } from './local-storage.hook';
import { User } from '../models/user/user.model';

export const useUser = () => {
    const {user, login, logout} = useAuthContext();
    const {setItem} = useLocalStorage();

    const addUser = (user: User) => {
        login(user);
        setItem('user', JSON.stringify(user));
    };

    const removeUser = () => {
        logout();
        setItem('user', '');
    };

    return {user, addUser, removeUser};
};
