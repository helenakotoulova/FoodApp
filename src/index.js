import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CartProvider from "./store/cart-context";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";
import SideBarProvider from "./store/sidebar-context";

ReactDOM.render(
  <AuthContextProvider>
    <CartProvider>
      <SideBarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SideBarProvider>
    </CartProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
