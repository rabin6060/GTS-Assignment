export const OrderButton = ({ selectedItems, handleSubmit }) => {
    return (
      <button
        className="order-button"
        onClick={handleSubmit}
        disabled={selectedItems.size === 0}
      >
        Place Order
      </button>
    );
  };