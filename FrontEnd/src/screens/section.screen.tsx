import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SectionDetails } from '../models/section/section-details.model';
import { getSection } from '../services/section/section.service';
import Section from '../components/section/section/section.component';

const SectionScreen = () => {
    const {sectionId} = useParams<{ sectionId: string }>();
    const [section, setSection] = useState<SectionDetails>();

    useEffect(() => {
        getSection(sectionId!).then(setSection);
    }, [sectionId])

    return (
        <div>
            { section
                ? <Section section={ section }/>
                : <p>Loading...</p>
            }
        </div>
    );
};

export default SectionScreen;