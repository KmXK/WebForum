import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Loader from '../components/common/loader.component';
import SectionList from '../components/section/section-list.component';
import TopicList from '../components/topic/topic-list/topic-list.component';
import { useQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { Box, Button } from '@mui/material';

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

    const {data, loading, error} = useQuery(GET_SECTION, {
        variables: {
            id: +(sectionId || 0)
        }
    });

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <Navigate to={ '/sections' }/>;
    }

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
                    <h2>This topic is empty.</h2>
                </Box>
            ) }
        </div>
    );
};

export default SectionScreen;