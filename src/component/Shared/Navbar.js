import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem, IconButton, Badge, InputBase, Avatar, Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const categories = ['All', 'Shoes', 'Clothing', 'Accessories'];

// Button style for nav buttons
const buttonStyles = {
  fontWeight: 700,
  borderRadius: 99,
  px: 3,
  py: 1.5,
  fontSize: 16,
  boxShadow: 2,
  background: 'linear-gradient(90deg, #e3eafc 0%, #1976d2 100%)',
  color: '#1976d2',
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow: 4,
    background: 'linear-gradient(90deg, #1976d2 0%, #e3eafc 100%)',
    color: '#fff',
    transform: 'scale(1.05)'
  }
};

export default function Navbar({ selectedCategory, onCategoryChange, cartCount = 0, user: userProp }) {
  const context = useContext(UserContext);
  const user = userProp || context?.user;
  const [localCategory, setLocalCategory] = useState(selectedCategory || 'All');
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCategoryChange = (e) => {
    setLocalCategory(e.target.value);
    if (onCategoryChange) onCategoryChange(e.target.value);
  };

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await signOut(auth);
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" elevation={16} sx={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(18px) saturate(180%)',
      boxShadow: '0 6px 32px 0 #1976d2',
      borderBottom: '2px solid #e3eafc',
      py: { xs: 0, md: 2 },
      px: { xs: 0, md: 4 },
      borderRadius: { xs: 0, md: 6 },
    }}>
      <Toolbar sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: { xs: 64, md: 88 },
        px: { xs: 1, md: 3 },
        py: { xs: 0.5, md: 2 },
        gap: { xs: 0.5, md: 4 },
      }}>
        {/* Left: Hamburger (mobile), Logo (desktop) */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <IconButton edge="start" color="primary" sx={{ mr: 1, display: { xs: 'inline-flex', md: 'none' }, p: 1.2, background: 'rgba(227,234,252,0.7)', borderRadius: 2 }} onClick={() => setMobileMenu(!mobileMenu)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 2, color: '#1976d2', textShadow: '0 2px 8px #e3eafc', ml: 0, fontSize: { xs: 24, md: 36 }, minWidth: 0, fontFamily: 'Montserrat, sans-serif', display: { xs: 'none', md: 'block' } }} noWrap>
            <Link to="/" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 900, fontFamily: 'inherit' }}>E-Commerce</Link>
          </Typography>
        </Box>
        {/* Center: Category and Search (desktop only) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3, flexGrow: 1, justifyContent: 'center' }}>
          <Select
            value={localCategory}
            onChange={handleCategoryChange}
            sx={{ background: '#fff', borderRadius: 3, fontWeight: 600, boxShadow: 2, px: 2, py: 1, fontSize: 18, transition: 'box-shadow 0.2s', '&:focus': { boxShadow: 4 } }}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat} sx={{ fontWeight: 500, fontSize: 17 }}>{cat}</MenuItem>
            ))}
          </Select>
          <Box sx={{ ml: 3, display: 'flex', alignItems: 'center', background: 'rgba(227,234,252,0.7)', borderRadius: 3, px: 2.5, py: 1, boxShadow: 2, transition: 'box-shadow 0.2s', '&:focus-within': { boxShadow: 4 } }}>
            <SearchIcon sx={{ color: '#1976d2', mr: 1 }} />
            <InputBase
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ width: 200, fontWeight: 500, fontSize: 17, background: 'transparent', border: 'none', outline: 'none' }}
            />
          </Box>
        </Box>
        {/* Right: Nav buttons, Cart, Avatar (desktop); Hamburger & Avatar (mobile) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Desktop nav buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Button color="primary" component={Link} to="/" startIcon={<HomeIcon sx={{ fontSize: 22 }} />} sx={{ ...buttonStyles }}>Home</Button>
            <Button color="primary" component={Link} to="/upload" startIcon={<UploadFileIcon sx={{ fontSize: 22 }} />} sx={{ ...buttonStyles }}>Upload</Button>
          </Box>
          {/* Cart icon always visible */}
          <IconButton component={Link} to="/cart" size="large" sx={{ p: 1.2, boxShadow: 2, background: '#fff', borderRadius: 99, '&:hover': { background: 'rgba(227,234,252,0.7)', boxShadow: 4, transform: 'scale(1.08)' } }}>
            <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 700, fontSize: 14, borderRadius: 2 } }}>
              <ShoppingCartIcon sx={{ fontSize: { xs: 26, md: 36 }, color: '#1976d2' }} />
            </Badge>
          </IconButton>
          {/* Avatar always visible */}
          <IconButton onClick={handleAvatarClick} sx={{ ml: 1, boxShadow: 2, width: { xs: 36, md: 48 }, height: { xs: 36, md: 48 }, border: '2px solid #e3eafc', background: '#fff', borderRadius: 99 }}>
            <Avatar alt={user?.name || user?.email || 'User'} src={user?.avatarUrl} sx={{ width: { xs: 36, md: 48 }, height: { xs: 36, md: 48 }, bgcolor: '#e3eafc', color: '#1976d2', fontWeight: 700 }} />
          </IconButton>
        </Box>
        {/* Avatar menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ mt: 1 }}>
          {user ? (
            <>
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose} sx={{ fontWeight: 700, fontSize: 16 }}>Profile ({user?.name || user?.email})</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ fontWeight: 700, fontSize: 16 }}>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="/login" onClick={handleMenuClose} sx={{ fontWeight: 700, fontSize: 16 }}>Login</MenuItem>
              <MenuItem component={Link} to="/signup" onClick={handleMenuClose} sx={{ fontWeight: 700, fontSize: 16 }}>Signup</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
      {/* Mobile Menu with animation */}
      {mobileMenu && (
        <Box sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          py: 1.5,
          background: 'rgba(255,255,255,0.98)',
          boxShadow: 8,
          borderRadius: 3,
          mt: 0.5,
          mx: 1,
          gap: 1,
          zIndex: 1200,
          animation: 'slideDown 0.4s',
          '@keyframes slideDown': {
            '0%': { opacity: 0, transform: 'translateY(-24px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}>
          <Button color="primary" component={Link} to="/" startIcon={<HomeIcon sx={{ fontSize: 22 }} />} sx={{ fontWeight: 700, borderRadius: 99, px: 3, py: 1.5, fontSize: 16, boxShadow: 2, width: '100%', background: 'linear-gradient(90deg, #e3eafc 0%, #1976d2 100%)', color: '#1976d2', transition: 'all 0.2s', '&:hover': { boxShadow: 4, background: 'linear-gradient(90deg, #1976d2 0%, #e3eafc 100%)', color: '#fff', transform: 'scale(1.05)' } }}>Home</Button>
          <Button color="primary" component={Link} to="/upload" startIcon={<UploadFileIcon sx={{ fontSize: 22 }} />} sx={{ fontWeight: 700, borderRadius: 99, px: 3, py: 1.5, fontSize: 16, boxShadow: 2, width: '100%', background: 'linear-gradient(90deg, #e3eafc 0%, #1976d2 100%)', color: '#1976d2', transition: 'all 0.2s', '&:hover': { boxShadow: 4, background: 'linear-gradient(90deg, #1976d2 0%, #e3eafc 100%)', color: '#fff', transform: 'scale(1.05)' } }}>Upload</Button>
          <IconButton component={Link} to="/cart" size="large" sx={{ ml: 1, p: 1.2, boxShadow: 2, background: '#fff', borderRadius: 99, width: '100%', '&:hover': { background: 'rgba(227,234,252,0.7)', boxShadow: 4, transform: 'scale(1.08)' } }}>
            <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 700, fontSize: 14, borderRadius: 2 } }}>
              <ShoppingCartIcon sx={{ fontSize: 26, color: '#1976d2' }} />
            </Badge>
          </IconButton>
          <IconButton onClick={handleAvatarClick} sx={{ mt: 1, boxShadow: 2, width: 44, height: 44, border: '2px solid #e3eafc', background: '#fff', borderRadius: 99 }}>
            <Avatar alt={user?.name || user?.email || 'User'} src={user?.avatarUrl} sx={{ width: 44, height: 44, bgcolor: '#e3eafc', color: '#1976d2', fontWeight: 700 }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ mt: 1 }}>
            {user ? (
              <>
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose} sx={{ fontWeight: 700, fontSize: 16 }}>Profile ({user?.name || user?.email})</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ fontWeight: 700, fontSize: 16 }}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/login" onClick={handleMenuClose} sx={{ fontWeight: 700, fontSize: 16 }}>Login</MenuItem>
                <MenuItem component={Link} to="/signup" onClick={handleMenuClose} sx={{ fontWeight: 700, fontSize: 16 }}>Signup</MenuItem>
              </>
            )}
          </Menu>
        </Box>
      )}
    </AppBar>
  );
}
