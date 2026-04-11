import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminSignin } from './app/components/AdminPanel/adminregistration/adminSignin';
import { Main } from './app/components/UserPanel/mainpage';
import { ShoppingBag } from './app/components/UserPanel/userComponents/shoppingBag/bag';
import { Favourites } from './app/components/UserPanel/userComponents/favourites/favourites';
import { Newin } from './app/components/UserPanel/userComponents/newin/newin';
import { FindStore } from './app/components/UserPanel/userComponents/findStore/findStore';
import { Customer } from './app/components/UserPanel/userComponents/customerService/customer';
import { FPEmail } from './app/components/UserPanel/registration/forgetPass/email';
import { FPOtp } from './app/components/UserPanel/registration/forgetPass/otpPass';
import { FPresetPass } from './app/components/UserPanel/registration/forgetPass/resetPass';
import { AdminPortal } from './app/components/AdminPanel/adminComponent/adminPortal';
import { CardView } from './app/components/UserPanel/userComponents/cards/cardView/cardView';
import { Toaster } from 'sonner';
import { CartProvider } from './app/services/common_service';
import { OrderList } from './app/components/UserPanel/userComponents/orderList/orderList';

function App() {
  return (
    <CartProvider>
    <Router>
      <Toaster
        position="top-right"
        className='mx-3'
        toastOptions={{
          duration: 2000,
        }}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/adminsignin" element={<AdminSignin />} />
        <Route path="/shoppingbag" element={<ShoppingBag />} />
        <Route path="/offers" element={<Favourites />} />
        <Route path="/newin" element={<Newin />} />
        <Route path="/store-locator" element={<FindStore />} />
        <Route path="/customer-service" element={<Customer />} />
        <Route path="/request-resetpassword" element={<FPEmail />} />
        <Route path="/request-resetpassword/otp" element={<FPOtp />} />
        <Route path="/request-resetpassword/otp/reset-password" element={<FPresetPass />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/product-view/:productId" element={<CardView />} />
        <Route path="/order-list" element={<OrderList />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;

