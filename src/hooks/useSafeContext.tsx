import { createContext, useContext } from "react";

function createSafeContext<T>() {
  const context = createContext<T | undefined>(undefined);

  const useSafeContext = () => {
    const value = useContext(context);
    if (!value) {
      throw new Error("Context must be used within its Provider");
    }

    return value;
  };

  return [context, useSafeContext] as const;
}

export default createSafeContext;
