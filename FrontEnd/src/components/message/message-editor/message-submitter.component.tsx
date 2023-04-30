import React, { FC, FormEvent, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { MessageModel } from '../../../models/message/message.model';
import { useMutation } from '@apollo/client';
import Loader from '../../common/loader.component';
import MessageEditor from './message-editor.component';
import { gql } from '../../../__generated__';

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
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

const CREATE_MESSAGE = gql(`
    #graphql
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
`);

const MessageSubmitter: FC<Props> = ({topicId, onMessageAdded}) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);

    const [createMessage, {
        loading: creationLoading,
    }] = useMutation(CREATE_MESSAGE);

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
            onMessageAdded?.({
                ...m.data!.createMessage!,
                isDeleted: false
            });
            setInputValue('');
            setIsSending(false);
        });
    };

    return (
        <form
            className={ classes.form }
            onSubmit={ handleSubmit }
        >
            <MessageEditor
                text={ inputValue }
                onTextChanged={ setInputValue }
                label="New message"
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

export default MessageSubmitter;
