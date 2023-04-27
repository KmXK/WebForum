import React, { useMemo } from 'react';
import SectionList from '../components/section/section-list.component';
import { gql, useQuery } from '@apollo/client';
import LoaderComponent from '../components/common/loader.component';
//import { gql } from '../__generated__';
import { SectionListItem } from '../models/section/section-list-item.model';

const GET_SECTIONS = gql`
    query GetSections {
        sections {
            id
            name
            author {
                id
                login
            }
            children {
                id
            }
        }
    }
`;

type GetSectionsResult = {
    sections: Array<{
        id: number;
        name: string;
        description?: string;
        author: {
            id: string;
            login: string;
        },
        children: Array<{
            id: number
        }>;
    }>;
}

const SectionListScreen = () => {
    const {data: plainSections, loading} = useQuery<GetSectionsResult>(GET_SECTIONS);

    const sections = useMemo(() => {
        if (plainSections === undefined) {
            return [];
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

        return Object.values(sectionMap).filter(s => !s.hasParent);
    }, [plainSections]);

    if (loading) {
        return <LoaderComponent/>;
    }

    return (
        <div>
            <h2>Sections:</h2>
            <SectionList sections={ sections }/>
        </div>
    );
};

export default SectionListScreen;
