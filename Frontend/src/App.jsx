import { Routes, Route } from "react-router-dom";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Checkout from "./Pages/Checkout";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import OrderHistory from "./Pages/OrderHistory";
import Footer from "./Components/Footer"; // ✅ Import Footer

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AboutUs from "./Pages/AboutUs";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-yellow-100">
      {/* Navbar */}
      <Navbar />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Main Content */}
      <div className="flex-grow text-center pt-10">
        <Routes>
          <Route path="/" element={<Menu />} />
          {/* <Route path="/menu" element={<Menu />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/aboutUs" element={<AboutUs/>}/>

          {/* ✅ Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          {/* ❌ Catch-All */}
          <Route
            path="*"
            element={
              <h1 className="text-red-500 text-2xl">404 - Page Not Found</h1>
            }
          />
        </Routes>
      </div>

      {/* ✅ Footer always at bottom */}
      <Footer />
    </div>
  );
}

export default App;


