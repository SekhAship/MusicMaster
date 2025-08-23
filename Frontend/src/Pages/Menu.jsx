import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../Contexts/CartContext";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, dispatch } = useCart();


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu`);
       // 👈 backend URL
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json(); // 👈 convert response to JSON
        setMenuItems(data);
      } catch (err) {
        setError("Failed to load menu. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const getQuantity = (id) => {
    const item = cart.find((item) => item._id === id);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (item) => {
    // console.log(item)
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const handleIncrement = (id) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: id });
  };

  const handleDecrement = (id) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading menu...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // Extract unique categories
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  // Local category images from public/menu/
  const categoryImages = {
    All: "🎼", // optional placeholder
    guitars: '🎸',
    pianos_keyboards: '🎹',
    drums_percussion: '🥁',
    violins: '🎻',
    woodwind_instruments: '🎷',
    brass_instruments: '🎺',
  };

  // Filter items based on category + search
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (

    <div className="bg-white ">
      {/* Hero Section */}
      <section className="pt-0 pb-24 flex justify-center items-start">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-24 w-full mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Your Musical Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover premium musical instruments from guitars to violins.
            Quality craftsmanship meets affordable prices.
          </p>
          <button
            onClick={() => document.getElementById('categories-section').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-10 py-4 text-lg rounded-xl font-bold hover:bg-gray-50 transition duration-200 shadow-lg cursor-pointer"
          >
            Shop Now
          </button>
        </div>
      </section>
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search your favorite instrument here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      {/* Category Cards */}
      <section id="categories-section" className="py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8 mx-2 p-[2px]">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`group relative bg-white rounded-2xl shadow-lg 
        hover:shadow-2xl transition-all duration-300 
        transform hover:-translate-y-2 overflow-hidden cursor-pointer
        border-2 ${selectedCategory === cat
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-400"
              }`}
          >
            {/* Gradient hover overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 
        opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            ></div>

            {/* Main content */}
            <div className="p-6 text-center relative z-10">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-5xl">
                {categoryImages[cat] || "🎼"}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{cat}</h3>
              <p className="text-gray-600 text-sm">Premium collection</p>
            </div>
          </div>
        ))}
      </div>
      </section>


      {/* Menu Items */}
      {/* 🍴 Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-2 p-[2px]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const quantity = getQuantity(item._id);

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
              >
                {/* Image Section */}
                <div className="relative">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="text-6xl opacity-50"
                      style={{ display: item.image ? "none" : "flex" }}
                    >
                      🍴
                    </div>
                  </div>

                  {/* Example badges (optional, can extend your JSON with badge/featured) */}
                  {item.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {item.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Wishlist button on hover */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50">
                      ❤️
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  {/* ⭐ Ratings */}
                  {item.rating && (
                    <div className="mb-2 flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < Math.floor(item.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                              }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      {item.reviewCount && (
                        <span className="ml-2 text-sm text-gray-600">
                          ({item.reviewCount})
                        </span>
                      )}
                    </div>
                  )}

                  {/* Brand or Category */}
                  <p className="text-sm text-gray-500 mb-1">{item.category}</p>

                  {/* Title */}
                  <h3 className="font-bold text-xl mb-2 text-gray-800">
                    {item.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-indigo-600">
                        ₹{item.price}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cart Actions */}
                  {quantity > 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
                      >
                        −
                      </button>
                      <span className="px-3 font-semibold">{quantity}</span>
                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                      
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No items found
          </p>
        )}
      </div>

    </div>
  );
};

export default Menu;