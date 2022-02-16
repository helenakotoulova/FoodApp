import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import {CartContext} from "../../store/cart-context";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const { items } = cartCtx; // destructuring
  const [btnIsHighlighted, setBtnIsHighlited] = useState(false);

  useEffect(() => {
    if (items.length === 0) { // tohle jsou ty items destructured from cartCtx
      return;
    }
    setBtnIsHighlited(true); // takhle to ale vzdy zustane na true. proto pridame timer.
    const timer = setTimeout(() => {
      setBtnIsHighlited(false); // po 300 ms (coz je doba toho bump nadefinovanem v module.css). se to nastavi zpet na false.
    }, 300);

    // pridame jeste clean up funkci.
    return () => {
      clearTimeout(timer);
    };
  }, [items]); // useEffect probehne kdyz se zmeni items z cartCtx.

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;

/*
V tom badge chceme zobrazovat celkove mnozstvi jidel. Ale nemuzeme udelat jen cartCtx.items.length,
protoze max length tech items bude rovna 4 (mame ctyri ruzna jidla). Co se meni u tech polozek je amount. 
Ale davat cartCtx.items.amount nejde. kazda item ma svoje amount. Proto to udelame pres to reduce.
Na kazdou polozku tech items posleme reducer, ktery nam poscita celkove mnozstvi. curNumber je initially 0.
*/
