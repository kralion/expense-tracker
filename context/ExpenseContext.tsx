import { createContext, useContext } from "react";
import { IExpensContextProvider, IGasto } from "../interfaces";
import { supabase } from "@/utils/supabase";
import * as React from "react";
import { NotificationsContext } from "./NotificationsContext";

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
  const { showNotification } = useContext(NotificationsContext);

  const fetchData = async () => {
    try {
      const { data } = await supabase.from("gastos").select("*");
      setExpenses(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      showNotification({
        title: "Error al obtener gastos",
        alertStatus: "error",
      });
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
      showNotification({
        title: "Gasto agregado",
        alertStatus: "success",
      });
    } catch (error) {
      showNotification({
        title: "Error al agregar gasto",
        alertStatus: "error",
      });

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
      showNotification({
        title: "Gasto actualizado",
        alertStatus: "success",
      });
    } catch (error) {
      showNotification({
        title: "Error al actualizar gasto",
        alertStatus: "error",
      });
      console.error("Error updating expense:", error);
    }
  };
  const deleteExpense = async ({ id }: IGasto) => {
    try {
      await supabase.from("expenses").delete().eq("id", id);
      fetchData();
      showNotification({
        title: "Gasto eliminado",
        alertStatus: "success",
      });
    } catch (error) {
      showNotification({
        title: "Error al eliminar gasto",
        alertStatus: "error",
      });
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
