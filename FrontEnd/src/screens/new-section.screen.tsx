import React from 'react';
import Center from '../components/common/center.component';
import { Box, Stack, TextField, Typography } from '@mui/material';

const NewSectionScreen = () => {
    return (
        <div>
            <Center>
                <h2>NEW TOPIC</h2>
            </Center>

            <Center>
                <Box
                    sx={ {
                        width: 500
                    } }
                >
                    <Stack>
                        <Typography>
                            Name:
                        </Typography>
                        <TextField/>

                        <Typography>
                            Description:
                        </Typography>
                        <TextField/>

                        <Typography>
                            Content:
                        </Typography>
                        <TextField/>
                    </Stack>
                </Box>
            </Center>
        </div>
    );
};

export default NewSectionScreen;