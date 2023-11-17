import { createContext, useContext } from "react";
import { IExpensContextProvider } from "../interfaces";

export const ExpenseContext = createContext<IExpensContextProvider>({
  addExpense: () => {},
  deleteExpense: () => {},
  children: null,
});

export const ExpenseProvider = ({ children }: IExpensContextProvider) => {
  const addExpense = () => {};
  const deleteExpense = () => {
    console.log("deleteExpense");
  };
  return (
    <ExpenseContext.Provider
      value={{
        addExpense,
        deleteExpense,
        children,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within a ExpenseProvider");
  }
  return context;
};
