import React, { FC } from 'react';
import { Topic } from '../../../models/topic/topic.model';
import { useNavigate } from 'react-router-dom';
import styles from './topic-list-item.module.scss'
import Card from '../../common/card/card.component';

interface Props {
    topic: Topic
}

const TopicListItem: FC<Props> = ({topic}) => {
    const navigate = useNavigate();

    return (
        <Card onClick={ () => navigate(`/topics/${ topic.id }`) }>
            <div className={ styles.content }>
                <div className={ styles.name }>
                    { topic.name }
                </div>
            </div>
        </Card>
    );
};

export default TopicListItem;