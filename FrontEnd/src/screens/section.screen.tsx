import React from 'react';
import Header from '../components/header/header.component';
import SectionList from '../components/section/section-list.component';

const SectionScreen = () => {
    return (
        <div>
            <Header/>
            <div style={ {padding: 10} }>
                <SectionList/>
            </div>
        </div>
    );
};

export default SectionScreen;
