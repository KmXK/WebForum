import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { SectionListItem } from '../../models/section/section-list-item.model';
import { gql } from '../../__generated__';
import { useMutation } from '@apollo/client';

const ADD_NEW_SECTION = gql(`
    #graphql
    mutation addNewSection($input: CreateSectionInput!) {
        createSection(input: $input) {
            id
            creationTime
            author {
                id
                login
            }
        }
    }
`)

interface Props {
    open: boolean;
    onClose: (model?: SectionListItem) => void;
    parentSectionId?: number;
}

const AddNewSectionDialog = ({open, onClose, parentSectionId}: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [createSection] = useMutation(ADD_NEW_SECTION);

    return (
        <Dialog
            open={ open }
            onClose={ () => onClose() }
        >
            <DialogTitle>Add New Section</DialogTitle>
            <DialogContent
                sx={ {
                    width: 400
                } }
            >
                <DialogContentText>
                    Section's name:
                </DialogContentText>
                <TextField
                    fullWidth
                    value={ name }
                    onChange={ x => setName(x.target.value) }
                    multiline={ false }
                >
                </TextField>

                <DialogContentText
                    sx={ {
                        marginTop: 1
                    } }
                >
                    Section's description:
                </DialogContentText>
                <TextField
                    fullWidth
                    value={ description }
                    onChange={ x => setDescription(x.target.value) }
                    multiline
                    rows={ 4 }
                >
                </TextField>

                <DialogActions>
                    <Button onClick={ () => onClose() }>
                        Cancel
                    </Button>
                    <Button
                        onClick={ () => {
                            createSection({
                                variables: {
                                    input: {
                                        name,
                                        description,
                                        parentSectionId
                                    }
                                }
                            }).then(section => {
                                const createdSection = section.data?.createSection;

                                if (createdSection === undefined) {
                                    onClose();
                                } else {
                                    onClose({
                                        ...createdSection,
                                        name,
                                        description,
                                        children: []
                                    });
                                }
                            });
                        } }
                    >
                        Create
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewSectionDialog;