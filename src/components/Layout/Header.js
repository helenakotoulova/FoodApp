import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { FaUserPlus, FaUserMinus, FaBars } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import {SideBarContext} from "../../store/sidebar-context";

function Header(props) {
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.loggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    // redirect user
  };
  const { openSidebar } = useContext(SideBarContext);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <Link to="/" className={classes.logo}>
            <h1>Foodie</h1>
          </Link>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                About Us
              </NavLink>
            </li>
            {loggedIn && (
              <li>
                <NavLink
                  to="/profile"
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                >
                  Profile
                </NavLink>
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
              <FaUserMinus className={classes.login} onClick={logoutHandler} />
            )}
          </div>
          <div className={classes.buttonSideBar}>
            <FaBars onClick={openSidebar}/>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}
export default Header;

/*
Tak jak mam nadefinovany ten zdroj (src) obrazku je LOCAL
pokdu bych mela url, tak takhle: // src='https://...'
To alt je pro nevidome. Precte to ten text
*/
