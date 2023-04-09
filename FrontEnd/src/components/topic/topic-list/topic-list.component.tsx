import React, { FC } from 'react';
import { TopicModel } from '../../../models/section/topic.model';
import Topic from '../topic/topic.component';
import { Stack } from '@mui/material';

interface Props {
    topics: TopicModel[]
}

const TopicList: FC<Props> = ({topics}) => {
    return (
        <div>
            <h2>Topics:</h2>
            
            <Stack spacing={ 1 }>
                { topics.map(t => <Topic key={ t.id } topic={ t }/>) }
            </Stack>
        </div>
    );
};

export default TopicList;