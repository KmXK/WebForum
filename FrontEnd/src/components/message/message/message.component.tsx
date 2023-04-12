import React, { FC } from 'react';
import Card from '../../common/card/card.component';
import { MessageModel } from '../../../models/message/message.model';
import { Chip, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface Props {
    message: MessageModel;
}

const Message: FC<Props> = ({message}) => {
    return (
        <Card isClickable={ false } style={ {display: 'block'} }>
            <Table>
                <colgroup>
                    <col style={ {width: '150px'} }/>
                    <col/>
                </colgroup>
                <TableBody>
                    <TableRow>
                        <TableCell align={ 'center' } sx={ {borderBottom: 0, borderRight: 1} }>
                            <div>{ message.authorName }</div>
                            <Chip label={ format(message.creationTime, 'yyyy-MM-dd hh:mm:ss') }/>
                        </TableCell>

                        <TableCell sx={ {borderBottom: 0, paddingLeft: 5} }>
                            <ReactMarkdown>{ message.text }</ReactMarkdown>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
};

export default Message;
