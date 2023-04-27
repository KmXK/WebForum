import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${ token }` : '',
        }
    }
});
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    link: authLink.concat(httpLink)
});