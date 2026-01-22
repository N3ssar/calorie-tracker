import StyledRecordCell from "../../Common/StyledRecordCell";
import styles from "./DateRecord.module.css";

interface IDateRecordProps {
  date: Date | string;
}
function DateRecord({ date }: IDateRecordProps) {
  const validDate = date instanceof Date ? date : new Date(date);

  const day = validDate.getDate();
  const month = validDate.toLocaleString("en-Us", { month: "short" });
  const year = validDate.getFullYear();
  return (
    <StyledRecordCell className={styles.dateRecord}>
      <span className={styles.day}>{day}</span>
      <span className={styles.month}>{month}</span>
      <span className={styles.year}>{year}</span>
    </StyledRecordCell>
  );
}

export default DateRecord;
