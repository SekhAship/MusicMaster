import { useState } from 'react';
import { useCart } from '../Contexts/CartContext';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Checkout() {
  const { cart, dispatch } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [upiTxnId, setUpiTxnId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const token = localStorage.getItem('token');
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  

  // console.log("userid",userId,cart)

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      toast.error('Please login to place an order.');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    if (paymentMethod === 'UPI' && !upiTxnId.trim()) {
      toast.error('Please enter your UPI transaction ID.');
      return;
    }

    if (paymentMethod === 'Credit/Debit Card') {
      if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
        toast.error('Please fill all card details.');
        return;
      }
    }

    const orderData = {
      userId,
      items: cart.map(item => ({
        foodId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      totalAmount,
      address,
      paymentMethod,
      upiTxnId: paymentMethod === 'UPI' ? upiTxnId : null,
      cardDetails: paymentMethod === 'Credit/Debit Card'
        ? { cardNumber, expiryDate, cvv }
        : null,

    };

    try {
      await API.post('/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Order placed successfully!');
      dispatch({ type: 'CLEAR_CART' });
      navigate('/');
    } catch (err) {
      console.error('Order error:', err);
      const msg = err.response?.data?.message || 'Order failed';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="mb-4 font-semibold">Total Amount: ₹{totalAmount}</p>

      {/* Cart Preview */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="flex flex-wrap gap-3">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center border rounded p-2 w-[80px]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <p className="text-xs text-center truncate w-full">{item.name}</p>
              <span className="text-xs text-gray-500">x{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleOrder}>
        {/* Address */}
        <label htmlFor="address" className="block mb-1 font-medium">
          Delivery Address
        </label>
        <textarea
          id="address"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded mb-6 resize-none focus:outline-blue-500"
          rows={4}
        />

        {/* Payment Method */}
        <label className="block mb-2 font-medium">Payment Method</label>
        <div className="mb-6 space-y-2">
          {['COD', 'UPI', 'Credit/Debit Card'].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="accent-blue-600"
              />
              {method}
            </label>
          ))}
        </div>

        {/* UPI Payment UI */}
        {paymentMethod === 'UPI' && (
          <div className="mb-6 border p-4 rounded bg-gray-50">
            <p className="mb-2 font-medium">Scan this QR to Pay</p>
            <div className="flex justify-center mb-3">
              <img
                src="/menu/QR.jpeg"
                alt="UPI QR Code"
                className="w-40 h-40 object-contain"
              />
            </div>
            <label className="block mb-1 text-sm">Enter UPI Transaction ID</label>
            <input
              type="text"
              value={upiTxnId}
              onChange={(e) => setUpiTxnId(e.target.value)}
              placeholder="e.g. TXN123456789"
              className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
            />
          </div>
        )}

        {/* Credit/Debit Card Payment UI */}
        {paymentMethod === 'Credit/Debit Card' && (
          <div className="mb-6 border p-4 rounded bg-gray-50 space-y-3">
            <div>
              <label className="block text-sm">Card Number</label>
              <input
                type="text"
                maxLength="16"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm">CVV</label>
                <input
                  type="password"
                  maxLength="3"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
