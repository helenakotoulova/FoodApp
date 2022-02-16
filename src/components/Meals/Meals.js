import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";
import {Fragment} from 'react';
import meals4Image from "../../assets/meals4.jpg";
import classes from './Meals.module.css';

function Meals() {
  return (
    <Fragment>
      <div className={classes["main-image"]}>
        <img src={meals4Image} alt="A table with food" />
      </div>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
}

export default Meals;
