import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, getUser } from '../fetch';
import { login, profileChange } from '../actions';
import { Redirect, Link } from 'react-router-dom';
import './styles/Login.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {LockOutlined} from '@material-ui/icons'
import CircularProgress from '@material-ui/core/CircularProgress';

function Login(props) {
  const dispatch = useDispatch();
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [toRedirect, setRedirect] = useState(false);
  const [submit, setSubmit ] = useState(false);

  function handleFormSubmission(event) {
    setSubmit(true);
    event.preventDefault();
    loginUser(userName, password, data => {
      if (data.status === 200) {
        getUser(data.id, userDetails => {
          dispatch(login(userDetails.user));
          dispatch(profileChange(userDetails.user.profile));
          setError(false);
          setRedirect(true);
        })
      } else setError(true);
      setSubmit(false);
    });
  }

  if (!toRedirect) {
    return (
      <Container component='main' maxWidth='xs'>
        <div className="login">
          <Typography component='h1' variant = 'h5' className = 'text-center my-3'><LockOutlined />Log in</Typography>
          {error ? <p className = 'text-danger'>Invalid Login Credentials</p> : ''}
          <form onSubmit={handleFormSubmission} className='login__form'>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <TextField
                  name='username'
                  variant='outlined'
                  required
                  value = {userName}
                  fullWidth
                  id='username'
                  label='Username'
                  autoFocus
                  onChange={event => setuserName(event.currentTarget.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  name='password'
                  value = {password}
                  variant='outlined'
                  required
                  fullWidth
                  id='password'
                  label='Password'
                  type='password'
                  onChange={event => setPassword(event.currentTarget.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remember Me"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color='primary'>{submit ? <React.Fragment>Logging you in...<CircularProgress variant = 'indeterminate' color = 'primary'/></React.Fragment> : 'Log in'}</Button>
            <Grid container spacing={2}>
              <Grid item>
                <Link to='/register'>
                  Don't have an account? Sign Up
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  } else return <Redirect to='/' />
}

export default Login;