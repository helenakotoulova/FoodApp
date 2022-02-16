import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({
  loggedIn: false,
  token: "",
  login: (token) => {},
  logout: () => {},
});

let logoutTimer2;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expirationTimeInMs = new Date(expirationTime).getTime();
  const remainingTime = expirationTimeInMs - currentTime;
  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationTime);
  if (remainingTime < 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  } else {
    return {
      token: storedToken,
      remainingTime,
    };
  }
};

const AuthProvider = ({children}) => {
  let initialToken;
  const tokenData = retrieveStoredToken();
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const isLoggedIn = !!token;

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer2 = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    if (logoutTimer2) {
      clearTimeout(logoutTimer2);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      logoutTimer2=setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [logoutHandler, tokenData]);

  const context = {
    loggedIn: isLoggedIn,
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
