import { createContext, useContext } from "react";
import { IExpensContextProvider, IGasto } from "../interfaces";
import { supabase } from "@/utils/supabase";
import * as React from "react";

export const ExpenseContext = createContext<IExpensContextProvider>({
  addExpense: () => {},
  deleteExpense: () => {},
  expenses: [],
  updateExpense: () => {},
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
    try {
      const { id, fecha, ...expenseParsed } = expense;
      await supabase.from("expenses").insert([expenseParsed]);
      fetchData();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
  const updateExpense = async (expense: IGasto) => {
    try {
      const { id, fecha, ...expenseParsedForUpdate } = expense;
      await supabase
        .from("expenses")
        .update(expenseParsedForUpdate)
        .eq("id", id);
      fetchData();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  const deleteExpense = async ({ id }: IGasto) => {
    try {
      await supabase.from("expenses").delete().eq("id", id);
      fetchData();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  return (
    <ExpenseContext.Provider
      value={{
        addExpense,
        deleteExpense,
        expenses,
        updateExpense,
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
