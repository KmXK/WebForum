import { ApolloClient, createHttpLink, InMemoryCache, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import axios from 'axios';
import { AuthResponseModel } from '../models/auth/auth-response.model';

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

const refreshLink = onError(({graphQLErrors, operation, forward}) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions.code) {
                case 'UNAUTHENTICATED':
                    return new Observable(observer => {
                        axios.post<AuthResponseModel>('/api/auth/refresh', {
                            withCredentials: true,
                        }).then(response => {
                            localStorage.setItem('token', response.data.accessToken);

                            const oldHeaders = operation.getContext().headers;
                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    authorization: `Bearer: ${ response.data.accessToken }`,
                                },
                            });
                        }).then(() => {
                            const subscriber = {
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer)
                            };

                            forward(operation).subscribe(subscriber);
                        })
                    });
            }
        }
    }
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    link: refreshLink.concat(authLink.concat(httpLink))
});