import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './conponents/screen/home/index';
import Cart from './conponents/screen/cart/index';
import ShoeInfo from './conponents/screen/shoe_info/index';
import Admin from './conponents/screen/admin-login/index';
import AdminManage from './conponents/screen/admin-manage/index';
import Statistic from './conponents/screen/admin-manage/statistic/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="shoe-info" element={<ShoeInfo />} />
        <Route path="admin" element={<Admin />} />
        <Route path="admin/manage" element={<AdminManage/>} />
        <Route path='admin/statistic' element={<Statistic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
