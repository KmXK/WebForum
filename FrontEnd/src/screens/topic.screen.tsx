import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/loader.component';
import TopicHeader from '../components/topic/header/topic-header.component';
import MessageList from '../components/message/message-list/message-list.component';
import MessageEditor from '../components/message/message-editor/message-editor.component';
import { MessageModel } from '../models/message/message.model';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { NavigateBefore } from '@mui/icons-material';
import { gql } from '../__generated__';
import { connectSocket, socket } from '../socket';

const GET_TOPIC = gql(`
    #graphql
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
`);

const DELETE_MESSAGE = gql(`
    #graphql
    mutation DeleteMessage($messageId: String!) {
        deleteMessage(messageId: $messageId) {
            id
            text
            creationTime
            isDeleted
            author {
                id
                login
            }
        }
    }
`);

const GET_MESSAGE = gql(`
    #graphql
    query GetMessage($id: String!) {
        message(id: $id) {
            id
            author {
                id
                login
            }
            isDeleted
            creationTime
            text
        }
    }
`);

const TopicScreen = () => {
    const {topicId} = useParams<{ topicId: string }>();

    if (topicId === undefined) {
        return <NavigateBefore/>
    }

    const {data, loading, error} = useQuery(GET_TOPIC, {
        variables: {
            id: topicId
        }
    });

    const [getMessage, {refetch, called}] = useLazyQuery(GET_MESSAGE);
    console.log(called);

    const [deleteMessage, {data: deletedMessage}] = useMutation(DELETE_MESSAGE);

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

    const addMessage = (message: MessageModel) => {
        if (!message) {
            return;
        }

        setMessages(messages => messages.some(m => m.id === message.id) ? [...messages] : [...messages, message]);
    };

    const updateMessage = (message: MessageModel) => {
        setMessages(messages => {
            const index = messages.findIndex(m => m.id === message.id);

            return [...messages.slice(0, index), message, ...messages.slice(index + 1)];
        });
    }

    useEffect(() => {
        function onConnected() {
            // connection to topic's room
            socket.emit(`topic`, {topicId}, (data: string) => console.log(data));
        }

        return connectSocket([
            ['connect', () => onConnected()],
            ['topic/message/add', m => getMessage({variables: {id: m}}).then(m => addMessage(m.data?.message))],
            ['topic/message/update', m => {
                const me = getMessage({variables: {id: m}});
                console.log(me);
                me.then(m => updateMessage(m.data?.message));
            }]
        ]);
    }, []);

    useEffect(() => {
        const messages = [...(data?.topic.messages || [])];
        messages.sort((a, b) => Number(a.creationTime) - Number(b.creationTime));
        console.log(messages);
        setMessages(messages);
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
                onMessageDeleted={ ({id}) => deleteMessage({
                    variables: {
                        messageId: id
                    }
                }).then(message => {
                    if (!message.data?.deleteMessage) {
                        return;
                    }

                    updateMessage(message.data.deleteMessage);
                }) }
            />
            {
                <MessageEditor
                    topicId={ topic.id }
                    onMessageAdded={ m => {
                        addMessage(m);
                    } }
                />
            }
        </div>
    );
};

export default TopicScreen;