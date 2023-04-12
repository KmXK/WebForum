import React, { FC, useState } from 'react';
import { SectionTreeModel } from '../../../models/section/section-tree.model';
import styles from './section.module.scss'
import SectionList from '../section-list.component';
import { Collapse, Paper } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
    section: SectionTreeModel
}

const Section: FC<Props> = ({section}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const hasNestedSections = section.sections.length !== 0;

    return (
        <div>
            <Paper className={ styles.section } onClick={ () => navigate(`/sections/${ section.id }`) }>
                <div className={ styles.content }>
                    <div className={ styles.name }>
                        { section.name }
                    </div>
                    <div className={ styles.description }>
                        { section.description }
                    </div>
                </div>

                { hasNestedSections && (
                    <ExpandLess
                        className={ classNames(styles.collapseIcon, {[styles.open]: open}) }
                        onClick={ (e) => {
                            e.stopPropagation();
                            setOpen(!open)
                        } }
                    />
                ) }
            </Paper>

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
