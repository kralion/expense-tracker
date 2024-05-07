export interface IGasto {
  id?: string;
  fecha: string;
  descripcion?: string;
  usuario_id?: string;
  periodicidad?: boolean;
  categoria: string;
  monto: number;
  assetIdentificador?: string;
  divisa?: string;
  numeroGasto?: number;
}

export interface IExpenseContextProvider {
  addExpense: (expense: IGasto) => void;
  expenses: IGasto[];
  updateExpense: (expense: IGasto) => void;
  getExpensesByUser: (id: string) => Promise<IGasto[]>;
  sumOfAllOfExpensesMonthly: () => Promise<number>;
  getTopExpenses: () => Promise<IGasto[]>;
  getRecentExpenses: () => Promise<IGasto[]>;
  getExpensesByPeriodicity: () => Promise<IGasto[]>;
}
