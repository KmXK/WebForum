import React, { FC } from 'react';
import styles from './topic.module.scss';

interface Props {
    title: string;
}

const TopicHeader: FC<Props> = ({title}) => {
    return (
        <div className={ styles.container }>
            <h2 className={ styles.text }>{ title }</h2>
        </div>
    );
};

export default TopicHeader;