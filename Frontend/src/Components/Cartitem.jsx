import { useCart } from '../Contexts/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded">
      <div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ₹{item.price * item.quantity}</p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
};
export default CartItem;
