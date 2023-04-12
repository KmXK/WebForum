import React, { FC, FormEvent, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { MessageModel } from '../../../models/message/message.model';
import { addMessage } from '../../../services/message.service';

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
    },
    textField: {
        backgroundColor: 'white',
        marginTop: 30,
        marginBottom: 2,
    },
    button: {
        justifySelf: 'end',
        marginTop: 2,
    },
}));

interface Props {
    topicId: string;
    onMessageAdded: (m: MessageModel) => void;
}

const MessageEditor: FC<Props> = ({topicId, onMessageAdded}) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSending(true);
        addMessage(topicId, inputValue).then(m => {
            onMessageAdded?.(m);
            setInputValue('');
            setIsSending(false);
        });
    };

    return (
        <form className={ classes.form } onSubmit={ handleSubmit }>
            <TextField
                className={ classes.textField }
                label="New message"
                variant="outlined"
                fullWidth
                multiline={ true }
                value={ inputValue }
                onChange={ e => setInputValue(e.target.value) }
            />
            <Button
                className={ classes.button }
                variant="contained"
                color="primary"
                disabled={ isSending }
                type="submit">
                Submit
            </Button>
        </form>
    );
};

export default MessageEditor;
