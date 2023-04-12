import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/loader.component';
import { TopicDetailsModel } from '../models/topic/topic-details.model';
import { getTopic } from '../services/topic.service';
import TopicHeader from '../components/topic/header/topic-header.component';
import MessageList from '../components/message/message-list/message-list.component';
import MessageEditor from '../components/message/message-editor/message-editor.component';

const TopicScreen = () => {
    const {topicId} = useParams<{ topicId: string }>();
    const [topic, setTopic] = useState<TopicDetailsModel>();
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getTopic(topicId!).then(setTopic);
    }, [topicId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [topic]);

    if (!topic) {
        return <Loader/>
    }

    return (
        <div>
            <TopicHeader title={ topic.name }/>
            <MessageList messages={ topic.messages }/>
            <MessageEditor
                topicId={ topic.id }
                onMessageAdded={ m => setTopic({...topic, messages: [...topic?.messages, m]}) }/>
            <div ref={ messagesEndRef }/>
        </div>
    );
};

export default TopicScreen;