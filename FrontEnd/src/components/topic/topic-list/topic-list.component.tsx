import React, { FC } from 'react';
import * as Models from '../../../models/topic/topic.model';
import { Stack } from '@mui/material';
import TopicListItem from '../topic/topic-list-item.component';

interface Props {
    topics: Models.Topic[]
}

const TopicList: FC<Props> = ({topics}) => {
    return (
        <div>
            <Stack spacing={ 2 }>
                { topics.map(t => <TopicListItem
                    key={ t.id }
                    topic={ t }
                />) }
            </Stack>
        </div>
    );
};

export default TopicList;