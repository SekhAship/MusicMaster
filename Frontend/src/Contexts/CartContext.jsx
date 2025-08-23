import { createContext, useContext, useReducer } from 'react';

// Create Context
const CartContext = createContext();

// Initial state of the cart
const initialState = [];

// Reducer function to handle cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        return state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.payload);
    case 'INCREMENT_QUANTITY':
      return state.map(item =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case 'DECREMENT_QUANTITY':
      return state
        .map(item =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

// Provider component that wraps your app
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
