export interface IGasto {
  id?: string;
  fecha?: Date;
  descripcion?: string;
  categoria: string;
  monto: string;
  assetIdentificador?: string;
  divisa?: string;
  numeroGasto?: number;
}

export interface IExpensContextProvider {
  addExpense: (expense: IGasto) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: IGasto) => void;
  expenses: IGasto[];
}
