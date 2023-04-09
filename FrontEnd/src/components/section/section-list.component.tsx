import React from 'react';
import { SectionTreeModel } from '../../models/section/section-tree.model';
import Section from './section/section.component';
import { Stack } from '@mui/material';

interface Props {
    sections: SectionTreeModel[]
}

const SectionList = ({sections}: Props) => {
    return (
        <div>
            <Stack spacing={ 2 }>
                { sections.map(s => <Section key={ s.id } section={ s }/>) }
            </Stack>
        </div>
    );
};

export default SectionList;
