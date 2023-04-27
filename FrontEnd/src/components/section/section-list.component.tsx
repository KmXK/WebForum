import React from 'react';
import Section from './section/section.component';
import { Stack } from '@mui/material';
import { SectionListItem } from '../../models/section/section-list-item.model';

interface Props {
    sections: SectionListItem[]
}

const SectionList = ({sections}: Props) => {
    return (
        <div>
            <Stack spacing={ 2 }>
                { sections.map(s => <Section
                    key={ s.id }
                    section={ s }
                />) }
            </Stack>
        </div>
    );
};

export default SectionList;
