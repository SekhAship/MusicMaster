// menuData.js (backend)

  const FRONTEND_URL =
    process.env.NODE_ENV === "production"
      ? "https://your-frontend-name.vercel.app" // Replace with your deployed frontend URL if needed
      : "http://localhost:5173"; // Your backend port

const menuData = [
  {
    _id: "6650f2a0a0d1e2a1b4f0c101",
    name: "Margherita Pizza",
    price: 249,
    image: `${FRONTEND_URL}/menu/pizza.jpeg`,
  },
  {
    _id: "6650f2a0a0d1e2a1b4f0c102",
    name: "Veg Burger",
    price: 149,
    image: `${FRONTEND_URL}/menu/burger.jpeg`,
  },
  {
    _id: "6650f2a0a0d1e2a1b4f0c103",
    name: "French Fries",
    price: 99,
    image: `${FRONTEND_URL}/menu/french_fries.jpeg`,
  },
  {
    _id: "6650f2a0a0d1e2a1b4f0c104",
    name: "Paneer Tikka",
    price: 199,
    image: `${FRONTEND_URL}/menu/tikka.jpeg`,
  },
  {
    _id: "6650f2a0a0d1e2a1b4f0c105",
    name: "Grilled Sandwich",
    price: 129,
    image: `${FRONTEND_URL}/menu/grilled.jpeg`,
  },
  {
    _id: "6650f2a0a0d1e2a1b4f0c106",
    name: "Cold Coffee",
    price: 89,
    image: `${FRONTEND_URL}/menu/coffee.jpeg`,
  },
  {
    _id: "6650f2a0a0d1e2a1b4f0c107",
    name: "Veg Noodles",
    price: 159,
    image: `${FRONTEND_URL}/menu/noodles.jpeg`,
  },
  {
    _id: "6650f2a0a0d1e2a1b4f0c108",
    name: "Chole Bhature",
    price: 179,
    image: `${FRONTEND_URL}/menu/chole.jpeg`,
  },
  {
    _id: "6650f2a0a0d1e2a1b4f0c109",
    name: "Gulab Jamun",
    price: 79,
    image: `${FRONTEND_URL}/menu/sweet.jpeg`,
  },
];

module.exports = menuData;
