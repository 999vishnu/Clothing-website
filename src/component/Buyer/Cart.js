import React from 'react';
import { Card, CardMedia, Typography, Box, Grid, Button } from '@mui/material';
import { getImageUrl } from '../../utils/imageUrl';

export default function Cart({ cartItems = [] }) {
  return (
    <Box sx={{
      background: 'linear-gradient(120deg, #e3eafc 60%, #f7f7fa 100%)',
      minHeight: '80vh',
      py: { xs: 4, md: 8 },
      px: { xs: 2, md: 8 },
    }}>
      <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, color: '#1976d2', textAlign: 'center', letterSpacing: 2, textShadow: '0 2px 8px #e3eafc' }}>
        My Cart
      </Typography>
      <Grid container spacing={6} justifyContent="center">
        {cartItems.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: 8,
              boxShadow: 8,
              maxWidth: 480,
              mx: 'auto',
            }}>
              <Typography variant="h5" color="text.secondary" align="center" sx={{ mb: 2, fontWeight: 700 }}>
                Your cart is empty.
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                Add products to your cart to see them here.
              </Typography>
            </Box>
          </Grid>
        )}
        {cartItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: 12,
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 8,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 420,
                maxWidth: 360,
                minWidth: 280,
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: 24,
                  background: 'rgba(227,234,252,0.95)',
                },
              }}
            >
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2, position: 'relative', overflow: 'hidden', borderRadius: 8, height: 220 }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={getImageUrl(item.imageUrl || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308')}
                  alt={item.name}
                  sx={{
                    objectFit: 'cover',
                    borderRadius: 8,
                    width: '100%',
                    boxShadow: 6,
                    transition: 'transform 0.3s',
                    cursor: 'pointer',
                    height: '100%',
                    '&:hover': {
                      transform: 'scale(1.08)',
                    },
                  }}
                />
                {/* Price Tag */}
                {item.price && (
                  <Box sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'linear-gradient(90deg, #388e3c 60%, #43a047 100%)',
                    color: '#fff',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 16,
                    boxShadow: 2,
                    zIndex: 2,
                  }}>
                    ₹{item.price}
                  </Box>
                )}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1976d2', textAlign: 'center', mb: 1, mt: 1, letterSpacing: 1 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#333', textAlign: 'center', mb: 2, px: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '95%', fontSize: 16 }}>
                {item.description}
              </Typography>
              {/* Remove Button */}
              <Box sx={{ mt: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" color="error" sx={{ borderRadius: 3, fontWeight: 700, px: 3, py: 1, fontSize: 16, boxShadow: 2 }}>
                  Remove
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
