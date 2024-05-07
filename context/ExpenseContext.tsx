import { supabase } from "@/utils/supabase";
import { endOfMonth, formatISO, startOfMonth } from "date-fns";
import * as React from "react";
import { createContext, useContext } from "react";
import { IExpenseContextProvider, IGasto } from "../interfaces";
import useAuth from "./AuthContext";

export const ExpenseContext = createContext<IExpenseContextProvider>({
  addExpense: () => {},
  updateExpense: () => {},
  sumOfAllOfExpensesMonthly: async () => 0,
  getExpensesByUser: async (id: string) => [],
  expenses: [],
  getTopExpenses: async (): Promise<IGasto[]> => [],
  getRecentExpenses: async (): Promise<IGasto[]> => [],
  getExpensesByPeriodicity: async (): Promise<IGasto[]> => [],
});

export const ExpenseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = React.useState<IGasto[]>([]);
  const { userData } = useAuth();

  const addExpense = async (expense: IGasto) => {
    await supabase.from("expenses").insert(expense);
  };

  async function getExpensesByUser(usuario_id: string) {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("usuario_id", usuario_id);
    if (error) throw error;
    setExpenses(JSON.parse(JSON.stringify(data)));
    return data;
  }

  async function sumOfAllOfExpensesMonthly() {
    const now = new Date();
    const startOfThisMonth = formatISO(startOfMonth(now), {
      representation: "date",
    });
    const endOfThisMonth = formatISO(endOfMonth(now), {
      representation: "date",
    });

    const { data } = await supabase
      .from("expenses")
      .select("monto")
      .eq("usuario_id", userData.id)
      .gte("fecha", startOfThisMonth)
      .lte("fecha", endOfThisMonth);

    if (data) {
      const sum = data.reduce(
        (total, expense) => total + Number(expense.monto),
        0
      );
      return sum;
    }
    return 0;
  }

  const updateExpense = async (expense: IGasto) => {
    await supabase.from("expenses").update(expense).eq("id", expense.id);
  };

  async function getTopExpenses() {
    const { data: expenses, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("usuario_id", userData.id)
      .order("monto", { ascending: false })
      .limit(15);
    if (!expenses) return [];
    return expenses;
  }
  async function getRecentExpenses() {
    const { data: expenses, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("usuario_id", userData.id)
      .order("fecha", { ascending: false })
      .limit(15);
    if (!expenses) return [];
    return expenses;
  }
  async function getExpensesByPeriodicity() {
    const { data: expenses, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("usuario_id", userData.id)
      .eq("periodicidad", true)
      .limit(15);
    if (!expenses) return [];
    return expenses;
  }
  return (
    <ExpenseContext.Provider
      value={{
        getExpensesByUser,
        expenses,

        addExpense,
        sumOfAllOfExpensesMonthly,
        updateExpense,
        getTopExpenses,
        getRecentExpenses,
        getExpensesByPeriodicity,
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
