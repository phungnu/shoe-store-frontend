import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './conponents/screen/home/index';
import Cart from './conponents/screen/cart/index';
import ShoeInfo from './conponents/screen/shoe_info/index';
import Admin from './conponents/screen/admin-login/index';
import AdminManage from './conponents/screen/admin-manage/index';
import Statistic from './conponents/screen/admin-manage/statistic/index';
import SecuredRoute from './conponents/util/SecuredRoute';
import Footer from './conponents/screen/footer';
import Header from "./conponents/util/Header";
import Order from './conponents/screen/order';

import React, { useRef, useState } from "react";

function App() {

  const [searchText, setSearchText] = useState('');
  const shoeContainerRef = useRef(null);

  return (
    <BrowserRouter>
      <Header page={'home'} setSearchText={setSearchText}/>
      <div className='container-content'>
      <Routes>
          <Route path="/" element={<Home  searchText={searchText} shoeContainerRef={shoeContainerRef} />} />
          <Route path="home" element={<Home searchText={searchText} shoeContainerRef={shoeContainerRef}/>} />
          <Route path="cart" element={<Cart />} />
          <Route path="shoe-info" element={<ShoeInfo />} />
          <Route path="admin" element={<Admin />} />
          <Route path="order" element={<Order />} />
          <Route path="admin/manage" element={ <SecuredRoute> <AdminManage/> </SecuredRoute> } />
          <Route path="admin/statistic" element={ <SecuredRoute> <Statistic/> </SecuredRoute> } />
      </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
