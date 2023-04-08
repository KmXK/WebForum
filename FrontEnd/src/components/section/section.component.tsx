import React, { FC } from 'react';
import { SectionTree } from '../../models/section/section-tree.model';
import { Card } from '@mui/material';

interface Props {
    section: SectionTree
}

const Section: FC<Props> = ({section}) => {
    return (
        <Card sx={ {height: 120, width: '100%'} }>
            { section.name }
        </Card>
    );
};

export default Section;
