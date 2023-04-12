import React, { FC } from 'react';
import styles from './card.module.scss';
import { Paper, PaperTypeMap } from '@mui/material';
import classNames from 'classnames';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';

interface Props extends DefaultComponentProps<PaperTypeMap<{}, 'div'>> {
}

const Card: FC<Props> = ({onClick, children, ...rest}) => {
    return (
        <div>
            <Paper { ...rest } className={ classNames(rest.className, styles.container) } onClick={ onClick }>
                { children }
            </Paper>
        </div>
    );
};

export default Card;