import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState, useCallback } from "react";
import { FIREBASE_DOMAIN } from "../../lib/url";
import FilterMeals from "./FilterMeals";

let initial = true;

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [filteredMeals, setFilteredMeals] = useState(meals);
  const [filter, setFilter] = useState({});
  const [reset, setReset] = useState(false);

  const filterHandler = useCallback((filter) => {
    setFilter(filter);
  }, []);

  const resetHandler = () => {
    setReset(true);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(`${FIREBASE_DOMAIN}/meals.json`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        const loadedMeal = {
          id: key,
          ...data[key],
        };
        loadedMeals.push(loadedMeal);
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []); // tento useEffect bude runovat jen pri loadovani stranky.

  useEffect(() => {
    if (meals.length !== 0 && initial) {
      initial = false;
      setFilteredMeals(meals);
    }
    setFilteredMeals(
      meals.filter(
        (meal) =>
          (meal.category === filter.category || filter.category === "all") &&
          +meal.price <= filter.price
      )
    );
  }, [filter, meals]);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.mealsError}>{httpError}</p>
      </section>
    );
  }

  const mealList = (
    <ul>
      {filteredMeals.map((meal) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          description={meal.description}
          name={meal.name}
          price={meal.price}
        />
      ))}
    </ul>
  );

  if (filteredMeals.length === 0 && !initial) {
    return (
      <section className={classes.meals}>
        <FilterMeals
          meals={meals}
          filteredMeals={filteredMeals}
          onAddFilter={filterHandler}
          reset={reset}
        />
        <p className={classes.noMeal}>Nothing to display!</p>
        <button onClick={resetHandler} className={classes.button}>
          Reset Filters
        </button>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <FilterMeals
        meals={meals}
        filteredMeals={filteredMeals}
        onAddFilter={filterHandler}
        reset={reset}
      />
      <Card>{mealList}</Card>
    </section>
  );
}

export default AvailableMeals;
