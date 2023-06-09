import React, { FC, useState } from 'react';
import styles from './section.module.scss'
import SectionList from '../section-list.component';
import { Collapse } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Card from '../../common/card/card.component';
import { SectionListItem } from '../../../models/section/section-list-item.model';

interface Props {
    section: SectionListItem
}

const Section: FC<Props> = ({section}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const hasNestedSections = section.children.length !== 0;

    return (
        <div>
            <Card onClick={ () => navigate(`/sections/${ section.id }`) }>
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
            </Card>

            { hasNestedSections &&
                <Collapse in={ open }>
                    <div className={ styles.childSectionsContainer }>
                        <SectionList sections={ section.children }/>
                    </div>
                </Collapse>
            }
        </div>
    );
};

export default Section;
