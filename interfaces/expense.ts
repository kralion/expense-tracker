export interface IGasto {
  id: string;
  fecha: Date;
  descripcion?: string;
  categoria: string;
  cantidad: number;
  assetIdentificador?: string;
  divisa: string;
  numeroGasto: number;
}

export interface IExpensContextProvider {
  addExpense: (expense: IGasto) => void;
  deleteExpense: ({ id }: IGasto) => void;
  updateExpense: (expense: IGasto) => void;
  expenses: IGasto[];
}
