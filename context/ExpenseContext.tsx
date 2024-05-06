import { supabase } from "@/utils/supabase";
import { endOfMonth, formatISO, startOfMonth } from "date-fns";
import * as React from "react";
import { createContext, useContext } from "react";
import { IExpenseContextProvider, IGasto } from "../interfaces";
import useAuth from "./AuthContext";

export const ExpenseContext = createContext<IExpenseContextProvider>({
  addExpense: () => {},
  deleteExpenseById: () => {},
  updateExpense: () => {},
  getSingleExpense: async (id: string): Promise<IGasto> => {
    return {} as IGasto;
  },
  sumOfAllOfExpensesMonthly: async () => 0,
  getExpensesByUser: async (id: string) => [],
  expenses: [],
  getTopExpenses: async (): Promise<IGasto[]> => [],
});

export const ExpenseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = React.useState<IGasto[]>([]);
  const { session } = useAuth();

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
  async function getSingleExpense(id: string): Promise<IGasto> {
    const { data: expense, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching expense:", error);
      return {} as IGasto;
    }

    if (!expense) {
      console.log("No expense found for id:", id);
    }

    return expense;
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
    return 0;
  }

  const updateExpense = async (expense: IGasto) => {
    await supabase.from("expenses").update(expense).eq("id", expense.id);
  };
  async function deleteExpenseById(id: string) {
    await supabase.from("expenses").delete().eq("id", id);
  }

  async function getTopExpenses() {
    const { data: expenses, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("session_id", session?.user.id)
      .limit(10);
    if (!expenses) return [];
    const sortedExpenses = expenses.sort(
      (a, b) => Number(b.monto) - Number(a.monto)
    );
    return sortedExpenses;
  }
  return (
    <ExpenseContext.Provider
      value={{
        getExpensesByUser,
        expenses,
        addExpense,
        deleteExpenseById,
        sumOfAllOfExpensesMonthly,
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
