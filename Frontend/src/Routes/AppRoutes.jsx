import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Menu from '../Pages/Menu';
import Cart from '../Pages/Cart';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
export default AppRoutes;
                                                                
