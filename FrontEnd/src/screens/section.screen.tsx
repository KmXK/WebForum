import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SectionDetailsModel } from '../models/section/section-details.model';
import { getSection } from '../services/section/section.service';
import Loader from '../components/common/loader.component';
import SectionList from '../components/section/section-list.component';
import TopicList from '../components/topic/topic-list/topic-list.component';

const SectionScreen = () => {
    const {sectionId} = useParams<{ sectionId: string }>();
    const [section, setSection] = useState<SectionDetailsModel>();

    useEffect(() => {
        getSection(sectionId!).then(setSection);
    }, [sectionId])

    if (!section) {
        return <Loader/>
    }

    return (
        <div>
            { section.sections.length > 0 && (
                <>
                    <h2>Sections:</h2>
                    <SectionList sections={ section.sections }/>
                </>
            ) }

            { section.topics.length > 0 && (
                <>
                    <h2>Topics:</h2>
                    <TopicList topics={ section.topics }/>
                </>
            ) }

        </div>
    );
};

export default SectionScreen;