import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
  Card, CardMedia, CardContent, Typography, Button, Grid, Select, MenuItem, Box
} from '@mui/material';
import { getImageUrl } from '../../utils/imageUrl';
import { useNavigate } from 'react-router-dom';

// profileType: 'buyer' or 'seller'
export default function ProductList({ profileType = 'buyer', isAuthenticated = false }) {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleColorChange = (productId, color) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const handleDelete = async (productId) => {
    await deleteDoc(doc(db, 'products', productId));
    fetchProducts();
  };

  const handleEdit = (product) => {
    alert(`Edit product: ${product.name} (SKU: ${product.sku})`);
    // You can redirect to an edit form or open a modal here
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Seller must be authenticated
  if (profileType === 'seller' && !isAuthenticated) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          Please login or signup to view seller dashboard.
        </Typography>
        {/* Add login/signup buttons or redirect logic here if needed */}
      </Box>
    );
  }

  return (
    <Box sx={{ background: 'linear-gradient(120deg, #f7f7fa 60%, #e3eafc 100%)', minHeight: '100vh', py: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, color: '#1976d2', textAlign: 'center', letterSpacing: 2, fontFamily: 'Montserrat, sans-serif', textShadow: '0 2px 8px #e3eafc' }}>
        Explore Products
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          sx={{ background: '#fff', borderRadius: 3, fontWeight: 700, boxShadow: 2, px: 3, py: 1.5, fontSize: 18, minWidth: 160 }}
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Shoes">Shoes</MenuItem>
          <MenuItem value="Clothing">Clothing</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center" alignItems="stretch">
        {filteredProducts.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 6 }}>
              No products found in this category.
            </Typography>
          </Grid>
        )}
        {filteredProducts.map(product => {
          const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
          const selectedColor = selectedColors[product.id] || (hasVariants ? product.variants[0].color : '');
          const variant = hasVariants
            ? product.variants.find(v => v.color === selectedColor) || product.variants[0]
            : null;

          return (
            <Grid item xs={12} sm={6} md={4} key={product.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
              <Card
                onClick={() => navigate(`/product/${product.id}`)}
                sx={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: 8,
                  background: 'linear-gradient(135deg, #fff 60%, #e3eafc 100%)',
                  borderRadius: 4,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '100%',
                  minHeight: 420,
                  maxWidth: 340,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: 16,
                    background: 'linear-gradient(135deg, #e3eafc 60%, #fff 100%)',
                  },
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 1, position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={getImageUrl(variant?.imageUrl || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308')}
                    alt={product.name}
                    sx={{
                      objectFit: 'cover',
                      borderRadius: 4,
                      width: '95%',
                      boxShadow: 4,
                      transition: 'transform 0.3s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.08)',
                      },
                    }}
                  />
                  {/* Price badge */}
                  {variant?.price && (
                    <Box sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: 'rgba(25,118,210,0.92)',
                      color: '#fff',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: 2,
                      zIndex: 2,
                    }}>
                      ₹{variant.price}
                    </Box>
                  )}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', textAlign: 'center', mb: 1, mt: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#333', textAlign: 'center', mb: 1, px: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '95%' }}>
                  {product.description}
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {/* Make sure to add this route in your main router (e.g., App.js): */}
      {/* import ProductDetail from './component/Buyer/ProductDetail'; */}
      {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
    </Box>
  );
}
