import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Shared/Navbar';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import ProductUpload from './component/Saller/ProductUpload';
import ProductList from './component/Buyer/ProductList';
import ProductDetail from './component/Buyer/ProductDetail';
import Cart from './component/Buyer/Cart';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<ProductUpload />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
