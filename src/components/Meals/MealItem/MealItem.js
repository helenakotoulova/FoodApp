import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import {CartContext} from "../../../store/cart-context";
import { useContext } from "react";

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`; // `` se nazyva template literal.
  //prvni $ tam je proste pro zapsani toho celeho vyrazu a ten 2. $ tam je,
  // aby se mohl pridat dynamicky kontekt do toho template literalu.
  // to toFixed(2) nam zaruci, ze se to vzdycky vypise se dvema des. misty.

  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: props.id,
      name:props.name,
      amount:amount, // tohle je to amount co si bereme z MealItemForm
      price:props.price, // sem chceme aby se zapsalo props.price a ne nase naformatovane const price.
    });
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
