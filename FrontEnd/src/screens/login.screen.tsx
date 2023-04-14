import { Button, Paper, styled, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../global.context';

type Props = {};

const CenteredPaper = styled(Paper)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    '> *': {
        alignSelf: 'stretch'
    }
});

function LoginPage({}: Props) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    return (
        <CenteredPaper elevation={ 4 }>
            <Typography textAlign="center" variant="h5">
                Login
            </Typography>
            <TextField
                id="email"
                type="email"
                label="email"
                variant="outlined"
                value={ email }
                onChange={ (event) => setEmail(event.target.value) }
            />
            <TextField
                id="password"
                type="password"
                label="password"
                variant="outlined"
                value={ password }
                onChange={ (event) => setPassword(event.target.value) }
            />
            <Button
                variant="contained"
                sx={ {padding: 1} }
                onClick={ async () => store.login(email, password) }
            >
                login
            </Button>
        </CenteredPaper>
    );
}

export default observer(LoginPage);
