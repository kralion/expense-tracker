import { createContext, useContext } from "react";
import { IExpenseContextProvider, IGasto } from "../interfaces";
import { supabase } from "@/utils/supabase";
import * as React from "react";
import { NotificationContext } from "./NotificationContext";
import useAuth from "./AuthContext";

export const ExpenseContext = createContext<IExpenseContextProvider>({
  addExpense: () => {},
  deleteExpenseById: () => {},
  expenses: [],
  updateExpense: () => {},
  getSingleExpense: async (id: string) => null,
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
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("session_id", session_id)
        .order("fecha", { ascending: false });

      if (error) {
        throw error;
      }

      setExpenses(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error("Error al obtener gastos:", error);
      showNotification({
        title: "Error al obtener gastos",
        alertStatus: "error",
      });
    }
  };
  React.useEffect(() => {
    if (session) {
      fetchData(session.user.id);
    }
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

  const getSingleExpense = async (id: string): Promise<IGasto | null> => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      showNotification({
        title: "Error al obtener gasto",
        alertStatus: "error",
      });
      return null;
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
  async function deleteExpenseById(id: string) {
    try {
      const { error } = await supabase.from("expenses").delete().eq("id", id);
      if (error) throw error;
    } catch (error) {
      showNotification({
        title: "Error al eliminar gasto",
        alertStatus: "error",
      });
    }
  }
  return (
    <ExpenseContext.Provider
      value={{
        addExpense,
        deleteExpenseById,
        expenses,
        updateExpense,
        getSingleExpense,
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
