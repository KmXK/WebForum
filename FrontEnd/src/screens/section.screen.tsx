import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Loader from '../components/common/loader.component';
import SectionList from '../components/section/section-list.component';
import TopicList from '../components/topic/topic-list/topic-list.component';
import { useQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { Box, Button } from '@mui/material';
import SectionListHeader from '../components/section/section-list-header.component';
import { SectionListItem } from '../models/section/section-list-item.model';

const GET_SECTION = gql(`
    #graphql
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
                creationTime
                author {
                    id
                    login
                }
            }
        }
    }
`);

const SectionScreen = () => {
    const {sectionId} = useParams<{ sectionId: string }>();

    const [childSections, setChildSections] = useState<SectionListItem[]>([]);

    const {data, loading, error} = useQuery(GET_SECTION, {
        variables: {
            id: +(sectionId || 0)
        },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        if (data?.section.children) {
            setChildSections(data?.section.children.map(s => ({...s, children: []})));
        }
    }, [loading]);

    const handleAddSection = (section: SectionListItem) => {
        setChildSections(childSections => [...childSections, section]);
    }

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <Navigate to={ '/sections' }/>;
    }

    const section = data!.section;

    return (
        <div>
            <Box
                sx={ {
                    textAlign: 'center',
                    marginBottom: 1
                } }
            >
                <h1>
                    { section.name }
                </h1>
            </Box>

            <>
                <SectionListHeader
                    parentSectionId={ section.id }
                    onSectionAdded={ s => handleAddSection(s) }
                />
                {
                    childSections.length > 0
                        ? <SectionList sections={ childSections }/>
                        : <div>There are no child sections</div>
                }

            </>

            { section.topics.length > 0 && (
                <>
                    <Box
                        sx={ {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 50
                        } }
                    >
                        <h2>Topics:</h2>
                        <Link
                            to={ 'new' }
                            style={ {
                                textDecoration: 'none'
                            } }
                        >
                            <Button>
                                ADD NEW TOPIC
                            </Button>
                        </Link>
                    </Box>

                    <TopicList topics={ section.topics }/>
                </>
            ) }

            { section.topics.length === 0 && section.children.length === 0 && (
                <Box
                    sx={ {
                        display: 'flex',
                        justifyContent: 'center'
                    } }
                >
                    <Box
                        sx={ {
                            display: 'flex',
                            flexDirection: 'column'
                        } }
                    >
                        <h2>
                            This section is empty. </h2>
                        <Link
                            to={ 'new' }
                            style={ {
                                textDecoration: 'none',
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center'
                            } }
                        >
                            <Button>
                                ADD NEW TOPIC
                            </Button>
                        </Link>
                    </Box>
                </Box>
            ) }
        </div>
    );
};

export default SectionScreen;