import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;

/*
To {...props input} nam zaruci, ze kdyz pak nekde v applikaci
muzeme pridat do inputu napr. type='text'.
Jedna z tech vlasnosti bude input.id
*/
