import { useContext, useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { AuthContext } from "../../store/auth-context";
import { useNavigate} from "react-router-dom";
import { WEB_API_KEY} from '../../lib/url';

function isEmpty(value) {
  return value.trim() === "";
}

const AuthForm = () => {
  const [signIn, setSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [formInputsValidity, setFormInputsValidity] = useState({
    email: true,
    password: true,
  });

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

    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    setFormInputsValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

    if (!formIsValid) {
      return;
    }

    let url;
    if (signIn) {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`;
    } else {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`;
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

  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? "" : classes.invalid
  }`;
  const passwordControlClasses = `${classes.control} ${
    formInputsValidity.password ? "" : classes.invalid
  }`;

  let editedErrorMessage;
  if (error) {
    editedErrorMessage = error.replace(/_/g, ' ').toLowerCase();
  }
 
  return (
    <section className={classes.section}>
      {error && <div className={classes.error}>{editedErrorMessage}!</div>}
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
        <div className={emailControlClasses}>
          <label htmlFor="emai2l">Email</label>
          <input id="email2" type="email" ref={emailInputRef} />
          {!formInputsValidity.email && (
            <p className={classes.alert}>Email must not be empty.</p>
          )}
        </div>
        <div className={passwordControlClasses}>
          <label htmlFor="password2">Password</label>
          <input type="password" id="password2" ref={passwordInputRef} />
          {!formInputsValidity.password && (
            <p className={classes.alert}>Password must not be empty.</p>
          )}
          <a href="/" className={classes.link}>
            Forgot pasword?
          </a>
        </div>
        <div className={classes.submit}>
          {isLoading && <p>Sending request...</p>}
          {!isLoading && (
            <button
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
