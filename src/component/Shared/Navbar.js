import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem, IconButton, Badge, InputBase, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const categories = ['All', 'Shoes', 'Clothing', 'Accessories'];

export default function Navbar({ selectedCategory, onCategoryChange, cartCount = 0, user }) {
  const [localCategory, setLocalCategory] = useState(selectedCategory || 'All');
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleCategoryChange = (e) => {
    setLocalCategory(e.target.value);
    if (onCategoryChange) onCategoryChange(e.target.value);
  };

  return (
    <AppBar position="sticky" elevation={12} sx={{
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 4px 24px #1976d2',
      borderBottom: '2px solid #e3eafc',
      py: { xs: 0.5, md: 2 },
      px: { xs: 1, md: 4 },
    }}>
      <Toolbar sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 80,
        px: { xs: 0, md: 2 },
        py: { xs: 1, md: 2 },
        gap: { xs: 1, md: 4 },
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton edge="start" color="primary" sx={{ mr: 2, display: { xs: 'inline-flex', md: 'none' }, p: 1.2 }} onClick={() => setMobileMenu(!mobileMenu)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 2, color: '#1976d2', textShadow: '0 2px 8px #e3eafc', ml: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>E-Commerce</Link>
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3, flexGrow: 1, ml: 6 }}>
          <Box sx={{ minWidth: 150 }}>
            <Select
              value={localCategory}
              onChange={handleCategoryChange}
              sx={{ background: '#fff', borderRadius: 3, fontWeight: 600, boxShadow: 2, px: 2, py: 1, fontSize: 18 }}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat} sx={{ fontWeight: 500, fontSize: 17 }}>{cat}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ ml: 3, display: 'flex', alignItems: 'center', background: '#e3eafc', borderRadius: 3, px: 2.5, py: 1, boxShadow: 2, transition: 'box-shadow 0.2s', '&:focus-within': { boxShadow: 4 } }}>
            <SearchIcon sx={{ color: '#1976d2', mr: 1 }} />
            <InputBase
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ width: 200, fontWeight: 500, fontSize: 17, background: 'transparent', border: 'none', outline: 'none' }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="primary" component={Link} to="/" sx={{ fontWeight: 700, borderRadius: 3, px: 2, py: 1, fontSize: 16, boxShadow: 1, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4, background: '#e3eafc' } }}>Home</Button>
          <Button color="primary" component={Link} to="/upload" sx={{ fontWeight: 700, borderRadius: 3, px: 2, py: 1, fontSize: 16, boxShadow: 1, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4, background: '#e3eafc' } }}>Upload</Button>
          <Button color="primary" component={Link} to="/login" sx={{ fontWeight: 700, borderRadius: 3, px: 2, py: 1, fontSize: 16, boxShadow: 1, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4, background: '#e3eafc' } }}>Login</Button>
          <Button color="primary" component={Link} to="/signup" sx={{ fontWeight: 700, borderRadius: 3, px: 2, py: 1, fontSize: 16, boxShadow: 1, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4, background: '#e3eafc' } }}>Signup</Button>
          <IconButton component={Link} to="/cart" size="large" sx={{ ml: 1, p: 1.2, boxShadow: 2, background: '#fff', borderRadius: 3, '&:hover': { background: '#e3eafc', boxShadow: 4 } }}>
            <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 700, fontSize: 14, borderRadius: 2 } }}>
              <ShoppingCartIcon sx={{ fontSize: 32, color: '#1976d2' }} />
            </Badge>
          </IconButton>
          {user ? (
            <Avatar alt={user.name} src={user.avatarUrl} sx={{ ml: 2, boxShadow: 2, width: 44, height: 44, border: '2px solid #e3eafc' }} />
          ) : null}
        </Box>
      </Toolbar>
      {/* Mobile Menu */}
      {mobileMenu && (
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', alignItems: 'center', py: 2, background: 'rgba(255,255,255,0.98)', boxShadow: 8, borderRadius: 3, mt: 1, mx: 2, gap: 1 }}>
          <Button color="primary" component={Link} to="/" sx={{ fontWeight: 700, borderRadius: 3, px: 3, py: 1.5, fontSize: 17, boxShadow: 1, width: '100%' }}>Home</Button>
          <Button color="primary" component={Link} to="/upload" sx={{ fontWeight: 700, borderRadius: 3, px: 3, py: 1.5, fontSize: 17, boxShadow: 1, width: '100%' }}>Upload</Button>
          <Button color="primary" component={Link} to="/login" sx={{ fontWeight: 700, borderRadius: 3, px: 3, py: 1.5, fontSize: 17, boxShadow: 1, width: '100%' }}>Login</Button>
          <Button color="primary" component={Link} to="/signup" sx={{ fontWeight: 700, borderRadius: 3, px: 3, py: 1.5, fontSize: 17, boxShadow: 1, width: '100%' }}>Signup</Button>
          <IconButton component={Link} to="/cart" size="large" sx={{ ml: 1, p: 1.2, boxShadow: 2, background: '#fff', borderRadius: 3, width: '100%', '&:hover': { background: '#e3eafc', boxShadow: 4 } }}>
            <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 700, fontSize: 14, borderRadius: 2 } }}>
              <ShoppingCartIcon sx={{ fontSize: 32, color: '#1976d2' }} />
            </Badge>
          </IconButton>
        </Box>
      )}
    </AppBar>
  );
}
