import { useEffect, useState } from "react";
import classes from "./FilterMeals.module.css";

const FilterMeals = ({ meals, onAddFilter }) => {
  const prices = meals.map((meal) => meal.price);
  const categories = ["all", ...new Set(meals.map((meal) => meal.category))];
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const [price, setPrice] = useState(max);
  const [label, setLabel] = useState("all");

  useEffect(() => {
    const filter = {
      price: price,
      category: label,
    };
    onAddFilter(filter);
  }, [price, label, max, onAddFilter]);

  return (
    <section className={classes.section}>
      <h3>Filters</h3>
      <div className={classes.sliderActions}>
        <label htmlFor="price">Filter by price:</label>
        <div className={classes.input}>
          <output className={classes.bubble}>{price}</output>
          <input
            id="price"
            type="range"
            min={min}
            max={max}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={classes.slider}
          />
          <ul className={classes.list}>
            <li>{min}$</li>
            <li>{max}$</li>
          </ul>
        </div>
        <span>
          Price range: {min} - {price}$
        </span>
      </div>
      <div className={classes.labelActions}>
        <label>Choose by label:</label>
        <div>
          {categories.map((category, categoryIndex) => (
            <button
              key={categoryIndex}
              className={`${classes.button} ${
                label === category ? classes.active : ""
              }`}
              value={category}
              onClick={(e) => setLabel(e.target.value)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterMeals;
