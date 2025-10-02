import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Container, Typography } from '@mui/material';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSignup}>Sign Up</Button>
    </Container>
  );
}
