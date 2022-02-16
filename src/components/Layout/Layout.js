import { Fragment, useState } from "react";
import Cart from "../Cart/Cart";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./Layout.module.css";
import SideBar from "./Sidebar";

const Layout = ({ children }) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  function showCartHandler() {
    setCartIsShown(true);
  }

  function hideCartHandler() {
    setCartIsShown(false);
  }

  return (
    <Fragment>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <SideBar onShowCart={showCartHandler} />
      <main className={classes.main}>{children}</main>
      <Footer />
    </Fragment>
  );
};
export default Layout;
