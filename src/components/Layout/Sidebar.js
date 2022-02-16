import { useContext } from "react";
import classes from "./Sidebar.module.css";
import { SideBarContext } from "../../store/sidebar-context";
import { Link } from "react-router-dom";
import { FaTimes, FaUserPlus, FaUserMinus,} from "react-icons/fa";
import HeaderCartButton from "./HeaderCartButton";
import { AuthContext } from "../../store/auth-context";

const SideBar = (props) => {
  const { closeSidebar, sideBarOpen } = useContext(SideBarContext);
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.loggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    // redirect user
  };

  return (
    <>
      {sideBarOpen && (
        <div className={classes.sidebarWrapper} onClick={closeSidebar}>
          <section className={classes.sidebar}>
            <Link to="/" className={classes.logo}>
              <h1>Foodie</h1>
            </Link>
            <FaTimes className={classes.buttonSideBar} onClick={closeSidebar} />
            <ul className={classes.ul}>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              {loggedIn && (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              )}
            </ul>
            <div className={classes.icons}>
              <HeaderCartButton onShowCart={props.onShowCart} />
              {!loggedIn && (
                <Link to="/auth" className={classes.login}>
                  <FaUserPlus />
                </Link>
              )}
              {loggedIn && (
                <FaUserMinus
                  className={classes.login}
                  onClick={logoutHandler}
                />
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SideBar;

/*
<>
      {sideBarOpen && (
        <div className={classes.sidebarWrapper} onClick={closeSidebar}>
          <section className={classes.sidebar}>
              <div>
                  <h4>Foodie</h4>
                  <FaTimes onClick={closeSidebar}/>
              </div>
            <ul className={classes.ul}>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/auth">Login</Link>
              </li>
            </ul>
          </section>
        </div>
      )}
    </>
*/
