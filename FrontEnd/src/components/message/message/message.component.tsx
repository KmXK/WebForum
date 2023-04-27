import React, { FC, useState } from 'react';
import Card from '../../common/card/card.component';
import { MessageModel } from '../../../models/message/message.model';
import { Button, Chip, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { DeleteOutline } from '@mui/icons-material';
import DeletedText from '../../common/deleted-text.component';
import useUser from '../../../hooks/useUser.hook';
import { AuthUser } from '../../../models/auth/auth-user.model';

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
                            <Chip label={ format(+message.creationTime, 'yyyy-MM-dd hh:mm:ss') }/>
                        </TableCell>

                        <TableCell sx={ {paddingLeft: 5, width: '*'} }>
                            {
                                message.isDeleted
                                    ? <DeletedText>Message was deleted.</DeletedText>
                                    : <ReactMarkdown>{ message.text }</ReactMarkdown>
                            }
                        </TableCell>
                        <TableCell sx={ {width: 15} }>
                            { canBeDeleted &&
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
