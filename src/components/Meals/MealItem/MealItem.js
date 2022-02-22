import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import {CartContext} from "../../../store/cart-context";
import { useContext, useState } from "react";
import {Link} from 'react-router-dom';

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`; 
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: props.id,
      name:props.name,
      amount:amount,
      price:props.price, 
    });
  }

  const btnHighlihtHandler = () => {
    setBtnIsHighlighted(true);
    setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
  };
  const btnClasses = `${btnIsHighlighted ? classes.bump : ""}`;

  return (
    <li className={classes.meal}>
      <Link to={`/meals/${props.id}`} className={`${btnClasses}`} onMouseOver={btnHighlihtHandler}>
        <h3 className={`${classes.title} ${btnClasses}`} onMouseOver={btnHighlihtHandler}>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </Link>
      <div>
          <MealItemForm id={props.id} onAddToCart={addToCartHandler} className={classes.form}/>
      </div>
    </li>
  );
}

export default MealItem;
