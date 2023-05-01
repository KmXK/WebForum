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

function RegisterScreen({}: Props) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState({
        confirmPassword: '',
        login: ''
    });
    const [loading, setLoading] = useState(false);
    const {store} = useContext(Context);

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError({login: '', confirmPassword: 'Passwords must be the same.'});
            return;
        }

        setLoading(true);
        store.register(login, password).then(result => {
            if (!result) {
                setLoading(false);
                setError({login: 'Login is already taken.', confirmPassword: ''});
            }
        });
    };

    return (
        <CenteredPaper elevation={ 4 }>
            <Typography
                textAlign="center"
                variant="h5"
            >
                Register
            </Typography>
            <TextField
                id="login"
                error={ error.login !== '' }
                helperText={ error.login }
                type="text"
                label="Login"
                variant="outlined"
                value={ login }
                onChange={ (event) => setLogin(event.target.value) }
            />
            <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                value={ password }
                onChange={ (event) => setPassword(event.target.value) }
            />
            <TextField
                error={ error.confirmPassword !== '' }
                helperText={ error.confirmPassword }
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                variant="outlined"
                value={ confirmPassword }
                onChange={ (event) => setConfirmPassword(event.target.value) }
            />
            {
                loading
                    ? <Loader/>
                    :
                    <>
                        <Button
                            variant="contained"
                            sx={ {padding: 1} }
                            onClick={ () => handleSubmit() }
                        >
                            REGISTER
                        </Button>

                        <Link
                            to={ '/login' }
                            style={ {
                                fontSize: 12,
                                width: '100%',
                                textAlign: 'center'
                            } }
                        >
                            Already have account?
                        </Link>
                    </>
            }

        </CenteredPaper>
    );
}

export default observer(RegisterScreen);
