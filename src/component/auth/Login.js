import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { TextField, Button, Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Google login successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
      <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleLogin} sx={{ mt: 2 }}>
        Login with Google
      </Button>
    </Container>
  );
}
