import React, { useEffect, useState } from 'react';
import SectionList from '../components/section/section-list.component';
import { getAllSectionTrees } from '../services/section/section.service';
import { SectionTree } from '../models/section/section-tree.model';

const SectionListScreen = () => {
    const [sections, setSections] = useState<SectionTree[]>([]);

    useEffect(() => {
        getAllSectionTrees().then(setSections);
    }, []);

    return (
        <SectionList sections={ sections }/>
    );
};

export default SectionListScreen;
