import createSafeContext from "./hooks/useSafeContext";

type AppContextType = {
  totalCalories: number;
  setTotalCalories: React.Dispatch<React.SetStateAction<number>>;
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
};
export const [AppContext, useAppContext] = createSafeContext<AppContextType>();
