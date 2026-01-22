import StyledRecordCell from "../../Common/StyledRecordCell";
import DateRecord from "../DateRecord";
import styles from "./Record.module.css";
interface RecordProps {
  date: string | Date;
  meal: string;
  food: string;
  calories: number | string;
}

function Record(props: RecordProps) {
  return (
    <div className={styles.record}>
      <div
        className={`${styles.recordCell} ${styles["record-cell--date"]}`}
        data-label="Date"
      >
        <DateRecord date={props.date} />
      </div>
      <div
        className={`${styles.recordCell} ${styles["record-cell--meal"]}`}
        data-label="Meal"
      >
        {props.meal}
      </div>
      <div
        className={`${styles.recordCell} ${styles["record-cell--food"]}`}
        data-label="Content"
      >
        {props.food}
      </div>
      <div
        className={`${styles.recordCell} ${styles["record-cell--calories"]}`}
        data-label="Calories"
      >
        <StyledRecordCell className="">{props.calories} kcal</StyledRecordCell>
      </div>
    </div>
  );
}

export default Record;
