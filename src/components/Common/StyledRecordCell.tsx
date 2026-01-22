import type { ReactNode } from "react";
import styles from "./StyledRecordCell.module.css";
interface IStyledRecordCellProps {
  children: ReactNode;
  className: string;
}

function StyledRecordCell({ className, children }: IStyledRecordCellProps) {
  const classes = `${styles.styledRecordCell} ${className || ""}`;
  return <div className={classes}>{children}</div>;
}

export default StyledRecordCell;
