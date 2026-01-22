import { useReducer, type ChangeEvent, type FormEvent } from "react";
import { type IRecord } from "../../App";
import styles from "./AddRecord.module.css";
import { useAppContext } from "../../AppContext";

interface IAddRecordProps {
  onSubmit: (record: IRecord) => void;
  toggleModal: () => void;
}
interface IFormState {
  id: string;
  meal: string;
  food: string;
  calories: number | string;
  error: string | null;
  loading: boolean;
}
const DEFAULT_VALUES: IFormState = {
  id: "",
  meal: "Breakfast",
  food: "",
  calories: "",
  error: "",
  loading: false
};

type FormActions =
  | { type: "CHANGE_FIELD"; field: keyof IFormState; payload: string | number }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "RESET_FORM" };

function formReducer(state: IFormState, action: FormActions) {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        [action.field]: action.payload
      };
    case "SUBMIT_START":
      return {
        ...state,
        error: null,
        loading: true
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "RESET_FORM":
      return DEFAULT_VALUES;
    default:
      return state;
  }
}
function AddRecord({ onSubmit, toggleModal }: IAddRecordProps) {
  const [formState, dispatch] = useReducer(formReducer, DEFAULT_VALUES);
  const { error, loading, meal, food, calories } = formState;
  const { totalCalories, day, setDay } = useAppContext();

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!day && !food && !calories) {
      dispatch({ type: "SUBMIT_ERROR", payload: "All fields are required!" });
      return;
    }
    if (!day) {
      dispatch({ type: "SUBMIT_ERROR", payload: "Date is required!" });
      return;
    }
    if (meal === "Sport" && +calories >= 0) {
      dispatch({
        type: "SUBMIT_ERROR",
        payload: "Sport activities should burn calories,must be negative!"
      });
      return;
    }
    if (meal !== "Sport" && +calories < 0) {
      dispatch({
        type: "SUBMIT_ERROR",
        payload: "Calories should be greater than or equal 0!"
      });
      return;
    }
    if (!food) {
      dispatch({ type: "SUBMIT_ERROR", payload: "Food is required!" });
      return;
    }
    if (!calories) {
      dispatch({ type: "SUBMIT_ERROR", payload: "Calories is required!" });
      return;
    }
    dispatch({ type: "SUBMIT_START" });

    setTimeout(() => {
      onSubmit({
        ...formState,
        date: day,
        id: crypto.randomUUID()
      });
      dispatch({ type: "RESET_FORM" });
    }, 1500);
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "date") {
      setDay(value);
    }
    dispatch({
      type: "CHANGE_FIELD",
      field: name as keyof IFormState,
      payload: value
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      {/* Calories Summary */}
      <div
        className={`${styles.summary} ${
          totalCalories > 0
            ? styles.positive
            : totalCalories < 0
              ? styles.negative
              : styles.neutral
        }`}
      >
        <span className={styles.summaryIcon}>
          {totalCalories > 0 ? "🍔" : totalCalories < 0 ? "🏃‍♂️" : "⚖️"}
        </span>
        <div>
          <small>Day Summary </small>
          <strong>{Math.abs(totalCalories)} kcal</strong>
        </div>
      </div>
      <h2 className={styles.title}>Add Calorie Record</h2>

      {/* Inputs */}
      <div className={styles.grid}>
        <div>
          <label>Date</label>
          <input
            className={styles.dateInput}
            type="date"
            name="date"
            value={day}
            onChange={onChangeHandler}
            disabled={loading}
          />
        </div>

        <div>
          <label>Meal</label>
          <select
            name="meal"
            value={meal}
            onChange={onChangeHandler}
            disabled={loading}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
            <option>Sport</option>
          </select>
        </div>

        <div>
          <label>Food</label>
          <input
            type="text"
            name="food"
            placeholder="e.g. Chicken & Rice"
            value={food}
            onChange={onChangeHandler}
            disabled={loading}
          />
        </div>

        <div>
          <label>Calories</label>
          <input
            type="number"
            name="calories"
            placeholder="kcal"
            value={calories}
            onChange={onChangeHandler}
            disabled={loading}
          />
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {/* Actions */}
      <div className={styles.actions}>
        <button type="button" onClick={toggleModal} className={styles.cancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submit} disabled={loading}>
          Add Record
        </button>
      </div>
    </form>
  );
}
export default AddRecord;
