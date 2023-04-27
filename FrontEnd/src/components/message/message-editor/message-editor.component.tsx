import React, { FC, FormEvent, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { MessageModel } from '../../../models/message/message.model';
import { gql, useMutation } from '@apollo/client';
import Loader from '../../common/loader.component';

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
    },
    textField: {
        backgroundColor: 'white',
        marginTop: 30,
        marginBottom: 2
    },
    button: {
        justifySelf: 'end',
        marginTop: 2
    }
}));

interface Props {
    topicId: string;
    onMessageAdded: (m: MessageModel) => void;
}

const CREATE_MESSAGE = gql`
    mutation CreateMessage($createMessage: CreateMessageInput!) {
        createMessage(createMessage: $createMessage) {
            id
            text
            author {
                id
                login
            }
            creationTime
        }
    }
`;

type CreatedMessage = {
    createMessage: {
        id: string,
        text: string;
        author: {
            id: string;
            login: string;
        };
        creationTime: string;
        isDeleted: boolean;
    }
}

const MessageEditor: FC<Props> = ({topicId, onMessageAdded}) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);

    const [createMessage, {
        data: createdMessage,
        loading: creationLoading,
        error: creationError
    }] = useMutation<CreatedMessage>(CREATE_MESSAGE);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSending(true);
        createMessage({
            variables: {
                createMessage: {
                    text: inputValue,
                    topicId: topicId
                }
            }
        }).then(m => {
            const message = m.data!.createMessage!;
            message.isDeleted = false;
            onMessageAdded?.(message);
            setInputValue('');
            setIsSending(false);
        });
    };

    return (
        <form
            className={ classes.form }
            onSubmit={ handleSubmit }
        >
            <TextField
                className={ classes.textField }
                label="New message"
                variant="outlined"
                fullWidth
                multiline={ true }
                value={ inputValue }
                onChange={ e => setInputValue(e.target.value) }
            />
            { creationLoading
                ? <Loader/>
                : <Button
                    className={ classes.button }
                    variant="contained"
                    color="primary"
                    disabled={ isSending }
                    type="submit"
                >
                    Submit
                </Button>
            }
        </form>
    );
};

export default MessageEditor;
