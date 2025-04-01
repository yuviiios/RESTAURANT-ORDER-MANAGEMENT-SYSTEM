import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Gourmet Delights
      </Link>
      
      <div className="nav-links">
        <Link to="/">Menu</Link>
        <button className="cart-button" onClick={onCartClick}>
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default Navbar;