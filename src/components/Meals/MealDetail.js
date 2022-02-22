import { FIREBASE_DOMAIN } from "../../lib/url";
import { useState, useEffect, useContext, useCallback } from "react";
import classes from "./MealDetail.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import {CartContext} from "../../store/cart-context";
import MealItemForm from './MealItem/MealItemForm';
import LoadingSpinner from "../UI/LoadingSpinner";

const MealDetail = () => {
  const params = useParams();
  const mealId = params.mealId;
  const [meal, setMeal] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartCtx = useContext(CartContext);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/meals/${mealId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedMeal = {
        ...data,
      };
      setMeal(loadedMeal);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  },[mealId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <p>{error}</p>;
  }


  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: meal.id,
      name:meal.name,
      amount:amount,
      price:meal.price, 
    });
  }

  return (
    <section className={classes.summary}>
      <img src={meal.image} alt={meal.name} className={classes.img} />
      <article className={classes.main}>
        <div className={classes.info}>
          <div className="title">
            <h2>{meal.name}</h2>
            <div className={classes.underline}></div>
          </div>
          <p className={classes.subInfo}>
            <span className={classes.span}>Description: </span>
            {meal.longerDesc}
          </p>
          <p className={classes.subInfo}>
            <span className={classes.span}>Price: </span>${meal.price}
          </p>
          <div className={classes.formContainer}>
            <MealItemForm id={meal.id} onAddToCart={addToCartHandler}  className={classes.form}/>
          </div>
          <Link to="/" className={classes.button}>
            Back to Shop
          </Link>
        </div>
      </article>
    </section>
  );
};
export default MealDetail;
