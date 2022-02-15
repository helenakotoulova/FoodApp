import classes from "./ChooseColor.module.css";
import { useState } from "react";

const ChooseColor = () => {
  const colors = ["red", "yellow", "black", "orange", "green", "white", "blue"];
  const [chosen, setChosen] = useState("");

  const clickHandler = (color) => {
    setChosen(color);
  };
  return (
    <>
      <p>Chosen color: {chosen}</p>
      <label>Choose color</label>
      {colors.map((color) => (
        <button
          key={color}
          className={classes.button}
          onClick={clickHandler.bind(null, color)}
          style={{
            backgroundColor: color,
            border: color === "white" ? "1px solid black" : "",
          }}
        ></button>
      ))}
    </>
  );
};
export default ChooseColor;
