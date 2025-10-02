import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  TextField, Button, Container, Typography, Box, Alert, IconButton, Select, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ProductUpload() {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Shoes');
  const [variants, setVariants] = useState([{ color: '', price: '', imageUrl: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const categories = ['Shoes', 'Clothing', 'Accessories'];

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { color: '', price: '', imageUrl: '' }]);
  };

  const handleUpload = async () => {
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }

    if (!category) {
      setError('Category is required.');
      return;
    }

    const incompleteVariant = variants.some(v =>
      !v.color.trim() || !v.price
    );

    if (incompleteVariant) {
      setError('Each variant must have color and price.');
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        name,
        sku,
        description,
        category,
        variants,
        createdAt: new Date(),
      });

      setSuccess('Product uploaded successfully!');
      setName('');
      setSku('');
      setDescription('');
      setCategory('Shoes');
      setVariants([{ color: '', price: '', imageUrl: '' }]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, background: '#f9f9f9', borderRadius: 3, boxShadow: 3, p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>Upload Product</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Choose Category *</Typography>
        <Select
          fullWidth
          value={category}
          onChange={e => setCategory(e.target.value)}
          sx={{ background: '#fff', borderRadius: 2, fontWeight: 500 }}
        >
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </Box>

      <TextField fullWidth label="Product Name *" value={name} onChange={e => setName(e.target.value)} margin="normal" />
      <TextField fullWidth label="SKU" value={sku} onChange={e => setSku(e.target.value)} margin="normal" />
      <TextField fullWidth label="Description" value={description} onChange={e => setDescription(e.target.value)} margin="normal" multiline rows={3} />

      {variants.map((variant, index) => (
        <Box key={index} sx={{ mt: 2, border: '1px solid #e0e0e0', p: 2, borderRadius: 2, background: '#fff', boxShadow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Variant {index + 1}</Typography>
          <TextField fullWidth label="Color *" value={variant.color} onChange={e => handleVariantChange(index, 'color', e.target.value)} margin="normal" />
          <TextField fullWidth label="Price *" type="number" value={variant.price} onChange={e => handleVariantChange(index, 'price', e.target.value)} margin="normal" />
          <TextField fullWidth label="Image URL (optional)" value={variant.imageUrl} onChange={e => handleVariantChange(index, 'imageUrl', e.target.value)} margin="normal" />
        </Box>
      ))}

      <Button startIcon={<AddIcon />} onClick={addVariant} sx={{ mt: 2, background: '#e3f2fd', color: '#1976d2', fontWeight: 600, borderRadius: 2 }}>
        Add Another Color
      </Button>
      <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 3, fontWeight: 700, borderRadius: 2, boxShadow: 2 }}>
        Upload Product
      </Button>
    </Container>
  );
}
