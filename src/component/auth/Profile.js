import React, { useContext } from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import { UserContext } from '../../context/UserContext';

export default function Profile({ user: userProp }) {
  const context = useContext(UserContext);
  const user = userProp || context?.user;
  return (
    <Container maxWidth="sm" sx={{
      mt: { xs: 2, sm: 6 },
      py: { xs: 2, sm: 4 },
      borderRadius: 4,
      boxShadow: 8,
      background: 'linear-gradient(120deg, #e3eafc 60%, #f7f7fa 100%)',
      position: 'relative',
      overflow: 'visible',
      minHeight: { xs: 320, sm: 400 },
      width: { xs: '95vw', sm: 'auto' },
      px: { xs: 0.5, sm: 0 },
    }}>
      {/* Decorative header bar for profile card */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: { xs: 44, sm: 56 },
        background: 'linear-gradient(90deg, #1976d2 0%, #e3eafc 100%)',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        boxShadow: '0 2px 12px #1976d2',
        zIndex: 1,
        overflow: 'hidden',
      }} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        position: 'relative',
        zIndex: 2,
        mt: { xs: 3, sm: 4 },
        px: { xs: 1, sm: 0 },
        width: '100%',
      }}>
        <Box sx={{
          position: 'absolute',
          top: { xs: '-22px', sm: '-40px' },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}>
          <Avatar src={user?.avatarUrl} alt={user?.name || user?.email} sx={{ width: { xs: 64, sm: 80 }, height: { xs: 64, sm: 80 }, boxShadow: 2, border: '3px solid #1976d2', background: '#fff' }} />
        </Box>
        <Box sx={{ mt: { xs: 6, sm: 8 }, width: '100%', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#1976d2', mb: 1, textShadow: '0 2px 8px #e3eafc', fontSize: { xs: 22, sm: 28 } }}>{user?.name || user?.email || 'User'}</Typography>
          <Typography variant="body1" sx={{ color: '#333', mb: 1, fontWeight: 500, fontSize: { xs: 15, sm: 17 } }}>Email: {user?.email}</Typography>
          {user?.phone && <Typography variant="body1" sx={{ color: '#333', mb: 1, fontWeight: 500, fontSize: { xs: 15, sm: 17 } }}>Phone: {user.phone}</Typography>}
          {user?.dob && <Typography variant="body1" sx={{ color: '#333', mb: 1, fontWeight: 500, fontSize: { xs: 15, sm: 17 } }}>DOB: {user.dob}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}
