import { createContext, useContext } from "react";
import { IExpensContextProvider, IGasto } from "../interfaces";
import { supabase } from "@/utils/supabase";
import * as React from "react";

export const ExpenseContext = createContext<IExpensContextProvider>({
  addExpense: () => {},
  deleteExpense: () => {},
  expenses: [],
});

export const ExpenseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = React.useState([]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("gastos").select("*");
      if (error) {
        throw error;
      }
      setExpenses(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  const addExpense = async (expense: IGasto) => {
    const { id, fecha, ...expenseParsed } = expense;
    const { error } = await supabase.from("expenses").insert([expenseParsed]);

    if (error) {
      throw error;
    }
    fetchData();
  };
  const deleteExpense = () => {
    console.log("deleteExpense");
  };
  return (
    <ExpenseContext.Provider
      value={{
        addExpense,
        deleteExpense,
        expenses,
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
