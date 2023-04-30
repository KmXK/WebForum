import { createContext, useContext, useState } from 'react';

interface ReturnUrlContextType {
    returnUrl: string;
    setReturnUrl: (returnUrl: string) => void;
}

export const ReturnUrlContext = createContext<ReturnUrlContextType>({
    returnUrl: '',
    setReturnUrl: () => {
    }
});

export const useReturnUrl = () => useContext(ReturnUrlContext);

export const ReturnUrlProvider = ({children}: { children: JSX.Element }) => {
    const [returnUrl, setReturnUrl] = useState<string>('');

    return (
        <ReturnUrlContext.Provider value={ {returnUrl, setReturnUrl} }>
            { children }
        </ReturnUrlContext.Provider>
    )
}