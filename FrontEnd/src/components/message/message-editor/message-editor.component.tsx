import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';

const useStyles = makeStyles(() => ({
    textField: {
        backgroundColor: 'white',
        marginTop: 30,
        marginBottom: 2
    }
}));

interface Props {
    text: string;
    onTextChanged: (text: string) => void;
    label: string;
}

const MessageEditor: FC<Props> = ({text, onTextChanged, label}) => {
    const classes = useStyles();

    return (
        <TextField
            className={ classes.textField }
            label={ label }
            variant="outlined"
            fullWidth
            multiline={ true }
            value={ text }
            onChange={ e => onTextChanged(e.target.value) }
        />
    );
};

export default MessageEditor;
