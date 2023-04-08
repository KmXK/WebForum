import React, { useEffect, useState } from 'react';
import Header from '../components/header/header.component';
import SectionList from '../components/section/section-list.component';
import { getAllSectionTrees } from '../services/section/section.service';
import { SectionTree } from '../models/section/section-tree.model';

const SectionScreen = () => {
    const [sections, setSections] = useState<SectionTree[]>([]);

    useEffect(() => {
        getAllSectionTrees().then(setSections);
    }, []);

    return (
        <div>
            <Header/>
            <div style={ {padding: 10} }>
                <SectionList sections={sections}/>
            </div>
        </div>
    );
};

export default SectionScreen;
