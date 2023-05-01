import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AddNewSectionDialog from './add-new-section-dialog.component';
import { SectionListItem } from '../../models/section/section-list-item.model';
import { AuthUser } from '../../models/auth/auth-user.model';
import useUser from '../../hooks/useUser.hook';

interface Props {
    parentSectionId?: number;
    onSectionAdded: (section: SectionListItem) => void;
}

const SectionListHeader = ({onSectionAdded, parentSectionId}: Props) => {
    const [open, setOpen] = useState(false);
    const user: AuthUser = useUser()!;

    return (
        <Box
            sx={ {
                display: 'flex',
                justifyContent: 'space-between',
                height: '50px',
                alignItems: 'center'
            } }
        >

            <h2>Sections</h2>
            { user.role === 'Admin' &&
                (<>
                    <Button
                        onClick={ () => setOpen(true) }
                    >
                        ADD NEW SECTION
                    </Button>

                    <AddNewSectionDialog
                        parentSectionId={ parentSectionId }
                        open={ open }
                        onClose={ model => {
                            if (model) {
                                onSectionAdded(model);
                            }

                            setOpen(false);
                        } }
                    />
                </>) }
        </Box>
    );
};

export default SectionListHeader;