import React, { FC, useState } from 'react';
import Card from '../../common/card/card.component';
import { MessageModel } from '../../../models/message/message.model';
import { Button, Chip, Table, TableBody, TableCell, TableRow } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { DeleteOutline } from '@mui/icons-material';
import DeletedText from '../../common/deleted-text.component';
import useUser from '../../../hooks/useUser.hook';
import { AuthUser } from '../../../models/auth/auth-user.model';
import { getDateTime } from '../../../services/date.service';

interface Props {
    message: MessageModel;
    onMessageDeleted?: () => void
}

const Message: FC<Props> = ({message, onMessageDeleted}) => {
    const user: AuthUser = useUser()!;
    const [canBeDeleted, setCanBeDeleted] = useState(
        !message.isDeleted
        && (user.role === 'Admin'
            || user.userId === message.author.id));

    return (
        <Card
            isClickable={ false }
            style={ {display: 'block'} }
        >
            <Table>
                <colgroup>
                    <col style={ {width: '150px'} }/>
                    <col/>
                </colgroup>
                <TableBody>
                    <TableRow sx={ {width: 'auto', '& td': {borderBottom: 0}} }>
                        <TableCell
                            align={ 'center' }
                            sx={ {borderRight: 1} }
                        >
                            <div>{ message.author.login }</div>
                            <Chip label={ getDateTime(+message.creationTime) }/>
                        </TableCell>

                        <TableCell sx={ {paddingLeft: 5, width: '*'} }>
                            {
                                message.isDeleted
                                    ? <DeletedText>Message was deleted.</DeletedText>
                                    : <ReactMarkdown>{ message.text }</ReactMarkdown>
                            }
                        </TableCell>
                        <TableCell sx={ {width: 15} }>
                            { canBeDeleted && !message.isDeleted &&
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={ {minWidth: 30, padding: 1, borderRadius: 3} }
                                    onClick={ () => {
                                        setCanBeDeleted(false);
                                        onMessageDeleted?.();
                                    } }
                                >
                                    <DeleteOutline/>
                                </Button> }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
};

export default Message;
