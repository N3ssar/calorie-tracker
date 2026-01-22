import { useState, useMemo } from "react";
import { AppContext } from "./AppContext";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [day, setDay] = useState(getTodayDate());

  const value = useMemo(
    () => ({
      totalCalories,
      setTotalCalories,
      day,
      setDay
    }),
    [totalCalories, day]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
