import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Checkout.css';

function Checkout({ cart, total }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: '',
    specialInstructions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      
      <form onSubmit={handleSubmit}>
     

        <fieldset>
          <legend>Payment Method</legend>
          
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                required
              />
              Credit/Debit Card
            </label>
            
            <label>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={formData.paymentMethod === 'upi'}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
              />
              UPI
            </label>
            
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
              />
              Cash on Delivery
            </label>
          </div>
        </fieldset>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="total">
            <strong>Total:</strong>
            <strong>₹{total}</strong>
          </div>
        </div>

        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
};

export default Checkout;