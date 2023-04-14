import { createContext } from 'react';
import Store from './store';

export type ContextType = {
    store: Store;
};

const store = new Store();

export const Context = createContext<ContextType>({store});

type Props = {
    children: JSX.Element;
};

function GlobalContext({ children }: Props) {
    return <Context.Provider value={{ store }}>{children}</Context.Provider>;
}

export default GlobalContext;
