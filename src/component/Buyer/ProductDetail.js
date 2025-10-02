import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Typography, CardMedia, CircularProgress, Chip, Button, Card, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getImageUrl } from '../../utils/imageUrl';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false); // Add expanded state
  const [descOpen, setDescOpen] = useState(false); // Modal for description

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({ id: docSnap.id, ...data }); // Ensure product has id
        if (Array.isArray(data.variants) && data.variants.length > 0) {
          setSelectedColor(data.variants[0].color);
          setVariant(data.variants[0]);
        }
      } else {
        setProduct(null);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && Array.isArray(product.variants)) {
      const found = product.variants.find(v => v.color === selectedColor) || product.variants[0];
      setVariant(found);
    }
  }, [selectedColor, product]);

  if (loading) return <Box sx={{ mt: 8, textAlign: 'center' }}><CircularProgress /> </Box>;
  if (!product) return <Typography sx={{ mt: 8, textAlign: 'center' }}>Product not found.</Typography>;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: 6,
      p: { xs: 2, md: 8 },
      minHeight: 600,
      background: 'linear-gradient(120deg, #e3eafc 60%, #f7f7fa 100%)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'fadeIn 0.8s',
      '@keyframes fadeIn': {
        '0%': { opacity: 0, transform: 'translateY(40px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    }}>
      {/* Back Button */}
      <Button variant="text" sx={{ position: 'absolute', top: 24, left: 24, zIndex: 10, color: '#1976d2', fontWeight: 700, fontSize: 18 }} onClick={() => window.history.back()}>
        ← Back to Products
      </Button>
      {/* Hero Banner Blur Behind Image */}
      <Box sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: `url(${getImageUrl(variant?.imageUrl || product.imageUrl || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308')}) center/cover no-repeat`,
        filter: 'blur(32px) brightness(0.9)',
        opacity: 0.18,
      }} />
      {/* Left: Product Image & Gallery */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 320,
        maxWidth: 520,
        position: 'relative',
        mb: { xs: 3, md: 0 },
        zIndex: 2,
        height: 520,
      }}>
        <Card sx={{
          boxShadow: 20,
          borderRadius: 16,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.98)',
          border: 'none',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.3s',
          '&:hover': { boxShadow: 32 },
          animation: 'fadeIn 1.2s',
        }}>
          <img
            src={getImageUrl(variant?.imageUrl || product.imageUrl || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308')}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', cursor: 'zoom-in', borderRadius: '16px', boxShadow: '0 8px 32px rgba(25,118,210,0.12)' }}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308'; }}
            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        </Card>
        {/* Image Gallery Thumbnails */}
        {(variant?.images || product.images) && (
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {(variant?.images || product.images).map((img, idx) => (
              <img
                key={idx}
                src={getImageUrl(img)}
                alt={`thumb-${idx}`}
                style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, border: '2px solid #e3eafc', cursor: 'pointer', boxShadow: '0 2px 8px rgba(25,118,210,0.10)', transition: 'transform 0.2s' }}
                onClick={() => setVariant({ ...variant, imageUrl: img })}
              />
            ))}
          </Box>
        )}
      </Box>
      {/* Right: Product Details */}
      <Box sx={{
        flex: 1,
        boxShadow: 16,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        p: { xs: 3, md: 5 },
        minWidth: 320,
        maxWidth: 520,
        height: 520,
        border: 'none',
        zIndex: 2,
        animation: 'fadeIn 1.5s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, color: '#1976d2', letterSpacing: 1, fontSize: { xs: 28, md: 40 }, textShadow: '0 2px 8px #e3eafc' }}>
          {product.name}
        </Typography>
        {/* Review Stars Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {[...Array(5)].map((_, i) => (
            <Box key={i} sx={{ color: i < (product.rating || 4) ? '#FFD600' : '#e3eafc', fontSize: 26, mr: 0.5, textShadow: '0 2px 8px #fff' }}>★</Box>
          ))}
          <Typography variant="caption" sx={{ ml: 1, color: '#888', fontWeight: 600 }}>{product.rating || 4.0} / 5</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {/* Product Meta with Icons */}
          {product.sku && (
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 600, px: 1, borderRadius: 1, background: '#e3eafc', mr: 1 }}>
              <span role="img" aria-label="sku">🔖</span> SKU: {product.sku}
            </Typography>
          )}
          {product.category && (
            <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 700, px: 1, borderRadius: 1, background: '#e3eafc', mr: 1 }}>
              <span role="img" aria-label="category">📦</span> {product.category}
            </Typography>
          )}
          {product.stock !== undefined && (
            <Typography variant="caption" sx={{ color: product.stock > 0 ? '#388e3c' : '#d32f2f', fontWeight: 700, px: 1, borderRadius: 1, background: '#e3eafc' }}>
              <span role="img" aria-label="stock">{product.stock > 0 ? '✅' : '❌'}</span> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
          )}
        </Box>
        <Box sx={{ my: 2, width: '100%' }}>
          <Box sx={{ height: 2, width: '100%', background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)', borderRadius: 2, opacity: 0.18 }} />
        </Box>
        {/* Expandable Description with Modal */}
        <Box sx={{ mb: 3, position: 'relative', width: '100%' }}>
          <Box sx={{
            maxHeight: 140,
            overflowY: 'auto',
            px: 1,
            borderRadius: 2,
            background: 'rgba(227,234,252,0.15)',
            boxShadow: 2,
            position: 'relative',
          }}>
            <Typography
              variant="body1"
              sx={{
                color: '#333',
                fontSize: 20,
                fontWeight: 500,
                textShadow: '0 1px 4px #e3eafc',
                wordBreak: 'break-word',
                whiteSpace: 'pre-line',
                pb: 3,
              }}
            >
              {product.description}
            </Typography>
            {/* Gradient fade at bottom for long descriptions */}
            <Box sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 24,
              background: 'linear-gradient(180deg, rgba(227,234,252,0) 0%, rgba(227,234,252,0.8) 100%)',
              pointerEvents: 'none',
            }} />
          </Box>
        </Box>
        {/* Color swatches for variants */}
        {product.variants && product.variants.length > 1 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, fontSize: 18 }}>Color:</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {product.variants.map(v => (
                <Box
                  key={v.color}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: selectedColor === v.color ? 'linear-gradient(135deg, #1976d2 60%, #64b5f6 100%)' : '#e3eafc',
                    border: selectedColor === v.color ? '3px solid #1976d2' : '2px solid #e3eafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: selectedColor === v.color ? 8 : 2,
                    transition: 'all 0.25s cubic-bezier(.68,-0.55,.27,1.55)',
                    transform: selectedColor === v.color ? 'scale(1.18)' : 'scale(1)',
                  }}
                  onClick={() => setSelectedColor(v.color)}
                >
                  <Typography sx={{ color: selectedColor === v.color ? '#fff' : '#1976d2', fontWeight: 700, fontSize: 16 }}>
                    {v.color}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        <Box sx={{ my: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Button variant="contained" color="primary" size="large" sx={{
            flex: 1,
            py: 2,
            fontWeight: 900,
            fontSize: 24,
            borderRadius: 6,
            boxShadow: '0 4px 24px 0 #1976d2',
            background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
            border: 'none',
            letterSpacing: 1,
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 8px 32px 0 #1976d2',
              background: 'linear-gradient(90deg, #1565c0 60%, #1976d2 100%)',
            },
          }}>
            Add to Cart
          </Button>
          <Button variant="contained" color="secondary" size="large" sx={{
            flex: 1,
            py: 2,
            fontWeight: 900,
            fontSize: 24,
            borderRadius: 6,
            boxShadow: '0 4px 24px 0 #ff9800',
            background: 'linear-gradient(90deg, #ff9800 60%, #ffc107 100%)',
            border: 'none',
            letterSpacing: 1,
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 8px 32px 0 #ff9800',
              background: 'linear-gradient(90deg, #ffa726 60%, #ff9800 100%)',
            },
          }}>
            Buy Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
