import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/common/loader.component';
import SectionList from '../components/section/section-list.component';
import TopicList from '../components/topic/topic-list/topic-list.component';
import { gql, useQuery } from '@apollo/client';

const GET_SECTION = gql`
    query GetSection($id: Int!) {
        section(id: $id) {
            id
            name
            children {
                id
                name
                description
                author {
                    id
                    login
                }
            }
            topics {
                id
                name
                author {
                    id
                    login
                }
            }
        }
    }
`;

type GetSectionResult = {
    section: {
        id: number;
        name: string;
        description: string;
        children: Array<{
            id: number;
            name: string;
            description: string;
            author: {
                id: string;
                login: string;
            }
        }>;
        topics: Array<{
            id: string;
            name: string;
            author: {
                id: string;
                login: string;
            }
        }>;
    }
}

const SectionScreen = () => {
    const {sectionId} = useParams<{ sectionId: string }>();
    const navigate = useNavigate();

    if (sectionId === undefined) {
        navigate('/sections');
        return;
    }

    const {data, loading, error} = useQuery<GetSectionResult>(GET_SECTION, {
        variables: {
            id: +sectionId
        }
    });

    if (loading || error) {
        return <Loader/>;
    }

    console.log(data);

    const section = data!.section;

    return (
        <div>
            { section.children.length > 0 && (
                <>
                    <h2>Sections:</h2>
                    <SectionList sections={ section.children.map(s => ({...s, children: []})) }/>
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