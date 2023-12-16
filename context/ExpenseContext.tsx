import { createContext, useContext } from "react";
import { IExpensContextProvider, IGasto } from "../interfaces";
import { supabase } from "@/utils/supabase";
import * as React from "react";
import { NotificationContext } from "./NotificationContext";

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
  const { showNotification } = useContext(NotificationContext);

  const fetchData = async () => {
    try {
      const { data } = await supabase.from("gastos").select("*");
      setExpenses(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      showNotification({
        title: "Error al obtener gastos",
        alertStatus: "error",
      });
      return;
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const addExpense = async (expense: IGasto) => {
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      const newData = {
        ...expense,
        user_id: userId,
      };
      await supabase.from("gastos_expense").insert(newData);
    } catch (error) {
      showNotification({
        title: "Error al agregar gasto",
        alertStatus: "error",
      });
      return;
    }
  };
  const updateExpense = async (expense: IGasto) => {
    try {
      const { id, fecha, ...expenseParsedForUpdate } = expense;
      await supabase
        .from("gastos_expense")
        .update(expenseParsedForUpdate)
        .eq("id", id);
    } catch (error) {
      showNotification({
        title: "Error al actualizar gasto",
        alertStatus: "error",
      });
      return;
    }
    showNotification({
      title: "Gasto actualizado",
      alertStatus: "success",
    });
  };
  const deleteExpense = async (id: string) => {
    try {
      await supabase.from("gastos_expense").delete().eq("id", id);
    } catch (error) {
      showNotification({
        title: "Error al eliminar gasto",
        alertStatus: "error",
      });
      return;
    }
    showNotification({
      title: "Gasto eliminado",
      alertStatus: "success",
    });
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
