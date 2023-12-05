import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import AdminRoute from "./components/AdminRoute";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import OrderListScreen from './Screens/Admin/OrderListScreen';
import ProductListScreen from "./Screens/Admin/ProductListScreen";
import ProductEditScreen from "./Screens/Admin/ProductEditScreen";
import UserListScreen from "./Screens/Admin/UserListScreen";
import UserEditScreen from "./Screens/Admin/UserEditScreen";
import {HelmetProvider} from 'react-helmet-async'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route  path="/search/:keyword" element={<HomeScreen />} />
      <Route  path="/page/:pageNumber" element={<HomeScreen />} />
      <Route  path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
        <Route path="/admin/productlist" element={<ProductListScreen/>}/>
        <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen/>}/>
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
        <Route path="/admin/userlist" element={<UserListScreen/>}/>
        <Route path="/admin/user/:id/edit" element={<UserEditScreen/>}/>
        
      </Route>
        
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
