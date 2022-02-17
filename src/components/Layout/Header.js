import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { FaUserPlus, FaUserMinus, FaBars,FaUser } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import {SideBarContext} from "../../store/sidebar-context";

function Header(props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.loggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
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
                  Profile<FaUser />
                </NavLink>
              </li>
            )}
          </ul>
          <div className={classes.icons}>
            <HeaderCartButton onShowCart={props.onShowCart} />
            {loggedIn && (
              <Link to="/profile" className={classes.profile}>
                <FaUser />
              </Link>
            )}
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

