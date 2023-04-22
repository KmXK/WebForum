import React, { FC } from 'react';
import { Stack } from '@mui/material';
import { MessageModel } from '../../../models/message/message.model';
import Message from '../message/message.component';

interface Props {
    messages: MessageModel[];
    onMessageDeleted?: (message: MessageModel, startAnimation?: (callback?: () => void) => void) => void
}

const MessageList: FC<Props> = ({messages, onMessageDeleted}) => {
    function onMessagedDeleted(callback?: () => void) {
        callback?.();
    }

    return (
        <Stack spacing={ 2 }>
            { messages.map(m =>
                <Message
                    key={ m.id }
                    message={ m }
                    onMessageDeleted={ () => onMessageDeleted?.(m, onMessagedDeleted) }
                />) }
        </Stack>
    );
};

export default MessageList;