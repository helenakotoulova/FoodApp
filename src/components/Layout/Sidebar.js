import { useContext } from "react";
import classes from "./Sidebar.module.css";
import { SideBarContext } from "../../store/sidebar-context";
import { Link } from "react-router-dom";
import { FaTimes} from "react-icons/fa";
import HeaderCartButton from "./HeaderCartButton";
import { AuthContext } from "../../store/auth-context";

const SideBar = (props) => {
  const { closeSidebar, sideBarOpen } = useContext(SideBarContext);
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.loggedIn;

  return (
    <>
      {sideBarOpen && (
        <div className={classes.sidebarWrapper} onClick={closeSidebar}>
          <section className={classes.sidebar}>
            <div className={classes.intro}>
              <Link to="/" className={classes.logo}>
                <h1>Foodie</h1>
              </Link>
              <FaTimes className={classes.buttonClose} onClick={closeSidebar} />
            </div>
            <ul className={classes.ul}>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              {!loggedIn && (
                <li>
                  <Link to="/auth">Login</Link>
                </li>
              )}
              {loggedIn && (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              )}
            </ul>
            <div className={classes.icons}>
              <HeaderCartButton
                onShowCart={props.onShowCart}
                className={classes.headerCartButton}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SideBar;
