import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ items, onClose, total }) {
  const navigate = useNavigate();

  return (
    <div className="cart-overlay">
      <div className="cart-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Your Cart</h2>
        
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>₹{item.price} × {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-total">
              <h3>Total: ₹{total}</h3>
              <button 
                className="checkout-btn"
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default Cart;