export interface IGasto {
  id: string;
  fecha: Date;
  descripcion?: string;
  categoria: string;
  cantidad: number;
  assetIdentificador: string;
}

export interface IExpensContextProvider {
  addExpense: (expense: IGasto) => void;
  deleteExpense: ({ id }: IGasto) => void;
  expenses: IGasto[];
}
