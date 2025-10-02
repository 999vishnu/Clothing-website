import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { TextField, Button, Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2, borderRadius: 99, px: 4, py: 1, fontWeight: 700, fontSize: 18 }}>Login</Button>
      <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleLogin} sx={{ mt: 2, borderRadius: 99, px: 4, py: 1, fontWeight: 700, fontSize: 18 }}>
        Login with Google
      </Button>
      <Button variant="text" color="secondary" href="/signup" sx={{ mt: 3, borderRadius: 99, px: 4, py: 1, fontWeight: 700, fontSize: 18, textTransform: 'none', background: 'linear-gradient(90deg, #e3eafc 0%, #ffc107 100%)', color: '#1976d2', boxShadow: 2, '&:hover': { background: 'linear-gradient(90deg, #ffc107 0%, #e3eafc 100%)', color: '#fff' } }}>
        Don't have an account? Signup
      </Button>
    </Container>
  );
}
