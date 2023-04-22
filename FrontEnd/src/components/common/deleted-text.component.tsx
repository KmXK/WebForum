import React, { FC } from 'react';

const DeletedText: FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <span
            style={ {
                color: '#aaaaaa',
                fontStyle: 'italic'
            } }
        >
            { children }
        </span>
    );
};

export default DeletedText;