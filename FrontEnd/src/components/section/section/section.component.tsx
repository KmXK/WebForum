import React, { FC } from 'react';
import { SectionTree } from '../../../models/section/section-tree.model';
import styles from './section.module.scss'

interface Props {
    section: SectionTree
}

const Section: FC<Props> = ({section}) => {
    return (
        <div className={styles.container}>
            <div className={styles.name}>
                { section.name }
            </div>
            <div className={styles.description}>
                { section.description }
            </div>
        </div>
    );
};

export default Section;
