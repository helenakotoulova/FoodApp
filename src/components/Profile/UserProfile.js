import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    // redirect user
  };
    return (
      <section>
        <h1>Your User Profile</h1>
        <button onClick={logoutHandler}>Logout</button>
      </section>
    );
  };
  
  export default UserProfile;