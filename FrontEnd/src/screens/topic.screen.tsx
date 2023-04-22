import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/loader.component';
import { TopicDetailsModel } from '../models/topic/topic-details.model';
import { getTopic } from '../services/topic.service';
import TopicHeader from '../components/topic/header/topic-header.component';
import MessageList from '../components/message/message-list/message-list.component';
import MessageEditor from '../components/message/message-editor/message-editor.component';
import { MessageModel } from '../models/message/message.model';
import { connectSocket, socket } from '../socket';
import { deleteMessage, getMessage } from '../services/message.service';

const TopicScreen = () => {
    const {topicId} = useParams<{ topicId: string }>();
    const [topic, setTopic] = useState<TopicDetailsModel>();
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<MessageModel[]>([]);

    function addMessage(message: MessageModel) {
        setMessages(messages => messages.some(m => m.id === message.id) ? [...messages] : [...messages, message]);
    }

    function onDeleteMessage(message: MessageModel, startAnimation?: (callback?: () => void) => void) {
        deleteMessage(message.id).then(() => {
            startAnimation?.(() => setMessages(messages => messages.filter(m => m.id !== message.id)));
        });
    }

    function onMessageAdd(messageId: string) {
        getMessage(messageId).then(addMessage);
    }

    useEffect(() => {
        getTopic(topicId!).then(setTopic);

        function onConnect() {
            socket.emit(`topic`, {topicId}, (data: string) => console.log(data));
        }

        return connectSocket([
            ['connect', onConnect],
            ['topic/message/add', onMessageAdd]
        ]);
    }, []);

    useEffect(() => {
        if (topic !== undefined) {
            setMessages(topic.messages);
        }
    }, [topic]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    if (!topic) {
        return <Loader/>
    }

    return (
        <div>
            <TopicHeader title={ topic.name }/>
            <MessageList
                messages={ messages }
                onMessageDeleted={ onDeleteMessage }
            />
            <MessageEditor
                topicId={ topic.id }
                onMessageAdded={ addMessage }
            />
            <div ref={ messagesEndRef }/>
        </div>
    );
};

export default TopicScreen;