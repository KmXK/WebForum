import React, { FC } from 'react';
import styles from './card.module.scss';
import { Paper, PaperTypeMap } from '@mui/material';
import classNames from 'classnames';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';

interface Props extends DefaultComponentProps<PaperTypeMap<{}, 'div'>> {
    isClickable?: boolean
}

const Card: FC<Props> = ({onClick, children, isClickable, ...rest}) => {
    isClickable = isClickable !== undefined ? isClickable : true;

    return (
        <div>
            <Paper
                { ...rest }
                className={ classNames(rest.className, styles.container, isClickable ? styles.clickable : {}) }
                onClick={ isClickable ? onClick : undefined }
            >
                { children }
            </Paper>
        </div>
    );
};

export default Card;