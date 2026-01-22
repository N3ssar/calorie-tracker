import { type IRecord } from "../../App";
import { useAppContext } from "../../AppContext";
import Record from "./Record";
import styles from "./RecordList.module.css";
import { useEffect, type ChangeEvent } from "react";

interface RecordListProps {
  recordList: IRecord[];
}

const dateFilter = (recordDate: string, selectedDate: string) => {
  const record = new Date(recordDate);
  const selected = new Date(selectedDate);

  return (
    record.getFullYear() === selected.getFullYear() &&
    record.getMonth() === selected.getMonth() &&
    record.getDate() === selected.getDate()
  );
};

function RecordList({ recordList }: RecordListProps) {
  const { totalCalories, setTotalCalories, day, setDay } = useAppContext();
  const onChangeDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
  };

  const recordToRender = recordList?.filter((r) => {
    return dateFilter(r.date, day);
  });
  useEffect(() => {
    const total = recordToRender.reduce((acc, record) => {
      return acc + +record.calories;
    }, 0);
    setTotalCalories(total);
  }, [recordToRender, setTotalCalories]);

  if (!recordList || recordList.length === 0) {
    return (
      <section
        className={`${styles.recordList} ${styles["record-list--empty"]}`}
      >
        <p>No calorie records found. Add some using the form modal!</p>
      </section>
    );
  }

  return (
    <section className={styles.recordList}>
      <div className={styles.datePicker}>
        <label htmlFor="date-picker">Select a date:</label>
        <input
          type="date"
          id="date-picker"
          value={day}
          onChange={onChangeDateHandler}
        />
      </div>

      <header className={styles.recordListHeader}>
        <span className={styles.headerDate}>Date</span>
        <span className={styles.headerMeal}>Meal</span>
        <span className={styles.headerFood}>Content</span>
        <span className={styles.headerCalories}>Calories</span>
      </header>

      {recordToRender.length === 0 ? (
        <p>No records exist for this date, please select another date!</p>
      ) : (
        recordToRender.map((record) => {
          return (
            <Record
              key={record.id}
              date={record.date}
              meal={record.meal}
              food={record.food}
              calories={record.calories}
            />
          );
        })
      )}
      <p>Total Calories: {totalCalories}</p>
    </section>
  );
}

export default RecordList;
