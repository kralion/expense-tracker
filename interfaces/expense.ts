export interface IGasto {
  id?: string;
  fecha?: Date;
  descripcion?: string;
  usuario_id?: string;
  periodicidad?: boolean;
  categoria: string;
  monto: string;
  assetIdentificador?: string;
  divisa?: string;
  numeroGasto?: number;
}

export interface IExpenseContextProvider {
  addExpense: (expense: IGasto) => void;
  expenses: IGasto[];
  deleteExpenseById: (id: string) => void;
  updateExpense: (expense: IGasto) => void;
  getExpensesByUser: (id: string) => Promise<IGasto[]>;
  getSingleExpense: (id: string) => Promise<IGasto>;
  sumOfAllOfExpensesMonthly: () => Promise<number>;
  getTopExpenses: () => Promise<IGasto[]>;
}
