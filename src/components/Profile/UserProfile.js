import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };
  return (
    <section>
      <h1>Your User Profile</h1>
      <button className={classes.button} onClick={logoutHandler}>Logout</button>
    </section>
  );
};

export default UserProfile;
