import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Center from '../components/common/center.component';
import { Box, Button, TextField } from '@mui/material';
import { gql } from '../__generated__';
import { useMutation, useQuery } from '@apollo/client';
import Loader from '../components/common/loader.component';
import useUser from '../hooks/useUser.hook';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    textField: {
        backgroundColor: 'white',
        display: 'flex',
        width: '100%',
        marginTop: 10
    }
})

const GET_USER = gql(`
    #graphql
    query GetUser($id: String!) {
        user(id: $id) {
            id
            login
            firstName
            lastName
            avatarUrl
            role {
                name
            }
        }
    }
`);

const UPDATE_USER = gql(`
    #graphql
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(updateUserInput: $input) {
            id
        }
    }
`);

const UserProfile = () => {
    const currentUser = useUser()!;
    let {userId} = useParams<{ userId: string }>();
    const styles = useStyles();
    const [user, setUser] = useState<{
        login: string,
        firstName: string,
        lastName: string
    }>();
    const [changed, setChanged] = useState(false);

    const {data, loading, refetch} = useQuery(GET_USER, {
        variables: {
            id: userId ?? currentUser.userId
        }
    });

    const [updateUser] = useMutation(UPDATE_USER);

    useEffect(() => {
        setUser({
            login: data?.user.login ?? '',
            firstName: data?.user.firstName ?? '',
            lastName: data?.user.lastName ?? ''
        });
    }, [loading]);

    useEffect(() => {
        if (user === undefined || data?.user === undefined) {
            return;
        }

        if (user.login !== data.user.login ||
            user.firstName !== data.user.firstName ||
            user.lastName !== data.user.lastName
        ) {
            setChanged(true);
        }
    }, [user]);

    const handleSave = () => {
        updateUser({
            variables: {
                input: {
                    ...user
                }
            }
        }).then(() => {
            refetch();
        });
    };

    if (loading) {
        return (
            <Center>
                <Loader/>
            </Center>
        );
    }

    if (user === undefined || data?.user === undefined) {
        return (
            <Center>
                <h2>User was not found</h2>
            </Center>
        );
    }

    return (
        <div>
            <Center>
                <h2>{ data.user.login }'s PROFILE</h2>
            </Center>

            <Center>
                <Box
                    sx={ {
                        width: 500
                    } }
                >
                    <TextField
                        className={ styles.textField }
                        label={ 'login' }
                        value={ user.login }
                        onChange={ t => setUser({...user, login: t.target.value}) }
                    />
                    <TextField
                        className={ styles.textField }
                        label={ 'First Name' }
                        value={ user.firstName }
                        onChange={ t => setUser({...user, firstName: t.target.value}) }
                    />
                    <TextField
                        className={ styles.textField }
                        label={ 'Last Name' }
                        value={ user.lastName }
                        onChange={ t => setUser({...user, lastName: t.target.value}) }
                    />
                    <TextField
                        className={ styles.textField }
                        label={ 'Role' }
                        value={ data?.user.role.name }
                        aria-readonly={ true }
                        disabled={ true }
                    />

                    { changed &&
                        <Box
                            sx={ {
                                display: 'flex',
                                justifyContent: 'end',
                                marginTop: 1
                            } }
                        >
                            <Button
                                variant={ 'contained' }
                                color={ 'primary' }
                                onClick={ () => handleSave() }
                            >
                                Save
                            </Button>
                        </Box>
                    }
                </Box>


            </Center>
        </div>
    );
};

export default UserProfile;