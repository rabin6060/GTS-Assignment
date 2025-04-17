import { ProductItem } from "./ProductItem";

export const ProductList = ({ products, selectedItems, handleCheckboxChange }) => {
    return (
      <div className="product-list">
        <h3 className='header'>
          <span>Name</span>
          <span>Price</span>
          <span>Weight</span>
        </h3>
        {products.map((product) => (
          <ProductItem
            key={product.name}
            product={product}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
    );
  };

