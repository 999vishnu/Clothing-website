import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Container, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, py: 4, borderRadius: 4, boxShadow: 8, background: 'linear-gradient(120deg, #e3eafc 60%, #f7f7fa 100%)' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 900, color: '#1976d2', mb: 3, textAlign: 'center', textShadow: '0 2px 8px #e3eafc' }}>Sign Up</Typography>
      <TextField fullWidth label="Name" margin="normal" value={name} onChange={e => setName(e.target.value)} sx={{ borderRadius: 2, boxShadow: 1 }} />
      <TextField fullWidth label="Phone Number" margin="normal" value={phone} onChange={e => setPhone(e.target.value)} sx={{ borderRadius: 2, boxShadow: 1 }} />
      <DatePicker
        label="Date of Birth"
        value={dob}
        onChange={newValue => setDob(newValue)}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" sx={{ borderRadius: 2, boxShadow: 1 }} />}
      />
      <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} sx={{ borderRadius: 2, boxShadow: 1 }} />
      <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} sx={{ borderRadius: 2, boxShadow: 1 }} />
      <Button variant="contained" color="primary" onClick={handleSignup} sx={{ mt: 3, borderRadius: 99, px: 4, py: 1.5, fontWeight: 700, fontSize: 18, background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)', boxShadow: 2 }}>
        Sign Up
      </Button>
    </Container>
  );
}
