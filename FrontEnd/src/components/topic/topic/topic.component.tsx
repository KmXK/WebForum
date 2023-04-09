import React, { FC } from 'react';
import { TopicModel } from '../../../models/section/topic.model';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './topic.module.scss'

interface Props {
    topic: TopicModel
}

const Topic: FC<Props> = ({topic}) => {
    const navigate = useNavigate();

    return (
        <Box className={ styles.topic } onClick={ () => navigate(`/topics/${ topic.id }`) }>
            <div className={ styles.content }>
                <div className={ styles.name }>
                    { topic.name }
                </div>
            </div>
        </Box>
    );
};

export default Topic;