import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { FaUserPlus, FaUserMinus, FaBars, FaUser } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import { SideBarContext } from "../../store/sidebar-context";
import { useTransition, animated } from "react-spring";

function Header(props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.loggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };
  const { openSidebar } = useContext(SideBarContext);
  const transition = useTransition(loggedIn, {
    from: { transform: "scale(0)", opacity: 0 },
    enter: { transform: "scale(1)", opacity: 1 },
    leave: { transform: "scale(0)", opacity: 0 },
  });

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
            {transition((style, item) =>
              item ? (
                <animated.li style={style}>
                  <NavLink
                    to="/profile"
                    className={(navData) =>
                      navData.isActive ? classes.active : ""
                    }
                  >
                    Profile
                    <FaUser />
                  </NavLink>
                </animated.li>
              ) : (
                ""
              )
            )}
          </ul>
          <div className={classes.icons}>
            <HeaderCartButton onShowCart={props.onShowCart} />
            {transition((style, item) =>
              item ? (
                <animated.li style={style}>
                  <Link to="/profile" className={classes.profile}>
                    <FaUser />
                  </Link>
                </animated.li>
              ) : (
                ""
              )
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
            <FaBars onClick={openSidebar} />
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}
export default Header;
