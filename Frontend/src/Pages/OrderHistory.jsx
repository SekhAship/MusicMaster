import { useEffect, useState } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu`);

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading orders...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!orders.length) return <p className="p-4 text-center">No orders found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">🧾 Your Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow"
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Ordered At:</strong> {new Date(order.createdAt || order.orderedAt).toLocaleString()}</p>
            <div className="mt-2">
              <p className="font-medium">Items:</p>
              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.foodId || item._id || item.name}>
                    {item.name} x{item.quantity} - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;

