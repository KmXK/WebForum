import React, { useEffect, useState } from 'react';
import Center from '../components/common/center.component';
import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { gql } from '../__generated__';
import { useMutation } from '@apollo/client';
import { NavigateBefore } from '@mui/icons-material';

const useStyles = makeStyles({
    textField: {
        display: 'flex',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 2
    }
});

const CREATE_TOPIC = gql(`
    #graphql
    mutation CreateTopic($createTopicInput: CreateTopicInput!) {
        createTopic(createTopicInput: $createTopicInput) {
            id
        }
    }
`);

const NewTopicScreen = () => {
    const {sectionId} = useParams<{ sectionId: string }>();

    if (sectionId === undefined) {
        return <NavigateBefore/>
    }

    const styles = useStyles();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        message: ''
    });

    const [creatingInProcess, setCreatingInProcess] = useState(false);

    const [createTopic, {data: createdTopicData}] = useMutation(CREATE_TOPIC, {fetchPolicy: 'network-only'});

    useEffect(() => {
        if (!creatingInProcess && createdTopicData) {
            navigate(`/topics/${ createdTopicData.createTopic.id }`, {
                replace: true
            });
        }
    }, [creatingInProcess, createdTopicData]);


    const handleCreate = () => {
        setCreatingInProcess(true);

        createTopic({
            variables: {
                createTopicInput: {
                    name: data.name,
                    messageText: data.message,
                    sectionId: +sectionId,
                    isImportant: false
                }
            }
        }).then(() => {
            setCreatingInProcess(false);
        });
    };

    return (
        <div>
            <Center>
                <h2>NEW TOPIC</h2>
            </Center>

            <Center>
                <Box
                    sx={ {
                        width: 500
                    } }
                >
                    <div>
                        <TextField
                            className={ styles.textField }
                            label={ 'Name' }
                            value={ data.name }
                            onChange={ t => setData({...data, name: t.target.value}) }
                            aria-errormessage={ 'Text' }
                        />
                        <TextField
                            className={ styles.textField }
                            multiline={ true }
                            label={ 'Message' }
                            value={ data.message }
                            onChange={ t => setData({...data, message: t.target.value}) }
                        />

                        { creatingInProcess ||
                            <Box
                                sx={ {
                                    marginTop: 1,
                                    display: 'flex',
                                    justifyContent: 'end',
                                } }
                            >
                                <Button
                                    variant={ 'contained' }
                                    color={ 'secondary' }
                                    onClick={ () => navigate(-1) }
                                    sx={ {
                                        width: 100,
                                        marginRight: 1
                                    } }
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    variant={ 'contained' }
                                    color={ 'primary' }
                                    onClick={ () => handleCreate() }
                                    sx={ {
                                        width: 100
                                    } }
                                >
                                    CREATE
                                </Button>
                            </Box> }
                    </div>
                </Box>
            </Center>
        </div>
    );
};

export default NewTopicScreen;