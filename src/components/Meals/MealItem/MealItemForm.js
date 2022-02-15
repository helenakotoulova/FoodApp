import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef } from "react";
import { useState } from "react";

function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber); // vyhodnotime to v MealItemu.
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {!amountIsValid && <p>Please, enter a valid amount (1-5)!</p>}
    </form>
  );
}
export default MealItemForm;

/*
Ten nas Input je nas custom component a nezna tedy atribut ref.
proto v Input.js pridame do inputu ref={ref} (tzn tady to pak pouzivame jako ref={..}) a
navic musime v Input.js pridat React.forwardRef((props,ref) => {
  return...
        <input ref={ref}
});
Takhle bude ref fungovat i na nasi custom komponente - pomoci forwardRef.

DALSI DULEZITE POZN: TEN CURRENT.VALUE VZDYCKY OUTPUTUJE STRING! I KDYZ MAME TREBA TYPE='NUMBER'.
Proto pridame tento radek: const enteredAmountNumber= +enteredAmount; Takhle prevedu string na number, pokud uz je string ve formatu cisla.

*/
