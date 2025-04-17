export const ProductItem = ({ product, selectedItems, handleCheckboxChange }) => {
    return (
      <div className="product-item">
        <label>
          <input
            type="checkbox"
            checked={selectedItems.has(product.name)}
            onChange={() => handleCheckboxChange(product.name)}
          />
          <span>{product.name}</span>
          <span>${product.price}</span>
          <span>{product.weight}g</span>
        </label>
      </div>
    );
  };