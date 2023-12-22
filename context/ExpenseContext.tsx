import { createContext, useContext } from "react";
import { IExpenseContextProvider, IGasto } from "../interfaces";
import { supabase } from "@/utils/supabase";
import * as React from "react";
import { NotificationContext } from "./NotificationContext";
import useAuth from "./AuthContext";
import { router } from "expo-router";
import { startOfMonth, endOfMonth, formatISO } from "date-fns";

export const ExpenseContext = createContext<IExpenseContextProvider>({
  addExpense: () => {},
  deleteExpenseById: () => {},
  expenses: [],
  updateExpense: () => {},
  getSingleExpense: async (id: string): Promise<IGasto | null> => {
    return null;
  },
  sumOfAllOfExpensesMonthly: async () => 0,
  getTopExpenses: async (): Promise<IGasto[]> => [],
  fetchData: async (session_id: string) => {},
});

export const ExpenseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = React.useState<IGasto[]>([]);
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
  }, [session, expenses]);

  const addExpense = async (expense: IGasto) => {
    try {
      const { error } = await supabase.from("expenses").insert(expense);
      if (session) {
        fetchData(session.user.id);
      }
      if (error) {
        showNotification({
          title: "Error al agregar gasto",
          alertStatus: "error",
        });
      }
    } catch (error) {
      showNotification({
        title: "Error al agregar gasto",
        alertStatus: "error",
      });
      return;
    } finally {
      router.push("/(tabs)/");
    }
  };
  async function getSingleExpense(id: string): Promise<IGasto | null> {
    if (!session?.user?.id) {
      throw new Error("La sesión o el ID de usuario no están definidos");
    }

    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("session_id", session.user.id)
        .eq("id", id);

      if (error) throw error;
      if (data.length === 0) return null;

      console.log("Datos del Gasto", JSON.stringify(data));
      return data[0];
    } catch (error) {
      console.error("Error al obtener gasto:", error);
      showNotification({
        title: "Error al obtener gasto",
        alertStatus: "error",
      });
      return null;
    }
  }

  async function sumOfAllOfExpensesMonthly() {
    const now = new Date();
    const startOfThisMonth = formatISO(startOfMonth(now), {
      representation: "date",
    });
    const endOfThisMonth = formatISO(endOfMonth(now), {
      representation: "date",
    });

    try {
      const { data } = await supabase
        .from("expenses")
        .select("monto")
        .eq("session_id", session?.user.id)
        .gte("fecha", startOfThisMonth)
        .lte("fecha", endOfThisMonth);

      if (data) {
        const sum = data.reduce(
          (total, expense) => total + Number(expense.monto),
          0
        );
        return sum;
      }
    } catch (error) {
      console.log("Error al obtener gastos", error);
    }

    return 0;
  }

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

  async function getTopExpenses() {
    try {
      const { data: expenses, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("session_id", session?.user.id)
        .limit(10);

      if (error) throw error;

      // Convert 'monto' to number and sort the expenses
      const sortedExpenses = expenses.sort(
        (a, b) => Number(b.monto) - Number(a.monto)
      );

      return sortedExpenses;
    } catch (error) {
      showNotification({
        title: "Error al obtener gastos",
        alertStatus: "error",
      });
      return [];
    }
  }
  return (
    <ExpenseContext.Provider
      value={{
        fetchData,
        addExpense,
        deleteExpenseById,
        sumOfAllOfExpensesMonthly,
        expenses,
        updateExpense,
        getTopExpenses,
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
