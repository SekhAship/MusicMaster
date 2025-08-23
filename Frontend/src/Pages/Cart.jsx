import { useNavigate } from 'react-router-dom';
import { useCart } from "../Contexts/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();

  if (cart.length === 0) {
    return <div className="p-6 text-xl">Your cart is empty.</div>;
  }

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const incrementQuantity = (id) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
  };

  const decrementQuantity = (id) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 overflow-x-hidden max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {cart.map((item) => (
        <div
          key={item._id || item.id}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 border-b pb-4"
        >
          {/* Image + Name & Quantity container */}
          <div className="flex items-center gap-4 sm:w-1/3 w-full min-w-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-medium truncate">{item.name}</span>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => decrementQuantity(item._id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 select-none"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  −
                </button>
                <span className="min-w-[1.5rem] text-center">{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item._id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 select-none"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price */}
          <span className="sm:w-1/4 w-full text-center mt-3 sm:mt-0 flex-shrink-0">
            ₹{item.price * item.quantity}
          </span>

          {/* Remove */}
          <button
            className="text-red-500 hover:text-red-700 mt-3 sm:mt-0 flex-shrink-0"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <hr className="my-6" />
      <h3 className="text-xl font-semibold mb-4">Total: ₹{total}</h3>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded"
        >
          Clear Cart
        </button>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
