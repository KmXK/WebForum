import { Button, Paper, styled, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Context } from '../global.context';
import { observer } from 'mobx-react-lite';
import Loader from '../components/common/loader.component';
import { Link } from 'react-router-dom';

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
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {store} = useContext(Context);

    const handleSubmit = () => {
        setLoading(true);
        setError('');
        store.login(login, password).then(result => {
            if (!result) {
                setError('Incorrect login or password');
                setLoading(false);
            }
        })
    }

    return (
        <CenteredPaper elevation={ 4 }>
            <Typography
                textAlign="center"
                variant="h5"
            >
                Login
            </Typography>
            <TextField
                error={ error !== '' }
                helperText={ error }
                id="login"
                type="text"
                label="login"
                variant="outlined"
                value={ login }
                onChange={ (event) => setLogin(event.target.value) }
            />
            <TextField
                error={ error !== '' }
                helperText={ error }
                id="password"
                type="password"
                label="password"
                variant="outlined"
                value={ password }
                onChange={ (event) => setPassword(event.target.value) }
            />
            {
                loading
                    ? <Loader/>
                    : (
                        <>
                            <Button
                                variant="contained"
                                sx={ {paddingTop: 1} }
                                onClick={ () => handleSubmit() }
                            >
                                login
                            </Button>

                            <Link
                                to={ '/register' }
                                style={ {
                                    fontSize: 12,
                                    width: '100%',
                                    textAlign: 'center'
                                } }
                            >
                                Don't have account?
                            </Link>
                        </>
                    )
            }

        </CenteredPaper>
    );
}

export default observer(LoginPage);
