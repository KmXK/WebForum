import React, { useEffect, useState } from 'react';
import { SectionTree } from '../../models/section/section-tree.model';
import { getAllSectionTrees } from '../../services/section/section.service';
import Section from './section.component';
import { Stack } from '@mui/material';

const SectionList = () => {
    const [sections, setSections] = useState<SectionTree[]>([]);

    useEffect(() => {
        getAllSectionTrees().then(setSections);
    }, []);

    return (
        <Stack spacing={ 2 }>
            { sections.map(s => <Section key={ s.id } section={ s }/>) }
        </Stack>
    );
};

export default SectionList;
