import React, { FC } from 'react';
import { Stack } from '@mui/material';
import { MessageModel } from '../../../models/message/message.model';
import Message from '../message/message.component';
import styles from './message-list.module.scss';

interface Props {
    messages: MessageModel[];
    onMessageDeleted?: (message: MessageModel) => void
}

const MessageList: FC<Props> = ({messages, onMessageDeleted}) => {
    return (
        <Stack spacing={ 2 }>
            { messages.map(m =>
                <div
                    className={ styles.messageContainer }
                    id={ `message-${ m.id }` }
                    key={ m.id }
                >
                    <Message
                        message={ m }
                        onMessageDeleted={ () => onMessageDeleted?.(m) }
                    />
                </div>)
            }
        </Stack>
    );
};

export default MessageList;