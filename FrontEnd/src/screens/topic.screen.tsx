import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/loader.component';
import TopicHeader from '../components/topic/header/topic-header.component';
import MessageList from '../components/message/message-list/message-list.component';
import MessageEditor from '../components/message/message-editor/message-editor.component';
import { MessageModel } from '../models/message/message.model';
import { deleteMessage } from '../services/message.service';
import { gql, useQuery } from '@apollo/client';
import { NavigateBefore } from '@mui/icons-material';

const GET_TOPIC = gql`
    query GetTopic($id: String!) {
        topic(id: $id) {
            id
            name
            messages {
                id
                author {
                    id
                    login
                }
                creationTime
                isDeleted
                text
            }
        }
    }
`;

type GetTopicResult = {
    topic: {
        id: string;
        name: string;
        messages: Array<{
            id: string;
            author: {
                id: string;
                login: string;
            };
            creationTime: string;
            isDeleted: boolean;
            text: string;
        }>
    }
}

const TopicScreen = () => {
    const {topicId} = useParams<{ topicId: string }>();

    const {data, loading, error} = useQuery<GetTopicResult>(GET_TOPIC, {
        variables: {
            id: topicId
        }
    });

    const [messages, setMessages] = useState<MessageModel[]>([]);

    // const addMessage = useCallback((message: MessageModel) => {
    //     setMessages(messages => messages.some(m => m.id === message.id) ? [...messages] : [...messages, message])
    // }, [setMessages]);
    //
    // const onMessageAdded = (messageId: string) => {
    //     getMessage(messageId).then(m => addMessage(m));
    // };
    //
    // const onMessageUpdated = (messageId: string) => {
    //     getMessage(messageId).then((message) =>
    //         setMessages(messages => {
    //             const index = messages.findIndex(m => m.id === message.id);
    //             const newMessages = [...messages];
    //             newMessages[index] = message;
    //             return newMessages;
    //         }));
    // };
    //
    // useEffect(() => {
    //     getTopic(topicId!).then(t => {
    //         setTopic(t);
    //         setMessages(t.messages);
    //     });
    //
    //     function onConnected() {
    //         // connection to topic's room
    //         socket.emit(`topic`, {topicId}, (data: string) => console.log(data));
    //     }
    //
    //     return connectSocket([
    //         ['connect', () => onConnected()],
    //         ['topic/message/add', m => onMessageAdded(m)],
    //         ['topic/message/update', m => onMessageUpdated(m)]
    //     ]);
    // }, []);

    useEffect(() => {
        setMessages(data?.topic.messages || []);
    }, [data]);

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <NavigateBefore/>;
    }

    const topic = data!.topic;

    return (
        <div>
            <TopicHeader title={ topic.name }/>
            <MessageList
                messages={ messages }
                onMessageDeleted={ ({id}) => deleteMessage(id) }
            />
            <MessageEditor
                topicId={ topic.id }
                onMessageAdded={ m => {
                    // addMessage(m);
                } }
            />
        </div>
    );
};

export default TopicScreen;