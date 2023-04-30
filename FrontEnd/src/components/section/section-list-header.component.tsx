import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AddNewSectionDialog from './add-new-section-dialog.component';
import { SectionListItem } from '../../models/section/section-list-item.model';

interface Props {
    onSectionAdded: (section: SectionListItem) => void;
}

const SectionListHeader = ({onSectionAdded}: Props) => {
    const [open, setOpen] = useState(false);

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
            <Button
                onClick={ () => setOpen(true) }
            >
                ADD NEW SECTION
            </Button>

            <AddNewSectionDialog
                open={ open }
                onClose={ model => {
                    if (model) {
                        onSectionAdded(model);
                    }

                    setOpen(false);
                } }
            />
        </Box>
    );
};

export default SectionListHeader;