import { React, useEffect } from 'react'

import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { LoginPage, ShopLoginPage, SellerActivationPage, ShopCreatePage, CheckoutPage, SignupPage, ActivationPage, ProfilePage, BestSellingPage, EventsPage, ProductDetailsPage, HomePage, FAQPage, ProductsPage } from './routes/Routes.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/user';
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import { ShopCreateEvents, ShopAllProducts, ShopDashboardPage, ShopCreateProduct } from "./routes/ShopRoutes.js"

const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

  }, []);
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />

        <Route path="/profile" element={
          <ProtectedRoute >
            <ProfilePage></ProfilePage>
          </ProtectedRoute>
        }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute >
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute  >
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute  >
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />

        <Route
        path="/dashboard-products"
        element={
          <SellerProtectedRoute>
            <ShopAllProducts />
          </SellerProtectedRoute>
        }
      />

      <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />

        <Route path="/shop-create" element={<ShopCreatePage />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
