import React, { FC } from 'react';
import { Stack } from '@mui/material';
import { MessageModel } from '../../../models/message/message.model';
import Message from '../message/message.component';

interface Props {
    messages: MessageModel[];
}

const MessageList: FC<Props> = ({messages}) => {
    return (
        <Stack spacing={ 2 }>
            { messages.map(m => <Message key={ m.id } message={ m }/>) }
        </Stack>
    );
};

export default MessageList;