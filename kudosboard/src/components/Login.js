import React, { useState } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';


async function authenticateUser(credentials, endpoint) {
    return fetch(`http://localhost:3002/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server returned an error: ${response.statusText}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        throw new Error(`Server returned an unexpected content type: ${contentType}`);
      }
    });
  }


function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');





  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');




    const endpoint = isLogin ? 'login' : 'signup';
    const token = await authenticateUser({ email, password }, endpoint);
    setToken(token);
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignItems="center">

        <Grid item xs={12}>
        <h1 variant="body1" color="text.secondary" align="center">
                You are welcome to the Kudosboard!!! Please create an account or login.
            </h1>
          <h2>Please Login</h2>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>

                <Button type="submit" variant="contained" color="primary">
                {isLogin ? 'Login' : 'Sign up'}
                </Button>
              </Grid>
            </form>
          </Grid>
          <p>{isLogin ? 'New user?' : 'Already have an account?'} <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Create Account' : 'Login'}</button></p>
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
        </Grid>
      </Grid>

    </Container>
  );
}

export default Login;
