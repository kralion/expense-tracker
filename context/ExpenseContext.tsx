import { createContext, useContext } from "react";
import { IExpensContextProvider, IGasto } from "../interfaces";
import { supabase } from "@/utils/supabase";
import * as React from "react";
import { NotificationContext } from "./NotificationContext";
import useAuth from "./AuthContext";

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
  const { session } = useAuth();
  const fetchData = async (session_id: string) => {
    try {
      const { data } = await supabase
        .from("expenses")
        .select("*")
        .eq("session_id", session_id)
        .order("fecha", { ascending: false });
      setExpenses(JSON.parse(JSON.stringify(data)));
      console.log(data);
    } catch (error) {
      showNotification({
        title: "Error al obtener gastos",
        alertStatus: "error",
      });
      return;
    }
  };
  React.useEffect(() => {
    if (session) fetchData(session.user.id);
  }, [session]);

  const addExpense = async (expense: IGasto) => {
    try {
      await supabase.from("expenses").insert({
        ...expense,
        session_id: session?.user.id,
      });
      console.log(expense);
      console.log(session?.user.id);
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
        .from("expenses")
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
      await supabase.from("expenses").delete().eq("id", id);
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
