import React, { useEffect, useState } from 'react';
import './App.css';
import { ProductList } from './components/ProductList';
import { OrderButton } from './components/OrderButton';
import { PackageDisplay } from './components/PackageDisplay';

const ProductsPage = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [packages, setPackages] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all products
  const AllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const products = await response.json();
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllProducts();
  }, []);

  // Handle checkbox
  const handleCheckboxChange = (itemName) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemName)) {
      newSelection.delete(itemName);
    } else {
      newSelection.add(itemName);
    }
    setSelectedItems(newSelection);
  };

  const getCourierPrice = (weight) => {
    if (weight <= 200) return 5;
    if (weight <= 500) return 10;
    if (weight <= 1000) return 15;
    return 20;
  };

  // Place order
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedProductIds: Array.from(selectedItems).map(itemName =>
            products.find(p => p.name === itemName)
          ),
        }),
      });

      if (!response.ok) throw new Error('Failed to calculate packages');
      setSelectedItems(new Set());
      const result = await response.json();
      setPackages(result);
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Error processing order. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <ProductList
        products={products}
        selectedItems={selectedItems}
        handleCheckboxChange={handleCheckboxChange}
      />
      <OrderButton
        selectedItems={selectedItems}
        handleSubmit={handleSubmit}
      />
      <PackageDisplay
        packages={packages}
        getCourierPrice={getCourierPrice}
      />
    </div>
  );
};

export default ProductsPage;