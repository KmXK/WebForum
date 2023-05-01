import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import MarkdownEditor, { defaultCommands } from '@uiw/react-markdown-editor';

const useStyles = makeStyles(() => ({
    textField: {
        width: '100%',
        height: '200px',
        marginTop: 30,
        marginBottom: 2,
        '&:focus': {
            outline: 'none'
        }
    }
}));

interface Props {
    text: string;
    onTextChanged: (text: string) => void;
    label: string;
}

const MessageEditor: FC<Props> = ({text, onTextChanged}) => {
    const classes = useStyles();

    return (
        <MarkdownEditor
            className={ classes.textField }
            value={ text }
            onChange={ t => onTextChanged(t) }
            toolbarsFilter={ (cmd, i) => i < 10 && cmd !== defaultCommands.fullscreen }
        />
        // <TextField
        //     className={ classes.textField }
        //     label={ label }
        //     variant="outlined"
        //     fullWidth
        //     multiline={ true }
        //     value={ text }
        //     onChange={ e => onTextChanged(e.target.value) }
        // />
    );
};

export default MessageEditor;
