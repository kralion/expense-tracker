import { createContext, useContext } from "react";
import { IExpensContextProvider } from "../interfaces";

export const ExpenseContext = createContext<IExpensContextProvider>({
  hello: "HelloWorld",
  addExpense: () => {},
  deleteExpense: () => {},
  children: null,
});

export const ExpenseProvider = ({ children }: IExpensContextProvider) => {
  const hello = "HelloWorld";
  const addExpense = () => {};
  const deleteExpense = () => {};
  return (
    <ExpenseContext.Provider
      value={{
        addExpense,
        deleteExpense,
        hello,
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
