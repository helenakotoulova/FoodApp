import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://auth-2-e197c-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        const loadedMeal = {
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
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
      {meals.map((meal) => (
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

  return (
    <section className={classes.meals}>
      <Card>{mealList}</Card>
    </section>
  );
}

export default AvailableMeals;

/*
POZN:
Nemuzu zapsat useEffect(async() => {
  await fetch()
})
*/

/*
PUVODNI VERZE TRY/CATCH:
try {
      fetchMeals();
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
*/

/*
Pozor! Mela jsem to takhle:
<ul>
            {DUMMY_MEALS.map((meal)=> {
                <li key={meal.id}>
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                    <p>{meal.price}</p>
                </li>
            })}
        </ul>

Byly tam navic ty slozene zavorky za tou sipkou. 
Psalo to, ze Array.prototype.map() expects a return value from arrow function 
*/
/* 
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];*/
