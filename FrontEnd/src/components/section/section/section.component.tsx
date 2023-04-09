import React, { FC, useState } from 'react';
import { SectionTreeModel } from '../../../models/section/section-tree.model';
import styles from './section.module.scss'
import SectionList from '../section-list.component';
import { Box, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Props {
    section: SectionTreeModel
}

const Section: FC<Props> = ({section}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const hasNestedSections = section.sections.length !== 0;

    return (
        <div>
            <Box className={ styles.section } onClick={ () => navigate(`/sections/${ section.id }`) }>
                <div className={ styles.content }>
                    <div className={ styles.name }>
                        { section.name }
                    </div>
                    <div className={ styles.description }>
                        { section.description }
                    </div>
                </div>

                { hasNestedSections && (
                    open
                        ? <ExpandLess
                            className={ styles.collapseIcon }
                            onClick={ () => setOpen(false) }
                        />
                        : <ExpandMore
                            className={ styles.collapseIcon }
                            onClick={ () => setOpen(true) }
                        />
                ) }

            </Box>

            { hasNestedSections &&
                <Collapse in={ open }>
                    <div className={ styles.childSectionsContainer }>
                        <SectionList sections={ section.sections }/>
                    </div>
                </Collapse>
            }
        </div>
    );
};

export default Section;
