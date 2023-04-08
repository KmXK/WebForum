import React from 'react';
import { SectionTree } from '../../models/section/section-tree.model';
import Section from './section/section.component';
import { Stack } from '@mui/material';

interface Props {
    sections: SectionTree[]
}

const SectionList = ({sections}: Props) => {
    return (
        <Stack spacing={ 2 }>
            { sections.map(s => <Section key={ s.id } section={ s }/>) }
        </Stack>
    );
};

export default SectionList;
