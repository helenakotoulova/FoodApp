import { useContext, useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [signIn, setSignIn] = useState(true);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const createAccountHandler = () => {
    setSignIn(false);
  };
  const signInHandler = () => {
    setSignIn(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;
    if (signIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxmvyBuHe4828tG3rAPYRC29gkB4zwDeg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxmvyBuHe4828tG3rAPYRC29gkB4zwDeg";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const btnHighlihtHandler = () => {
    setBtnIsHighlighted(true);
    setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
  };

  const btnClasses = `${btnIsHighlighted ? classes.bump : ""}`;

  return (
    <section className={classes.section}>
      {error && <div className={classes.alert}>{error}</div>}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.actions}>
          <button
            type="button"
            className={`${classes.firstButton} ${
              signIn ? classes.activeButton : ""
            }`}
            onClick={signInHandler}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`${classes.secondButton} ${
              signIn === false ? classes.activeButton : ""
            }`}
            onClick={createAccountHandler}
          >
            Create Account
          </button>
        </div>
        <h1>Login Form</h1>
        <div className={classes.control}>
          <label htmlFor="emai2l">Email</label>
          <input id="email2" type="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password2">Password</label>
          <input type="password" id="password2" ref={passwordInputRef} />
          <a href="/" className={classes.link}>
            Forgot pasword?
          </a>
        </div>
        <div className={classes.submit}>
          {isLoading && <p>Sending request...</p>}
          {!isLoading && (
            <button
              className={btnClasses}
              onMouseOver={btnHighlihtHandler}
              type="submit"
            >
              {signIn ? "Login" : "Create new account"}
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

/*
const sendData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-type": "application/json" },
        });
        if (!response.ok) {
          const data = await response.json();
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
        const data = await response.json();
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.token, expirationTime.toString());
        console.log(authCtx.loggedIn)
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendData();
*/
