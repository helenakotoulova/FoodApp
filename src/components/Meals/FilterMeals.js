import { useEffect, useState } from "react";
import classes from "./FilterMeals.module.css";

const FilterMeals = ({ meals, filteredMeals, onAddFilter, reset }) => {
  //const [mealsForFilter, setMealsForFilter] = useState(meals);
  const prices = meals.map((meal) => meal.price);
  const categories = ["all", ...new Set(meals.map((meal) => meal.category))];
  //const [max, setMax] = useState(Math.max(...prices));
  //const [min, setMin] = useState(Math.min(...prices));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const [price, setPrice] = useState(100);
  const [label, setLabel] = useState("all");

  useEffect(() => {
    if (reset) {
      reset = false;
      setPrice(max);
      setLabel("all");
    }  
    const filter = {
      price: price,
      category: label,
    };
    onAddFilter(filter);
  }, [price, label, onAddFilter,reset]);
  /*
  useEffect(() => {
    setMax(Math.max(...prices));
    setMin(Math.min(...prices));
  }, [prices]);

  useEffect(() => {
    setMealsForFilter(filteredMeals);
  }, [filteredMeals]);
*/
  const newPos = Number(((price - min) * 100) / (max - min));
  //`calc(${newPos}% -40px)`
/*
  if (reset) {
    reset = false;
    setPrice(100);
    setLabel("all");
  }
*/
  return (
    <section className={classes.section}>
      <h3>Filters</h3>
      <div className={classes.sliderActions}>
        <label htmlFor="price">Filter by price:</label>
        <div className={classes.input}>
          <output
            className={classes.bubble}
            style={{ left: `calc(${newPos}% + (${8 - newPos * 0.15}px))` }}
          >
            {price}
          </output>
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
      </div>
      <div className={classes.labelActions}>
        <label>Choose by label:</label>
        <div className={classes.buttonGroup}>
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
