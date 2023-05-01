import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../components/common/loader.component';
import TopicHeader from '../components/topic/header/topic-header.component';
import MessageList from '../components/message/message-list/message-list.component';
import MessageSubmitter from '../components/message/message-editor/message-submitter.component';
import { MessageModel } from '../models/message/message.model';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
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
        return <Navigate to={ '..' }/>
    }

    const {data, loading, error} = useQuery(GET_TOPIC, {
        variables: {
            id: topicId
        }
    });

    const [getMessage] = useLazyQuery(GET_MESSAGE, {
        fetchPolicy: 'network-only'
    });

    const [deleteMessage] = useMutation(DELETE_MESSAGE);

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
            const newMessages = [...messages];
            newMessages[index] = message;
            return newMessages;
        });
    }

    useEffect(() => {
        function onConnected() {
            // connection to topic's room
            socket.emit(`topic`, {topicId});
        }

        return connectSocket([
            ['connect', () => onConnected()],
            ['topic/message/add', id =>
                getMessage({variables: {id: id}}).then(m => {
                    addMessage(m.data?.message!);
                })],
            ['topic/message/update', id => {
                getMessage({variables: {id: id}}).then(m =>
                    updateMessage(m.data?.message!));
            }]
        ]);
    }, []);

    useEffect(() => {
        if (!loading && messages.length === 0) {
            const messages = [...(data?.topic.messages || [])];
            messages.sort((a, b) => Number(a.creationTime) - Number(b.creationTime));
            setMessages(messages);
        }
    }, [loading]);

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <Navigate to={ '..' }/>
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
                }) }
            />
            <MessageSubmitter
                topicId={ topic.id }
                onMessageAdded={ m => {
                    addMessage(m);
                } }
            />
        </div>
    );
};

export default TopicScreen;