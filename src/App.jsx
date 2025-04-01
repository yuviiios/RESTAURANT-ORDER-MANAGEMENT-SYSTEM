import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Canvas from './components/Canvas';
import './App.css';

// Product data with required properties
const products = [
  {
    id: 1,
    name: 'Butter Chicken',
    price: 349,
    category: 'non-veg',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500'
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    price: 299,
    category: 'veg',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500'
  },
  {
    id: 3,
    name: 'Chicken Biryani',
    price: 399,
    category: 'non-veg',
    image: 'https://images.unsplash.com/photo-1631452180775-8bc94ad5d174?w=500'
  },
  {
    id: 4,
    name: 'Gulab Jamun',
    price: 149,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500'
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [sortOrder, setSortOrder] = useState('none');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartVisible, setCartVisible] = useState(false);

  // Example of using while loop for cart total calculation
  const calculateTotal = () => {
    let total = 0;
    let i = 0;
    while (i < cart.length) {
      total += cart[i].price * cart[i].quantity;
      i++;
    }
    return total;
  };

  // Example of using do...while loop for cart item grouping
  const groupCartItems = () => {
    let grouped = {};
    let i = 0;
    if (cart.length > 0) {
      do {
        const item = cart[i];
        if (grouped[item.id]) {
          grouped[item.id].quantity += item.quantity;
        } else {
          grouped[item.id] = { ...item };
        }
        i++;
      } while (i < cart.length);
    }
    return Object.values(grouped);
  };

  // Event handler example
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Event listener example using useEffect
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setCartVisible(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar 
          cartCount={cart.length} 
          onCartClick={() => setCartVisible(!cartVisible)}
        />
        
        <Routes>
          <Route path="/" element={
            <main>
              <ProductList
                products={products}
                onAddToCart={handleAddToCart}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              {cartVisible && (
                <Cart
                  items={groupCartItems()}
                  onClose={() => setCartVisible(false)}
                  total={calculateTotal()}
                />
              )}
              <Canvas />
            </main>
          } />
          <Route path="/checkout" element={<Checkout cart={cart} total={calculateTotal()} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;