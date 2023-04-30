import React, { useEffect, useState } from 'react';
import SectionList from '../components/section/section-list.component';
import { useQuery } from '@apollo/client';
import LoaderComponent from '../components/common/loader.component';
import { gql } from '../__generated__';
import { SectionListItem } from '../models/section/section-list-item.model';
import SectionListHeader from '../components/section/section-list-header.component';

const GET_SECTIONS = gql(`
    #graphql
    query GetSections {
        sections {
            id
            name
            description
            author {
                id
                login
            }
            children {
                id
            }
        }
    }
`);

const SectionListScreen = () => {
    const {data: plainSections, loading} = useQuery(GET_SECTIONS, {
        fetchPolicy: 'network-only'
    });

    const [sections, setSections] = useState<SectionListItem[]>([]);

    useEffect(() => {
        if (plainSections === undefined) {
            return;
        }

        const sectionMap = plainSections.sections.reduce((result, section) => {
            result[section.id] = {
                ...section,
                childrenIds: section.children,
                hasParent: false,
                children: []
            };
            return result;
        }, {} as Record<number, SectionListItem & { childrenIds?: Array<{ id: number }>, hasParent: boolean }>);

        Object.values(sectionMap).forEach(section => {
            section.children = sectionMap[section.id].childrenIds!.map(child => {
                sectionMap[child.id].hasParent = true;
                return sectionMap[child.id];
            });
            delete section.childrenIds;
        });

        setSections(Object.values(sectionMap).filter(s => !s.hasParent));
    }, [loading]);

    if (loading) {
        return <LoaderComponent/>;
    }

    return (
        <div>
            <SectionListHeader
                onSectionAdded={ section =>
                    setSections([...sections, section])
                }
            />
            <SectionList sections={ sections }/>
        </div>
    );
};

export default SectionListScreen;
