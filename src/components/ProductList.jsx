import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ 
  products, 
  onAddToCart, 
  sortOrder, 
  setSortOrder, 
  selectedCategory, 
  setSelectedCategory 
}) {
  // Example of for loop for product filtering and sorting
  const getFilteredAndSortedProducts = () => {
    let filteredProducts = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filteredProducts = [];
      for (let i = 0; i < products.length; i++) {
        if (products[i].category === selectedCategory) {
          filteredProducts.push(products[i]);
        }
      }
    }

    // Sort products
    if (sortOrder === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  return (
    <div className="product-list">
      <div className="filters">
        <fieldset>
          <legend>Filter Options</legend>
          
          <div className="category-filters">
            <label>
              <input
                type="radio"
                name="category"
                value="all"
                checked={selectedCategory === 'all'}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="veg"
                checked={selectedCategory === 'veg'}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              Vegetarian
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="non-veg"
                checked={selectedCategory === 'non-veg'}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              Non-Vegetarian
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="dessert"
                checked={selectedCategory === 'dessert'}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              Desserts
            </label>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="none">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </fieldset>
      </div>

      <div className="products-grid">
        {getFilteredAndSortedProducts().map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default ProductList;