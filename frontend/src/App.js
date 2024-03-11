import { React, useEffect } from 'react'
import { useSelector } from 'react-redux'

import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { LoginPage, ShopLoginPage, SellerActivationPage, ShopCreatePage, CheckoutPage, SignupPage, ActivationPage, ProfilePage, BestSellingPage, EventsPage, ProductDetailsPage, HomePage, FAQPage, ProductsPage } from './Routes.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/user';
import ProtectedRoute from "./ProtectedRoute";
import SellerProtectedRoute from "./SellerProtectedRoute";
import { ShopHomePage } from "./ShopRoutes.js";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller} = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

  }, []);
  return (
    <>
      {
        loading || isLoading ? (
          null
        ) : (
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
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage></ProfilePage>
                </ProtectedRoute>
              }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/shop/:id"
                element={
                  <SellerProtectedRoute isSeller={isSeller} >
                    <ShopHomePage />
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
    </>
  )
}

export default App
