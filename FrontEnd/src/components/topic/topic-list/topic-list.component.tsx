import React, { FC, useMemo } from 'react';
import * as Models from '../../../models/topic/topic.model';
import { Stack } from '@mui/material';
import TopicListItem from '../topic/topic-list-item.component';

interface Props {
    topics: Models.Topic[]
}

const TopicList: FC<Props> = ({topics}) => {
    const sortedTopics = useMemo(() => {
        const sortedTopics = [...topics];
        sortedTopics.sort((a, b) => +b.creationTime - +a.creationTime);
        return sortedTopics;
    }, [topics]);

    return (
        <div>
            <Stack spacing={ 2 }>
                { sortedTopics.map(t => <TopicListItem
                    key={ t.id }
                    topic={ t }
                />) }
            </Stack>
        </div>
    );
};

export default TopicList;